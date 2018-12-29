// Số download đồng thời nhiều nhất tại một thời điểm
var MAX_CONCURRENT_DOWNLOADS = 3;

// Số lượng đang download
var numDownloading = 0;
// Số lượng đã download xong
var numFinished = 0;
// Danh sách các ID đang download
var downloadIds = [];
// Danh sách URL đang download
var queue = [];

/**
 * Xử lý khi nhận được message từ popup.
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if (request.message == "getStats") {
			sendStats();
		}
		if (request.message == "addToQueue") {
			queue = queue.concat(request.urls);
			processQueue();
		}
		if (request.message == "clearDownloads") {
			numDownloading = 0;
			numFinished = 0;
			downloadIds = [];
			queue = [];
			sendStats();
		}
	}
);

/**
 * Gửi thông tin thống kê cho popup.
 */
function sendStats() {
	chrome.runtime.sendMessage({
		"message": "stats",
		"numDownloading": numDownloading,
		"numQueued": queue.length,
		"numFinished": numFinished
	});
}

/**
 * Thực hiện download.
 */
function processQueue() {
	while (queue.length > 0 && numDownloading < MAX_CONCURRENT_DOWNLOADS) {
		var el = queue.pop();
		numDownloading++;
		chrome.downloads.download({ "url": el.url, "filename": el.name }, function(downloadId) {
			downloadIds.push(downloadId);
		});
	}
	sendStats();
}

chrome.downloads.onChanged.addListener(function(downloadDelta) {
	if (downloadIds.indexOf(downloadDelta.id) >= 0) {
		if (downloadDelta.state != undefined && downloadDelta.state.current != "in_progress") {
			downloadIds.splice(downloadIds.indexOf(downloadDelta.id), 1);
			numDownloading--;
			numFinished++;
			processQueue();
		}
	}
	sendStats();
});

function openMainPage() {
	var optionsUrl = chrome.extension.getURL('popup.html');
	chrome.tabs.query({ url: optionsUrl }, function(tabs) {
		if (tabs.length) {
		chrome.tabs.update(tabs[0].id, { active: true });
		} else {
		chrome.tabs.create({url: optionsUrl});
		}
	});
}

chrome.browserAction.onClicked.addListener(function(tab) {
	openMainPage();
});
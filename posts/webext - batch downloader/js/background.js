// Số download đồng thời nhiều nhất tại một thời điểm
var MAX_CONCURRENT_DOWNLOADS = 3;

// Số lượng đang download
var numDownloading;
// Số lượng đã download xong
var numFinished;
// Danh sách download
var downloadIds;
// Danh sách lỗi
var errors;
// Danh sách URL đang download
var queue;

/**
 * Reset lại các biến.
 */
function resetVariables() {
	numDownloading = 0;
	numFinished = 0;
	downloadIds = [];
	errors = [];
	queue = [];
}

// Thực hiện luôn
resetVariables();

/**
 * Xử lý khi nhận được message từ popup.
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		// Lấy thông tin thống kê
		if (request.message == "getStats") {
			sendStats();
		}

		// Thêm vào hàng đợi
		if (request.message == "addToQueue") {
            //console.log(request.urls);
			queue = queue.concat(request.urls);
			processQueue();
		}

		// Xóa danh sách download
		if (request.message == "clearDownloads") {
			resetVariables();
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
		"numFinished": numFinished,
		"errors": errors
	});
}

/**
 * Thực hiện download.
 */
function processQueue() {
	while (queue.length > 0 && numDownloading < MAX_CONCURRENT_DOWNLOADS) {
		// Download và thêm vào danh sách download
		var el = queue.shift();
		numDownloading++;
		chrome.downloads.download({ "url": el.url, "filename": el.name }, function(downloadId) {
			downloadIds.push({
				"id": downloadId,
				"url": el.url,
				"filename": el.name
			});
		});
	}

	sendStats();
}

/**
 * Lắng nghe sự kiện download (download xong, download bị lỗi)
 */
chrome.downloads.onChanged.addListener(function(downloadDelta) {
	// Kiểm tra có trong danh sách download
	var ele = downloadIds.find(e => e.id == downloadDelta.id);
	if (ele) {
		if (downloadDelta.state != undefined) {
			if (downloadDelta.state.current == 'complete') {
				// Nếu đã download thành công
				// thì xóa khỏi danh sách download, cập nhật số download - số hoàn thành,
				// và xử lý tiếp
				//downloadIds.splice(idx, 1); // tìm kiếm lại, vì có thể đã bị thay đổi index
				numDownloading--;
				numFinished++;
				processQueue();
			} else if (downloadDelta.state.current == 'interrupted') {
				// Nếu bị lỗi
				// Nếu có thể resume thì resume, còn không thì đánh dấu để download lại
				console.log(downloadDelta);
				if (downloadDelta.canResume.current) {
					chrome.downloads.resume(downloadDelta.id);
				} else {
					errors.push(ele);
				}
			}
		}
	}

	sendStats();
});

/**
 * Mở trang popup sang một tab mới.
 */
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

/**
 * Khi người dùng click vào icon ở chỗ toolbar thì mở tab mới.
 */
chrome.browserAction.onClicked.addListener(function(tab) {
	openMainPage();
});

// Click nút "Download"
document.querySelector('#startButton').addEventListener('click', () => {
	// Nhập mảng JSON { url, name } vào textarea
	var urls = JSON.parse(document.querySelector('#linksInput').value);

	// Thông báo cho background danh sách URL
	chrome.runtime.sendMessage({ "message": "addToQueue", "urls": urls });
});

// Click nút "Clear"
document.querySelector('#clearDownloads').addEventListener('click', () => {
	chrome.runtime.sendMessage({ "message": "clearDownloads" });
});

// Lấy thông tin thống kê từ background
chrome.runtime.sendMessage({ "message": "getStats" });

/**
 * Cập nhật lại một giá trị thống kê.
 * @param {String} fieldName 
 * @param {Number} newValue 
 */
function updateStat(fieldName, newValue) {
	var el = document.querySelector('#' + fieldName);
	var cssClass = 'statsNumberAnimated';
	if (el.textContent != newValue) {
		el.classList.remove(cssClass);
		setTimeout(() => { el.classList.add(cssClass) }, 0);
	}
	el.textContent = newValue;
}

// Nhận được thông báo có thống kê mới
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  	if (request.message == "stats") {
		[
			'numDownloading',
			'numQueued',
			'numFinished'
		].forEach((fieldName) => {
			var newValue = request[fieldName];
			updateStat(fieldName, newValue);
		});
  	}
});

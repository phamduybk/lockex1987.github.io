// Click nút "Download"
document.querySelector('#startButton').addEventListener('click', () => {
	// Nhập mảng URL vào textarea
	var urls = [];
	var arr = document.querySelector('#linksInput').value.split("\n");
	arr.forEach(s => {
		s = s.trim();
		if (s) {
			urls.push(s);
		}
	});

	//console.log(urls);

	// Thông báo cho background danh sách URL
	chrome.runtime.sendMessage({ "message": "addToQueue", "urls": urls });
});

// Click nút "Clear"
document.querySelector('#clearDownload').addEventListener('click', () => {
	// Thông báo clear cho background
	chrome.runtime.sendMessage({ "message": "clearDownloads" });
});

// Lấy thông tin thống kê từ background
chrome.runtime.sendMessage({ "message": "getStats" });

// Lắng nghe thông báo từ background
// Hiển thị danh sách các URL đang download
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  	if (request.message == "stats") {
		//console.log(request.queue);
		var text = '';
		request.queue.forEach(s => text += s + "\n");
		document.querySelector('#linksInput').value = text;
  	}
});

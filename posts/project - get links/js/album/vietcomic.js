// https://vietcomic.net/watchmen-160

/**
 * Lấy danh sách chương.
 */
function getChapterLinksVietcomic() {
	return getChapterLinksFromCssSelector('.chapter-list a');
}

downloadChapterLinks(getChapterLinksVietcomic);

/**
 * Xử lý từng chương.
 * @param {String} chapterUrl URL của chương
 * @param {String} chapterNo Số thứ tự chương (thư mục lưu)
 * @param {Function} callbackFunc Hàm callback sau khi thực hiện xong
 */
function processChapterVietcomic(chapterUrl, chapterNo, callbackFunc) {
	var blackList = [
		'loading.gif',
		'Credit'
	];
	//var cssSelector = '#vungdoc img';

	fetch(chapterUrl)
			.then(response => response.text())
			.then(htmlCode => {
				var images = [];
				var regex = /data = '(.+?)';/g;
				var group = regex.exec(htmlCode);
				if (group) {
					var arr = group[1].split('|');
					arr.forEach(url => {
						var fileExtension = getImageExtension(url);
						images.push({
							url: url,
							name: createLocalFileName(chapterNo, images.length, fileExtension)
						});
					});
				}

				if (images.length == 0) {
					console.log('Stop', chapterNo);
				} else {
					callbackFunc(images, chapterNo);
				}
			});
}

// Thực hiện
getAllDownloads(processChapterVietcomic, [
{ url: "https://vietcomic.net/chapter/watchmen/160/1054", title: "Watchmen #6", chapterNo: "6" },
{ url: "https://vietcomic.net/chapter/watchmen/160/1055", title: "Watchmen #7", chapterNo: "7" },
{ url: "https://vietcomic.net/chapter/watchmen/160/1056", title: "Watchmen #8", chapterNo: "8" },
{ url: "https://vietcomic.net/chapter/watchmen/160/1057", title: "Watchmen #9", chapterNo: "9" },
{ url: "https://vietcomic.net/chapter/watchmen/160/1058", title: "Watchmen #10", chapterNo: "10" },
{ url: "https://vietcomic.net/chapter/watchmen/160/1059", title: "Watchmen #11", chapterNo: "11" },
{ url: "https://vietcomic.net/chapter/watchmen/160/1060", title: "Watchmen #12 - END", chapterNo: "12" },
]);

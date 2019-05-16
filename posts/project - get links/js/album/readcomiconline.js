// https://readcomiconline.to/Comic/Justice-Society-of-America

/**
 * Lấy danh sách chương.
 */
function getChapterLinksReadcomiconline() {
	return getChapterLinksFromCssSelector('.listing a');
}

downloadChapterLinks(getChapterLinksReadcomiconline);


/**
 * Xử lý từng chương.
 * @param {String} chapterUrl URL của chương
 * @param {String} chapterNo Số thứ tự chương (thư mục lưu)
 * @param {Function} callbackFunc Hàm callback sau khi thực hiện xong
 */
function processChapterReadcomiconline(chapterUrl, chapterNo, callbackFunc) {
	fetch(chapterUrl)
		.then(response => response.text())
		.then(htmlCode => {
			//console.log(htmlCode);
			var images = [];
			var regex = /lstImages\.push\("(.+?)"\)/g;
			var group;
			while ((group = regex.exec(htmlCode)) !== null) {
				var url = group[1];
				var fileExtension = getImageExtension(url);
				images.push({
					url: url,
					name: createLocalFileName(chapterNo, images.length, fileExtension)
				});
			}

			if (images.length == 0) {
				console.log('Stop', chapterNo);
			} else {
				// Chờ 20 giây rồi mới crawl tập mới, nếu không sẽ bị tưởng là robot và chặn
				setTimeout(function () {
					callbackFunc(images, chapterNo);
				}, 20 * 1000);
			}
		});
}

// Thực hiện
getAllDownloads(processChapterReadcomiconline, [
{ url: "https://readcomiconline.to/Comic/Cedric/Issue-2?id=141008", title: "Cedric Issue #2", chapterNo: "2" },
{ url: "https://readcomiconline.to/Comic/Cedric/Issue-3?id=141009", title: "Cedric Issue #3", chapterNo: "3" },
{ url: "https://readcomiconline.to/Comic/Cedric/Issue-4?id=141011", title: "Cedric Issue #4", chapterNo: "4" },
{ url: "https://readcomiconline.to/Comic/Cedric/Issue-5?id=152696", title: "Cedric Issue #5", chapterNo: "5" },
{ url: "https://readcomiconline.to/Comic/Cedric/Issue-6?id=155265", title: "Cedric Issue #6", chapterNo: "6" },
]);
// http://uptruyen.com/manga/147257/slice-of-life/ninja-loan-thi.html
// http://uptruyen.com/manga/147187/manhwa/doi-quan-nhi-nho-special-edition.html
// http://uptruyen.com/manga/147241/shounen/tan-teppi.html
// http://uptruyen.com/manga/31424/action/sailor-moon-kanzenban.html
// http://uptruyen.com/manga/147111/school-life/nhoc-maruko.html

/**
 * Lấy danh sách chương.
 */
function getChapterLinksUptruyen() {
	return getChapterLinksFromCssSelector('.detail-chap-name a');
}

downloadChapterLinks(getChapterLinksUptruyen);

/**
 * Xử lý từng chương.
 * @param {String} chapterUrl URL của chương
 * @param {String} chapterNo Số thứ tự chương (thư mục lưu)
 * @param {Function} callbackFunc Hàm callback sau khi thực hiện xong
 */
function processChapterUptruyen(chapterUrl, chapterNo, callbackFunc) {
	var blackList = [
		'loading.gif',
		'Credit'
	];

	fetch(chapterUrl)
			.then(response => response.text())
			.then(htmlCode => {
				var doc = parseDocumentFromString(htmlCode);
				var images = [];
				doc.querySelectorAll('#reader-box img').forEach(img => {
					var url = img.src;
					if (!isExtraImage(url, blackList)) {
						var fileExtension = getImageExtension(url);
						images.push({
							url: url,
							name: createLocalFileName(chapterNo, images.length, fileExtension)
						});
					}
				});
				if (images.length == 0) {
					console.log('Stop', chapterNo);
				} else {
					callbackFunc(images, chapterNo);
				}
			});
}

// Thực hiện
getAllDownloads(processChapterUptruyen, [
{ url: "http://uptruyen.com/manga/106080/sailor-moon-kanzenban/sailor-moon-kanzenban-chap-1.html", title: "Sailor Moon (Kanzenban) chap 1", chapterNo: "1" },
{ url: "http://uptruyen.com/manga/106079/sailor-moon-kanzenban/sailor-moon-kanzenban-chap-2.html", title: "Sailor Moon (Kanzenban) chap 2", chapterNo: "2" },
{ url: "http://uptruyen.com/manga/106078/sailor-moon-kanzenban/sailor-moon-kanzenban-chap-3.html", title: "Sailor Moon (Kanzenban) chap 3", chapterNo: "3" },
{ url: "http://uptruyen.com/manga/106077/sailor-moon-kanzenban/sailor-moon-kanzenban-chap-4.html", title: "Sailor Moon (Kanzenban) chap 4", chapterNo: "4" },
{ url: "http://uptruyen.com/manga/106076/sailor-moon-kanzenban/sailor-moon-kanzenban-chap-5.html", title: "Sailor Moon (Kanzenban) chap 5", chapterNo: "5" },
{ url: "http://uptruyen.com/manga/106075/sailor-moon-kanzenban/sailor-moon-kanzenban-chap-6.html", title: "Sailor Moon (Kanzenban) chap 6", chapterNo: "6" },
{ url: "http://uptruyen.com/manga/106074/sailor-moon-kanzenban/sailor-moon-kanzenban-chap-7.html", title: "Sailor Moon (Kanzenban) chap 7", chapterNo: "7" },
{ url: "http://uptruyen.com/manga/106073/sailor-moon-kanzenban/sailor-moon-kanzenban-chap-8.html", title: "Sailor Moon (Kanzenban) chap 8", chapterNo: "8" },
{ url: "http://uptruyen.com/manga/106072/sailor-moon-kanzenban/sailor-moon-kanzenban-chap-9.html", title: "Sailor Moon (Kanzenban) chap 9", chapterNo: "9" },
{ url: "http://uptruyen.com/manga/106071/sailor-moon-kanzenban/sailor-moon-kanzenban-chap-10.html", title: "Sailor Moon (Kanzenban) chap 10", chapterNo: "10" },
]);

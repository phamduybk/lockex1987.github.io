// https://comicvn.net/truyen-tranh-online/tay-du-11951

/**
 * Lấy danh sách chương.
 */
function getChapterLinks() {
	return getChapterLinksFromCssSelector('.u84ho3 a');
}

downloadChapterLinks(getChapterLinks);

// PART 2: PROCESS CHAPTERS

/**
 * Xử lý từng chương.
 * @param {String} chapterUrl URL của chương
 * @param {String} chapterNo Số thứ tự chương (thư mục lưu)
 * @param {Function} callbackFunc Hàm callback sau khi thực hiện xong
 */
function processChapter(chapterUrl, chapterNo, callbackFunc) {
	var blackList = [
		'quang%2Bcao.jpg',
		'App%2Bcomic.jpg',
		'thanks.jpg',
		'TAYDU%2Bbanner.png',
		'banner%2B%25C3%25A1o.jpg',
		'BANNER%2BTD.jpg',
		'Comicvn.jpg',
		'comicvn.jpg',
		'%25C3%25A1o.jpg',
		'Timnguoithanmatlienlac.jpg',
		'donate%2Bcomicvn.jpg',
		'tuy%25E1%25BB%2583n%2Bnh%25C3%25A2n%2Bs%25E1%25BB%25B1.jpg',
		'comicvnRule.jpg?imgmax=16383',
		'comicvnRule.jpg',
		'ComicvnRule.jpg',
		'credit.jpg',
		'28535323_1942896122692370_837761597_n.png',
		'26219355_321993561648014_2404558659855679663_n.jpg',
		'20733142_1487886567942543_1423699520_n.jpg',
		'dragon_and_wolf_by_kazu67-dbfa73j.jpg'
	];

	fetch(chapterUrl)
		.then(response => response.text())
		.then(htmlCode => {
			var parser = new DOMParser();
			var doc = parser.parseFromString(htmlCode, "text/html");

			var images = [];
			var rows = doc.querySelector('#txtarea').value.replace(/\"/g, "'").split("src='");
			for (var i = 1; i < rows.length; i++) {
				var v = rows[i].substr(0, rows[i].indexOf("'"));
				var d = v.replace(/\s+/gi, '');
				if (!isExtraImage(d, blackList)) {
					var fileExtension = getImageExtension(d);
					images.push({
						url: d,
						name: createLocalFileName(chapterNo, images.length, fileExtension)
					});
				}
			}

			if (images.length == 0) {
				console.log('Stop', chapterNo);
			} else {
				callbackFunc(images, chapterNo);
			}
		});
}

// Thực hiện
getAllDownloads(processChapter, [
	{ url: "https://comicvn.net/truyen-tranh-online/tay-du/chapter-181-than-cua-di%CC%A3-the%CC%81-gio%CC%81i-443471", title: "Chapter 181: Thần của Dị Thế Giới", chapterNo: "181" },
	{ url: "https://comicvn.net/truyen-tranh-online/tay-du/chapter-182-vinh-bat-tai-kien-443625", title: "Chapter 182: Vĩnh Bất Tái Kiến", chapterNo: "182" },
	{ url: "https://comicvn.net/truyen-tranh-online/tay-du/chapter-183-hanh-trinh-bat-tan-dai-ket-cuc-443732", title: "Chapter 183: Hành Trình Bất Tận (Đại Kết Cục)", chapterNo: "183" }
]);

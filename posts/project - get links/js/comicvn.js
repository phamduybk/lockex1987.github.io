// https://comicvn.net/truyen-tranh-online/tay-du-11951

// PART 1: GET CHAPTERS
function extractChapterNumber(title) {
	var re = /\d+/ig;
	var result = re.exec(title);
	if (result) {
		return result[0];
	} else {
		return title;
	}
}

function getChapterLinks() {
	var chapterLinks = [];
	document.querySelectorAll('.u84ho3 a').forEach(aTag => {
		var title = aTag.textContent.trim();
		var chapterNo = extractChapterNumber(title);
		var url = aTag.href;
		chapterLinks.unshift({
			url,
			title,
			chapterNo
		});
	});
	//console.log(JSON.stringify(chapterLinks, null, 2));
	return chapterLinks;
}

function downloadChapterLinks() {
	var chapterLinks = getChapterLinks();
	var text = '';
	chapterLinks.forEach(c => {
		text += `{ url: "${c.url}", title: "${c.title}", chapterNo: "${c.chapterNo}" },\n`
	});
	saveTextAsFile(text, 'chapter links.json');
}

downloadChapterLinks();



// PART 2: PROCESS CHAPTERS
function isExtraImage(imageUrl) {
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
	for (var i = 0; i < blackList.length; i++) {
		if (imageUrl.endsWith(blackList[i])) {
			return true;
		}
	}
	return false;
}

function processChapter(chapterUrl, chapterNo, callbackFunc) {
	fetch(chapterUrl)
			.then(response => response.text())
			.then(htmlCode => {
				var parser = new DOMParser();
				var doc = parser.parseFromString(htmlCode, "text/html");
			
				var images = [];
				var rows = doc.querySelector('#txtarea').value.replace(/\"/g, "'").split("src='");
				for (var i = 1; i < rows.length; i++) {
					var v = rows[i].substr(0, rows[i].indexOf("'"));
					var d = v.replace(/\s+/gi,'');
					if (!isExtraImage(d)) {
						var fileExtension = d.split('.').pop().toLowerCase();
						if (!['jpg', 'jpeg', 'png'].includes(fileExtension)) {
							fileExtension = 'jpg';
						}
						
						images.push({
							url: d,
							name: `${chapterNo}/${ (images.length + 1001).toString().substring(1) }.${fileExtension}`
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

function getAllDownloads(chapterLinks) {
	var currentIndex = 0;
	var allDownloads = [];
	
	function callbackFunc(images, chapterNo) {
		console.log('Done', chapterNo);

		allDownloads = allDownloads.concat(images);		
	
		// Crawl tập mới
		currentIndex++;

		if (currentIndex < chapterLinks.length) {
			crawl();
		} else {
			console.log('Finish', allDownloads.length);
			//var text = JSON.stringify(allDownloads, null, 2);
			var text = JSON.stringify(allDownloads);
			var fileName = `all downloads ${chapterLinks[0].chapterNo} - ${chapterLinks[chapterLinks.length - 1].chapterNo}.json`;
			saveTextAsFile(text, fileName);
		}
	}
	
	function crawl() {
		var chapterObj = chapterLinks[currentIndex];
		var chapterUrl = chapterObj.url;
		var chapterNo = chapterObj.chapterNo;
		processChapter(chapterUrl, chapterNo, callbackFunc);
	}
	
	crawl();
}

getAllDownloads([
	{ url: "https://comicvn.net/truyen-tranh-online/tay-du/chapter-181-than-cua-di%CC%A3-the%CC%81-gio%CC%81i-443471", title: "Chapter 181: Thần của Dị Thế Giới", chapterNo: "181" },
	{ url: "https://comicvn.net/truyen-tranh-online/tay-du/chapter-182-vinh-bat-tai-kien-443625", title: "Chapter 182: Vĩnh Bất Tái Kiến", chapterNo: "182" },
	{ url: "https://comicvn.net/truyen-tranh-online/tay-du/chapter-183-hanh-trinh-bat-tan-dai-ket-cuc-443732", title: "Chapter 183: Hành Trình Bất Tận (Đại Kết Cục)", chapterNo: "183" }
]);

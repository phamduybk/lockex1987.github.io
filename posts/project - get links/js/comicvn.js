// https://comicvn.net/truyen-tranh-online/tay-du-11951

function getChapterLinks() {
	var chapterLinks = [];
	document.querySelectorAll('.u84ho3 a').forEach(aTag => chapterLinks.unshift(aTag.href));
	//console.log(JSON.stringify(chapterLinks, null, 2));
	return chapterLinks;
}

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

function main(startChapter, endChapter) {
	var chapterLinks = getChapterLinks();
	var currentIndex = startChapter - 1;
	var allDownloads = [];
	
	function callbackFunc(images, chapterNo) {
		console.log('Done', chapterNo);

		allDownloads = allDownloads.concat(images);		
	
		// Crawl tập mới
		currentIndex++;

		if (currentIndex < endChapter) {
			crawl();
		} else {
			console.log('Finish', allDownloads.length);
			//var text = JSON.stringify(allDownloads, null, 2);
			var text = JSON.stringify(allDownloads);
			saveTextAsFile(text, `all downloads ${startChapter} - ${endChapter}.json`);
		}
	}
	
	function crawl() {
		var chapterUrl = chapterLinks[currentIndex];
		var chapterNo = currentIndex + 1;
		processChapter(chapterUrl, chapterNo, callbackFunc);
	}
	
	crawl();
}

main(51, 70);

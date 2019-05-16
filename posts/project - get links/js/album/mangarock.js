// https://mangarock.com/manga/mrs-serie-64915
// https://mangarock.com/manga/mrs-serie-64915/chapter/mrs-chapter-64916
// https://api.mangarockhd.com/query/web400/pages?oid=mrs-chapter-64916



// Part 1: Lấy danh sách chapter

function getChapters() {
	var text = '';
	document.querySelectorAll('[data-test=chapter-table] a').forEach((aTag, idx, arr) => {
		var title = aTag.textContent.trim();
		//var chapterNo = extractChapterNumber(title);
		var chapterNo = arr.length - idx;
		text += `{ chapterNo: "${chapterNo}", title: "${title}", url: "${aTag.href}" },\n`
	});
	console.log(text);
	//saveTextAsFile(text, 'chapter links.json');
}

getChapters();

// Part 2: Lấy danh sách ảnh

var chapters = [
	{ chapterNo: "20", title: "Vol.5 Chapter 20", url: "https://mangarock.com/manga/mrs-serie-64915/chapter/mrs-chapter-100189247" },
];

function processChapters() {
	// Chờ tất cả các tiến trình chạy xong
	var urls = [];
	
	Promise
		.all(chapters.map(c => {
			var chapterNo = c.chapterNo;
			var chapterUrl = c.url;
			var chapterId = chapterUrl.split('?')[0].split('/').pop();
			var mriApiUrl = `https://api.mangarockhd.com/query/web401/pagesv2?oid=${chapterId}`;
			
			// Phải return
			return fetch(mriApiUrl)
				.then(res => res.json())
				.then(jsonObj => {			
					jsonObj.data.forEach((s, i) => {
						var fileExtension = 'mri';
						urls.push({
							url: s.url,
							name: createLocalFileName('mri/' + chapterNo, i, fileExtension)
						});
					});
				})
				.catch(error => console.log('There was a problem!', error));
		}))
		.then(data => {
			//console.log(data);
			//data.forEach();
			var text = JSON.stringify(urls);
			console.log(text);
			saveTextAsFile(text, 'download.json');
		});	
}

processChapters();

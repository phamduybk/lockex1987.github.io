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
	{ chapterNo: "19", title: "Vol.5 Chapter 19", url: "https://mangarock.com/manga/mrs-serie-64915/chapter/mrs-chapter-100184746" },
	{ chapterNo: "18", title: "Vol.5 Chapter 18", url: "https://mangarock.com/manga/mrs-serie-64915/chapter/mrs-chapter-64933" },
	{ chapterNo: "17", title: "Vol.5 Chapter 17", url: "https://mangarock.com/manga/mrs-serie-64915/chapter/mrs-chapter-64932" },
	{ chapterNo: "16", title: "Vol.5 Chapter 16", url: "https://mangarock.com/manga/mrs-serie-64915/chapter/mrs-chapter-64931" },
	{ chapterNo: "15", title: "Vol.5 Chapter 15", url: "https://mangarock.com/manga/mrs-serie-64915/chapter/mrs-chapter-64930" },
	{ chapterNo: "14", title: "Vol.4 Chapter 14", url: "https://mangarock.com/manga/mrs-serie-64915/chapter/mrs-chapter-64929" },
	{ chapterNo: "13", title: "Vol.4 Chapter 13", url: "https://mangarock.com/manga/mrs-serie-64915/chapter/mrs-chapter-64928" },
	{ chapterNo: "12", title: "Vol.4 Chapter 12", url: "https://mangarock.com/manga/mrs-serie-64915/chapter/mrs-chapter-64927" },
	{ chapterNo: "11", title: "Vol.3 Chapter 11", url: "https://mangarock.com/manga/mrs-serie-64915/chapter/mrs-chapter-64926" },
	{ chapterNo: "10", title: "Vol.3 Chapter 10", url: "https://mangarock.com/manga/mrs-serie-64915/chapter/mrs-chapter-64925" },
	{ chapterNo: "9", title: "Vol.3 Chapter 9", url: "https://mangarock.com/manga/mrs-serie-64915/chapter/mrs-chapter-64924" },
	{ chapterNo: "8", title: "Vol.3 Chapter 8", url: "https://mangarock.com/manga/mrs-serie-64915/chapter/mrs-chapter-64923" },
	{ chapterNo: "7", title: "Vol.2 Chapter 7", url: "https://mangarock.com/manga/mrs-serie-64915/chapter/mrs-chapter-64922" },
	{ chapterNo: "6", title: "Vol.2 Chapter 6", url: "https://mangarock.com/manga/mrs-serie-64915/chapter/mrs-chapter-64921" },
	{ chapterNo: "5", title: "Vol.2 Chapter 5", url: "https://mangarock.com/manga/mrs-serie-64915/chapter/mrs-chapter-64920" },
	{ chapterNo: "4", title: "Vol.2 Chapter 4", url: "https://mangarock.com/manga/mrs-serie-64915/chapter/mrs-chapter-64919" },
	{ chapterNo: "3", title: "Vol.1 Chapter 3", url: "https://mangarock.com/manga/mrs-serie-64915/chapter/mrs-chapter-64918" },
	{ chapterNo: "2", title: "Vol.1 Chapter 2", url: "https://mangarock.com/manga/mrs-serie-64915/chapter/mrs-chapter-64917" },
	{ chapterNo: "1", title: "Vol.1 Chapter 1", url: "https://mangarock.com/manga/mrs-serie-64915/chapter/mrs-chapter-64916" }
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
						urls.push({ url: s.url, name: `mri/${chapterNo}/${ (i + 1001).toString().substring(1) }.${fileExtension}` });
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

// https://mangarock.com/manga/mrs-serie-64915
// https://mangarock.com/manga/mrs-serie-64915/chapter/mrs-chapter-64916
// https://api.mangarockhd.com/query/web400/pages?oid=mrs-chapter-64916

function saveTextAsFile(textToWrite, fileNameToSaveAs) {
	var textFileAsBlob = new Blob([textToWrite], { type:'text/plain' });
	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
	downloadLink.style.display = "none";
	downloadLink.onclick = function(event) {
		document.body.removeChild(event.target);
	};
	document.body.appendChild(downloadLink);
	downloadLink.click();
}

function processChapter(chapterUrl) {
	var chapterId = chapterUrl.split("/").pop();
	var mriApiUrl = `https://api.mangarockhd.com/query/web400/pages?oid=${chapterId}`;
	fetch(mriApiUrl)
		.then(res => res.json())
		.then(jsonObj => {
			var urls = [];
			jsonObj.data.forEach((s, i) => {
				var fileExtension = 'mri';
				urls.push({ url: s, name: `${ (i + 1001).toString().substring(1) }.${fileExtension}` });
			});
			var text = JSON.stringify(urls);
			saveTextAsFile(text, 'download.json');
		});
}

var chapterUrl = location.href;
processChapter(chapterUrl);

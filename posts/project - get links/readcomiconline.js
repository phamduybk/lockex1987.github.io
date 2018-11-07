// https://readcomiconline.to/Comic/A-Lucky-Luke-Adventure/Issue-70?id=142941

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

var urls = [];
lstImages.forEach((s, i) => {
	var fileExtension = s.split('.').pop();
	urls.push({ url: s, name: `${ (i + 1001).toString().substring(1) }.${fileExtension}` });
});
var text = JSON.stringify(urls);

saveTextAsFile(text, 'download.json');


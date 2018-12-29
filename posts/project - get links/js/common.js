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

function getImages() {
    var urls = [];
    document.querySelectorAll('.entry-content img').forEach((img, i) => {
        urls.push({ url: img.src, name: `${ (i + 1001).toString().substring(1) }.png` });
    });	
	var text = JSON.stringify(urls);
	saveTextAsFile(text, 'download.json');
}

getImages();

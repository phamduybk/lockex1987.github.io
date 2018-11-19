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
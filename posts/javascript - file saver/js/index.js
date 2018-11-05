function testSaveTextAsFile() {
	var textToWrite = document.getElementById("inputTextToSave").value;
	var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
	saveTextAsFile(textToWrite, fileNameToSaveAs);
}

/**
 * Hàm save as do mình tự làm.
 * @param text Nội dung của văn bản cần lưu
 * @param fileName Tên file
 */
function saveTextAsFile(text, fileName) {
	// Tạo đối tượng Blob
	var textFileAsBlob = new Blob([text], { type:'text/plain' });

	var hrefLink = window.URL.createObjectURL(textFileAsBlob);

	downloadFile(hrefLink, fileName);
}

/**
 * Download (text, ảnh, file).
 * @param {String} hrefLink Đường dẫn
 * @param {String} fileName Tên file
 */
function downloadFile(hrefLink, fileName) {
	// Tạo một thẻ a tạm và giả lập thao tác click vào thẻ đó
	var downloadLink = document.createElement("a");
	downloadLink.download = fileName;
	downloadLink.innerHTML = "Download File";
	downloadLink.href = hrefLink;
	downloadLink.style.display = "none";
	downloadLink.onclick = function(event) {
		// Remove the a tag
		document.body.removeChild(event.target);
	};

	// Gắn nó vào DOM và thực hiện thao tác click
	document.body.appendChild(downloadLink);
	downloadLink.click();
}


function testLoadFileAsText() {
	var fileToLoad = document.getElementById("fileToLoad").files[0];
	loadFileAsText(fileToLoad, function(textFromFileLoaded) {
		document.getElementById("inputTextToSave").value = textFromFileLoaded;
	});
}

/**
 * Đọc nội dung file text do mình tự làm.
 */
function loadFileAsText(fileToLoad, callback) {
	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) {
		var textFromFileLoaded = fileLoadedEvent.target.result;
		callback(textFromFileLoaded);
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}
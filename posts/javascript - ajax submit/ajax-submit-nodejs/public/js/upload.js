(function() {
	// Current chosen files
	// Use this array to handle multiple files
	var currentFiles = [];
	// The progress bar
	var progressBar = document.getElementById("progressBar");
	// Response message
	var response = document.getElementById("response");
	
	// Show preview of chosen file
	function showPreview(source) {
		// Create DOM element
		var list = document.getElementById("image-list");
		var li = document.createElement("li");
		var img = document.createElement("img");
		img.src = source;
		li.appendChild(img);
		list.appendChild(li);
		
		// Update the last element of currentFiles
		currentFiles[currentFiles.length - 1].preview = li;
	}

	// Callback function which is executed when the upload is successful
	function uploadSuccess(data) {
		// Reset to normal GUI
		response.style.display = "";
		progressBar.style.display = "none";
		
		// Show response to the user
		showMessage("Uploaded: " + data.result);

		// Clear previews
		var list = document.getElementById("image-list");
		list.innerHTML = "";

		// Reset current chosen files
		currentFiles = [];
		
		// Reset form
		resetForm();
	}

	// Remove an existing file (by index)
	function removeFile(idx) {
		// Remove preview tag
		var currentPreview = currentFiles[idx].preview;
		var parentTag = currentPreview.parentNode;
		parentTag.removeChild(currentPreview);
		
		// Remove the element in the array
		currentFiles.splice(idx, 1);
	}
	
	// onchange function of the file chooser
	function processWhenChooseFile() {
		var input = this;
		var file = input.files[0];
		//console.log(file);
		//console.log(file.type);
		
		if (file.type.match(/image.*/)) {
			// Check if the file already exists
			var i;
			var found = -1;
			for (i = 0; i < currentFiles.length; i++) {
				if (file.name == currentFiles[i].file.name) {
					found = i;
					break;
				}
			}
			
			// If the file is already added
			if (found > -1) {
				showMessage("Found");
				removeFile(found);
			}
			
			// Add new element
			currentFiles.push({ file: file });
			
			// Show preview
			var reader = new FileReader();
			reader.onloadend = function(e) {
				showPreview(e.target.result);
			};
			reader.readAsDataURL(file);
		} else {
			input.value = "";
			showMessage("Only image, please!");
		}
	}
	
	// Function that is called when submit
	function processWhenSubmit() {
		// Init GUI
		response.style.display = "none";
		progressBar.value = 0;
		progressBar.style.display = "";
		
		// Make an AJAX request
		var frm = this;
		callAjax(frm, uploadSuccess);
		
		// Prevent normal submit
		return false;
	}
	
	// Reset form
	function resetForm() {
		var input = document.getElementById("images");
		input.value = "";
	}
	
	// Update the progress bar
	function updateProgress(oEvent) {
		if (oEvent.lengthComputable) {
			progressBar.value = Math.round(oEvent.loaded * 100 / oEvent.total);
		}
	}

	// AJAX submit a POST form with attachments
	// Return JSON only
	function callAjax(formObj, callback) {
		// Use XMLHttpRequest Object
		var req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status == 200) {
				callback(JSON.parse(req.responseText));
			}
		};
		req.upload.onprogress = updateProgress;

		// Create data to submit and submit
		var formData = new FormData(formObj);
		var input = document.getElementById("images");
		var file = input.files[0];
		var i;
		var tempFile;
		for (i = 0; i < currentFiles.length; i++) {
			tempFile = currentFiles[i].file;
			if (file.name != tempFile.name) {
				formData.append("images[]", tempFile);
			}
		}
		req.open("post", formObj.action);
		req.send(formData);
	}

	// Show response to the user
	function showMessage(text) {
		response.innerHTML = text;
	}
	
	(function() {
		if (!window.FormData || !window.FileReader) {
			alert("Your browser is not supported");
		} else {
			// Set behaviours
			var input = document.getElementById("images");
			input.onchange = processWhenChooseFile;
			var frm = document.getElementById("frm");
			frm.onsubmit = processWhenSubmit;
			
			// Reset form
			resetForm();
		}
	})();
})();

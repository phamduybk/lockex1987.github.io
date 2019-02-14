// Show the file browse dialog
document.querySelector('#choose-upload-button').addEventListener('click', function() {
	document.querySelector('#upload-file').click();
});


// When a new file is selected
document.querySelector('#upload-file').addEventListener('change', function() {
	var file = this.files[0];
	var excel_mime_types = [ 'image/jpeg', 'image/png' ];
	
	document.querySelector('#error-message').style.display = 'none';
	
	// Validate MIME type
	if (excel_mime_types.indexOf(file.type) == -1) {
		document.querySelector('#error-message').style.display = 'block';
		document.querySelector('#error-message').innerText = 'Error : Only JPEG and PNG files allowed';
		return;
	}
	
	console.log(file.type);
	
	//return;

	// Max 2 Mb allowed
	if (file.size > 2 * 1024 * 1024) {
		document.querySelector('#error-message').style.display = 'block';
		document.querySelector('#error-message').innerText = 'Error : Exceeded size 2MB';
		return;
	}

	document.querySelector('#upload-choose-container').style.display = 'none';
	document.querySelector('#upload-file-final-container').style.display = 'block';
	document.querySelector('#file-name').innerText = file.name;
});


// Cancel button event
document.querySelector('#cancel-button').addEventListener('click', function() {
	document.querySelector('#error-message').style.display = 'none';
	document.querySelector('#upload-choose-container').style.display = 'block';
	document.querySelector('#upload-file-final-container').style.display = 'none';

	document.querySelector('#upload-file').setAttribute('value', '');
});


// Upload via AJAX
document.querySelector('#upload-button').addEventListener('click', function() {
	var data = new FormData(),
		request;

    data.append('file', document.querySelector('#upload-file').files[0]);

    var request = new XMLHttpRequest();
    request.addEventListener('load', function(e) {
    	document.querySelector('#upload-progress').style.display = 'none';

    	if (request.response.error == 1) {
    		document.querySelector('#error-message').innerText = request.response.message;
    		document.querySelector('#error-message').style.display = 'block';
    	} else if (request.response.error == 0) {
    		document.querySelector('#cancel-button').click();
    		alert('File uploaded successfully');
    	}
    });
    request.upload.addEventListener('progress', function(e) {
    	var percent_complete = (e.loaded / e.total) * 100;
    	document.querySelector('#upload-percentage').innerText = percent_complete;
    	document.querySelector('#upload-progress').style.display = 'block';
    });
    request.responseType = 'json';
    request.open('post', 'upload.php'); 
    request.send(data); 
});

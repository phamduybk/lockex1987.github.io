// Get the query string that contains parameters and values of current page.
// For example, if you visit https://www.youtube.com/watch?v=1BVV9UqELbA,
// this function will return "v=1BVV9UqELbA" (does not contain ? character)
function getQueryString() {
	var search = window.location.search;
	if (search) {
		return search.substring(1);
	} else {
		return "";
	}
}

// Call AJAX
function updateAjax(url, callback) {
	//console.info(url);
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		//console.info(req.readyState + ", " + req.status + ", " + req.responseText);
		// Firefox 52 returns status 0 with CORS requests
		if (req.readyState == 4 && req.status == 200) {
			callback(req.responseText);
		}
	};
	req.open("GET", url);
	req.send();
}

// Save text file (by JavaScript)
function saveTextAsFile(text, fileName) {
	var blob = new Blob([text], { type: 'text/plain' });
	var downloadLink = document.createElement("a");
	downloadLink.download = fileName;
	downloadLink.textContent = "Download File";
	if (window.webkitURL != null) {
		// Chrome allows the link to be clicked without actually adding it to the DOM
		downloadLink.href = window.webkitURL.createObjectURL(blob);
	} else {
		// Firefox requires the link to be added to the DOM before it can be clicked
		downloadLink.href = window.URL.createObjectURL(blob);
		downloadLink.onclick = function(event) {
			// Remove the a tag
			document.body.removeChild(event.target);
		};
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}
	downloadLink.click();
}

// Return original form (unescaped) of escaped characters
function unescapeHTML(inputText) {
	// Escaped characters
	const ESCAPE_SEQ = new Array(/&quot;/g, /&amp;/g, /&lt;/g, /&gt;/g, /&#39;/g);
	const UNESCAPE_SEQ = new Array("\"", "&", "<", ">", "'");
	for (var i = 0; i < ESCAPE_SEQ.length; i++) {
		inputText = inputText.replace(ESCAPE_SEQ[i], UNESCAPE_SEQ[i]);
	}
	return inputText;
}

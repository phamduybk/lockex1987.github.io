function callAjax1(method, url, callback, data) {
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			callback(req);
		}
	};
	
	req.open(method, url, true);
	if (method == "GET") {
		req.send();
	} else {
		// To POST data like an HTML form, add an HTTP header with setRequestHeader()
		// Specify the data you want to send in the send() method
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		req.send(data);
	}
}
		
function callAjax(method, url, callback, data) {
	var req = new XMLHttpRequest();
	req.addEventListener("load", function() {
		callback(req);
	});
	req.addEventListener("error", function() {
		alert("Error");
	});
	req.addEventListener("abort", function() {
		alert("Abort");
	});
	req.addEventListener("progress", function(oEvent) {
		if (oEvent.lengthComputable) {
			var percentComplete = oEvent.loaded / oEvent.total;
		} else {
			// Unable to compute progress information since the total size is unknown
		}
	});
	
	req.open(method, url);
	if (method == "GET") {
		req.send();
	} else {
		req.send(data);
	}
}

var http = require('http');
var url = require('url');
var qs = require("querystring");

var processRequest = function(req, callback) {
	var body = "";
	req.on("data", function(data) {
		body += data;
	});
	req.on("end", function() {
		callback(qs.parse(body));
	});
}

var controller = function(req, res) {
	var message = '';
	switch (req.method) {
		case 'GET': message = "That's GET message"; break;
		case 'POST': message = "That's POST message"; break;
		case 'PUT':
			//message = "That's PUT message";
			processRequest(req, function(data) {
				message = "That's PUT message.\nYou are editing " + data.book + " book.";
				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.end(message + "\n");
			});
			return; // Why?
			break;
		case 'DELETE': message = "That's DELETE message"; break;
	}
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.end(message + "\n");
}

http.createServer(controller).listen(9000);
console.log('Server running');

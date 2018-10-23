var server = require("./my-server.js");

server.forRoute("GET", "/start", function(req, res) {
	server.text(res, "Hello");
});
server.forRoute("GET", "/finish", function(req, res) {
	server.text(res, "Goodbye");
});
server.forRoute("POST", "/echo", function(req, res) {
	var incoming = "";
	req.on('data', function(chunk) {
		incoming += chunk.toString();
	});
	req.on('end', function() {
		server.text(res, incoming);
	});
});
server.forRoute("GET", "/echo", function(req, res) {
	var body = '<html>'
			+ '<head><title>Node.js Echo</title></head>'
			+ '<body>'
			+ '<form method="POST" action="/echo">'
			+ '<input type="text" name="msg"/>'
			+ '<input type="submit" value="echo"/>'
			+ '</form>'
			+ '</body>'
			+ '</html>';
	server.html(res, body);
});
server.forRoute("GET", "/static", function(req, res) {
	server.file(res, "my-server.js");
});

server.start(9000);

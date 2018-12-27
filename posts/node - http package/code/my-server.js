var http = require("http");
var url = require("url");
var routes = {};
var path = require('path');
var fs = require('fs');

exports.forRoute = function(method, path, handler) {
	routes[method + path] = handler;
};

exports.start = function(port) {
	http.createServer(function (req, res) {
		var pathname = url.parse(req.url).pathname;
		//console.log("req for " + req.method + pathname + " received.");
		if (typeof(routes[req.method + pathname]) === 'function') {
			routes[req.method + pathname](req, res);
		} else {
			res.writeHead(404, {"Content-Type": "text/plain"});
			res.end("404 Not Found");
		}
	}).listen(port);
	console.log("Server has started on port " + port);
};

exports.text = function(res, text) {
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.write(text);
	res.end();
};

exports.html = function(res, text) {
	res.writeHead(200, { "Content-Type": "text/html" });
	res.write(text);
	res.end();
};

exports.file = function(res, file) {
	var f = path.join(__dirname, file);
	var stream = fs.createReadStream(f);
	/*
	stream.on('data', function(chunk) {
		res.write(chunk);
	});
	stream.on('end', function() {
		res.end();
	});
	*/
	stream.pipe(res);
}

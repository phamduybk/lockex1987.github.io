var http = require("http");
var port = 8080; // port must more than 2000

http.createServer(function(req, res) {
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end("Hello World");
}).listen(port);
console.log("Listening in port " + port);

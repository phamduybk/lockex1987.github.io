var http = require("http");
var fs = require("fs");

http.createServer(function(req, res) {
	var content = "Hello World";
	var type = "text/plain";

	var url = req.url;
	if (url === "/") {
		content = fs.readFileSync("./index.html");
		type = "text/html";
	} else if (url === "/styles.css") {
		content = fs.readFileSync("./styles.css");
		type = "text/css";
	}
	
	res.writeHead(200, { "Content-Type": type});
	res.write(content);
	res.end();
}).listen(8080);

console.log("Server running");

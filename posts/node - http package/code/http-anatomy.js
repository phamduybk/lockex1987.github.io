var http = require("http");

var server = http.createServer(function(req, res) {
	var method = req.method;
	var url = req.url;
	var headers = req.headers;
	var userAgent = headers["user-agent"];
	
	var body = [];
	req.on("data", function(chunk) {
		body.push(chunk);
	}).on("end", function() {
		body = Buffer.concat(body).toString();
		
		var responseBody = {
			headers: headers,
			method: method,
			url: url,
			body: body
		};
		
		res.writeHead(200, { "Content-Type": "text/html" });
		res.write("<html><body>" + JSON.stringify(responseBody) + "</body></html>");
		res.end();
	}).on("error", function(err) {
		console.error(err.stack);
	});
});

server.listen(8080);
console.log("Server running...");

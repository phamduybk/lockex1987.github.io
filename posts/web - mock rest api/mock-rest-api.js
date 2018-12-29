var http = require('http');

http.createServer(function(req, res) {
    var content = JSON.stringify({
        url: req.url,
        method: req.method
    });

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.write(content);
    res.end();
}).listen(8080);

console.log('Server is running...');

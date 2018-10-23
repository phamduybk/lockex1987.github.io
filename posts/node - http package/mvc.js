var model = {
	status: false,
	update: function(s) {
		this.status = s;
		view.render();
	}
};

var view = {
	render: function() {
		var html = '';
		html += '<!DOCTYPE html>';
		html += '<html>';
		html += '<head><title>Node.js byexample</title></head>';
		html += '<body>';
		html += '<h1>Status ' + (model.status ? 'on' : 'off') + '</h1>';
		html += '<a href="/on">switch on</a><br />';
		html += '<a href="/off">switch off</a>';
		html += '</body>';
		html += '</html>';
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(html + '\n');
	}
};

var http = require('http');
var res;
var controller = function(request, response) {
	res = response;
	
	if (request.url === '/on') {
		model.update(true);
	} else if(request.url === '/off') {
		model.update(false);
	} else {
		view.render();
	}
}
http.createServer(controller).listen(9000);
console.log('Server running');

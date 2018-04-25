const UPLOAD_URL = '/static/upload';
const UPLOAD_FOLDER = __dirname + '/upload';
const DEFAULT_PORT = 3000;

var express     = require('express');
var bodyParser  = require('body-parser');
var fs          = require('fs');
var multiparty  = require('connect-multiparty');

var app = express();
var multipart = multiparty();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(UPLOAD_URL, express.static(UPLOAD_FOLDER));

app.post('/upload', multipart, function(req, res, next) {
	var files = req.files.images;
	var result;

	if (files) {
		var count = files.length;
	
		var saveFile = function(f) {
			//console.dir(f);

			var originalFilename = f.name;
			var pathUpload = UPLOAD_FOLDER + "/" + originalFilename;

			// Read file content
			fs.readFile(f.path, function(err, data) {
				// Write to hard disk
				fs.writeFile(pathUpload, data, function() {
					count--;
					//console.log(count);
					if (count == 0) {
						res.json({ result: files.length });
					}
				});
			});
		};

		var i;
		for (i = 0; i < files.length; i++) {
			var file = files[i];
			// CAUTION: Operations with files are asynchronous
			saveFile(file);
		}
	} else {
		res.json({ result: 0 });;
	}
});

var server = app.listen(process.env.PORT || DEFAULT_PORT, function() {
	console.log("Listening on port " + server.address().port);
});

var url = 'mongodb://localhost:27017/english';

var mongoose = require('mongoose');
mongoose.connect(url);

var Word = mongoose.model("Word", new mongoose.Schema({
	word: String,
	pronunciation: String,
	//audio: "Same as word with MP3 extension",
	meanings: [{ type: { type: String }, meaning: String }],
	examples: [ String ],
	deriviations: [{ type: { type: String }, word: String }],
	pictures: [ String ],
	topics: [ String ]
}, {
	collection: "Word"
}));
	
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error'));
db.once('open', function() {
	// 1. Connect
	/*
	console.log("Connected");
	db.close();
	*/

	// 2. Insert
	/*
	var doc = new Word({ word: "silence" });
	doc.save(function(err, doc) {
		if (err) return console.error(err);
		db.close();
	});
	*/
	
	// 3. Search
	Word.find({}, function(err, docs) {
		docs.forEach(function(doc, i) {
			//console.log(doc);
			console.log(doc.word);
			if (doc.meanings) {
				doc.meanings.forEach(function(m, idx) {
					console.log('  ' + m.type + ': ' + m.meaning);
				});
			}
		});
		db.close();
	});
});

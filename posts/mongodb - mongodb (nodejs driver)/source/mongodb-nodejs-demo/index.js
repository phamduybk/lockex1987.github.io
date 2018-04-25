var mongoClient = require('mongodb').MongoClient;
var assert      = require('assert');

var url = 'mongodb://localhost:27017/english';
var i;
var meanings;

mongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	var colc = db.collection('Word');
	
	// 1. Connect
	/*
	console.log("Connected succesfully to server");
	db.close();
	*/

	// 2. Insert
	/*
	colc.insertOne({ word: "hello" }, function(err, r) {
		assert.equal(null, err);
		assert.equal(1, r.insertedCount);
		
		// Insert multiple documents
		colc.insertMany([{ word: "world" }, { word: "love" }], function(err, r) {
			assert.equal(null, err);
			assert.equal(2, r.insertedCount);
			
			db.close();
		});
	});
	*/
	
	// 3. Search
	/*
	colc.find({ word: "hello" }).limit(2).toArray(function(err, docs) {
		assert.equal(null, err);
		assert.equal(1, docs.length);
		db.close();
	});
	*/

	colc.find({}).project({ _id: 0, word: 1, meanings: 1 }).each(function(err, doc) {
		if (doc) {
			console.log(doc.word);
			meanings = doc.meanings;
			if (meanings) {
				for (i = 0; i < meanings.length; i++) {
					console.log('  ' + meanings[i].type + ': ' + meanings[i].meaning);
				}
			}
		} else {
			db.close();
		}
	});

	// 4. Update
	/*
	// Update a single document
	// Why both updateOne and updateMany? Can we just use update?
	colc.updateOne({ word: 'hello' }, { $set: { meanings: [ { type: 'n', meaning: 'Xin chao' } ] }}, function(err, r) {
		assert.equal(null, err);
		assert.equal(1, r.matchedCount);
		assert.equal(1, r.modifiedCount);
		db.close();
	});
	*/
	
	// 5. Delete
	/*
	// Remove a single document
	colc.deleteOne({ word: 'world' }, function(err, r) {
		assert.equal(null, err);
		assert.equal(1, r.deletedCount);
		db.close();
	});
	*/
});

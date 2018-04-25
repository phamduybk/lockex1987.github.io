var DB_URL = "mongodb://localhost:27017/test";

var MongoClient = require("mongodb").MongoClient;
var request     = require("request");

MongoClient.connect(DB_URL, function(err, db) {
	if (err) throw err;

	//testInsert(db);
	//testSearch(db);
	testUpdate(db);
});

function testSearch(db) {
	var colc = db.collection("grades");
	var query = { grade: 100 };
	var query2 = { student: "Joe", grade: { $gt: 80, $lt: 95 } };
	var projection = { student: 1, _id: 0 };
	
	/*
	colc.findOne(query, function(err, doc) {
		if (err) throw err;
		console.dir(doc);
		db.close();
	});
	*/
	
	/*
	colc.find(query).toArray(function(err, docs) {
		if (err) throw err;
		console.dir(docs);
		db.close();
	});
	*/
	
	/*
	var cursor = colc.find(query);
	cursor.each(function(err, doc) {
		if (err) throw err;
		if (doc == null) {
			db.close();
		} else {
			console.log(doc.student + " got a good grade");
		}
	});
	*/
	
	/*
	colc.find(query, projection).toArray(function(err, docs) {
		if (err) throw err;
		docs.forEach(function(doc) {
			console.dir(doc);
		});
		db.close();
	});
	*/
	
	/*
	colc.find(query2).each(function(err, doc) {
		if (err) throw err;
		if (doc == null) {
			db.close();
		} else {
			console.dir(doc);
		}
	});
	*/
	
	/*
	db.collection("reddit").find({ title: { $regex: "Windows" } }, { title: 1, _id: 0 }).each(function(err, doc) {
		if (doc == null) {
			db.close();
		} else {
			console.log(doc.title);
		}
	});
	*/
	
	// MongoDB always processes sorting first, then skiping and limiting last.
	//var cursor = colc.find({}).sort("grade", 1).skip(1).limit(4);
	//var cursor = colc.find({}).sort([["grade", 1], ["student", -1]]).skip(1).limit(4);
	var cursor = colc.find({}, {}, { "sort": [["grade", 1], ["student", -1]], "skip": 1, "limit": 4 });
	cursor.each(function(err, doc) {
		if (err) throw err;
		if (doc == null) {
			db.close();
		} else {
			console.dir(doc);
		}
	});
}

function testInsert(db) {
	/*
	var url = "https://www.reddit.com/r/technology/.json";
	request(url, function(err, res, body) {
		if (!err && res.statusCode == 200) {
			var obj = JSON.parse(body);
			var stories = obj.data.children.map(function(story) { return story.data; });
			var colc = db.collection("reddit");
			colc.insert(stories, function(err, data) {
				if (err) throw err;
				console.dir(data);
				db.close();
			});
		}
	});
	*/
	
	var colc = db.collection("students");
	var obj = { student: "Calvin", age: 6 };
	colc.insert(obj, function(err, doc) {
		console.log(JSON.stringify(doc));
		db.close();
	});
}

function testUpdate(db) {
	/*
	var query = { assignment: "hw1" };
	var colc = db.collection("grades");
	colc.findOne(query, function(err, doc) {
		if (!doc) {
			console.log("No document found");
			db.close();
		} else {
			var query2 = { _id: doc._id };
			doc.date_returned = new Date();
			colc.update(query2, doc, function(err, updateResult) {
				console.log("Updated");
				db.close();
			});
		}
	});
	*/
	
	/*
	var query = { assignment: "hw1" };
	var colc = db.collection("grades");
	var operator = { $set: { date_returned: new Date() } };
	colc.update(query, operator, function(err, updateResult) {
		console.log("Updated " + JSON.stringify(updateResult));
		db.close();
	});
	*/
	
	var colc = db.collection("grades");
	var query = { };
	var operator = { $unset: { date_returned: "" } };
	var options = { multi: true };
	colc.update(query, operator, options, function(err, updateResult) {
		console.log("Updated " + JSON.stringify(updateResult));
		db.close();
	});
}

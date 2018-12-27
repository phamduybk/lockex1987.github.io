var events = require("events");

var emitter = new events.EventEmitter();
var handler = function() {
	console.log("Something happen!");
};

emitter.on("", handler).emit("");

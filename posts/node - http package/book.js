/*
// Book 1
exports.name = "Node.js by example";
exports.read = function() {
	console.log("I'm reading " + exports.name);
}
*/

/*
// Book 2-A
var ratePoint = 0;
exports.rate = function(point) {
	ratePoint = point;
}
exports.getPoint = function() {
	return ratePoint;
}
*/

/*
// Book 2-B
module.exports = function() {
	var ratePoint = 0;
	
	return {
		rate: function(point) {
			ratePoint = point;
		},
		getPoint: function() {
			return ratePoint;
		}
	}
}
*/

// Book 3
var util = require("util");
var events = require("events");
var Class = function() {};
util.inherits(Class, events.EventEmitter);
Class.prototype.ratePoint = 0;
Class.prototype.rate = function(point) {
	this.ratePoint = point;
	this.emit("rated");
}
Class.prototype.getPoint = function() {
	return this.ratePoint;
}
module.exports = Class;



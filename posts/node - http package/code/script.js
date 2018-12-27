/*
// Script 1
var book = require("./book.js");
console.log("Name: " + book.name);
book.read();
*/

/*
// Script 2-A
var bookA = require("./book.js");
var bookB = require("./book.js");
bookA.rate(10);
bookB.rate(20);
console.log(bookA.getPoint(), bookB.getPoint());
*/

/*
// Script 2-B
var bookA = require("./book.js")();
var bookB = require("./book.js")();
bookA.rate(10);
bookB.rate(20);
console.log(bookA.getPoint(), bookB.getPoint());
*/

// Script 3
var BookClass = require("./book.js");
var book = new BookClass();
book.on("rated", function() {
	console.log("Rated with " + book.getPoint());
});
book.rate(10);

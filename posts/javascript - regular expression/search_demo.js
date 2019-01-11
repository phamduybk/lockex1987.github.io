// Search a string for "W3Schools", and display the position of the match
var str = "Visit W3Schools!"; 
var n = str.search("W3Schools");
console.log(n);


var str = "Visit W3Schools";
var n = str.search(/w3schools/i);
console.log(n);

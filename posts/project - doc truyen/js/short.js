var player = document.getElementById("html5Player");
var avatar = document.getElementById("avatar");
var titleDiv = document.getElementById("titleDiv");
var authorSpan = document.getElementById("authorSpan");
var readerSpan = document.getElementById("readerSpan");
var descriptionDiv = document.getElementById("descriptionDiv");

function tctSupportLocalStorage() {
	return (typeof(Storage) !== "undefined");
}

function checkImage(src) {
	var img = new Image();
	img.onload = function() {
		avatar.src = src;
	};
	img.onerror = function() {
		avatar.src = "cttd.jpg";
	};
	img.src = src; // fires off loading of image
}

function playFile(file) {
	player.src = file;
	player.play();
}

function readStory(index) {
	if (tctSupportLocalStorage()) {
		localStorage.index = index;
	}
	var e = playlist[index];
	titleDiv.innerHTML = e.title;
	authorSpan.innerHTML = e.author;
	readerSpan.innerHTML = e.reader;
	descriptionDiv.innerHTML = e.description;
	checkImage("data/" + e.file + ".jpg");
	playFile('data/' + e.file + '.mp3');
}

function init() {
	var listHtmlCode = "";
	for (var i = 0; i < playlist.length; i++) {
		listHtmlCode += "<p><a href='' onclick='readStory(" + i + "); return false;'>+ " + playlist[i].title + "</a></p>";
	}
	document.getElementById("listDiv").innerHTML = listHtmlCode;

	if (tctSupportLocalStorage() && localStorage.index != undefined && localStorage.index < playlist.length) {
		readStory(localStorage.index);
	} else {
		readStory(0);
	}
}

init();

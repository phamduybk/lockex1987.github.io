function checkImage(src) {
	var avatar = document.getElementById("avatar");
	var img = new Image();
	img.onload = function() {
		avatar.src = src;
	};
	img.onerror = function() {
		avatar.src = "cttd.jpg";
	};
	img.src = src; // fires off loading of image
}

function playFile(file, playImmediate) {
	var player = document.getElementById("html5Player");
	player.src = file;
	if (playImmediate) {
		player.play();
	}
}

function readStory(index, playImmediate) {
	localStorage.index = index;

	var e = playlist[index];
	document.getElementById("titleDiv").textContent = e.title;
	document.getElementById("authorSpan").textContent = e.author;
	document.getElementById("readerSpan").textContent = e.reader;
	document.getElementById("descriptionDiv").textContent = e.description;

	checkImage("data/" + e.file + ".jpg");
	playFile('data/' + e.file + '.mp3', playImmediate);
}

function init() {
	var listHtmlCode = "";
	for (var i = 0; i < playlist.length; i++) {
		listHtmlCode += "<p><a href='' onclick='readStory(" + i + ", true); return false;'>+ " + playlist[i].title + "</a></p>";
	}
	document.getElementById("listDiv").innerHTML = listHtmlCode;

	if (localStorage.index != undefined && localStorage.index < playlist.length) {
		readStory(localStorage.index, false);
	} else {
		readStory(0, false);
	}
}

init();

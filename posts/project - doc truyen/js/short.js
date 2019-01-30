// Danh sách các truyện
var playlist


/**
 * Kiểm tra ảnh minh họa.
 * @param {String} src Đường dẫn ảnh
 */
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

/**
 * Play audio.
 * @param {String} file Đường dẫn file audio
 * @param {boolean} playImmediate Có play file audio luôn hay không
 */
function playFile(file, playImmediate) {
	var player = document.getElementById("html5Player")
	player.src = file
	if (playImmediate) {
		player.play()
	}
}

/**
 * Chọn đọc truyện nào đó.
 * @param {Integer} index 
 * @param {boolean} playImmediate Có play file audio luôn hay không
 */
function readStory(index, playImmediate) {
	localStorage.index = index

	var e = playlist[index]
	document.getElementById("titleDiv").textContent = e.title
	//document.getElementById("authorSpan").textContent = e.author
	//document.getElementById("readerSpan").textContent = e.reader
	document.getElementById("descriptionDiv").textContent = e.description

	//checkImage("data/" + e.file + ".jpg")
	//playFile('data/' + e.file + '.mp3', playImmediate)

	checkImage(e.imageLink)
	playFile(e.audioLink, playImmediate)
}

/**
 * Xây dựng danh sách bên trái.
 */
function bindList() {
	var listHtmlCode = ""
	for (var i = 0; i < playlist.length; i++) {
		listHtmlCode += "<p><a href='' onclick='readStory(" + i + ", true); return false;'>+ " + playlist[i].title + "</a></p>"
	}
	document.getElementById("listDiv").innerHTML = listHtmlCode
}

/**
 * Ban đầu hiển thị một truyện nào đó.
 */
function defaultStory() {
	if (localStorage.index != undefined && localStorage.index < playlist.length) {
		readStory(localStorage.index, false)
	} else {
		readStory(0, false)
	}
}

/**
 * Thay thế audio player mặc định.
 */
function initMediaPlayer() {
	createMediaPlayer('#html5Player')
	createMediaPlayer('#myAudioMobile')
}

/**
 * Khởi tạo.
 */
function init() {
	// Lấy dữ liệu từ file JSON
	fetch('stories_with_audio.json')
			.then(response => response.json())
			.then(data => {
				playlist = data

				// 
				bindList()
				defaultStory()
				initMediaPlayer()
				initMobile()
			})
}

init()

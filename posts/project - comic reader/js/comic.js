// Thẻ select chương hiện tại
var currentChapter = $("#currentChapter");

// Đang load đến trang thứ mấy
var loadProgress = document.getElementById("loadProgress");

// Đang đọc đến trang thứ mấy
var readProgress = document.getElementById("readProgress");

// Vùng hiển thị, chứa danh sách các thẻ IMG
var viewer = $("#viewer");

// Danh sách ảnh của chương hiện tại
var links;

// Chỉ số của ảnh hiện tại
var current = 0;

// Danh sách các ảnh
var images;

// Danh sách các chapter
var chapterList;

// Lấy danh sách chapter và bind ra để người dùng chọn
$.getJSON("data/chapters.json", function(data) {
	chapterList = data;
	var select = "";
	var ul = "";
	for (var i = 0; i < chapterList.length; i++) {
		var title = chapterList[i].title;
		ul += "<li><a href='' onclick='viewChapter(" + i + "); return false;'>" + title + "</a></li>";
		select += "<option value='" + i + "'>" + title + "</option>";
	}
	$("#list").html(ul);
	currentChapter.html(select);
});

// Vùng hiển thị danh sách
var comicInfo = $("#comicInfo");

// Vùng xem
var chapterViewer = $("#chapterViewer");

// Index của chapter hiện tại
var curIdx = -1;

/**
 * Hiển thị chapter nào đó
 * @param idx Chỉ số index của chapter
 */
function viewChapter(idx) {
	comicInfo.hide();
	chapterViewer.show();

	// Nếu là chuyển sang chương khác thì mới load lại
	if (curIdx != idx) {
		curIdx = idx;
		getImages();
	}
}

/**
 * Lấy danh sách ảnh của chương hiện tại.
 */
function getImages() {
	currentChapter.val(curIdx);

	$.getJSON("data/" + chapterList[curIdx].jsonFile, function(data) {
		//console.log(JSON.stringify(data));
		initNewChapter(data);
	});
}

/**
 * Load ảnh của chapter.
 * @param data Danh sách ảnh
 */
function initNewChapter(data) {
	links = data;
	current = 0;
	images = [];

	// Cập nhật lại trạng thái đọc và load
	//loadProgress.style.display = "";
	loadProgress.max = links.length;
	readProgress.max = links.length;
	readProgress.value = 1;

	// 
	viewer.empty();
	//index = 0;

	loadImage(0, curIdx);
}

function loadImage(index, chap) {
	if (index < links.length) {
		if (chap == curIdx) {
			var img = new Image();

			// Sau khi load xong thì load ảnh tiếp theo
			img.onload = function() {
				index++;
				loadProgress.value = index;
				loadImage(index, chap);
			};
			img.src = links[index];

			// Ẩn các ảnh tiếp theo, chỉ hiện 1 ảnh
			if (index > 0) {
				img.style.display = "none";
			}

			// Thêm vào danh sách ảnh
			images.push(img);

			// Thêm vào vùng hiển thị
			viewer.append(img);
		}
	} else {
		// Đã load xong
		loadProgress.style.display = "none";

		addSwipeEvent();
	}
}

/**
 * Chuyển ảnh trước hoặc ảnh sau.
 * @param offset -1 là ảnh trước, 1 là ảnh sau
 */
function changeImage(offset) {
	if (current + offset == -1) {
		noti.info("This is the first page");
	} else if (current + offset == images.length) {
		noti.info("This is the last page");
	} else {
		// Ẩn ảnh cũ
		images[current].style.display = "none";

		// Cập nhật lại chỉ số
		current += offset;

		// Hiển thị ảnh mới
		images[current].style.display = "";

		// Cập nhật lại progress đọc
		readProgress.value = current + 1;
	}
}

/**
 * Quay về trang danh sách.
 */
function backToInfo() {
	comicInfo.show();
	chapterViewer.hide();
}

/**
 * Chuyển đến chapter trước.
 */
function previousChapter() {
	if (curIdx == 0) {
		noti.info("This is the first chapter");
	} else {
		curIdx--;
		getImages();
	}
}

/**
 * Chuyển đến trang sau.
 */
function nextChapter() {
	if (curIdx == chapterList.length - 1) {
		noti.info("This is the last chapter");
	} else {
		curIdx++;
		getImages();
	}
}

/**
 * Chuyển đến một trang nào đó
 */
function changeChapter() {
	curIdx = currentChapter.val();
	getImages();
}


/**
 * Khi swipe thì chuyển trang.
 */
function addSwipeEvent() {
	var swipeIt = new SwipeIt("#viewer img", { minDistance: 80 });
	swipeIt
		.on("swipeRight", function(e) {
			// Chuyển đến trang trước
			changeImage(-1);
		})
		.on("swipeLeft", function(e) {
			// Chuyển đến trang sau
			changeImage(1);
		});
}



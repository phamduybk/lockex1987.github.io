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

// Vùng hiển thị danh sách
var comicInfo = $("#comicInfo");

// Vùng xem
var chapterViewer = $("#chapterViewer");

// Index của chapter hiện tại
var curIdx = -1;

// Index của chương đang đọc, lưu ở localStorage
var savedIdx;

//addSwipeEvent();
//$("#viewer").owlCarousel();
var owl = $(".owl-carousel").owlCarousel({ items: 1, autoHeight:true });

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

	savedIdx = localStorage.savedIdx;
	
	bindSavedInfo();

	// Bind event

});

function gotoCurrentSavedChapter() {
	viewChapter(savedIdx);
}

function gotoNextSavedChapter() {
	viewChapter(savedIdx + 1);
}

function gotoPreviousSavedChapter() {
	viewChapter(savedIdx - 1);
}

function bindSavedInfo() {
	console.log("savedIdx:", savedIdx);
	if (savedIdx != undefined && savedIdx != null) {
		$("#savedInfo").show();

		// Trong trường hợp lưu ở localStorage thì là kiểu String
		// Cần chuyển về kiểu số để tính toán cho đúng
		savedIdx = parseInt(savedIdx);

		$("#savedInfo p:nth-child(1) a").show().text(chapterList[savedIdx].title);
		if (savedIdx == chapterList.length - 1) {
			$("#savedInfo p:nth-child(2)").hide();
		} else {
			$("#savedInfo p:nth-child(2) a").show().text(chapterList[savedIdx + 1].title);
		}
		if (savedIdx == 0) {
			$("#savedInfo p:nth-child(3)").hide();
		} else {
			$("#savedInfo p:nth-child(3) a").show().text(chapterList[savedIdx - 1].title);
		}
	} else {
		$("#savedInfo").hide();
	}
}




/**
 * Hiển thị chapter nào đó
 * @param idx Chỉ số index của chapter
 */
function viewChapter(idx) {
	// Ẩn hiện
	comicInfo.hide();
	chapterViewer.show();

	// Lưu lịch sử
	savedIdx = idx;
	localStorage.savedIdx = savedIdx;
	console.log(savedIdx);
	bindSavedInfo();

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
	if (images) {
		//viewer.empty();
		for (var i = 0; i < images.length; i++) {
			owl.trigger('remove.owl.carousel', i).trigger('refresh.owl.carousel');
		}
	}
	

	links = data;
	current = 0;
	images = [];

	// Cập nhật lại trạng thái đọc và load
	//loadProgress.style.display = "";
	loadProgress.max = links.length;
	readProgress.max = links.length;
	readProgress.value = 1;

	loadImage(0, curIdx);
}

function loadImage(index, chap) {
	if (index < links.length) {
		if (chap == curIdx) {
			var img = new Image();

			// Sau khi load xong thì load ảnh tiếp theo
			var nextIndex = index + 1;
			img.onload = function() {
				loadProgress.value = nextIndex;
				loadImage(nextIndex, chap);
			};
			img.src = links[index];

			// Ẩn các ảnh tiếp theo, chỉ hiện 1 ảnh
			if (index > 0) {
				//img.style.display = "none";
			}

			// Thêm vào danh sách ảnh
			images.push(img);

			// Thêm vào vùng hiển thị
			//viewer.append($("<div></div>").append(img));

			//console.log(img.src);
			owl.trigger('add.owl.carousel', img).trigger('refresh.owl.carousel');
		}
	} else {
		// Đã load xong
		loadProgress.style.display = "none";
		owl.trigger('refresh.owl.carousel');
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
		gotoChapter(curIdx - 1);
	}
}

/**
 * Chuyển đến trang sau.
 */
function nextChapter() {
	if (curIdx == chapterList.length - 1) {
		noti.info("This is the last chapter");
	} else {
		gotoChapter(curIdx + 1);
	}
}

/**
 * Chuyển đến một trang nào đó
 */
function changeChapter() {
	gotoChapter(currentChapter.val());
}

/**
 * Chuyển đến một chapter nào đó.
 * @param idx Chỉ số
 */
function gotoChapter(idx) {
	curIdx = idx;
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



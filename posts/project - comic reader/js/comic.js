var comicInfo = $("#comicInfo");
var chapterViewer = $("#chapterViewer");
var currentChapter = $("#currentChapter");
var loadProgress = document.getElementById("loadProgress");
var readProgress = document.getElementById("readProgress");
var viewer = $("#viewer");

var curIdx = -1;
var links;

var current = 0;
var images;

var ul = "";
var ids = [];
var select = "";


for (var i = 0; i < chapterList.length; i++) {
	var title = chapterList[i].title;
	var chapterId = chapterList[i].chapter_id;
	ul += "<li><a href='' onclick='viewChapter(" + i + "); return false;'>" + title + "</a></li>";
	select += "<option value='" + i + "'>" + title + "</option>";
	ids.push(chapterId);	
}

$("#chapters").html(ul);
currentChapter.html(select);

function loadImage(index, chap) {
	if (index < links.length) {
		if (chap == curIdx) {
			var img = new Image();
			img.onload = function() {
				index++;
				loadProgress.value = index;
				loadImage(index, chap);
			};
			img.src = links[index];
			if (index > 0) {
				img.style.display = "none";
			}
			images.push(img);
			viewer.append(img);
		}
	} else {
		loadProgress.style.display = "none";
	}
}

function changeImage(offset) {
	if (current + offset == -1) {
		alert("This is the first page");
	} else if (current + offset == images.length) {
		alert("This is the last page");
	} else {
		images[current].style.display = "none";
		current += offset;
		images[current].style.display = "";
		readProgress.value = current + 1;
	}
}

function backToInfo() {
	comicInfo.show();
	chapterViewer.hide();
}

function viewChapter(idx) {
	comicInfo.hide();
	chapterViewer.show();

	if (curIdx != idx) {
		curIdx = idx;
		getImages();
	}
}

function previousChapter() {
	if (curIdx == 0) {
		alert("This is the first chapter");
	} else {
		curIdx--;
		getImages();
	}
}

function nextChapter() {
	if (curIdx == ids.length - 1) {
		alert("This is the last chapter");
	} else {
		curIdx++;
		getImages();
	}
}

function changeChapter() {
	curIdx = currentChapter.val();
	getImages();
}

function initNewChapter(data) {
	links = data;
	current = 0;
	images = [];
	loadProgress.style.display = "";
	loadProgress.max = links.length;
	readProgress.max = links.length;
	readProgress.value = 1;
	viewer.empty();
	//index = 0;
	loadImage(0, curIdx);
}
function getImages() {
	currentChapter.val(curIdx);
	
	/*
	$.getJSON("get-images.php?chapterId=" + ids[curIdx], function(data) {
		initNewChapter(data);
	});
	*/
	
	//alert(ids);
	//alert(curIdx);
	//alert(ids[curIdx]);
	
	var data = [];
	for (var i = 0; i < allImages.length; i++) {
		if (allImages[i].chapter_id == ids[curIdx]) {
			console.info(allImages[i].link);
			data.push(allImages[i].link);
		}
	}
	
	//alert(data.length);
	initNewChapter(data);
}

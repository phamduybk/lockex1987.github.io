var tabContents;
var tabHeaders;
var tabNum;

function getChildNodes(tagId) {
	var a = document.getElementById(tagId).childNodes;
	var children = new Array();
	var count = 0;
	for (i = 0; i < a.length; i++) {
		if (a[i].nodeType == 1) {
			children[count++] = a[i];
		}
	}
	return children;
}

function openTab(index) {
	for (var i = 0; i < tabNum; i++) {
		tabHeaders[i].className = "inactive";
		tabContents[i * 2 + 1].style.display = "none";
	}
	tabHeaders[index].className = "active";
	tabContents[index * 2 + 1].style.display = "block";
}

function generateTab() {
	tabContents = getChildNodes("tabContent");
	tabNum = tabContents.length / 2;
	var htmlLink = "";
	for (var i = 0; i < tabNum; i++) {
		htmlLink += '<span class="tabstyle" onClick="openTab(' + i + ')">' + tabContents[i * 2].innerHTML + '</span>';
		tabContents[i * 2].style.display = "none";
	}
	document.getElementById("tabHeader").innerHTML = htmlLink;
	tabHeaders = getChildNodes("tabHeader");
	openTab(0);
}

if (window.addEventListener) {
	window.addEventListener("load", generateTab, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", generateTab);
}
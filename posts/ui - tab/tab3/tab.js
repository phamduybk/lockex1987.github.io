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

function openTab(index, tabContentId, tabHeaderId) {
	var tabHeaders = getChildNodes(tabHeaderId);
	var tabContents = getChildNodes(tabContentId);
	tabNum = tabContents.length / 2;
	
	for (var i = 0; i < tabNum; i++) {
		tabHeaders[i].className = "inactive";
		tabContents[i * 2 + 1].style.display = "none";
	}
	tabHeaders[index].className = "active";
	tabContents[index * 2 + 1].style.display = "block";
}

function generateTab(tabContentId, tabHeaderId) {

	var tabContents = getChildNodes(tabContentId);
	tabNum = tabContents.length / 2;
	var htmlLink = "";
	for (var i = 0; i < tabNum; i++) {
		htmlLink += '<span class="tabstyle"><a href="" onClick="javascript: openTab(' + i + ', \'' + tabContentId +
			'\', \'' + tabHeaderId + '\'); this.blur(); this.parentNode.blur(); return false;">' + tabContents[i * 2].innerHTML + '</a></span>';
		tabContents[i * 2].style.display = "none";
	}
	document.getElementById(tabHeaderId).innerHTML = htmlLink;
	openTab(0, tabContentId, tabHeaderId);
}

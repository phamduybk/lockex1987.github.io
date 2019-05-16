// Xóa bớt những cái trùng ở project - mdm

var links;

document.querySelector('#getButton').addEventListener('click', function() {
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, { "message": "getLinks" });
	});
});

document.querySelector('#saveButton').addEventListener('click', function() {
	saveTextAsFile(JSON.stringify(links), 'download.json');
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message == "links") {
		links = request.links;
		document.querySelector('#links').innerHTML = (links.length > 0) ? JSON.stringify(links) : 'Empty';
    }
});

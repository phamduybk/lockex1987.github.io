// http://truyentranhvang.net/index.php?option=com_ttv&view=book&task=viewonline&id=274

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.message == "getLinks") {
		var links = [];
		document.querySelectorAll('.slidesjs-slide').forEach((img, idx) => {
			var fileExtension = img.src.split('.').pop();
			links.push({ url: img.src, name: `${ (idx + 1001).toString().substring(1) }.${fileExtension}` });
		});
		chrome.runtime.sendMessage({ "message": "links", "links": links });
	}
});

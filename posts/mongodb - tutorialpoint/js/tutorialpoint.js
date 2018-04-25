var articles = document.getElementsByTagName("article");

function showCurrent(curIdx) {
	var i;
	for (i = 0; i < articles.length; i++) {
		articles[i].style.display = "none";
	}	
	articles[curIdx].style.display = "";
}

function initLinks() {
	var links = document.querySelectorAll("nav a");
	var i;
	var f;
	for (i = 0; i < links.length; i++) {
		f = function(idx) {
			return function() {
				showCurrent(idx);
			};
		};
		links[i].onclick = f(i);
	}
}

initLinks();
showCurrent(0);

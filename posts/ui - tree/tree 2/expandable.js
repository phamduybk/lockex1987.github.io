function createTree(idname) {
	var list = document.getElementById(idname).getElementsByTagName("li");
	for (var i = 0; i < list.length; i++) {
		var spanTag = document.createElement("span");
		spanTag.className = "symbols";
		if (list[i].getElementsByTagName("ul").length > 0) {
			spanTag.style.backgroundImage = "url(plus.png)";
			spanTag.onclick = function() {
				toogle(this.parentNode);
			}
			list[i].getElementsByTagName("ul")[0].style.display = "none";
		}
		else {
			spanTag.style.backgroundImage = "url(page.png)";
		}
		list[i].insertBefore(spanTag, list[i].firstChild);
	}
}

function toogle(el) {
	el.getElementsByTagName("ul")[0].style.display = (el.getElementsByTagName("ul")[0].style.display == "block") ? "none" : "block";
	el.getElementsByTagName("span")[0].style.backgroundImage = (el.getElementsByTagName("ul")[0].style.display == "block") ? "url(minus.png)" : "url(plus.png)";
}

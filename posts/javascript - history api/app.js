function getPage(url) {
	var req = new XMLHttpRequest();
	req.onload = function() {
		switch (this.status) {
			case 200:
				var data = JSON.parse(this.responseText);
				document.title = data.page;
				document.getElementById("ajax-content").innerHTML = data.content;
				break;
		}
	};
	req.open("get", url + "?view_as=json", true);
	req.send();
}

// Người dùng nhấn phím Back/Forward
window.addEventListener('popstate', function(event) {
	var url = event.state;
	if (url) {
		getPage(url);
	}
});

window.addEventListener("load", function() {
	document.querySelector("#navigator").addEventListener('click', function(event) {
		if (event.target.className == "ajax-nav") {
			if (history.pushState) {
				event.preventDefault();

				var url = event.target.href;
				getPage(url);
				history.pushState(url, null, url);
			}
		}
		event.stopPropagation();
	});
});

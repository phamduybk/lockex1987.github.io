/**
 * Tạo một request AJAX để thêm các thành phần của trang (header, footer)
 * @param divId ID vùng DIV
 * @param url URL của phần template
 */
function includeHtml(divId, url) {
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			document.getElementById(divId).innerHTML = req.responseText;
		}
	};
	req.open("GET", url);
	req.send();
}

/**
 * Kiểm tra thêm vùng DIV header và footer
 * @param divId ID vùng DIV
 * @param targetUrl URL của template
 * @param tag Tên thẻ
 * @param isFirst Thêm vào đầu hay cuối trang (header thêm ở đầu, footer thêm ở cuối)
 */
function checkTemplate(divId, targetUrl, tag, isFirst) {
	var node = document.createElement(tag);
	node.id = divId;
	var body = document.querySelector("body");
	if (isFirst) {
		//body.prepend(node);
		body.insertBefore(node, body.firstChild);
	} else {
		//body.append(node);
		body.appendChild(node);
	}
	
	//includeHtml(divId, targetUrl);
	if (divId == "header") {
		node.innerHTML = `
			        <div class="mw">
								<div id="logo">
									<a title="cd ~" href="/"><span>LOCKE</span><span style="">x1987</span></a>
								</div>
								<div id="menu">
									<ul>
										<li><a href="/posts.html">Posts</a></li>
									</ul>

									<ul class="private">
										<li><a href="/privates.html">Privates</a></li>
									</ul>
									<ul class="private">
										<li><a href="/stories.html">Stories</a></li>
									</ul>
									<ul>
										<li><a href="/cv.html">About</a></li>
									</ul>
								</div>
							</div>`;
	} else {
		node.innerHTML = `&copy; Since 2017`;
	}
	
	// Ẩn các link riêng tư nếu là server public
	if (divId == "header") {
		hidePrivates();
	}
}

/**
 * Kiểm tra xem có phải là server localhost không
 * @return true nếu phải
 */
function isLocalHost() {
	return window.location.hostname == "localhost";
}

function isHomePage() {
	return window.location.pathname == "/";
}

/**
 * Kiểm tra xem có phải là mở file HTML trực tiếp trên máy hay không (không qua server nào)
 * @return true nếu là file HTML trực tiếp
 */
function isLocalFile() {
	return window.location.protocol == "file:";
}

/**
 * Ẩn các link riêng tư nếu là server public.
 */
function hidePrivates() {
	// Neu la local thi hien thi private, con neu khong thi an di
	if (!isLocalHost()) {
		var privates = document.querySelectorAll(".private");
		for (var i = 0; i < privates.length; i++) {
			privates[i].style.display = "none";
		}
	}
}

function loadCss(e, t, n) {
	var i = window.document.createElement("link");
	var o = t || window.document.getElementsByTagName("script")[0];
	i.rel = "stylesheet";
	i.href = e;
	i.media = "only x";
	o.parentNode.insertBefore(i, o);
	setTimeout(function () { i.media = n || "all" })
}

// Thêm Facebook Comments
function addFacebookComment() {
	// Bỏ qua trang chủ, trang danh sách, chạy local
	if (window.location.pathname != "/"
			&& window.location.pathname != "/projects/home/"
			&& window.location.pathname != "/docs/home/"
			&& window.location.hostname != "localhost"
			&& !isLocalFile()) {
				
		// Lấy ra URL tuyệt đối
		// Chú ý data-href đang phân biệt cả giao thức (HTTP và HTTPS)
		// Chuyển về HTTPS hết
		var href = location.href;
		if (!href.startsWith("https")) {
			href = "https" + href.substr(4);
		}
		
		// Vùng div chứa comment
		// Thêm vào dưới vùng article
		var article = document.getElementsByTagName('article')[0];
		var newDiv = document.createElement('div');
		newDiv.className = 'fb-comments';
		newDiv.innerHTML = '<div id="fb-root"></div>'
				+ '<div class="fb-comments" data-href="' + href + '" data-numposts="5" data-width="100%" data-order-by="reverse_time"></div>';
		article.parentNode.insertBefore(newDiv, article.nextSibling);
		
		// Thêm JS của Facebook
		var js = document.createElement('script');
		js.id = 'facebook-jssdk';
		js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=1480781938682362';
		var fjs = document.getElementsByTagName('script')[0];
		fjs.parentNode.insertBefore(js, fjs);
	}
}

//loadCss("https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500&amp;subset=vietnamese");

// Hàm này sẽ được thực hiện khi load trang
window.addEventListener("load", function() {
	// Add more sections: header and footer
	//var header = document.querySelector("#header");
	//header == null && 
	if (!isLocalFile() && !isHomePage()) {
		// Relative path to the JS file?
		checkTemplate("header", "../../layout/header.html", "header", true);
		checkTemplate("footer", "../../layout/footer.html", "footer", false);
	}
	
	//addFacebookComment();
});

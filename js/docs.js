/**
 * Thêm vùng header chung.
 */
function addHeader() {
	var node = document.createElement("header");
	node.id = "header";
	node.innerHTML = `
		        <div class="mw">
							<div id="logo">
								<a title="cd ~" href="/"><span>LOCKE</span><span style="">x1987</span></a>
							</div>
							<div id="menu">
								<ul>
									<li><a href="/posts.html">Posts</a></li>
								</ul>
								<ul>
									<li><a href="/cv.html">About</a></li>
								</ul>
							</div>
						</div>`;
	document.body.insertBefore(node, document.body.firstChild);
    console.log("Add header");
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
// Không sử dụng "load" vì như vậy phải chờ sau khi load xong hoàn toàn trang (cả CSS, ảnh, frame)
// Sử dụng DOMContentLoaded
window.addEventListener("DOMContentLoaded", function() {
	if (!isLocalFile() && !isHomePage()) {
		addHeader();
	}
	
	//addFacebookComment();
});


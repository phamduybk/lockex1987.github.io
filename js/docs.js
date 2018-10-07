/**
 * Thêm vùng header chung.
 */
function addHeader() {
	var mainHeader = document.createElement("header");
	mainHeader.id = "header";
	mainHeader.innerHTML = `
		        <div class="mw">
							<div id="logo">
								<a title="cd ~" href="/"><span style="color: #0572b9">LOCKE</span><img src="/images/logo.svg" style="width: 16px; margin-right: 5px;"/><span style="color: #ca252a">2087</span></a>
							</div>
							<div id="menu">
								<ul>
									<li><a href="/posts.html?bookmark=true">Bookmarks</a></li>
								</ul>
								<ul>
									<li><a href="/posts.html">Posts</a></li>
								</ul>
								<ul>
									<li><a href="/explorer.html">Explorer</a></li>
								</ul>
								<ul>
									<li><a href="/cv.html">About</a></li>
								</ul>
							</div>
						</div>`;
	document.body.insertBefore(mainHeader, document.body.firstChild);
    

	var subHeader = document.createElement("div");
	subHeader.innerHTML = `
					<div class="subHeader">
						<div class="headRow1">
							<div class="logo">
								<a href="/"><img src="/images/logo.svg" style="width: 24px"/></a>
							</div>
							<form class="search" action="/posts.html" onsubmit="return document.querySelector('#text2').value.trim().length >= 3">
								<input type="text" id="text2" name="text" class="text2" placeholder="Search...">
							</form>
						</div>
						<div class="headRow2">
							<div class="link">
								<a href="/posts.html?bookmark=true">Bookmarks</a>
							</div>
							<div  class="link" style="display:none">
								<a href="#" onclick="displayBookmarks()">Bookmark 2</a>
								<ul id="bookmarkList"></ul>
							</div>
							<div class="link">
								<a href="/posts.html">Posts</a>
							</div>
							<div class="link" style="display:none">
								<a href="/explorer.html">Explorer</a>
							</div>
							<div class="link">
								<a href="/cv.html">About</a>
							</div>
						</div>
					</div>`;

	document.body.insertBefore(subHeader, mainHeader);

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

function toggleNavbarWhenScroll() {
	var prevScrollPos = window.pageYOffset;
	var header = document.querySelector('.subHeader');
	var isHide = false;

	var navbarHeight = getComputedStyle(document.body).getPropertyValue('--header-height');
	navbarHeight = parseInt(navbarHeight.replace('px', '')) + 5;

	window.addEventListener('scroll', function() {
		var currentScrollPos = window.pageYOffset;
		
		// Make sure they scroll more than delta
		var delta = 5;
		if (Math.abs(prevScrollPos - currentScrollPos) <= delta) {
			return;
		}
		if (prevScrollPos > currentScrollPos) {
			// Scroll Up
			if (isHide) {
				header.classList.remove('nav-hide');
				isHide = false;
			}
		} else {
			// Scroll Down
			// If they scrolled down and are past the navbar, add class .nav-up.
			// This is necessary so you never see what is "behind" the navbar.
			if (currentScrollPos > navbarHeight) {
				if (!isHide) {
					header.classList.add('nav-hide');
					isHide = true;
				}
			}
		}
		
		// Save previous scroll position
		prevScrollPos = currentScrollPos;    
	});
}

//t = current time
//b = start value
//c = change in value
//d = duration
function easeInOutQuad(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
}

function scrollTo(element, to, duration) {
	var start = element.scrollTop;
	var difference = to - start;
	var currentTime = 0;
	var increment = 10;
	var perTick = difference * increment / duration;
	
	var animateScroll = function() {
        currentTime += increment;
		element.scrollTop = easeInOutQuad(currentTime, start, difference, duration);
		//element.scrollTop = element.scrollTop + perTick;
        if (currentTime < duration) {
			setTimeout(animateScroll, increment);    
		}
	};
	animateScroll();
}

function runScrollBodyToTop() {
	scrollTo(document.documentElement, 0, 600);
}

function addScrollToTopButton() {
	var prevScrollPos = window.pageYOffset;
	var floatButton = document.createElement('div');
	floatButton.textContent = 'Top';
	floatButton.className = 'float-button float-hide';
	floatButton.addEventListener("click", runScrollBodyToTop, false);
	document.body.appendChild(floatButton);
	var isHide = true;

	window.addEventListener('scroll', function() {
		var currentScrollPos = window.pageYOffset;
		
		// Make sure they scroll more than delta
		var delta = 5;
		if (Math.abs(prevScrollPos - currentScrollPos) <= delta) {
			return;
		}
		// Chỉ hiển thị khi cách top khá xa
		if (currentScrollPos < 200) {
			if (!isHide) {
				floatButton.classList.add('float-hide');
				isHide = true;
			}
		} else {
			if (prevScrollPos > currentScrollPos) {
				// Scroll Up	
				if (isHide) {
					floatButton.classList.remove('float-hide');
					isHide = false;
				}
			} else {
				// Scroll Down
				if (!isHide) {
					floatButton.classList.add('float-hide');
					isHide = true;
				}
			}
		}
		
		// Save previous scroll position
		prevScrollPos = currentScrollPos;    
	});
}

function setBrowserThemeColor() {
    document.head.insertAdjacentHTML('beforeend', '<meta name="theme-color" content="#55acee">');
}

// Hàm này sẽ được thực hiện khi load trang
// Không sử dụng "load" vì như vậy phải chờ sau khi load xong hoàn toàn trang (cả CSS, ảnh, frame)
// Sử dụng DOMContentLoaded
window.addEventListener("DOMContentLoaded", function() {
	if (!isLocalFile() && !isHomePage()) {
		addHeader();
		toggleNavbarWhenScroll();
		addScrollToTopButton();
	}

	//addFacebookComment();

    setBrowserThemeColor();
});


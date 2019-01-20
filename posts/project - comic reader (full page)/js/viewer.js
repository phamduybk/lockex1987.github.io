var Viewer = (function() {

    // Mảng các phần tử ảnh
	var images;

    // Chỉ số index của trang hiện tại
    var currentIndex;
    
    // Thành phần chính
    var readerBox = document.querySelector("#readerBox");

    /**
     * Hiển thị ảnh các trang của 1 tập truyện.
     * @param {Array} urls Mảng đường dẫn ảnh các trang
     */
    function displayImages(urls) {
        Screen.showViewer();
        addImagesToPage(urls);
        currentIndex = 0;
        displayCurrent();
    }

    /**
     * Thêm các phần tử ảnh vào trang.
     */
    function addImagesToPage(urls) {
        readerBox.innerHTML = '';
        images = [];
        urls.forEach(u => {
            //console.log(u);
            var img = document.createElement("img");
            img.className = "img-page";
            img.src = u;
            img.style.display = "none";
            readerBox.appendChild(img);
            images.push(img);
        });
    }

    /**
     * Ẩn trang hiện tại.
     */
	function hideCurrent() {
		images[currentIndex].style.display = "none";
	}

    /**
     * Hiện trang hiện tại
     */
	function displayCurrent() {
		images[currentIndex].style.display = "";

        // Hiển thị chỉ số trang ở thanh trạng thái
		document.querySelector("#currentIndexLabel").textContent = (currentIndex + 1) + " / " + images.length;
		var percent = (currentIndex + 1) * 100 / images.length;
		document.querySelector("#bar").style.width = percent + "%";
	}

    /**
     * Chuyển trang.
     * @param {Integer} offset Đến trang tiếp (1) hoặc trang trước đó (-1)
     */
	function gotoPage(offset) {
		hideCurrent();
		currentIndex += offset;
		displayCurrent();
    }

    /**
     * Xử lý full-screen.
     */
    function toggleFullScreen() {
        if (isFullscreen()) {
            escapeFullscreen();
        } else {
            fullscreen(readerBox);
        }
    }

    function _init() {
        // Thêm sự kiện swipe trái và phải
        var mc = new Hammer(readerBox);
        mc.on("swipeleft swiperight tap", function(ev) {
            if (ev.isFinal) {
                if (ev.type == 'swipeleft') {
                    if (currentIndex + 1 < images.length) {
                        gotoPage(1);
                    }
                } else if (ev.type == 'swiperight') {
                    if (currentIndex - 1 >= 0) {
                        gotoPage(-1);
                    }
                } else if (ev.type == 'tap') {
                    toggleFullScreen();
                }
                console.log(ev.type +" gesture detected. " + ev.distance);
            }
        });

        // Chuyển về trang danh sách
        document.querySelector('#currentProgress').addEventListener('click', function() {
            Screen.showList();
        });
    }

    _init();

    return {
        displayImages
    }
})();
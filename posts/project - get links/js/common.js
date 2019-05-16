/**
 * Lưu xâu vào file.
 * Link gốc ở:
 *     https://lockex1987.github.io/posts/javascript%20-%20file%20saver/
 */
function saveTextAsFile(textToWrite, fileNameToSaveAs) {
	var textFileAsBlob = new Blob([textToWrite], { type:'text/plain' });
	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
	downloadLink.style.display = "none";
	downloadLink.onclick = function(event) {
		document.body.removeChild(event.target);
	};
	document.body.appendChild(downloadLink);
	downloadLink.click();
}

/**
 * Lấy danh sách ảnh (trường hợp đơn giản).
 */
function getImages() {
    var images = [];
    document.querySelectorAll('.entry-content img').forEach((img, i) => {
        images.push({
			url: img.src,
			name: createLocalFileName('direct', i, 'png')
		});
    });	
	var text = JSON.stringify(images);
	saveTextAsFile(text, 'download.json');
}

/**
 * Lấy số thứ tự chương từ tên chương.
 * @param {String} title Tên chương
 */
function extractChapterNumber(title) {
	var re = /\d+/ig;
	var result = re.exec(title);
	if (result) {
		return result[0];
	} else {
		return title;
	}
}

/**
 * Download danh sách các chương truyện.
 */
function downloadChapterLinks(getChapterLinksFunc) {
	var chapterLinks = getChapterLinksFunc();
	var text = '';
	chapterLinks.forEach(c => {
		text += `{ url: "${c.url}", title: "${c.title}", chapterNo: "${c.chapterNo}" },\n`
	});
	saveTextAsFile(text, 'chapter links.json');
}

/**
 * Kiểm tra xem ảnh có phải là quảng cáo, credit hay không. Để loại bỏ.
 * @param {String} imageUrl 
 * @param {Array} blackList 
 */
function isExtraImage(imageUrl, blackList) {
	for (var i = 0; i < blackList.length; i++) {
		if (imageUrl.includes(blackList[i])) {
			return true;
		}
	}
	return false;
}

/**
 * Lấy danh sách ảnh của các chương.
 * @param {Array} chapterLinks Danh sách chương
 */
function getAllDownloads(processChapterFunc, chapterLinks) {
    // Chỉ số chương hiện tại đang xử lý
	var currentIndex = 0;
    // Mảng các ảnh để download
	var allDownloads = [];
	
    /**
     * Hàm callback sau khi lấy được danh sách ảnh của từng chương.
     * @param {Array} images Danh sách ảnh của 1 chương
     * @param {String} chapterNo Số chương (thư mục lưu)
     */
	function callbackFunc(images, chapterNo) {
		console.log('Done', chapterNo);

        // Thêm danh sách ảnh của chương đó vào danh sách tổng chung
		allDownloads = allDownloads.concat(images);		
	
		// Tăng chỉ số chương
		currentIndex++;


		if (currentIndex < chapterLinks.length) {
            // Nếu vẫn còn chương thì crawl tiếp
			crawl();
		} else {
            // Nếu đã crawl xong thì lưu danh sách download ảnh
			console.log('Finish', allDownloads.length);
			//var text = JSON.stringify(allDownloads, null, 2);
			var text = JSON.stringify(allDownloads);
			var fileName = `all downloads ${chapterLinks[0].chapterNo} - ${chapterLinks[chapterLinks.length - 1].chapterNo}.json`;
			saveTextAsFile(text, fileName);
		}
	}
	
    /**
     * Hàm crawl.
     */
	function crawl() {
		var chapterObj = chapterLinks[currentIndex];
		var chapterUrl = chapterObj.url;
		var chapterNo = chapterObj.chapterNo;
		processChapterFunc(chapterUrl, chapterNo, callbackFunc);
	}
	
	crawl();
}

/**
 * Lấy đuôi mở rộng của URL ảnh.
 * @param {String} url URL
 */
function getImageExtension(url) {
    var fileExtension = url.split('.').pop().toLowerCase();
    if (!['jpg', 'jpeg', 'png'].includes(fileExtension)) {
        fileExtension = 'jpg';
    }
    return fileExtension;
}

/**
 * Chuyển nhiều dấu cách thành 1 dấu cách.
 * @param {String} text Xâu text
 */
function normalizeSpaces(text) {
	return text.replace(/\s+/g, ' ');
}

/**
 * Parse mã HTML để sử dụng các hàm xử lý DOM.
 * Nếu sử dụng cách tạo 1 thẻ div, sau đó thiết lập innerHTML thì sẽ request đến cả ảnh, có thể chậm.
 * @param {String} htmlCode Mã HTML
 */
function parseDocumentFromString(htmlCode) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(htmlCode, "text/html");
	return doc;
}

/**
 * Tạo tên file để download xuống máy tính.
 * @param {String} chapterNo Tên chương (tên thư mục)
 * @param {Integer} idx Chỉ số của file (bắt đầu từ 0)
 * @param {String} fileExtension Đuôi mở rộng của file
 */
function createLocalFileName(chapterNo, idx, fileExtension) {
	return `${chapterNo}/${ (idx + 1001).toString().substring(1) }.${fileExtension}`;
}

/**
 * Lấy danh sách tên chương từ các thẻ A.
 * @param {String} cssSelector CSS selector ra các thẻ A
 */
function getChapterLinksFromCssSelector(cssSelector) {
	var chapterLinks = [];
	document.querySelectorAll(cssSelector).forEach((aTag, idx, arr) => {
		var title = aTag.textContent.trim();
		var url = aTag.href;
		var chapterNo = extractChapterNumber(title);
		chapterLinks.unshift({
			url,
			title,
			chapterNo
		});
	});
	return chapterLinks;
}
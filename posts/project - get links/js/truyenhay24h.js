// https://truyenhay24h.com/tieu-ngao-giang-ho.html

// PART 1: GET CHAPTERS
// Những cái này thường giống nhau
function extractChapterNumber(title) {
	var re = /\d+/ig;
	var result = re.exec(title);
	if (result) {
		return result[0];
	} else {
		return title;
	}
}

function downloadChapterLinks() {
	var chapterLinks = getChapterLinks();
	var text = '';
	chapterLinks.forEach(c => {
		text += `{ url: "${c.url}", title: "${c.title}", chapterNo: "${c.chapterNo}" },\n`
	});
	saveTextAsFile(text, 'chapter links.json');
}

// Những cái này thường thay đổi
function getChapterLinks() {
	var chapterLinks = [];
	document.querySelectorAll('.chapname a').forEach(aTag => {
		var title = aTag.textContent.trim();
		var chapterNo = extractChapterNumber(title);
		var url = aTag.href;
		chapterLinks.unshift({
			url,
			title,
			chapterNo
		});
	});
	//console.log(JSON.stringify(chapterLinks, null, 2));
	return chapterLinks;
}

//downloadChapterLinks();



// PART 2: PROCESS CHAPTERS
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

// Những cái này thường giống nhau
function isExtraImage(imageUrl) {
	var blackList = [
		'EarthDay%5B1%5D.jpg',
		'Credit.jpg',
		'Click-Like.jpg',
		'Tuyen-Dung.jpg'
	];
	for (var i = 0; i < blackList.length; i++) {
		if (imageUrl.includes(blackList[i])) {
			return true;
		}
	}
	return false;
}


function getAllDownloads(chapterLinks) {
	var currentIndex = 0;
	var allDownloads = [];
	
	function callbackFunc(images, chapterNo) {
		console.log('Done', chapterNo);

		allDownloads = allDownloads.concat(images);		
	
		// Crawl tập mới
		currentIndex++;

		if (currentIndex < chapterLinks.length) {
			crawl();
		} else {
			console.log('Finish', allDownloads.length);
			//var text = JSON.stringify(allDownloads, null, 2);
			var text = JSON.stringify(allDownloads);
			var fileName = `all downloads ${chapterLinks[0].chapterNo} - ${chapterLinks[chapterLinks.length - 1].chapterNo}.json`;
			saveTextAsFile(text, fileName);
		}
	}
	
	function crawl() {
		var chapterObj = chapterLinks[currentIndex];
		var chapterUrl = chapterObj.url;
		var chapterNo = chapterObj.chapterNo;
		processChapter(chapterUrl, chapterNo, callbackFunc);
	}
	
	crawl();
}




// Những cái này thường thay đổi
function GTI(ImageSRC){
	ImageSRC=ImageSRC.substring(0,ImageSRC.length-5);
	if(ImageSRC.indexOf('.ggpht.com')!=-1){
		ImageSRC=ImageSRC.replace('lh1.ggpht.com','1.bp.blogspot.com');
		ImageSRC=ImageSRC.replace('lh2.ggpht.com','2.bp.blogspot.com');
		ImageSRC=ImageSRC.replace('lh3.ggpht.com','3.bp.blogspot.com');
		ImageSRC=ImageSRC.replace('lh4.ggpht.com','4.bp.blogspot.com');
		ImageSRC=ImageSRC.replace('lh5.ggpht.com','3.bp.blogspot.com');
		ImageSRC=ImageSRC.replace('lh6.ggpht.com','4.bp.blogspot.com')};
		if(ImageSRC.indexOf('-focus-opensocial.googleusercontent.com')!=-1&&ImageSRC.indexOf('&url=')!=-1){
			ImageSRC=ImageSRC.substring(ImageSRC.lastIndexOf('&url=')+5);
			ImageSRC=decodeURIComponent(ImageSRC)};
			if(ImageSRC.indexOf('-focus-opensocial.googleusercontent.com')!=-1&&ImageSRC.indexOf('&amp;url=')!=-1){
				ImageSRC=ImageSRC.substring(ImageSRC.lastIndexOf(';url=')+5);
				ImageSRC=decodeURIComponent(ImageSRC)};
				if(ImageSRC.indexOf('bp.blogspot.com')!=-1){
					if(ImageSRC.indexOf('?imgmax=')!=-1)
						ImageSRC=ImageSRC.substring(0,ImageSRC.indexOf('?'));
				if(!isMobile())
					ImageSRC=ImageSRC+"?imgmax=0";
				else ImageSRC=ImageSRC+"?imgmax=1000"};
				if(ImageSRC.indexOf('/s0/')!=-1){
					if(!isMobile())ImageSRC=ImageSRC.replace('/s0/','/s2000/');
				else ImageSRC=ImageSRC.replace('/s0/','/s1000/')};
				if(ImageSRC.indexOf('?imgmax=2000')!=-1){
					if(isMobile())
						ImageSRC=ImageSRC.replace('?imgmax=2000','?imgmax=1000')};
					if(ImageSRC.indexOf('//i.imgur.com')!=-1||ImageSRC.indexOf('i.blogtruyen.com')!=-1||ImageSRC.indexOf('truyentranh8.net')!=-1||ImageSRC.indexOf('st.comicvn.net')!=-1||ImageSRC.indexOf('otakusan.net')!=-1){ImageSRC='https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&resize_h=0&rewriteMime=image%2F*&url='+encodeURIComponent(ImageSRC)};return ImageSRC
}

function processChapter(chapterUrl, chapterNo, callbackFunc) {
	fetch(chapterUrl)
			.then(response => response.text())
			.then(htmlCode => {
				// function LImg(){ GI2017(223,1,'704e3e90ef85886816f4e6dd52c8367e','0','TIẾU NGẠO GIANG HỒ-Chương 1');}
				var regex = /GI2017\((\d+),([^,]+),'([^']+)','([^']+)','([^']+)'\);/g;
				var result = regex.exec(htmlCode);
				if (!result) {
					console.log('Không tìm thấy hàm LImg');
				} else {
					var pid = result[1];
					var chapter = result[2];
					var cc18 = result[3];
					
					var name = "";
					var s = "0";
					//console.log(pid, chapter, cc18);
					var url = "https://truyenhay24h.com/TH24Service.asmx/GetChapterImages";
					fetch(url, {
							method: "POST",
							body: JSON.stringify({
								ChapNumber: chapter,
								PID: pid,
								cc18: cc18,
								name: name,
								s: s
							}),
							headers: {
								'Content-Type': 'application/json; charset=UTF-8'
							}
						})
						.then(response => response.json())
						.then(data => {
							//console.log(data);
							var images = [];
							data.d.forEach(d => {
								//d = d.replace(/\s+/gi, '');
								d = d.substring(0, d.length - 5);
								
								if (!isExtraImage(d)) {
									var fileExtension = d.split('.').pop().toLowerCase();
									if (!['jpg', 'jpeg', 'png'].includes(fileExtension)) {
										fileExtension = 'jpg';
									}

									images.push({
										url: d,
										name: `${chapterNo}/${ (images.length + 1001).toString().substring(1) }.${fileExtension}`
									});
								}
							});
							//console.log(images);
							
							if (images.length == 0) {
								console.log('Stop', chapterNo);
							} else {
								callbackFunc(images, chapterNo);
							}
						});
				}
			});
}


getAllDownloads([
{ url: "https://truyenhay24h.com/223/tieu-ngao-giang-ho-chuong-81.html", title: "Chap 81A : Hắc Mộc Nhai (P1)", chapterNo: "81a" },
{ url: "https://truyenhay24h.com/223/tieu-ngao-giang-ho-chuong-81.5.html", title: "Chap 81B : Hắc Mộc Nhai (P2)", chapterNo: "81b" },
{ url: "https://truyenhay24h.com/223/tieu-ngao-giang-ho-chuong-82.1.html", title: "Chap 82A : Đông Phương Bất Bại (P1)", chapterNo: "82a" },
{ url: "https://truyenhay24h.com/223/tieu-ngao-giang-ho-chuong-82.2.html", title: "Chap 82B : Đông Phương Bất Bại (P2)", chapterNo: "82b" },
{ url: "https://truyenhay24h.com/223/tieu-ngao-giang-ho-chuong-83.1.html", title: "Chap 83A : Thêu Hoa (P1)", chapterNo: "83a" },
{ url: "https://truyenhay24h.com/223/tieu-ngao-giang-ho-chuong-83.2.html", title: "Chap 83B : Thêu Hoa (P2)", chapterNo: "83b" },
{ url: "https://truyenhay24h.com/223/tieu-ngao-giang-ho-chuong-84.1.html", title: "Chap 84A : Bảo Điển Thần Công (P1)", chapterNo: "84a" },
{ url: "https://truyenhay24h.com/223/tieu-ngao-giang-ho-chuong-84.2.html", title: "Chap 84B : Bảo Điển Thần Công (P2)", chapterNo: "84b" },
{ url: "https://truyenhay24h.com/223/tieu-ngao-giang-ho-chuong-85.1.html", title: "Chap 85A : Tử Chiến (P1)", chapterNo: "85a" },
{ url: "https://truyenhay24h.com/223/tieu-ngao-giang-ho-chuong-85.2.html", title: "Chap 85B : Tử Chiến (P2)", chapterNo: "85b" },
]);

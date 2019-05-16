// https://truyenhay24h.com/tieu-ngao-giang-ho.html

/**
 * Lấy danh sách chương.
 */
function getChapterLinks() {
	return getChapterLinksFromCssSelector('.chapname a');
}

/**
 * Xử lý từng chương.
 * @param {String} chapterUrl URL của chương
 * @param {String} chapterNo Số thứ tự chương (thư mục lưu)
 * @param {Function} callbackFunc Hàm callback sau khi thực hiện xong
 */
function processChapter(chapterUrl, chapterNo, callbackFunc) {
	var blackList = [
		'EarthDay%5B1%5D.jpg',
		'Credit.jpg',
		'Click-Like.jpg',
		'Tuyen-Dung.jpg'
	];

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
								// Tham khảo hàm GTI
								d = d.substring(0, d.length - 5);

								if (!isExtraImage(d, blackList)) {
									var fileExtension = getImageExtension(d);
									images.push({
										url: d,
										name: createLocalFileName(chapterNo, images.length, fileExtension)
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

// Thực thi
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

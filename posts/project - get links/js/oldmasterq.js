// https://www.oldmasterq.com/comics/:index/
// index từ 1 đến 2313

function saveFile(startIndex, endIndex, text) {
  //console.log(text);
  var fileName = `${startIndex}-${endIndex}.json`;
  saveTextAsFile(text, fileName);
}

function crawlImage(startIndex, endIndex) {
  var currentIndex = startIndex;
  // Mảng các phần tử { index, url }
  var text = '';
  // Số lần thử lại
  var retry = 0;

  function processPage() {
    var linkUrl = `https://www.oldmasterq.com/comics/${currentIndex}/`;
    fetch(linkUrl)
        .then(response => response.text())
        .then(htmlCode => {
          retry = 0;
          //console.log(htmlCode);

          // Nếu sử dụng innerHTML thì sẽ request đến cả ảnh, có thể chậm
          /*
          var doc = document.createElement('div');
          doc.innerHTML = htmlCode;
          var imgTag = doc.querySelector('.main-image');
          var imageUrl = imgTag.src;
          var name = imgTag.alt;
          */

          // Sử dụng biểu thức chính quy thử xem
          var reg = /<img src="(.*?)" border="0" class="main-image" alt="(.*?)">/;
          var arr = reg.exec(htmlCode);
          var imageUrl = arr[1];
          var name = arr[2];

          console.log(currentIndex, imageUrl, name);
          text += `{ "index": ${currentIndex}, "url": "${imageUrl}", "name": "${name}" },` + "\n";

          currentIndex++;
          if (currentIndex > endIndex) {
            // Nếu đã kết thúc
            saveFile(startIndex, endIndex, text)
          } else {
            processPage();
          }
        })
        .catch(error => {
          console.error('Error:', error);

          if (retry > 3) {
            console.log('Download file tới thời điểm hiện tại');
            saveFile(startIndex, currentIndex - 1, text);
          } else {
            // Thử lại sau 5 giây
            console.log('Retry', retry);
            retry++;
            setTimeout(processPage, 5 * 1000);
          }
        });
  }

  processPage();
}

//for (var i = 1; i <= 200)
//crawlImage(1, 100);
//crawlImage(101, 200);
//crawlImage(201, 300);
//crawlImage(252, 300);
//crawlImage(289, 300);
//crawlImage(301, 400);
//crawlImage(401, 500);
//crawlImage(501, 600);
//crawlImage(601, 700);
//crawlImage(701, 800);
//crawlImage(801, 1000);
//crawlImage(1001, 1500);
//crawlImage(1501, 2000);
//crawlImage(2001, 2313);
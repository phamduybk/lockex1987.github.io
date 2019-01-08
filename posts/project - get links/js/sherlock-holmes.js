// http://ignisart.com/camdenhouse/canon/index.html

// Dùng web developer tools để thêm id cho bảng chứa mục lục
function getTableOfContent() {
    document.querySelectorAll('#toc-1 tbody tr').forEach(tr => {
	    var cells = tr.querySelectorAll('td');
        var title = cells[0].textContent.trim();
	    var atag = cells[1].querySelector('a');
	    var link = atag.href;
	    console.log(JSON.stringify({ title, link }) + ',');
    });
}

//getTableOfContent()

// Ta sẽ được danh sách bên dưới
var data = [
	{"title":"A Scandal in Bohemia","link":"http://ignisart.com/camdenhouse/canon/scan.htm"},
	{"title":"The Red headed League","link":"http://ignisart.com/camdenhouse/canon/redh.htm"},
	{"title":"A Case of Identity","link":"http://ignisart.com/camdenhouse/canon/iden.htm"},
	{"title":"The Boscombe Valley Mystery","link":"http://ignisart.com/camdenhouse/canon/bosc.htm"},
	{"title":"The Five Orange Pips","link":"http://ignisart.com/camdenhouse/canon/five.htm"},
	{"title":"The Man with the Twisted Lip","link":"http://ignisart.com/camdenhouse/canon/twis.htm"},
	{"title":"The Adventure of the Blue Carbuncle","link":"http://ignisart.com/camdenhouse/canon/blue.htm"},
	{"title":"The Adventure of the Speckled Band","link":"http://ignisart.com/camdenhouse/canon/spec.htm"},
	{"title":"The Adventure of the Engineer's Thumb","link":"http://ignisart.com/camdenhouse/canon/engr.htm"},
	{"title":"The Adventure of the Noble Bachelor","link":"http://ignisart.com/camdenhouse/canon/nobl.htm"},
	{"title":"The Adventure of the Beryl Coronet","link":"http://ignisart.com/camdenhouse/canon/bery.htm"},
	{"title":"The Adventure of the Copper Beeches","link":"http://ignisart.com/camdenhouse/canon/copp.htm"}
];

function cleanHtml(node, changeTitle) {
    // Xóa các phần tử thừa
	node.querySelectorAll('img[src="0.gif"], img[src="../img/ornam.gif"], font[color="#808080"]').forEach(img => {
		img.parentNode.removeChild(img);
	});

    // Chuẩn hóa đường dẫn ảnh
	node.querySelectorAll('img').forEach(img => {
		img.src = img.src.replace(/\.\.\//g, 'http://ignisart.com/camdenhouse/');
		img.removeAttribute('width');
		img.removeAttribute('height');
		img.parentNode.parentNode.replaceChild(img, img.parentNode);
	});

    // Xóa các phần tử rỗng
	node.querySelectorAll('p').forEach(p => {
		//p.removeAttribute('align');
		if (!p.textContent) {
			p.parentNode.removeChild(p);
		}

	});

    // Thay thế dòng tiêu đề
    if (changeTitle) {
        var titleTag = node.querySelector('p');
        var h3Tag = document.createElement('h3');
        h3Tag.textContent = titleTag.textContent;
        titleTag.parentNode.replaceChild(h3Tag, titleTag);
    }
	
	//console.log(node.innerHTML);
	return node.innerHTML;
}

function normalizeFileName(title) {
    return title.toLowerCase().replace(/\s+/g, '_').replace(/\'/g, '') + '.html';
}

function crawlPage(title, link) {
    var finalHtml = '';
    var fileName = normalizeFileName(title);
    //console.log(fileName);

    fetch(link)
	    .then(response => response.arrayBuffer())
	    .then(buffer => {
            // Trang web gốc có charset lạ, dẫn đến bị lỗi ký tự đặc biệt
            // Để lấy charset của một trang web, chúng ta sử dụng lệnh sau:
            // document.characterSet
            // Sau đó chúng ta sẽ convert lại charset UTF-8
		    let decoder = new TextDecoder("windows-1252");
		    let htmlCode = decoder.decode(buffer);
		    //console.log(htmlCode);

		    //var parser = new DOMParser();
            //var doc = parser.parseFromString(htmlCode, "text/html");
		    var doc = document.createElement('div');
		    doc.innerHTML = htmlCode;
		    
		    var cells = doc.querySelectorAll('td');
		    //console.log(cells.length); // 12

		    finalHtml += cleanHtml(cells[5], true);
		    finalHtml += cleanHtml(cells[8], false);
		
		    //console.log(finalHtml);
		    saveTextAsFile(finalHtml, fileName);
	    });
}

data.forEach(e => crawlPage(e.title, e.link));


function getImages() {
    var urls = [];
    document.querySelectorAll('.entry-content img').forEach((img, i) => {
        urls.push({ url: img.src, name: `${ (i + 1001).toString().substring(1) }.png` });
    });	
	var text = JSON.stringify(urls);
	saveTextAsFile(text, 'download.json');
}

getImages();

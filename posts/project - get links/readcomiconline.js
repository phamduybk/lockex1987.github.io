// https://readcomiconline.to/Comic/A-Lucky-Luke-Adventure/Issue-70?id=142941


var urls = [];
lstImages.forEach((s, i) => {
	var fileExtension = s.split('.').pop();
	urls.push({ url: s, name: `${ (i + 1001).toString().substring(1) }.${fileExtension}` });
});
var text = JSON.stringify(urls);

var fileName = 'download.json';
var textFileAsBlob = new Blob([text], { type:'text/plain' });
var hrefLink = window.URL.createObjectURL(textFileAsBlob);

var downloadLink = document.createElement("a");
downloadLink.download = fileName;
downloadLink.innerHTML = "Download File";
downloadLink.href = hrefLink;
downloadLink.style.display = "none";
downloadLink.onclick = function(event) {
	document.body.removeChild(event.target);
};
document.body.appendChild(downloadLink);
downloadLink.click();

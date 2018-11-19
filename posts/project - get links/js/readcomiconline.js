// https://readcomiconline.to/Comic/A-Lucky-Luke-Adventure/Issue-70?id=142941

var urls = [];
lstImages.forEach((s, i) => {
	var fileExtension = s.split('.').pop();
	urls.push({ url: s, name: `${ (i + 1001).toString().substring(1) }.${fileExtension}` });
});
var text = JSON.stringify(urls);

saveTextAsFile(text, 'download.json');


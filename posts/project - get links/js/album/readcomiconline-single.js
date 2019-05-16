// https://readcomiconline.to/Comic/A-Lucky-Luke-Adventure/Issue-70?id=142941

function downloadSingleIssue() {
	var images = [];
	// Có biến toàn cục lstImages
	lstImages.forEach((s, i) => {
		var fileExtension = getImageExtension(s);
		images.push({
			url: s,
			name: createLocalFileName('single', i, fileExtension)
		});
	});
	var text = JSON.stringify(images);
	saveTextAsFile(text, 'download.json');
}

downloadSingleIssue();




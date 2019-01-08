// https://librivox.org/the-adventures-of-sherlock-holmes-version-4-by-sir-arthur-conan-doyle/

document.querySelectorAll('.chapter-download tbody tr').forEach(tr => {
	var cells = tr.querySelectorAll('td');
	var atag = cells[1].querySelector('a');
	var link = atag.href;
	var title = atag.textContent.trim();
	title = title.replace(/\s+/g, ' ');
	var duration = cells[3].textContent.trim();
	console.log(JSON.stringify({ title, link, duration }) + ',');
});


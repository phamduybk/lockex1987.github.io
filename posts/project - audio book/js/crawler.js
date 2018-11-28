// https://archive.org/details/Hoi019ThanhHaPhiTaoThaoDungBinhLauBachMonLaBoTuyetMenh

var chapters = [];

document.querySelectorAll('#jw6__list .jwrowV2').forEach(div => {
	var name = div.querySelector('.ttl').textContent.trim().substring(8);
	var duration = div.querySelector('.tm').textContent.trim();
	chapters.push({ name, duration });
});

document.querySelectorAll('#quickdown4 .format-file').forEach((div, idx) => {
	var audio = div.querySelector('a').href;
	var size = div.querySelector('.down-rite').textContent.trim();
	Object.assign(chapters[idx], { audio, size })
});

console.log(JSON.stringify(chapters, null, 2));
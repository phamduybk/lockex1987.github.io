function buildGui() {
    // Chia thành 12 section, mỗi section gồm 10 chương
    var numberOfSections = 12;
    var chapterEachSection = 10;
    var playlistDiv = document.querySelector('.playlist');
    for (var sectionIdx = 0; sectionIdx < numberOfSections; sectionIdx++) {
        var fromChapter = sectionIdx * chapterEachSection + 1;
        var toChapter = fromChapter + chapterEachSection - 1;
        var sectionDiv = document.createElement('div');
        sectionDiv.className = 'section';
        sectionDiv.innerHTML = `<div class="section-title" data-idx="${sectionIdx}">${fromChapter} - ${toChapter}</div>`;
        playlistDiv.appendChild(sectionDiv);

        for (var chapterIdx = fromChapter - 1; chapterIdx < toChapter; chapterIdx++) {
            var chapterObj = chapters[chapterIdx];
            var item = document.createElement('div');
            item.dataset.idx = chapterIdx;
            item.className = 'item item-' + sectionIdx;
            item.innerHTML = `
                    <div class="number">Hồi ${chapterIdx + 1}</div>
                    <div class="name" data-idx="${chapterIdx}">${chapterObj.name}</div>
                    <div class="duration">${chapterObj.duration}</div>
                    <div class="size">${chapterObj.size}</div>`;
            item.style.display = 'none';
            sectionDiv.appendChild(item);
        }
    }
}

function addEvents() {
    var currentSection = -1;

    document.addEventListener('click', function(event) {
        var div = event.target;
        //console.log(div.classList);

        // Click vào title của section thì hiển thị các chương thuộc section đó
        if (div.classList.contains('section-title')) {
            var idx = div.dataset.idx;
            document.querySelectorAll('.item').forEach(item => {
                item.style.display = 'none';
            });

            if (div.classList.contains('active')) {
                div.classList.remove('active');
            } else {
                document.querySelectorAll('.section-title.active').forEach(tempDiv => tempDiv.classList.remove('active'));
                div.classList.add('active');
                document.querySelectorAll('.item-' + idx).forEach(item => {
                    item.style.display = 'flex';
                });
            }
        }

        // Click vào từng chương thì play audio
        if (div.classList.contains('name')) {
            var idx = div.dataset.idx;
            setCurrentChapter(idx, true);
        }
    });
}

function setCurrentChapter(idx, playImmediate) {
    var myAudio = document.querySelector('#myAudio');
    var chapter = chapters[idx];
    console.log(chapter);
    myAudio.src = chapter.audio;
    if (playImmediate) {
        myAudio.play();
    }
    document.querySelector('.current-number').textContent = 'Hồi ' + (parseInt(idx) + 1);
    document.querySelector('.current-name').textContent = chapter.name;
    localStorage.setItem('currentChapter', idx);

    var oldActive = document.querySelector('.item.active');
    if (oldActive) {
        oldActive.classList.remove('active');
    }

    document.querySelectorAll('.item')[idx].classList.add('active');
}

function init() {
    buildGui();
    addEvents();

    var oldChapter = localStorage.getItem('currentChapter');
    if (!oldChapter) {
        oldChapter = 0;
    }
    setCurrentChapter(oldChapter, false);
    createMediaPlayer('#myAudio');
}

init();
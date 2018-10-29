// Icon play và pause
const ICON_PLAY = 'fa-play';
const ICON_PAUSE = 'fa-pause';

// Thẻ audio (nguồn của player)
var audioTag = document.querySelector('#audioTag');

// Nút play và pause
var playPauseButton = document.querySelector('#playPauseButton');

// Nút mute
var volumeButton = document.querySelector('#volumeButton');

// Hiển thị thời gian hiện tại
var currentTime = document.querySelector('#currentTime');

// Hiển thị tổng thời gian
var durationTime = document.querySelector('#durationTime');

// Thanh track
var timeline = document.querySelector('#timeline');

// 
var barProcess = document.querySelector('#barProcess');

// Đang chạy đến chỗ nào rồi
var playHead = document.querySelector('#playHead');

// Boolean value so that audio position is updated only when the playHead is released
var onplayHead = false;

// Thời lượng của đoạn audio
var duration = audioTag.duration;

// Timeline width adjusted for playHead
// Nếu tạo biến thế này thì khi resize sẽ phải tính lại
// Nên khi nào sử dụng thì tính lại
var timelineWidth = timeline.offsetWidth - playHead.offsetWidth;

function initPlayer() {
    // Play button event listenter
    playPauseButton.addEventListener("click", playPauseAudio);

    volumeButton.addEventListener('click', updateMuteVolume);

    // Timeupdate event listener
    audioTag.addEventListener("timeupdate", timeUpdate);

    // Gets audio file duration
    // Có khi load xong rồi
    audioTag.addEventListener("canplaythrough", updateDuration);
    updateDuration();

    // Makes timeline clickable
    timeline.addEventListener("click", function(event) {
        movePlayHead(event);
        updateCurrentTime(event);
    });

    // Makes playHead draggable
    playHead.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
}

/**
 * Play hoặc pause.
 */
function playPauseAudio() {
    if (audioTag.paused) {
        playAudio();
    } else {
        pauseAudio();
    }
}

/**
 * Play.
 */
function playAudio() {
    audioTag.play();
    playPauseButton.classList.remove(ICON_PLAY);
    playPauseButton.classList.add(ICON_PAUSE);
}

/**
 * Pause.
 */
function pauseAudio() {
    audioTag.pause();
    playPauseButton.classList.remove(ICON_PAUSE);
    playPauseButton.classList.add(ICON_PLAY);
}

function updateMuteVolume() {
    if (audioTag.volume == 0) {
        audioTag.volume = 1;
        volumeButton.className = 'fas fa-volume-up';
    } else {
        audioTag.volume = 0;
        volumeButton.className = 'fas fa-volume-mute';
    }
}

/**
 * Hiển thị thời gian hiện tại.
 * Hiển thị progress được bao nhiêu phần trăm.
 * Nếu mà đã xong thì hiển thị nút play.
 */
function timeUpdate() {
    currentTime.textContent = secondToMinutes(audioTag.currentTime);

    var newMargLeft = timelineWidth * (audioTag.currentTime / duration);
    updateProgressPosition(newMargLeft);

    if (audioTag.currentTime == duration) {
        playPauseButton.classList.remove(ICON_PAUSE);
        playPauseButton.classList.add(ICON_PLAY);
    }
}

/**
 * Đổi số giây thành định dạng mm:ss.
 */
function secondToMinutes(seconds) {
    seconds = Math.round(seconds);
    var numMinutes = Math.floor(seconds / 60);
    var numSeconds = seconds % 60;
    numSeconds = numSeconds >= 10 ? numSeconds : ('0' + numSeconds);
    return numMinutes + ':' + numSeconds;
}

/**
 * Hiển thị tổng thời gian.
 */
function updateDuration() {
    durationTime.textContent = secondToMinutes(audioTag.duration);
    duration = audioTag.duration;
}

/**
 * mousemove EventListener.
 * Moves playHead as user drags
 */
function movePlayHead(event) {
    var newMargLeft = event.clientX - getPosition(timeline);
    updateProgressPosition(newMargLeft);
}

function updateProgressPosition(newMargLeft) {
    if (newMargLeft < 0) {
        newMargLeft = 0;
    } else if (newMargLeft > timelineWidth) {
        newMargLeft = timelineWidth;
    }

    playHead.style.left = newMargLeft + "px";
    barProcess.style.width = newMargLeft + "px";
}

/**
 * Returns click as decimal (.77) of the total timelineWidth.
 */
function clickPercent(event) {
    return (event.clientX - getPosition(timeline)) / timelineWidth;
}

/**
 * Returns elements left position relative to top-left of viewport.
 * @param el 
 */
function getPosition(el) {
    return el.getBoundingClientRect().left;
}

function updateCurrentTime(event) {
    audioTag.currentTime = duration * clickPercent(event);
}

/**
 * Đánh dấu đang click vào playHead.
 * Khi move thì cập nhật vị trí playHead.
 * Tạm bỏ sự kiện cập nhật timeUpdate.
 */
function mouseDown() {
    onplayHead = true;
    window.addEventListener('mousemove', movePlayHead, true);
    audioTag.removeEventListener('timeupdate', timeUpdate);
}

/**
 * Nếu đang drag playHead và bỏ ra thì:
 * - Thêm sự kiện cập nhật timeUpdate
 * - Bỏ sự kiện move của window
 */
function mouseUp(event) {
    if (onplayHead == true) {
        movePlayHead(event);
        updateCurrentTime(event);

        window.removeEventListener('mousemove', movePlayHead, true);
        audioTag.addEventListener('timeupdate', timeUpdate);
    }
    onplayHead = false;
}

initPlayer();

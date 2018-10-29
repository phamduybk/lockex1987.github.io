function createAudioPlayer(audioSelector) {

    // Icon play và pause
    const ICON_PLAY = 'fa-play';
    const ICON_PAUSE = 'fa-pause';

    // Thẻ audio (nguồn của player)
    var audioTag = document.querySelector(audioSelector);

    var audioplayer = document.createElement('div');
    audioplayer.innerHTML = `
                <div class="audioplayer">
                  <div>
                    <button class="play-pause-button fas fa-play"></button>
                    <button class="fas fa-pause" style="display: none"></button>
                  </div>
                  <div class="time-info">
                    <span class="current-time">0:00</span> / <span class="duration-time">0:00</span>
                  </div>
                  <div class="timeline">
                      <div class="bar-process" style="width: 0px"></div>
                      <div class="play-head" style="left: 0px"></div>
                  </div>
                  <div>
                    <button class="volume-button fas fa-volume-up"></button>
                  </div>
                </div>`;
    audioTag.parentNode.appendChild(audioplayer);

    // Nút play và pause
    var playPauseButton = audioplayer.querySelector('.play-pause-button');

    // Nút mute
    var volumeButton = audioplayer.querySelector('.volume-button');

    // Hiển thị thời gian hiện tại
    var currentTime = audioplayer.querySelector('.current-time');

    // Hiển thị tổng thời gian
    var durationTime = audioplayer.querySelector('.duration-time');

    // Thanh track
    var timeline = audioplayer.querySelector('.timeline');

    // Thanh process
    var barProcess = audioplayer.querySelector('.bar-process');

    // Đang chạy đến chỗ nào rồi
    var playHead = audioplayer.querySelector('.play-head');


    // Boolean value so that audio position is updated only when the playHead is released
    var onplayHead = false;

    // Timeline width adjusted for playHead
    // Nếu tạo biến thế này thì khi resize sẽ phải tính lại
    // Nên khi nào sử dụng thì tính lại
    function getTimelineWidth() {
        return timeline.offsetWidth - playHead.offsetWidth;
    }

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
        //alert(audioTag.paused);
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
        //playPauseButton.classList.remove(ICON_PLAY);
        //playPauseButton.classList.add(ICON_PAUSE);
        playPauseButton.className = 'play-pause-button fas fa-pause';
        //playPauseButton.textContent = 'S';
        audioTag.play();

    }

    /**
     * Pause.
     */
    function pauseAudio() {
        //playPauseButton.classList.remove(ICON_PAUSE);
        //playPauseButton.classList.add(ICON_PLAY);
        playPauseButton.className = 'play-pause-button fas fa-play';
        //playPauseButton.textContent = 'P';
        audioTag.pause();
    }

    function updateMuteVolume() {
        if (audioTag.volume == 0) {
            audioTag.volume = 1;
            volumeButton.className = 'volume-button fas fa-volume-up';
        } else {
            audioTag.volume = 0;
            volumeButton.className = 'volume-button fas fa-volume-mute';
        }
    }

    /**
     * Hiển thị thời gian hiện tại.
     * Hiển thị progress được bao nhiêu phần trăm.
     * Nếu mà đã xong thì hiển thị nút play.
     */
    function timeUpdate() {
        if (!isNaN(audioTag.duration)) {
            currentTime.textContent = secondToMinutes(audioTag.currentTime);
            durationTime.textContent = secondToMinutes(audioTag.duration);

            var timelineWidth = getTimelineWidth();
            var newMargLeft = timelineWidth * (audioTag.currentTime / audioTag.duration);
            updateProgressPosition(newMargLeft);

            if (audioTag.currentTime == audioTag.duration) {
                playPauseButton.classList.remove(ICON_PAUSE);
                playPauseButton.classList.add(ICON_PLAY);
            }
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
        if (!isNaN(audioTag.duration)) {
            durationTime.textContent = secondToMinutes(audioTag.duration);
        }
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
        } else {
            var timelineWidth = getTimelineWidth();
            if (newMargLeft > timelineWidth) {
                newMargLeft = timelineWidth;
            }
        }

        playHead.style.left = newMargLeft + "px";
        barProcess.style.width = newMargLeft + "px";
    }

    /**
     * Returns click as decimal (.77) of the total timeline width.
     */
    function clickPercent(event) {
        var timelineWidth = getTimelineWidth();
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
        if (!isNaN(audioTag.duration)) {
            audioTag.currentTime = audioTag.duration * clickPercent(event);
        }
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

    try {
        initPlayer();
    } catch (ex) {
        alert(ex.message);
    }
}

createAudioPlayer('#audioTag');


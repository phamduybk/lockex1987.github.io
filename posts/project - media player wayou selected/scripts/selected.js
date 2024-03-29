/*
 * Selected | a collection of songs that I love
 * v0.3.0
 * also as a showcase that shows how to sync lyric with the HTML5 audio tag
 * Wayou  Apr 5th,2014
 * view on GitHub: https://github.com/wayou/selected
 * see the live site: http://wayou.github.io/selected/
 * songs used in this project are only for educational purpose
 */
window.onload = function () {
    new Selected().init();
};

var Selected = function () {
    this.audio = document.getElementById('audio');
    this.lyricContainer = document.getElementById('lyricContainer');
    this.playlist = document.getElementById('playlist');

    this.currentIndex = 0;
    this.lyric = null;
    this.lyricStyle = 0; //random num to specify the different class name for lyric
};

Selected.prototype = {
    constructor: Selected, // fix the prototype chain

    init: function () {
        // Get all songs and add to the playlist
        this.initialList(this);

        var that = this;
        var allSongs = this.playlist.children[0].children;
        var currentSong;
        var randomSong;

        // Get the hash from the url if there's any.
        var songName = window.location.hash.substr(1);
        // Then get the index of the song from all songs
        var indexOfHashSong = (function () {
            var index = 0;
            Array.prototype.forEach.call(allSongs, function (e, idx) {
                if (e.children[0].getAttribute('data-name') == songName) {
                    index = idx;
                    return false;
                }
            });
            return index;
        })();

        // Get the hash song or a random song
        this.currentIndex = indexOfHashSong || Math.floor(Math.random() * allSongs.length);

        currentSong = allSongs[this.currentIndex];
        randomSong = currentSong.children[0].getAttribute('data-name');

        // Set the song name to the hash of the url
        window.location.hash = window.location.hash || randomSong;


        // Handle playlist
        this.playlist.addEventListener('click', function (e) {
            if (e.target.nodeName.toLowerCase() !== 'a') {
                return;
            };

            // Get the current song,
            // Change the URL
            // Play the song
            var allSongs = that.playlist.children[0].children;
            var selectedIndex = Array.prototype.indexOf.call(allSongs, e.target.parentNode);

            that.currentIndex = selectedIndex;
            that.setClass(selectedIndex);
            var songName = e.target.getAttribute('data-name');
            window.location.hash = songName;
            that.play(songName);
        }, false);

        // Listen to the ending event of the audio
        this.audio.onended = function () {
            that.playNext(that);
        };

        // Handle error
        this.audio.onerror = function (e) {
            that.lyricContainer.textContent = '!fail to load the song :(';
        };

        // Enable keyboard control, spacebar to play and pause
        window.addEventListener('keydown', function (e) {
            if (e.keyCode === 32) {
                if (that.audio.paused) {
                    that.audio.play();
                } else {
                    that.audio.pause();
                }
            }
        }, false);

        // Initialize the background setting
        document.getElementById('bg_dark').addEventListener('click', function () {
            document.getElementsByTagName('html')[0].className = 'colorBg';
        });
        document.getElementById('bg_pic').addEventListener('click', function () {
            document.getElementsByTagName('html')[0].className = 'imageBg';
        });

        // Initially start from a random song
        for (var i = allSongs.length - 1; i >= 0; i--) {
            allSongs[i].className = '';
        };

        // Play the current song
        currentSong.className = 'current-song';
        this.play(randomSong);
    },

    // Make a AJAX request, get the song list
    // Build the playlist and display it on the web
    initialList: function(ctx) {
        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', './scripts/content.json', false);
        xhttp.onreadystatechange = function () {
            if (xhttp.status == 200 && xhttp.readyState == 4) {
                var fragment = document.createDocumentFragment();
                var data = JSON.parse(xhttp.responseText).data;
                var ol = ctx.playlist.getElementsByTagName('ol')[0];

                data.forEach(function (e, idx) {
                    var li = document.createElement('li');
                    var a = document.createElement('a');
                    a.href = 'javascript:void(0)';
                    a.dataset.name = e.lrc_name;
                    a.textContent = e.song_name + '-' + e.artist;
                    li.appendChild(a);
                    fragment.appendChild(li);
                });
                ol.appendChild(fragment);
            }
        };
        xhttp.send();
    },

    play: function (songName) {
        var that = this;
        this.audio.src = './content/songs/' + songName + '.mp3';
        
        // reset the position of the lyric container
        this.lyricContainer.style.top = '130px';
        // empty the lyric
        this.lyric = null;
        this.lyricContainer.textContent = 'loading...';
        this.lyricStyle = Math.floor(Math.random() * 4);

        // If the audio can play, load the lyric and play
        this.audio.addEventListener('canplay', function () {
            that.getLyric(that.audio.src.replace('.mp3', '.lrc'));
            this.play();
        });

        // Sync the lyric
        this.audio.addEventListener("timeupdate", function (e) {
            if (!that.lyric) {
                return;
            }
            for (var i = 0, l = that.lyric.length; i < l; i++) {
                if (this.currentTime > that.lyric[i][0] - 0.50 /*preload the lyric by 0.50s*/) {
                    // single line display mode
                    // that.lyricContainer.textContent = that.lyric[i][1];
                    // scroll mode
                    var line = document.getElementById('line-' + i),
                        prevLine = document.getElementById('line-' + (i > 0 ? i - 1 : i));
                    prevLine.className = '';
                    // randomize the color of the current line of the lyric
                    line.className = 'current-line-' + that.lyricStyle;
                    that.lyricContainer.style.top = 130 - line.offsetTop + 'px';
                };
            };
        });
    },

    playNext: function(that) {
        var allSongs = this.playlist.children[0].children;
        
        // reaches the last song of the playlist?
        if (that.currentIndex === allSongs.length - 1) {
            // play from start
            that.currentIndex = 0;
        } else {
            // play next index
            that.currentIndex += 1;
        }

        // Set class, URL, play song
        var nextItem = allSongs[that.currentIndex].children[0];
        that.setClass(that.currentIndex);
        var songName = nextItem.getAttribute('data-name');
        window.location.hash = songName;
        that.play(songName);
    },

    // Set class of the current song
    setClass: function(index) {
        var allSongs = this.playlist.children[0].children;
        for (var i = allSongs.length - 1; i >= 0; i--) {
            allSongs[i].className = '';
        }
        allSongs[index].className = 'current-song';
    },

    // Get the lyric
    getLyric: function(url) {
        var that = this;
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'text';
        // Fix for the messy code problem for Chinese.
        // reference: http://xx.time8.org/php/20101218/ajax-xmlhttprequest.html
        // request['overrideMimeType'] && request.overrideMimeType("text/html;charset=gb2312");
        request.onload = function() {
            that.lyric = that.parseLyric(request.response);
            // Display lyric to the page
            that.appendLyric(that.lyric);
        };
        request.onerror = request.onabort = function(e) {
            that.lyricContainer.textContent = '!failed to load the lyric :(';
        };
        this.lyricContainer.textContent = 'loading lyric...';
        request.send();
    },

    parseLyric: function(text) {
        // Get each line from the text
        var lines = text.split('\n');
        // This regex mathes the time [00.12.78]
        var pattern = /\[\d{2}:\d{2}.\d{2}\]/g;
        var result = [];

        // Get offset from lyrics
        var offset = this.getOffset(text);

        // Exclude the description parts or empty parts of the lyric
        while (!pattern.test(lines[0])) {
            lines = lines.slice(1);
        }

        // Remove the last empty item
        lines[lines.length - 1].length === 0 && lines.pop();

        // Display all content on the page
        lines.forEach(function (v, i, a) {
            var time = v.match(pattern);
            var value = v.replace(pattern, '');
            time.forEach(function(v1, i1, a1) {
                // convert the [min:sec] to secs format then store into result
                var t = v1.slice(1, -1).split(':');
                result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]) + parseInt(offset) / 1000, value]);
            });
        });

        // Sort the result by time
        result.sort(function (a, b) {
            return a[0] - b[0];
        });
        console.log(result);
        return result;
    },

    appendLyric: function(lyric) {
        var that = this;
        var lyricContainer = this.lyricContainer;
        
        var fragment = document.createDocumentFragment();
        // clear the lyric container first
        this.lyricContainer.innerHTML = '';
        
        lyric.forEach(function (v, i, a) {
            var line = document.createElement('p');
            line.id = 'line-' + i;
            line.textContent = v[1];
            fragment.appendChild(line);
        });
        lyricContainer.appendChild(fragment);
    },

    getOffset: function (text) {
        // Returns offset in miliseconds.
        var offset = 0;
        try {
            // Pattern matches [offset:1000]
            var offsetPattern = /\[offset:\-?\+?\d+\]/g;
            // Get only the first match
            var offset_line = text.match(offsetPattern)[0];
            // Get the second part of the offset
            var offset_str = offset_line.split(':')[1];
            // Convert it to Int.
            offset = parseInt(offset_str);
        } catch (err) {
            // alert("offset error: "+err.message);
            offset = 0;
        }
        return offset;
    }
};

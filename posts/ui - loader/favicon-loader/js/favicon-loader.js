onload = function() {
    var canvas = document.querySelector('#cvl');
    var ctx = canvas.getContext('2d');
    var OFFSET_ANGLE = 1.5 * Math.PI; // starting position[angle] for circle drawing
    var lnk = document.querySelector('link[rel*="icon"]');

    var tc; // interval object
    var pct; // angle
    var btn = document.querySelector('#lbtn');

    if (!!ctx) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'fuchsia';

        if (btn.disabled) {
            btn.removeAttribute('disabled'); // enable btn on page refresh
        }

        btn.addEventListener('click', demoLocal);
        //btn.addEventListener('click', ajaxProgress);
    }

    function demoLocal() {
        pct = 0; 
        tc = setInterval(updateLoader, 30);
        this.textContent = 'Loading';
        this.style.backgroundColor = '#999';
        this.setAttribute('disabled', '');
    }

    function ajaxProgress() {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('progress', updateLoaderAjax);
        //xhr.open('GET', 'http://www.hongkiat.com/blog/animated-favicon-loader-javascript/');
        xhr.open('GET', 'test.xlsx');
        xhr.send();
    }

    function updateLoader() {
        ctx.clearRect(0, 0, 16, 16);
        ctx.beginPath();
        ctx.arc(8, 8, 6, OFFSET_ANGLE, OFFSET_ANGLE + pct * 2 * Math.PI / 100);
        ctx.stroke();

        lnk.href = canvas.toDataURL('image/png'); // update favicon

        if (pct === 100) {
            clearInterval(tc);
            btn.textContent = 'Load';
            btn.style.backgroundColor = 'fuchsia';
            btn.removeAttribute('disabled');
        } else {
            pct++;
        }
    }

    function updateLoaderAjax(evt) {
        ctx.clearRect(0, 0, 16, 16);
        ctx.beginPath();
        ctx.arc(8, 8, 6, OFFSET_ANGLE, OFFSET_ANGLE + evt.loaded * 2 * Math.PI / evt.total);
        ctx.stroke();

        console.log(evt.loaded);

        lnk.href = canvas.toDataURL('image/png');
    }
};

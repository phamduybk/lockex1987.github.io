class SnowWorker {

    constructor(canvas) {
        this.canvas = canvas;

        this.gravity = 9.4;
        this.wind = 3;
        this.active = 500;
        this.snowflakesLifetime = 500;
        this.prevTimestamp = Date.now();
        this.fps = 60;
        this.frameInterval = 1000 / this.fps;
        this.timefactor = 1;

        this.snowflakes = [];
        this.platforms = [];

        for (var i = 0; i < this.active; i++) {
            var x = Math.floor(Math.random() * this.canvas.width);
            var y = Math.floor(Math.random() * this.canvas.height);
            var s = Math.floor(2 + (Math.random() * 3));
            this.snowflakes.push({
                x: x,
                y: y,
                vx: 80,
                vy: 40 + (Math.random() * 60),
                s: s
            });
        }

        this.loop();
    }

    setPlatforms(platforms) {
        this.platforms = platforms;

        this.snowflakes.forEach((f, i) => {
            if (f.l > 0) {
                let keep = false;
                platforms.forEach((platform) => {
                    if ( (f.x > platform.left && f.x < platform.left + platform.width) ) {
                        keep = true;
                    }
                });
                if (!keep) {
                    f.l = 0;
                }
            }
        });
    }

    loop() {
        this.update();
        this.draw();

        setTimeout(() => {
            this.loop();
        }, this.frameInterval);
    }

    update() {
        let timestamp = Date.now();
        let delta = timestamp - this.prevTimestamp;
        let deltaDistance = 1000 / delta;

        this.prevTimestamp = timestamp;

        this.snowflakes.forEach((f, i) => {
            if (f.l > 0) {
                if (f.l-- === 0) {
                    f.x = Math.random() * this.canvas.width;
                    f.y = 0;
                    f.vx = 80;
                    f.vy = 40 + (Math.random() * 60);
                }
            } else {
                f.x += (Math.random() * this.wind * (f.vx / deltaDistance) - ((f.vx / deltaDistance) / 2)) * this.timefactor;
                f.y += (f.vy / deltaDistance) * (this.gravity / 9.4) * this.timefactor;

                if (f.y > this.canvas.height) {
                    f.y = 0;
                    f.x = Math.random() * this.canvas.width;
                } if (f.x < 0) {
                    f.x = this.canvas.width;
                } if (f.x > this.canvas.width) {
                    f.x = 0;
                } else {
                    this.platforms.forEach((platform) => {
                        if ( (f.y > platform.top - 3 && f.y < platform.top) &&
                            (f.x > platform.left && f.x < platform.left + platform.width)
                            && Math.floor(Math.random() * 2) % 2 == 0 ) {
                            f.l = this.snowflakesLifetime;
                        }
                    });
                }
            }
        });
    }

    draw() {
        var ctx = this.canvas.getContext('2d');
        ctx.fillStyle = 'white';

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0; i < this.active; i++) {
            ctx.beginPath();
            ctx.arc(this.snowflakes[i].x,
                    this.snowflakes[i].y - document.body.scrollTop,
                    this.snowflakes[i].s,
                    0, 2 * Math.PI, false);
            ctx.fill();
        }
    }
}

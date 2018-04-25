/*
 * HTML5 Canvas Matrix Digital Rain
 * Copyright (c) 2013 Koroshiya
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

 /********
    *Settings
    *
    *EDITABLE:
    *
    *Default setting: true
    *Recommendation: disable if suffering severe performance problems.
    *
    ***rainheight***
    *A variable value for the length of a stream of raindrops.
    *This value is not absolute; it is modified then added to minHeight.
    *
    *Default setting: 10
    *Recommendation: Adjusting this value will have little impact on performance.
    *
    ***freq***
    *Frequency of streams.
    *This governs how quickly the screen is filled with individual streams.
    *Lowering the frequency can have a huge impact of performance.
    *
    *Max: 1.0 (flood screen with streams)
    *Min: 0 (no streams)
    *Default setting: 0.5
    *Recommendation: don't go above 0.8 or below 0.3. 
    *If you're suffering from lag, reducing this setting to 0.3 can make a big difference.
    *However, this setting coincides with maxRain, so make sure they correspond.
    *
    ***speed***
    *How often another stream is given a chance to spawn.
    *Coincides with freq. Speed is how often the chance is given, freq is the likelihood of the chance being used.
    *Setting is in milliseconds.
    *
    *Default setting: 80
    *Recommendation: the default is good. Raise if you don't want too much rain.
    *Balance with maxRain and freq.
    *These three settings work with one another towards the common goal of controlling the amount of rain.
    *
    ***maxRain***
    *Maximum number of streams on the screen at any one time.
    *No matter what the frequency is, the number of streams cannot be greater than this value.
    *Limiting the maximum number of streams can increase performance dramatically.
    *
    *Default setting: based off screen res
    *Default divisor: 4
    *Recommendation: leave the default. If you must make adjustments, change the divisor in the equation used.
    *The higher the divisor, the lower the maximum number of streams, the better the performance.
    *
    ***rSpeed***
    *Speed at which a raindrop is traveling.
    *Also impacts on how close together the drops in a stream appear to be.
    *
    *Default setting: 7 + Math.random() * 14
    *Recommendation: to disable different speeds, remove "7 + Math.random() * " and leave as 14.
    *Otherwise, keep the default. It allows for an appropriate balance.
    *For less variation, reduce the value of 14, then increase 7 proportionally by a factor of 0.5.
    *eg. Changing 7 to 10 and 14 to 8, there would be less variation between slow and fast raindrops.
    *
    *
    *NON-EDITABLE:
    *
    ***lineheight***
    *Not actually the height of the rain area.
    *The lineheight is the number of vertical spaces on which raindrops can appear.
    *It is calculated by the height of the screen (or window) and divided by the space that raindrops take up.
    *
    ***linewidth***
    *Same as height, except horizontal.
    *
    *
    *********/

function digiRain() {
		var rainheight = 14;
		var freq = 0.5;
		var speed = 80;
		var maxRain = Math.round(window.innerWidth / 96);

		// Kích thước canvas chiếm full màn hình
		var digirain = document.getElementById("DigiRain");
		digirain.width = window.innerWidth;
		digirain.height = window.innerHeight;

		// Tạo đối tượng canvas thứ hai
		var canv = document.createElement('canvas');
		canv.height = digirain.height;
		canv.width = digirain.width;
		var con = canv.getContext("2d");

		var width = digirain.width;
		var height = digirain.height;

		// Số line và độ dài của từng line
		var linewidth = Math.round(digirain.width / 14);
		var lineheight = Math.round(digirain.height / 7);

		var context = digirain.getContext("2d");
		context.font = "bold 12px verdana,sans-serif";
		con.font = "bold 12px verdana,sans-serif";

		// Thiết lập mảng 2 chiều các ký tự
		var GLOBAL_DIV_ARRAY = new Array(linewidth);
		var j = -1;
		var i;
		while(++j <= linewidth){
				i = -1;
				GLOBAL_DIV_ARRAY[j] = new Array(lineheight);
				var glob_row = GLOBAL_DIV_ARRAY[j];
				while(++i <= lineheight){
						glob_row[i] = String.fromCharCode(12448 + Math.random() * 96);
				}
		}

		// Mảng ???
		var rainDrops = [];

		this.makeItRain = function() {
				context.clearRect(0, 0, width, height);
				con.clearRect(0, 0, width, height);

				if (rainDrops.length < maxRain && Math.random() < freq) {
						var c = Math.floor(Math.random() * width);
						var droplet = new digiRainDroplet(c, rainheight, height, GLOBAL_DIV_ARRAY, con);
						rainDrops.push(droplet);
				}
				var rainTemp = [];
				var drop;
				var i = -1;
				while(++i < rainDrops.length){
						drop = rainDrops[i];
						if (!drop.fall()) {
							rainTemp.push(drop);
						}
				}
				rainDrops = rainTemp;
				//console.log(rainDrops.length);
				context.drawImage(canv, 0, 0);
		};

		setInterval(this.makeItRain, speed);
};

// Raindrop class
function digiRainDroplet(col, rh, windowheight, GLOBAL_DIV_ARRAY, context) {
    var rainheight = Math.floor(Math.random() * rh) + 10;
    var row = -1;
    var rSpeed = 7 + Math.random() * 14;
    var glob_row = GLOBAL_DIV_ARRAY[Math.round(col / 14)];

    this.fall = function() {
        row++;

        if ((row * rSpeed - rainheight * rSpeed) > windowheight) {
            return true;
        } else if (row < windowheight) {
            if (row*rSpeed < windowheight){
                context.globalAlpha = 1;
                context.fillStyle = '#DAFFDA';
                context.fillText(glob_row[row], col, row * rSpeed);
                context.fillStyle = '#0F0';
            }
            var i = 0;
            while(++i < rainheight && row >= i){
                if ((row-i)*rSpeed < windowheight) {
                    context.globalAlpha = (1.0 - (i / rainheight));
                    //context.fillStyle = "rgba(0, 255, 0, " + (1.0 - (i / 10)) + ")";
                    context.fillText(glob_row[row-i], col, ((row-i) * rSpeed));
                }
            }
            //context.fillStyle = '#0F0';
        }
        
        return false;
    }
}

digiRain();

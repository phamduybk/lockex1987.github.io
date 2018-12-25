(function($) {
	// Javascript closure
	var Radar = (function() {
		function Radar(ele, settings) {
			this.ele = ele;
			this.settings = $.extend({
				showAxisLabels: $(ele).data("showAxisLabels"),
				title: $(ele).data("text"),
				step: $(ele).data("step"),
				values: $(ele).data("values"),
				color: [$(ele).data("red"), $(ele).data("green"), $(ele).data("blue")],
				fixedMaxValue: $(ele).data("fixed-max-value"),
				size: [$(ele).data("width"), $(ele).data("height")],
				additionalLineDistance: $(ele).data("additional-line-distance"),
				annimationDelay: $(ele).data("annimation-delay")
			}, settings);
			this.width = this.settings.size[0];
			this.height = this.settings.size[1];
			$(ele).css({
				'position': 'relative',
			});
			this.canvas = {};
			this.draw();
		}

    Radar.prototype.newCanvas = function() {
			var div = $(this.ele).find(".chartCanvasWrap").first();
			$(div).css({
				'position': 'relative' //'margin-top': "0 px" //this.height * 0.20333 + 
			});
			var canvas = document.createElement('canvas');
			canvas.width = this.width;
			canvas.height = this.height;
			canvas.style.position = "relative";
			$(div).append(canvas);
			this.canvas = canvas;
	   
			var annimationDelay = 1000;
			if (this.settings.annimationDelay) {
				annimationDelay = this.settings.annimationDelay;
			}
			this.cxt = canvas.getContext('2d');
			$(canvas).css('opacity', 0).delay(annimationDelay).animate({opacity: 1}, annimationDelay);
		}

		Radar.prototype.draw = function() {
			this.newCanvas();
			var min = 0;
			var max = 0;
			$.each(this.settings.values, function(i, val) {
				if (val < min) min = val;
				if (val > max) max = val;
			});
			if (this.settings.fixedMaxValue) {
				max = this.settings.fixedMaxValue;
			}
			min = Math.floor(min);
			max = Math.ceil(max);

			var spacing = Math.ceil(this.width / 20);
			for (var i = min; i <= max; i += this.settings.step) {
				this.cxt.beginPath();
				this.cxt.arc(
					this.width / 2,
					this.height / 2,
					this.settings.step * spacing * i,
					0, 2 * Math.PI, false);
				this.cxt.strokeStyle = "#666";
				this.cxt.fillStyle = "#444";
				this.cxt.stroke();
        if (this.settings.showAxisLabels)
					this.cxt.fillText(i, this.width / 2 + this.settings.step * spacing * i + 4, this.height / 2 - 2);
			}
			
			var size = 0;
			for (var key in this.settings.values)
				size += 1;

			for (var i = 0; i < size; i += 1) {
				this.cxt.beginPath();
				this.cxt.moveTo(this.width / 2, this.height /2);
				var x = this.width  / 2 + Math.cos((Math.PI * 2) * (i / size)) * spacing * max;
				var y = this.height / 2 + Math.sin((Math.PI * 2) * (i / size)) * spacing * max;
				this.cxt.lineTo(x, y);
				this.cxt.stroke();
			}

			this.cxt.beginPath();
			var first = true;
			var i = 0;
			var that = this;
			var end = {x: null, y: null};
			$.each(this.settings.values, function(key, val) {
				var x = that.width  / 2 + Math.cos((Math.PI * 2) * (i / size)) * spacing * val;
				var y = that.height / 2 + Math.sin((Math.PI * 2) * (i / size)) * spacing * val;
				if (first) {
					that.cxt.moveTo(x, y);
					end.x = x;
					end.y = y;
					first = false;
				}
				that.cxt.lineTo(x, y);
				i += 1;
			});
			
			this.cxt.lineTo(end.x, end.y);
      var grad = this.cxt.createLinearGradient(0, 0, 0, this.height);
      grad.addColorStop(0, "rgba("
				+ this.settings.color[0] + ","
				+ this.settings.color[1] + ","
				+ this.settings.color[2] + ", 0)");
			grad.addColorStop(1, "rgba("
				+ this.settings.color[0] + ","
				+ this.settings.color[1] + ","
				+ this.settings.color[2] + ", 1)");
			this.cxt.fillStyle = grad;
			this.cxt.shadowBlur = 2;
			this.cxt.shadowColor = "rgba(0, 0, 0, .2)";
			this.cxt.stroke();
			this.cxt.fill();

			var additionalLineDistance =  this.settings.additionalLineDistance;
			i = 0;
			$.each(this.settings.values, function(key, val) {
				that.cxt.fillStyle = "rgba(0,0,0,.8)";
				that.cxt.strokeStyle = "rgba(0,0,0,.5)";
				that.cxt.font = "bold 8px Verdana";
				var dist = Math.min(spacing * val, size * spacing);
				var x = that.width  / 2 + Math.cos((Math.PI * 2) * (i / size)) * spacing * val;
				var y = that.height / 2 + Math.sin((Math.PI * 2) * (i / size)) * spacing * val;
				var textX = that.width  / 2 + Math.cos((Math.PI * 2) * (i / size)) * spacing * max;
				var textY = that.height / 2 + Math.sin((Math.PI * 2) * (i / size)) * spacing * max * 1.5;
        if (textX < that.width / 2) {
					textX -= (max * 3);
					if (additionalLineDistance) {
						textX -= additionalLineDistance;
					}
					that.cxt.textAlign = "end";
					that.cxt.beginPath();
					var width = that.cxt.measureText(key).width;
					that.cxt.moveTo(textX - width - 15, textY + 4);
					that.cxt.lineTo(   textX,                    textY + 4);
					that.cxt.lineTo(x - 2, y);
					that.cxt.lineWidth = 2;
					that.cxt.stroke();
				} else {
					textX += (max * 3);
					if (additionalLineDistance) {
						textX += additionalLineDistance;
					}
					that.cxt.textAlign = "start";
					that.cxt.beginPath();
					var width = that.cxt.measureText(key).width;
					that.cxt.moveTo(x + 2, y);
					that.cxt.lineTo(textX,                      textY + 4);
					that.cxt.lineTo(textX + width + 15, textY + 4);
					that.cxt.lineWidth = 2;
					that.cxt.stroke();
				}
				that.cxt.fillText(key, textX, textY);
				
				// For arrows that aren't done.
				i += 1;
			});
			
			if (this.settings.title) {
				this.cxt.font = "bold 22px Verdana";
				this.cxt.fillText(this.settings.title, 10, 30);
			}
		}

		return Radar;
	})();

	// Add jQuery function?
	$.fn.radarChart = function(settings) {
		this.each(function(i, ele) {
			var radar = new Radar(ele, settings);
		});
	}
})(jQuery);

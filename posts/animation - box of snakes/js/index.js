var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var CreateCanvas = function () {
	function CreateCanvas(container, w, h) {_classCallCheck(this, CreateCanvas);
		this.container = document.querySelector('' + container);
		this.cnv = null;
		this.ctx = null;
		this.width = w;
		this.height = h;
		this.coord = Object.create(null);
		this.getCoordinates = this.getCoordinates.bind(this);
		this.getCanvas = this.getCanvas.bind(this);
		this.init();
	}_createClass(CreateCanvas, [{ key: 'createCanvas', value: function createCanvas()
		{
			this.cnv = document.createElement('canvas');
			this.ctx = this.cnv.getContext('2d');
		} }, { key: 'setSize', value: function setSize()
		{
			this.cnv.width = this.width;
			this.cnv.height = this.height;
		} }, { key: 'getCoordinates', value: function getCoordinates()
		{
			return this.coord;
		} }, { key: 'getCanvasCoordinates', value: function getCanvasCoordinates()
		{var _cnv$getBoundingClien =
			this.cnv.getBoundingClientRect(),top = _cnv$getBoundingClien.top,left = _cnv$getBoundingClien.left,bottom = _cnv$getBoundingClien.bottom,right = _cnv$getBoundingClien.right;
			this.coord.top = top;
			this.coord.right = right;
			this.coord.bottom = bottom;
			this.coord.left = left;
			this.coord.cx = (right - left) / 2;
			this.coord.cy = (bottom - top) / 2;
			this.ctx.translate(this.coord.cx, this.coord.cy);
		} }, { key: 'clear', value: function clear()
		{
			this.ctx.clearRect(-this.coord.cx, -this.coord.cy, this.width, this.height);
		} }, { key: 'init', value: function init()
		{
			this.createCanvas();
			this.setSize();
			this.container.appendChild(this.cnv);
			this.getCanvasCoordinates();
		} }, { key: 'getCanvas', value: function getCanvas()
		{
			return {
				ctx: this.ctx,
				cnv: this.cnv,
				w: this.width,
				h: this.height };

		} }]);return CreateCanvas;}();var


Snake = function () {
	function Snake(canvas) {_classCallCheck(this, Snake);
		this.canvas = canvas.getCanvas();
		this.positionBeforeCorrect = { x: 0, y: 0 };
		this.coord = canvas.getCoordinates();
		this.angle = Math.floor(Math.random() * 30);
		this.inerty = this.getRandomToFrom(0.08, 0.1);
		this.botTimeUpdate = Math.floor(this.getRandomToFrom(100, 150));
		this.color = 'hsl(' + Math.floor(this.getRandomToFrom(0, 360)) + ', 50%, 50%)';
		this.amount = 50;
		this.maxCircleSize = 5;
		this.circles = [];
		this.createCircle = this.createCircle.bind(this);
		this.setSnake = this.setSnake.bind(this);
		this.init();
	}_createClass(Snake, [{ key: 'normalize0between1', value: function normalize0between1(
		min, max, value) {
			return (value - min) / (max - min);
		} }, { key: 'getRandomToFrom', value: function getRandomToFrom(
		min, max) {
			return Math.random() * (max - min) + min;
		} }, { key: 'correctPosition', value: function correctPosition(
		x, y) {
			return {
				x: x - this.coord.left - this.coord.cx,
				y: y - this.coord.top - this.coord.cy };

		} }, { key: 'createCircleCoordinates', value: function createCircleCoordinates(
		distance, i) {
			return {
				x: Math.floor(Math.sin(this.angle) * distance),
				y: Math.floor(Math.cos(this.angle) * distance),
				size: this.maxCircleSize * (1 - this.normalize0between1(0, this.amount, i)) };

		} }, { key: 'createCircle', value: function createCircle()
		{
			for (var i = 0; i < this.amount; i++) {
				this.circles.push(this.createCircleCoordinates(i + 5, i));
			}
		} }, { key: 'setSnake', value: function setSnake()
		{var _this = this;
			this.circles.forEach(function (c, i, arr) {
				if (i === 0) {
					c.x += (c.x - _this.positionBeforeCorrect.x) * -_this.inerty;
					c.y += (c.y - _this.positionBeforeCorrect.y) * -_this.inerty;
					_this.canvas.ctx.moveTo(c.x, c.y);
				} else {
					arr[i].x += (arr[i].x - arr[i - 1].x) * -_this.inerty;
					arr[i].y += (arr[i].y - arr[i - 1].y) * -_this.inerty;
					_this.canvas.ctx.lineTo(arr[i].x, arr[i].y);
				}
				_this.canvas.ctx.strokeStyle = _this.color;
				_this.canvas.ctx.stroke();
				_this.canvas.ctx.beginPath();
				_this.canvas.ctx.fillStyle = _this.color;
				_this.canvas.ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
				_this.canvas.ctx.fill();
				_this.canvas.ctx.stroke();
			});
		} }, { key: 'setPosition', value: function setPosition(_ref)
		{var x = _ref.x,y = _ref.y;
			this.positionBeforeCorrect = this.correctPosition(x, y);
			this.angle = Math.atan2(this.positionBeforeCorrect.x, this.positionBeforeCorrect.y);
			this.setSnake();
		} }, { key: 'createBot', value: function createBot()
		{var _this2 = this;
			var factor = 50;
			var previos = {
				x: Math.floor(this.getRandomToFrom(this.coord.left, this.coord.right)),
				y: Math.floor(this.getRandomToFrom(this.coord.top, this.coord.bottom)) };

			setInterval(function () {
				var x1 = previos.x - factor;
				var x2 = previos.x + factor;
				var y1 = previos.y - factor;
				var y2 = previos.y + factor;
				if (x1 <= _this2.coord.left) {
					x1 = _this2.coord.left;
				}
				if (x2 >= _this2.coord.right) {
					x2 = _this2.coord.right;
				}
				if (y1 <= _this2.coord.top) {
					y1 = _this2.coord.top;
				}
				if (y2 >= _this2.coord.bottom) {
					y2 = _this2.coord.bottom;
				}
				var next = {
					x: Math.floor(_this2.getRandomToFrom(x1, x2)),
					y: Math.floor(_this2.getRandomToFrom(y1, y2)) };

				_this2.setPosition({ x: next.x, y: next.y });
				previos = next;
			}, this.botTimeUpdate);
		} }, { key: 'output', value: function output(
		pos) {
			console.log(pos);
		} }, { key: 'init', value: function init()

		{
			this.createCircle();
			this.setSnake();
			this.createBot();
		} }]);return Snake;}();


var canvas = new CreateCanvas('.canvas', 600, 600);

var coord = canvas.getCoordinates();

var snakes = [];

for (var i = 0; i < 5; i++) {snakes.push(new Snake(canvas));};

function animation() {
	canvas.clear();
	snakes.forEach(function (snake) {return snake.setSnake();});
	requestAnimationFrame(animation);
}
animation();
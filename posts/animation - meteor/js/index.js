"use strict";function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}

function Meteor(options) {var _this = this;
	options = options || {};
	this.main = options.main || {};
	this.ctx = options.ctx;
	this.vfx = options.vfx;
	this.position = options.position || {
		x: Math.random() * this.main.width + this.main.width * 0.25,
		y: Math.random() * -this.main.height * 0.25 };

	this.rotation = options.rotation || Math.random() * 2 * Math.PI;
	this.velocity = options.velocity || {
		phi: Math.random() * 0.4 - 0.2 + Math.PI * 0.75,
		length: Math.random() * 5 + 1,
		rotate: Math.random() * 0.1 - 0.05 };

	this.gravity = options.gravity || { phi: Math.PI * 0.5, length: 0.98 };
	this.edge =
	options.edge ||
	~~(Math.random() * this.velocity.length + this.velocity.length * 2 + 2);
	this.color = options.color || ["#300", "#610", "#fd2", "#f62"];
	this.timescale = options.timescale || 0.5;
	this.ground = options.ground || this.main.height;
	this.accelerate = options.accelerate || {
		phi: {
			change: Math.random() * 0.015 - 0.0075,
			min: Math.PI * 0.6,
			max: Math.PI * 0.9 },

		friction: 1.005 };

	this.points = [].concat(_toConsumableArray(new Array(this.edge))).map(function (e, i) {
		var phi = i / _this.edge * 2 * Math.PI;
		return {
			phi: phi + Math.random() * 0.4 - 0.2,
			length: Math.random() * _this.velocity.length * 2 + _this.velocity.length * 4 };

	});

	this.update = function (i) {
		this.rotation += this.velocity.rotate * this.timescale;
		this.position.x +=
		Math.cos(this.velocity.phi) * this.velocity.length * this.timescale;
		this.position.y +=
		Math.sin(this.velocity.phi) * this.velocity.length * this.timescale;
		this.position.x +=
		Math.cos(this.gravity.phi) * this.gravity.length * this.timescale;
		this.position.y +=
		Math.sin(this.gravity.phi) * this.gravity.length * this.timescale;
		this.velocity.phi += this.accelerate.phi.change * this.timescale;
		(this.velocity.phi > this.accelerate.phi.max ||
		this.velocity.phi < this.accelerate.phi.min) && (
		this.accelerate.phi.change = -this.accelerate.phi.change);
		this.velocity.length *= this.accelerate.friction;
		if (this.position.y > this.ground) {
			var ctx = this.vfx;
			var position = this.position;
			var range = this.edge;
			var main = this.main;
			[].concat(_toConsumableArray(new Array(this.edge))).map(
			function () {return (
					main.makeRock({
						position: { x: position.x, y: position.y },
						base: range }) ||

					LightFlare(
					ctx,
					position.x + Math.random() * 10 * range - 5 * range,
					position.y + Math.random() * 6 * range - 3 * range,
					range * Math.random() * 30 + 30));});


			this.main.meteors.splice(i, 1);
			this.main.makeMeteor();
		}
	};

	this.render = function () {var _this2 = this;
		var ctx = this.ctx;
		ctx.strokeStyle = this.color[0];
		ctx.fillStyle = this.color[1];
		ctx.moveTo(this.position.x, this.position.y);
		ctx.beginPath();
		this.points.forEach(function (p) {
			var x = Math.cos(p.phi + _this2.rotation) * p.length + _this2.position.x;
			var y = Math.sin(p.phi + _this2.rotation) * p.length + _this2.position.y;
			ctx.lineTo(x, y);
		});
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		//
		var vfx = this.vfx;
		vfx.globalAlpha = Math.random();
		vfx.fillStyle = this.color[2 + ~~(Math.random() + 0.6)];
		vfx.moveTo(this.position.x, this.position.y);
		vfx.beginPath();
		this.points.forEach(function (p) {
			var x =
			Math.cos(p.phi + _this2.rotation * Math.random() * 0.2 - 0.1) * p.length +
			Math.random() +
			_this2.position.x;
			var y =
			Math.sin(p.phi + _this2.rotation * Math.random() * 0.2 - 0.1) * p.length +
			Math.random() +
			_this2.position.y;
			vfx.lineTo(x, y);
		});
		vfx.closePath();
		vfx.fill();
	};
}

function Rock(options) {var _this3 = this;
	options = options || {};
	this.main = options.main || {};
	this.base = options.base || 2;
	this.ctx = options.ctx;
	this.vfx = options.vfx;
	this.position = options.position || {
		x: Math.random() * this.main.width,
		y: Math.random() * this.main.height };

	this.rotation = options.rotation || Math.random() * 2 * Math.PI;
	this.velocity = options.velocity || {
		phi: Math.random() * Math.PI * 0.5 + Math.PI * 1.25,
		length: Math.random() * 1.5 * this.base + 15,
		rotate: Math.random() * 0.2 - 0.1 };

	this.gravity = options.gravity || { phi: Math.PI * 0.5, length: 5 };
	this.edge =
	options.edge ||
	~~(Math.random() * this.velocity.length + this.velocity.length * 2 + 5);
	this.color = options.color || ["#300", "#510", "#fd2", "#f62"];
	this.timescale = options.timescale || 1.5;
	this.lifespan = options.lifespan || ~~(Math.random() * 30 + 10);
	this.friction = 0.94;
	this.points = [].concat(_toConsumableArray(new Array(this.edge))).map(function (e, i) {
		var phi = i / _this3.edge * 2 * Math.PI;
		return {
			phi: phi + Math.random() * 0.4 - 0.2,
			length:
			Math.random() * _this3.velocity.length * 0.1 + _this3.velocity.length * 0.2 };

	});

	this.update = function (i) {
		if (this.lifespan-- <= 0) {
			this.main.meteors.splice(i, 1);
			return;
		}
		this.rotation += this.velocity.rotate * this.timescale;
		this.position.x +=
		Math.cos(this.velocity.phi) * this.velocity.length * this.timescale;
		this.position.y +=
		Math.sin(this.velocity.phi) * this.velocity.length * this.timescale;
		this.position.x +=
		Math.cos(this.gravity.phi) * this.gravity.length * this.timescale;
		this.position.y +=
		Math.sin(this.gravity.phi) * this.gravity.length * this.timescale;
		this.velocity.length *= this.friction;
	};

	this.render = function () {var _this4 = this;
		var ctx = this.ctx;
		ctx.globalAlpha = Math.random();
		ctx.strokeStyle = this.color[0];
		ctx.fillStyle = this.color[1];
		ctx.moveTo(this.position.x, this.position.y);
		ctx.beginPath();
		this.points.forEach(function (p) {
			var x = Math.cos(p.phi + _this4.rotation) * p.length + _this4.position.x;
			var y = Math.sin(p.phi + _this4.rotation) * p.length + _this4.position.y;
			ctx.lineTo(x, y);
		});
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		ctx.globalAlpha = 1;
		//
		var vfx = this.vfx;
		vfx.globalAlpha = Math.random();
		vfx.fillStyle = this.color[2 + ~~(Math.random() + 0.6)];
		vfx.moveTo(this.position.x, this.position.y);
		vfx.beginPath();
		this.points.forEach(function (p) {
			var x =
			Math.cos(p.phi + _this4.rotation * Math.random() * 0.2 - 0.1) * p.length +
			Math.random() +
			_this4.position.x;
			var y =
			Math.sin(p.phi + _this4.rotation * Math.random() * 0.2 - 0.1) * p.length +
			Math.random() +
			_this4.position.y;
			vfx.lineTo(x, y);
		});
		vfx.closePath();
		vfx.fill();
	};
}

function LightFlare(ctx, x, y, range) {
	range = range || 100;
	var strength = Math.random() * range + range;
	var light = ctx.createRadialGradient(x, y, 0, x, y, strength);
	light.addColorStop(0, "rgba(250, 200, 50, 0.4)");
	light.addColorStop(0.1, "rgba(250, 200, 50, 0.3)");
	light.addColorStop(0.4, "rgba(250, 200, 50, 0.2)");
	light.addColorStop(0.65, "rgba(250, 200, 50, 0.1)");
	light.addColorStop(0.8, "rgba(250, 200, 50, 0.05)");
	light.addColorStop(1, "rgba(250, 200, 50, 0)");
	ctx.globalAlpha = 1;
	ctx.beginPath();
	ctx.fillStyle = light;
	ctx.arc(x, y, strength, 0, Math.PI * 2);
	ctx.fill();
	ctx.closePath();
}

function Ground(options) {var _this5 = this;
	options = options || {};
	this.main = options.main || {};
	this.ctx = options.ctx;
	this.edge = options.edge || ~~(Math.random() * 10 + 40);
	this.color = options.color || ["#222", "#1e004e"];
	this.height = options.height || this.main.height * 0.16;
	this.points = [].concat(_toConsumableArray(new Array(this.edge))).map(function (e, i) {
		var rand = 1 / _this5.edge * _this5.main.width;
		return {
			x: i / _this5.edge * _this5.main.width + Math.random() * rand - rand * 0.5,
			y: _this5.main.height - _this5.height + Math.random() * _this5.height * 0.1 };

	});

	this.update = function () {
		return;
	};

	this.render = function () {
		var ctx = this.ctx;
		ctx.strokeStyle = this.color[0];
		ctx.fillStyle = this.color[1];
		ctx.beginPath();
		ctx.moveTo(-this.height, this.main.height);
		this.points.forEach(function (p) {return ctx.lineTo(p.x, p.y);});
		ctx.lineTo(this.main.width + this.height, this.main.height);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
	};
}

var main = {
	canvas: document.getElementById("canvas"),
	buffer: document.getElementById("buffer"),
	ctx: null,
	vfx: null,
	ground: null,
	meteors: [],
	count: 8,
	width: window.innerWidth,
	height: window.innerHeight,
	init: function init() {var _this6 = this;
		this.registerEvents();
		this.ctx = this.canvas.getContext("2d");
		this.vfx = this.buffer.getContext("2d");
		this.vfx.globalCompositeOperation = "screen";
		//
		this.resize();
		//
		this.ground = new Ground({
			ctx: this.ctx,
			main: this });

		[].concat(_toConsumableArray(new Array(this.count))).map(function () {return _this6.makeMeteor();});
	},

	makeMeteor: function makeMeteor() {
		this.meteors.push(
		new Meteor({
			ctx: this.ctx,
			vfx: this.vfx,
			ground: this.height - this.ground.height * 0.8,
			main: this }));


	},

	makeRock: function makeRock(options) {
		options = options || {};
		this.meteors.push(
		new Rock({
			ctx: this.ctx,
			vfx: this.vfx,
			position: options.position,
			base: options.base,
			main: this }));


	},

	update: function update() {
		this.meteors.forEach(function (m, i) {return m.update(i);});
		this.ground.update();
	},

	render: function render() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.meteors.forEach(function (m) {return m.render();});
		this.ground.render();
		//
		this.vfx.fillStyle = "#000000";
		this.vfx.globalAlpha = Math.random() * 0.12;
		this.vfx.fillRect(0, 0, this.width, this.height);
	},

	resize: function resize() {
		this.width = window.innerWidth * 1.5;
		this.height = window.innerHeight * 1.5;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.buffer.width = this.width;
		this.buffer.height = this.height;
	},

	registerEvents: function registerEvents() {var _this7 = this;
		window.addEventListener(
		"resize",
		function () {
			_this7.resize();
		},
		false);

	} };


main.init();
(function loop() {
	main.update();
	main.render();
	window.requestAnimationFrame(loop);
})();
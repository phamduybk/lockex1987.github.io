var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

if (!document.querySelectorAll) {
	document.querySelectorAll = function (selectors) {
		var style = document.createElement('style'),elements = [],element;
		document.documentElement.firstChild.appendChild(style);
		document._qsa = [];

		style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
		window.scrollBy(0, 0);
		style.parentNode.removeChild(style);

		while (document._qsa.length) {
			element = document._qsa.shift();
			element.style.removeAttribute('x-qsa');
			elements.push(element);
		}
		document._qsa = null;
		return elements;
	};
}

if (!document.querySelector) {
	document.querySelector = function (selectors) {
		var elements = document.querySelectorAll(selectors);
		return elements.length ? elements[0] : null;
	};
}


var SolariseBubbles = window.SolariseBubbles || {};


// Need to break backspace functionality for going back a page. Sorry!
window.onkeydown = function (e) {
	if (e.keyCode == 8 && e.target == document.body)
	e.preventDefault();
};


// Thanks https://stackoverflow.com/questions/5294955/how-to-scale-down-a-range-of-numbers-with-a-known-min-and-max-value
var scaleRange = function scaleRange(x, min, max, a, b) {
	return (b - a) * (x - min) / (max - min) + a;
};

// thx https://stackoverflow.com/questions/4179708/how-to-detect-if-the-pressed-key-will-produce-a-character-inside-an-input-text
var isPermittedKeyPress = function isPermittedKeyPress(e) {

	var keycode = e.keyCode;

	var valid =
	keycode > 47 && keycode < 58 || // number keys
	//keycode == 32 || keycode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
	keycode == 32 || keycode == 8 ||
	keycode > 64 && keycode < 91 || // letter keys
	keycode > 95 && keycode < 112 || // numpad keys
	keycode > 185 && keycode < 193 || // ;=,-./` (in order)
	keycode > 218 && keycode < 223; // [\]' (in order)

	return valid;

};

// thx https://stackoverflow.com/questions/19784064/set-javascript-computed-style-from-one-element-to-another
var copyNodeStyle = function copyNodeStyle(src, dest) {
	var computedStyle = window.getComputedStyle(src);
	Array.from(computedStyle).forEach(function (key) {return dest.style.setProperty(key, computedStyle.getPropertyValue(key), computedStyle.getPropertyPriority(key));});
};


var params = {

	gridSize: 40, // size of the grid we use to calculate bubble proximity! Cannot be less than 1/4 max bubble radius
	// collisions are currently disabled between bubbles...

	showWindVectors: false,

	maxTotalParticles: 5000, // the max number of particles we can render!
	// (not implemented yet. oh dear)

	toggleShowWindVectors: function toggleShowWindVectors() {
		this.showWindVectors = !this.showWindVectors;
	},

	gravity: 9.8,

	bubble: {
		delay: {
			min: 2000,
			max: 5000 },

		size: {
			max: 45,
			min: 35 },

		growthRate: 5,
		accelleration: -1.25 },


	character: {
		color: '#666666',
		particles: {
			min: 50,
			max: 100 } },



	particle: {
		initialForce: 1,
		maxLifetime: 5000,
		maxRadius: 3,
		drag: 0.95,
		count: {
			min: 150,
			max: 250 },

		vX: {
			max: 0.5 },

		vY: {
			min: -0.2,
			max: 0.8 },

		startX: {
			min: 2.5,
			max: 7.5 },

		startY: {
			min: 2.5,
			max: 7.5 } }





	// generate a random number with a bias
	// if p is small, e.g. 0.5, bias is towards max
	// if p is large, e.g. 5, bias is towards min
};var randBias = function randBias(p) {var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	return min + (max - min) * Math.pow(Math.random(), p);
};var



Container = function () {

	function Container(container) {var _this = this;_classCallCheck(this, Container);

		container.addEventListener('particle:expired', function (e) {
			//console.log(`Particle ${e.detail.i} has expired. It is an ex-particle`);
			_this.particles.splice(e.detail.i - 1, 1);
		});

		this._container = container;

		this._wind = new Vector(1, 1);
		this._wind.rotate(180);
		this._length = 10;
		this._wind.normalize(this._length);

		this.windVariance = Math.random() * 2 + 1;

		var canvas = document.createElement('canvas');
		canvas.width = container.offsetWidth;
		canvas.height = container.offsetHeight;
		canvas.style.cssText = 'z-index: 10; left: 0px; top: 0px; pointer-events: none; position: absolute; width: ' + container.offsetWidth + '; height: ' + container.offsetHeight;
		container.insertBefore(canvas, container.firstChild);

		this._ctx = canvas.getContext('2d');
		this._container = container;
		this._canvas = canvas;

		// count the total number of particles that have ever been added to this container
		// we need a unique ID for every new particle so it can be easily removed when it ends
		this.particles = [];
		this.particleCount = 0;

		// Store pointer to all inputs defined in this container
		this.inputs = [];



	}_createClass(Container, [{ key: 'addParticle', value: function addParticle(

		particle) {

			if (particle.constructor.name !== 'Particle') {
				throw "Not a particle!";
			}

			particle.i = this.particleCount;

			this.particles[this.particleCount] = particle;

		} }, { key: 'clearCanvas', value: function clearCanvas()

		{
			this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
		} }, { key: 'resize', value: function resize()

		{
			this._canvas.width = this._container.offsetWidth;
			this._canvas.height = this._container.offsetHeight;
		} }, { key: 'step', value: function step(

		dt) {
			// Not much to do here, just calculate the changing wind

			//this._length += dt/2500;

			this._wind.rotate(0.1 * dt / 1000);
			this._wind.normalize(this._length);

			// Process the particles if they exist (i.e. if deleting/crumbling)
			if (this.particles.length) {
				var count = 0;
				this.particles.forEach(function (particle) {
					particle.step(dt);
					count++;
				});
			}

		} }, { key: 'wind', get: function get()

		{
			return this._wind;
		} }, { key: 'height', get: function get()

		{
			return this._container.offsetHeight;
		} }, { key: 'width', get: function get()

		{
			return this._container.offsetWidth;
		} }, { key: 'top', get: function get()

		{
			return this._container.offsetTop;
		} }, { key: 'left', get: function get()

		{
			return this._container.offsetLeft;
		} }, { key: 'element', get: function get()

		{
			return this._container;
		} }, { key: 'context', get: function get()

		{
			return this._ctx;
		} }, { key: 'offscreen', get: function get()

		{
			return this._sourceCanvas;
		} }]);return Container;}();var







Point =
function Point(x, y) {_classCallCheck(this, Point);
	if (typeof x != "number")
	throw new Error("Invalid x value.");
	if (typeof y != "number")
	throw new Error("Invalid y value.");

	this.x = x;
	this.y = y;
};


// Thanks muchly to https://github.com/maxkueng/victor/blob/master/build/victor.js (parts borrowed from)
// and paper.js
var Vector = function () {

	function Vector(x, y) {_classCallCheck(this, Vector);
		if (typeof x != "number")
		throw new Error("Invalid x value.");
		if (typeof y != "number")
		throw new Error("Invalid y value.");

		// Store the (x, y) coordinates
		this.x = x || 0;
		this.y = y || 0;
	}_createClass(Vector, [{ key: 'isZero', value: function isZero(

		val) {
			return val >= -1e-12 && val <= 1e-12;
		}

		// Set to length...
	}, { key: 'normalize', value: function normalize() {var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

			var current = this.length;
			var scale = current !== 0 ? length / current : 0;

			if (scale >= 0) {
				this.x *= scale;
				this.y *= scale;
			}

		} }, { key: 'rotate', value: function rotate(

		angle) {
			var nx = this.x * Math.cos(angle) - this.y * Math.sin(angle);
			var ny = this.x * Math.sin(angle) + this.y * Math.cos(angle);

			this.x = nx;
			this.y = ny;
		} }, { key: 'rotateBy', value: function rotateBy(

		angle) {
			var _angle = this.angle() + rotation;
			return this.rotate(_angle);
		}

		// copy of rotate()?
		// remove above 2 fns?
	}, { key: 'angle', set: function set(angle) {
			var angleRadians = angle * Math.PI / 180;
			if (!this.isZero(this.x) && !this.isZero(this.y)) {
				var length = this.length;
				this.x = Math.cos(angleRadians) * length;
				this.y = Math.sin(angleRadians) * length;
			}
		}

		// gettrs
		, get: function get() {
			return Math.atan2(this.y, this.x);
		} }, { key: 'length', get: function get()

		{
			return Math.sqrt(this.lengthSq);
		} }, { key: 'lengthSq', get: function get()

		{
			return this.x * this.x + this.y * this.y;
		} }]);return Vector;}();var



Particle = function () {

	// Create a particle which will be rendered into a canvas

	function Particle()
	{_classCallCheck(this, Particle);

		this.vX = (Math.random() * 2 - 1) * params.particle.initialForce;
		this.vY = (randBias(0.5) - 0.8) * params.particle.initialForce;

		this.x = null;
		this.y = null;
		this.i = null;

		var particleSizeOffset = 1.5;
		this.r = randBias(5) * params.particle.maxRadius + particleSizeOffset;


		this.maxLifetime = Math.random() * (params.particle.maxLifetime - params.particle.maxLifetime / 2) + params.particle.maxLifetime / 2;
		//this.maxLifetime = 15000;

		// Map the radius to a function which produces a number in the range 0.05 -> 1
		this.windResistance = scaleRange(this.r, particleSizeOffset, params.particle.maxRadius + particleSizeOffset, 0.005, 0.5);
		this.mass = scaleRange(this.r, particleSizeOffset, params.particle.maxRadius + particleSizeOffset, 0.75, 1);

		this.lifetime = 0;
		this.delay = 0;

		// The wind vector
		this._wind = null; /* @param Vector */

		// Set by calling Particle.container = container
		this._container = null;
		this._ctx = null;
		// A pointer to a Container.canvas which has had a particle rendered onto it
		// Draw particles with a canvas.drawImage() call
		this._sourceCanvas = null;

		// Has this particle come to rest on the floor? (can be removed if so)
		this._isAtRest = false;

		this._isDestroyed = false;
	}_createClass(Particle, [{ key: 'calculateCollisions', value: function calculateCollisions()


		{

			var r = this.r;

			if (this.x < r / 2) {
				this.vX = 0 - (this.vX * Math.random() * 0.4 + 0.2);
				this.x = r / 2;
			}

			if (this.x > this._container.width - r / 2) {
				this.vX = 0 - (this.vX * Math.random() * 0.4 + 0.2);
				this.x = this._container.width - r / 2;
			}

			if (this.y < r / 2) {
				this.vY = 0 - (this.vY * Math.random() * 0.25 + 0.1);
				this.y = r / 2;
			}

			if (this.y > this._container.height - r / 2) {
				this.vX *= 0.05;
				this.vY = 0 - (this.vY * Math.random() * 0.05 + 0.01);
				this.y = this._container.height - r;
				if (Math.abs(this.vY) <= 0.05) {
					this._isAtRest = true;
				}
			}

		} }, { key: 'render', value: function render()


		{

			if (!this._sourceCanvas) {
				throw "Cannot render particle without a source canvas in place";
			}

			this._ctx.drawImage(this._sourceCanvas, this.x - this.r / 2, this.y - this.r / 2, this.r, this.r);

		} }, { key: 'destroy', value: function destroy()


		{
			var event = new CustomEvent('particle:expired', { detail: { i: this.i } });
			this.container.element.dispatchEvent(event);
			this._isDestroyed = true;
		} }, { key: 'step', value: function step(


		dt)
		{

			if (this._isDestroyed) {
				// Don't process this particle
				return;
			}

			if (!this.i) {
				throw "No index (i) has been assigned to this particle";
			}

			if (!this._container) {
				throw "No container has been added yet!";
			}

			this.lifetime += dt;

			if (this.delay > this.lifetime) {
				// No processing yet
				return;
			}


			if (this.x === null || this.y === null) {
				throw "Need to initialise particle location first!";
			}


			if (this.lifetime >= this.maxLifetime) {
				this.destroy();
				return;
			}

			// Particle has reached a rest state!
			if (!this._isAtRest) {

				// Scale values of this.r between 0 and 2 to 0.5->1
				this.vY += dt / 1000 * params.gravity * this.windResistance;

				this.x += this.vX;
				this.y += this.vY;

				// Some random distance from walls/floors, don't process wind
				// This is to stop particles from getting "stuck" to the wall due to
				// wind
				var windRandDistFromWalls = Math.random() * 20 + 10;

				// Process the wind, but only if a short distance above the floor or away from the walls
				if (
				this.y < this._container.height - windRandDistFromWalls &&
				this.y > windRandDistFromWalls &&




				this.x > windRandDistFromWalls &&
				this.x < this._container.width - windRandDistFromWalls)
				{
					var windX = this.wind.x;
					var windY = this.wind.y;

					this.x += windX * (dt / 1000) / this.mass;
					this.y += windY * (dt / 1000) / this.mass;
				}

				this.calculateCollisions();

			}

			this.render();
		} }, { key: 'container', get: function get()


		{
			return this._container;
		}, set: function set(

		container) {

			if (container.constructor.name !== 'Container') {
				throw "container must be a Container!";
			}

			container.particleCount++;

			this._container = container;
			this._ctx = container.context;
		} }, { key: 'sourceCanvas', set: function set(

		canvas)
		{
			this._sourceCanvas = canvas;
		}

		// Apply initial y velocity, allows particle to carry momentum of character
	}, { key: 'initialVY', set: function set(vY)
		{
			this.vY += vY;
		} }, { key: 'wind', get: function get()

		{
			return this._wind;
		}, set: function set(

		wind) {

			if (wind.constructor.name !== 'Vector') {
				throw "Wind must be a vector!";
			}

			this._wind = wind;

		} }]);return Particle;}();var






Character = function () {

	function Character(value) {var _this2 = this;_classCallCheck(this, Character);

		// Track the character/value/keyName of this char
		this._value = value;

		// How long has this character existed?
		this.lifetime = 0;

		// How many particles to emit upon
		this.particleCount = Math.random() * (params.character.particles.max - params.character.particles.min) + params.character.particles.min;

		this._neighs = []; // array of neighbours to check collisions against

		// Delay until the bubble starts
		this.delay = Math.random() * (params.bubble.delay.max - params.bubble.delay.min) + params.bubble.delay.min;

		this.bubbleSize = 0;
		this.bubbleMaxSize = Math.random() * (params.bubble.size.max - params.bubble.size.min) + params.bubble.size.min; // Bubbles between 30 and 45

		//this.noBubbleAccel = 9.81; // accelleration downwards when bubble popped

		// x and y displacement based on original positioning
		// Used to apply 3D transform
		this.dX = 0;
		this.dY = 0;

		this.gridX = 0;
		this.gridY = 0;

		this.prevGridX = 0;
		this.prevGridY = 0;

		// x and y velocity
		this.vX = Math.random() * 0.25 - 0.125;
		this.vY = 0; // pixels per second

		this.rotAcc = 0; // rotational accelleration. Randomise this
		this.rotVel = Math.random() * 2 - 1; // rotational velocity
		this.rotation = 0;

		var el = document.createElement('span');
		var debug = document.createElement('div');
		var bubble = document.createElement('div');

		debug.innerHTML = "dbg";
		debug.className = 'stb__debug';

		bubble.className = 'stb__bubble';
		bubble.style.opacity = 0;

		el.className = 'stb__char';

		el.innerHTML = value;

		el.addEventListener('click', function (_) {return _this2.delete();});

		//el.appendChild(debug);
		el.appendChild(bubble);

		this.el = el;
		this.debug = debug;
		this.bubble = bubble;

		this._container = null;

		this._input = null;

		this._isAtRest = false;

		this.isDeleted = false;

		this.hasTakenFlight = false;

	}_createClass(Character, [{ key: 'calculateCollisions', value: function calculateCollisions()


		{

			if (this.bubble) {

				if (this.x - this.r / 2 <= 0) {
					this.vX = -this.vX;
					// need to position relative to start point? oh no!
					this.dX = 0 - this.x - this.r / 2;
				}

				// touches the top of the containerEl
				if (this.y - this.bubbleSize / 2 <= 0) {

					this.vY *= Math.random() * 0.1 + 0.2;
					this.vX = Math.random() * 1 - 0.5;
					// todo - something more subtle with vY
					this.rotVel *= Math.random() * 10 - 5;
					this.pop();
				}

			} else {

				// the bubble hast pop'd. let gravity do its thing...

				// Check if resting on floor - todo, optimise this
				// Once a popped bubble lands on the floor, no more calulcation required
				if (this.y + this.r / 2 >= this._container.height) {

					// Reverse velocity and reduce by about 1/6
					// this will be carried over to particulatses..
					this.vY = -this.vY * (Math.random() * 0.1);
					this.vX = Math.random() * 2 - 1;
					this.rotVel *= Math.random() * 5 - 2.5;
					this.dY = this._container.height;
					this.delete();

				}
			}
		}

		/**
     * pop da bbl
     */ }, { key: 'pop', value: function pop()
		{
			if (this.bubble) {
				this.bubble.remove();
				this.bubble = null;
			}
		}

		/**
     * nudge across x pixels
     */ }, { key: 'nudge', value: function nudge(
		x)
		{

			if (this.hasTakenFlight) {
				// Only nudge characters still in the input tray
				return;
			}

			var currentLeft = parseInt(this.el.style.left);
			if (!currentLeft) {
				currentLeft = 0;
			}
			this.el.style.left = currentLeft + x + 'px';
		}

		/**
     * remove the chr (popping the bbl doesn't do this)
     * this is equivalent of a "delete"
     */ }, { key: 'delete', value: function _delete()
		{

			if (this.isDeleted) {
				return;
			}

			this.pop();

			// Create a new event
			var event = new CustomEvent('deleting', { detail: { char: this } });
			this.el.dispatchEvent(event);


			// Populate the characters, add them to the canvas
			for (var i = 0; i < this.particleCount; i++) {

				var particle = new Particle();
				particle.x = this.x + Math.random() * this.width;
				particle.y = this.y + Math.random() * this.height;

				particle.delay = i;

				particle.initialVY = this.vY;
				particle.container = this._container;
				particle.sourceCanvas = this._input.sourceCanvas;
				particle.wind = this.wind;

				this._container.addParticle(particle);
			}

			this.el.remove();

			this.isDeleted = true;

		}

		/**
     * 
     */ }, { key: 'setNeighbours', value: function setNeighbours(
		neighs)
		{

			if (!Array.isArray(neighs)) {
				throw "Must pass an array of neighbours";
			}

			this._neighs = neighs;
		}

		/**
     * step thru the animation for this Character
     */ }, { key: 'step', value: function step(
		dt) {

			this.lifetime += dt;

			if (!this._input) {
				throw "The input has not been attached";
			}

			if (!this._wind) {
				throw "No wind defined";
			}

			if (this.lifetime < this.delay) {

				// Don't start processing the bubble anim until delay ms has passed
				// (can process particles if deleted before this tho)
				return;
			}



			if (!this.hasTakenFlight) {
				this.el.style.left = this.el.offsetLeft + 'px';
				this.el.style.top = this.el.offsetTop + 'px';
				this.el.style.position = 'absolute';

				var event = new CustomEvent('takeoff', { detail: { width: this.el.offsetWidth } });
				this.el.dispatchEvent(event);

			}

			if (this._isAtRest) {
				// No processing required when a character is at rest
				return;
			}

			if (!this._container) {
				throw "Cannot run `step` on this character until a container is specified";
			}

			// Calculate whether or not this bubble will be popped
			this.calculateCollisions();

			var accel = void 0;

			if (!this.bubble) {

				this.vY += dt / 1000 * params.gravity;
				this.rotation += this.rotVel;

				this.debug.innerHTML = '';

			} else {

				// Make sure the bubble is visible!
				if (!this.hasTakenFlight) {
					this.bubble.style.opacity = 1;
				}

				//this.calculateGridPosition();

				this.bubble.style.width = this.bubbleSize + 'px';
				this.bubble.style.height = this.bubbleSize + 'px';

				this.rotation += this.rotVel;

				// Bubble growth factor;
				if (this.bubbleSize <= this.bubbleMaxSize) {
					this.bubbleSize += dt / 100 * params.bubble.growthRate;
				}

				var bubbleSizeFactor = this.bubbleSize / this.bubbleMaxSize; // Factor in bubble size factor in accelleration

				// Process the wind!
				var windX = this.wind.x;
				var windY = this.wind.y;

				this.dX += windX * (dt / 1000);
				this.dY += windY * (dt / 1000);

				// Render the wind vectors

				if (params.showWindVectors === true) {
					var ctx = this._container.context;

					var r = this.width / 2;

					ctx.beginPath();
					ctx.moveTo(this.x + r, this.y + r);
					ctx.lineTo(this.x + this.wind.x + r, this.y + this.wind.y + r);
					ctx.strokeStyle = '#000000';
					ctx.lineWidth = 2;
					ctx.stroke();
				}

				this.vY += dt / 1000 * params.bubble.accelleration * bubbleSizeFactor;

				if (this.vY >= 5) {
					this.vY = 5;
				}


			}

			this.dX += this.vX;
			this.dY += this.vY;


			var transform = 'translate3d(' + this.dX + 'px, ' + this.dY + 'px, 0px) rotate(' + this.rotation + 'deg)';

			this.el.style.transform = transform;

			// Liftoff!
			this.hasTakenFlight = true;

			this._input.positionCaret();

		}

		/**
     * get the actual x cords rel to nearest positioned parent container
     */ }, { key: 'x', get: function get()
		{
			//return this.el.offsetLeft;
			var rect = this.el.getBoundingClientRect();
			return rect.left - this._container.left;
		}

		/**
     * and the same fr y
     */ }, { key: 'y', get: function get()
		{
			var rect = this.el.getBoundingClientRect();
			return rect.top - this._container.top;
		} }, { key: 'r', get: function get()

		{
			return this.bubbleSize;
		}

		/**
     * return what char has been inited for this Char
     */ }, { key: 'value', get: function get()
		{
			return this._value;
		}

		/**
     * the rendered width of this character
     */ }, { key: 'width', get: function get()
		{

			if (!document.body.contains(this.el)) {
				throw "This element has not been added to the DOM yet. You can't retrieve its width";
			}

			return this.el.offsetWidth;
		} }, { key: 'height', get: function get()

		{

			if (!document.body.contains(this.el)) {
				throw "This element has not been added to the DOM yet. You can't retrieve its width";
			}

			return this.el.offsetHeight;

		}

		/**
     * Pass a pointer to the input this character is contained by?
     * @param  {[type]} input [description]
     * @return {[type]}       [description]
     */ }, { key: 'input', set: function set(
		input)
		{
			this._input = input;
		} }, { key: 'container', set: function set(

		container)
		{

			if (container.constructor.name !== 'Container') {
				throw "container must be a Container!";
			}

			this._container = container;

		}

		/**
     * set the popped state, updates class accrdngly
     */ }, { key: 'popped', set: function set(
		state)
		{
			this._popped = state;
			this.el.className = this.el.className.replace(/\is-popped\b/g, "").trim();
			if (state) {
				this.el.classList.add('is-popped');
			}
		}

		/**
     * Get the popped state
     */, get: function get()

		{
			return this._popped;
		} }, { key: 'wind', get: function get()



		{
			return this._wind;
		}, set: function set(

		wind)
		{

			if (wind.constructor.name !== 'Vector') {
				throw "Wind must be a vector!";
			}

			this._wind = wind;

		} }]);return Character;}();var











Input = function () {

	function Input(el) {var _this3 = this;_classCallCheck(this, Input);

		if (el.nodeName.toLowerCase() === 'input' && el.getAttribute('type') === 'text') {
			// all good			
		} else if (el.nodeName.toLowerCase() === 'textarea') {
			// all good
		} else {
			throw "el must be a text or textarea input";
		}

		// Create a fake input over the real one!
		var fakeInput = document.createElement('div');
		fakeInput.classList.add('stb__input');

		// Place it after the existing input		
		el.parentNode.insertBefore(fakeInput, el.nextSibling);

		// Copy the exact styling of the input
		var reposition = function reposition(_) {
			el.style.cssText = 'visibility: visible';
			copyNodeStyle(el, fakeInput);
			el.style.cssText = 'visibility: hidden';
			fakeInput.style.visibility = 'visible';
			fakeInput.style.overflow = 'visible';
			if (_this3.container) {
				_this3.container.resize();
			}

		};

		// Copy the computed styling of the input element
		// Make sure the fake input tracks the size of the real one
		window.addEventListener('resize', reposition);

		// Fire on init
		reposition();

		// track the total length of all chars added
		// used to
		//  1. insert new chars at the correct point
		//  2. position the caret
		this.totalCharLength = 0;

		//this.caretPosition = 0;

		// The total nudge offset applied to compensate for takeoff letters
		this.nudgeTotal = 0;


		// Position absolutely
		fakeInput.style.top = el.offsetTop + 'px';
		fakeInput.style.left = el.offsetLeft + 'px';
		fakeInput.style.position = 'absolute';

		fakeInput.addEventListener('click', function (_) {
			// Activate listener
			_this3.hasFocus = true;
		});

		this.caret = document.createElement('div');
		this.caret.classList.add('stb__caret');

		fakeInput.appendChild(this.caret);

		// Initially no container has been specified
		this.container = null;

		this.el = el;
		this.fakeInput = fakeInput;
		this.chars = [];
		this.value = el.value;

		this._hasFocus = false;

		this._sourceCanvas = null;

		this.generateSourceCanvas();

	}_createClass(Input, [{ key: 'generateSourceCanvas', value: function generateSourceCanvas()


		{
			var sourceCanvas = document.createElement('canvas');
			sourceCanvas.width = 10;
			sourceCanvas.height = 10;
			var offscreenCtx = sourceCanvas.getContext('2d');

			// Render a particle to the offscreen canvas
			offscreenCtx.beginPath();
			offscreenCtx.arc(5, 5, 5, 0, 2 * Math.PI, false);
			offscreenCtx.fillStyle = window.getComputedStyle(this.el).getPropertyValue('color');
			offscreenCtx.fill();

			this._sourceCanvas = sourceCanvas;
		} }, { key: 'positionCaret', value: function positionCaret()





		{

			// Calc length of all characters that haven't taken off yet.
			var w = 0;
			this.chars.forEach(function (char) {
				if (!char.hasTakenFlight) {
					w += char.width;
				}
			});

			this.caret.style.left = w + 'px';
		} }, { key: 'addCharacter', value: function addCharacter(


		keyName)
		{var _this4 = this;

			if (!document.body.contains(this.el)) {
				throw "This input element has not been added to the DOM yet";
			}

			var char = new Character(keyName);

			char.wind = this.container.wind;
			char.input = this;

			char.nudge(this.nudgeTotal);

			char.container = this.container;

			this.value += keyName;
			this.el.value = this.value;

			this.chars.push(char);

			this.fakeInput.appendChild(char.el);

			this.totalCharLength += char.width;


			var __characterAdjustment = function __characterAdjustment(e) {
				char.el.classList.add('stb__char--removing');

				if (e.type === 'deleting') {
					// remove the char from the array
					var i = _this4.chars.indexOf(e.detail.char);
					if (i !== -1) {
						_this4.chars.splice(i, 1);
					}
				}


				_this4.totalCharLength -= e.detail.width;
				_this4.positionCaret();
			};

			// Todo - callbacks?
			char.el.addEventListener('deleting', function (e) {return __characterAdjustment(e);});
			char.el.addEventListener('takeoff', function (e) {return __characterAdjustment(e);});
			// Also called on creation
			this.positionCaret();

		} }, { key: 'backspace', value: function backspace()


		{var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
			if (i === false) {
				// Leave character in array when deleting
				var char = this.chars[this.chars.length - 1];
				if (char) {
					char.delete();
					//this.caretPosition--;
				}
			}
		} }, { key: 'doKeyDown', value: function doKeyDown(

		event)
		{

			if (!this.hasFocus) {
				return;
			}

			if (isPermittedKeyPress(event)) {
				var keyName = event.key;

				if (event.which == 32) {
					keyName = '&nbsp;';
				}

				if (event.which == 9) {
					// Tab to next input : todo
				}

				if (event.which == 8) {
					// backspace
					this.backspace();
				} else {
					this.addCharacter(keyName);
				}


				//this.value += keyName;
			} else {
					// Do some special cases, e.g. delete
				}

		} }, { key: 'step', value: function step(

		dt)
		{

			if (!this.container) {
				throw "Cannot run `step` on this input until a parent element is specified";
			}

			this.chars.forEach(function (char) {
				char.step(dt);
				//char.el.style.top -= ts / 100;
			});
		}

		/**
     * 
     */ }, { key: 'hasFocus', set: function set(
		state)
		{
			this._hasFocus = state;

			if (state == true) {
				var event = new CustomEvent('input:focused', { detail: { input: this } });
				this.fakeInput.classList.add('is-focused');
				this.container.element.dispatchEvent(event);
			} else {
				this.fakeInput.className = this.fakeInput.className.replace(/\is-focused\b/g, "").trim();
			}

		}

		/**
     * 
     */, get: function get()

		{
			return this._hasFocus;
		}

		/**
     * 
     */ }, { key: 'sourceCanvas', get: function get()

		{
			return this._sourceCanvas;
		} }]);return Input;}();






/**
                           * Main
                           * @type {[type]}
                           */var
Main =

function Main(selector) {var _this5 = this;_classCallCheck(this, Main);

	if (params.bubble.size.max / 4 > params.gridSize) {
		throw "Grid size must be more than max bubble size < 2";
	}

	var inputs = [];

	var paused = false;
	this.containers = [];

	var nodes = document.querySelectorAll(selector);

	console.log(nodes);

	var unfocusOtherInputs = function unfocusOtherInputs(input) {
		_this5.containers.forEach(function (container) {return container.inputs.forEach(function (_input) {
				if (_input !== input) {
					_input.hasFocus = false;
				}
			});});
	};


	[].forEach.call(nodes, function (node) {
		var input = new Input(node);

		var container = void 0;

		// If this parent hasn't already had a container attached
		if (!node.offsetParent.container) {
			container = new Container(node.offsetParent);
			_this5.containers.push(container);
			node.offsetParent.container = input.container;
		} else {
			container = node.offsetParent.container;
		}

		container.inputs.push(input);
		input.container = container;

		// If this node already has a value, initialize it...
		if (node.value) {
			node.value.split('').forEach(function (c) {
				input.addCharacter(c);
			});
		}


		container.element.addEventListener('input:focused', function (e) {
			var input = e.detail.input;
			unfocusOtherInputs(input);
		});

		//input.containerEl = node.offsetParent;
		inputs.push(input);
	});

	document.addEventListener('keydown', function (event) {

		inputs.forEach(function (input) {
			if (input.hasFocus) {
				input.doKeyDown(event);
			}
		});

		if (event.which == 27) {// esc
			paused = !paused;
		}

	});

	var lastTimestamp = null;

	var step = function step(timestamp) {

		if (!paused) {
			var dt = timestamp - lastTimestamp;

			_this5.containers.forEach(function (container) {
				container.clearCanvas();
				container.step(dt);
			});

			inputs.forEach(function (input) {
				input.step(dt);
			});

		}

		if (!lastTimestamp) {
			lastTimestamp = timestamp;
		}

		lastTimestamp = timestamp;

		// loop de loop
		window.requestAnimationFrame(step);
	};

	// Animate all the inputs!
	window.requestAnimationFrame(step);

};













////

var bub = new Main('.bubbleInput');


var gui = new dat.GUI({
	resizable: false,
	hideable: false });

gui.add(params, "gravity", 2, 20).step(1);
gui.add(params, "toggleShowWindVectors").name("Toggle wind vectors");
var f1 = gui.addFolder('Bubbles');
f1.add(params.bubble.size, "min", 10, 50).step(1).name('Size (min)');
f1.add(params.bubble.size, "max", 50, 400).step(1).name('Size (max)');
f1.add(params.bubble, "growthRate", 0.5, 10).step(0.5);
f1.add(params.bubble.delay, "min", 0, 1000).step(100).name('Delay (min)');
f1.add(params.bubble.delay, "max", 0, 10000).step(100).name('Delay (max)');
f1.add(params.bubble, "accelleration", -20, -0.1).step(0.1);
var f2 = gui.addFolder('Particles');
f2.add(params.particle, "initialForce", 1, 25).step(0.5);
f2.add(params.particle, "maxRadius", 1, 20).step(1);
var f3 = gui.addFolder('Characters');
f3.add(params.character.particles, "min", 1, 5000).step(1).name("Particles (min)");
f3.add(params.character.particles, "max", 1, 5000).step(1).name("Particles (max)");
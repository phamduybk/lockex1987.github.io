var w = window.innerWidth;
var h = window.innerHeight;

window.onresize = function() {
  w = ctx.canvas.width = window.innerWidth;
  h = ctx.canvas.height = window.innerHeight;
};

var canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.width = w;
canvas.height = h;

var ctx = canvas.getContext('2d');

mix_Red = 80;
mix_Green = 140;
mix_Blue = 220;
opacity = .15;
smoke_Size = 5;
select = { Compositing: 'lighter' };

var controls = new function() {
  this.mix_Red = mix_Red;
  this.mix_Green = mix_Green;
  this.mix_Blue = mix_Blue;
  this.opacity = opacity;
  this.smoke_Size = smoke_Size;

  this.redraw = function() {
    mix_Red = controls.mix_Red;
    mix_Green = controls.mix_Green;
    mix_Blue = controls.mix_Blue;
    opacity = controls.opacity;
    smoke_Size = controls.smoke_Size;
    ctx.globalCompositeOperation = Object.values(select)[0];
  }
}

var obj = { CLEAR_CANVAS: function() { ctx.clearRect(0, 0, w, h); } };

// http://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage
var gui = new dat.GUI({ resizable: false });
gui.add(controls, "mix_Red", 0, 255).step(1).onChange(controls.redraw);
gui.add(controls, "mix_Green", 0, 255).step(1).onChange(controls.redraw);
gui.add(controls, "mix_Blue", 0, 255).step(1).onChange(controls.redraw);
gui.add(controls, "opacity", 0, 1).onChange(controls.redraw);
gui.add(controls, "smoke_Size", 1, 20).onChange(controls.redraw);
gui.add(select, 'Compositing', {
  /*Source_Over: "source-over",
    Source_In: "source-in",
    Source_Out: "source-out",
    Source_Atop: "source-atop",
    Destination_Over: "destination-over",
    Destination_In: "destination-in",
    Destination_Out: "destination-out",
    Destination_Atop: "destination-atop",
    Copy: "copy",
    XOR: "xor",*/
  Screen: "screen",
  Overlay: "overlay",
  Color_Dodge: "color-dodge",
  Color_Burn: "color-burn",
  Hard_Light: "hard-light",
  Soft_Light: "soft-light",
  Difference: "difference",
  Exclusion: "exclusion",
  Hue: "hue",
  Saturation: "saturation",
  Color: "color",
  Luminosity: "luminosity",
  Ligher: 'lighter',
  Darker: 'darker',
  Multiply: 'multiply'
}).onChange(controls.redraw);
gui.add(obj, 'CLEAR_CANVAS');


ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, w, h);

ctx.globalCompositeOperation = 'lighter';

var randomNumbers = function randomNumbers(length) { return Array.from(new Array(length), function() { return Math.random(); }); };
var TAU = Math.PI * 2;

var createSmokeParticle = function createSmokeParticle() {

  var canvas = document.createElement('canvas');

  var w = 100;
  var h = 100;
  var cx = w * 0.5;
  var cy = h * 0.5;

  canvas.width = w;
  canvas.height = h;
  var ctx = canvas.getContext('2d');
  canvas.ctx = ctx;

  var xRand = -5 + Math.random() * 10;
  var yRand = -5 + Math.random() * 10;
  var xRand2 = 10 + Math.random() * (cx / 2);
  var yRand2 = 10 + Math.random() * (cy / 2);

  var color = {
    r: mix_Red,
    g: mix_Green,
    b: mix_Blue
    // r: Math.round(mix_Red + Math.random() * 100),
    // g: Math.round(mix_Green + Math.random() * 100),
    // b: Math.round(mix_Blue + Math.random() * 100)
  };


  ctx.fillStyle = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + opacity + ')';

  Array.
    from(new Array(200), function() { return randomNumbers(3); }).
    forEach(function(p, i, arr) {
      var length = arr.length;

      var x = Math.cos(TAU / xRand / length * i) * p[2] * xRand2 + cx;
      var y = Math.sin(TAU / yRand / length * i) * p[2] * yRand2 + cy;


      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x, y, p[2] * 4, 0, TAU);
      ctx.fill();
    });

  return canvas;
};

var Particle = function Particle() {
  var p = this;
  p.osc1 = {
    osc: 0,
    val: 0,
    freq: Math.random()
  };

  p.osc2 = {
    osc: 0,
    val: 0,
    freq: Math.random()
  };

  p.counter = 0;
  p.x = mousePos.x;
  p.y = mousePos.y;
  p.size = Math.random() * 100;
  p.growth = Math.random() / 20;
  p.life = Math.random();
  p.opacity = Math.random() / 5;
  p.speed = {
    x: Math.random(),
    y: Math.random()
  };

  p.texture = createSmokeParticle();
  p.rotationOsc = Math.round(Math.random()) ? 'osc1' : 'osc2';
};

var particles = [];

var update = function update() {

  particles.forEach(function(p, i) {

    p.x = mousePos.x;
    p.y = mousePos.y;
    p.size = Math.sqrt(Math.pow(p.x - p.ox, 2) + Math.pow(p.y - p.oy, 2)) * smoke_Size;
    p.counter += 0.01;
    p.growth = Math.sin(p.life);
    p.life -= 0.001;
    p.osc1.osc = Math.sin(p.osc1.val += p.osc1.freq);
    p.osc2.osc = Math.cos(p.osc2.val += p.osc2.freq);
    p.ox = p.x;
    p.oy = p.y;

  });
};

var render = function render() {
  particles.forEach(function(p) {
    ctx.save();

    ctx.globalAlpha = p.opacity / (p.size / 50);
    ctx.translate(p.x, p.y);
    ctx.rotate(Math.random() * TAU);
    ctx.drawImage(p.texture, 0 - p.size / 2, 0 - p.size / 2, p.size, p.size);

    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.fillStyle = 'rgba(' + (
      155 + Math.round(Math.random() * 100)) + ',' + (
        155 + Math.round(Math.random() * 100)) + ',' + (
        155 + Math.round(Math.random() * 100)) + ',' +
      Math.random() + ')';

    ctx.arc(Math.random() * p.size, Math.random() * p.size, Math.random(), 0, TAU);
    ctx.fill();

    ctx.restore();

  });

};

var loop = function loop() {
  update();
  render();
  window.requestAnimationFrame(loop);
};

var mousePos = {
  x: 0,
  y: 0
};


var drawingMode = false;

var activateDraw = function activateDraw(e) {
  drawingMode = true;
  particles = Array.from(new Array(10), function() { return new Particle(); });
  draw(e);
};

var disableDraw = function disableDraw(e) {
  drawingMode = false;
  particles = [];
};

var draw = function draw(e) {
  // console.log(drawingMode);
  if (!drawingMode) return;
  // console.log(e);
  particles.forEach(function(p) {
    //p.size = Math.max(10,e.movementX + e.movementY);
  });

};

canvas.addEventListener('mousedown', activateDraw);
canvas.addEventListener('mousemove', function(e) {
  mousePos.x = e.layerX;
  mousePos.y = e.layerY;
  draw(e);
});
canvas.addEventListener('mouseup', disableDraw);

//canvas.addEventListener('touchstart', e => activateDraw);
//canvas.addEventListener('touchmove', e => draw);
//canvas.addEventListener('touchend', e => disableDraw);

loop();
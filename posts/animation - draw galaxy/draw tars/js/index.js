const TAU = Math.PI * 2;

var w = window.innerWidth;
var h = window.innerHeight;
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

// Mảng các ngôi sao mới
var particles = [];

// Biến tạm để lưu vị trí của chuột
var mousePos = {
  x: 0,
  y: 0
};

// Khi giữ nhấn chuột thì sẽ là trạng thái vẽ
// Hiện có đang ở trong trạng thái vẽ không
var drawingMode = false;

/**
 * Sinh số ngẫu nhiên.
 * @param {*} length 
 */
function randomNumbers(length) {
  return Array.from(new Array(length), function() {
    return Math.random();
  });
}

/**
 * Ảnh của từng ngôi sao.
 */
function createSmokeParticle() {
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
    r: Math.round(150 + Math.random() * 100),
    g: Math.round(50 + Math.random() * 100),
    b: Math.round(50 + Math.random() * 100)
  };

  ctx.fillStyle = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ', .15)';

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
}

/**
 * Tạo một ngôi sao mới.
 */
function Particle() {
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
}

/**
 * Cập nhật trạng thái.
 */
function update() {
  particles.forEach(function(p, i) {
    p.x = mousePos.x;
    p.y = mousePos.y;
    p.size = Math.sqrt(Math.pow(p.x - p.ox, 2) + Math.pow(p.y - p.oy, 2)) * 5;
    p.counter += 0.01;
    p.growth = Math.sin(p.life);
    p.life -= 0.001;
    p.osc1.osc = Math.sin(p.osc1.val += p.osc1.freq);
    p.osc2.osc = Math.cos(p.osc2.val += p.osc2.freq);
    p.ox = p.x;
    p.oy = p.y;
  });
}

/**
 * Vẽ sao.
 */
function render() {
  particles.forEach(function(p) {
    ctx.save();

    ctx.globalAlpha = p.opacity / (p.size / 50);
    ctx.translate(p.x, p.y);
    ctx.rotate(Math.random() * TAU);
    ctx.drawImage(p.texture, 0 - p.size / 2, 0 - p.size / 2, p.size, p.size);
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.fillStyle = 'rgba(' +
      (155 + Math.round(Math.random() * 100)) + ',' +
      (155 + Math.round(Math.random() * 100)) + ',' +
      (155 + Math.round(Math.random() * 100)) + ',' +
      Math.random() + ')';

    ctx.arc(Math.random() * p.size, Math.random() * p.size, Math.random(), 0, TAU);
    ctx.fill();
    ctx.restore();
  });
}

/**
 * Vòng lặp chính.
 */
function loop() {
  update();
  render();
  window.requestAnimationFrame(loop);
}

/**
 * Khi giữ nhấn chuột thì sẽ là trạng thái vẽ.
 */
function activateDraw() {
  drawingMode = true;
  particles = Array.from(new Array(10), function() { return new Particle(); });
}

/**
 * Khi thả chuột thì sẽ không phải trạng thái vẽ.
 */
function disableDraw() {
  drawingMode = false;
  particles = [];
}

/**
 * Khởi tạo.
 */
function init() {
  document.body.appendChild(canvas);
  canvas.width = w;
  canvas.height = h;
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'lighter';

  canvas.addEventListener('mousedown', activateDraw);

  canvas.addEventListener('mousemove', function(e) {
    mousePos.x = e.layerX;
    mousePos.y = e.layerY;
  });

  canvas.addEventListener('mouseup', disableDraw);

  //canvas.addEventListener('touchstart', e => activateDraw);
  //canvas.addEventListener('touchmove', e => draw);
  //canvas.addEventListener('touchend', e => disableDraw);

  loop();
}

init();

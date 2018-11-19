var MyChar = (function() {

  var charStep = 16;

  function randomChar() {
    var charString = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲ0123456789+-*/$%&';
    var charArray = charString.split('');
    return charArray[Math.floor(Math.random() * charArray.length)];
  }

  function randX() {
    var numCoords = canvas.width / charStep;
    var idx = Math.floor(Math.random() * numCoords);
    return (idx * charStep) - 14;
  }

  class charObj {
    constructor() {
      this.char = randomChar();
      this.posX = randX();
      this.posY = charStep;
    }

    update() {
      this.char = randomChar();
      this.posY += charStep;
    }
  }

  return charObj;
})();
  

var Matrix = (function() {

  var chars = [];
  var maxChars = 100;

  function update() {
    for (var i = 0; i < chars.length; i++) {
      if (chars[i].posY > canvas.height) {
        chars.splice(i, 1);
      }
      chars[i].update();
    }
    if (chars.length < maxChars) {
      var delay = Math.ceil(Math.random() * 20);
      window.setTimeout(function() {
        var c = new MyChar();
        chars.push(c);
      }, delay);
    }
  }

  function drawChars(ctx) {
    for (var i = 0; i < chars.length; i++) {
      ctx.fillText(chars[i].char, chars[i].posX, chars[i].posY);
    }
  }

  return {
    update,
    drawChars
  }
})();

  
var Animator = (function() {
  var refreshRate = 1000 / 10;
  var canvas;
  var ctx;
  var delta;
  var now;
  var then = Date.now();

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //ctx.save();
    ctx.fillStyle = '#7cfc00';
    //ctx.shadowColor = 'white';
    //ctx.shadowBlur = 5;
    Matrix.drawChars(ctx);
    ctx.restore();

    Matrix.update();
  }

  function animate() {
    window.requestAnimationFrame(animate);
    now = Date.now();
    delta = now - then;
    if (delta > refreshRate) {
      then = now - (delta % refreshRate);
      draw();
    }
  }

  function testDrawAlpha() {
    ctx.fillStyle = '#7cfc00';
    ctx.fillText("Tý", 100, 100);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    for (var i = 0; i < 7; i++) {
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  function init() {
    canvas = document.getElementById('canvas');
    canvas.height = window.innerHeight - 20;
    canvas.width = window.innerWidth - 20;
    ctx = canvas.getContext('2d');
    ctx.font = '14px courier';
    ctx.imageSmoothingEnabled = false;
    
    animate();

    //testDrawAlpha();
  }

  return {
    init
  }
})();


window.onload = Animator.init;

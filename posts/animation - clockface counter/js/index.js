var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}console.clear();

var PI = Math.PI;var

Node = function () {
  function Node() {_classCallCheck(this, Node);
    this.set(0);
  }_createClass(Node, [{ key: 'set', value: function set(

    int) {
      this.pixels = Node.lib[int];
    } }], [{ key: 'lib', get: function get()

    {
      var nn = 0,ne = 1,ee = 2,
      se = 3,ss = 4,sw = 5,
      ww = 6,nw = 7;
      var lon = [nn, ss], // longitude vertical
      lat = [ww, ee], // latitude horizontal
      nnn = [nn, nn], // north north
      sss = [ss, ss], // south south
      www = [ww, ww], // west west
      eee = [ee, ee], // east east
      sec = [ee, ss], // southeast corner
      swc = [ww, ss], // southwest corner
      nwc = [ww, nn], // northwest corner
      nec = [ee, nn], // northeast corner
      xxx = [nn, nn, 1]; // empty
      return {
        0: [
        sec, lat, swc,
        lon, xxx, lon,
        lon, xxx, lon,
        lon, xxx, lon,
        nec, lat, nwc],

        1: [
        xxx, sss, xxx,
        xxx, lon, xxx,
        xxx, lon, xxx,
        xxx, lon, xxx,
        xxx, nnn, xxx],

        2: [
        eee, lat, swc,
        xxx, xxx, lon,
        sec, lat, nwc,
        lon, xxx, xxx,
        nec, lat, www],

        3: [
        eee, lat, swc,
        xxx, xxx, lon,
        xxx, lat, lon,
        xxx, xxx, lon,
        eee, lat, nwc],

        4: [
        sss, xxx, sss,
        lon, xxx, lon,
        nec, lat, lon,
        xxx, xxx, lon,
        xxx, xxx, nnn],

        5: [
        sec, lat, www,
        lon, xxx, xxx,
        nec, lat, swc,
        xxx, xxx, lon,
        eee, lat, nwc],

        6: [
        sec, lat, www,
        lon, xxx, xxx,
        lon, lat, swc,
        lon, xxx, lon,
        nec, lat, nwc],

        7: [
        eee, lat, swc,
        xxx, xxx, lon,
        xxx, xxx, lon,
        xxx, xxx, lon,
        xxx, xxx, nnn],

        8: [
        sec, lat, swc,
        lon, xxx, lon,
        lon, lat, lon,
        lon, xxx, lon,
        nec, lat, nwc],

        9: [
        sec, lat, swc,
        lon, xxx, lon,
        nec, lat, lon,
        xxx, xxx, lon,
        eee, lat, nwc] };


    } }]);return Node;}();var


Clock = function () {
  function Clock(count) {_classCallCheck(this, Clock);
    this.nodes = [];
    for (var i = 0; i < count; i++) {
      this.nodes.push(new Node());}
    this.cvs = document.querySelector('canvas');
    this.ctx = this.cvs.getContext('2d');
    this.pixelDi = 100;
    this.pixelRad = this.pixelDi * 0.5;
    this.nodeW = this.pixelDi * 3;
    this.cvs.width = this.nodeW * this.nodes.length;
    this.cvs.height = this.pixelDi * 5;
    this.setInitialPixels();
    this.tick = 0;
    this.ticks = 30;
  }_createClass(Clock, [{ key: 'setInitialPixels', value: function setInitialPixels()

    {
      this.pixels = [];
      for (var i = 0; i < this.nodes.length; i++) {
        this.pixels[i] = [];
        var nx = this.nodeW * i;
        var pxCount = Node.lib[0].length;
        for (var j = 0; j < pxCount; j++) {
          var x = nx + j % 3 * this.pixelDi,
          y = Math.floor(j / 3) * this.pixelDi;
          this.pixels[i].push([0, 0, 1]);
        }
      }
    } }, { key: 'display', value: function display(

    ints, callback) {var _this = this;
      if (this.tick <= this.ticks) {
        requestAnimationFrame(function () {return _this.display(ints, callback);});
        this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
        for (var i = 0; i < this.nodes.length; i++) {
          this.nodes[i].set(ints[i]);
          var pixels = this.nodes[i].pixels;
          var nx = this.nodeW * i;
          for (var j = 0; j < pixels.length; j++) {
            var x = nx + j % 3 * this.pixelDi,
            y = Math.floor(j / 3) * this.pixelDi;
            var coords = this.pixelCoords(x, y, pixels[j], this.pixels[i][j]);
            this.drawPixel(coords);
            // Update radIdx if complete
            if (this.tick === this.ticks)
            this.pixels[i][j] = pixels[j];
          }
        }
        this.tick++;
      } else {
        this.tick = 0;
        callback();
        return;
      }
    } }, { key: 'pixelCoords', value: function pixelCoords(

    x, y, px, pixel) {
      var rat = this.tick / this.ticks;
      var oldRad0 = Clock.radians[pixel[0]],
      oldRad1 = Clock.radians[pixel[1]];

      var rad0 = Clock.radians[px[0]],
      rad1 = Clock.radians[px[1]];
      rad0 = oldRad0 + (rad0 - oldRad0) * rat;
      rad1 = oldRad1 + (rad1 - oldRad1) * rat;
      var radius = this.pixelRad * 0.85;
      var cx = x + this.pixelRad,
      cy = y + this.pixelRad;
      var x1 = cx + radius * Math.cos(rad0),
      y1 = cy + radius * Math.sin(rad0),
      x2 = cx + radius * Math.cos(rad1),
      y2 = cy + radius * Math.sin(rad1),
      nonew = !!px[2],
      noold = !!pixel[2],
      lit = 1;
      if (nonew && noold) lit = 0.1;else
      if (noold) lit = rat * 0.9 + 0.1;else
      if (nonew) lit = (1 - rat) * 0.9 + 0.1;
      lit = 1 - lit;
      return { cx: cx, cy: cy, x1: x1, y1: y1, x2: x2, y2: y2, lit: lit };
    } }, { key: 'drawPixel', value: function drawPixel(_ref)

    {var cx = _ref.cx,cy = _ref.cy,x1 = _ref.x1,y1 = _ref.y1,x2 = _ref.x2,y2 = _ref.y2,lit = _ref.lit;
      this.ctx.lineWidth = 4;
      this.ctx.lineCap = 'round';
      this.ctx.strokeStyle = 'hsl(0,0%,90%)';
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, this.pixelRad * 0.9, 0, 2 * PI);
      this.ctx.stroke();

      this.ctx.strokeStyle = 'hsl(0,0%,' + lit * 100 + '%)';
      this.ctx.beginPath();
      this.ctx.moveTo(cx, cy);
      this.ctx.lineTo(x1, y1);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(cx, cy);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    } }], [{ key: 'degToRad', value: function degToRad(














    deg) {
      return deg * PI / 180;
    } }, { key: 'radians', get: function get() {return [Clock.degToRad(270), Clock.degToRad(315), Clock.degToRad(0), Clock.degToRad(45), Clock.degToRad(90), Clock.degToRad(135), Clock.degToRad(180), Clock.degToRad(225)];} }]);return Clock;}();


var count = 3;
var clock = new Clock(count);
var tick = 0;
run();
function run() {
  var ints = tick.toString().padStart(count, '0').split('').map(function (i) {return parseInt(i);});
  tick++;
  clock.display(ints, function () {
    setTimeout(run, 1000);
  });
}
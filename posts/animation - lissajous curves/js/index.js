var c = new GameCanvas();
createCanvas("FULLSCREEN");
c.canvas.style.position = "absolute";

var table = new Table(12, 12);
table.setScale(50);

loop();
function loop() {
  rectangle(0, 0, c.width, c.height, "rgb(25, 25, 25)");
 
  table.render(0, 0);
  
  requestAnimationFrame(loop);
}

function Table(width, height) {
  this.width = width;
  this.height = height;
  this.renderScale = 50;
  
  this.extraCanvas = document.createElement("canvas");
  this.extraCanvas.width = (width + 1) * this.renderScale;
  this.extraCanvas.height = (height + 1) * this.renderScale;
  this.extraCanvas.style.position = "absolute";
  
  document.body.appendChild(this.extraCanvas);
  
  this.extraContext = this.extraCanvas.getContext("2d");
  
  this.count = 0;
  
  this.setScale = function(scale) {
    this.renderScale = scale;
    this.extraCanvas.width = (width + 1) * this.renderScale;
    this.extraCanvas.height = (height + 1) * this.renderScale;
  }
  
  this.render = function(offsetX, offsetY) {
    this.extraCanvas.style.left = offsetX + "px";
    this.extraCanvas.style.top = offsetY + "px";
    
    for (var i = 0; i < this.width; i++) {
      var x = offsetX + this.renderScale * 1.5 + i * this.renderScale;
      var y = offsetY + this.renderScale / 2;
      var x2 = x + Math.cos(this.count * Math.PI / 180 * (i + 1)) * this.renderScale * 0.4;
      var y2 = y + Math.sin(this.count * Math.PI / 180 * (i + 1)) * this.renderScale * 0.4;
      
      circle(x, y, this.renderScale * 0.4, "lightgray");
      circle(x2, y2, this.renderScale / 10, "red");
      
      line(x2, y2, x2, offsetY + (this.height + 1) * this.renderScale, 1, "white");
    }
    for (var i = 0; i < this.height; i++) {
      var y = offsetY + this.renderScale * 1.5 + i * this.renderScale;
      var x = offsetX + this.renderScale / 2;
      var x2 = x + Math.cos(this.count * Math.PI / 180 * (i + 1)) * this.renderScale * 0.4;
      var y2 = y + Math.sin(this.count * Math.PI / 180 * (i + 1)) * this.renderScale * 0.4;
      
      circle(x, y, this.renderScale * 0.4, "lightgray");
      circle(x2, y2, this.renderScale / 10, "red");
      
      line(x2, y2, offsetX + (this.width + 1) * this.renderScale, y2, 1, "white");
    }
    
    for (var i = 0; i < this.width; i++) {
      for (var j = 0; j < this.height; j++) {
        var x = this.renderScale + i * this.renderScale + this.renderScale / 2 + Math.cos((this.count * Math.PI / 180) * (i + 1)) * (this.renderScale * 0.4);
        var y = this.renderScale + j * this.renderScale + this.renderScale / 2 + Math.sin((this.count * Math.PI / 180) * (j + 1)) * (this.renderScale * 0.4);
        circle(offsetX + x, offsetY + y, this.renderScale / 10, "white");
        
        this.extraContext.beginPath();
        this.extraContext.fillStyle = "white";
        this.extraContext.fillRect(x, y, this.renderScale / 60, this.renderScale / 60);
        this.extraContext.closePath();
      }
    }
    
    this.count += 0.4;
  }
}
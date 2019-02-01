// Người chơi
var player

/**
 * Hàm của p5.js.
 */
function preload() {
}

/**
 * Hàm của p5.js.
 */
function setup() {
  rectMode(CENTER)
  createCanvas(document.body.clientWidth, document.body.clientHeight)
  player = new Player(width / 2, height / 2)
}

/**
 * Hàm của p5.js.
 */
function draw() {
  background(0)

  player.widthGun()
}

/**
 * Lớp Player.
 */
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.rotate = 0;
  }

  /**
   * Xoay.
   */
  turn_around() {
    let v = createVector(mouseX - this.x, mouseY - this.y);
    this.rotate = v.heading();
  }

  /**
   * Di chuyển.
   */
  move() {
    if (keyIsDown(87)) {
      this.y -= this.speed;
    }
    if (keyIsDown(83)) {
      this.y += this.speed;
    }
    if (keyIsDown(65)) {
      this.x -= this.speed;
    }
    if (keyIsDown(68)) {
      this.x += this.speed;
    }
  }

  widthGun() {
    this.turn_around()
    this.move();

    push();
    translate(this.x, this.y);
    rotate(this.rotate);

    // Gun
    noStroke();
    fill('#455A64');
    rect(30, 0, 60, 8)
    beginShape();
    vertex(60, 4);
    quadraticVertex(70, 0, 60, -4);
    endShape(CLOSE);

    // Body
    stroke('#a5a576');
    strokeWeight(5);
    fill('#d5d589');
    ellipse(0, 0, 40);

    // Hand
    stroke('#F44336');
    strokeWeight(2);
    fill('#E91E63');
    ellipse(22, 2, 10);
    ellipse(45, 6, 10);

    pop();
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(0);

    // body
    stroke('#a5a576');
    strokeWeight(5);
    fill('#d5d589');
    ellipse(0, 0, 40);

    // hand
    stroke('#F44336');
    strokeWeight(2);
    fill('#E91E63');
    ellipse(15, 15, 15);
    ellipse(15, -15, 15);
    pop();
  }
}
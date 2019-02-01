var zombie1, zombie2;
var player;

function preload() {
}

function setup() {
  // angleMode(DEGREES);
  rectMode(CENTER);
  createCanvas(document.body.clientWidth, document.body.clientHeight)
  player = new Player(width / 2, height / 2);
  zombie1 = new Zombie(width / 2 - 200, height / 2);
  zombie2 = new Zombie(width / 2 + 200, height / 2);
}

function draw() {
  background(0);
  player.widthGun();
  zombie1.draw();
  zombie2.draw();
}

class Zombie {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rotate = 0;
    this.pos = createVector(0, 0);
    this.speed = 1;
  }

  move() {
    let v = createVector(player.x - this.x, player.y - this.y);
    let sub = v.sub(this.pos);
    sub.setMag(this.speed);

    if(sub.mag() < 10) this.pos = createVector(0, 0)

    this.pos = sub;
    this.rotate = this.pos.heading();
    this.x += this.pos.x;
    this.y += this.pos.y;
  }

  draw() {
    if(player)
      this.move();

    push();
    noStroke();
    translate(this.x, this.y);
    scale(0.8, 0.8);
    rotate(this.rotate);
    // body
    fill('#2196F3');
    rect(0, 0, 40, 40);
    fill('#d5d589');
    rect(0, 0, 25, 25);
    fill('black');
    rect(-5, 0, 15, 15);
    //hand
    fill('#2196F3');
    rect(5, 25, 30, 10);
    fill('#d5d589');
    rect(20, 25, 10, 10);
    fill('#2196F3');
    rect(5, -25, 30, 10);
    fill('#d5d589');
    rect(20, -25, 10, 10);
    pop();
  }
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.rotate = 0;
  }

  turn_around() {
    let v = createVector(mouseX - this.x, mouseY - this.y);
    this.rotate = v.heading();
  }

  move() {
    if(keyIsDown(87)) {
      this.y -= this.speed;
    }
    if(keyIsDown(83)) {
      this.y += this.speed;
    }
    if(keyIsDown(65)) {
      this.x -= this.speed;
    }
    if(keyIsDown(68)) {
      this.x += this.speed;
    }
  }

  widthGun() {
    this.turn_around()
    this.move();

    push();
    translate(this.x, this.y);
    rotate(this.rotate);

    //gun
    noStroke();
    fill('#455A64');
    rect(30, 0, 60, 8)
    beginShape();
    vertex(60, 4);
    quadraticVertex(70, 0, 60, -4);
    endShape(CLOSE);

    // body
    stroke('#a5a576');
    strokeWeight(5);
    fill('#d5d589');
    ellipse(0, 0, 40);

    //hand
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

    //hand
    stroke('#F44336');
    strokeWeight(2);
    fill('#E91E63');
    ellipse(15, 15, 15);
    ellipse(15, -15, 15);
    pop();
  }
}
const canv = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
//canv.width = window.innerWidth;
//canv.height = window.innerHeight;

const colors = [
  {
    hue: 47,
    sat: 100,
    light: 43
  },
  {
    hue: 11,
    sat: 83,
    light: 38
  },
  {
    hue: 36,
    sat: 83,
    light: 38
  },
  {
    hue: 341,
    sat: 83,
    light: 38
  }
];

const drawTrees = (startX, startY, len, angle) => {
  ctx.beginPath();
  ctx.save();
  
  ctx.translate(startX, startY * 0.99);
  ctx.rotate(angle * Math.PI/180);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len);
  ctx.lineWidth = Math.ceil(len * 0.025);
  ctx.strokeStyle  = `hsl(27, 81%, ${20 - len * 0.15}%)`;
  ctx.stroke();
  
  if (len < 10) {
    drawLeaves(startX * 0.5, startY * 0.8, 1.5);
    ctx.restore();
    return;
  }
  let randLen = () => Math.random() * ((len - 10) + 10);
  drawTrees(0, -len, randLen() * 0.8, -25);
  drawTrees(0, -len, randLen() * 0.925, -15);
  drawTrees(0, -len, randLen() * 0.925, 10);
  drawTrees(0, -len, randLen() * 0.8, 25);
  
  ctx.restore();
}

const drawLeaves = (posX, posY, size) => {
  let leafColor = Math.floor(Math.random() * colors.length);
  ctx.beginPath();
  ctx.save();
  ctx.arc(posX, posY, size, 0, 2 * Math.PI);
  ctx.fillStyle = `hsla(${colors[leafColor].hue}, ${colors[leafColor].sat}%, ${colors[leafColor].light}%, 100%)`;
  ctx.shadowColor = `hsla(${colors[leafColor].hue}, ${colors[leafColor].sat}%, ${colors[leafColor].light - 20}%, 100%)`;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;
  ctx.shadowBlur = 1;
  ctx.fill();
  ctx.restore();
}

resizeChecks = event => {
  canv.width = window.innerWidth;
  canv.height = window.innerHeight;
  treeCount = Math.floor(canv.width / 150);
  // Time
  for (let i = 0; i < treeCount; i++) {
    // Memory
    drawTrees(Math.random() * (canv.width - 100) + 100, canv.height * 1.3, Math.floor(canv.height * 0.3), 0);
  }
}

resizeChecks();

window.addEventListener('resize', resizeChecks);

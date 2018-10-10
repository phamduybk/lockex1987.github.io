const front = document.getElementById("front"),
      canv = document.getElementById("canvas"),
      ctx = canv.getContext("2d"),
      img = new Image(),
      imgMask = new Image();

img.src = "https://res.cloudinary.com/dkcygpizo/image/upload/v1505176020/codepen/photo1.png";
//imgMask.src = "http://res.cloudinary.com/dkcygpizo/image/upload/v1505176018/codepen/watercolor-effect-2.png";
imgMask.src = "https://res.cloudinary.com/dkcygpizo/image/upload/v1505176017/codepen/cloud-texture.png";

let i = 0;

function draw() {
  i += 10;
  
  let maskX = (canv.width - (70 + i)) / 2,
      maskY = (canv.height - (40 + i)) / 2;
  
  ctx.clearRect(0, 0, canv.width, canv.height);
  ctx.globalCompositeOperation = "source-over";
  
  ctx.drawImage(imgMask, maskX, maskY, 70 + i, 40 + i);
  
  ctx.globalCompositeOperation = "source-in";
  ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
  
  window.requestAnimationFrame(draw);
}

img.onload = function() {
  canv.width = img.naturalWidth;
  canv.height = img.naturalHeight;
}

front.onclick = function() {
  front.style.display = "none";
  canv.style.display = "block";
  
  draw();
}

canv.onclick = function() {
  i = 0;
  draw();
}
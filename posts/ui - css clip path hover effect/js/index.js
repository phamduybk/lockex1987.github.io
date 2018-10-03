let textMask = document.querySelector(".mask");
let container = document.querySelector(".container");

container.addEventListener("mousemove", e => {
  //   console.log(e.offsetX, e.offsetY, container.clientWidth);
  let containerWidth = container.clientWidth;
  let containerHeigth = container.clientHeight;
  let oX = Math.floor((e.offsetX / containerWidth) * 100) + "%";
  let oY = Math.floor((e.offsetY / containerHeigth) * 100) + "%";

  console.log(oX, oY);
  textMask.style.webkitClipPath = `polygon(0 ${oX}, 100% ${oY}, 100% 100%, 0 100%)`;
});
container.addEventListener("mouseout", e => {
  //   console.log(e.offsetX, e.offsetY, container.clientWidth);

  textMask.style.webkitClipPath = `polygon(0 0, 100% 0, 100% 100%, 0 100%)`;
});
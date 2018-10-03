var stage = document.querySelector('.stage'),
buttonPrev = document.querySelector('.button_prev'),
buttonNext = document.querySelector('.button_next');

var rotation = 0;
var deg = 90;

buttonPrev.addEventListener('click', function () {
  stage.style.transform = 'rotateZ(' + (
  rotation === 0 ? rotation = deg : rotation += deg) + 'deg)';

});

buttonNext.addEventListener('click', function () {
  stage.style.transform = 'rotateZ(' + (
  rotation === 0 ? rotation = -deg : rotation -= deg) + 'deg)';

});
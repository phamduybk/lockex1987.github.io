'use strict';

var toggle = document.querySelector('.js-toggle'),
    image = document.querySelector('.js-image'),
    heading = document.querySelector('.js-heading'),
    paragraph = document.querySelector('.js-paragraph');

var content = false;

toggle.addEventListener('click', function () {
  if (content === false) {
    content = true;
    image.src = 'http://unsplash.it/400/400?image=564';
    heading.innerHTML = 'Some heading';
    paragraph.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa rerum porro aut laboriosam animi.';
  } else {
    content = false;
    image.src = '';
    heading.innerHTML = '';
    paragraph.innerHTML = '';
  }
});
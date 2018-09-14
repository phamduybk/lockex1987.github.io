 /*
              
              Full-Page View:
              
              https://codepen.io/GeorgePark/full/MqVoYP/
              
              ⁣⛅ ☁ ☁  ☁  🚁   ✈
              🏢🏤_🏬_ / |_\🏫🏢🌳🌳
              _____🚋_🚗__🚕______
              🏡⁣🏥🏦  /   |🚖\ 🏠🌳🏡
              🏡🏡🏪 /    | 🚘\ 🏪🏨
              💒 🏨 /     |    \ 🏡🏩
              
              */

document.addEventListener("DOMContentLoaded", function () {

    var wrapper = document.querySelector('.wrapper'),
    rotateSlider = document.querySelector('.rotate-slider');

    rotateSlider.addEventListener('input', function () {return wrapper.style.setProperty('--rotate-y', '-' + rotateSlider.value + 'deg');});

    //Detect Chrome on Apple Device
    if (navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) && window.navigator.vendor.match(/Google/i)) wrapper.classList.add('apple-chrome');

});
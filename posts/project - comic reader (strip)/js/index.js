// Mảng các ảnh
var images;

// Index của ảnh hiện tại
var currentIndex = 0;

function getImages() {
    fetch('data/oldmasterq.json')
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            images = data
            showCurrentImage();
        });
}

function showCurrentImage() {
    var img = images[currentIndex];
    document.querySelector('#imageTitle').innerHTML = '#' + (currentIndex + 1) + ' ' + img.name;
    document.querySelector('#mainImage').src = 'https://www.oldmasterq.com' + img.url;
}

function gotoPrevImage() {
    if (currentIndex > 0) {
        currentIndex--;
        showCurrentImage();
    }
}

function gotoNextImage() {
    if (currentIndex + 1 < images.length) {
        currentIndex++;
        showCurrentImage();
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gotoRandomImage() {
    currentIndex = getRandomInt(0, images.length - 1);
    showCurrentImage();
}

function gotoNumber() {
    currentIndex = parseInt(document.querySelector('#inputNumber').value) - 1;
    showCurrentImage();
}

getImages();
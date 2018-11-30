// Đối tượng DOM canvas để vẽ
var snowCanvas;

// Đối tượng SnowWorker
var snowWorker;

function createCanvas() {
    snowCanvas = document.createElement('canvas');
    snowCanvas.style.position = 'fixed';
    snowCanvas.style.top = '0';
    snowCanvas.style.left = '0';
    snowCanvas.style['pointer-events'] = 'none';
    document.body.appendChild(snowCanvas);
}

function setCanvasSize() {
    snowCanvas.width = document.body.clientWidth;
    snowCanvas.height = document.body.clientHeight;
}

function screenMap() {
    let rooftops = document.querySelectorAll('.rooftop');
    let platforms = [];
    rooftops.forEach((rooftopEl) => {
        let bounds = rooftopEl.getClientRects();
        platforms.push({
            left: bounds[0].left,
            width: bounds[0].width,
            top: bounds[0].top
        });
    });

    snowWorker.setPlatforms(platforms);
}
    
function init() {
    createCanvas();
    setCanvasSize();

    snowWorker = new SnowWorker(snowCanvas);

    window.addEventListener('resize', screenMap);
    window.addEventListener('resize', setCanvasSize);
    window.addEventListener('DOMContentLoaded', screenMap);
}

init();
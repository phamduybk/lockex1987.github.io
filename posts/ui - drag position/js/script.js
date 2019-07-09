/**
 * Lấy tọa độ của chuột.
 * @param {Event} evt 
 */
function getMouseCoordinates(evt) {
    return {
        x: evt.pageX,
        y: evt.pageY
    };
}

/**
 * Drag để thay đổi vị trí.
 */
function dragPosition() {

    // Đánh dấu có đang drag hay không
    var dragLock = false;

    // Phần tử DOM
    var element = null;

    // Vị trí tương đối của chuột so với phần tử đang được drag
    var relativeX;
    var relativeY;

    document.addEventListener('mousedown', (evt) => {
        var target = evt.target;
        if (target.classList && target.classList.contains('drag-position')) {
            element = target;

            var { x, y } = getMouseCoordinates(evt);
            relativeX = x - element.offsetLeft;
            relativeY = y - element.offsetTop;

            // Đánh dấu drag
            dragLock = true;
        }
    });

    document.addEventListener('mousemove', (evt) => {
        // Nếu là đang drag thì thay đổi vị trí của phần tử
        if (dragLock) {
            // Không để phần tử ra ngoài vùng hiển thị của trang web
            var maxLeft = document.documentElement.clientWidth - element.offsetWidth;
            var maxTop = document.documentElement.clientHeight - element.offsetHeight;

            var { x, y } = getMouseCoordinates(evt);
            element.style.left = Math.max(Math.min(x - relativeX, maxLeft), 0) + 'px';
            element.style.top = Math.max(Math.min(y - relativeY, maxTop), 0) + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        // Bỏ đánh dấu drag
        dragLock = false;
    });
}

dragPosition();

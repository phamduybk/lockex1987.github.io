/**
 * Resize two HTML elements with a draggable element.
 */
function initDraggable() {
    // Các thành phần
    var left = document.getElementById('drag-left');
    var right = document.getElementById('drag-right');
    var bar = document.getElementById('dragbar');

    // Hàm kiểm tra khi di chuyển chuột
    const drag = (e) => {
        // Không bôi đen (chọn) text
        document.selection ? document.selection.empty() : window.getSelection().removeAllRanges();

        // Thiết lập lại chiều rộng của vùng bên trái
        // Vùng bên phải sẽ tự fill phần còn lại do có flex bằng 1
        left.style.width = (e.pageX - bar.offsetWidth / 2) + 'px';
    }

    // Khi nhấn chuột vào bar thì bắt đầu kiểm tra
    bar.addEventListener('mousedown', () => {
        document.addEventListener('mousemove', drag);
    });

    // Khi thả chuột khỏi bar thì dừng kiểm tra
    bar.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', drag);
    });
}

initDraggable();

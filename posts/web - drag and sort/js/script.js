/**
 * Khởi tạo sự kiện drag and drop.
 * http://farhadi.ir/projects/html5sortable/
 * https://sortablejs.github.io/Sortable/
 */
function initDragAndSort(elements, callbackFunction) {

    var draggingCssClass = 'drag-sort-active';

    var hasChange = false;

    var handleDrag = function (evt) {
        var selectedItem = evt.target;
        selectedItem.classList.add(draggingCssClass);

        var x = evt.clientX;
        var y = evt.clientY;
        var swapItem = document.elementFromPoint(x, y);

        if (swapItem
                && swapItem.parentNode === selectedItem.parentNode
                && swapItem != selectedItem) {
            selectedItem.parentNode.insertBefore(selectedItem, selectedItem == swapItem.nextSibling ? swapItem : swapItem.nextSibling);
            hasChange = true;
        }
    };

    var handleDrop = function (evt) {
        var selectedItem = evt.target;
        selectedItem.classList.remove(draggingCssClass);

        if (hasChange) {
            hasChange = false;
            callbackFunction(selectedItem);
        }
    };

    elements.forEach(item => {
        item.setAttribute('draggable', true);
        item.ondrag = handleDrag;
        item.ondragend = handleDrop;
    });
}

initDragAndSort(document.querySelectorAll('.drag-sort-enable li'), function () {
    console.log('Dropped');
});

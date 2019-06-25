document.getElementById('box').addEventListener('dragstart', dragStart);

function dragStart(e) {
    //e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.setData('text', e.target.id);
}

document.querySelectorAll('.w').forEach(function (w) {
	w.addEventListener('dragenter', dragEnter);
    w.addEventListener('dragleave', dragLeave);
    w.addEventListener('dragover', dragOver);
    w.addEventListener('dragend', dragEnd);

    w.addEventListener('drop', drop);
});

function dragEnter(e) {
    e.preventDefault();

    this.style = 'border: 2px dashed red';
}

function dragEnd(e) {
    this.style = '';
}

function dragLeave(e) {
    this.style = '';
}

function dragOver(e) {
    e.preventDefault();
    //e.dataTransfer.dropEffect = 'move';
}

function drop(e) {
    e.preventDefault();
    var id = e.dataTransfer.getData('text');
    var dom = document.getElementById(id);
    this.appendChild(dom);
}
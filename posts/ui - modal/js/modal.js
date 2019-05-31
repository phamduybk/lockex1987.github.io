function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
}

window.addEventListener('click', function(event) {
    var tag = event.target;

    // When the user clicks anywhere outside of the modal, close it
    /*
    if (tag == modal) {
        modal.style.display = "none";
    }
    */

    // When the user clicks on <span> (x), close the modal
    var modalId = tag.getAttribute('data-dismiss-modal');
    if (modalId) {
        closeModal(modalId);
    }
});
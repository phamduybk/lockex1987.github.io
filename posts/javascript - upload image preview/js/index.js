function showImagePreview(fileInput) {

    // Cách 1: Sử dụng FileReader
    var cach1 = function(file, img) {
        var reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    };

    // Cách 2: Sử dụng ObjectURL
    var cach2 = function(file, img) {
        img.src = URL.createObjectURL(file);
    };

    if (fileInput.files && fileInput.files[0]) {
        var file = fileInput.files[0];
        var img = document.querySelector('.profile-pic');
        cach1(file, img);
        //cach2(file, img);
    }
}

function init() {
    document.querySelector('.file-upload').addEventListener('change', function() {
        showImagePreview(this);
    });

    document.querySelector('.upload-button').addEventListener('click', function() {
        document.querySelector('.file-upload').click();
    });
}

init();

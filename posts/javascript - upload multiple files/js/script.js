(function () {

    var fileList = [];
    var selectedFiles = document.querySelector('#selectedFiles');

    function handleSubmitForm() {
        document.querySelector('#frm').addEventListener('submit', (evt) => {
            evt.preventDefault();
    
            var formData = new FormData();
            formData.append('name', 'Huyên test');
            fileList.forEach((f) => {
                formData.append('fileList[]', f);
            });
    
            var request = new XMLHttpRequest();
            request.addEventListener('load', function () {
                if (200 <= request.status && request.status < 300) {
                    console.log('Completed');
                    fileList = [];
                    selectedFiles.innerHTML = '';
                }
            });
            request.upload.addEventListener('progress', function (evt) {
                if (evt.lengthComputable) {
                    var percent = evt.loaded * 100 / evt.total;
                    console.log('Percent: ' + percent);
                }
            });
            request.open('POST', 'https://jsonplaceholder.typicode.com/photos'); 
            //request.setRequestHeader('Content-Type', 'multipart/form-data');
            //request.setRequestHeader('X-CSRF-TOKEN', getCsrfToken());
            request.send(formData);
        });
    }

    function handleAddFiles() {
        document.querySelector('#uploadFiles').addEventListener('change', (evt) => {
            var fileInput = evt.target;
            var files = fileInput.files;
    
            for (var i = 0; i < files.length; i++) {
                var f = files[i];
                fileList.push(f);
    
                var div = document.createElement('div');
                div.className = 'd-flex justify-content-between mb-1';
                div.innerHTML = `
                        <span>
                            ${f.name}
                        </span>
                        <span class="cursor-pointer text-danger font-weight-bold delete-attachment-icon" title="Xóa" style="margin: 0 10px; cursor: pointer">
                            &times;
                        </span>`;
                selectedFiles.appendChild(div);
            }
        });
    }

    function handleRemoveFile() {
        document.addEventListener('click', (evt) => {
            var target = evt.target;
            if (target.classList && target.classList.contains('delete-attachment-icon')) {
                var div = target.parentNode;
                var idx = 0;
                var prev = div;
                while ( (prev = prev.previousSibling) != null ) {
                    idx++;
                }
                fileList.splice(idx, 1);
    
                div.parentNode.removeChild(div);
            }
        });
    }

    handleSubmitForm();
    handleAddFiles();
    handleRemoveFile();
})();
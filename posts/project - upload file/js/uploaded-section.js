(function() {

    /**
     * Lấy danh sách file.
     */
    function getUploadedFiles() {
        fetch('server/list_files.php')
            .then(response => response.json())
            .then(data => {
                bindUploadedFiles(data);
            });
    }

    /**
     * Hiển thị danh sách file.
     * @param {Array} files 
     */
    function bindUploadedFiles(files) {
        var uploadedList = document.querySelector('#uploadedList');
        if (files.length == 0) {
            uploadedList.innerHTML = '<p class="text-danger">Không có file nào</p>';
        } else {
            var tableBodyHtml =
                    `${files.map((f, idx) => `
                        <tr>
                            <td>${idx + 1}</td>
                            <td>
                                <a href="uploads/${f.name}">
                                    ${f.name}
                                </a>
                            </td>
                            <td class="text-right">${f.size}</td>
                        </tr>
                    `).join('')}
                    `;
            uploadedList.innerHTML = `
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên</th>
                                <th class="text-right">Dung lượng</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableBodyHtml}
                        </tbody>
                    </table>`;
        }
    }
    
    /**
     * Lắng nghe sự kiện đã upload xong file.
     */
    function uploadFinishHandler() {
        // Lấy lại danh sách
        getUploadedFiles();
    }

    function init() {
        getUploadedFiles();
        // Thêm subscriber uploadFinish
        PubSub.subscribe('uploadFinish', uploadFinishHandler);
    }

    init();
})();
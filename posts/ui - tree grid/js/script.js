/**
 * Hiển thị bảng dữ liệu.
 */
function bindTableRows(data) {
    /**
     * Sắp xếp lại dữ liệu theo level và tên.
     */
    function sortTreeData() {
        data.sort((a, b) => {
            if (a.level != b.level) {
                return a.level - b.level;
            }

            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    }

    /**
     * Xử lý đệ quy để sinh mã HTML của bảng.
     * @param {Integer} parentId ID đơn vị cha
     */
    function traverseTreeToBuildHtmlCode(parentId) {
        var html = '';
        data.forEach(e => {
            if (e.parentId == parentId) {
                html += buildHtmlCodeOfRow(e);
                html += traverseTreeToBuildHtmlCode(e.id);
            }
        });
        return html;
    }

    /**
     * Sinh ra mã HTML của một dòng.
     * @param {Object} e Một đối tượng dữ liệu
     */
    function buildHtmlCodeOfRow(e) {
        return `
                <tr class="treegrid__row" data-id="${e.id}" data-parent="${e.parentId}" data-level="${e.level}">
                    <td data-column="name">${e.name}</td>
                    <td>Additional info</td>
                </tr>`;
    }

    /**
     * Sinh mã HTML của bảng dữ liệu.
     */
    function buildHtmlCodeOfTable() {
        var minLevel = Math.min(...data.map(e => e.level));
        var html = '';
        data.forEach(e => {
            if (e.level == minLevel) {
                html += buildHtmlCodeOfRow(e);
                html += traverseTreeToBuildHtmlCode(e.id);
            }
        });
        return html;
    }

    sortTreeData();
    document.querySelector('#tree-table tbody').innerHTML = buildHtmlCodeOfTable();
}

// Danh sách dữ liệu ban đầu có thể sắp xếp theo danh sách bắt kỳ
bindTableRows([
    { id: 2, parentId: 1, level: 2, name: "Châu Âu" },
    { id: 7, parentId: 6, level: 5, name: "Văn Giang" },
    { id: 3, parentId: 1, level: 2, name: "Châu Á" },
    { id: 8, parentId: 2, level: 3, name: "Italia" },
    { id: 1, parentId: 0, level: 1, name: "Thế giới" },
    { id: 6, parentId: 5, level: 4, name: "Hưng Yên" },
    { id: 5, parentId: 3, level: 3, name: "Việt Nam" },
    { id: 4, parentId: 3, level: 3, name: "Nhật Bản" },
]);

initTreeGrid(document.querySelector('#tree-table'));

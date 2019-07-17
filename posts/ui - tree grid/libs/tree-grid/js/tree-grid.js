function initTreeGrid(table) {

    /**
     * Thêm căn trái và nút mở/đóng các nút con.
     */
    function bindIndentAndExpander() {
        var rows = table.querySelectorAll('tbody tr.treegrid__row');

        // Lấy level nhỏ nhất
        var minLevel = 1000;
        rows.forEach(row => {
            var level = row.dataset.level;
            if (level < minLevel) {
                minLevel = level;
            }
        });

        rows.forEach(row => {
            var id = row.dataset.id;
            var level = row.dataset.level;
            var columnNameCell = row.querySelector('td[data-column="name"]');
            var children = table.querySelectorAll('tr[data-parent="' + id + '"]');
    
            if (children.length) {
                var expander = document.createElement('span');
                expander.className = 'treegrid__expander treegrid__expander--expanded';
                expander.dataset.id = id;
                columnNameCell.insertBefore(expander, columnNameCell.firstChild);
            }
    
            var indent = document.createElement('span');
            indent.className = 'treegrid__indent';
            indent.style.width = (26 + 25 * (level - minLevel)) + 'px';
            columnNameCell.insertBefore(indent, columnNameCell.firstChild);
        });
    }

    /**
     * Xử lý khi click vào nút mở/đóng.
     */
    function handleToggleEvent() {
        table.addEventListener('click', (evt) => {
            var target = evt.target;
            if (target.classList.contains('treegrid__expander')) {
                var expander = target;
                if (expander.classList.contains('treegrid__expander--collapsed')) {
                    showDirectChildren(expander);
                } else {
                    var id = expander.dataset.id;
                    var row = table.querySelector('tr[data-id="' + id + '"]');
                    recursiveHideAllChildren(row);
                }
            }
        });
    }

    /**
     * Hiển thị các nút con trực tiếp.
     * @param {DOMNode} expander Nút mở/đóng
     */
    function showDirectChildren(expander) {
        expander.classList.add('treegrid__expander--expanded');
        expander.classList.remove('treegrid__expander--collapsed');

        var id = expander.dataset.id;
        var children = table.querySelectorAll('tr[data-parent="' + id + '"]');
        children.forEach(child => {
            child.style.display = '';
        });
    }

    /**
     * Xử lý đệ quy, ẩn tất cả các nút con của một nút.
     * @param {DOMNode} row Dòng dữ liệu
     */
    function recursiveHideAllChildren(row) {
        var id = row.dataset.id;
        var children = table.querySelectorAll('tr[data-parent="' + id + '"]');

        if (children.length) {
            children.forEach(child => {
                recursiveHideAllChildren(table, child);
                child.style.display = 'none';
            });

            var expander = row.querySelector('.treegrid__expander');
            expander.classList.add('treegrid__expander--collapsed');
            expander.classList.remove('treegrid__expander--expanded');
        }
    }

    bindIndentAndExpander();
    handleToggleEvent();
}

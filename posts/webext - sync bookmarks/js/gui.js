class Gui {

    /**
     * Duyệt cây bookmark, hiển thị folder và node.
     */
    showBookmarks(bookmarkTreeNodes, sourceLabel) {
        document.querySelector('#sourceLabel').textContent = sourceLabel;
        var bookmarksDiv = document.querySelector('#bookmarks');

        if (bookmarkTreeNodes.length > 0) {
            bookmarksDiv.innerHTML = '';
            bookmarksDiv.appendChild(this.traverseChildren(bookmarkTreeNodes[0].children, 1));
        } else {
            bookmarksDiv.innerHTML = '<span class="text-danger">EMPTY</span>';
        }
    }

    /**
     * Duyệt danh sách các nút gốc, trả về đối tượng DOM gốc.
     * @param bookmarkNodes Danh sách bookmark
     */
    traverseChildren(bookmarkNodes, level) {
        var list = document.createElement('ul');
        bookmarkNodes.forEach(b => {
            var li = this.traverseNode(b, level);
            if (li) {
                list.appendChild(li);
            }
        });
        return list;
    }

    /**
     * Duyệt 1 nút bất kỳ. Hàm này sẽ được gọi đệ quy.
     * @param bookmarkNode Một nút bookmark
     */
    traverseNode(bookmarkNode, level) {
        // Chỉ hiện khi thư mục không rỗng
        if (!bookmarkNode.url && (!bookmarkNode.children || bookmarkNode.children.length == 0)) {
            return null;
        }

        // Bỏ qua thư mục Work
        if (!bookmarkNode.url && bookmarkNode.title == 'Work') {
            return null;
        }

        // Bỏ qua các bookmark lẻ không có trong thư mục nào
        if (bookmarkNode.url && level == 2 && (!bookmarkNode.children || bookmarkNode.children.length == 0)) {
            return null;
        }

        var anchor;
        if (bookmarkNode.url) {
            // Nếu là 1 link
            anchor = document.createElement('a');
            anchor.href = bookmarkNode.url;
            anchor.target = '_blank';
        } else {
            // Nếu là thư mục
            anchor = document.createElement('span');
        }
        anchor.textContent = bookmarkNode.title;

        var li = document.createElement('li');
        if (bookmarkNode.url) {
            var url = new URL(bookmarkNode.url);
            var hostname = url.hostname;
            if (hostname) {
                if (hostname.startsWith('www.')) {
                    hostname = hostname.substring(4);
                }
                var hostnameSpan = document.createElement('span');
                hostnameSpan.className = 'text-muted mr-2';
                hostnameSpan.textContent = hostname;
                li.appendChild(hostnameSpan);

                // Thêm dấu cách giữa domain và title
                var spaceTag = document.createTextNode(' ');
                li.appendChild(spaceTag);
            }
        } else {
            var img = document.createElement('img');
            img.src = 'images/folder.png';
            img.className = 'mr-2';
            li.appendChild(img);
        }

        li.appendChild(anchor);

        if (bookmarkNode.children && bookmarkNode.children.length > 0) {
            // Duyệt đệ quy các nút con
            li.appendChild(this.traverseChildren(bookmarkNode.children, level + 1));
        }

        return li;
    }
}

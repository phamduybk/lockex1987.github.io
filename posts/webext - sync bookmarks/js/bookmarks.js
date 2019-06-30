/**
 * Tham khảo https://developer.chrome.com/extensions/bookmarks
 */
class Bookmarks {

    getBrowserBookmarks(callback) {
        chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
            callback(bookmarkTreeNodes);
        });
    }

    getBookmarksBarId(callback) {
        chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
            var firstChildren = bookmarkTreeNodes[0].children;
            var bookmarksBar = firstChildren.find(e => e.title == 'Bookmarks bar');
            callback(bookmarksBar.id);
        });
    }

    addBookmarks(bookmarkTreeNodes, bookmarksBarId) {
        if (bookmarkTreeNodes.length > 0) {
            var firstChildren = bookmarkTreeNodes[0].children;
            var cloudBookmarksBar = firstChildren.find(e => e.title == 'Bookmarks bar');
            this.traverseChildren(cloudBookmarksBar.children, 1, bookmarksBarId);
        }
    }

    /**
     * Duyệt danh sách các nút gốc, trả về đối tượng DOM gốc.
     * @param bookmarkNodes Danh sách bookmark
     */
    traverseChildren(bookmarkNodes, level, parentId) {
        bookmarkNodes.forEach(b => this.traverseNode(b, level, parentId));
    }

    /**
     * Duyệt 1 nút bất kỳ. Hàm này sẽ được gọi đệ quy.
     * @param bookmarkNode Một nút bookmark
     */
    traverseNode(bookmarkNode, level, parentId) {
        var title = bookmarkNode.title;
        var url = bookmarkNode.url;
        var children = bookmarkNode.children;

        var isFolder = url ? false : true;

        // Chỉ hiện khi thư mục không rỗng
        if (isFolder && (!children || children.length == 0)) {
            return null;
        }

        // Bỏ qua thư mục Work
        if (isFolder && title == 'Work') {
            return null;
        }

        // Bỏ qua các bookmark lẻ không có trong thư mục nào
        if (!isFolder && level == 1) {
            return null;
        }
        
        if (isFolder) {
            var data = {
                'parentId': parentId,
                'title': title
            };
            chrome.bookmarks.create(data, (newFolder) => {
                // Duyệt đệ quy các nút con
                if (children && children.length > 0) {
                    this.traverseChildren(children, level + 1, newFolder.id);
                }
            });
        } else {
            var data = {
                'parentId': parentId,
                'title': title,
                'url': url
            };
            chrome.bookmarks.create(data);
        }
    }
}
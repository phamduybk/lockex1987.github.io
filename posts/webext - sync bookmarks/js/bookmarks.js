class Bookmarks {

    getBrowserBookmarks(callback) {
        chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
            callback(bookmarkTreeNodes);
        });
    }
}
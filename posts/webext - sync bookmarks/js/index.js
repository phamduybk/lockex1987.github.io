var mlab = new Mlab('lockex1987', 'bookmarks', 'lNqkzI-WP6v_uw-xx9RvM_XUROvjaa0s');
var bookmarks = new Bookmarks();
var gui = new Gui();

function dumpLocalBookmarks() {
  bookmarks.getBrowserBookmarks(function(bookmarkTreeNodes) {
    gui.showBookmarks(bookmarkTreeNodes, 'From local');
  });
}

function dumpCloudBookmarks() {
  mlab.listDocuments(function(bookmarkTreeNodes) {
      gui.showBookmarks(bookmarkTreeNodes, 'From cloud');
  });
}

function pushBookmarksToCloud() {
  // Xóa dữ liệu cũ
  mlab.deleteAllDocument(function(resp) {
    // Lấy dữ liệu local hiện tại
    bookmarks.getBrowserBookmarks(function(bookmarkTreeNodes) {
      // Thêm dữ liệu mới
      mlab.insertDocument(bookmarkTreeNodes, function(resp) {
        alert('Done');
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  dumpLocalBookmarks();

  document.querySelector('#dumpLocalBtn').addEventListener('click', dumpLocalBookmarks);
  document.querySelector('#dumpCloudBtn').addEventListener('click', dumpCloudBookmarks);
  document.querySelector('#pushCloudBtn').addEventListener('click', pushBookmarksToCloud);
});

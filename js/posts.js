// Category và ảnh đại diện
const CAT_THUMBS = {
    "eclipse": "eclipse.png",
    "git" : "git.svg",
    "linux": "linux.svg",
    "spring": "spring.png",
    "vue": "vue.png",
    "angularjs": "angularjs.svg",
    "bootstrap": "bootstrap.svg",
    "grunt": "grunt.svg",
    "javascript": "javascript.svg",
    "bulma": "bulma.png",
    "gulp": "gulp.svg",
    "java": "java.svg",
    "maven": "maven.svg",
    "chartjs": "chartjs.svg",
    "jquery": "jquery.svg",
    "python": "python.svg",
    "css": "css3.svg",
    "jquery-ui": "jquery-ui.svg",
    "mysql": "mysql.svg",
    "redis": "redis.svg",
    "vscode": "vscode.png",
    "django": "django.svg",
    "github": "github.svg",
    "web": "html5.svg",
    "less": "less.svg",
    "nodejs": "nodejs.svg",
    "other": "other.png"
};

// Cập nhật lại ảnh cho tất cả bài viết
allPosts.forEach(e => { e.thumb = CAT_THUMBS[e.cat]; });

/**
 * Hàm lấy giá trị tham số từ URL.
 */
function getParameter(param) {
    var url = window.location.search;
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Từ khóa tìm kiếm
var textQuery = getParameter("text"); // gallery

// Tag tìm kiếm
var tagQuery = getParameter("tag");

// Dữ liệu sau khi đã được lọc theo tag hoặc xâu tìm kiếm
var filterPosts;

/**
 * Hàm chuyển trang.
 */
function gotoPage(page) {
    var total = filterPosts.length;
    var startIndex = (page - 1) * pag.pageSize;
    var endIndex = Math.min(startIndex + pag.pageSize, total);
    var items = filterPosts.slice(startIndex, endIndex);

    // Bind sử dụng Vue.js
    app.posts = items;

    pag.setting(total, page).render();
}

// Đối tượng phân trang
var pag = new Pagi({
    containerId: "pagId",
    showNumbers: false,
    showTotalNumber: false,
    showNoRecordText: true,
    noRecordText: 'No post found',
    previousText: '← NEWER',
    nextText: 'OLDER →',
    callbackFunc: gotoPage,
    pageSize: 7
});

var app = new Vue({
    el: '#app',
    data: {
        posts: [],
        pageTitle: 'List of posts'
    }
});

if (textQuery) {
    app.pageTitle = "Search for text: " + textQuery;

    textQuery = textQuery.toLowerCase();
    filterPosts = [];
    allPosts.forEach(p => {
        if (p.title.toLowerCase().includes(textQuery) || p.link.toLowerCase().includes(textQuery)) {
            filterPosts.push(p);
        }
    });
} else if (tagQuery) {
    app.pageTitle = "Search for tag: " + tagQuery;

    tagQuery = tagQuery.toLowerCase();
    filterPosts = [];
    allPosts.forEach(p => {
        if (p.tags && p.tags.includes(tagQuery)) {
            filterPosts.push(p);
        }
    });
} else {
    filterPosts = allPosts;
}

window.addEventListener("DOMContentLoaded", function() {
    // Vào trang sẽ chuyển đến thứ nhất
    gotoPage(1);
});

/**
 * Lấy kích thước trình duyệt có phải
 * @returns trả về một số, là chiều rộng của trình duyệt ở đơn vị pixel
 */
function getBrowserWidth() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    //var width = $(window).width();
    return width;
}

window.addEventListener("load", function() {
    // Vì chỗ load ảnh này chậm nên trình duyệt sẽ hiển thị loading lâu
    // Thêm vào sự kiện "load" để chờ khi trình duyệt không hiển thị loading nữa
    // Ngoài ra chỉ khi kích thước trình duyệt lớn thì mới hiển thị
    if (getBrowserWidth() >= 768) {
        document.querySelector(".sidebar img").src = "https://thecatapi.com/api/images/get?size=small";
    }
});

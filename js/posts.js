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

// Tất cả dữ liệu
var allPosts = [
    //{ lang: 'vi', cat: '', link: 'posts//', title: '', tags: ['', ''] },
    { lang: 'en', cat: 'web', link: 'posts/project - comic reader/', title: 'My comic reader', tags: ['web', 'comic', 'crawl', 'python'] },
    { lang: 'vi', cat: 'javascript', link: 'posts/ui - random girl image/', title: 'Hiển thị ngẫu nhiên ảnh girl xinh', tags: ['javascript', 'css'] },
    { lang: 'vi', cat: 'javascript', link: 'posts/javascript - get parameter/', title: 'Lấy giá trị tham số từ URL bằng JavaScript', tags: ['javascript'] },
    { lang: 'vi', cat: 'css', link: 'posts/css - real layout examples with flexbox/', title: 'Xây dựng layout thực tế với flexbox', tags: ['css', 'flexbox', 'til'] },
    { lang: 'vi', cat: 'css', link: 'posts/css - flexbox introduction/', title: 'Giới thiệu Flexbox', tags: ['css', 'flexbox', 'layout'] },
    { lang: 'en', cat: 'web', link: 'posts/ui - slide show/', title: 'Slide show animation', tags: ['web'] },
    { lang: 'en', cat: 'web', link: 'posts/ui - zoom/', title: 'Zoom animation', tags: ['web'] },
    { lang: 'en', cat: 'web', link: 'posts/ui - wedding photos/', title: 'Wedding photos of Huyên and Dương', tags: ['web'] },
    { lang: 'en', cat: 'nodejs', link: 'https://huyen-duong.herokuapp.com/', title: 'A web-based chat application run with NodeJS', tags: ['nodejs', 'chat'], newTab: true },
    { lang: 'en', cat: 'web', link: 'posts/project - map/', title: 'Share your location with Google Map', tags: ['map'], newTab: true },
    { lang: 'en', cat: 'web', link: 'https://addons.mozilla.org/en-US/firefox/addon/youtube-subtitle-downloader/', title: 'Firefox add-on to download subtitles from Youtube', tags: ['web'], newTab: true },
    { lang: 'vi', cat: 'javascript', link: 'posts/lib - noti/', title: 'Noti - Một thư viện thông báo', tags: ['web'] },
    { lang: 'vi', cat: 'javascript', link: 'posts/lib - pagi/', title: 'Pagi - Một thư viện phân trang', tags: ['web'] },
    { lang: 'en', cat: 'web', link: 'posts/project - homepage/', title: 'Customized home page (websites, calendar,..)', tags: ['web'], newTab: true },
    { lang: 'en', cat: 'css', link: 'posts/ui - 3d css book covers/', title: '3D CSS book covers', tags: ['web', 'css', '3d'] },
    { lang: 'en', cat: 'css', link: 'posts/ui - anagram animation/', title: 'Anagram animation', tags: ['web', 'css'] },
    { lang: 'en', cat: 'css', link: 'posts/ui - blend video background/', title: 'Blend video background', tags: ['web'] },
    { lang: 'en', cat: 'web', link: 'posts/ui - gallery/', title: 'A simple gallery', tags: ['web'] },
    { lang: 'en', cat: 'web', link: 'posts/project - highlight syntax/', title: 'Highlight syntax of source code', tags: ['web'] },
    { lang: 'en', cat: 'web', link: 'posts/project - markdown preview/', title: 'Markdown preview', tags: ['web'] },
    { lang: 'en', cat: 'javascript', link: 'posts/javascript - password generator/', title: 'Password Generator', tags: ['javascript'] },
    { lang: 'en', cat: 'web', link: 'posts/project - puzzle/', title: 'A puzzle game', tags: ['web'] },
    { lang: 'en', cat: 'web', link: 'posts/project - short/', title: 'Short funny stories', tags: ['web'] },
    { lang: 'en', cat: 'git', link: 'posts/git - save git password/', title: 'Save git password', tags: ['git'] },
    { lang: 'vi', cat: 'other', link: 'posts/buy pc/', title: 'Mua một máy tính mới', tags: ['other'] },
    { lang: 'en', cat: 'linux', link: 'posts/linux - install oracle jdk/', title: 'Replace OpenJDK with OracleJDK on Linux', tags: ['linux', 'java'] },
    { lang: 'vi', cat: 'web', link: 'posts/web - social share/', title: 'Thêm link chia sẻ qua mạng xã hội, email', tags: ['web'] },
    { lang: 'en', cat: 'javascript', link: 'posts/web - string format function/', title: 'String format - utility function', tags: ['javascript'] },
    { lang: 'en', cat: 'javascript', link: 'posts/web - add css dynamically/', title: 'Add CSS dynamically by JavaScript', tags: ['javascript', 'css'] },
    { lang: 'en', cat: 'web', link: 'posts/web - mathml/', title: 'Display math equations on web with MathML', tags: ['web'] },
    { lang: 'en', cat: 'css', link: 'posts/bootstrap - media/', title: 'Bootstrap Media tutorial', tags: ['css', 'bootstrap'] },
    { lang: 'vi', cat: 'css', link: 'posts/bootstrap - form/', title: 'Hướng dẫn thiết kế form với Bootstrap', tags: ['css', 'bootstrap'] },
    { lang: 'en', cat: 'web', link: 'posts/web - popular cdn/', title: 'Some popular CDN links', tags: ['web'] },
    { lang: 'vi', cat: 'javascript', link: 'posts/web - jquery-comments/', title: 'jquery-comments - một thư viện về comment rất hay', tags: ['web'] },
    { lang: 'vi', cat: 'java', link: 'posts/tomcat - serving static content from outside tomcat/', title: 'Cung cấp nội dung static từ bên ngoài webapps sử dụng Tomcat', tags: ['java'] },
    { lang: 'vi', cat: 'java', link: 'posts/java - fix smtps error when sending mail/', title: 'Sửa lỗi gửi mail khi kết nối đến server HTTPS', tags: ['java'] },
    { lang: 'vi', cat: 'eclipse', link: 'posts/eclipse - disable join comment lines/', title: 'Cấu hình Eclipse không nối các dòng comment khi format code', tags: ['eclipse'] },
    { lang: 'vi', cat: 'eclipse', link: 'posts/eclipse - shortcuts/', title: 'Những phím tắt của Eclipse', tags: ['eclipse'] },
    { lang: 'en', cat: 'maven', link: 'posts/maven - latest maven repositories/', title: 'Latest Maven repositories', tags: ['maven'] },
    { lang: 'en', cat: 'less', link: 'posts/web - less/', title: 'LESS - a CSS pre-processor', tags: ['less'] },
    { lang: 'en', cat: 'javascript', link: 'posts/web - get computed css/', title: 'Get Computed CSS', tags: ['javascript'] },
    { lang: 'en', cat: 'web', link: 'posts/web - highlightjs/', title: 'Highlight source code syntax with highlight.js', tags: ['web'] },
    { lang: 'en', cat: 'other', link: 'posts/knowledge - bake a potato in the microwave/', title: 'How to Bake a Potato in the Microwave', tags: ['other'] },
    { lang: 'en', cat: 'other', link: 'posts/web - personal website/', title: 'Create your own personal website', tags: ['other'] },
    { lang: 'vi', cat: 'web', link: 'posts/web - simple template/', title: 'A template engine without server script (AJAX only)', tags: ['web'] },
    { lang: 'vi', cat: 'linux', link: 'posts/linux - resize, convert and modify images/', title: 'Resize, Convert and Modify Images', tags: ['linux'] }
];

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

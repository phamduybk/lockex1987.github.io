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
    //{ lang: 'vi', cat: '', link: 'posts//', title: '', desc: '', tags: ['', ''] },
    { lang: 'vi', cat: 'javascript', link: 'posts/javascript - get parameter/', title: 'Get Parameter', desc: 'Lấy giá trị tham số từ URL bằng JavaScript', tags: ['javascript'] },
    { lang: 'vi', cat: 'css', link: 'posts/css - real layout examples with flexbox/', title: 'Xây dựng layout thực tế với flexbox', desc: 'Một hướng dẫn hay về xây dựng layout thực tế với flexbox trên YouTube', tags: ['css', 'flexbox', 'til'] },
    { lang: 'vi', cat: 'css', link: 'posts/css - flexbox introduction/', title: 'Giới thiệu Flexbox', desc: 'Giới thiệu Flexbox để xây dựng bố cục trang', tags: ['css', 'flexbox', 'layout'] },
    { lang: 'en', cat: 'web', link: 'posts/ui - slide show/', title: 'Slide show', desc: 'Slide show animation', tags: ['web'] },
    { lang: 'en', cat: 'web', link: 'posts/ui - zoom/', title: 'Zoom', desc: 'Zoom animation', tags: ['web'] },
    { lang: 'en', cat: 'web', link: 'posts/ui - wedding photos/', title: 'Wedding Photos', desc: 'Wedding photos of Huyên and Dương', tags: ['web'] },
    { lang: 'en', cat: 'nodejs', link: 'https://huyen-duong.herokuapp.com/', title: 'Compay Chat', desc: 'A web-based chat application, run on NodeJS', tags: ['web', 'nodejs'], newTab: true },
    { lang: 'en', cat: 'web', link: 'posts/project - map/', title: 'My Position', desc: 'Share your location', tags: ['web'], newTab: true },
    { lang: 'en', cat: 'web', link: 'https://addons.mozilla.org/en-US/firefox/addon/youtube-subtitle-downloader/', title: 'Youtube Subtitle Downloader', desc: 'Firefox add-on to download subtitles from Youtube', tags: ['web'], newTab: true },
    { lang: 'vi', cat: 'javascript', link: 'posts/lib - noti/', title: 'Noti', desc: 'Một thư viện thông báo', tags: ['web'] },
    { lang: 'vi', cat: 'javascript', link: 'posts/lib - pagi/', title: 'Pagi', desc: 'Một thư viện phân trang', tags: ['web'] },
    { lang: 'en', cat: 'web', link: 'posts/project - homepage/', title: 'Home page', desc: 'List of websites, motorbike alert, calendar', tags: ['web'], newTab: true },
    { lang: 'en', cat: 'css', link: 'posts/ui - 3d css book covers/', title: '3D CSS Book Covers', desc: '3D cover', tags: ['web', 'css'] },
    { lang: 'en', cat: 'css', link: 'posts/ui - anagram animation/', title: 'Anagram Animation', desc: 'Anagram animation of Lord Voldemort', tags: ['web', 'css'] },
    { lang: 'en', cat: 'css', link: 'posts/ui - blend video background/', title: 'Blend Video Background', desc: 'Blend video background', tags: ['web'] },
    { lang: 'en', cat: 'web', link: 'posts/project - comic reader/', title: 'Comic Reader', desc: 'Comic reader', tags: ['web'] },
    { lang: 'en', cat: 'web', link: 'posts/ui - gallery/', title: 'Gallery', desc: 'A simple gallery', tags: ['web'] },
    { lang: 'en', cat: 'web', link: 'posts/project - highlight syntax/', title: 'Highlight Syntax', desc: 'Highlight syntax of source code', tags: ['web'] },
    { lang: 'en', cat: 'web', link: 'posts/project - markdown preview/', title: 'Markdown preview', desc: 'Markdown preview', tags: ['web'] },
    { lang: 'en', cat: 'javascript', link: 'posts/javascript - password generator/', title: 'Password Generator', desc: 'Password generator', tags: ['javascript'] },
    { lang: 'en', cat: 'web', link: 'posts/project - puzzle/', title: 'Puzzle', desc: 'A puzzle game', tags: ['web'] },
    { lang: 'en', cat: 'web', link: 'posts/project - short/', title: 'Short funny stories', desc: 'Short stories', tags: ['web'] },
    { lang: 'en', cat: 'git', link: 'posts/git - save git password/', title: 'Save git password', desc: 'Save git password so you don\'t have to keep typing it when you pull/push something', tags: ['git'] },
    { lang: 'vi', cat: 'other', link: 'posts/buy pc/', title: 'Buy a new PC', desc: 'Mua một máy tính mới', tags: ['other'] },
    { lang: 'en', cat: 'linux', link: 'posts/linux - install oracle jdk/', title: 'Install JDK', desc: 'Replace OpenJDK with OracleJDK on Linux', tags: ['linux', 'java'] },
    { lang: 'vi', cat: 'web', link: 'posts/web - social share/', title: 'Social share', desc: 'Thêm link chia sẻ qua Facebook, Google+, Twitter, LinkedIn, Pinterest, Email', tags: ['web'] },
    { lang: 'en', cat: 'javascript', link: 'posts/web - string format function/', title: 'String format function', desc: 'An utility function', tags: ['javascript'] },
    { lang: 'en', cat: 'javascript', link: 'posts/web - add css dynamically/', title: 'Add CSS dynamically', desc: 'Add CSS dynamically by JavaScript', tags: ['javascript', 'css'] },
    { lang: 'en', cat: 'web', link: 'posts/web - mathml/', title: 'MathML', desc: 'Display math equations on web', tags: ['web'] },
    { lang: 'en', cat: 'css', link: 'posts/bootstrap - media/', title: 'Bootstrap Media', desc: 'Bootstrap Media tutorial', tags: ['css', 'bootstrap'] },
    { lang: 'vi', cat: 'css', link: 'posts/bootstrap - form/', title: 'Bootstrap Form', desc: 'Hướng dẫn thiết kế form với Bootstrap', tags: ['css', 'bootstrap'] },
    { lang: 'en', cat: 'web', link: 'posts/web - popular cdn/', title: 'Popular CDN', desc: 'Some popular CDN links', tags: ['web'] },
    { lang: 'vi', cat: 'javascript', link: 'posts/web - jquery-comments/', title: 'jquery-comments', desc: 'Một thư viện về comment rất hay', tags: ['web'] },
    { lang: 'vi', cat: 'java', link: 'posts/tomcat - serving static content from outside tomcat/', title: 'Serving static content from outside Tomcat', desc: 'Cung cấp nội dung static từ bên ngoài webapps sử dụng Tomcat', tags: ['java'] },
    { lang: 'vi', cat: 'java', link: 'posts/java - fix smtps error when sending mail/', title: 'Fix smtps error when sending mail', desc: 'Sửa lỗi gửi mail khi kết nối đến server HTTPS', tags: ['java'] },
    { lang: 'vi', cat: 'eclipse', link: 'posts/eclipse - disable join comment lines/', title: 'Disable join comment lines in Eclipse', desc: 'Cấu hình Eclipse không nối các dòng comment khi format code', tags: ['eclipse'] },
    { lang: 'vi', cat: 'eclipse', link: 'posts/eclipse - shortcuts/', title: 'Eclipse Shortcut', desc: 'Những phím tắt của Eclipse', tags: ['eclipse'] },
    { lang: 'en', cat: 'maven', link: 'posts/maven - latest maven repositories/', title: 'Latest Maven repositories', desc: 'I will use these latest libraries in all my Java projects', tags: ['maven'] },
    { lang: 'en', cat: 'less', link: 'posts/web - less/', title: 'LESS', desc: 'A CSS Pre-processor', tags: ['less'] },
    { lang: 'en', cat: 'javascript', link: 'posts/web - get computed css/', title: 'Get Computed CSS', desc: 'Get computed CSS', tags: ['javascript'] },
    { lang: 'en', cat: 'web', link: 'posts/web - highlightjs/', title: 'highlight.js', desc: 'Highlight source code syntax', tags: ['web'] },
    { lang: 'en', cat: 'other', link: 'posts/knowledge - bake a potato in the microwave/', title: 'How to Bake a Potato in the Microwave', desc: 'Bake a potato in the microwave', tags: ['other'] },
    { lang: 'en', cat: 'other', link: 'posts/web - personal website/', title: 'Personal Website', desc: 'Create your own website', tags: ['other'] },
    { lang: 'vi', cat: 'web', link: 'posts/web - simple template/', title: 'Simple Template', desc: 'A template engine without server script (AJAX only)', tags: ['web'] },
    { lang: 'vi', cat: 'linux', link: 'posts/linux - resize, convert and modify images/', title: 'Resize, Convert and Modify Images', desc: 'Manipulating images', tags: ['linux'] }
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
    previousText: '← NEWER',
    nextText: 'OLDER →',
    callbackFunc: gotoPage,
    pageSize: 7
});

var app = new Vue({
    el: '#app',
    data: {
        posts: [],
        pageTitle: 'ls /posts'
    }
});

if (textQuery) {
    app.pageTitle = "Search for text: " + textQuery;

    textQuery = textQuery.toLowerCase();
    filterPosts = [];
    allPosts.forEach(p => {
        if (p.title.toLowerCase().includes(textQuery) || p.desc.toLowerCase().includes(textQuery) || p.link.toLowerCase().includes(textQuery)) {
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

// Vào trang sẽ chuyển đến thứ nhất
gotoPage(1);


// Tất cả dữ liệu
var allPosts = [
    //{ lang: 'vi', link: 'posts//', title: '', desc: '', tags: ['', ''] },
    { lang: 'vi', link: 'posts/javascript - get parameter/', title: 'Get Parameter', desc: 'Lấy giá trị tham số từ URL bằng JavaScript', tags: ['javascript'] },
    { lang: 'vi', link: 'posts/css - real layout examples with flexbox/', title: 'Xây dựng layout thực tế với flexbox', desc: 'Một hướng dẫn hay về xây dựng layout thực tế với flexbox trên YouTube', tags: ['css', 'flexbox', 'til'] },
    { lang: 'vi', link: 'posts/css - flexbox introduction/', title: 'Giới thiệu Flexbox', desc: 'Giới thiệu Flexbox để xây dựng bố cục trang', tags: ['css', 'flexbox', 'layout'] },
    { lang: 'en', link: 'posts/ui - slide show/', title: 'Slide show', desc: 'Slide show animation' },
    { lang: 'en', link: 'posts/ui - zoom/', title: 'Zoom', desc: 'Zoom animation' },
    { lang: 'en', link: 'posts/ui - wedding photos/', title: 'Wedding Photos', desc: 'Wedding photos of Huyên and Dương' },
    { lang: 'en', link: 'https://huyen-duong.herokuapp.com/', title: 'Compay Chat', desc: 'A web-based chat application, run on NodeJS', newTab: true },
    { lang: 'en', link: 'posts/project - map/', title: 'My Position', desc: 'Share your location', newTab: true },
    { lang: 'en', link: 'https://addons.mozilla.org/en-US/firefox/addon/youtube-subtitle-downloader/', title: 'Youtube Subtitle Downloader', desc: 'Firefox add-on to download subtitles from Youtube', newTab: true },
    { lang: 'vi', link: 'posts/lib - noti/', title: 'Noti', desc: 'Một thư viện thông báo' },
    { lang: 'vi', link: 'posts/lib - pagi/', title: 'Pagi', desc: 'Một thư viện phân trang' },
    { lang: 'en', link: 'posts/project - homepage/', title: 'Home page', desc: 'List of websites, motorbike alert, calendar', newTab: true },
    { lang: 'en', link: 'posts/ui - 3d css book covers/', title: '3D CSS Book Covers', desc: '3D cover' },
    { lang: 'en', link: 'posts/ui - anagram animation/', title: 'Anagram Animation', desc: 'Anagram animation of Lord Voldemort' },
    { lang: 'en', link: 'posts/ui - blend video background/', title: 'Blend Video Background', desc: 'Blend video background' },
    { lang: 'en', link: 'posts/project - comic reader/', title: 'Comic Reader', desc: 'Comic reader' },
    { lang: 'en', link: 'posts/ui - gallery/', title: 'Gallery', desc: 'A simple gallery' },
    { lang: 'en', link: 'posts/project - highlight syntax/', title: 'Highlight Syntax', desc: 'Highlight syntax of source code' },
    { lang: 'en', link: 'posts/project - markdown preview/', title: 'Markdown preview', desc: 'Markdown preview' },
    { lang: 'en', link: 'posts/javascript - password generator/', title: 'Password Generator', desc: 'Password generator, based on https://www.ricocheting.com/code/php/random-password-generator' },
    { lang: 'en', link: 'posts/project - puzzle/', title: 'Puzzle', desc: 'A puzzle game' },
    { lang: 'en', link: 'posts/project - short/', title: 'Short funny stories', desc: 'Short stories' },
    { lang: 'en', link: 'posts/git - save git password/', title: 'Save git password', desc: 'Save git password so you don\'t have to keep typing it when you pull/push something' },
    { lang: 'vi', link: 'posts/buy pc/', title: 'Buy a new PC', desc: 'Mua một máy tính mới' },
    { lang: 'en', link: 'posts/linux - install oracle jdk/', title: 'Install JDK', desc: 'Replace OpenJDK with OracleJDK on Linux' },
    { lang: 'vi', link: 'posts/web - social share/', title: 'Social share', desc: 'Thêm link chia sẻ qua Facebook, Google+, Twitter, LinkedIn, Pinterest, Email' },
    { lang: 'en', link: 'posts/web - string format function/', title: 'String format function', desc: 'An utility function' },
    { lang: 'en', link: 'posts/web - add css dynamically/', title: 'Add CSS dynamically', desc: 'Add CSS dynamically by JavaScript' },
    { lang: 'en', link: 'posts/web - mathml/', title: 'MathML', desc: 'Display math equations on web' },
    { lang: 'en', link: 'posts/bootstrap - media/', title: 'Bootstrap Media', desc: 'Bootstrap Media tutorial' },
    { lang: 'vi', link: 'posts/bootstrap - form/', title: 'Bootstrap Form', desc: 'Hướng dẫn thiết kế form với Bootstrap' },
    { lang: 'en', link: 'posts/web - popular cdn/', title: 'Popular CDN', desc: 'Some popular CDN links' },
    { lang: 'vi', link: 'posts/web - jquery-comments/', title: 'jquery-comments', desc: 'Một thư viện về comment rất hay' },
    { lang: 'vi', link: 'posts/tomcat - serving static content from outside tomcat/', title: 'Serving static content from outside Tomcat', desc: 'Cung cấp nội dung static từ bên ngoài webapps sử dụng Tomcat' },
    { lang: 'vi', link: 'posts/java - fix smtps error when sending mail/', title: 'Fix smtps error when sending mail', desc: 'Sửa lỗi gửi mail khi kết nối đến server HTTPS' },
    { lang: 'vi', link: 'posts/eclipse - disable join comment lines/', title: 'Disable join comment lines in Eclipse', desc: 'Cấu hình Eclipse không nối các dòng comment khi format code' },
    { lang: 'vi', link: 'posts/eclipse - shortcuts/', title: 'Eclipse Shortcut', desc: 'Những phím tắt của Eclipse' },
    { lang: 'en', link: 'posts/maven - latest maven repositories/', title: 'Latest Maven repositories', desc: 'I will use these latest libraries in all my Java projects' },
    { lang: 'en', link: 'posts/web - less/', title: 'LESS', desc: 'A CSS Pre-processor' },
    { lang: 'en', link: 'posts/web - get computed css/', title: 'Get Computed CSS', desc: 'Get computed CSS' },
    { lang: 'en', link: 'posts/web - highlightjs/', title: 'highlight.js', desc: 'Highlight source code syntax' },
    { lang: 'en', link: 'posts/knowledge - bake a potato in the microwave/', title: 'How to Bake a Potato in the Microwave', desc: 'Bake a potato in the microwave' },
    { lang: 'en', link: 'posts/web - personal website/', title: 'Personal Website', desc: 'Create your own website' },
    { lang: 'vi', link: 'posts/web - simple template/', title: 'Simple Template', desc: 'A template engine without server script (AJAX only)' },
    { lang: 'vi', link: 'posts/linux - resize, convert and modify images/', title: 'Resize, Convert and Modify Images', desc: 'Manipulating images' }
];

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

if (textQuery) {
    document.querySelector("#pageTitle").textContent = "Search for text: " + textQuery;

    textQuery = textQuery.toLowerCase();
    filterPosts = [];
    allPosts.forEach(p => {
        if (p.title.toLowerCase().includes(textQuery) || p.desc.toLowerCase().includes(textQuery) || p.link.toLowerCase().includes(textQuery)) {
            filterPosts.push(p);
        }
    });
} else if (tagQuery) {
    document.querySelector("#pageTitle").textContent = "Search for tag: " + tagQuery;

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

// Đối tượng phân trang
var pag = new Pagi({
    containerId: "pagId",
    showFirst: false,
    showLast: false,
    showNumbers: false,
    firstText: 'first',
    previousText: 'previous',
    nextText: 'next',
    lastText: 'last',
    callbackFunc: gotoPage,
    showTotalNumber: false,
    showNoRecordText: true,
    pageSize: 5
});

/**
 * Hàm chuyển trang.
 */
function gotoPage(page) {
    var total = filterPosts.length;
    var startIndex = (page - 1) * pag.pageSize;
    var endIndex = Math.min(startIndex + pag.pageSize, total);
    var items = filterPosts.slice(startIndex, endIndex);
    pag.setting(total, page)
            .render();
    bindItems(items);
}

// Thêm vào trang
function bindItems(items) {
    var listDiv = document.querySelector("#posts");
    listDiv.innerHTML = "";
    items.forEach(function(p) {
        var liTag = document.createElement("li");
        var imgTag = document.createElement("img");
        var aTag = document.createElement("a");
        var pTag = document.createElement("p");

        imgTag.src = (p.lang == 'en') ? 'images/english.png' : 'images/vietnamese.png';
        aTag.href = p.link;
        aTag.textContent = p.title;
        if (p.newTab) {
            aTag.target = "_blank";
        }
        pTag.textContent = p.desc;
        
        liTag.appendChild(imgTag);
        liTag.appendChild(aTag);
        liTag.appendChild(pTag);

        createTagList(p, liTag);

        listDiv.appendChild(liTag);
    });
}

/**
 * Xây dựng tag list.
 * TODO: Nên dùng VueJS trong trường hợp này.
 */
function createTagList(post, outerLiTag) {
    if (post.tags) {
        var ulTag = document.createElement("ul");
        ulTag.className = "no-list-style";
        post.tags.forEach(function(tag) {
            var liTag = document.createElement("li");
            var aTag = document.createElement("a");
            aTag.href = "posts.html?tag=" + tag;
            aTag.textContent = tag;
            liTag.appendChild(aTag);
            ulTag.appendChild(liTag);
        });
        outerLiTag.appendChild(ulTag);
    }
}

// Vào trang sẽ chuyển đến thứ nhất
gotoPage(1);


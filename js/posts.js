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
    "maven": "maven.png",
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
    "other": "other.png",
    "story": "story.png",
    "pwa": "pwa.svg",
    "laravel": "laravel.svg"
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
/*
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
*/

/*
var app = new Vue({
    el: '#app',
    data: {
        posts: []
    }
});
*/

if (textQuery) {
    textQuery = textQuery.toLowerCase();
    filterPosts = [];
    allPosts.forEach(p => {
        if (p.title.toLowerCase().includes(textQuery) || p.link.toLowerCase().includes(textQuery)) {
            filterPosts.push(p);
        }
    });

    document.querySelector("#pageTitle").textContent = "Search for text: " + textQuery + " (" + filterPosts.length + ")";
} else if (tagQuery) {
    tagQuery = tagQuery.toLowerCase();
    filterPosts = [];
    allPosts.forEach(p => {
        if (p.tags && p.tags.includes(tagQuery)) {
            filterPosts.push(p);
        }
    });

    document.querySelector("#pageTitle").textContent = "Search for tag: " + tagQuery + " (" + filterPosts.length + ")";
} else {
    filterPosts = allPosts;

    document.querySelector("#pageTitle").textContent = "List of posts (" + filterPosts.length + ")";
}

/**
 * Hiển thị tất cả các post luôn 1 lần.
 */
function bindPosts_old() {
    var list = document.querySelector("#app .list");
    var firstItem = list.querySelector("li");
    filterPosts.forEach(function(p) {
        var clone = firstItem.cloneNode(true);

        clone.querySelector('.thumb').src = 'images/' + p.thumb;

        var aTag = clone.querySelector('.title');
        aTag.href = p.link;
        aTag.target = p.newTab ? '_blank' : '';
        aTag.textContent = p.title;

        clone.querySelector('.lang').src = p.lang == 'en' ? 'images/english.png' : 'images/vietnamese.png';

        var tags = clone.querySelector('.tags');
        p.tags.forEach(function(t) {
            var liTag = document.createElement('li');
            var tagItem = document.createElement('a');
            tagItem.href = 'posts.html?tag=' + t;
            tagItem.textContent = t;
            liTag.appendChild(tagItem);
            tags.appendChild(liTag);
        });

        list.appendChild(clone);
    });

    firstItem.style.display = 'none';
}

function bindPosts() {
    console.log('Bind posts with template string');

    var html = `
    ${filterPosts.map(p =>
        `
        <li>
            <img class="thumb" src="images/${p.thumb}"/>
                <div class="info">
                    <a class="title" href="${p.link}" target="${p.newTab ? '_blank' : ''}">${p.title}</a>
                        <!--img class="lang" src="${p.lang == 'en' ? 'images/english.png' : 'images/vietnamese.png'}"/-->
                        <ul class="no-list-style tags">
                            ${p.tags.map(t =>
                                `
                                <li>
                                    <a href="posts.html?tag=${t}">${t}</a>
                                </li>
                                `
                            ).join('')}
                        </ul>
                    <div>
        </li>
        `
    ).join('')}
    `;

    document.querySelector("#app .list").innerHTML = html;
}

window.addEventListener("DOMContentLoaded", function() {
    // Vào trang sẽ chuyển đến thứ nhất
    //gotoPage(1);
    
    bindPosts();
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
        //document.querySelector(".sidebar img").src = "https://thecatapi.com/api/images/get?size=small";
    }
});

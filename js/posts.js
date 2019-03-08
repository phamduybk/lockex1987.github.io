// Dữ liệu sau khi đã được lọc theo tag hoặc xâu tìm kiếm
var filterPosts;

/**
 * Cập nhật lại ảnh cho tất cả bài viết.
 */
function updateThumbnailImage() {
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
        "ui": "css3.svg",
        "mysql": "mysql.svg",
        "redis": "redis.svg",
        "vscode": "vscode.png",
        "django": "django.svg",
        "github": "github.svg",
        "web": "html5.svg",
        "webext": "html5.svg",
        "less": "less.svg",
        "nodejs": "nodejs.svg",
        "other": "other.png",
        "story": "story.png",
        "pwa": "pwa.svg",
        "laravel": "laravel.svg",
        "highcharts": "highcharts.png",
        "highmaps": "highcharts.png",
        "project": "project.png",
        "knowledge": "other.png",
        "it": "other.png",
        "php": "php.svg",
        "elasticsearch": "elasticsearch.svg",
        "docker": "docker.svg",
        "cryptography": "cryptography.png",
        "animation": "animation.png",
        "cassandra": "cassandra.svg",
        "node": "nodejs.svg",
        "nginx": "nginx.svg",
        "ckeditor": "ckeditor.png",
        "game": "game.png",
        "mongodb": "mongodb.png",
        "riot": "riot.png",
        "sass": "sass.png"
    };

    // Cập nhật lại ảnh cho tất cả bài viết
    allPosts.forEach(e => {
        e.thumb = CAT_THUMBS[e.category] || (e.category + '.png');
        //if (!CAT_THUMBS[e.category]) console.log(e.category);
    });
}



/**
 * Lọc các bài viết theo từ khóa tìm kiếm.
 */

function filterAndUpdatePageTitle() {
    // Chỉ hiển thị bookmark
    var bookmarkQuery = document.getElementById("isBookmark").checked;
    var bookmarks;
    if (bookmarkQuery) {
        bookmarks = getBookmarks();
    }

    // Từ khóa tìm kiếm
    var query = document.getElementById('query').value.toLowerCase();
    filterPosts = [];
    allPosts.forEach(p => {
        if (p.title.toLowerCase().includes(query) || p.path.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)) {
            if (!bookmarkQuery || bookmarks.includes(p.path)) {
                filterPosts.push(p);
            }
        }
    });

    bindPosts();
}

/**
 * Hiển thị tất cả các post luôn 1 lần.
 */
function bindPosts() {
    var bookmarks = getBookmarks();

    // Từ khóa tìm kiếm
    var query = document.getElementById('query').value.toLowerCase();

    var html = `
    ${filterPosts.map((p, idx) =>
        `
        <li id="post${idx}">
            <img class="thumb" src="images/${p.thumb}"/>
            <div class="info">
                <div>
                    <img class="bookmark"
                            src="${bookmarks.includes(p.path) ? 'images/bookmark-solid.svg' : 'images/bookmark-regular.svg'}"
                            style="width:12px; cursor:pointer;"
                            onclick="toggleBookmarks(${idx})"/>

                    <a class="title" href="posts/${p.path}/" target="_blank">
                        ${highlightText(p.title, query)}
                    </a>
                </div>

                <div>
                    <a class="path" href="posts/${p.path}/" target="_blank">
                        ${highlightText(p.path, query)}
                    </a>
                </div>
                
                <div class="description">
                    ${highlightText(p.description, query)}
                </div>
            <div>
        </li>
        `
    ).join('')}
    `;

    document.querySelector(".list").innerHTML = html;
}

/**
 * Hiển thị highlight tìm kiếm.
 * @param {String} text Xâu gốc hiển thị
 * @param {String} query Xâu tìm kiếm
 */
function highlightText(text, query) {
    var pattern = new RegExp("(" + query + ")", "i");
    return text.replace(pattern, '<span class="highlight">' + query + '</span>');
}

/**
 * Lấy danh sách bookmark đã lưu.
 */
function getBookmarks() {
	var val = localStorage.getItem("bookmarks");
	if (val) {
		return JSON.parse(val);
	} else {
		return [];
	}
}

/**
 * Lưu thông tin bookmark.
 * @param {Array} bookmarks 
 */
function setBookmarks(bookmarks) {
	localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

/**
 * Toggle bookmark bài viết.
 * @param {Integer} idx Chỉ số của bài viết.
 */
function toggleBookmarks(idx) {
    var bookmarks = getBookmarks();

	var link = filterPosts[idx].path;
	var index = bookmarks.indexOf(link);
	if (index >= 0) {
		bookmarks.splice(index, 1);
		updateBookmarkIcon(idx, false);
	} else {
		bookmarks.push(link);
		updateBookmarkIcon(idx, true);
	}
	
	setBookmarks(bookmarks);
}

/**
 * Cập nhật lại icon bookmark.
 * @param {*} idx 
 * @param {*} bookmarked 
 */
function updateBookmarkIcon(idx, bookmarked) {
	document.querySelector('#post' + idx + ' .bookmark').src = bookmarked ? 'images/bookmark-solid.svg' : 'images/bookmark-regular.svg';
}

/**
 * Gộp những thể loại có ít hơn 10 bài viết.
 */
function normalizeCategories() {
    var normalized = [];
    var names = [];
    normalized.push({ name: 'other', y: 0 });
    categories.forEach(c => {
        if (c.y >= 10) {
            normalized.push(c);
        } else {
            normalized[0].y += c.y;
            if (names.indexOf(c.name) < 0) {
                names.push(c.name);
            }
        }
    });
    normalized[0].name = names.slice(0, 10).join(', ') + ',...';
    return normalized;
}

/**
 * Vẽ biểu đồ thể loại và số bài viết.
 */
function buildChart() {
    Highcharts.chart('chart', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            backgroundColor: 'transparent',
        },
        title: {
            text: null
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false,
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'vertical'
        },
        series: [{
            name: 'Số bài',
            colorByPoint: true,
            data: normalizeCategories() // categories
        }]
    });
}

/**
 * Lọc bài viết theo thể loại.
 * @param {String} category Tên thể loại
 */
function filterByCategory(category) {
    // Thiết lập lại xâu tìm kiếm
    document.getElementById('query').value = category + ' -';

    // Tìm kiếm lại
    filterAndUpdatePageTitle();
}

/**
 * Hiển thị 10 thể loại nhiều post nhất.
 */
function buildCategories() {
    /*
    var arr = categories.slice(0, 10);
    var html = `
        ${arr.map((c) =>
            `
            <div class="cat">
                <a href="javascript:" onclick="filterByCategory('${c.name}')">${c.name} (${c.y})</a>
            </div>
            `
        ).join('')}
        `;
    */

    var arr = [
        'Laravel',
        'PHP',
        'Java',
        'Web',
        'CSS',
        'JavaScript'
    ];
    var html = `
        ${arr.map((c) =>
            `
            <li class="cat">
                <a href="javascript:" onclick="filterByCategory('${c.toLowerCase()}')">
                    ${c}
                </a>
            </li>
            `
        ).join('')}
        `;

    document.querySelector("#categories").innerHTML = `<ul>${html}</ul>`;
}




window.addEventListener("DOMContentLoaded", function() {
    updateThumbnailImage();
    filterAndUpdatePageTitle();
    buildChart();
    buildCategories();
});

var List = (function() {

    function displayList(issues) {
        //console.log(issues);
        var html = `
                ${issues.map(e => `
                    <div class="issue">
                        <a href="" onclick="viewIssue('${e.jsonLink}', '${e.title}'); return false;">${e.title}</a>
                    </div>
                `).join('')}`;
        document.querySelector('#issueList').innerHTML = html;
    }

    function _init() {
        // Đường dẫn đến file JSON chứa các trang của tập truyện
        var url = `data/${Data.comic}/list.json`;

        // Đọc file JSON và hiển thị ảnh các trang
        var urls = fetch(url)
                .then(res => res.json())
                .then(issues => displayList(issues));
    }

    _init();


    return {

    };
})();
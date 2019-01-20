function viewIssue(jsonLink, title) {
    

    // Đường dẫn đến file JSON chứa các trang của tập truyện
    var url = `data/${Data.comic}/${jsonLink}`;

    // Đọc file JSON và hiển thị ảnh các trang
    var urls = fetch(url)
            .then(res => res.json())
            .then(urls => Viewer.displayImages(urls));
}

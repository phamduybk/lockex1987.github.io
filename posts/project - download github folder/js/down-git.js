// SỬ DỤNG ANGULAR JS ĐỂ CÓ $http và $q
var app = angular.module('downGitApp', []);

app.controller('downGitController', function($scope, $http, $q) {

    $scope.process = {
        isProcessing: false, // đánh dấu đang xử lý
        downloadedFiles: 0, // số file đã download
        totalFiles: 0 // tổng số file
    };

    // URL người dùng nhập vào
    var url;

    // Thông tin của repo
    var repoInfo;

    /**
     * Xử lý sự kiện người dùng nhấn nút "Download".
     */
    $scope.download = function() {
        url = $('#url').val().trim();

        // Kiểm tra nhập URL và domain đúng là github
        if (url) {
            if (!url.match("https?://github.com/.+/.+")) {
                alert("Invalid URL!");
            } else {
                parseInfo(url);
                //return;
                downloadZippedFiles();
            }
        }
    };

    /**
     * Parse địa chỉ của GitHub và lấy ra các thông tin.
     * Một địa chỉ để test:
     *   https://github.com/lockex1987/lockex1987.github.io/tree/master/posts/ui - swipe to delete
     * @param {String} url Địa chỉ
     */
    function parseInfo(url) {
        var path = new URL(url).pathname;
        var a = path.split("/");

        //console.log(url, a);

        repoInfo = {};
        repoInfo.author = a[1]; // ví dụ: lockex1987
        repoInfo.repository = a[2]; // ví dụ: lockex1987.github.io
        // a[3] luôn là "tree"
        repoInfo.branch = a[4]; // ví dụ: master
        repoInfo.rootName = a[a.length - 1]; // ví dụ: "ui%20-%20swipe%20to%20delete"
        repoInfo.resPath = path.substring(path.indexOf(a[4]) + a[4].length + 1); // "posts/ui%20-%20swipe%20to%20delete"
        
        // https://developer.github.com/v3/repos/contents/
        // Có thể bị giới hạn chỉ request được 60 lần trong 1 giờ
        // https://developer.github.com/v3/#rate-limiting
        // Thêm clientId và clientSecret ở đây để tăng số lần
        var clientId = 'daa1d6abcf4eed989d23';
        var clientSecret = '6a39e23bc694b8033c31cebfec8157be46bd693c';
        repoInfo.urlPrefix = "https://api.github.com/repos/" + repoInfo.author + "/" + repoInfo.repository + "/contents/";
        repoInfo.urlPostfix = "?ref=" + repoInfo.branch +
                (clientId ? '&client_id=' + clientId : '') +
                (clientSecret ? '&client_secret=' + clientSecret : '');

        repoInfo.downloadFileName = repoInfo.rootName.replace(/%20/g, ' '); // "ui - swipe to delete"
        repoInfo.rootDirectoryName = repoInfo.rootName.replace(/%20/g, ' ') + "/"; // "ui - swipe to delete/"
        console.log(repoInfo);
    }

    /**
     * Download các file.
     */
    function downloadZippedFiles() {
        if (!repoInfo.resPath) {
            if (!repoInfo.branch) {
                repoInfo.branch = "master";
            }

            // Download cả repository
            var downloadUrl = "https://github.com/" + repoInfo.author + "/" + repoInfo.repository + "/archive/" + repoInfo.branch + ".zip";
            window.location = downloadUrl;
        } else {
            // Gọi API để lấy ra thông tin các file
            $.ajax({
                url: repoInfo.urlPrefix + repoInfo.resPath + repoInfo.urlPostfix,
                type: "GET",
                success: function(response) {
                    //console.log(response);
                    //return;

                    if (response instanceof Array) {
                        downloadDir();
                    } else {
                        downloadFile(response.download_url);
                    }
                },
                error: function(xhr, textStatus, errorThrown) {
                    console.log("Có lỗi khi lấy thông tin các file.", errorThrown);
                    downloadFile("https://raw.githubusercontent.com/" + repoInfo.author + "/" + repoInfo.repository + "/" + repoInfo.branch + "/" + repoInfo.resPath);
                }
            });
        }
    }

    /**
     * Download thư mục.
     */
    function downloadDir() {
        // Đánh dấu đang xử lý
        $scope.process.isProcessing = true;

        var dirPaths = [];
        var files = [];
        var requestedPromises = [];

        dirPaths.push(repoInfo.resPath);
        mapFileAndDirectory(dirPaths, files, requestedPromises);
    }

    /**
     * Mapping.
     * @param {*} dirPaths Mảng thư mục
     * @param {*} files Mảng file
     * @param {*} requestedPromises Mảng promise
     */
    function mapFileAndDirectory(dirPaths, files, requestedPromises) {
        // Lấy thông tin của thư mục
        $http.get(repoInfo.urlPrefix + dirPaths.pop() + repoInfo.urlPostfix).then(function(response) {
            // Duyệt từng phần tử của thư mục
            for (var i = response.data.length - 1; i >= 0; i--) {
                if (response.data[i].type == "dir") {
                    // Nếu phần tử là thư mục thì lại đẩy vào mảng dirPaths
                    dirPaths.push(response.data[i].path);
                } else {
                    // Nếu phần tử là file và có đường dẫn download thì download file.
                    if (response.data[i].download_url) {
                        getFile(response.data[i].path, response.data[i].download_url, files, requestedPromises);
                    } else {
                        console.log(response.data[i]);
                    }
                }
            }

            if (dirPaths.length <= 0) {
                // Nếu đã mapping xong thì download các file
                downloadFiles(files, requestedPromises);
            } else{
                // Duyệt tiếp các thư mục
                mapFileAndDirectory(dirPaths, files, requestedPromises);
            }
        });
    }

    /**
     * Download nhiều file.
     * @param {*} files Mảng file
     * @param {*} requestedPromises Mảng promise
     */
    function downloadFiles(files, requestedPromises) {
        // Chờ cho đến khi tất cả promise thực hiện xong
        $q.all(requestedPromises).then(function(data) {
            // Tạo file ZIP
            var zip = new JSZip();
            for (var i = files.length - 1; i >= 0; i--) {
                zip.file(repoInfo.rootDirectoryName +
                        files[i].path.substring(decodeURI(repoInfo.resPath).length + 1),
                        files[i].data);
            }
            zip.generateAsync({ type: "blob" }).then(function(content) {
                // Đánh dấu đã xử lý xong
                $scope.$apply(function () {
                    $scope.process.isProcessing = false;
                });

                // Trả về cho client
                saveAs(content, repoInfo.downloadFileName + ".zip");
            });
        });
    }

    /**
     * Lấy thông tin của file.
     * @param {*} path Đường dẫn
     * @param {*} url Đường dẫn download
     * @param {*} files Mảng file
     * @param {*} requestedPromises Mảng promise
     */
    function getFile(path, url, files, requestedPromises) {
        // Download file
        var promise = $http.get(url, { responseType: "arraybuffer" }).then(function(file) {
            // Thêm vào mảng file
            files.push({
                path: path,
                data: file.data
            });

            // Tăng số file đã download xong
            $scope.process.downloadedFiles = files.length;
        }, function(error) {
            console.log(error);
        });

        // Thêm vào mảng promise
        requestedPromises.push(promise);

        // Tăng tổng số file
        $scope.process.totalFiles = requestedPromises.length;
    }

    /**
     * Download 1 file.
     * Trường hợp người dùng nhập cả repo to hay có lỗi gì đó.
     * @param {String} url Địa chỉ
     */
    function downloadFile(url) {
        // Đánh dấu đang xử lý
        $scope.process.isProcessing = true;
        // Chưa download file nào
        $scope.process.downloadedFiles = 0;
        // Tổng số có 1 file
        $scope.process.totalFiles = 1;
        
        // Download file
        $http.get(url, { responseType: "arraybuffer" }).then(function(file) {
            // Đã download xong 1 file
            $scope.process.downloadedFiles = 1;

            // Tạo file ZIP
            var zip = new JSZip();
            zip.file(repoInfo.rootName, file.data);
            zip.generateAsync({ type: "blob" }).then(function(content) {
                // Đánh dấu đã xử lý xong
                $scope.$apply(function () {
                    $scope.process.isProcessing = false;
                });

                // Lưu file xuống client
                saveAs(content, repoInfo.downloadFileName + ".zip");
            });
        }, function(error) {
            console.log(error);
            // Đánh dấu đã xử lý xong
            $scope.process.isProcessing = false;
            log.console("Error! Server failure or wrong URL.");
        });
    }    
});

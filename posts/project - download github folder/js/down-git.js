// SỬ DỤNG ANGULAR JS ĐỂ CÓ $http và $q
var app = angular.module('downGitApp', []);
app.controller('downGitController', function($scope, $http, $q) {

    $scope.process = {
        isProcessing: false,
        downloadedFiles: 0,
        totalFiles: 0
    };

    var url;
    var repoInfo;

    $scope.download = function() {
        url = $('#url').val().trim();
        if (url) {
            if (!url.match("https?://github.com/.+/.+")) {
                alert("Invalid URL!");
            } else {
                downloadZippedFiles();
            }
        }
    };

    function downloadZippedFiles() {
        parseInfo(url);

        if (!repoInfo.resPath) {
            if (!repoInfo.branch) {
                repoInfo.branch = "master";
            }
            // Download cả repository
            var downloadUrl = "https://github.com/" + repoInfo.author + "/" + repoInfo.repository + "/archive/" + repoInfo.branch + ".zip";
            window.location = downloadUrl;
        } else {
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
                error: function() {
                    console.log("probable big file.");
                    downloadFile("https://raw.githubusercontent.com/" + repoInfo.author + "/" + repoInfo.repository + "/" + repoInfo.branch + "/" + repoInfo.resPath);
                }
            });
        }
    }

    // https://github.com/lockex1987/lockex1987.github.io/tree/master/posts/lib - common validation
    function parseInfo(url) {
        var path = new URL(url).pathname;
        var a = path.split("/");

        //console.log(url, a);

        repoInfo = {};
        repoInfo.author = a[1];
        repoInfo.repository = a[2];
        repoInfo.branch = a[4];
        repoInfo.rootName = a[a.length - 1];
        repoInfo.resPath = path.substring(path.indexOf(a[4]) + a[4].length + 1);
        
        // https://developer.github.com/v3/repos/contents/
        repoInfo.urlPrefix = "https://api.github.com/repos/" + repoInfo.author + "/" + repoInfo.repository + "/contents/";
        repoInfo.urlPostfix = "?ref=" + repoInfo.branch;

        repoInfo.downloadFileName = repoInfo.rootName.replace(/%20/g, ' ');
        repoInfo.rootDirectoryName = repoInfo.rootName.replace(/%20/g, ' ') + "/";
    }

    function downloadDir() {
        $scope.process.isProcessing = true;

        var dirPaths = [];
        var files = [];
        var requestedPromises = [];

        dirPaths.push(repoInfo.resPath);
        mapFileAndDirectory(dirPaths, files, requestedPromises);
    }

    function mapFileAndDirectory(dirPaths, files, requestedPromises){
        $http.get(repoInfo.urlPrefix + dirPaths.pop() + repoInfo.urlPostfix).then(function(response) {
            for (var i = response.data.length - 1; i >= 0; i--) {
                if (response.data[i].type == "dir") {
                    dirPaths.push(response.data[i].path);
                } else {
                    if (response.data[i].download_url) {
                        getFile(response.data[i].path, response.data[i].download_url, files, requestedPromises);
                    } else {
                        console.log(response.data[i]);
                    }
                }
            }

            if (dirPaths.length <= 0) {
                downloadFiles(files, requestedPromises);
            } else{
                mapFileAndDirectory(dirPaths, files, requestedPromises);
            }
        });
    }

    function downloadFiles(files, requestedPromises){
        var zip = new JSZip();
        $q.all(requestedPromises).then(function(data) {
            for (var i = files.length - 1; i >= 0; i--) {
                zip.file(repoInfo.rootDirectoryName + files[i].path.substring(decodeURI(repoInfo.resPath).length + 1), files[i].data);
            }

            $scope.process.isProcessing = false;
            zip.generateAsync({ type: "blob" }).then(function(content) {
                saveAs(content, repoInfo.downloadFileName + ".zip");
            });
        });
    }

    function getFile(path, url, files, requestedPromises) {
        var promise = $http.get(url, { responseType: "arraybuffer" }).then(function(file) {
            files.push({
                path:path,
                data:file.data
            });
            $scope.process.downloadedFiles = files.length;
        }, function(error) {
            console.log(error);
        });

        requestedPromises.push(promise);
        $scope.process.totalFiles = requestedPromises.length;
    }

    function downloadFile(url) {
        $scope.process.isProcessing = true;
        $scope.process.downloadedFiles = 0;
        $scope.process.totalFiles = 1;
        
        var zip = new JSZip();
        $http.get(url, {responseType: "arraybuffer"}).then(function(file) {
            $scope.process.downloadedFiles = 1;
            zip.file(repoInfo.rootName, file.data);

            $scope.process.isProcessing = false;
            zip.generateAsync({ type: "blob" }).then(function(content) {
                saveAs(content, repoInfo.downloadFileName + ".zip");
            });
        }, function(error) {
            console.log(error);
            $scope.process.isProcessing = false;
            log.console("Error! Server failure or wrong URL.");
        });
    }    
});


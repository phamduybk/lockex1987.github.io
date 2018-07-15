var imageGrid = (function() {

    var container;
    var urls;
    var updateLoadProgressCallback;

    var photos = [];

    var countLoaded = 0;

    var rowHeight = 150;
    var maxRowHeight = 500;
    var border = 1;
    var imageSelector = 'image-thumb';
    var imageContainer = 'photo-container';

    function loadImages(_urls, _container, _updateLoadProgressCallback) {
        urls = _urls;
        container = _container;
        updateLoadProgressCallback = _updateLoadProgressCallback;

        urls.forEach(function(u, idx) {
            var img = new Image();
            //var img = document.createElement("img");
            img.onload = function() {
                photos.push({
                    url: u,
                    width: this.width,
                    height: this.height,
                    index: idx
                });

                checkLoaded();
            };
            img.onerror = function() {
                checkLoaded();
            };
            img.src = u;
        });
    }

    function checkLoaded() {
        countLoaded++;
        updateLoadProgressCallback(countLoaded);
        if (countLoaded === urls.length) {
            showImages();
        }
    }
    
    function showImages() {
        // Sắp xếp lại, giữ nguyên thứ tự ban đầu
        //console.log(photos.length);
        photos.sort(function(a, b) {
            return a.index - b.index;
        });

        repaint();
    }

    function repaint() {
        var rows = _splitToRows(photos);
        container.innerHTML = "";
        displayImages(rows);
    }

    function _splitToRows(photos) {
        // Mảng các width
        var ws = [];
        var totalWidth = 0;
        photos.forEach(function(image) {
            var wt = image.width;
            var ht = image.height;
            if (ht !== rowHeight) {
                wt = Math.floor(wt * (rowHeight / ht));
            }
            totalWidth += wt;
            ws.push(wt);
        });
        //console.log(totalWidth, ws);

        // Chiều rộng từng hàng
        var numberOfRows = Math.ceil(totalWidth / container.clientWidth);
        var perRowWidth = totalWidth / numberOfRows;
        //console.log(perRowWidth, numberOfRows);

        var tw = 0,
            baseLine = 0,
            limit = photos.length;
        // Mảng các ảnh của các dòng
        var rows = [];
        while (baseLine < limit) {
            var row = {
                    width: 0,
                    photos: []
                },
                c = 0;
            
            while ((tw + ws[baseLine + c] / 2 <= perRowWidth * (rows.length + 1)) && (baseLine + c < limit)) {
                tw += ws[baseLine + c];
                row.width += ws[baseLine + c];
                row.photos.push({
                    width: ws[baseLine + c],
                    url: photos[baseLine + c].url
                });
                c++;
            }
            baseLine += c;
            rows.push(row);
        }
        console.log(rows.length, rows);

        return rows;
    }

    function displayImages(rows) {
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var lastRow = (i === rows.length - 1);
            var availableRowWidth = container.clientWidth;

            // Ratio of actual width of row to total width of images to be used
            var r = availableRowWidth / row.width;

            // New height is not original height * ratio
            var ht = Math.min(Math.floor(rowHeight * r), maxRowHeight);
            r = ht / rowHeight;
            var domRow = document.createElement("div");
            domRow.className = 'picrow';
            domRow.style.height = (ht + border) + "px";
            container.appendChild(domRow);

            var imagesHtml = '';
            var tw = -1 * border;
            for (var j = 0; j < row.photos.length; j++) {
                var url = row.photos[j].url;
                // Calculate new width based on ratio
                var wt = Math.floor(row.photos[j].width * r);
                tw += wt + border;

                imagesHtml += renderPhoto(
                    url,
                    wt,
                    ht,
                    j === row.photos.length - 1 ? 0 : border);
            }

            domRow.innerHTML = imagesHtml;


            var c = row.photos.length;
            
            // if total width is slightly smaller than
            // actual div width then add 1 to each
            // photo width till they match
            var k = 0;
            while (tw < availableRowWidth) {
                var img1 = domRow.querySelector('.' + imageContainer + ':nth-child(' + (k + 1) + ')' + ' .' + imageSelector);
                img1.style.width = (img1.clientWidth + 1) + "px";
                k = (k + 1) % c;
                tw++;
            }

            // if total width is slightly bigger than
            // actual div width then subtract 1 from each
            // photo width till they match
            k = 0;
            while (tw > availableRowWidth) {
                var img2 = domRow.querySelector('.' + imageContainer + ':nth-child(' + (k + 1) + ')' + ' .' + imageSelector);
                img2.style.width = (img2.clientWidth - 1) + "px";
                k = (k + 1) % c;
                tw--;
            }
        }
    }

    function renderPhoto(src, displayWidth, displayHeight, marginRight) {
        return '<div class="photo-container" style="height:' + displayHeight + 'px;margin-right:' + marginRight + 'px;">' +
                        '<img class="image-thumb" src="' + src + '" style="width:' + displayWidth + 'px;height:' + displayHeight + 'px;" >' +
                        '</div>';
    }

    return {
        loadImages,
        repaint
    };
})();

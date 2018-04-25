(function() {

    var pag = new Pagi({
        containerId: "pagId",
        showFirst: true,
        showLast: true,
        firstText: 'first',
        previousText: 'previous',
        nextText: 'next',
        lastText: 'last',
        callbackFunc: gotoPage,
        showTotalNumber: true,
        showNoRecordText: true
    });

    function gotoPage(page) {
        var startIndex = (page - 1) * pag.pageSize;

        var data = callServer(startIndex);

        pag.setting(data.total, page)
                .render();
        bindItems(data.items);
    }

    function callServer(startIndex) {
        var total = 56;
        var items = [];
        var end = Math.min(startIndex + 10, total);
        for (var i = startIndex; i < end; i++) {
            items.push("Item " + (i + 1));
        }
        return {
            total,
            items
        };
    }

    function bindItems(items) {
        var dataDiv = document.getElementById("dataDiv");
        dataDiv.innerHTML = "";
        for (var i = 0; i < items.length; i++) {
            var div = document.createElement("div");
            div.textContent = (pag.startIndex + i + 1) + ". " + items[i];
            dataDiv.appendChild(div);
        }
    }

    function init() {
        gotoPage(1);
    }

    init();
})();

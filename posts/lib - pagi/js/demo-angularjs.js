var app = angular.module('app', ["pagi"]);

app.controller('ExampleController', function($scope) {

    $scope.pag = new Pagi();
    $scope.pag.showNoRecordText = true;

    $scope.gotoPage = function(page) {
        var startIndex = (page - 1) * $scope.pag.pageSize;

        var data = callServer(startIndex);

        $scope.pag.setting(data.total, page);
        $scope.items = data.items;
    };

    function callServer(startIndex) {
        var total = 78;
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

    function init() {
        $scope.gotoPage(1);
    }

    init();
});

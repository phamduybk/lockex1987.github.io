var options = {
    target: '#graph',
    debug: false,
    width: 1600,
    height: 600,
    callbacks: {
        nodeClick: function(name, extra) {
            //console.log(name, extra);

            //evt.preventDefault();
	        //evt.stopPropagation();

            var personCode = extra.code;
	        viewPersonByCode(personCode);

	        detailInfo.style.display = "";
        },
        /*
        textRenderer: function(name, extra, textClass) {
            if (extra && extra.nickname) {
                name = name + " (" + extra.nickname + ")";
            }
            return "<p align='center' class='" + textClass + "'>" + name + "</p>";
        }
        */
    },
    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    nodeWidth: 100,
    styles: {
        node: 'node',
        linage: 'linage',
        marriage: 'marriage',
        text: 'nodeText'
    }
};

dTree.init(dTreeData, options);


var app = angular.module('treeDemo', []);
app.controller('TreeFormController', function($scope) {

    $scope.people = people.map(p => p.code);
    $scope.you = $scope.people[0];
    $scope.relative = $scope.people[1];
    $scope.linkType = '';

    $scope.changed = function() {
        console.log($scope.you, $scope.relative);
        $scope.linkType = dijkstra($scope.you, $scope.relative);
    };

    $scope.swap = function() {
        var temp = $scope.you;
        $scope.you = $scope.relative;
        $scope.relative = temp;
        $scope.changed();
    };

    $scope.changed();
});
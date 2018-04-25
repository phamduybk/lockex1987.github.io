angular.module("PrivateWebsites", []).controller('WebsitesController', function($scope, $http) {
	
	$scope.websites;
	
	function displayWebsites() {
		$http.get("../data/websites.json").then(function(resp) {
			// All data
			var a = resp.data;
						
			// Remove disabled websites
			for (var i = a.length - 1; i >= 0; i--) {
				if (a[i].disabled) {
						a.splice(i, 1);
				}
			}

			$scope.websites = a;
		});
	}
	
	function init() {
		displayWebsites();
	}

	init();
});

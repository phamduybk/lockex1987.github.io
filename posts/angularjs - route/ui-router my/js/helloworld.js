// Create a module that depends on ui.router module
var myApp = angular.module('HelloWorld', [
	'ui.router'
]);

myApp.config(function($stateProvider) {
	// The first state
  var helloState = {
    name: 'hello',
    url: '/hello',
    template: '<h3>hello world!</h3>'
  }

	// The second state
  var aboutState = {
    name: 'about',
    url: '/about',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  }

	// Register states
  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
  
  $stateProvider.state('partyDetail', {
		// You can also define these by using {partyID}/{partyLocation}
		url: '/party/:partyID/:partyLocation',
		controller: function($scope, $stateParams) {
			// get the id
			$scope.id = $stateParams.partyID;
			
			// get the location
			$scope.location = $stateParams.partyLocation;
		},
		template: '<p>ID: {{id}}, location: {{location}}</p>'
	});
});

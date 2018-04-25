// Tên của ứng dụng
// Các controller sẽ thuộc về ứng dụng này
const APP_NAME = "UniversalWebsite";

// Khởi tạo ứng dụng và các module sử dụng
var app = angular.module(APP_NAME, [
	'ui.router',
	'oc.lazyLoad'
]);


// Danh sách các trạng thái
const GLOBAL_MENUS = [
	{
		state: "public",
		url: "public",
		name: "Public",
		templateUrl: "public/public.html",
		controller: "PublicController",
		controllerLocation: "public/PublicController.js"
	}
	
	,
	{
		state: "public.login",
		url: "login",
		name: "Login",
		templateUrl: "public/login/login.html",
		controller: "LoginController",
		controllerLocation: "public/login/LoginController.js"
	}
	/*
	,
	{
		state: "private",
		url: "private",
		name: "Private",
		templateUrl: "private/private.html",
		controller: "private/PrivateController"
	},
	{
		state: "private.core",
		url: "core",
		name: "Private Core",
		templateUrl: "private/core/core.html",
		controller: "private/core/CoreController"
	},
	{
		state: "private.core.home",
		url: "home",
		name: "Home page",
		templateUrl: "private/core/home.html",
		controller: "private/core/HomeController"
	}*/
];


// Khởi tạo các đường dẫn
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	
	/*
	var addState = function(menuItem) {
		$stateProvider
				.state(menuItem.state, {
					url: '/' + menuItem.url,
					templateUrl: 'partials/' + menuItem.templateUrl,
					controller: menuItem.controller,
					resolve: {
						lazyLoadControllerJsFile: function($ocLazyLoad) {
							return $ocLazyLoad.load("controllers/" + menuItem.controllerLocation);
						}
					}
				});
	}
	*/

	/*
	for (var i = 0; i < GLOBAL_MENUS.length; i++) {
		var m = GLOBAL_MENUS[i];
		// Infamous loop issue
		addState(m);
	}*/

	// Mặc định sẽ vào trang login
	// Mọi đường dẫn không hợp lệ sẽ vào đây
	

	// Use HTML5 mode for nice URLs
	// You need to config the server too
	
	//$locationProvider.html5Mode(true);

	$urlRouterProvider.otherwise('/public/login');

	$stateProvider.state('private', {    // Định ngĩa 1 state home
            url: '/private',  // khai báo Url hiển thị
            templateUrl: 'partials/private/private.html',  // đường dẫn view
            controller: function($scope) {  // Khai báo 1 controller cho state home
                    $scope.Name= ['Phạm', 'Minh', 'Tài'];
                }
        });

	$stateProvider.state({
		name: 'public',
		url: '/public',
		templateUrl: 'partials/public/public.html'
	});

	$stateProvider.state({
		name: 'public.login',
		url: '/login',
		templateUrl: 'partials/public/login/login.html'
	});



	$stateProvider.state('public.detail',{
            url: '/detail/:id',  // khai báo tham số ID trên url
            templateUrl: 'public/login/detail.html'
            //controller: 'DetailCtrl' // gọi xử lý controller khi state được gọi
        })
});

// Khi chạy thì gán lại trạng thái hiện tại cho $rootScope (để cập nhật title)
app.run(function($state, $rootScope) {
	$rootScope.$state = $state;
	$rootScope.menus = GLOBAL_MENUS;
});

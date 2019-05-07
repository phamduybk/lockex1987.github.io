angular.module("HomePage", []).controller('HomePageController', function($scope, $http) {
	
	// Danh sach websites
	$scope.websites;

	// Du lieu thay dau xe may
	$scope.oilData;

	// Ngay can thay dau tiep theo
	$scope.nextDate;

	// So ngay so voi lan thay dau cuoi cung
	$scope.dateDiff;

	// So km can thay dau tiep theo
	$scope.nextKm;

	// Màn hình đang hiển thị
	$scope.screen = 'websites'; // websites, motorbike-oil

	// Chuyển màn hình hiển thị
	$scope.changeScreen = function(s) {
		$scope.screen = s;
	};
	
	// Hien thi danh sach website
	function displayWebsites() {
		// Lấy ngày trong tuần (0 là Chủ Nhật, 1 là thứ Hai,..., 6 là thứ Bảy)
		var currentTime = new Date();
		var dayOfWeek = currentTime.getDay();
		
		$http.get("data/websites.json").then(function(resp) {
			// All data
			var a = resp.data;
						
			// Remove disabled websites
			for (var i = a.length - 1; i >= 0; i--) {
				// Nếu disable rồi thì bỏ qua
				if (a[i].disabled) {
                        /*
						a.splice(i, 1);
						continue;
                        */
				}

				// Nếu có chỉ định ngày và không chứa ngày hiện tại
				/*
				if (a[i].day && a[i].day.indexOf(dayOfWeek) < 0) {
					a.splice(i, 1);
					continue;
				}*/
			}

			$scope.websites = a;
		});
	}

	// Lay du lieu thay dau
	function getOilData() {
		$http.get("data/motorbike-oil.json").then(function(resp) {
			processData(resp.data);
			warningNextMaintain();
		});
	}

	// Chuan hoa du lieu thay dau
	function processData(a) {
		for (var i = 0; i < a.length; i++) {
			var e = a[i];
			e.date = converStringToDate(e.dateStr);

			if (i > 0) {
				var prev = a[i - 1];
				e.dateDiff = dateDiff(prev.date, e.date);
				e.kmDiff = e.km - prev.km;
			}
		}

		$scope.oilData = a;
	}

	// Canh bao lan thay dau tiep theo
	function warningNextMaintain() {
		var last = $scope.oilData[$scope.oilData.length - 1];
		var nextDate = addDate(last.date, 60);
		var nextKm = last.km + 2000;
		var currentDate = new Date();
		// Khong duoc dat ten bien la dateDiff nua
		var dd = dateDiff(currentDate, nextDate);

		$scope.nextDate = convertDateToString(nextDate);
		$scope.dateDiff = dd;
		$scope.nextKm = nextKm;
	}
	
	function init() {
		displayWebsites();
		getOilData();
	}

	init();
});

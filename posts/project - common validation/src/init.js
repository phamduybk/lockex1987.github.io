// Init
(function() {
	// Thêm hàm String format
	if (!String.prototype.format) {
		String.prototype.format = function () {
			var args = arguments;

			return this.replace(/{(\d+)}/g, function (match, number) {
				return (typeof args[number] != 'undefined') ? args[number] : match;
			});
		};
	}

	// Khi người dùng đánh vào hoặc sửa phần tử bị lỗi thì xóa thông báo lỗi của phần tử đó
	/*
	document.addEventListener('input', function (event) {
		var el = event.target;
		if (el.matches('.has-error')) {
			clearSingleErrorMessage(el);
		}
	});
	*/

	// Khi click vào thông báo lỗi thì xóa nó
	// Trường hợp .error-message có position absolute
	document.addEventListener('click', function (event) {
		var el = event.target;
		if (el.matches('.error-message')) {
			el.style.transition = 'opacity 100ms';
			el.addEventListener('transitionend', function () {
				el.parentNode.removeChild(el);
			});
			el.style.opacity = '0';
		}
	});

	addRealTimeValidation();
})();

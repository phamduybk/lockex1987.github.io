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
	document.addEventListener('input', function(event) {
		var el = event.target;
		if (el.matches('.has-error')) {
			clearSingleErrorMessage(el);
		}
	});
	*/

	// Khi click vào thông báo lỗi thì xóa nó	
	document.addEventListener('click', function(event) {
		var el = event.target;
		if (el.matches('.error-message')) {
			el.style.transition = 'opacity 100ms';
			el.addEventListener('transitionend', function() {
				el.parentNode.removeChild(el);
			});
			el.style.opacity = '0';
		}
	});

	// jQuery plugin
	/*
	$.fn.invalidForm = function () {
		//console.log('id: ' + this.attr('id'));
		return invalidForm('#' + this.attr('id'));
	};
	*/

	addCss(`
			.validate-container { position: relative; }
			.validate-container .has-error { border-color: red; background-color: yellow; }
			.validate-container .valid { /*border-color: green; background-color: cyan;*/ }
			/*.validate-container .error-message { position: absolute; right: 10px; top: 10px; background-color: rgba(255, 0, 0, 0.75); color: white;
					padding: 3px 8px; border-radius: 4px; cursor: pointer; white-space: pre-wrap; }*/
			.validate-container .error-message { margin-top: .25rem; font-size: 80%; color: #dc3545; white-space: pre-wrap; }`);
})();

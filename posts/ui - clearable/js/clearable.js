/**
 * Clearable
 */
{
	function checkClearable(inputNode) {
		var ns = inputNode.nextElementSibling;

		if (inputNode.value) {
			// Nếu input có giá trị thì hiện clear hoặc là thêm mới clear
			if (ns && ns.classList.contains('x')) {
				//document.querySelector('#ipadConsole').textContent = '_showClear';
				_showClear(ns);
			} else if (!ns || !ns.classList.contains('x')) {
				//document.querySelector('#ipadConsole').textContent = '_insertClearNode';
				_insertClearNode(inputNode);
			}
		} else {
			// Nếu input không có giá trị thì ẩn clear
			if (ns && ns.classList.contains('x')) {
				//document.querySelector('#ipadConsole').textContent = '_hideClear';
				_hideClear(ns);
			}
		}
	}
		
	function checkAllClearables() {
		document.querySelectorAll('.clearable input').forEach(inputNode => checkClearable(inputNode));
	}

	// iPad không hỗ trợ let ở đây, phải khai báo là var
	var _insertClearNode = function(inputNode) {
		try {
			//document.querySelector('#ipadConsole').textContent = '_insertClearNode 2';
			var clearNode = document.createElement('span');
			clearNode.innerHTML = '&times;';
			clearNode.className = 'x';
			clearNode.title = 'Click to clear';
			inputNode.parentNode.insertBefore(clearNode, inputNode.nextSibling);
			//document.querySelector('#ipadConsole').textContent = inputNode.parentNode.innerHTML;

			setTimeout(() => {
				_showClear(clearNode);
			}, 0);
		} catch (ex) {
			alert(ex);
		}
	};

	var _listenToInputOnClearable = function() {
		document.addEventListener('input', function(evt) {
			if (evt.target.parentNode.classList.contains('clearable')) {
				var inputNode = evt.target;
				checkClearable(inputNode);
			}
		});
	};

	var _showClear = function(clearNode) {
		clearNode.classList.add('open');
	};

	var _hideClear = function(clearNode) {
		clearNode.classList.remove('open');
	};

	var _listenToClickOnX = function() {
		document.addEventListener('click', function(evt) {
			if (evt.target.classList.contains('x')) {
				var clearNode = evt.target;
				_hideClear(clearNode);
				
				var inputNode = clearNode.previousElementSibling;
				inputNode.value = '';
                
                // Trigger sự kiện input, để những listener khác biết được
                var event = new Event('input', {
                    'bubbles': true,
                    'cancelable': true
                });

                inputNode.dispatchEvent(event);
			}
		});
	};

	var _init = function() {
		try {
			_listenToInputOnClearable();

			_listenToClickOnX();

			checkAllClearables();
		} catch (ex) {
			alert(ex);
		}
	};

	_init();
}


/**
 * Clearable
 */
{
	function checkClearable(inputNode) {
		var ns = inputNode.nextElementSibling;

		if (inputNode.value) {
			// Nếu input có giá trị thì hiện clear hoặc là thêm mới clear
			if (ns && ns.classList.contains('x')) {
				_showClear(ns);
			} else if (!ns || !ns.classList.contains('x')) {
				_insertClearNode(inputNode);
			}
		} else {
			// Nếu input không có giá trị thì ẩn clear
			if (ns && ns.classList.contains('x')) {
				_hideClear(ns);
			}
		}
	}
		
	function checkAllClearables() {
		document.querySelectorAll('.clearable input').forEach(inputNode => checkClearable(inputNode));
	}

	let _insertClearNode = function(inputNode) {
		var clearNode = document.createElement('span');
		clearNode.innerHTML = '&times;';
		clearNode.className = 'x';
		clearNode.title = 'Click to clear';
		inputNode.parentNode.insertBefore(clearNode, inputNode.nextSibling);

		setTimeout(() => {
			_showClear(clearNode);
		}, 0);
	};

	let _listenToInputOnClearable = function() {
		document.addEventListener('input', function(evt) {
			if (evt.target.parentNode.classList.contains('clearable')) {
				var inputNode = evt.target;
				checkClearable(inputNode);
			}
		});
	};

	let _showClear = function(clearNode) {
		clearNode.classList.add('open');
	};

	let _hideClear = function(clearNode) {
		clearNode.classList.remove('open');
	};

	let _listenToClickOnX = function() {
		document.addEventListener('click', function(evt) {
			if (evt.target.classList.contains('x')) {
				var clearNode = evt.target;
				_hideClear(clearNode);
				
				var inputNode = clearNode.previousElementSibling;
				inputNode.value = '';
			}
		});
	};

	let _init = function() {
		_listenToInputOnClearable();
		_listenToClickOnX();

		checkAllClearables();
	};

	_init();
}

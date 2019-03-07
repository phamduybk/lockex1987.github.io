
// keyup có vẻ bị giật
// keypress không bắt được sự kiện paste
// input bắt được sự kiện paste
// https://stackoverflow.com/questions/38502560/whats-the-difference-between-keyup-keydown-keypress-and-input-events
// https://www.w3schools.com/jsref/event_oninput.asp
// Giữ con trỏ ở vị trí đang sửa
// Cho phép nhập số thực
$('#form input').on('input', function(event) {
	// Get the value
	var input = this.value;

	// Loại bỏ các kí tự không phải là số, dấu trừ (số âm), dấu chấm
	//input = input.replace(/[\D\s\._\-]+/g, '');
	if (input.endsWith('.')) {

	} else {
		input = input.replace(/[^\d\-\.]+/g, '');

		if (input.length > 0) {
			this.value = separateThousands(parseFloat(input, 10));
		}
	}
});

// https://stackoverflow.com/questions/4928586/get-caret-position-in-html-input
// https://stackoverflow.com/questions/2897155/get-cursor-position-in-characters-within-a-text-input-field/18903492
// https://ourcodeworld.com/articles/read/282/how-to-get-the-current-cursor-position-and-selection-within-a-text-input-or-textarea-in-javascript
var ele = document.getElementById('amount');
ele.addEventListener("keydown", function() {
                    console.log ("Caret position: " + this.selectionStart);

                    // You can also set the caret: this.selectionStart = 2;
                });

/**
 * When Form Submitted.
 */
$('#form').on('submit', function(event) {
	var $this = $(this);
	var arr = $this.serializeArray();
	for (var i = 0; i < arr.length; i++) {
		// Loại bỏ các ký tự: dấu phảy
		arr[i].value = arr[i].value.replace(/[($)\,\s\._\-]+/g, '');
	}
	console.log(arr);
	event.preventDefault();
});

// Credits: http://blog.vishalon.net/index.php/javascript-getting-and-setting-caret-position-in-textarea/
function setCaretPosition(ctrl, pos) {
  
  if (ctrl.setSelectionRange) {
	  // Modern browsers
    ctrl.focus();
    ctrl.setSelectionRange(pos, pos);
  
  
  } else if (ctrl.createTextRange) {
	  // IE8 and below
    var range = ctrl.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}

// Set the cursor position of the "#test-input" element to the end when the page loads
var input = document.getElementById('amount');
input.value = '123456';
setCaretPosition(input, input.value.length - 2);

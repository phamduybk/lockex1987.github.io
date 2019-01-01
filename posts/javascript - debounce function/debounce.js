// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	// 'private' variable for instance
	// The returned function will be able to reference this due to closure.
	// Each call to the returned function will share this common timer.
	var timeout;

	// Calling debounce returns a new anonymous function
	return function() {
		// reference the context and args for the setTimeout function
		var context = this;
		var args = arguments;
		
		
		var later = function() {
			// Inside the timeout function, clear the timeout variable
			// which will let the next execution run when in 'immediate' mode
			timeout = null;
			
			// Check if the function already ran with the immediate flag
			if (!immediate) {
				// Call the original function with apply
				// apply lets you define the 'this' object as well as the arguments
				//    (both captured before setTimeout)
				func.apply(context, args);
			}
		};
		
		// Should the function be called now? If immediate is true
		// and not already in a timeout then the answer is: Yes
		var callNow = immediate && !timeout;
		
		 // This is the basic debounce behaviour where you can call this
		 //   function several times, but it will only execute once
		 //   [before or after imposing a delay].
		 //   Each time the returned function is called, the timer starts over.
		clearTimeout(timeout);
		
		// Set the new timeout
		timeout = setTimeout(later, wait);
		
		// Immediate mode and no wait timer? Execute the function..
		if (callNow) func.apply(context, args);
	};
}

function simpleDebounce(func, wait) {
	var callNow = true;

	return function() {
		if (callNow) {
			callNow = false;
			timeout = setTimeout(
				function() {
					callNow = true;
				},
				wait
			);
			
			func();
		}
	};
};

var statusDiv = document.getElementById("status");
var count = 0;

var normalFunction = function() {
	statusDiv.textContent = count;
	count++;
};

//var myEfficientFn = debounce(normalFunction, 15);
var myEfficientFn = simpleDebounce(normalFunction, 150);

// Normal: 40
// 10: 20
// 15: 5
// 20: 1
// Simple debounce


//window.addEventListener('scroll', myEfficientFn);
window.addEventListener('scroll', normalFunction);

//alert(count);

// https://github.com/nefe/You-Dont-Need-jQuery
// https://codepen.io/codyhouse/pen/FdkEf
/*
// jQuery
$el.offset();

// Native
function getOffset (el) {
  const box = el.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset - document.documentElement.clientTop,
    left: box.left + window.pageXOffset - document.documentElement.clientLeft
  };
}
*/

/*
// jQuery
$(window).scrollTop();

// Native
(document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
*/

/*
// window height
$(window).height();

// with scrollbar
window.document.documentElement.clientHeight;

// without scrollbar, behaves like jQuery
window.innerHeight;
*/

/*
// jQuery
$el.find('li');

// Native
el.querySelectorAll('li');
*/

/*
// jQuery
$el.hasClass(className);

// Native
el.classList.contains(className);
*/

/*
// jQuery
$el.removeClass(className);

// Native
el.classList.remove(className);
*/

/*
// jQuery
$el.addClass(className);

// Native
el.classList.add(className);
*/

document.addEventListener('DOMContentLoaded', function() {

	// Danh sách các blog
	var timelineBlocks = document.querySelectorAll('.cd-timeline-block');

	function isBelow(el) {
		var top = el.getBoundingClientRect().top + window.pageYOffset - document.documentElement.clientTop;
		var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		var height = window.innerHeight;

		/*
		var jqTop = $(el).offset().top;
		var jqScrollTop = $(window).scrollTop();
		var jqHeight = $(window).height();

		console.log(top + ": " + jqTop + ", " + scrollTop + ": " + jqScrollTop + ", " + height + ": " + jqHeight);
		return jqTop > jqScrollTop + jqHeight * 0.75;
		*/
		return top > scrollTop + height * 0.75;
	}

	function isHidden(el) {
		//return $(el).find('.cd-timeline-img').hasClass('is-hidden');
		return el.querySelector('.cd-timeline-img').classList.contains('is-hidden');
	}

	function hideBlock(el) {
		//$(el).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		el.querySelectorAll('.cd-timeline-img, .cd-timeline-content').forEach(function(child) {
			child.classList.add('is-hidden');
		});
	}

	function showBlock(el) {
		//$(el).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
		el.querySelectorAll('.cd-timeline-img, .cd-timeline-content').forEach(function(child) {
			child.classList.remove('is-hidden');
			child.classList.add('bounce-in');
		});
	}

	// Hide timeline blocks which are outside the viewport
	timelineBlocks.forEach(function(el) {
		if (isBelow(el)) {
			hideBlock(el);
		}
	});

	// On scolling, show/animate timeline blocks when enter the viewport
	window.addEventListener('scroll', function() {
		timelineBlocks.forEach(function(el) {
			if ( !isBelow(el) && isHidden(el) ) {
				showBlock(el);
			}
		});
	});
});

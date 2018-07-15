$(document).ready(function() {
	var scrollDir = false;
	var headerFold = 20;
	
	// MENU CLICK
	$(".menu").on("click", function() {
		
		$("#side-slide").toggleClass("open");
		
		$(".menu").removeClass("small");
		$(".page-header").removeClass("small-header");
		
	});
	
	// PAGE CLICK
	$("ul#page-select li").on("click", function() {
		var clickedPage = $(this).attr("data-page");
		$("ul#page-select li").removeClass("active-page");
		$(this).addClass("active-page");
		
		$("#side-slide").removeClass("open");
		
		$(".page .page-header h2").fadeTo(500, 0);
		$("#" + clickedPage + " .page-header h2").fadeTo(500, 1);
		
		$(".page").slideUp(750);
		$("#" + clickedPage).delay(400).slideDown(500);
	});
	
	
	// CHECK SCROLL DIRECTION
	var lastScrollTop = 0, delta = 5;
	$(window).scroll(function(event) {
		// if scroll direction is true
		if (scrollDir == true) {
			var st = $(this).scrollTop();

			if (Math.abs(lastScrollTop - st) <= delta)
				return;

			// Down scroll
			if (st > lastScrollTop) {
				$(".menu").addClass("small");
				$(".page-header").addClass("small-header");
			}
			// Up scroll
			else {
				$(".menu").removeClass("small");
				$(".page-header").removeClass("small-header");
			}
			lastScrollTop = st;
		}
		// else
		else {
			var st = $(this).scrollTop();
			var isOpen = $("#side-slide").hasClass("open");
			if (st >= headerFold && isOpen == false) {
				$(".menu").addClass("small");
				$(".page-header").addClass("small-header");
			}
			else {
				$(".menu").removeClass("small");
				$(".page-header").removeClass("small-header");
			}
		}
	});
});
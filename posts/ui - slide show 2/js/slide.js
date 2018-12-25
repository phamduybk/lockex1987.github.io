// First, set the slideIndex to 1
var slideIndex = 1;

// Then call showSlides() to display the first image.
showSlides(slideIndex);

// When the user clicks one of the buttons call plusSlides().
// The plusSlides() function subtracts one or  adds one to the slideIndex.
function plusSlides(n) {
	showSlides(slideIndex += n);
}

function currentSlide(n) {
	showSlides(slideIndex = n);
}

// The showSlides() function hides (display="none") all elements with the class name "mySlides",
// and displays (display="block") the element with the given slideIndex.
function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	var dots = document.getElementsByClassName("dot");

	// If the slideIndex is higher than the number of elements (x.length), the slideIndex is set to zero.
	if (n > slides.length) {
		slideIndex = 1;
	}

	// If the slideIndex is less than 1 it is set to number of elements (x.length).
	if (n < 1) {
		slideIndex = slides.length;
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex - 1].style.display = "block";
	dots[slideIndex - 1].className += " active";
}

function autoSlide() {
	slideIndex++;
	showSlides(slideIndex);
	setTimeout(autoSlide, 2000); // Change image every 2 seconds
}

//autoSlide();
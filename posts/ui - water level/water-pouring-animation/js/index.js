$(document).ready(function() {

	$('.valve').on('click', function() {
		$(this).addClass('valve-rotate');

		setTimeout(function() {
		 $('.pipe-first').addClass('pipe-anim'); },
		1000);

		setTimeout(function() {
		 $('.pipe-second').addClass('pipe-anim'); },
		3000);

		setTimeout(function() {
		 $('.pipe-vertical-first').addClass('pipe-anim'); },
		4700);

		setTimeout(function() {
		 $('.glass-first .water').addClass('water-anim'); },
		5400);

		setTimeout(function() {
		 $('.pipe-vertical-second').addClass('pipe-anim'); },
		6900);

		setTimeout(function() {
		 $('.glass-second .water').addClass('water-anim'); },
		7400);

		setTimeout(function() {
		 $('.pipe-vertical-third').addClass('pipe-anim'); },
		9000);

		setTimeout(function() {
		 $('.glass-third .water').addClass('water-anim'); },
		9700);

		setTimeout(function() {
		 $('.valve').addClass('valve-rotate-reverce'); },
		11000);
		
	})

});
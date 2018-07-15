(function(window) {
  
  $(window).swipe( {

    swipeLeft:function(e) {
      if('content' == e.target.className) {
        pushOutMenu(e, 'right');
      } else {
        resetBody();
    	}
    },
    swipeRight:function(e) {
      if('content' == e.target.className) {
        pushOutMenu(e, 'left');
      } else {
        resetBody();
    	}
    },
    //Default is 75px, set to 0 for demo so any distance triggers swipe
    threshold:0,
    fingers:'all', 
    allowPageScroll: 'auto'
  });
  
  $('#leftMenu').on('click touchstart', function(e) {
    pushOutMenu(e, 'left');
  });
  $('#rightMenu').on('click touchstart', function(e) {
    pushOutMenu(e, 'right');
  });
  $("#leftNav, #rightNav").on('touchend', function(e) {
    resetBody();
  });

  
  $('#bodyOverlay, .nav a').on('click touchstart', function(e) {
    e.preventDefault();
    resetBody();
  });
  $('#searchIcon').on('click touchstart', function(e) {
    e.preventDefault();
    $(this).parent().toggleClass('expanded');
  });
  $('.content').on('click', function(e) {
    e.preventDefault();
   	resetSearch();
  });
  $('#searchTerm').on('focus', function(e) {
    $('#searchSubmit').addClass('search');
  });
  $('#navControls form').on('submit', function(e) {
    e.preventDefault();
    alert('submitted with ' + $('#searchTerm').val());
  });
  
  function resetSearch() {
    $('#searchSubmit').removeClass('search');
    $('#navControls form').removeClass('expanded');
  }
  
  function pushOutMenu(e, type) {
    e.preventDefault();
    if($('#bodyOverlay').hasClass('cover')) {
      $('body').removeClass(type + 'Menu');
    	$('#bodyOverlay').removeClass('cover');
    } else {
      $('body').addClass(type + 'Menu');
    	$('#bodyOverlay').addClass('cover');
      $('#' + type +'Nav').css('top', $('body').scrollTop());
    }
    
  }
  
  function resetBody() {
 
    if($('#bodyOverlay').hasClass('cover')) {
      $('body').removeClass('leftMenu').removeClass('rightMenu'); $('#bodyOverlay').removeClass('cover');  
      return true;
    }
    
    return false;
	 
  }
 
})(window);
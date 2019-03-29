$('body').on('activate', function (e) {
  var $item = $(e.target);
  $('#menu-arrow').css('left',  $item.offset().left + $item.width() / 2 - 10 - $('.navbar-wrapper').offset().left);
});
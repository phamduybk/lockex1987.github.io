(function($) { 
  
  var iconBox =   $('.icon-box');
  var line01  =   $('#line01');
  var line02  =   $('#line02');
  var line03  =   $('#line03');
  var line04  =   $('#line04');
  
  var buttonLeft  =   $('#left');
  var buttonRight =   $('#right');
  var buttonMenu  =   $('#menu');
  var buttonClose =   $('#close');
  var buttonAdd   =   $('#add');
 
  buttonLeft.on('click', function(){
    buttonLeft.   addClass      ('button-active');
    line01.       addClass      ('line01-left');
    line04.       addClass      ('line04-left');
    
    buttonRight.  removeClass   ('button-active');
    buttonMenu.   removeClass   ('button-active');
    buttonClose.  removeClass   ('button-active');
    buttonAdd.    removeClass   ('button-active');    
    line01.       removeClass   ('line01-right');
    line04.       removeClass   ('line04-right');    
    line01.       removeClass   ('line01-close');
    line02.       removeClass   ('line02-close');
    line03.       removeClass   ('line03-close');
    line04.       removeClass   ('line04-close');
    iconBox.      removeClass   ('icon-box-add');    
  });
  buttonRight.on('click', function(){
    buttonRight.  addClass      ('button-active');
    line01.       addClass      ('line01-right');
    line04.       addClass      ('line04-right');
    
    buttonLeft.   removeClass   ('button-active');
    buttonMenu.   removeClass   ('button-active');
    buttonClose.  removeClass   ('button-active');
    buttonAdd.    removeClass   ('button-active');    
    line01.       removeClass   ('line01-left');
    line04.       removeClass   ('line04-left');    
    line01.       removeClass   ('line01-close');
    line02.       removeClass   ('line02-close');
    line03.       removeClass   ('line03-close');
    line04.       removeClass   ('line04-close');
    iconBox.      removeClass   ('icon-box-add');
  });
  buttonMenu.on('click', function(){
    buttonMenu.  addClass      ('button-active');
    
    buttonLeft.   removeClass   ('button-active');
    buttonRight.  removeClass   ('button-active');
    buttonClose.  removeClass   ('button-active');
    buttonAdd.    removeClass   ('button-active');
    line01.       removeClass   ('line01-left');
    line04.       removeClass   ('line04-left');
    line01.       removeClass   ('line01-right');
    line04.       removeClass   ('line04-right');
    line01.       removeClass   ('line01-close');
    line02.       removeClass   ('line02-close');
    line03.       removeClass   ('line03-close');
    line04.       removeClass   ('line04-close');
    line01.       removeClass   ('line01-add');
    line04.       removeClass   ('line04-add');
    iconBox.      removeClass   ('icon-box-add');
  });
  buttonClose.on('click', function(){
    buttonClose.  addClass      ('button-active');
    line01.       addClass      ('line01-close');
    line02.       addClass      ('line02-close');
    line03.       addClass      ('line03-close');
    line04.       addClass      ('line04-close');
    
    buttonLeft.   removeClass   ('button-active');
    buttonRight.  removeClass   ('button-active');
    buttonMenu.   removeClass   ('button-active');
    buttonAdd.    removeClass   ('button-active');    
    line01.       removeClass   ('line01-left');
    line04.       removeClass   ('line04-left');    
    line01.       removeClass   ('line01-right');
    line04.       removeClass   ('line02-right');
    iconBox.      removeClass   ('icon-box-add');
  });
  buttonAdd.on('click', function(){
    buttonAdd.    addClass      ('button-active');
    line01.       addClass      ('line01-close');
    line02.       addClass      ('line02-close');
    line03.       addClass      ('line03-close');
    line04.       addClass      ('line04-close');
    iconBox.      addClass      ('icon-box-add');
    
    buttonLeft.   removeClass   ('button-active');
    buttonRight.  removeClass   ('button-active');
    buttonMenu.   removeClass   ('button-active');
    buttonAdd.    removeClass   ('button-active');    
    line01.       removeClass   ('line01-left');
    line04.       removeClass   ('line04-left');    
    line01.       removeClass   ('line01-right');
    line04.       removeClass   ('line02-right');
  });

})(jQuery);
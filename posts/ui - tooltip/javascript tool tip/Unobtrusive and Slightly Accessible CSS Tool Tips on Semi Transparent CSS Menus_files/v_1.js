/*

twToolTipManager - Unobtrusive and Accessible Tooltip Manager
Author: Tom Wright <developer@tomwright.me.uk>
Copyright (c): 2003-2005 Tom Wright, all rights reserved
Version: 1.3 31/03/2005 20:45

You are free to use this code in its original form or tear it apart 
as much as you like, provided you let me know how you have implemented
it and provide some sort of credit :)

*/

//var isNasty = (navigator.appName == "Microsoft Internet Explorer");

var SS_TIP_MOUSE = 1;
var SS_TIP_KBD   = 2;

function twToolTipManager() {
    
  // @access  private
  var self = this;
  var tooltip = null;
  var coords         = {left:0,top:0};
  var tooltip_offset = {left:-10,top:20};
  var current_tip = null;
  var interval_id = null;
  var locked = false;
    
  var __construct = function() {
    tooltip = create("div");
    tooltip.appendChild(create("div"));
    tooltip.id = "tip";
    get("body")(0).appendChild(tooltip);        
    EventManager.Add(document, 'mousemove', function(evt) {
      var c;
      if(!evt)evt=window.event;
      if (locked ^ SS_TIP_KBD) {
        c=getPosEvtScr(evt);     
        coords.left=c.x;
        coords.top=c.y;
      }
      if (locked & SS_TIP_MOUSE) {
     	  tooltip.style.top = (coords.top+tooltip_offset.top) + "px";
     	  tooltip.style.left = (coords.left+tooltip_offset.left) + "px";          
      }      
    });  
    EventManager.Add(document, 'mousemove', function() {
      document.getElementById("debug").innerHTML = "(" + coords.left + ", " + coords.top + ")";    
    });
  }

  this.register = function(elem) {
    elem.tip = new String(elem.getAttribute('title'));
    elem.setAttribute('title', '');
    EventManager.Add(elem, 'mouseover', function() {
      if (!locked) {
        locked = SS_TIP_MOUSE;
        window.clearTimeout(interval_id);  
        current_tip = elem.tip;
        interval_id = window.setTimeout(function() {self.repaint()},500);
      }
    });
    EventManager.Add(elem, 'mouseout', function() {if (locked&SS_TIP_MOUSE){locked=false;self.repaint();}});
    EventManager.Add(elem, 'focus', function() {
      if (!locked) {
        locked = SS_TIP_KBD;
        var obj_coords=getPosObj(elem);
        var obj_size=getObjSize(elem);
        coords.left=obj_coords.x + obj_size.w;
        coords.top=obj_coords.y;
        current_tip = elem.tip;
        interval_id = window.setTimeout(function() {self.repaint()},500);      
      }
    });    
    EventManager.Add(elem, 'blur', function() {if(locked&SS_TIP_KBD){locked=false;self.repaint();}});
  }

  this.repaint = function() {
    if (locked) {
   	  tooltip.style.top =  (coords.top+tooltip_offset.top) + "px";
   	  tooltip.style.left = (coords.left+tooltip_offset.left) + "px";  
   	  tooltip.firstChild.innerHTML = current_tip;  	 
//      if (isNasty) {
//        tooltip.firstChild.style.background = "#fff";
//      }            
      tooltip.style.display = "block";     
      interval_id = window.setTimeout(function() {locked=false;self.repaint()},3000);      
    }
    else {
      tooltip.style.display = "none";
      current_tip = null;
      window.clearTimeout(interval_id);          
    }
  }
 
  __construct();
      
}

// to create a tool tip manager and register elements add a 
// load event that does the following:
EventManager.Add(window, 'load', function() {
  // create a tool tip manager
  var tooltipManager = new twToolTipManager(); 
  
  // register each element for which a tip is required -
  // eg tooltipManager.register(elem)
  
  // this is a custom routine to iterate over all anchor elements
  // @see   http://css.experiments.severnsolutions.co.uk/libs/dom_evt.js
  (function(elem){if(elem.title.length>0){tooltipManager.register(elem);}}).Iterate(get('A')());  
});


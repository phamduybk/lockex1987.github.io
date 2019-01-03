/**
* dom_evt.js
* Library of experimental and implemented functions and objects for
* DOM manipulation. Some of this code is *very* experimental and has 
* only been tested across a small number of browsers. 
* Use freely but at your own risk! ;))
*
* @author		Tom Wright <developer@tomwright.me.uk>
* @last update	01/04/05 00:27
*
* EventManager object based on EventManager.js by Keith Gaughan
* Visit http://talideon.com/weblog/2005/03/js-memory-leaks.cfm
* for licensing and latest updates.
*/


// --------------------------
// -- Debugging routines ----
// --------------------------
function debug(obj) {
  var str,
      holder = document.getElementsByTagName("body").item(0),
      container = document.createElement("pre"),
      styles = {"textAlign":"left",
                "background":"#fff",
                "border":"1px solid #333",
                "padding":"2%",
                "width":"80%",
                "overflow":"auto",
                "margin":"1em auto"};

  for (i in obj) { str += i + ":" + obj[i] + "\n\r"; }    
  if (holder === null) { alert(str); }
  else {
    container.appendChild(document.createTextNode(str));
    defineCSS(container, styles);
    holder.appendChild(container);
  }
}

function report_errors(e) {
  debug(e);
}

// --------------------------
// ------- DIY Legacy -------
// --------------------------

/* Strictly illegal reserved word - but temp soln for IE */
var undefined; // for IE5.0x

if (typeof Function.prototype.call === String(undefined)) {
  Function.prototype.call = function(obj, param) {
    obj.base = this;
    obj.base(param);  
  };  
}

if (typeof Array.prototype.push === String(undefined)) {
  Array.prototype.push = function(elem) {
    this[this.length] = elem;
  };
}

// ----------------------------
// -- Prototype enhancements --
// ----------------------------

Function.prototype.Iterate = function(collection) {  
  var elem;
  if (typeof TreeWalker !== String(undefined) && collection instanceof TreeWalker) {
    while((elem = collection.nextNode()) !== null) {
      this(elem);  
    }
  }
  else {
    // note use the collection index rather than item() method
    // since IE will pass a standard array if getSet has been
    // used to build the collection
    for (var i = 0; (elem = collection[i]) ; i+=1 ) {
      this(elem, i);	
    }    
  } 
};

Array.prototype.search = function(str) {
  var re;
  for (var i = 0, m = this.length; i < m; i+=1) {
    re = new RegExp('^' + str + '$', 'i');
    if (re.test(this[i])) {
      return true;  
    }  
  }
  return false;  
};

// ---------------------------
// -- Standard DOM Routines --
// ---------------------------

if (typeof Node === String(undefined)) {  
// set some node constants for IE.
  var Node = {}; 
  Node.ELEMENT_NODE                =1;
  Node.ATTRIBUTE_NODE              =2;  
  Node.TEXT_NODE                   =3;
  Node.CDATA_SECTION_NODE          =4;
  Node.ENTITY_REFERENCE_NODE       =5;
  Node.ENTITY_NODE                 =6;
  Node.PROCESSING_INSTRUCTION_NODE =7;
  Node.COMMENT_NODE                =8;
  Node.DOCUMENT_NODE               =9;
  Node.DOCUMENT_TYPE_NODE          =10;
  Node.DOCUMENT_FRAGMENT_NODE      =11;
  Node.NOTATION_NODE               =12;
}

// replacement func for referencing an element in the DOM tree
function ref(id) {
  if (document.getElementById) {
    var elem = document.getElementById(id);
    return (elem) ? elem : undefined;
  }
  return undefined;  
}

// replacement func for creating an element
// this is far from complete!!!
function create(t, nodeType) {
  if (nodeType === undefined) {
    return document.createElement(t);  
  }
  else {
    switch(nodeType) {
      case Node.TEXT_NODE:
        return document.createTextNode(t);
      default:
        return document.createElement(t);
    }  
  }
  // failure
  return null;
}

// get a reference to an HTMLCollection or HTMLElement within a collection
// eg 
// * col('table') will return a collection of all table elements
// * col('table', 1) will return the second table in table's collection
// * col('input', 0, 'form_id') will return the first input field in the form with ID form_id
// * col('input', 0, col('form', 0)) will return then first input field in the first form
function col(tag, idx, parent) {
  var c;
  if (document.getElementsByTagName) {
    if (parent !== undefined) {
      c = (typeof parent == "string") ?
          ref(parent).getElementsByTagName(tag) : parent.getElementsByTagName(tag);
    }
    else {
      c = document.getElementsByTagName(tag);  
    }
  }  
  return (c.length === 0) ? undefined : ((idx !== undefined && idx != -1) ? c[idx] : c);
}

// compressed method for navigating through the dom tree, similar to get but based
// on properties (ie prototyping).
// get('form')(0).get('input')(0) would get the first input in first form
//
// this method depends on assignToDOM to work in IE and is setup by calling __initDOMCrawler
var get = function(tag) {
  var self = (this.nodeName !== undefined) ? 
    this :    //  this instanceof Node
    document; //  this instanceof Window    

  return function(idx) {
    //if (tag instanceof Array) {
    if (typeof tag === "array") {
      return getSet(tag, self);  
    }
    else {
      return (idx === undefined) ?
        self.getElementsByTagName(tag) :
        self.getElementsByTagName(tag).item(idx);  
    }    
  };
};

function getSet(tags, root) {
  var set = null;
  if (document.createTreeWalker) { 
    // Keep out IE unless we build an IE TreeWalker object!!
    root = (root === undefined) ? document : root;
    set = document.createTreeWalker(root,
                                        NodeFilter.SHOW_ELEMENT, 
                                        {
                                          acceptNode : function(n) {
                                            return (tags.search(n.tagName)) ?
                                              NodeFilter.FILTER_ACCEPT :  
                                              NodeFilter.FILTER_SKIP;
                                            }  
                                          },
                                        false);  
  }
  else {
    set = [];
    try {
      for(var i = 0, m = tags.length; i < m; i+=1) {
        // cannot call get on document so check for root parameter
        // and if it does not exist call get globally
        if (root == document || root === undefined) {
          (function(elem){set[set.length]=elem;}).Iterate(get(tags[i])());          
        }
        else {
          (function(elem){set[set.length]=elem;}).Iterate(root.get(tags[i])());
        }

      }
    } catch(e) {alert("Error thrown in getSet()");report_errors(e);}
  }
  return set;      
}

function assignToDOM(fn, fn_name, obj) {  
  var elem;
  if (obj.childNodes && obj.childNodes.length > 0) {
    elem = obj.firstChild;
    do {
      if (elem.nodeType == Node.ELEMENT_NODE) {
        elem[fn_name] = fn;
        assignToDOM(fn, fn_name, elem);
      }
    } while (( elem = elem.nextSibling ));
  }
}

function __initDOMCrawler() {
  if (typeof HTMLElement !== String(undefined)) { HTMLElement.prototype.get = get; } 
  else { assignToDOM(get, 'get', get('body')(0)); }
}

// assign a group of styles to a DOM node where the styles are
// stores as an object {property_1:value_1, .. , property_n:value_n}
function defineCSS(obj, styles) {
  //if (styles instanceof Object) {
  if (typeof styles === "object") {
    for (var prop in styles) {
      obj.style[prop] = styles[prop];    
    }  
  }  
}

// calculate the computed style for a element
function getStyle(elem, ieStyle, cssStyle) {
  if (elem.currentStyle) {
    return elem.currentStyle[ieStyle];  
  }  
  else if (window.getComputedStyle) {
    var comp = window.getComputedStyle(elem, "");
    return comp.getPropertyValue(cssStyle);  
  }
  return "";    
}

// recursively iterate through the DOM tree building
// output in global variable <str>
var str = "", TAB = " ";
function walkDOM(obj, tabs) {
  var elem;
  if (tabs === undefined) { tabs = ""; }
  if (obj.childNodes && obj.childNodes.length > 0) {
    elem = obj.firstChild;
    do {
      str += (tabs + elem.nodeName + ":" + elem.nodeType + "\n\r");
      walkDOM(elem, tabs + TAB);
    } while (( elem = elem.nextSibling ));
  }
}

// -----------------------------
// -- Standard DHTML Routines --
// -----------------------------
function getInsideWidth(){if(window.innerWidth){return window.innerWidth;}else if(document.documentElement.clientWidth&&document.documentElement.clientWidth!==0){return document.documentElement.clientWidth;}else if(document.body&&document.body.clientWidth){return document.body.clientWidth;}else{return 0;}}
function getInsideHeight(){if(window.innerHeight){return window.innerHeight;}else if(document.documentElement.clientHeight&&document.documentElement.clientWidth!==0){return document.documentElement.clientHeight;}else if(document.body&&document.body.clientWidth){return document.body.clientHeight;}else{return 0;}}
//function getPosObj(elem){var coords={x:0,y:0};if(elem.offsetParent){while(elem.offsetParent){coords.x+=elem.offsetLeft;coords.y += elem.offsetTop;elem=elem.offsetParent;}}coords.x=parseInt(coords.x);coords.y=parseInt(coords.y);return coords;}
function getPosObj(elem){var coords={x:0,y:0};do{coords.x+=elem.offsetLeft;coords.y += elem.offsetTop;elem=elem.offsetParent;}while(elem.offsetParent);coords.x=parseInt(coords.x);coords.y=parseInt(coords.y);return coords;}
function getPosEvtScr(e){var coords={x:0,y:0};if(e.pageX){coords.x=e.pageX;coords.y=e.pageY;}else if(e.clientX){var b=get('body')(0);coords.x=e.clientX+b.scrollLeft-b.clientLeft;coords.y=e.clientY+b.scrollTop-b.clientTop;if(b.parentElement&&b.parentElement.clientLeft){p=b.parentElement;coords.x+=p.scrollLeft-p.clientLeft;coords.y+=p.scrollTop-p.clientTop;}}coords.x=parseInt(coords.x);coords.y=parseInt(coords.y);return coords;}
function getPosEvtObj(e,elem){var coords={x:0,y:0},pScr=getPosEvtScr(e),pElem=getPosObj(elem);coords.x=parseInt(pScr.x-pElem.x);coords.y=parseInt(pScr.y-pElem.y);return coords;}
function getObjSize(elem){var size={w:0,h:0};size.h=parseInt(elem.offsetHeight);size.w=parseInt(elem.offsetWidth);return size;}

// ------------------------------
// ------ Event Management ------
// ------------------------------

/**
 * @updated     31/03/05 23:45
 *
 * Temporary resolution to memory leakage issues in IE particular and possibly Firefox
 * Implemented new EventManager class. 
 * This is based on Keith Gaughan's class @ http://talideon.com/weblog/2005/03/js-memory-leaks.cfm
 * Extended the code to ensure capture is not ignored with restricted default false value
* ::TODO:: replace the with block - performance ?
 */

var EventManager =
{
  _registry: null,
  
  Initialise: function() {
    if (this._registry === null) {
      this._registry = [];
EventManager.Add(window, 'unload', this.CleanUp); 
    }
  },

  Add: function(obj, type, fn, capture) {
   
    this.Initialise();
    
    // Not needed since addEventListener will default the capture 
// parameter value to false if it is undefined
    capture = Boolean(capture);
              
// If a string was passed assume working with an ID value
    if (typeof obj == "string") {
      obj = ref(obj);
    }
    if (obj === undefined || fn === undefined) {
      return false;
    }

    // W3C DOM Event Listeners
    if (obj.addEventListener) {
      obj.addEventListener(type, fn, capture);
      this._registry.push({obj: obj, type: type, fn: fn, capture: capture});
      return true;
    }

    // IE Proprietary DOM Event Listeners
    else if (obj.attachEvent && obj.attachEvent("on" + type, fn)) {
      this._registry.push({obj: obj, type: type, fn: fn});
      return true;
    }

    return false;
  },

  CleanUp: function() {
    for (var i = EventManager._registry.length - 1; i >= 0; i-=1) {
      with (EventManager._registry[i]) {
        if (obj.removeEventListener) {
          obj.removeEventListener(type, fn, Boolean(capture));
        }
        else if (obj.detachEvent) {
          obj.detachEvent("on" + type, fn);
        }
      }
    }

// kill the registry itself to remove last remaining references
    EventManager._registry = null;
  }
};

// ----------------------------
// ------ Event Listener ------
// ----------------------------

/**
 * Acts as a wrapper for some of the common event handling methods
 *
 * @udpate      31/03/05 23:54
 * Use the EventManager object to handle memory leakages
 */

/**
 * @abstract
 */
function EventListener(elem) {
  
  this.elem = elem;
  this.evt = "";
      
  this.invoke = function(evt) {
    this.evt = (evt) ? evt :
      ((window.event) ? window.event : null);
  };  
  
  this.cancelDefault = function() {
    if (this.evt) {
      if (this.evt.preventDefault) {
        this.evt.preventDefault();
      }
      this.evt.returnValue = false;        
    }
  };
  
  this.register = function(handler,fn) {
    //if (handler instanceof Array) {
    if (typeof handler === "array") {
      for(var i=0;i<handler.length; i+=1) {
        EventManager.Add(this.elem,handler[i],fn);
      }
    }
    else { EventManager.Add(this.elem,handler,fn); }
  };  

// ::TODO:: map a remove method to the EventManager object  
//  this.unregister = function(handler, fn) {
//    if (handler instanceof Array) {
//      for (var i = 0; i < handler.length; i+=1) {      
//        removeEvent(this.elem, handler[i], fn);  
//      }    
//    }
//    else { removeEvent(this.elem, handler, fn); }
//  };   
  
}

// Just some other event handling routines in global space
function getTarget(evt){if(!evt)evt=window.event;if(evt){var elem=(evt.target)?evt.target:((evt.srcElement)?evt.srcElement:null);while(elem.nodeType==Node.TEXT_CONTENT){elem=elem.parentNode;}return elem;}}

function cancelPropogation(evt)
{
  if (!evt) evt = window.event;
  evt.cancelBubble = true; /* ie */
  if (evt.stopPropagation) {
   evt.stopPropagation();  
  }
}
function cancelDefault(evt){if(evt){if(evt.preventDefault){evt.preventDefault();}evt.returnValue=false;}}
function addLoadEvent(func){if(document.getElementById&&document.createTextNode){var oldonload=window.onload;if(typeof window.onload!='function'){window.onload=func;}else{window.onload=function(){oldonload();func();}}}}
function addEvent(obj,evType,fn,useC){if(obj.addEventListener){obj.addEventListener(evType,fn,useC);return true;}else if(obj.attachEvent){var r=obj.attachEvent("on"+evType,fn);return r;}else{alert("Browser does not support event attachment");return null}} 
function removeEvent(obj,evType,fn,useC){if(obj.removeEventListener){obj.removeEventListener(evType,fn,useC);return true;}else if(obj.detachEvent){var r=obj.detachEvent("on"+evType,fn);return r;}else{alert("Browser does not support event detachment");return null}}

EventManager.Add(window, 'load', function() {  __initDOMCrawler(); });

// Defunct - Implementing EventManager instead 
// clean up routine for WinIE to avoid memory leaks
// this can take around 0.6s for 500+ DOM nodes!
//if(typeof window.attachEvent != 'undefined')
//{
//  window.attachEvent('onunload', function()
//  {
//    // loop through every item in the document collection
//    // var start = new Date();
//    for(var i=0,m=document.all.length;i<m;i++) {
//      document.all[i]['onmouseover'] = null;
//      document.all[i]['onmouseout'] = null;      
//      document.all[i]['onmousemove'] = null;      
//      document.all[i]['onfocus'] = null;      
//      document.all[i]['onblur'] = null;      
//      document.all[i]['onclick'] = null;      
//    }
//    // var end = new Date();
//    // var time = end.getTime() - start.getTime();
//    // alert(i + " DOM nodes cleaned.\nClean up took " + time + "ms.");
//    if (typeof req == "object") {req = null;}
//  });
//} }  
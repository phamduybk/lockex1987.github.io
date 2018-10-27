function doStuff(el){
  el.style.backgroundColor = 'blue';
  el.style.color = 'white';
}

$('.reset').on('click', function() {
  // Remove any styles applied to block elements
  $(this).parent().find('*').removeAttr('style');
});

// 1) jQuery
$('.jquery-delegate').on('click', '.delegated', function() {
  doStuff(this);
});

// 2) Pure JS with checking event.target only
document.querySelector('.pure-js-event-target').addEventListener('click', function(event) {
    var clickedEl = event.target;
    if (clickedEl.classList.contains('delegated')) {
      doStuff(clickedEl);
    }
});

// 3) Pure JS with checking all nodes between
var isSame = document.body.isEqualNode ? 'isEqualNode' : 'isSameNode';

function delegate(wrapperEl, eventName, delegatedElClass, action) {
  wrapperEl.addEventListener(eventName, function(event) {
    var clickedEl = event.target;
    var checkingNode = clickedEl;
    while (checkingNode) {
      if (checkingNode[isSame](wrapperEl)) {
        // checking element itself
        // STOP loop
        checkingNode = undefined;
      } else {
        if (checkingNode.classList.contains(delegatedElClass)) {
          // found delegated element
          action.call(checkingNode, event);// "this" will be delegated el
          // STOP loop
          checkingNode = undefined;
        } else {
          // going to parent node
          checkingNode = checkingNode.parentNode;
        }
      }
    }
  });
}

var fixedBoxEl = document.querySelector('.pure-js-delegate');
delegate(fixedBoxEl, 'click', 'delegated', function(event) {
  doStuff(this);
});

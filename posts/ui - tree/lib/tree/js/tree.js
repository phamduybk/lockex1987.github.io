function handleExpandTreeEvent() {
  document.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('tick')) {
      var tick = evt.target;
      tick.classList.toggle('expanded');
      var nextList = tick.nextElementSibling;
      nextList.classList.toggle('expanded');
    }
  });
}

handleExpandTreeEvent();
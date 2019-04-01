// https://github.com/k-ivan/Tags

// Use
var tags = new Tags('.tagged');

document.getElementById('get').addEventListener('click', function(e) {
  e.preventDefault();
  alert(tags.getTags());
});

document.getElementById('clear').addEventListener('click', function(e) {
  e.preventDefault();
  tags.clearTags();
});

document.getElementById('add').addEventListener('click', function(e) {
  e.preventDefault();
  tags.addTags('New');
});

document.getElementById('addArr').addEventListener('click', function(e) {
  e.preventDefault();
  tags.addTags(['Steam Machines', 'Nintendo Wii U', 'Shield Portable']);
});

document.getElementById('destroy').addEventListener('click', function(e) {
  e.preventDefault();
  if (this.textContent === 'destroy') {
    tags.destroy();
    this.textContent = 'reinit';
  } else {
    this.textContent = 'destroy';
    tags = new Tags('.tagged');
  }
});
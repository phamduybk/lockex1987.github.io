const values = [50, 5.5, 470];
const inputs = Array.from(document.querySelectorAll('.value'));
const oldValues = Array.from(document.querySelectorAll('.old-value'));
oldValues.forEach((oldValue, i) => {
  oldValue.innerHTML = `<div class="old-value-text"><span class="old-value-sub">${values[i]}</span> ↗</div>`;
})
inputs.forEach((input, i) => {
  input.value = values[i];
  input.addEventListener('input', (ev) => {
    if (input.value !== values[i].toString()) {
      input.classList.add('active');
    } else {
      input.classList.remove('active');
    }
  });
});
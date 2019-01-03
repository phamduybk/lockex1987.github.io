// just helper stuff for example controls
// not needed for actual tooltips
let input = document.querySelector('input')
let output = document.querySelector('textarea')
let main = document.querySelector('.examples')
let tooltips = main.querySelectorAll('[tooltip]')

input.addEventListener('keyup', (e) => {
  tooltips.forEach(function(element) {
    element.setAttribute('tooltip', e.target.value)
  })
})
input.addEventListener('focus', (e) => {
  main.classList.add('helper')
})
input.addEventListener('blur', (e) => {
  main.classList.remove('helper')
})

document.addEventListener('mouseover', (e) => {
 if(e.target.tagName === 'SPAN') {
   output.value = e.target.outerHTML
 }
})
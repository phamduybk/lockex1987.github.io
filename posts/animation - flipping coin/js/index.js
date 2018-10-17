let flippin = false, doc = document;
doc.querySelector('.coin').addEventListener('click', e => {
  if(flippin) return false; flippin = true;
  
  //declare objects to animate, remove any existing anim
  let objs = doc.querySelectorAll('.line, .coin');
  objs.forEach((line) => line.classList.remove('anim'));
  
  //choose heads or tails
  let winner = Math.random() > 0.5 ? '900deg' : '720deg';
  doc.querySelector(':root').style.setProperty('--flips', winner)
  
  //apply animation and wait for completion
  setTimeout(() => {
    objs.forEach((line) => line.classList.add('anim'));
    e.target.addEventListener('animationend', () => flippin = false);
  });
});

//click once on load for the thumbnail
setTimeout(() => doc.querySelector('.coin').click(), 750)
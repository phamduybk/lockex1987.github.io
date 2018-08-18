const mouth = document.querySelector('.avatar_mouth');
const avatar = document.querySelector('.avatar');
const container = document.querySelector('.container');
const eyeL = document.querySelector(".avatar_pupil--left");
const eyeR = document.querySelector(".avatar_pupil--right");

document.querySelector('#email').addEventListener('input', (ev) => {
  mouth.style.height = `${ev.target.value.length * 2}px`;
});

document.querySelector('#name').addEventListener('input', (ev) => {
  if (ev.target.value != '') { container.classList.add('visible'); }
  else { container.classList.remove('visible'); }
});

document.querySelector('#address').addEventListener('input', (ev) => {
  if (ev.target.value != '') { container.classList.add('address'); }
  else { container.classList.remove('address'); }
});

document.querySelector('#female').addEventListener('change', (ev) => {
  avatar.classList.remove('male');
  avatar.classList.add('female');
});

document.querySelector('#male').addEventListener('change', (ev) => {
  avatar.classList.remove('female');
  avatar.classList.add('male');});


const handleEye = (eye, event) => {
  const b = eye.getBoundingClientRect();
  const x = (b.left) + (b.width / 2);
  const y = (b.top) + (b.height / 2);
  const rad = Math.atan2(event.pageX - x, event.pageY - y);
  const rot = (rad * (180 / Math.PI) * -1) + 180;
  eye.style.transform = `rotate(${rot}deg)`;
}

document.addEventListener('mousemove', (ev) => { 
  handleEye(eyeL, ev);
  handleEye(eyeR, ev);
});
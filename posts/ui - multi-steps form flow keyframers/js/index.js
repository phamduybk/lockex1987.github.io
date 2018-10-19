console.clear();

var elApp = document.querySelector('#app');
var elNextButtons = Array.from(document.querySelectorAll('button:not(#submit)'));
var elSubmitButton = document.querySelector('#submit');
var elAnimationHelp = document.querySelector('#animation-help');
var elStep3Button = document.querySelector('#step-3-button');

var flipping = new Flipping();var _xstate =

xstate,Machine = _xstate.Machine;

var insuranceMachine = xstate.Machine({
  initial: elApp.dataset.state || 'step-1',
  states: {
    'step-1': {
      on: {
        NEXT: 'step-2' } },


    'step-2': {
      on: {
        NEXT: 'step-3' } },


    'step-3': {
      on: {
        NEXT: 'step-4' } },


    'step-4': {
      on: {
        NEXT: 'step-5' } },


    'step-5': {
      on: {
        SUBMIT: 'step-1' } },


    finished: {} } });



var currentState = insuranceMachine.initialState;

function setStateAttributes(state) {
  // change data-state attribute
  elApp.dataset.state = state;

  // remove any active data-attributes
  document.querySelectorAll('[data-active]').forEach(function (el) {
    delete el.dataset.active;
  });

  // add active data-attributes to proper elements
  document.querySelectorAll('\n    [data-show~="' +
  state + '"],\n    [data-hide]:not([data-hide~="' +
  state + '"])').
  forEach(function (el) {
    el.dataset.active = true;
  });
}

function send(event) {
  currentState = insuranceMachine.
  transition(currentState, event);

  setStateAttributes(currentState.value);
}

setStateAttributes(currentState.value);

elNextButtons.forEach(function (elButton) {return elButton.addEventListener('click', function () {
    send('NEXT');
  });});

elSubmitButton.addEventListener('click', function () {
  send('SUBMIT');
});

// -------------
elAnimationHelp.addEventListener('change', flipping.wrap(function (e) {
  if (e.target.checked) {
    elStep3Button.dataset.clickable = true;
  } else {
    delete elStep3Button.dataset.clickable;
  }
}));
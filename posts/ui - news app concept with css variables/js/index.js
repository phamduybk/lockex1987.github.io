var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var nav = document.querySelector('.ui-nav');
var navItems = document.querySelectorAll('.ui-nav-item');
var app = document.querySelector('#app');
var appRect = app.getBoundingClientRect();

var log = console.log.bind(console);
var mapValues = function mapValues(obj, iteratee) {
  var res = {};
  Object.keys(obj).forEach(function (key) {return res[key] = iteratee(obj[key], key, obj);});

  return res;
};

var clamp = function clamp(min, max) {return function (val) {return Math.min(Math.max(min, val), max);};};

var colors = {
  0: ['#2F6692', '#231133'],
  1: ['#9A45DB', '#4D88DB'],
  2: ['#FB2474', '#934CDB'],
  3: ['#FB9C2C', '#FD2472'],
  4: ['#D8D6CD', '#FD9722'] };


RxCSS.set(app, {
  colors: colors });


var hNav = new Hammer(nav, {
  direction: Hammer.DIRECTION_ALL });


hNav.get('pan').
set({ direction: Hammer.DIRECTION_ALL });

var pan$ = Rx.Observable.
fromEventPattern(function (h) {return hNav.on('panstart panup pandown panleft panright panend', h);}).
map(function (event) {return {
    key: +event.target.getAttribute('data-key'),
    type: event.type,
    deltaX: event.deltaX,
    deltaY: event.deltaY };});


var initialState = {
  appState: 'START',
  panning: false,
  x: 0,
  dx: 0,
  n: undefined };


var af$ = Rx.Observable.interval(0, Rx.Scheduler.animationFrame);

var Flipper = new Flipping({
  onFlip: function onFlip(_ref) {var key = _ref.key,delta = _ref.delta,node = _ref.node;return RxCSS.set(node, { delta: delta });} });


var flip$ = Rx.Observable.
fromEventPattern(function (h) {return Flipper.on('flip', h);}).
map(function (flip) {return { type: 'flip', deltas: flip };});

var action$ = pan$.
merge(flip$);

var setNthItemClass = function setNthItemClass(n) {
  var navItem = navItems[n - 1];
  var prevNavItem = navItems[n - 2];

  var currActive = document.querySelector('.ui-nav-item.active');
  var currPrevActive = document.querySelector('.ui-nav-item.prev-active');
  if (currActive === navItem) return;

  currActive && currActive.classList.remove('active');
  currPrevActive && currPrevActive.classList.remove('prev-active');

  navItem.classList.add('active');
  prevNavItem && prevNavItem.classList.add('prev-active');
};

var machine = {
  START: {
    panup: 'NAV1',
    pandown: 'START' },

  NAV1: {
    panup: 'NAV2',
    pandown: 'START' },

  NAV2: {
    pandown: 'NAV1',
    panup: 'NAV2' } };



var state$ = action$.
startWith(initialState).
scan(function (state, action) {
  var panning = {
    'panstart': true,
    'panend': false }[
  action.type];
  if (panning === undefined) panning = state.panning;

  if (action.type === 'panstart' && state.appState === 'START') {
    return _extends({},
    state, {
      n: action.key,
      direction: 'y' });

  }

  if (!state.pending && (action.type === 'panup' || action.type === 'pandown') && state.direction !== 'x') {
    return _extends({},
    state, {
      prevState: state.appState,
      appState: machine[state.appState][action.type],
      direction: 'y',
      pending: true,
      panning: true,
      changed: true });

  }

  if (state.pending && (action.type === 'panup' || action.type === 'pandown')) {
    var dy = state.dy;
    if (state.appState === 'NAV1' && state.prevState === 'START') {
      dy = clamp(-75, 0)(action.deltaY);
    } else if (state.appState === 'NAV1' && state.prevState === 'NAV2') {
      dy = clamp(0, 75)(action.deltaY);
    } else if (state.appState === 'NAV2') {
      dy = clamp(-75, 100)(action.deltaY);
    } else if (state.appState === 'START') {
      dy = clamp(0, 75)(action.deltaY);
    }

    return _extends({},
    state, {
      dy: dy });

  }

  var n = state.n;
  if (action.type === 'panend') {
    if (state.appState === 'START') {
      n = undefined;
    } else if (state.dx > 100) {
      n = n - 1;
    } else if (state.dx < -100) {
      n = n + 1;
    }

    return _extends({},
    state, {
      n: clamp(1, 4)(n),
      dx: 0,
      dy: 0,
      type: action.type,
      pending: false,
      panning: false,
      changed: false,
      direction: undefined });

  }

  var direction = action.type === 'panend' ?
  undefined :
  state.direction ||
  {
    panleft: 'x',
    panright: 'x',
    panup: 'y',
    pandown: 'y',
    panend: undefined }[
  action.type];

  return _extends({},
  state, {
    n: n,
    direction: direction,
    panning: panning,
    type: action.type,
    x: action.type === 'panend' ?
    0 :
    state.x,
    dx: action.type === 'panend' || direction === 'y' ?
    0 :
    action.deltaX || state.dx,
    dy: action.type === 'panend' || direction === 'x' ?
    0 :
    action.deltaY || state.dy });

}).share();

state$.subscribe(function (state) {
  var end = state.type === 'panend';

  if (end) {
    navItems.forEach(function (item) {return RxCSS.set(item, { delta: { top: 0, left: 0 } });});
  }

  nav.style.
  setProperty('--nav-panning', +state.panning);

  if (state.changed) {
    Flipper.read();
    if (state.pending) {
      app.setAttribute('data-pending', true);
    } else {
      app.removeAttribute('data-pending');
    }
    app.setAttribute('data-state', state.appState);
    app.setAttribute('data-prev-state', state.prevState);

    Flipper.flip();
  }

  if (!state.pending) {
    app.removeAttribute('data-pending');
  }

  if (state.n) setNthItemClass(state.n);

  var px = state.dx / appRect.width;
  RxCSS.set(document.body, {
    gradient: colors[state.n || 0],
    pending: state.pending,
    'not-pending': !state.pending,
    panning: state.panning,
    'not-panning': !state.panning,
    n: state.n,
    x: '-' + (state.n - 1) * 100 + '%',
    dx: state.dx,
    dy: state.dy,
    px: px,
    'px-abs': Math.abs(state.dx / appRect.width),
    py: !state.prevState ? 0 : state.dy / {
      START: { NAV1: 75 },
      NAV1: { START: -75, NAV2: 75 },
      NAV2: { NAV1: -75 } }[
    state.prevState][state.appState] });

});
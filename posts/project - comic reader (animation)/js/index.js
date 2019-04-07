var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _templateObject = _taggedTemplateLiteral(["\n  padding: 0.25rem 0.75rem;\n  font-size: 1.3rem;\n  background: ", ";\n  border-radius: 3px;\n  display: inline-block;\n  border: 2px solid #444;\n  cursor: pointer;\n  transition: 0.25s;\n  ", " \n  &:hover {\n    transform: scale(1.05);\n  }\n  &:active {\n    transform: scale(0.95);\n  }\n"], ["\n  padding: 0.25rem 0.75rem;\n  font-size: 1.3rem;\n  background: ", ";\n  border-radius: 3px;\n  display: inline-block;\n  border: 2px solid #444;\n  cursor: pointer;\n  transition: 0.25s;\n  ", " \n  &:hover {\n    transform: scale(1.05);\n  }\n  &:active {\n    transform: scale(0.95);\n  }\n"]),_templateObject2 = _taggedTemplateLiteral(["\n  box-sizing: border-box;\n  width: 98%;\n  max-height: 165px;\n  height: 30vw;\n  position: relative;\n  overflow: hidden;\n  margin: 1%;\n  background: #66323f;\n  border: 5px solid black;\n  animation-play-state: paused;\n  cursor: pointer;\n\n  div,\n  img {\n    position: absolute;\n    height: 100%;\n    top: 0;\n    left: -22%;\n    width: 140%;\n    animation-play-state: inherit;\n  }\n\n  .figures {\n    transform: translate(0%, 20%);\n  }\n\n  .shadows {\n    transform: translate(0%, 40%) scale(1);\n  }\n\n  .text {\n    transform: translate(0%, 40%);\n    opacity: 0;\n  }\n\n  &.animated {\n    .figures {\n      animation: tile1-figures 5s forwards;\n    }\n\n    @keyframes tile1-figures {\n      0% {\n        transform: translate(0%, 20%);\n      }\n      70%,\n      100% {\n        transform: translate(0%, 0%);\n      }\n    }\n\n    .shadows {\n      animation: tile1-shadows 5s forwards;\n    }\n\n    @keyframes tile1-shadows {\n      0% {\n        transform: translate(0%, 40%) scale(1);\n      }\n      70%,\n      100% {\n        transform: translate(0%, 0%) scale(1);\n      }\n    }\n\n    .text {\n      animation: tile1-text 5s forwards;\n    }\n\n    @keyframes tile1-text {\n      0% {\n        transform: translate(0%, 40%);\n        opacity: 0;\n      }\n      70% {\n        opacity: 1;\n      }\n      100% {\n        transform: translate(0%, 0%);\n        opacity: 1;\n      }\n    }\n\n    .highlight {\n      top: 0;\n      left: 0;\n      background: linear-gradient(\n        to bottom,\n        rgba(248, 80, 50, 0) 0%,\n        rgba(242, 184, 82, 0) 37%,\n        rgba(240, 220, 93, 0.12) 50%,\n        rgba(240, 220, 93, 0) 75%\n      );\n      background-size: 300%;\n      animation: tile1-highlight 5s infinite;\n    }\n\n    @keyframes tile1-highlight {\n      0% {\n        background-position: top;\n      }\n      100% {\n        background-position: bottom;\n      }\n    }\n  }\n"], ["\n  box-sizing: border-box;\n  width: 98%;\n  max-height: 165px;\n  height: 30vw;\n  position: relative;\n  overflow: hidden;\n  margin: 1%;\n  background: #66323f;\n  border: 5px solid black;\n  animation-play-state: paused;\n  cursor: pointer;\n\n  div,\n  img {\n    position: absolute;\n    height: 100%;\n    top: 0;\n    left: -22%;\n    width: 140%;\n    animation-play-state: inherit;\n  }\n\n  .figures {\n    transform: translate(0%, 20%);\n  }\n\n  .shadows {\n    transform: translate(0%, 40%) scale(1);\n  }\n\n  .text {\n    transform: translate(0%, 40%);\n    opacity: 0;\n  }\n\n  &.animated {\n    .figures {\n      animation: tile1-figures 5s forwards;\n    }\n\n    @keyframes tile1-figures {\n      0% {\n        transform: translate(0%, 20%);\n      }\n      70%,\n      100% {\n        transform: translate(0%, 0%);\n      }\n    }\n\n    .shadows {\n      animation: tile1-shadows 5s forwards;\n    }\n\n    @keyframes tile1-shadows {\n      0% {\n        transform: translate(0%, 40%) scale(1);\n      }\n      70%,\n      100% {\n        transform: translate(0%, 0%) scale(1);\n      }\n    }\n\n    .text {\n      animation: tile1-text 5s forwards;\n    }\n\n    @keyframes tile1-text {\n      0% {\n        transform: translate(0%, 40%);\n        opacity: 0;\n      }\n      70% {\n        opacity: 1;\n      }\n      100% {\n        transform: translate(0%, 0%);\n        opacity: 1;\n      }\n    }\n\n    .highlight {\n      top: 0;\n      left: 0;\n      background: linear-gradient(\n        to bottom,\n        rgba(248, 80, 50, 0) 0%,\n        rgba(242, 184, 82, 0) 37%,\n        rgba(240, 220, 93, 0.12) 50%,\n        rgba(240, 220, 93, 0) 75%\n      );\n      background-size: 300%;\n      animation: tile1-highlight 5s infinite;\n    }\n\n    @keyframes tile1-highlight {\n      0% {\n        background-position: top;\n      }\n      100% {\n        background-position: bottom;\n      }\n    }\n  }\n"]),_templateObject3 = _taggedTemplateLiteral(["\n  box-sizing: border-box;\n  width: 98%;\n  overflow: hidden;\n  position: relative;\n  margin: 1%;\n  animation-play-state: paused;\n  border: 5px solid black;\n  background: #fcfbfb;\n  cursor: pointer;\n\n  img {\n    display: block;\n  }\n\n  .scene {\n    position: relative;\n    width: 100%;\n    transform: translate(-130%, 0%) scale(2);\n  }\n\n  &.animated {\n    .scene {\n      animation: 1s tile2-move-cover forwards;\n    }\n  }\n\n  @keyframes tile2-move-cover {\n    0% {\n      transform: translate(-130%, 0%) scale(2);\n    }\n    100% {\n      transform: translate(0%, 0%) scale(1);\n    }\n  }\n"], ["\n  box-sizing: border-box;\n  width: 98%;\n  overflow: hidden;\n  position: relative;\n  margin: 1%;\n  animation-play-state: paused;\n  border: 5px solid black;\n  background: #fcfbfb;\n  cursor: pointer;\n\n  img {\n    display: block;\n  }\n\n  .scene {\n    position: relative;\n    width: 100%;\n    transform: translate(-130%, 0%) scale(2);\n  }\n\n  &.animated {\n    .scene {\n      animation: 1s tile2-move-cover forwards;\n    }\n  }\n\n  @keyframes tile2-move-cover {\n    0% {\n      transform: translate(-130%, 0%) scale(2);\n    }\n    100% {\n      transform: translate(0%, 0%) scale(1);\n    }\n  }\n"]),_templateObject4 = _taggedTemplateLiteral(["\n  width: 44%;\n  margin: 1% 0 1% 1%;\n  position: relative;\n  overflow: hidden;\n  box-sizing: border-box;\n  background: #83bddd;\n  border: 5px solid black;\n  float: left;\n  cursor: pointer;\n\n  img {\n   display: block;\n  }\n\n  @media (max-width: 450px) {\n    width: 98%;\n    margin: 1%;\n  }\n\n  .figures {\n    box-shadow: 0px 0px 30px 17px rgba(0, 0, 0, 0.28);\n    box-sizing: border-box;\n    width: 100%;\n    transform: translate(0%, 90%);\n  }\n\n  &.animated {\n    .figures {\n      animation: tile2-figures 1s forwards;\n    }\n  }\n\n  @keyframes tile2-figures {\n    0% {\n      transform: translate(0%, 90%);\n    }\n    100% {\n      transform: translate(0%, 0%);\n    }\n  }\n\n  .text {\n    position: absolute;\n    top: 0;\n    left: 0;\n    opacity: 0;\n  }\n\n  &.animated {\n    .text {\n      animation: title2-text 1s 1s forwards;\n    }\n    @keyframes title2-text {\n      0% {\n        opacity: 0;\n      }\n      100% {\n        opacity: 1;\n      }\n    }\n  }\n"], ["\n  width: 44%;\n  margin: 1% 0 1% 1%;\n  position: relative;\n  overflow: hidden;\n  box-sizing: border-box;\n  background: #83bddd;\n  border: 5px solid black;\n  float: left;\n  cursor: pointer;\n\n  img {\n   display: block;\n  }\n\n  @media (max-width: 450px) {\n    width: 98%;\n    margin: 1%;\n  }\n\n  .figures {\n    box-shadow: 0px 0px 30px 17px rgba(0, 0, 0, 0.28);\n    box-sizing: border-box;\n    width: 100%;\n    transform: translate(0%, 90%);\n  }\n\n  &.animated {\n    .figures {\n      animation: tile2-figures 1s forwards;\n    }\n  }\n\n  @keyframes tile2-figures {\n    0% {\n      transform: translate(0%, 90%);\n    }\n    100% {\n      transform: translate(0%, 0%);\n    }\n  }\n\n  .text {\n    position: absolute;\n    top: 0;\n    left: 0;\n    opacity: 0;\n  }\n\n  &.animated {\n    .text {\n      animation: title2-text 1s 1s forwards;\n    }\n    @keyframes title2-text {\n      0% {\n        opacity: 0;\n      }\n      100% {\n        opacity: 1;\n      }\n    }\n  }\n"]),_templateObject5 = _taggedTemplateLiteral(["\n  width: 53%;\n  margin: 1%;\n  position: relative;\n  float: right;\n  background: #83bddd;\n  overflow: hidden;\n  border: 5px solid black;\n  box-sizing: border-box;\n  cursor: pointer;\n\n  img {\n    display: block;\n  }\n\n  @media (max-width: 450px) {\n    width: 98%;\n    margin: 1%;\n  }\n\n  .ground {\n    position: absolute;\n    bottom: 0;\n    width: 110%;\n  }\n\n  .hero {\n    width: 50%;\n    position: absolute;\n    bottom: 0;\n    right: 5%;\n    transform: translate(100%, 0%);\n  }\n\n  &.animated {\n    .hero {\n      animation: tile-4-hero 1s forwards;\n    }\n    @keyframes tile-4-hero {\n      0% {\n        transform: translate(100%, 0%);\n      }\n      100% {\n        transform: translate(0%, 0%);\n      }\n    }\n  }\n\n  .enemies {\n    position: relative;\n    transform: translate(100%, 0%) scale(.5);\n  }\n\n  &.animated {\n    .enemies {\n      animation: tile-4-enemies 0.5s 0.5s forwards;\n    }\n    @keyframes tile-4-enemies {\n      0% {\n        transform: translate(100%, 0%) scale(.5);\n      }\n      100% {\n        transform: translate(0%, 0%) scale(1);\n      }\n    }\n  }\n"], ["\n  width: 53%;\n  margin: 1%;\n  position: relative;\n  float: right;\n  background: #83bddd;\n  overflow: hidden;\n  border: 5px solid black;\n  box-sizing: border-box;\n  cursor: pointer;\n\n  img {\n    display: block;\n  }\n\n  @media (max-width: 450px) {\n    width: 98%;\n    margin: 1%;\n  }\n\n  .ground {\n    position: absolute;\n    bottom: 0;\n    width: 110%;\n  }\n\n  .hero {\n    width: 50%;\n    position: absolute;\n    bottom: 0;\n    right: 5%;\n    transform: translate(100%, 0%);\n  }\n\n  &.animated {\n    .hero {\n      animation: tile-4-hero 1s forwards;\n    }\n    @keyframes tile-4-hero {\n      0% {\n        transform: translate(100%, 0%);\n      }\n      100% {\n        transform: translate(0%, 0%);\n      }\n    }\n  }\n\n  .enemies {\n    position: relative;\n    transform: translate(100%, 0%) scale(.5);\n  }\n\n  &.animated {\n    .enemies {\n      animation: tile-4-enemies 0.5s 0.5s forwards;\n    }\n    @keyframes tile-4-enemies {\n      0% {\n        transform: translate(100%, 0%) scale(.5);\n      }\n      100% {\n        transform: translate(0%, 0%) scale(1);\n      }\n    }\n  }\n"]),_templateObject6 = _taggedTemplateLiteral(["\n  box-sizing: border-box;\n  width: 53%;\n  float: right;\n  margin: 1% 1% 1% 0;\n  border: 5px solid black;\n  position: relative;\n  background: #79b06c;\n  overflow: hidden;\n  cursor: pointer;\n\n  @media (max-width: 450px) {\n    width: 98%;\n    margin: 1%;\n  }\n\n  .ground {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    transform: translate(0%, -100%) scale(2);\n  }\n\n  .figures {\n    position: relative;\n    transform: translate(0%, -100%) scale(2);\n  }\n\n  &.animated {\n    .figures,\n    .ground {\n      animation: tile-5-figures 1s forwards ease-in;\n    }\n\n    @keyframes tile-5-figures {\n      0% {\n        transform: translate(0%, -100%) scale(2);\n      }\n      100% {\n        transform: translate(0%, 0%) scale(1);\n      }\n    }\n  }\n\n  .zap {\n    position: absolute;\n    left: 0;\n    bottom: 1%;\n    opacity: 0;\n  }\n\n  &.animated {\n    .zap {\n      animation: tile-5-zap 1s 1s forwards ease-in;\n    }\n    @keyframes tile-5-zap {\n      0% {\n        opacity: 0;\n      }\n      100% {\n        opacity: 1;\n      }\n    }\n  }\n"], ["\n  box-sizing: border-box;\n  width: 53%;\n  float: right;\n  margin: 1% 1% 1% 0;\n  border: 5px solid black;\n  position: relative;\n  background: #79b06c;\n  overflow: hidden;\n  cursor: pointer;\n\n  @media (max-width: 450px) {\n    width: 98%;\n    margin: 1%;\n  }\n\n  .ground {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    transform: translate(0%, -100%) scale(2);\n  }\n\n  .figures {\n    position: relative;\n    transform: translate(0%, -100%) scale(2);\n  }\n\n  &.animated {\n    .figures,\n    .ground {\n      animation: tile-5-figures 1s forwards ease-in;\n    }\n\n    @keyframes tile-5-figures {\n      0% {\n        transform: translate(0%, -100%) scale(2);\n      }\n      100% {\n        transform: translate(0%, 0%) scale(1);\n      }\n    }\n  }\n\n  .zap {\n    position: absolute;\n    left: 0;\n    bottom: 1%;\n    opacity: 0;\n  }\n\n  &.animated {\n    .zap {\n      animation: tile-5-zap 1s 1s forwards ease-in;\n    }\n    @keyframes tile-5-zap {\n      0% {\n        opacity: 0;\n      }\n      100% {\n        opacity: 1;\n      }\n    }\n  }\n"]);function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}var styled = styled.default;var _React =
React,Component = _React.Component;

var StyledButton = styled.button(_templateObject,


function (props) {return props.background || "transparent";},





function (props) {return props.italic && "font-style: italic;";});








function Button(props) {
  return (
    React.createElement(StyledButton, _extends({ onClick: props.handleClick }, props),
      props.children));


}

var Tile1Container = styled.div(_templateObject2);











































































































var figures =
React.createElement("img", {
  src: "https://kurtpetrek.github.io/digital-comic-idea/images/tile-1/figures.svg",
  className: "figures",
  alt: "Some bad guys looking forwards" });



var shadows =
React.createElement("img", {
  src: "https://kurtpetrek.github.io/digital-comic-idea/images/tile-1/shadows.svg",
  className: "shadows",
  alt: "The shadows of the bad guys" });



var text =
React.createElement("img", {
  src: "https://kurtpetrek.github.io/digital-comic-idea/images/tile-1/text.svg",
  className: "text",
  alt: "Action text Krak Brak Zot" });var



Tile1 = function (_Component) {_inherits(Tile1, _Component);
  function Tile1(props) {_classCallCheck(this, Tile1);var _this = _possibleConstructorReturn(this, (Tile1.__proto__ || Object.getPrototypeOf(Tile1)).call(this,
    props));
    _this.state = {
      playState: "",
      animation: props.animation };


    _this.playAnimation = _this.playAnimation.bind(_this);return _this;
  }_createClass(Tile1, [{ key: "componentWillReceiveProps", value: function componentWillReceiveProps(

    nextProps) {
      if (nextProps.animation !== this.state.animation) {
        this.setState(function (prevState) {
          prevState.animation = nextProps;
          prevState.playState = "";
          return prevState;
        });
      }
    } }, { key: "playAnimation", value: function playAnimation()

    {
      this.setState(function (prevState) {return prevState.playState = "animated";});
    } }, { key: "render", value: function render()

    {
      return (
        React.createElement(Tile1Container, {
            className: this.state.playState,
            onClick: this.playAnimation },

          shadows,
          figures,
          text,
          React.createElement("div", { className: "highlight" })));


    } }]);return Tile1;}(Component);


var Tile2Container = styled.div(_templateObject3);




































var scene = React.createElement("img", { src: "https://kurtpetrek.github.io/digital-comic-idea/images/tile-2/scene.svg", className: "scene" });var

Tile2 = function (_Component2) {_inherits(Tile2, _Component2);
  function Tile2(props) {_classCallCheck(this, Tile2);var _this2 = _possibleConstructorReturn(this, (Tile2.__proto__ || Object.getPrototypeOf(Tile2)).call(this,
    props));
    _this2.state = {
      playState: "",
      animation: props.animation };

    _this2.launchAnimation = _this2.launchAnimation.bind(_this2);return _this2;
  }_createClass(Tile2, [{ key: "componentWillReceiveProps", value: function componentWillReceiveProps(

    nextProps) {
      if (nextProps.animation !== this.state.animation) {
        this.setState(function (prevState) {
          prevState.animation = nextProps;
          prevState.playState = "";
          return prevState;
        });
      }
    } }, { key: "launchAnimation", value: function launchAnimation()

    {
      this.setState(function (prevState) {
        prevState.playState = "animated";
        return prevState;
      });
    } }, { key: "render", value: function render()

    {
      return (
        React.createElement(Tile2Container, {
            onClick: this.launchAnimation,
            className: this.state.playState },

          scene));


    } }]);return Tile2;}(Component);


var Tile3Container = styled.div(_templateObject4);































































var figures3 = React.createElement("img", { src: "https://kurtpetrek.github.io/digital-comic-idea/images/tile-3/figures.svg", className: "figures" });

var text3 = React.createElement("img", { src: "https://kurtpetrek.github.io/digital-comic-idea/images/tile-3/text.svg", className: "text" });var

Tile3 = function (_Component3) {_inherits(Tile3, _Component3);
  function Tile3(props) {_classCallCheck(this, Tile3);var _this3 = _possibleConstructorReturn(this, (Tile3.__proto__ || Object.getPrototypeOf(Tile3)).call(this,
    props));
    _this3.state = {
      playState: "",
      animation: props.animation };

    _this3.triggerAnimation = _this3.triggerAnimation.bind(_this3);return _this3;
  }_createClass(Tile3, [{ key: "triggerAnimation", value: function triggerAnimation()

    {
      this.setState(function (prevState) {return prevState.playState = "animated";});
    } }, { key: "componentWillReceiveProps", value: function componentWillReceiveProps(

    nextProps) {
      if (nextProps.animation !== this.state.animation) {
        this.setState(function (prevState) {
          prevState.animation = nextProps;
          prevState.playState = "";
          return prevState;
        });
      }
    } }, { key: "render", value: function render()

    {
      return (
        React.createElement(Tile3Container, {
            className: this.state.playState,
            onClick: this.triggerAnimation },

          figures3,
          text3));


    } }]);return Tile3;}(Component);


var Tile4Container = styled.div(_templateObject5);



































































var ground = React.createElement("img", { src: "https://kurtpetrek.github.io/digital-comic-idea/images/tile-4/ground.svg", className: "ground" });

var hero = React.createElement("img", { src: "https://kurtpetrek.github.io/digital-comic-idea/images/tile-4/hero.svg", className: "hero" });

var enemies = React.createElement("img", { src: "https://kurtpetrek.github.io/digital-comic-idea/images/tile-4/enemies.svg", className: "enemies" });var

Tile4 = function (_Component4) {_inherits(Tile4, _Component4);
  function Tile4(props) {_classCallCheck(this, Tile4);var _this4 = _possibleConstructorReturn(this, (Tile4.__proto__ || Object.getPrototypeOf(Tile4)).call(this,
    props));
    _this4.state = {
      playState: "",
      animation: props.animation };

    _this4.triggerAnimation = _this4.triggerAnimation.bind(_this4);return _this4;
  }_createClass(Tile4, [{ key: "componentWillReceiveProps", value: function componentWillReceiveProps(

    nextProps) {
      if (nextProps.animation !== this.state.animation) {
        this.setState(function (prevState) {
          prevState.animation = nextProps;
          prevState.playState = "";
          return prevState;
        });
      }
    } }, { key: "triggerAnimation", value: function triggerAnimation()

    {
      this.setState(function (prevState) {return prevState.playState = "animated";});
    } }, { key: "render", value: function render()

    {
      return (
        React.createElement(Tile4Container, {
            className: this.state.playState,
            onClick: this.triggerAnimation },

          ground,
          hero,
          enemies));


    } }]);return Tile4;}(Component);


var Tile5Container = styled.div(_templateObject6);

































































var ground5 = React.createElement("img", { src: "https://kurtpetrek.github.io/digital-comic-idea/images/tile-5/ground.svg", className: "ground" });

var figures5 = React.createElement("img", { src: "https://kurtpetrek.github.io/digital-comic-idea/images/tile-5/figures.svg", className: "figures" });

var zap5 = React.createElement("img", { src: "https://kurtpetrek.github.io/digital-comic-idea/images/tile-5/zap.svg", className: "zap" });var

Tile5 = function (_Component5) {_inherits(Tile5, _Component5);
  function Tile5(props) {_classCallCheck(this, Tile5);var _this5 = _possibleConstructorReturn(this, (Tile5.__proto__ || Object.getPrototypeOf(Tile5)).call(this,
    props));
    _this5.state = {
      playState: "",
      animation: props.animation };

    _this5.launchAnimation = _this5.launchAnimation.bind(_this5);return _this5;
  }_createClass(Tile5, [{ key: "componentWillReceiveProps", value: function componentWillReceiveProps(
    nextProps) {
      if (nextProps.animation !== this.state.animation) {
        this.setState(function (prevState) {
          prevState.animation = nextProps;
          prevState.playState = "";
          return prevState;
        });
      }
    } }, { key: "launchAnimation", value: function launchAnimation()

    {
      this.setState(function (prevState) {
        prevState.playState = "animated";
        return prevState;
      });
    } }, { key: "render", value: function render()

    {
      return (
        React.createElement(Tile5Container, {
            onClick: this.launchAnimation,
            className: this.state.playState },

          ground5,
          figures5,
          zap5));


    } }]);return Tile5;}(Component);var


App = function (_Component6) {_inherits(App, _Component6);
  function App(props) {_classCallCheck(this, App);var _this6 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this,
    props));_this6.




    resetAnimation = function () {
      _this6.setState(function (prevState) {return prevState.animation++;});
    };_this6.state = { animation: 1 };return _this6;}_createClass(App, [{ key: "render", value: function render()

    {
      return (
        React.createElement("div", { style: { margin: "auto", maxWidth: "550px" } },
          React.createElement("h1", { style: { textAlign: "center" } }, "Click Tile to Launch Animation"),
          React.createElement(Tile1, { animation: this.state.animation }),
          React.createElement(Tile2, { animation: this.state.animation }),
          React.createElement(Tile3, { animation: this.state.animation }),
          React.createElement(Tile4, { animation: this.state.animation }),
          React.createElement(Tile5, { animation: this.state.animation }),
          React.createElement("div", { style: { textAlign: "center", padding: "1rem", clear: "both" } },
            React.createElement(Button, { onClick: this.resetAnimation }, "Reset"))));



    } }]);return App;}(Component);


ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
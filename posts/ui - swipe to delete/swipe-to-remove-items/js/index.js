var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SwipeItem = function (_React$Component) {
  _inherits(SwipeItem, _React$Component);

  function SwipeItem(props) {
    _classCallCheck(this, SwipeItem);

    var _this = _possibleConstructorReturn(this, (SwipeItem.__proto__ || Object.getPrototypeOf(SwipeItem)).call(this, props));

    _this.state = {
      left: 0,
      originalOffset: 0,
      velocity: 0,
      timeOfLastDragEvent: 0,
      touchStartX: 0,
      prevTouchX: 0,
      beingTouched: false,
      height: 0,
      intervalId: null
    };
    return _this;
  }

  _createClass(SwipeItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      window.setTimeout(function () {
        return _this2.setState({ height: 65 });
      }, 50);
    }
  }, {
    key: 'animateSlidingToZero',
    value: function animateSlidingToZero() {
      var _state = this.state,
          left = _state.left,
          velocity = _state.velocity,
          beingTouched = _state.beingTouched;

      if (!beingTouched && left < -0.01) {
        velocity += 10 * 0.033;
        left += velocity;
        if (left < -350) {
          window.clearInterval(this.state.intervalId);
          this.handleRemoveSelf();
        }
        this.setState({ left: left, velocity: velocity });
      } else if (!beingTouched) {
        left = 0;
        velocity = 0;
        window.clearInterval(this.state.intervalId);
        this.setState({ left: left, velocity: velocity, intervalId: null, originalOffset: 0 });
      }
    }
  }, {
    key: 'handleRemoveSelf',
    value: function handleRemoveSelf() {
      var _this3 = this;

      this.setState({ height: 0 });
      window.setTimeout(function () {
        return _this3.props.onRemoval();
      }, 250);
    }
  }, {
    key: 'handleStart',
    value: function handleStart(clientX) {
      if (this.state.intervalId !== null) {
        window.clearInterval(this.state.intervalId);
      }
      this.setState({
        originalOffset: this.state.left,
        velocity: 0,
        timeOfLastDragEvent: Date.now(),
        touchStartX: clientX,
        beingTouched: true,
        intervalId: null
      });
    }
  }, {
    key: 'handleMove',
    value: function handleMove(clientX) {
      if (this.state.beingTouched) {
        var touchX = clientX;
        var currTime = Date.now();
        var elapsed = currTime - this.state.timeOfLastDragEvent;
        var velocity = 20 * (touchX - this.state.prevTouchX) / elapsed;
        var deltaX = touchX - this.state.touchStartX + this.state.originalOffset;
        if (deltaX < -350) {
          this.handleRemoveSelf();
        } else if (deltaX > 0) {
          deltaX = 0;
        }
        this.setState({
          left: deltaX,
          velocity: velocity,
          timeOfLastDragEvent: currTime,
          prevTouchX: touchX
        });
      }
    }
  }, {
    key: 'handleEnd',
    value: function handleEnd() {
      this.setState({
        velocity: this.state.velocity,
        touchStartX: 0,
        beingTouched: false,
        intervalId: window.setInterval(this.animateSlidingToZero.bind(this), 33)
      });
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(touchStartEvent) {
      touchStartEvent.preventDefault();
      this.handleMotionStart(touchStartEvent.targetTouches[0].clientX);
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(touchMoveEvent) {
      this.handleMove(touchMoveEvent.targetTouches[0].clientX);
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd() {
      this.handleEnd();
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(mouseDownEvent) {
      mouseDownEvent.preventDefault();
      this.handleStart(mouseDownEvent.clientX);
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(mouseMoveEvent) {
      this.handleMove(mouseMoveEvent.clientX);
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp() {
      this.handleEnd();
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      this.handleMouseUp();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return React.createElement(
        'li',
        {
          className: 'swipeItem',
          style: { height: this.state.height + 'px', transition: 'height 250ms ease-in-out' },
          onTouchStart: function onTouchStart(touchStartEvent) {
            return _this4.handleTouchStart(touchStartEvent);
          },
          onTouchMove: function onTouchMove(touchMoveEvent) {
            return _this4.handleTouchMove(touchMoveEvent);
          },
          onTouchEnd: function onTouchEnd() {
            return _this4.handleTouchEnd();
          }
          // The following event handlers are for mouse compatibility:
          , onMouseDown: function onMouseDown(mouseDownEvent) {
            return _this4.handleMouseDown(mouseDownEvent);
          },
          onMouseMove: function onMouseMove(mouseMoveEvent) {
            return _this4.handleMouseMove(mouseMoveEvent);
          },
          onMouseUp: function onMouseUp() {
            return _this4.handleMouseUp();
          },
          onMouseLeave: function onMouseLeave() {
            return _this4.handleMouseLeave();
          }
        },
        React.createElement(
          'div',
          {
            className: 'swipeItem-content',
            style: { left: this.state.left + 'px' }
          },
          this.props.children
        )
      );
    }
  }]);

  return SwipeItem;
}(React.Component);

var SwipeList = function (_React$Component2) {
  _inherits(SwipeList, _React$Component2);

  function SwipeList(props) {
    _classCallCheck(this, SwipeList);

    var _this5 = _possibleConstructorReturn(this, (SwipeList.__proto__ || Object.getPrototypeOf(SwipeList)).call(this, props));

    _this5.state = {
      counter: 1,
      items: _defineProperty({}, 0, 'http://lorempixel.com/350/65/')
    };
    return _this5;
  }

  _createClass(SwipeList, [{
    key: 'addImage',
    value: function addImage() {
      this.setState({
        counter: this.state.counter + 1,
        items: _extends({}, this.state.items, _defineProperty({}, this.state.counter, 'http://lorempixel.com/350/65/'))
      });
    }
  }, {
    key: 'removeItem',
    value: function removeItem(keyOfItemToRemove) {
      var _this6 = this;

      var nextItems = {};
      Object.keys(this.state.items).forEach(function (itemKey) {
        if (itemKey !== keyOfItemToRemove) {
          nextItems[itemKey] = _this6.state.items[itemKey];
        }
      });

      this.setState({ items: nextItems });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      return React.createElement(
        'ul',
        { className: 'swipeList' },
        Object.keys(this.state.items).map(function (itemKey) {
          return React.createElement(
            SwipeItem,
            { key: 'swipeItem-' + itemKey, onRemoval: function onRemoval() {
                return _this7.removeItem(itemKey);
              } },
            React.createElement('img', { src: _this7.state.items[itemKey] })
          );
        }),
        React.createElement(
          'button',
          {
            className: 'swipeList-addButton',
            onClick: function onClick() {
              return _this7.addImage();
            }
          },
          'Add image...'
        )
      );
    }
  }]);

  return SwipeList;
}(React.Component);

var Application = function (_React$Component3) {
  _inherits(Application, _React$Component3);

  function Application() {
    _classCallCheck(this, Application);

    return _possibleConstructorReturn(this, (Application.__proto__ || Object.getPrototypeOf(Application)).apply(this, arguments));
  }

  _createClass(Application, [{
    key: 'render',
    value: function render() {
      return React.createElement(SwipeList, null);
    }
  }]);

  return Application;
}(React.Component);

React.render(React.createElement(Application, null), document.getElementById('app'));
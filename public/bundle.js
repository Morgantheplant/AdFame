(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/cssify/browser.js":[function(require,module,exports){
module.exports = function (css, customDocument) {
  var doc = customDocument || document;
  if (doc.createStyleSheet) {
    var sheet = doc.createStyleSheet()
    sheet.cssText = css;
    return sheet.ownerNode;
  } else {
    var head = doc.getElementsByTagName('head')[0],
        style = doc.createElement('style');

    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(doc.createTextNode(css));
    }

    head.appendChild(style);
    return style;
  }
};

module.exports.byUrl = function(url) {
  if (document.createStyleSheet) {
    return document.createStyleSheet(url).ownerNode;
  } else {
    var head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = url;

    head.appendChild(link);
    return link;
  }
};

},{}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous-polyfills/classList.js":[function(require,module,exports){

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 2011-06-15
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

if (typeof document !== "undefined" && !("classList" in document.createElement("a"))) {

(function (view) {

"use strict";

var
      classListProp = "classList"
    , protoProp = "prototype"
    , elemCtrProto = (view.HTMLElement || view.Element)[protoProp]
    , objCtr = Object
    , strTrim = String[protoProp].trim || function () {
        return this.replace(/^\s+|\s+$/g, "");
    }
    , arrIndexOf = Array[protoProp].indexOf || function (item) {
        var
              i = 0
            , len = this.length
        ;
        for (; i < len; i++) {
            if (i in this && this[i] === item) {
                return i;
            }
        }
        return -1;
    }
    // Vendors: please allow content code to instantiate DOMExceptions
    , DOMEx = function (type, message) {
        this.name = type;
        this.code = DOMException[type];
        this.message = message;
    }
    , checkTokenAndGetIndex = function (classList, token) {
        if (token === "") {
            throw new DOMEx(
                  "SYNTAX_ERR"
                , "An invalid or illegal string was specified"
            );
        }
        if (/\s/.test(token)) {
            throw new DOMEx(
                  "INVALID_CHARACTER_ERR"
                , "String contains an invalid character"
            );
        }
        return arrIndexOf.call(classList, token);
    }
    , ClassList = function (elem) {
        var
              trimmedClasses = strTrim.call(elem.className)
            , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
            , i = 0
            , len = classes.length
        ;
        for (; i < len; i++) {
            this.push(classes[i]);
        }
        this._updateClassName = function () {
            elem.className = this.toString();
        };
    }
    , classListProto = ClassList[protoProp] = []
    , classListGetter = function () {
        return new ClassList(this);
    }
;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
    return this[i] || null;
};
classListProto.contains = function (token) {
    token += "";
    return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function (token) {
    token += "";
    if (checkTokenAndGetIndex(this, token) === -1) {
        this.push(token);
        this._updateClassName();
    }
};
classListProto.remove = function (token) {
    token += "";
    var index = checkTokenAndGetIndex(this, token);
    if (index !== -1) {
        this.splice(index, 1);
        this._updateClassName();
    }
};
classListProto.toggle = function (token) {
    token += "";
    if (checkTokenAndGetIndex(this, token) === -1) {
        this.add(token);
    } else {
        this.remove(token);
    }
};
classListProto.toString = function () {
    return this.join(" ");
};

if (objCtr.defineProperty) {
    var classListPropDesc = {
          get: classListGetter
        , enumerable: true
        , configurable: true
    };
    try {
        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
    } catch (ex) { // IE 8 doesn't support enumerable:true
        if (ex.number === -0x7FF5EC54) {
            classListPropDesc.enumerable = false;
            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
        }
    }
} else if (objCtr[protoProp].__defineGetter__) {
    elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(self));

}

},{}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous-polyfills/functionPrototypeBind.js":[function(require,module,exports){
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis
                ? this
                : oThis,
                aArgs.concat(Array.prototype.slice.call(arguments)));
        };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

},{}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous-polyfills/index.js":[function(require,module,exports){
require('./classList.js');
require('./functionPrototypeBind.js');
require('./requestAnimationFrame.js');
},{"./classList.js":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous-polyfills/classList.js","./functionPrototypeBind.js":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous-polyfills/functionPrototypeBind.js","./requestAnimationFrame.js":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous-polyfills/requestAnimationFrame.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous-polyfills/requestAnimationFrame.js":[function(require,module,exports){
// adds requestAnimationFrame functionality
// Source: http://strd6.com/2011/05/better-window-requestanimationframe-shim/

window.requestAnimationFrame || (window.requestAnimationFrame =
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  function(callback, element) {
    return window.setTimeout(function() {
      callback(+new Date());
  }, 1000 / 60);
});

},{}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Context.js":[function(require,module,exports){
var RenderNode = require('./RenderNode');
var EventHandler = require('./EventHandler');
var ElementAllocator = require('./ElementAllocator');
var Transform = require('./Transform');
var Transitionable = require('../transitions/Transitionable');
var _zeroZero = [
        0,
        0
    ];
var usePrefix = !('perspective' in document.documentElement.style);
function _getElementSize(element) {
    return [
        element.clientWidth,
        element.clientHeight
    ];
}
var _setPerspective = usePrefix ? function (element, perspective) {
        element.style.webkitPerspective = perspective ? perspective.toFixed() + 'px' : '';
    } : function (element, perspective) {
        element.style.perspective = perspective ? perspective.toFixed() + 'px' : '';
    };
function Context(container) {
    this.container = container;
    this._allocator = new ElementAllocator(container);
    this._node = new RenderNode();
    this._eventOutput = new EventHandler();
    this._size = _getElementSize(this.container);
    this._perspectiveState = new Transitionable(0);
    this._perspective = undefined;
    this._nodeContext = {
        allocator: this._allocator,
        transform: Transform.identity,
        opacity: 1,
        origin: _zeroZero,
        align: _zeroZero,
        size: this._size
    };
    this._eventOutput.on('resize', function () {
        this.setSize(_getElementSize(this.container));
    }.bind(this));
}
Context.prototype.getAllocator = function getAllocator() {
    return this._allocator;
};
Context.prototype.add = function add(obj) {
    return this._node.add(obj);
};
Context.prototype.migrate = function migrate(container) {
    if (container === this.container)
        return;
    this.container = container;
    this._allocator.migrate(container);
};
Context.prototype.getSize = function getSize() {
    return this._size;
};
Context.prototype.setSize = function setSize(size) {
    if (!size)
        size = _getElementSize(this.container);
    this._size[0] = size[0];
    this._size[1] = size[1];
};
Context.prototype.update = function update(contextParameters) {
    if (contextParameters) {
        if (contextParameters.transform)
            this._nodeContext.transform = contextParameters.transform;
        if (contextParameters.opacity)
            this._nodeContext.opacity = contextParameters.opacity;
        if (contextParameters.origin)
            this._nodeContext.origin = contextParameters.origin;
        if (contextParameters.align)
            this._nodeContext.align = contextParameters.align;
        if (contextParameters.size)
            this._nodeContext.size = contextParameters.size;
    }
    var perspective = this._perspectiveState.get();
    if (perspective !== this._perspective) {
        _setPerspective(this.container, perspective);
        this._perspective = perspective;
    }
    this._node.commit(this._nodeContext);
};
Context.prototype.getPerspective = function getPerspective() {
    return this._perspectiveState.get();
};
Context.prototype.setPerspective = function setPerspective(perspective, transition, callback) {
    return this._perspectiveState.set(perspective, transition, callback);
};
Context.prototype.emit = function emit(type, event) {
    return this._eventOutput.emit(type, event);
};
Context.prototype.on = function on(type, handler) {
    return this._eventOutput.on(type, handler);
};
Context.prototype.removeListener = function removeListener(type, handler) {
    return this._eventOutput.removeListener(type, handler);
};
Context.prototype.pipe = function pipe(target) {
    return this._eventOutput.pipe(target);
};
Context.prototype.unpipe = function unpipe(target) {
    return this._eventOutput.unpipe(target);
};
module.exports = Context;
},{"../transitions/Transitionable":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/Transitionable.js","./ElementAllocator":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/ElementAllocator.js","./EventHandler":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/EventHandler.js","./RenderNode":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/RenderNode.js","./Transform":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Transform.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/ElementAllocator.js":[function(require,module,exports){
function ElementAllocator(container) {
    if (!container)
        container = document.createDocumentFragment();
    this.container = container;
    this.detachedNodes = {};
    this.nodeCount = 0;
}
ElementAllocator.prototype.migrate = function migrate(container) {
    var oldContainer = this.container;
    if (container === oldContainer)
        return;
    if (oldContainer instanceof DocumentFragment) {
        container.appendChild(oldContainer);
    } else {
        while (oldContainer.hasChildNodes()) {
            container.appendChild(oldContainer.removeChild(oldContainer.firstChild));
        }
    }
    this.container = container;
};
ElementAllocator.prototype.allocate = function allocate(type) {
    type = type.toLowerCase();
    if (!(type in this.detachedNodes))
        this.detachedNodes[type] = [];
    var nodeStore = this.detachedNodes[type];
    var result;
    if (nodeStore.length > 0) {
        result = nodeStore.pop();
    } else {
        result = document.createElement(type);
        this.container.appendChild(result);
    }
    this.nodeCount++;
    return result;
};
ElementAllocator.prototype.deallocate = function deallocate(element) {
    var nodeType = element.nodeName.toLowerCase();
    var nodeStore = this.detachedNodes[nodeType];
    nodeStore.push(element);
    this.nodeCount--;
};
ElementAllocator.prototype.getNodeCount = function getNodeCount() {
    return this.nodeCount;
};
module.exports = ElementAllocator;
},{}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/ElementOutput.js":[function(require,module,exports){
var Entity = require('./Entity');
var EventHandler = require('./EventHandler');
var Transform = require('./Transform');
var usePrefix = !('transform' in document.documentElement.style);
var devicePixelRatio = window.devicePixelRatio || 1;
function ElementOutput(element) {
    this._matrix = null;
    this._opacity = 1;
    this._origin = null;
    this._size = null;
    this._eventOutput = new EventHandler();
    this._eventOutput.bindThis(this);
    this.eventForwarder = function eventForwarder(event) {
        this._eventOutput.emit(event.type, event);
    }.bind(this);
    this.id = Entity.register(this);
    this._element = null;
    this._sizeDirty = false;
    this._originDirty = false;
    this._transformDirty = false;
    this._invisible = false;
    if (element)
        this.attach(element);
}
ElementOutput.prototype.on = function on(type, fn) {
    if (this._element)
        this._element.addEventListener(type, this.eventForwarder);
    this._eventOutput.on(type, fn);
};
ElementOutput.prototype.removeListener = function removeListener(type, fn) {
    this._eventOutput.removeListener(type, fn);
};
ElementOutput.prototype.emit = function emit(type, event) {
    if (event && !event.origin)
        event.origin = this;
    var handled = this._eventOutput.emit(type, event);
    if (handled && event && event.stopPropagation)
        event.stopPropagation();
    return handled;
};
ElementOutput.prototype.pipe = function pipe(target) {
    return this._eventOutput.pipe(target);
};
ElementOutput.prototype.unpipe = function unpipe(target) {
    return this._eventOutput.unpipe(target);
};
ElementOutput.prototype.render = function render() {
    return this.id;
};
function _addEventListeners(target) {
    for (var i in this._eventOutput.listeners) {
        target.addEventListener(i, this.eventForwarder);
    }
}
function _removeEventListeners(target) {
    for (var i in this._eventOutput.listeners) {
        target.removeEventListener(i, this.eventForwarder);
    }
}
function _formatCSSTransform(m) {
    m[12] = Math.round(m[12] * devicePixelRatio) / devicePixelRatio;
    m[13] = Math.round(m[13] * devicePixelRatio) / devicePixelRatio;
    var result = 'matrix3d(';
    for (var i = 0; i < 15; i++) {
        result += m[i] < 0.000001 && m[i] > -0.000001 ? '0,' : m[i] + ',';
    }
    result += m[15] + ')';
    return result;
}
var _setMatrix;
if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    _setMatrix = function (element, matrix) {
        element.style.zIndex = matrix[14] * 1000000 | 0;
        element.style.transform = _formatCSSTransform(matrix);
    };
} else if (usePrefix) {
    _setMatrix = function (element, matrix) {
        element.style.webkitTransform = _formatCSSTransform(matrix);
    };
} else {
    _setMatrix = function (element, matrix) {
        element.style.transform = _formatCSSTransform(matrix);
    };
}
function _formatCSSOrigin(origin) {
    return 100 * origin[0] + '% ' + 100 * origin[1] + '%';
}
var _setOrigin = usePrefix ? function (element, origin) {
        element.style.webkitTransformOrigin = _formatCSSOrigin(origin);
    } : function (element, origin) {
        element.style.transformOrigin = _formatCSSOrigin(origin);
    };
var _setInvisible = usePrefix ? function (element) {
        element.style.webkitTransform = 'scale3d(0.0001,0.0001,0.0001)';
        element.style.opacity = 0;
    } : function (element) {
        element.style.transform = 'scale3d(0.0001,0.0001,0.0001)';
        element.style.opacity = 0;
    };
function _xyNotEquals(a, b) {
    return a && b ? a[0] !== b[0] || a[1] !== b[1] : a !== b;
}
ElementOutput.prototype.commit = function commit(context) {
    var target = this._element;
    if (!target)
        return;
    var matrix = context.transform;
    var opacity = context.opacity;
    var origin = context.origin;
    var size = context.size;
    if (!matrix && this._matrix) {
        this._matrix = null;
        this._opacity = 0;
        _setInvisible(target);
        return;
    }
    if (_xyNotEquals(this._origin, origin))
        this._originDirty = true;
    if (Transform.notEquals(this._matrix, matrix))
        this._transformDirty = true;
    if (this._invisible) {
        this._invisible = false;
        this._element.style.display = '';
    }
    if (this._opacity !== opacity) {
        this._opacity = opacity;
        target.style.opacity = opacity >= 1 ? '0.999999' : opacity;
    }
    if (this._transformDirty || this._originDirty || this._sizeDirty) {
        if (this._sizeDirty)
            this._sizeDirty = false;
        if (this._originDirty) {
            if (origin) {
                if (!this._origin)
                    this._origin = [
                        0,
                        0
                    ];
                this._origin[0] = origin[0];
                this._origin[1] = origin[1];
            } else
                this._origin = null;
            _setOrigin(target, this._origin);
            this._originDirty = false;
        }
        if (!matrix)
            matrix = Transform.identity;
        this._matrix = matrix;
        var aaMatrix = this._size ? Transform.thenMove(matrix, [
                -this._size[0] * origin[0],
                -this._size[1] * origin[1],
                0
            ]) : matrix;
        _setMatrix(target, aaMatrix);
        this._transformDirty = false;
    }
};
ElementOutput.prototype.cleanup = function cleanup() {
    if (this._element) {
        this._invisible = true;
        this._element.style.display = 'none';
    }
};
ElementOutput.prototype.attach = function attach(target) {
    this._element = target;
    _addEventListeners.call(this, target);
};
ElementOutput.prototype.detach = function detach() {
    var target = this._element;
    if (target) {
        _removeEventListeners.call(this, target);
        if (this._invisible) {
            this._invisible = false;
            this._element.style.display = '';
        }
    }
    this._element = null;
    return target;
};
module.exports = ElementOutput;
},{"./Entity":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Entity.js","./EventHandler":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/EventHandler.js","./Transform":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Transform.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Engine.js":[function(require,module,exports){
var Context = require('./Context');
var EventHandler = require('./EventHandler');
var OptionsManager = require('./OptionsManager');
var Engine = {};
var contexts = [];
var nextTickQueue = [];
var deferQueue = [];
var lastTime = Date.now();
var frameTime;
var frameTimeLimit;
var loopEnabled = true;
var eventForwarders = {};
var eventHandler = new EventHandler();
var options = {
        containerType: 'div',
        containerClass: 'famous-container',
        fpsCap: undefined,
        runLoop: true,
        appMode: true
    };
var optionsManager = new OptionsManager(options);
var MAX_DEFER_FRAME_TIME = 10;
Engine.step = function step() {
    var currentTime = Date.now();
    if (frameTimeLimit && currentTime - lastTime < frameTimeLimit)
        return;
    var i = 0;
    frameTime = currentTime - lastTime;
    lastTime = currentTime;
    eventHandler.emit('prerender');
    for (i = 0; i < nextTickQueue.length; i++)
        nextTickQueue[i].call(this);
    nextTickQueue.splice(0);
    while (deferQueue.length && Date.now() - currentTime < MAX_DEFER_FRAME_TIME) {
        deferQueue.shift().call(this);
    }
    for (i = 0; i < contexts.length; i++)
        contexts[i].update();
    eventHandler.emit('postrender');
};
function loop() {
    if (options.runLoop) {
        Engine.step();
        window.requestAnimationFrame(loop);
    } else
        loopEnabled = false;
}
window.requestAnimationFrame(loop);
function handleResize(event) {
    for (var i = 0; i < contexts.length; i++) {
        contexts[i].emit('resize');
    }
    eventHandler.emit('resize');
}
window.addEventListener('resize', handleResize, false);
handleResize();
function initialize() {
    window.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, true);
    document.body.classList.add('famous-root');
    document.documentElement.classList.add('famous-root');
}
var initialized = false;
Engine.pipe = function pipe(target) {
    if (target.subscribe instanceof Function)
        return target.subscribe(Engine);
    else
        return eventHandler.pipe(target);
};
Engine.unpipe = function unpipe(target) {
    if (target.unsubscribe instanceof Function)
        return target.unsubscribe(Engine);
    else
        return eventHandler.unpipe(target);
};
Engine.on = function on(type, handler) {
    if (!(type in eventForwarders)) {
        eventForwarders[type] = eventHandler.emit.bind(eventHandler, type);
        if (document.body) {
            document.body.addEventListener(type, eventForwarders[type]);
        } else {
            Engine.nextTick(function (type, forwarder) {
                document.body.addEventListener(type, forwarder);
            }.bind(this, type, eventForwarders[type]));
        }
    }
    return eventHandler.on(type, handler);
};
Engine.emit = function emit(type, event) {
    return eventHandler.emit(type, event);
};
Engine.removeListener = function removeListener(type, handler) {
    return eventHandler.removeListener(type, handler);
};
Engine.getFPS = function getFPS() {
    return 1000 / frameTime;
};
Engine.setFPSCap = function setFPSCap(fps) {
    frameTimeLimit = Math.floor(1000 / fps);
};
Engine.getOptions = function getOptions(key) {
    return optionsManager.getOptions(key);
};
Engine.setOptions = function setOptions(options) {
    return optionsManager.setOptions.apply(optionsManager, arguments);
};
Engine.createContext = function createContext(el) {
    if (!initialized && options.appMode)
        Engine.nextTick(initialize);
    var needMountContainer = false;
    if (!el) {
        el = document.createElement(options.containerType);
        el.classList.add(options.containerClass);
        needMountContainer = true;
    }
    var context = new Context(el);
    Engine.registerContext(context);
    if (needMountContainer) {
        Engine.nextTick(function (context, el) {
            document.body.appendChild(el);
            context.emit('resize');
        }.bind(this, context, el));
    }
    return context;
};
Engine.registerContext = function registerContext(context) {
    contexts.push(context);
    return context;
};
Engine.getContexts = function getContexts() {
    return contexts;
};
Engine.deregisterContext = function deregisterContext(context) {
    var i = contexts.indexOf(context);
    if (i >= 0)
        contexts.splice(i, 1);
};
Engine.nextTick = function nextTick(fn) {
    nextTickQueue.push(fn);
};
Engine.defer = function defer(fn) {
    deferQueue.push(fn);
};
optionsManager.on('change', function (data) {
    if (data.id === 'fpsCap')
        Engine.setFPSCap(data.value);
    else if (data.id === 'runLoop') {
        if (!loopEnabled && data.value) {
            loopEnabled = true;
            window.requestAnimationFrame(loop);
        }
    }
});
module.exports = Engine;
},{"./Context":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Context.js","./EventHandler":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/EventHandler.js","./OptionsManager":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/OptionsManager.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Entity.js":[function(require,module,exports){
var entities = [];
function get(id) {
    return entities[id];
}
function set(id, entity) {
    entities[id] = entity;
}
function register(entity) {
    var id = entities.length;
    set(id, entity);
    return id;
}
function unregister(id) {
    set(id, null);
}
module.exports = {
    register: register,
    unregister: unregister,
    get: get,
    set: set
};
},{}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/EventEmitter.js":[function(require,module,exports){
function EventEmitter() {
    this.listeners = {};
    this._owner = this;
}
EventEmitter.prototype.emit = function emit(type, event) {
    var handlers = this.listeners[type];
    if (handlers) {
        for (var i = 0; i < handlers.length; i++) {
            handlers[i].call(this._owner, event);
        }
    }
    return this;
};
EventEmitter.prototype.on = function on(type, handler) {
    if (!(type in this.listeners))
        this.listeners[type] = [];
    var index = this.listeners[type].indexOf(handler);
    if (index < 0)
        this.listeners[type].push(handler);
    return this;
};
EventEmitter.prototype.addListener = EventEmitter.prototype.on;
EventEmitter.prototype.removeListener = function removeListener(type, handler) {
    var listener = this.listeners[type];
    if (listener !== undefined) {
        var index = listener.indexOf(handler);
        if (index >= 0)
            listener.splice(index, 1);
    }
    return this;
};
EventEmitter.prototype.bindThis = function bindThis(owner) {
    this._owner = owner;
};
module.exports = EventEmitter;
},{}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/EventHandler.js":[function(require,module,exports){
var EventEmitter = require('./EventEmitter');
function EventHandler() {
    EventEmitter.apply(this, arguments);
    this.downstream = [];
    this.downstreamFn = [];
    this.upstream = [];
    this.upstreamListeners = {};
}
EventHandler.prototype = Object.create(EventEmitter.prototype);
EventHandler.prototype.constructor = EventHandler;
EventHandler.setInputHandler = function setInputHandler(object, handler) {
    object.trigger = handler.trigger.bind(handler);
    if (handler.subscribe && handler.unsubscribe) {
        object.subscribe = handler.subscribe.bind(handler);
        object.unsubscribe = handler.unsubscribe.bind(handler);
    }
};
EventHandler.setOutputHandler = function setOutputHandler(object, handler) {
    if (handler instanceof EventHandler)
        handler.bindThis(object);
    object.pipe = handler.pipe.bind(handler);
    object.unpipe = handler.unpipe.bind(handler);
    object.on = handler.on.bind(handler);
    object.addListener = object.on;
    object.removeListener = handler.removeListener.bind(handler);
};
EventHandler.prototype.emit = function emit(type, event) {
    EventEmitter.prototype.emit.apply(this, arguments);
    var i = 0;
    for (i = 0; i < this.downstream.length; i++) {
        if (this.downstream[i].trigger)
            this.downstream[i].trigger(type, event);
    }
    for (i = 0; i < this.downstreamFn.length; i++) {
        this.downstreamFn[i](type, event);
    }
    return this;
};
EventHandler.prototype.trigger = EventHandler.prototype.emit;
EventHandler.prototype.pipe = function pipe(target) {
    if (target.subscribe instanceof Function)
        return target.subscribe(this);
    var downstreamCtx = target instanceof Function ? this.downstreamFn : this.downstream;
    var index = downstreamCtx.indexOf(target);
    if (index < 0)
        downstreamCtx.push(target);
    if (target instanceof Function)
        target('pipe', null);
    else if (target.trigger)
        target.trigger('pipe', null);
    return target;
};
EventHandler.prototype.unpipe = function unpipe(target) {
    if (target.unsubscribe instanceof Function)
        return target.unsubscribe(this);
    var downstreamCtx = target instanceof Function ? this.downstreamFn : this.downstream;
    var index = downstreamCtx.indexOf(target);
    if (index >= 0) {
        downstreamCtx.splice(index, 1);
        if (target instanceof Function)
            target('unpipe', null);
        else if (target.trigger)
            target.trigger('unpipe', null);
        return target;
    } else
        return false;
};
EventHandler.prototype.on = function on(type, handler) {
    EventEmitter.prototype.on.apply(this, arguments);
    if (!(type in this.upstreamListeners)) {
        var upstreamListener = this.trigger.bind(this, type);
        this.upstreamListeners[type] = upstreamListener;
        for (var i = 0; i < this.upstream.length; i++) {
            this.upstream[i].on(type, upstreamListener);
        }
    }
    return this;
};
EventHandler.prototype.addListener = EventHandler.prototype.on;
EventHandler.prototype.subscribe = function subscribe(source) {
    var index = this.upstream.indexOf(source);
    if (index < 0) {
        this.upstream.push(source);
        for (var type in this.upstreamListeners) {
            source.on(type, this.upstreamListeners[type]);
        }
    }
    return this;
};
EventHandler.prototype.unsubscribe = function unsubscribe(source) {
    var index = this.upstream.indexOf(source);
    if (index >= 0) {
        this.upstream.splice(index, 1);
        for (var type in this.upstreamListeners) {
            source.removeListener(type, this.upstreamListeners[type]);
        }
    }
    return this;
};
module.exports = EventHandler;
},{"./EventEmitter":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/EventEmitter.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Modifier.js":[function(require,module,exports){
var Transform = require('./Transform');
var Transitionable = require('../transitions/Transitionable');
var TransitionableTransform = require('../transitions/TransitionableTransform');
function Modifier(options) {
    this._transformGetter = null;
    this._opacityGetter = null;
    this._originGetter = null;
    this._alignGetter = null;
    this._sizeGetter = null;
    this._proportionGetter = null;
    this._legacyStates = {};
    this._output = {
        transform: Transform.identity,
        opacity: 1,
        origin: null,
        align: null,
        size: null,
        proportions: null,
        target: null
    };
    if (options) {
        if (options.transform)
            this.transformFrom(options.transform);
        if (options.opacity !== undefined)
            this.opacityFrom(options.opacity);
        if (options.origin)
            this.originFrom(options.origin);
        if (options.align)
            this.alignFrom(options.align);
        if (options.size)
            this.sizeFrom(options.size);
        if (options.proportions)
            this.proportionsFrom(options.proportions);
    }
}
Modifier.prototype.transformFrom = function transformFrom(transform) {
    if (transform instanceof Function)
        this._transformGetter = transform;
    else if (transform instanceof Object && transform.get)
        this._transformGetter = transform.get.bind(transform);
    else {
        this._transformGetter = null;
        this._output.transform = transform;
    }
    return this;
};
Modifier.prototype.opacityFrom = function opacityFrom(opacity) {
    if (opacity instanceof Function)
        this._opacityGetter = opacity;
    else if (opacity instanceof Object && opacity.get)
        this._opacityGetter = opacity.get.bind(opacity);
    else {
        this._opacityGetter = null;
        this._output.opacity = opacity;
    }
    return this;
};
Modifier.prototype.originFrom = function originFrom(origin) {
    if (origin instanceof Function)
        this._originGetter = origin;
    else if (origin instanceof Object && origin.get)
        this._originGetter = origin.get.bind(origin);
    else {
        this._originGetter = null;
        this._output.origin = origin;
    }
    return this;
};
Modifier.prototype.alignFrom = function alignFrom(align) {
    if (align instanceof Function)
        this._alignGetter = align;
    else if (align instanceof Object && align.get)
        this._alignGetter = align.get.bind(align);
    else {
        this._alignGetter = null;
        this._output.align = align;
    }
    return this;
};
Modifier.prototype.sizeFrom = function sizeFrom(size) {
    if (size instanceof Function)
        this._sizeGetter = size;
    else if (size instanceof Object && size.get)
        this._sizeGetter = size.get.bind(size);
    else {
        this._sizeGetter = null;
        this._output.size = size;
    }
    return this;
};
Modifier.prototype.proportionsFrom = function proportionsFrom(proportions) {
    if (proportions instanceof Function)
        this._proportionGetter = proportions;
    else if (proportions instanceof Object && proportions.get)
        this._proportionGetter = proportions.get.bind(proportions);
    else {
        this._proportionGetter = null;
        this._output.proportions = proportions;
    }
    return this;
};
Modifier.prototype.setTransform = function setTransform(transform, transition, callback) {
    if (transition || this._legacyStates.transform) {
        if (!this._legacyStates.transform) {
            this._legacyStates.transform = new TransitionableTransform(this._output.transform);
        }
        if (!this._transformGetter)
            this.transformFrom(this._legacyStates.transform);
        this._legacyStates.transform.set(transform, transition, callback);
        return this;
    } else
        return this.transformFrom(transform);
};
Modifier.prototype.setOpacity = function setOpacity(opacity, transition, callback) {
    if (transition || this._legacyStates.opacity) {
        if (!this._legacyStates.opacity) {
            this._legacyStates.opacity = new Transitionable(this._output.opacity);
        }
        if (!this._opacityGetter)
            this.opacityFrom(this._legacyStates.opacity);
        return this._legacyStates.opacity.set(opacity, transition, callback);
    } else
        return this.opacityFrom(opacity);
};
Modifier.prototype.setOrigin = function setOrigin(origin, transition, callback) {
    if (transition || this._legacyStates.origin) {
        if (!this._legacyStates.origin) {
            this._legacyStates.origin = new Transitionable(this._output.origin || [
                0,
                0
            ]);
        }
        if (!this._originGetter)
            this.originFrom(this._legacyStates.origin);
        this._legacyStates.origin.set(origin, transition, callback);
        return this;
    } else
        return this.originFrom(origin);
};
Modifier.prototype.setAlign = function setAlign(align, transition, callback) {
    if (transition || this._legacyStates.align) {
        if (!this._legacyStates.align) {
            this._legacyStates.align = new Transitionable(this._output.align || [
                0,
                0
            ]);
        }
        if (!this._alignGetter)
            this.alignFrom(this._legacyStates.align);
        this._legacyStates.align.set(align, transition, callback);
        return this;
    } else
        return this.alignFrom(align);
};
Modifier.prototype.setSize = function setSize(size, transition, callback) {
    if (size && (transition || this._legacyStates.size)) {
        if (!this._legacyStates.size) {
            this._legacyStates.size = new Transitionable(this._output.size || [
                0,
                0
            ]);
        }
        if (!this._sizeGetter)
            this.sizeFrom(this._legacyStates.size);
        this._legacyStates.size.set(size, transition, callback);
        return this;
    } else
        return this.sizeFrom(size);
};
Modifier.prototype.setProportions = function setProportions(proportions, transition, callback) {
    if (proportions && (transition || this._legacyStates.proportions)) {
        if (!this._legacyStates.proportions) {
            this._legacyStates.proportions = new Transitionable(this._output.proportions || [
                0,
                0
            ]);
        }
        if (!this._proportionGetter)
            this.proportionsFrom(this._legacyStates.proportions);
        this._legacyStates.proportions.set(proportions, transition, callback);
        return this;
    } else
        return this.proportionsFrom(proportions);
};
Modifier.prototype.halt = function halt() {
    if (this._legacyStates.transform)
        this._legacyStates.transform.halt();
    if (this._legacyStates.opacity)
        this._legacyStates.opacity.halt();
    if (this._legacyStates.origin)
        this._legacyStates.origin.halt();
    if (this._legacyStates.align)
        this._legacyStates.align.halt();
    if (this._legacyStates.size)
        this._legacyStates.size.halt();
    if (this._legacyStates.proportions)
        this._legacyStates.proportions.halt();
    this._transformGetter = null;
    this._opacityGetter = null;
    this._originGetter = null;
    this._alignGetter = null;
    this._sizeGetter = null;
    this._proportionGetter = null;
};
Modifier.prototype.getTransform = function getTransform() {
    return this._transformGetter();
};
Modifier.prototype.getFinalTransform = function getFinalTransform() {
    return this._legacyStates.transform ? this._legacyStates.transform.getFinal() : this._output.transform;
};
Modifier.prototype.getOpacity = function getOpacity() {
    return this._opacityGetter();
};
Modifier.prototype.getOrigin = function getOrigin() {
    return this._originGetter();
};
Modifier.prototype.getAlign = function getAlign() {
    return this._alignGetter();
};
Modifier.prototype.getSize = function getSize() {
    return this._sizeGetter ? this._sizeGetter() : this._output.size;
};
Modifier.prototype.getProportions = function getProportions() {
    return this._proportionGetter ? this._proportionGetter() : this._output.proportions;
};
function _update() {
    if (this._transformGetter)
        this._output.transform = this._transformGetter();
    if (this._opacityGetter)
        this._output.opacity = this._opacityGetter();
    if (this._originGetter)
        this._output.origin = this._originGetter();
    if (this._alignGetter)
        this._output.align = this._alignGetter();
    if (this._sizeGetter)
        this._output.size = this._sizeGetter();
    if (this._proportionGetter)
        this._output.proportions = this._proportionGetter();
}
Modifier.prototype.modify = function modify(target) {
    _update.call(this);
    this._output.target = target;
    return this._output;
};
module.exports = Modifier;
},{"../transitions/Transitionable":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/Transitionable.js","../transitions/TransitionableTransform":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/TransitionableTransform.js","./Transform":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Transform.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/OptionsManager.js":[function(require,module,exports){
var EventHandler = require('./EventHandler');
function OptionsManager(value) {
    this._value = value;
    this.eventOutput = null;
}
OptionsManager.patch = function patchObject(source, data) {
    var manager = new OptionsManager(source);
    for (var i = 1; i < arguments.length; i++)
        manager.patch(arguments[i]);
    return source;
};
function _createEventOutput() {
    this.eventOutput = new EventHandler();
    this.eventOutput.bindThis(this);
    EventHandler.setOutputHandler(this, this.eventOutput);
}
OptionsManager.prototype.patch = function patch() {
    var myState = this._value;
    for (var i = 0; i < arguments.length; i++) {
        var data = arguments[i];
        for (var k in data) {
            if (k in myState && (data[k] && data[k].constructor === Object) && (myState[k] && myState[k].constructor === Object)) {
                if (!myState.hasOwnProperty(k))
                    myState[k] = Object.create(myState[k]);
                this.key(k).patch(data[k]);
                if (this.eventOutput)
                    this.eventOutput.emit('change', {
                        id: k,
                        value: this.key(k).value()
                    });
            } else
                this.set(k, data[k]);
        }
    }
    return this;
};
OptionsManager.prototype.setOptions = OptionsManager.prototype.patch;
OptionsManager.prototype.key = function key(identifier) {
    var result = new OptionsManager(this._value[identifier]);
    if (!(result._value instanceof Object) || result._value instanceof Array)
        result._value = {};
    return result;
};
OptionsManager.prototype.get = function get(key) {
    return key ? this._value[key] : this._value;
};
OptionsManager.prototype.getOptions = OptionsManager.prototype.get;
OptionsManager.prototype.set = function set(key, value) {
    var originalValue = this.get(key);
    this._value[key] = value;
    if (this.eventOutput && value !== originalValue)
        this.eventOutput.emit('change', {
            id: key,
            value: value
        });
    return this;
};
OptionsManager.prototype.on = function on() {
    _createEventOutput.call(this);
    return this.on.apply(this, arguments);
};
OptionsManager.prototype.removeListener = function removeListener() {
    _createEventOutput.call(this);
    return this.removeListener.apply(this, arguments);
};
OptionsManager.prototype.pipe = function pipe() {
    _createEventOutput.call(this);
    return this.pipe.apply(this, arguments);
};
OptionsManager.prototype.unpipe = function unpipe() {
    _createEventOutput.call(this);
    return this.unpipe.apply(this, arguments);
};
module.exports = OptionsManager;
},{"./EventHandler":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/EventHandler.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/RenderNode.js":[function(require,module,exports){
var Entity = require('./Entity');
var SpecParser = require('./SpecParser');
function RenderNode(object) {
    this._object = null;
    this._child = null;
    this._hasMultipleChildren = false;
    this._isRenderable = false;
    this._isModifier = false;
    this._resultCache = {};
    this._prevResults = {};
    this._childResult = null;
    if (object)
        this.set(object);
}
RenderNode.prototype.add = function add(child) {
    var childNode = child instanceof RenderNode ? child : new RenderNode(child);
    if (this._child instanceof Array)
        this._child.push(childNode);
    else if (this._child) {
        this._child = [
            this._child,
            childNode
        ];
        this._hasMultipleChildren = true;
        this._childResult = [];
    } else
        this._child = childNode;
    return childNode;
};
RenderNode.prototype.get = function get() {
    return this._object || (this._hasMultipleChildren ? null : this._child ? this._child.get() : null);
};
RenderNode.prototype.set = function set(child) {
    this._childResult = null;
    this._hasMultipleChildren = false;
    this._isRenderable = child.render ? true : false;
    this._isModifier = child.modify ? true : false;
    this._object = child;
    this._child = null;
    if (child instanceof RenderNode)
        return child;
    else
        return this;
};
RenderNode.prototype.getSize = function getSize() {
    var result = null;
    var target = this.get();
    if (target && target.getSize)
        result = target.getSize();
    if (!result && this._child && this._child.getSize)
        result = this._child.getSize();
    return result;
};
function _applyCommit(spec, context, cacheStorage) {
    var result = SpecParser.parse(spec, context);
    var keys = Object.keys(result);
    for (var i = 0; i < keys.length; i++) {
        var id = keys[i];
        var childNode = Entity.get(id);
        var commitParams = result[id];
        commitParams.allocator = context.allocator;
        var commitResult = childNode.commit(commitParams);
        if (commitResult)
            _applyCommit(commitResult, context, cacheStorage);
        else
            cacheStorage[id] = commitParams;
    }
}
RenderNode.prototype.commit = function commit(context) {
    var prevKeys = Object.keys(this._prevResults);
    for (var i = 0; i < prevKeys.length; i++) {
        var id = prevKeys[i];
        if (this._resultCache[id] === undefined) {
            var object = Entity.get(id);
            if (object.cleanup)
                object.cleanup(context.allocator);
        }
    }
    this._prevResults = this._resultCache;
    this._resultCache = {};
    _applyCommit(this.render(), context, this._resultCache);
};
RenderNode.prototype.render = function render() {
    if (this._isRenderable)
        return this._object.render();
    var result = null;
    if (this._hasMultipleChildren) {
        result = this._childResult;
        var children = this._child;
        for (var i = 0; i < children.length; i++) {
            result[i] = children[i].render();
        }
    } else if (this._child)
        result = this._child.render();
    return this._isModifier ? this._object.modify(result) : result;
};
module.exports = RenderNode;
},{"./Entity":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Entity.js","./SpecParser":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/SpecParser.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/SpecParser.js":[function(require,module,exports){
var Transform = require('./Transform');
function SpecParser() {
    this.result = {};
}
SpecParser._instance = new SpecParser();
SpecParser.parse = function parse(spec, context) {
    return SpecParser._instance.parse(spec, context);
};
SpecParser.prototype.parse = function parse(spec, context) {
    this.reset();
    this._parseSpec(spec, context, Transform.identity);
    return this.result;
};
SpecParser.prototype.reset = function reset() {
    this.result = {};
};
function _vecInContext(v, m) {
    return [
        v[0] * m[0] + v[1] * m[4] + v[2] * m[8],
        v[0] * m[1] + v[1] * m[5] + v[2] * m[9],
        v[0] * m[2] + v[1] * m[6] + v[2] * m[10]
    ];
}
var _zeroZero = [
        0,
        0
    ];
SpecParser.prototype._parseSpec = function _parseSpec(spec, parentContext, sizeContext) {
    var id;
    var target;
    var transform;
    var opacity;
    var origin;
    var align;
    var size;
    if (typeof spec === 'number') {
        id = spec;
        transform = parentContext.transform;
        align = parentContext.align || _zeroZero;
        if (parentContext.size && align && (align[0] || align[1])) {
            var alignAdjust = [
                    align[0] * parentContext.size[0],
                    align[1] * parentContext.size[1],
                    0
                ];
            transform = Transform.thenMove(transform, _vecInContext(alignAdjust, sizeContext));
        }
        this.result[id] = {
            transform: transform,
            opacity: parentContext.opacity,
            origin: parentContext.origin || _zeroZero,
            align: parentContext.align || _zeroZero,
            size: parentContext.size
        };
    } else if (!spec) {
        return;
    } else if (spec instanceof Array) {
        for (var i = 0; i < spec.length; i++) {
            this._parseSpec(spec[i], parentContext, sizeContext);
        }
    } else {
        target = spec.target;
        transform = parentContext.transform;
        opacity = parentContext.opacity;
        origin = parentContext.origin;
        align = parentContext.align;
        size = parentContext.size;
        var nextSizeContext = sizeContext;
        if (spec.opacity !== undefined)
            opacity = parentContext.opacity * spec.opacity;
        if (spec.transform)
            transform = Transform.multiply(parentContext.transform, spec.transform);
        if (spec.origin) {
            origin = spec.origin;
            nextSizeContext = parentContext.transform;
        }
        if (spec.align)
            align = spec.align;
        if (spec.size || spec.proportions) {
            var parentSize = size;
            size = [
                size[0],
                size[1]
            ];
            if (spec.size) {
                if (spec.size[0] !== undefined)
                    size[0] = spec.size[0];
                if (spec.size[1] !== undefined)
                    size[1] = spec.size[1];
            }
            if (spec.proportions) {
                if (spec.proportions[0] !== undefined)
                    size[0] = size[0] * spec.proportions[0];
                if (spec.proportions[1] !== undefined)
                    size[1] = size[1] * spec.proportions[1];
            }
            if (parentSize) {
                if (align && (align[0] || align[1]))
                    transform = Transform.thenMove(transform, _vecInContext([
                        align[0] * parentSize[0],
                        align[1] * parentSize[1],
                        0
                    ], sizeContext));
                if (origin && (origin[0] || origin[1]))
                    transform = Transform.moveThen([
                        -origin[0] * size[0],
                        -origin[1] * size[1],
                        0
                    ], transform);
            }
            nextSizeContext = parentContext.transform;
            origin = null;
            align = null;
        }
        this._parseSpec(target, {
            transform: transform,
            opacity: opacity,
            origin: origin,
            align: align,
            size: size
        }, nextSizeContext);
    }
};
module.exports = SpecParser;
},{"./Transform":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Transform.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Surface.js":[function(require,module,exports){
var ElementOutput = require('./ElementOutput');
function Surface(options) {
    ElementOutput.call(this);
    this.options = {};
    this.properties = {};
    this.attributes = {};
    this.content = '';
    this.classList = [];
    this.size = null;
    this._classesDirty = true;
    this._stylesDirty = true;
    this._attributesDirty = true;
    this._sizeDirty = true;
    this._contentDirty = true;
    this._trueSizeCheck = true;
    this._dirtyClasses = [];
    if (options)
        this.setOptions(options);
    this._currentTarget = null;
}
Surface.prototype = Object.create(ElementOutput.prototype);
Surface.prototype.constructor = Surface;
Surface.prototype.elementType = 'div';
Surface.prototype.elementClass = 'famous-surface';
Surface.prototype.setAttributes = function setAttributes(attributes) {
    for (var n in attributes) {
        if (n === 'style')
            throw new Error('Cannot set styles via "setAttributes" as it will break Famo.us.  Use "setProperties" instead.');
        this.attributes[n] = attributes[n];
    }
    this._attributesDirty = true;
};
Surface.prototype.getAttributes = function getAttributes() {
    return this.attributes;
};
Surface.prototype.setProperties = function setProperties(properties) {
    for (var n in properties) {
        this.properties[n] = properties[n];
    }
    this._stylesDirty = true;
    return this;
};
Surface.prototype.getProperties = function getProperties() {
    return this.properties;
};
Surface.prototype.addClass = function addClass(className) {
    if (this.classList.indexOf(className) < 0) {
        this.classList.push(className);
        this._classesDirty = true;
    }
    return this;
};
Surface.prototype.removeClass = function removeClass(className) {
    var i = this.classList.indexOf(className);
    if (i >= 0) {
        this._dirtyClasses.push(this.classList.splice(i, 1)[0]);
        this._classesDirty = true;
    }
    return this;
};
Surface.prototype.toggleClass = function toggleClass(className) {
    var i = this.classList.indexOf(className);
    if (i >= 0) {
        this.removeClass(className);
    } else {
        this.addClass(className);
    }
    return this;
};
Surface.prototype.setClasses = function setClasses(classList) {
    var i = 0;
    var removal = [];
    for (i = 0; i < this.classList.length; i++) {
        if (classList.indexOf(this.classList[i]) < 0)
            removal.push(this.classList[i]);
    }
    for (i = 0; i < removal.length; i++)
        this.removeClass(removal[i]);
    for (i = 0; i < classList.length; i++)
        this.addClass(classList[i]);
    return this;
};
Surface.prototype.getClassList = function getClassList() {
    return this.classList;
};
Surface.prototype.setContent = function setContent(content) {
    if (this.content !== content) {
        this.content = content;
        this._contentDirty = true;
    }
    return this;
};
Surface.prototype.getContent = function getContent() {
    return this.content;
};
Surface.prototype.setOptions = function setOptions(options) {
    if (options.size)
        this.setSize(options.size);
    if (options.classes)
        this.setClasses(options.classes);
    if (options.properties)
        this.setProperties(options.properties);
    if (options.attributes)
        this.setAttributes(options.attributes);
    if (options.content)
        this.setContent(options.content);
    return this;
};
function _cleanupClasses(target) {
    for (var i = 0; i < this._dirtyClasses.length; i++)
        target.classList.remove(this._dirtyClasses[i]);
    this._dirtyClasses = [];
}
function _applyStyles(target) {
    for (var n in this.properties) {
        target.style[n] = this.properties[n];
    }
}
function _cleanupStyles(target) {
    for (var n in this.properties) {
        target.style[n] = '';
    }
}
function _applyAttributes(target) {
    for (var n in this.attributes) {
        target.setAttribute(n, this.attributes[n]);
    }
}
function _cleanupAttributes(target) {
    for (var n in this.attributes) {
        target.removeAttribute(n);
    }
}
function _xyNotEquals(a, b) {
    return a && b ? a[0] !== b[0] || a[1] !== b[1] : a !== b;
}
Surface.prototype.setup = function setup(allocator) {
    var target = allocator.allocate(this.elementType);
    if (this.elementClass) {
        if (this.elementClass instanceof Array) {
            for (var i = 0; i < this.elementClass.length; i++) {
                target.classList.add(this.elementClass[i]);
            }
        } else {
            target.classList.add(this.elementClass);
        }
    }
    target.style.display = '';
    this.attach(target);
    this._opacity = null;
    this._currentTarget = target;
    this._stylesDirty = true;
    this._classesDirty = true;
    this._attributesDirty = true;
    this._sizeDirty = true;
    this._contentDirty = true;
    this._originDirty = true;
    this._transformDirty = true;
};
Surface.prototype.commit = function commit(context) {
    if (!this._currentTarget)
        this.setup(context.allocator);
    var target = this._currentTarget;
    var size = context.size;
    if (this._classesDirty) {
        _cleanupClasses.call(this, target);
        var classList = this.getClassList();
        for (var i = 0; i < classList.length; i++)
            target.classList.add(classList[i]);
        this._classesDirty = false;
        this._trueSizeCheck = true;
    }
    if (this._stylesDirty) {
        _applyStyles.call(this, target);
        this._stylesDirty = false;
        this._trueSizeCheck = true;
    }
    if (this._attributesDirty) {
        _applyAttributes.call(this, target);
        this._attributesDirty = false;
        this._trueSizeCheck = true;
    }
    if (this.size) {
        var origSize = context.size;
        size = [
            this.size[0],
            this.size[1]
        ];
        if (size[0] === undefined)
            size[0] = origSize[0];
        if (size[1] === undefined)
            size[1] = origSize[1];
        if (size[0] === true || size[1] === true) {
            if (size[0] === true && (this._trueSizeCheck || this._size[0] === 0)) {
                var width = target.offsetWidth;
                if (this._size && this._size[0] !== width) {
                    this._size[0] = width;
                    this._sizeDirty = true;
                }
                size[0] = width;
            } else {
                if (this._size)
                    size[0] = this._size[0];
            }
            if (size[1] === true && (this._trueSizeCheck || this._size[1] === 0)) {
                var height = target.offsetHeight;
                if (this._size && this._size[1] !== height) {
                    this._size[1] = height;
                    this._sizeDirty = true;
                }
                size[1] = height;
            } else {
                if (this._size)
                    size[1] = this._size[1];
            }
            this._trueSizeCheck = false;
        }
    }
    if (_xyNotEquals(this._size, size)) {
        if (!this._size)
            this._size = [
                0,
                0
            ];
        this._size[0] = size[0];
        this._size[1] = size[1];
        this._sizeDirty = true;
    }
    if (this._sizeDirty) {
        if (this._size) {
            target.style.width = this.size && this.size[0] === true ? '' : this._size[0] + 'px';
            target.style.height = this.size && this.size[1] === true ? '' : this._size[1] + 'px';
        }
        this._eventOutput.emit('resize');
    }
    if (this._contentDirty) {
        this.deploy(target);
        this._eventOutput.emit('deploy');
        this._contentDirty = false;
        this._trueSizeCheck = true;
    }
    ElementOutput.prototype.commit.call(this, context);
};
Surface.prototype.cleanup = function cleanup(allocator) {
    var i = 0;
    var target = this._currentTarget;
    this._eventOutput.emit('recall');
    this.recall(target);
    target.style.display = 'none';
    target.style.opacity = '';
    target.style.width = '';
    target.style.height = '';
    _cleanupStyles.call(this, target);
    _cleanupAttributes.call(this, target);
    var classList = this.getClassList();
    _cleanupClasses.call(this, target);
    for (i = 0; i < classList.length; i++)
        target.classList.remove(classList[i]);
    if (this.elementClass) {
        if (this.elementClass instanceof Array) {
            for (i = 0; i < this.elementClass.length; i++) {
                target.classList.remove(this.elementClass[i]);
            }
        } else {
            target.classList.remove(this.elementClass);
        }
    }
    this.detach(target);
    this._currentTarget = null;
    allocator.deallocate(target);
};
Surface.prototype.deploy = function deploy(target) {
    var content = this.getContent();
    if (content instanceof Node) {
        while (target.hasChildNodes())
            target.removeChild(target.firstChild);
        target.appendChild(content);
    } else
        target.innerHTML = content;
};
Surface.prototype.recall = function recall(target) {
    var df = document.createDocumentFragment();
    while (target.hasChildNodes())
        df.appendChild(target.firstChild);
    this.setContent(df);
};
Surface.prototype.getSize = function getSize() {
    return this._size ? this._size : this.size;
};
Surface.prototype.setSize = function setSize(size) {
    this.size = size ? [
        size[0],
        size[1]
    ] : null;
    this._sizeDirty = true;
    return this;
};
module.exports = Surface;
},{"./ElementOutput":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/ElementOutput.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Transform.js":[function(require,module,exports){
var Transform = {};
Transform.precision = 0.000001;
Transform.identity = [
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1
];
Transform.multiply4x4 = function multiply4x4(a, b) {
    return [
        a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3],
        a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3],
        a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3],
        a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3],
        a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7],
        a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7],
        a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7],
        a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7],
        a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11],
        a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11],
        a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11],
        a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11],
        a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15],
        a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15],
        a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15],
        a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15]
    ];
};
Transform.multiply = function multiply(a, b) {
    return [
        a[0] * b[0] + a[4] * b[1] + a[8] * b[2],
        a[1] * b[0] + a[5] * b[1] + a[9] * b[2],
        a[2] * b[0] + a[6] * b[1] + a[10] * b[2],
        0,
        a[0] * b[4] + a[4] * b[5] + a[8] * b[6],
        a[1] * b[4] + a[5] * b[5] + a[9] * b[6],
        a[2] * b[4] + a[6] * b[5] + a[10] * b[6],
        0,
        a[0] * b[8] + a[4] * b[9] + a[8] * b[10],
        a[1] * b[8] + a[5] * b[9] + a[9] * b[10],
        a[2] * b[8] + a[6] * b[9] + a[10] * b[10],
        0,
        a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12],
        a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13],
        a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14],
        1
    ];
};
Transform.thenMove = function thenMove(m, t) {
    if (!t[2])
        t[2] = 0;
    return [
        m[0],
        m[1],
        m[2],
        0,
        m[4],
        m[5],
        m[6],
        0,
        m[8],
        m[9],
        m[10],
        0,
        m[12] + t[0],
        m[13] + t[1],
        m[14] + t[2],
        1
    ];
};
Transform.moveThen = function moveThen(v, m) {
    if (!v[2])
        v[2] = 0;
    var t0 = v[0] * m[0] + v[1] * m[4] + v[2] * m[8];
    var t1 = v[0] * m[1] + v[1] * m[5] + v[2] * m[9];
    var t2 = v[0] * m[2] + v[1] * m[6] + v[2] * m[10];
    return Transform.thenMove(m, [
        t0,
        t1,
        t2
    ]);
};
Transform.translate = function translate(x, y, z) {
    if (z === undefined)
        z = 0;
    return [
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        x,
        y,
        z,
        1
    ];
};
Transform.thenScale = function thenScale(m, s) {
    return [
        s[0] * m[0],
        s[1] * m[1],
        s[2] * m[2],
        0,
        s[0] * m[4],
        s[1] * m[5],
        s[2] * m[6],
        0,
        s[0] * m[8],
        s[1] * m[9],
        s[2] * m[10],
        0,
        s[0] * m[12],
        s[1] * m[13],
        s[2] * m[14],
        1
    ];
};
Transform.scale = function scale(x, y, z) {
    if (z === undefined)
        z = 1;
    if (y === undefined)
        y = x;
    return [
        x,
        0,
        0,
        0,
        0,
        y,
        0,
        0,
        0,
        0,
        z,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.rotateX = function rotateX(theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return [
        1,
        0,
        0,
        0,
        0,
        cosTheta,
        sinTheta,
        0,
        0,
        -sinTheta,
        cosTheta,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.rotateY = function rotateY(theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return [
        cosTheta,
        0,
        -sinTheta,
        0,
        0,
        1,
        0,
        0,
        sinTheta,
        0,
        cosTheta,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.rotateZ = function rotateZ(theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return [
        cosTheta,
        sinTheta,
        0,
        0,
        -sinTheta,
        cosTheta,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.rotate = function rotate(phi, theta, psi) {
    var cosPhi = Math.cos(phi);
    var sinPhi = Math.sin(phi);
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    var cosPsi = Math.cos(psi);
    var sinPsi = Math.sin(psi);
    var result = [
            cosTheta * cosPsi,
            cosPhi * sinPsi + sinPhi * sinTheta * cosPsi,
            sinPhi * sinPsi - cosPhi * sinTheta * cosPsi,
            0,
            -cosTheta * sinPsi,
            cosPhi * cosPsi - sinPhi * sinTheta * sinPsi,
            sinPhi * cosPsi + cosPhi * sinTheta * sinPsi,
            0,
            sinTheta,
            -sinPhi * cosTheta,
            cosPhi * cosTheta,
            0,
            0,
            0,
            0,
            1
        ];
    return result;
};
Transform.rotateAxis = function rotateAxis(v, theta) {
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    var verTheta = 1 - cosTheta;
    var xxV = v[0] * v[0] * verTheta;
    var xyV = v[0] * v[1] * verTheta;
    var xzV = v[0] * v[2] * verTheta;
    var yyV = v[1] * v[1] * verTheta;
    var yzV = v[1] * v[2] * verTheta;
    var zzV = v[2] * v[2] * verTheta;
    var xs = v[0] * sinTheta;
    var ys = v[1] * sinTheta;
    var zs = v[2] * sinTheta;
    var result = [
            xxV + cosTheta,
            xyV + zs,
            xzV - ys,
            0,
            xyV - zs,
            yyV + cosTheta,
            yzV + xs,
            0,
            xzV + ys,
            yzV - xs,
            zzV + cosTheta,
            0,
            0,
            0,
            0,
            1
        ];
    return result;
};
Transform.aboutOrigin = function aboutOrigin(v, m) {
    var t0 = v[0] - (v[0] * m[0] + v[1] * m[4] + v[2] * m[8]);
    var t1 = v[1] - (v[0] * m[1] + v[1] * m[5] + v[2] * m[9]);
    var t2 = v[2] - (v[0] * m[2] + v[1] * m[6] + v[2] * m[10]);
    return Transform.thenMove(m, [
        t0,
        t1,
        t2
    ]);
};
Transform.skew = function skew(phi, theta, psi) {
    return [
        1,
        Math.tan(theta),
        0,
        0,
        Math.tan(psi),
        1,
        0,
        0,
        0,
        Math.tan(phi),
        1,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.skewX = function skewX(angle) {
    return [
        1,
        0,
        0,
        0,
        Math.tan(angle),
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.skewY = function skewY(angle) {
    return [
        1,
        Math.tan(angle),
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.perspective = function perspective(focusZ) {
    return [
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        -1 / focusZ,
        0,
        0,
        0,
        1
    ];
};
Transform.getTranslate = function getTranslate(m) {
    return [
        m[12],
        m[13],
        m[14]
    ];
};
Transform.inverse = function inverse(m) {
    var c0 = m[5] * m[10] - m[6] * m[9];
    var c1 = m[4] * m[10] - m[6] * m[8];
    var c2 = m[4] * m[9] - m[5] * m[8];
    var c4 = m[1] * m[10] - m[2] * m[9];
    var c5 = m[0] * m[10] - m[2] * m[8];
    var c6 = m[0] * m[9] - m[1] * m[8];
    var c8 = m[1] * m[6] - m[2] * m[5];
    var c9 = m[0] * m[6] - m[2] * m[4];
    var c10 = m[0] * m[5] - m[1] * m[4];
    var detM = m[0] * c0 - m[1] * c1 + m[2] * c2;
    var invD = 1 / detM;
    var result = [
            invD * c0,
            -invD * c4,
            invD * c8,
            0,
            -invD * c1,
            invD * c5,
            -invD * c9,
            0,
            invD * c2,
            -invD * c6,
            invD * c10,
            0,
            0,
            0,
            0,
            1
        ];
    result[12] = -m[12] * result[0] - m[13] * result[4] - m[14] * result[8];
    result[13] = -m[12] * result[1] - m[13] * result[5] - m[14] * result[9];
    result[14] = -m[12] * result[2] - m[13] * result[6] - m[14] * result[10];
    return result;
};
Transform.transpose = function transpose(m) {
    return [
        m[0],
        m[4],
        m[8],
        m[12],
        m[1],
        m[5],
        m[9],
        m[13],
        m[2],
        m[6],
        m[10],
        m[14],
        m[3],
        m[7],
        m[11],
        m[15]
    ];
};
function _normSquared(v) {
    return v.length === 2 ? v[0] * v[0] + v[1] * v[1] : v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
}
function _norm(v) {
    return Math.sqrt(_normSquared(v));
}
function _sign(n) {
    return n < 0 ? -1 : 1;
}
Transform.interpret = function interpret(M) {
    var x = [
            M[0],
            M[1],
            M[2]
        ];
    var sgn = _sign(x[0]);
    var xNorm = _norm(x);
    var v = [
            x[0] + sgn * xNorm,
            x[1],
            x[2]
        ];
    var mult = 2 / _normSquared(v);
    if (mult >= Infinity) {
        return {
            translate: Transform.getTranslate(M),
            rotate: [
                0,
                0,
                0
            ],
            scale: [
                0,
                0,
                0
            ],
            skew: [
                0,
                0,
                0
            ]
        };
    }
    var Q1 = [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1
        ];
    Q1[0] = 1 - mult * v[0] * v[0];
    Q1[5] = 1 - mult * v[1] * v[1];
    Q1[10] = 1 - mult * v[2] * v[2];
    Q1[1] = -mult * v[0] * v[1];
    Q1[2] = -mult * v[0] * v[2];
    Q1[6] = -mult * v[1] * v[2];
    Q1[4] = Q1[1];
    Q1[8] = Q1[2];
    Q1[9] = Q1[6];
    var MQ1 = Transform.multiply(Q1, M);
    var x2 = [
            MQ1[5],
            MQ1[6]
        ];
    var sgn2 = _sign(x2[0]);
    var x2Norm = _norm(x2);
    var v2 = [
            x2[0] + sgn2 * x2Norm,
            x2[1]
        ];
    var mult2 = 2 / _normSquared(v2);
    var Q2 = [
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1
        ];
    Q2[5] = 1 - mult2 * v2[0] * v2[0];
    Q2[10] = 1 - mult2 * v2[1] * v2[1];
    Q2[6] = -mult2 * v2[0] * v2[1];
    Q2[9] = Q2[6];
    var Q = Transform.multiply(Q2, Q1);
    var R = Transform.multiply(Q, M);
    var remover = Transform.scale(R[0] < 0 ? -1 : 1, R[5] < 0 ? -1 : 1, R[10] < 0 ? -1 : 1);
    R = Transform.multiply(R, remover);
    Q = Transform.multiply(remover, Q);
    var result = {};
    result.translate = Transform.getTranslate(M);
    result.rotate = [
        Math.atan2(-Q[6], Q[10]),
        Math.asin(Q[2]),
        Math.atan2(-Q[1], Q[0])
    ];
    if (!result.rotate[0]) {
        result.rotate[0] = 0;
        result.rotate[2] = Math.atan2(Q[4], Q[5]);
    }
    result.scale = [
        R[0],
        R[5],
        R[10]
    ];
    result.skew = [
        Math.atan2(R[9], result.scale[2]),
        Math.atan2(R[8], result.scale[2]),
        Math.atan2(R[4], result.scale[0])
    ];
    if (Math.abs(result.rotate[0]) + Math.abs(result.rotate[2]) > 1.5 * Math.PI) {
        result.rotate[1] = Math.PI - result.rotate[1];
        if (result.rotate[1] > Math.PI)
            result.rotate[1] -= 2 * Math.PI;
        if (result.rotate[1] < -Math.PI)
            result.rotate[1] += 2 * Math.PI;
        if (result.rotate[0] < 0)
            result.rotate[0] += Math.PI;
        else
            result.rotate[0] -= Math.PI;
        if (result.rotate[2] < 0)
            result.rotate[2] += Math.PI;
        else
            result.rotate[2] -= Math.PI;
    }
    return result;
};
Transform.average = function average(M1, M2, t) {
    t = t === undefined ? 0.5 : t;
    var specM1 = Transform.interpret(M1);
    var specM2 = Transform.interpret(M2);
    var specAvg = {
            translate: [
                0,
                0,
                0
            ],
            rotate: [
                0,
                0,
                0
            ],
            scale: [
                0,
                0,
                0
            ],
            skew: [
                0,
                0,
                0
            ]
        };
    for (var i = 0; i < 3; i++) {
        specAvg.translate[i] = (1 - t) * specM1.translate[i] + t * specM2.translate[i];
        specAvg.rotate[i] = (1 - t) * specM1.rotate[i] + t * specM2.rotate[i];
        specAvg.scale[i] = (1 - t) * specM1.scale[i] + t * specM2.scale[i];
        specAvg.skew[i] = (1 - t) * specM1.skew[i] + t * specM2.skew[i];
    }
    return Transform.build(specAvg);
};
Transform.build = function build(spec) {
    var scaleMatrix = Transform.scale(spec.scale[0], spec.scale[1], spec.scale[2]);
    var skewMatrix = Transform.skew(spec.skew[0], spec.skew[1], spec.skew[2]);
    var rotateMatrix = Transform.rotate(spec.rotate[0], spec.rotate[1], spec.rotate[2]);
    return Transform.thenMove(Transform.multiply(Transform.multiply(rotateMatrix, skewMatrix), scaleMatrix), spec.translate);
};
Transform.equals = function equals(a, b) {
    return !Transform.notEquals(a, b);
};
Transform.notEquals = function notEquals(a, b) {
    if (a === b)
        return false;
    return !(a && b) || a[12] !== b[12] || a[13] !== b[13] || a[14] !== b[14] || a[0] !== b[0] || a[1] !== b[1] || a[2] !== b[2] || a[4] !== b[4] || a[5] !== b[5] || a[6] !== b[6] || a[8] !== b[8] || a[9] !== b[9] || a[10] !== b[10];
};
Transform.normalizeRotation = function normalizeRotation(rotation) {
    var result = rotation.slice(0);
    if (result[0] === Math.PI * 0.5 || result[0] === -Math.PI * 0.5) {
        result[0] = -result[0];
        result[1] = Math.PI - result[1];
        result[2] -= Math.PI;
    }
    if (result[0] > Math.PI * 0.5) {
        result[0] = result[0] - Math.PI;
        result[1] = Math.PI - result[1];
        result[2] -= Math.PI;
    }
    if (result[0] < -Math.PI * 0.5) {
        result[0] = result[0] + Math.PI;
        result[1] = -Math.PI - result[1];
        result[2] -= Math.PI;
    }
    while (result[1] < -Math.PI)
        result[1] += 2 * Math.PI;
    while (result[1] >= Math.PI)
        result[1] -= 2 * Math.PI;
    while (result[2] < -Math.PI)
        result[2] += 2 * Math.PI;
    while (result[2] >= Math.PI)
        result[2] -= 2 * Math.PI;
    return result;
};
Transform.inFront = [
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0.001,
    1
];
Transform.behind = [
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    -0.001,
    1
];
module.exports = Transform;
},{}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/View.js":[function(require,module,exports){
var EventHandler = require('./EventHandler');
var OptionsManager = require('./OptionsManager');
var RenderNode = require('./RenderNode');
var Utility = require('../utilities/Utility');
function View(options) {
    this._node = new RenderNode();
    this._eventInput = new EventHandler();
    this._eventOutput = new EventHandler();
    EventHandler.setInputHandler(this, this._eventInput);
    EventHandler.setOutputHandler(this, this._eventOutput);
    this.options = Utility.clone(this.constructor.DEFAULT_OPTIONS || View.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
}
View.DEFAULT_OPTIONS = {};
View.prototype.getOptions = function getOptions(key) {
    return this._optionsManager.getOptions(key);
};
View.prototype.setOptions = function setOptions(options) {
    this._optionsManager.patch(options);
};
View.prototype.add = function add() {
    return this._node.add.apply(this._node, arguments);
};
View.prototype._add = View.prototype.add;
View.prototype.render = function render() {
    return this._node.render();
};
View.prototype.getSize = function getSize() {
    if (this._node && this._node.getSize) {
        return this._node.getSize.apply(this._node, arguments) || this.options.size;
    } else
        return this.options.size;
};
module.exports = View;
},{"../utilities/Utility":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/utilities/Utility.js","./EventHandler":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/EventHandler.js","./OptionsManager":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/OptionsManager.js","./RenderNode":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/RenderNode.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/ViewSequence.js":[function(require,module,exports){
function ViewSequence(options) {
    if (!options)
        options = [];
    if (options instanceof Array)
        options = { array: options };
    this._ = null;
    this.index = options.index || 0;
    if (options.array)
        this._ = new this.constructor.Backing(options.array);
    else if (options._)
        this._ = options._;
    if (this.index === this._.firstIndex)
        this._.firstNode = this;
    if (this.index === this._.firstIndex + this._.array.length - 1)
        this._.lastNode = this;
    if (options.loop !== undefined)
        this._.loop = options.loop;
    if (options.trackSize !== undefined)
        this._.trackSize = options.trackSize;
    this._previousNode = null;
    this._nextNode = null;
}
ViewSequence.Backing = function Backing(array) {
    this.array = array;
    this.firstIndex = 0;
    this.loop = false;
    this.firstNode = null;
    this.lastNode = null;
    this.cumulativeSizes = [[
            0,
            0
        ]];
    this.sizeDirty = true;
    this.trackSize = false;
};
ViewSequence.Backing.prototype.getValue = function getValue(i) {
    var _i = i - this.firstIndex;
    if (_i < 0 || _i >= this.array.length)
        return null;
    return this.array[_i];
};
ViewSequence.Backing.prototype.setValue = function setValue(i, value) {
    this.array[i - this.firstIndex] = value;
};
ViewSequence.Backing.prototype.getSize = function getSize(index) {
    return this.cumulativeSizes[index];
};
ViewSequence.Backing.prototype.calculateSize = function calculateSize(index) {
    index = index || this.array.length;
    var size = [
            0,
            0
        ];
    for (var i = 0; i < index; i++) {
        var nodeSize = this.array[i].getSize();
        if (!nodeSize)
            return undefined;
        if (size[0] !== undefined) {
            if (nodeSize[0] === undefined)
                size[0] = undefined;
            else
                size[0] += nodeSize[0];
        }
        if (size[1] !== undefined) {
            if (nodeSize[1] === undefined)
                size[1] = undefined;
            else
                size[1] += nodeSize[1];
        }
        this.cumulativeSizes[i + 1] = size.slice();
    }
    this.sizeDirty = false;
    return size;
};
ViewSequence.Backing.prototype.reindex = function reindex(start, removeCount, insertCount) {
    if (!this.array[0])
        return;
    var i = 0;
    var index = this.firstIndex;
    var indexShiftAmount = insertCount - removeCount;
    var node = this.firstNode;
    while (index < start - 1) {
        node = node.getNext();
        index++;
    }
    var spliceStartNode = node;
    for (i = 0; i < removeCount; i++) {
        node = node.getNext();
        if (node)
            node._previousNode = spliceStartNode;
    }
    var spliceResumeNode = node ? node.getNext() : null;
    spliceStartNode._nextNode = null;
    node = spliceStartNode;
    for (i = 0; i < insertCount; i++)
        node = node.getNext();
    index += insertCount;
    if (node !== spliceResumeNode) {
        node._nextNode = spliceResumeNode;
        if (spliceResumeNode)
            spliceResumeNode._previousNode = node;
    }
    if (spliceResumeNode) {
        node = spliceResumeNode;
        index++;
        while (node && index < this.array.length + this.firstIndex) {
            if (node._nextNode)
                node.index += indexShiftAmount;
            else
                node.index = index;
            node = node.getNext();
            index++;
        }
    }
    if (this.trackSize)
        this.sizeDirty = true;
};
ViewSequence.prototype.getPrevious = function getPrevious() {
    var len = this._.array.length;
    if (!len) {
        this._previousNode = null;
    } else if (this.index === this._.firstIndex) {
        if (this._.loop) {
            this._previousNode = this._.lastNode || new this.constructor({
                _: this._,
                index: this._.firstIndex + len - 1
            });
            this._previousNode._nextNode = this;
        } else {
            this._previousNode = null;
        }
    } else if (!this._previousNode) {
        this._previousNode = new this.constructor({
            _: this._,
            index: this.index - 1
        });
        this._previousNode._nextNode = this;
    }
    return this._previousNode;
};
ViewSequence.prototype.getNext = function getNext() {
    var len = this._.array.length;
    if (!len) {
        this._nextNode = null;
    } else if (this.index === this._.firstIndex + len - 1) {
        if (this._.loop) {
            this._nextNode = this._.firstNode || new this.constructor({
                _: this._,
                index: this._.firstIndex
            });
            this._nextNode._previousNode = this;
        } else {
            this._nextNode = null;
        }
    } else if (!this._nextNode) {
        this._nextNode = new this.constructor({
            _: this._,
            index: this.index + 1
        });
        this._nextNode._previousNode = this;
    }
    return this._nextNode;
};
ViewSequence.prototype.indexOf = function indexOf(item) {
    return this._.array.indexOf(item);
};
ViewSequence.prototype.getIndex = function getIndex() {
    return this.index;
};
ViewSequence.prototype.toString = function toString() {
    return '' + this.index;
};
ViewSequence.prototype.unshift = function unshift(value) {
    this._.array.unshift.apply(this._.array, arguments);
    this._.firstIndex -= arguments.length;
    if (this._.trackSize)
        this._.sizeDirty = true;
};
ViewSequence.prototype.push = function push(value) {
    this._.array.push.apply(this._.array, arguments);
    if (this._.trackSize)
        this._.sizeDirty = true;
};
ViewSequence.prototype.splice = function splice(index, howMany) {
    var values = Array.prototype.slice.call(arguments, 2);
    this._.array.splice.apply(this._.array, [
        index - this._.firstIndex,
        howMany
    ].concat(values));
    this._.reindex(index, howMany, values.length);
};
ViewSequence.prototype.swap = function swap(other) {
    var otherValue = other.get();
    var myValue = this.get();
    this._.setValue(this.index, otherValue);
    this._.setValue(other.index, myValue);
    var myPrevious = this._previousNode;
    var myNext = this._nextNode;
    var myIndex = this.index;
    var otherPrevious = other._previousNode;
    var otherNext = other._nextNode;
    var otherIndex = other.index;
    this.index = otherIndex;
    this._previousNode = otherPrevious === this ? other : otherPrevious;
    if (this._previousNode)
        this._previousNode._nextNode = this;
    this._nextNode = otherNext === this ? other : otherNext;
    if (this._nextNode)
        this._nextNode._previousNode = this;
    other.index = myIndex;
    other._previousNode = myPrevious === other ? this : myPrevious;
    if (other._previousNode)
        other._previousNode._nextNode = other;
    other._nextNode = myNext === other ? this : myNext;
    if (other._nextNode)
        other._nextNode._previousNode = other;
    if (this.index === this._.firstIndex)
        this._.firstNode = this;
    else if (this.index === this._.firstIndex + this._.array.length - 1)
        this._.lastNode = this;
    if (other.index === this._.firstIndex)
        this._.firstNode = other;
    else if (other.index === this._.firstIndex + this._.array.length - 1)
        this._.lastNode = other;
    if (this._.trackSize)
        this._.sizeDirty = true;
};
ViewSequence.prototype.get = function get() {
    return this._.getValue(this.index);
};
ViewSequence.prototype.getSize = function getSize() {
    var target = this.get();
    return target ? target.getSize() : null;
};
ViewSequence.prototype.render = function render() {
    if (this._.trackSize && this._.sizeDirty)
        this._.calculateSize();
    var target = this.get();
    return target ? target.render.apply(target, arguments) : null;
};
module.exports = ViewSequence;
},{}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/famous.css":[function(require,module,exports){
var css = "/* This Source Code Form is subject to the terms of the Mozilla Public\n * License, v. 2.0. If a copy of the MPL was not distributed with this\n * file, You can obtain one at http://mozilla.org/MPL/2.0/.\n *\n * Owner: mark@famo.us\n * @license MPL 2.0\n * @copyright Famous Industries, Inc. 2014\n */\n\n.famous-root {\n    width: 100%;\n    height: 100%;\n    margin: 0px;\n    padding: 0px;\n    overflow: hidden;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n}\n\n.famous-container, .famous-group {\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    bottom: 0px;\n    right: 0px;\n    overflow: visible;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-backface-visibility: visible;\n    backface-visibility: visible;\n    pointer-events: none;\n}\n\n.famous-group {\n    width: 0px;\n    height: 0px;\n    margin: 0px;\n    padding: 0px;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n}\n\n.famous-surface {\n    position: absolute;\n    -webkit-transform-origin: center center;\n    transform-origin: center center;\n    -webkit-backface-visibility: hidden;\n    backface-visibility: hidden;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    -webkit-tap-highlight-color: transparent;\n    pointer-events: auto;\n}\n\n.famous-container-group {\n    position: relative;\n    width: 100%;\n    height: 100%;\n}\n"; (require("/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/cssify"))(css); module.exports = css;
},{"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/cssify":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/cssify/browser.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/inputs/GenericSync.js":[function(require,module,exports){
var EventHandler = require('../core/EventHandler');
function GenericSync(syncs, options) {
    this._eventInput = new EventHandler();
    this._eventOutput = new EventHandler();
    EventHandler.setInputHandler(this, this._eventInput);
    EventHandler.setOutputHandler(this, this._eventOutput);
    this._syncs = {};
    if (syncs)
        this.addSync(syncs);
    if (options)
        this.setOptions(options);
}
GenericSync.DIRECTION_X = 0;
GenericSync.DIRECTION_Y = 1;
GenericSync.DIRECTION_Z = 2;
var registry = {};
GenericSync.register = function register(syncObject) {
    for (var key in syncObject) {
        if (registry[key]) {
            if (registry[key] === syncObject[key])
                return;
            else
                throw new Error('this key is registered to a different sync class');
        } else
            registry[key] = syncObject[key];
    }
};
GenericSync.prototype.setOptions = function (options) {
    for (var key in this._syncs) {
        this._syncs[key].setOptions(options);
    }
};
GenericSync.prototype.pipeSync = function pipeToSync(key) {
    var sync = this._syncs[key];
    this._eventInput.pipe(sync);
    sync.pipe(this._eventOutput);
};
GenericSync.prototype.unpipeSync = function unpipeFromSync(key) {
    var sync = this._syncs[key];
    this._eventInput.unpipe(sync);
    sync.unpipe(this._eventOutput);
};
function _addSingleSync(key, options) {
    if (!registry[key])
        return;
    this._syncs[key] = new registry[key](options);
    this.pipeSync(key);
}
GenericSync.prototype.addSync = function addSync(syncs) {
    if (syncs instanceof Array)
        for (var i = 0; i < syncs.length; i++)
            _addSingleSync.call(this, syncs[i]);
    else if (syncs instanceof Object)
        for (var key in syncs)
            _addSingleSync.call(this, key, syncs[key]);
};
module.exports = GenericSync;
},{"../core/EventHandler":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/EventHandler.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/inputs/MouseSync.js":[function(require,module,exports){
var EventHandler = require('../core/EventHandler');
var OptionsManager = require('../core/OptionsManager');
function MouseSync(options) {
    this.options = Object.create(MouseSync.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    this._eventInput = new EventHandler();
    this._eventOutput = new EventHandler();
    EventHandler.setInputHandler(this, this._eventInput);
    EventHandler.setOutputHandler(this, this._eventOutput);
    this._eventInput.on('mousedown', _handleStart.bind(this));
    this._eventInput.on('mousemove', _handleMove.bind(this));
    this._eventInput.on('mouseup', _handleEnd.bind(this));
    if (this.options.propogate)
        this._eventInput.on('mouseleave', _handleLeave.bind(this));
    else
        this._eventInput.on('mouseleave', _handleEnd.bind(this));
    this._payload = {
        delta: null,
        position: null,
        velocity: null,
        clientX: 0,
        clientY: 0,
        offsetX: 0,
        offsetY: 0
    };
    this._positionHistory = [];
    this._position = null;
    this._prevCoord = undefined;
    this._prevTime = undefined;
    this._down = false;
    this._moved = false;
    this._documentActive = false;
}
MouseSync.DEFAULT_OPTIONS = {
    direction: undefined,
    rails: false,
    scale: 1,
    propogate: true,
    velocitySampleLength: 10,
    preventDefault: true
};
MouseSync.DIRECTION_X = 0;
MouseSync.DIRECTION_Y = 1;
var MINIMUM_TICK_TIME = 8;
function _handleStart(event) {
    var delta;
    var velocity;
    if (this.options.preventDefault)
        event.preventDefault();
    var x = event.clientX;
    var y = event.clientY;
    this._prevCoord = [
        x,
        y
    ];
    this._prevTime = Date.now();
    this._down = true;
    this._move = false;
    if (this.options.direction !== undefined) {
        this._position = 0;
        delta = 0;
        velocity = 0;
    } else {
        this._position = [
            0,
            0
        ];
        delta = [
            0,
            0
        ];
        velocity = [
            0,
            0
        ];
    }
    var payload = this._payload;
    payload.delta = delta;
    payload.position = this._position;
    payload.velocity = velocity;
    payload.clientX = x;
    payload.clientY = y;
    payload.offsetX = event.offsetX;
    payload.offsetY = event.offsetY;
    this._positionHistory.push({
        position: payload.position.slice ? payload.position.slice(0) : payload.position,
        time: this._prevTime
    });
    this._eventOutput.emit('start', payload);
    this._documentActive = false;
}
function _handleMove(event) {
    if (!this._prevCoord)
        return;
    var prevCoord = this._prevCoord;
    var prevTime = this._prevTime;
    var x = event.clientX;
    var y = event.clientY;
    var currTime = Date.now();
    var diffX = x - prevCoord[0];
    var diffY = y - prevCoord[1];
    if (this.options.rails) {
        if (Math.abs(diffX) > Math.abs(diffY))
            diffY = 0;
        else
            diffX = 0;
    }
    var diffTime = Math.max(currTime - this._positionHistory[0].time, MINIMUM_TICK_TIME);
    var scale = this.options.scale;
    var nextVel;
    var nextDelta;
    if (this.options.direction === MouseSync.DIRECTION_X) {
        nextDelta = scale * diffX;
        this._position += nextDelta;
        nextVel = scale * (this._position - this._positionHistory[0].position) / diffTime;
    } else if (this.options.direction === MouseSync.DIRECTION_Y) {
        nextDelta = scale * diffY;
        this._position += nextDelta;
        nextVel = scale * (this._position - this._positionHistory[0].position) / diffTime;
    } else {
        nextDelta = [
            scale * diffX,
            scale * diffY
        ];
        nextVel = [
            scale * (this._position[0] - this._positionHistory[0].position[0]) / diffTime,
            scale * (this._position[1] - this._positionHistory[0].position[1]) / diffTime
        ];
        this._position[0] += nextDelta[0];
        this._position[1] += nextDelta[1];
    }
    var payload = this._payload;
    payload.delta = nextDelta;
    payload.position = this._position;
    payload.velocity = nextVel;
    payload.clientX = x;
    payload.clientY = y;
    payload.offsetX = event.offsetX;
    payload.offsetY = event.offsetY;
    if (this._positionHistory.length === this.options.velocitySampleLength) {
        this._positionHistory.shift();
    }
    this._positionHistory.push({
        position: payload.position.slice ? payload.position.slice(0) : payload.position,
        time: currTime
    });
    this._eventOutput.emit('update', payload);
    this._prevCoord = [
        x,
        y
    ];
    this._prevTime = currTime;
    this._move = true;
}
function _handleEnd(event) {
    if (!this._down)
        return;
    this._eventOutput.emit('end', this._payload);
    this._prevCoord = undefined;
    this._prevTime = undefined;
    this._down = false;
    this._move = false;
    this._positionHistory = [];
}
function _handleLeave(event) {
    if (!this._down || !this._move)
        return;
    if (!this._documentActive) {
        var boundMove = _handleMove.bind(this);
        var boundEnd = function (event) {
                _handleEnd.call(this, event);
                document.removeEventListener('mousemove', boundMove);
                document.removeEventListener('mouseup', boundEnd);
            }.bind(this, event);
        document.addEventListener('mousemove', boundMove);
        document.addEventListener('mouseup', boundEnd);
        this._documentActive = true;
    }
}
MouseSync.prototype.getOptions = function getOptions() {
    return this.options;
};
MouseSync.prototype.setOptions = function setOptions(options) {
    return this._optionsManager.setOptions(options);
};
module.exports = MouseSync;
},{"../core/EventHandler":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/EventHandler.js","../core/OptionsManager":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/OptionsManager.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/inputs/ScrollSync.js":[function(require,module,exports){
var EventHandler = require('../core/EventHandler');
var Engine = require('../core/Engine');
var OptionsManager = require('../core/OptionsManager');
function ScrollSync(options) {
    this.options = Object.create(ScrollSync.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    this._payload = {
        delta: null,
        position: null,
        velocity: null,
        slip: true
    };
    this._eventInput = new EventHandler();
    this._eventOutput = new EventHandler();
    EventHandler.setInputHandler(this, this._eventInput);
    EventHandler.setOutputHandler(this, this._eventOutput);
    this._position = this.options.direction === undefined ? [
        0,
        0
    ] : 0;
    this._prevTime = undefined;
    this._prevVel = undefined;
    this._eventInput.on('mousewheel', _handleMove.bind(this));
    this._eventInput.on('wheel', _handleMove.bind(this));
    this._inProgress = false;
    this._loopBound = false;
}
ScrollSync.DEFAULT_OPTIONS = {
    direction: undefined,
    minimumEndSpeed: Infinity,
    rails: false,
    scale: 1,
    stallTime: 50,
    lineHeight: 40,
    preventDefault: true
};
ScrollSync.DIRECTION_X = 0;
ScrollSync.DIRECTION_Y = 1;
var MINIMUM_TICK_TIME = 8;
var _now = Date.now;
function _newFrame() {
    if (this._inProgress && _now() - this._prevTime > this.options.stallTime) {
        this._inProgress = false;
        var finalVel = Math.abs(this._prevVel) >= this.options.minimumEndSpeed ? this._prevVel : 0;
        var payload = this._payload;
        payload.position = this._position;
        payload.velocity = finalVel;
        payload.slip = true;
        this._eventOutput.emit('end', payload);
    }
}
function _handleMove(event) {
    if (this.options.preventDefault)
        event.preventDefault();
    if (!this._inProgress) {
        this._inProgress = true;
        this._position = this.options.direction === undefined ? [
            0,
            0
        ] : 0;
        payload = this._payload;
        payload.slip = true;
        payload.position = this._position;
        payload.clientX = event.clientX;
        payload.clientY = event.clientY;
        payload.offsetX = event.offsetX;
        payload.offsetY = event.offsetY;
        this._eventOutput.emit('start', payload);
        if (!this._loopBound) {
            Engine.on('prerender', _newFrame.bind(this));
            this._loopBound = true;
        }
    }
    var currTime = _now();
    var prevTime = this._prevTime || currTime;
    var diffX = event.wheelDeltaX !== undefined ? event.wheelDeltaX : -event.deltaX;
    var diffY = event.wheelDeltaY !== undefined ? event.wheelDeltaY : -event.deltaY;
    if (event.deltaMode === 1) {
        diffX *= this.options.lineHeight;
        diffY *= this.options.lineHeight;
    }
    if (this.options.rails) {
        if (Math.abs(diffX) > Math.abs(diffY))
            diffY = 0;
        else
            diffX = 0;
    }
    var diffTime = Math.max(currTime - prevTime, MINIMUM_TICK_TIME);
    var velX = diffX / diffTime;
    var velY = diffY / diffTime;
    var scale = this.options.scale;
    var nextVel;
    var nextDelta;
    if (this.options.direction === ScrollSync.DIRECTION_X) {
        nextDelta = scale * diffX;
        nextVel = scale * velX;
        this._position += nextDelta;
    } else if (this.options.direction === ScrollSync.DIRECTION_Y) {
        nextDelta = scale * diffY;
        nextVel = scale * velY;
        this._position += nextDelta;
    } else {
        nextDelta = [
            scale * diffX,
            scale * diffY
        ];
        nextVel = [
            scale * velX,
            scale * velY
        ];
        this._position[0] += nextDelta[0];
        this._position[1] += nextDelta[1];
    }
    var payload = this._payload;
    payload.delta = nextDelta;
    payload.velocity = nextVel;
    payload.position = this._position;
    payload.slip = true;
    this._eventOutput.emit('update', payload);
    this._prevTime = currTime;
    this._prevVel = nextVel;
}
ScrollSync.prototype.getOptions = function getOptions() {
    return this.options;
};
ScrollSync.prototype.setOptions = function setOptions(options) {
    return this._optionsManager.setOptions(options);
};
module.exports = ScrollSync;
},{"../core/Engine":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Engine.js","../core/EventHandler":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/EventHandler.js","../core/OptionsManager":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/OptionsManager.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/inputs/TouchSync.js":[function(require,module,exports){
var TouchTracker = require('./TouchTracker');
var EventHandler = require('../core/EventHandler');
var OptionsManager = require('../core/OptionsManager');
function TouchSync(options) {
    this.options = Object.create(TouchSync.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    this._eventOutput = new EventHandler();
    this._touchTracker = new TouchTracker({ touchLimit: this.options.touchLimit });
    EventHandler.setOutputHandler(this, this._eventOutput);
    EventHandler.setInputHandler(this, this._touchTracker);
    this._touchTracker.on('trackstart', _handleStart.bind(this));
    this._touchTracker.on('trackmove', _handleMove.bind(this));
    this._touchTracker.on('trackend', _handleEnd.bind(this));
    this._payload = {
        delta: null,
        position: null,
        velocity: null,
        clientX: undefined,
        clientY: undefined,
        count: 0,
        touch: undefined
    };
    this._position = null;
}
TouchSync.DEFAULT_OPTIONS = {
    direction: undefined,
    rails: false,
    touchLimit: 1,
    velocitySampleLength: 10,
    scale: 1
};
TouchSync.DIRECTION_X = 0;
TouchSync.DIRECTION_Y = 1;
var MINIMUM_TICK_TIME = 8;
function _handleStart(data) {
    var velocity;
    var delta;
    if (this.options.direction !== undefined) {
        this._position = 0;
        velocity = 0;
        delta = 0;
    } else {
        this._position = [
            0,
            0
        ];
        velocity = [
            0,
            0
        ];
        delta = [
            0,
            0
        ];
    }
    var payload = this._payload;
    payload.delta = delta;
    payload.position = this._position;
    payload.velocity = velocity;
    payload.clientX = data.x;
    payload.clientY = data.y;
    payload.count = data.count;
    payload.touch = data.identifier;
    this._eventOutput.emit('start', payload);
}
function _handleMove(data) {
    var history = data.history;
    var currHistory = history[history.length - 1];
    var prevHistory = history[history.length - 2];
    var distantHistory = history[history.length - this.options.velocitySampleLength] ? history[history.length - this.options.velocitySampleLength] : history[history.length - 2];
    var distantTime = distantHistory.timestamp;
    var currTime = currHistory.timestamp;
    var diffX = currHistory.x - prevHistory.x;
    var diffY = currHistory.y - prevHistory.y;
    var velDiffX = currHistory.x - distantHistory.x;
    var velDiffY = currHistory.y - distantHistory.y;
    if (this.options.rails) {
        if (Math.abs(diffX) > Math.abs(diffY))
            diffY = 0;
        else
            diffX = 0;
        if (Math.abs(velDiffX) > Math.abs(velDiffY))
            velDiffY = 0;
        else
            velDiffX = 0;
    }
    var diffTime = Math.max(currTime - distantTime, MINIMUM_TICK_TIME);
    var velX = velDiffX / diffTime;
    var velY = velDiffY / diffTime;
    var scale = this.options.scale;
    var nextVel;
    var nextDelta;
    if (this.options.direction === TouchSync.DIRECTION_X) {
        nextDelta = scale * diffX;
        nextVel = scale * velX;
        this._position += nextDelta;
    } else if (this.options.direction === TouchSync.DIRECTION_Y) {
        nextDelta = scale * diffY;
        nextVel = scale * velY;
        this._position += nextDelta;
    } else {
        nextDelta = [
            scale * diffX,
            scale * diffY
        ];
        nextVel = [
            scale * velX,
            scale * velY
        ];
        this._position[0] += nextDelta[0];
        this._position[1] += nextDelta[1];
    }
    var payload = this._payload;
    payload.delta = nextDelta;
    payload.velocity = nextVel;
    payload.position = this._position;
    payload.clientX = data.x;
    payload.clientY = data.y;
    payload.count = data.count;
    payload.touch = data.identifier;
    this._eventOutput.emit('update', payload);
}
function _handleEnd(data) {
    this._payload.count = data.count;
    this._eventOutput.emit('end', this._payload);
}
TouchSync.prototype.setOptions = function setOptions(options) {
    return this._optionsManager.setOptions(options);
};
TouchSync.prototype.getOptions = function getOptions() {
    return this.options;
};
module.exports = TouchSync;
},{"../core/EventHandler":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/EventHandler.js","../core/OptionsManager":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/OptionsManager.js","./TouchTracker":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/inputs/TouchTracker.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/inputs/TouchTracker.js":[function(require,module,exports){
var EventHandler = require('../core/EventHandler');
var _now = Date.now;
function _timestampTouch(touch, event, history) {
    return {
        x: touch.clientX,
        y: touch.clientY,
        identifier: touch.identifier,
        origin: event.origin,
        timestamp: _now(),
        count: event.touches.length,
        history: history
    };
}
function _handleStart(event) {
    if (event.touches.length > this.touchLimit)
        return;
    this.isTouched = true;
    for (var i = 0; i < event.changedTouches.length; i++) {
        var touch = event.changedTouches[i];
        var data = _timestampTouch(touch, event, null);
        this.eventOutput.emit('trackstart', data);
        if (!this.selective && !this.touchHistory[touch.identifier])
            this.track(data);
    }
}
function _handleMove(event) {
    if (event.touches.length > this.touchLimit)
        return;
    for (var i = 0; i < event.changedTouches.length; i++) {
        var touch = event.changedTouches[i];
        var history = this.touchHistory[touch.identifier];
        if (history) {
            var data = _timestampTouch(touch, event, history);
            this.touchHistory[touch.identifier].push(data);
            this.eventOutput.emit('trackmove', data);
        }
    }
}
function _handleEnd(event) {
    if (!this.isTouched)
        return;
    for (var i = 0; i < event.changedTouches.length; i++) {
        var touch = event.changedTouches[i];
        var history = this.touchHistory[touch.identifier];
        if (history) {
            var data = _timestampTouch(touch, event, history);
            this.eventOutput.emit('trackend', data);
            delete this.touchHistory[touch.identifier];
        }
    }
    this.isTouched = false;
}
function _handleUnpipe() {
    for (var i in this.touchHistory) {
        var history = this.touchHistory[i];
        this.eventOutput.emit('trackend', {
            touch: history[history.length - 1].touch,
            timestamp: Date.now(),
            count: 0,
            history: history
        });
        delete this.touchHistory[i];
    }
}
function TouchTracker(options) {
    this.selective = options.selective;
    this.touchLimit = options.touchLimit || 1;
    this.touchHistory = {};
    this.eventInput = new EventHandler();
    this.eventOutput = new EventHandler();
    EventHandler.setInputHandler(this, this.eventInput);
    EventHandler.setOutputHandler(this, this.eventOutput);
    this.eventInput.on('touchstart', _handleStart.bind(this));
    this.eventInput.on('touchmove', _handleMove.bind(this));
    this.eventInput.on('touchend', _handleEnd.bind(this));
    this.eventInput.on('touchcancel', _handleEnd.bind(this));
    this.eventInput.on('unpipe', _handleUnpipe.bind(this));
    this.isTouched = false;
}
TouchTracker.prototype.track = function track(data) {
    this.touchHistory[data.identifier] = [data];
};
module.exports = TouchTracker;
},{"../core/EventHandler":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/EventHandler.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/math/Vector.js":[function(require,module,exports){
function Vector(x, y, z) {
    if (arguments.length === 1 && x !== undefined)
        this.set(x);
    else {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }
    return this;
}
var _register = new Vector(0, 0, 0);
Vector.prototype.add = function add(v) {
    return _setXYZ.call(_register, this.x + v.x, this.y + v.y, this.z + v.z);
};
Vector.prototype.sub = function sub(v) {
    return _setXYZ.call(_register, this.x - v.x, this.y - v.y, this.z - v.z);
};
Vector.prototype.mult = function mult(r) {
    return _setXYZ.call(_register, r * this.x, r * this.y, r * this.z);
};
Vector.prototype.div = function div(r) {
    return this.mult(1 / r);
};
Vector.prototype.cross = function cross(v) {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    var vx = v.x;
    var vy = v.y;
    var vz = v.z;
    return _setXYZ.call(_register, z * vy - y * vz, x * vz - z * vx, y * vx - x * vy);
};
Vector.prototype.equals = function equals(v) {
    return v.x === this.x && v.y === this.y && v.z === this.z;
};
Vector.prototype.rotateX = function rotateX(theta) {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return _setXYZ.call(_register, x, y * cosTheta - z * sinTheta, y * sinTheta + z * cosTheta);
};
Vector.prototype.rotateY = function rotateY(theta) {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return _setXYZ.call(_register, z * sinTheta + x * cosTheta, y, z * cosTheta - x * sinTheta);
};
Vector.prototype.rotateZ = function rotateZ(theta) {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return _setXYZ.call(_register, x * cosTheta - y * sinTheta, x * sinTheta + y * cosTheta, z);
};
Vector.prototype.dot = function dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
};
Vector.prototype.normSquared = function normSquared() {
    return this.dot(this);
};
Vector.prototype.norm = function norm() {
    return Math.sqrt(this.normSquared());
};
Vector.prototype.normalize = function normalize(length) {
    if (arguments.length === 0)
        length = 1;
    var norm = this.norm();
    if (norm > 1e-7)
        return _setFromVector.call(_register, this.mult(length / norm));
    else
        return _setXYZ.call(_register, length, 0, 0);
};
Vector.prototype.clone = function clone() {
    return new Vector(this);
};
Vector.prototype.isZero = function isZero() {
    return !(this.x || this.y || this.z);
};
function _setXYZ(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
}
function _setFromArray(v) {
    return _setXYZ.call(this, v[0], v[1], v[2] || 0);
}
function _setFromVector(v) {
    return _setXYZ.call(this, v.x, v.y, v.z);
}
function _setFromNumber(x) {
    return _setXYZ.call(this, x, 0, 0);
}
Vector.prototype.set = function set(v) {
    if (v instanceof Array)
        return _setFromArray.call(this, v);
    if (typeof v === 'number')
        return _setFromNumber.call(this, v);
    return _setFromVector.call(this, v);
};
Vector.prototype.setXYZ = function (x, y, z) {
    return _setXYZ.apply(this, arguments);
};
Vector.prototype.set1D = function (x) {
    return _setFromNumber.call(this, x);
};
Vector.prototype.put = function put(v) {
    if (this === _register)
        _setFromVector.call(v, _register);
    else
        _setFromVector.call(v, this);
};
Vector.prototype.clear = function clear() {
    return _setXYZ.call(this, 0, 0, 0);
};
Vector.prototype.cap = function cap(cap) {
    if (cap === Infinity)
        return _setFromVector.call(_register, this);
    var norm = this.norm();
    if (norm > cap)
        return _setFromVector.call(_register, this.mult(cap / norm));
    else
        return _setFromVector.call(_register, this);
};
Vector.prototype.project = function project(n) {
    return n.mult(this.dot(n));
};
Vector.prototype.reflectAcross = function reflectAcross(n) {
    n.normalize().put(n);
    return _setFromVector(_register, this.sub(this.project(n).mult(2)));
};
Vector.prototype.get = function get() {
    return [
        this.x,
        this.y,
        this.z
    ];
};
Vector.prototype.get1D = function () {
    return this.x;
};
module.exports = Vector;
},{}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/modifiers/StateModifier.js":[function(require,module,exports){
var Modifier = require('../core/Modifier');
var Transform = require('../core/Transform');
var Transitionable = require('../transitions/Transitionable');
var TransitionableTransform = require('../transitions/TransitionableTransform');
function StateModifier(options) {
    this._transformState = new TransitionableTransform(Transform.identity);
    this._opacityState = new Transitionable(1);
    this._originState = new Transitionable([
        0,
        0
    ]);
    this._alignState = new Transitionable([
        0,
        0
    ]);
    this._sizeState = new Transitionable([
        0,
        0
    ]);
    this._proportionsState = new Transitionable([
        0,
        0
    ]);
    this._modifier = new Modifier({
        transform: this._transformState,
        opacity: this._opacityState,
        origin: null,
        align: null,
        size: null,
        proportions: null
    });
    this._hasOrigin = false;
    this._hasAlign = false;
    this._hasSize = false;
    this._hasProportions = false;
    if (options) {
        if (options.transform)
            this.setTransform(options.transform);
        if (options.opacity !== undefined)
            this.setOpacity(options.opacity);
        if (options.origin)
            this.setOrigin(options.origin);
        if (options.align)
            this.setAlign(options.align);
        if (options.size)
            this.setSize(options.size);
        if (options.proportions)
            this.setProportions(options.proportions);
    }
}
StateModifier.prototype.setTransform = function setTransform(transform, transition, callback) {
    this._transformState.set(transform, transition, callback);
    return this;
};
StateModifier.prototype.setOpacity = function setOpacity(opacity, transition, callback) {
    this._opacityState.set(opacity, transition, callback);
    return this;
};
StateModifier.prototype.setOrigin = function setOrigin(origin, transition, callback) {
    if (origin === null) {
        if (this._hasOrigin) {
            this._modifier.originFrom(null);
            this._hasOrigin = false;
        }
        return this;
    } else if (!this._hasOrigin) {
        this._hasOrigin = true;
        this._modifier.originFrom(this._originState);
    }
    this._originState.set(origin, transition, callback);
    return this;
};
StateModifier.prototype.setAlign = function setOrigin(align, transition, callback) {
    if (align === null) {
        if (this._hasAlign) {
            this._modifier.alignFrom(null);
            this._hasAlign = false;
        }
        return this;
    } else if (!this._hasAlign) {
        this._hasAlign = true;
        this._modifier.alignFrom(this._alignState);
    }
    this._alignState.set(align, transition, callback);
    return this;
};
StateModifier.prototype.setSize = function setSize(size, transition, callback) {
    if (size === null) {
        if (this._hasSize) {
            this._modifier.sizeFrom(null);
            this._hasSize = false;
        }
        return this;
    } else if (!this._hasSize) {
        this._hasSize = true;
        this._modifier.sizeFrom(this._sizeState);
    }
    this._sizeState.set(size, transition, callback);
    return this;
};
StateModifier.prototype.setProportions = function setSize(proportions, transition, callback) {
    if (proportions === null) {
        if (this._hasProportions) {
            this._modifier.proportionsFrom(null);
            this._hasProportions = false;
        }
        return this;
    } else if (!this._hasProportions) {
        this._hasProportions = true;
        this._modifier.proportionsFrom(this._proportionsState);
    }
    this._proportionsState.set(proportions, transition, callback);
    return this;
};
StateModifier.prototype.halt = function halt() {
    this._transformState.halt();
    this._opacityState.halt();
    this._originState.halt();
    this._alignState.halt();
    this._sizeState.halt();
    this._proportionsState.halt();
};
StateModifier.prototype.getTransform = function getTransform() {
    return this._transformState.get();
};
StateModifier.prototype.getFinalTransform = function getFinalTransform() {
    return this._transformState.getFinal();
};
StateModifier.prototype.getOpacity = function getOpacity() {
    return this._opacityState.get();
};
StateModifier.prototype.getOrigin = function getOrigin() {
    return this._hasOrigin ? this._originState.get() : null;
};
StateModifier.prototype.getAlign = function getAlign() {
    return this._hasAlign ? this._alignState.get() : null;
};
StateModifier.prototype.getSize = function getSize() {
    return this._hasSize ? this._sizeState.get() : null;
};
StateModifier.prototype.getProportions = function getProportions() {
    return this._hasProportions ? this._proportionsState.get() : null;
};
StateModifier.prototype.modify = function modify(target) {
    return this._modifier.modify(target);
};
module.exports = StateModifier;
},{"../core/Modifier":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Modifier.js","../core/Transform":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Transform.js","../transitions/Transitionable":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/Transitionable.js","../transitions/TransitionableTransform":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/TransitionableTransform.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/physics/PhysicsEngine.js":[function(require,module,exports){
var EventHandler = require('../core/EventHandler');
function PhysicsEngine(options) {
    this.options = Object.create(PhysicsEngine.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this._particles = [];
    this._bodies = [];
    this._agentData = {};
    this._forces = [];
    this._constraints = [];
    this._buffer = 0;
    this._prevTime = now();
    this._isSleeping = false;
    this._eventHandler = null;
    this._currAgentId = 0;
    this._hasBodies = false;
    this._eventHandler = null;
}
var TIMESTEP = 17;
var MIN_TIME_STEP = 1000 / 120;
var MAX_TIME_STEP = 17;
var now = Date.now;
var _events = {
        start: 'start',
        update: 'update',
        end: 'end'
    };
PhysicsEngine.DEFAULT_OPTIONS = {
    constraintSteps: 1,
    sleepTolerance: 1e-7,
    velocityCap: undefined,
    angularVelocityCap: undefined
};
PhysicsEngine.prototype.setOptions = function setOptions(opts) {
    for (var key in opts)
        if (this.options[key])
            this.options[key] = opts[key];
};
PhysicsEngine.prototype.addBody = function addBody(body) {
    body._engine = this;
    if (body.isBody) {
        this._bodies.push(body);
        this._hasBodies = true;
    } else
        this._particles.push(body);
    body.on('start', this.wake.bind(this));
    return body;
};
PhysicsEngine.prototype.removeBody = function removeBody(body) {
    var array = body.isBody ? this._bodies : this._particles;
    var index = array.indexOf(body);
    if (index > -1) {
        for (var agent in this._agentData)
            this.detachFrom(agent.id, body);
        array.splice(index, 1);
    }
    if (this.getBodies().length === 0)
        this._hasBodies = false;
};
function _mapAgentArray(agent) {
    if (agent.applyForce)
        return this._forces;
    if (agent.applyConstraint)
        return this._constraints;
}
function _attachOne(agent, targets, source) {
    if (targets === undefined)
        targets = this.getParticlesAndBodies();
    if (!(targets instanceof Array))
        targets = [targets];
    agent.on('change', this.wake.bind(this));
    this._agentData[this._currAgentId] = {
        agent: agent,
        id: this._currAgentId,
        targets: targets,
        source: source
    };
    _mapAgentArray.call(this, agent).push(this._currAgentId);
    return this._currAgentId++;
}
PhysicsEngine.prototype.attach = function attach(agents, targets, source) {
    this.wake();
    if (agents instanceof Array) {
        var agentIDs = [];
        for (var i = 0; i < agents.length; i++)
            agentIDs[i] = _attachOne.call(this, agents[i], targets, source);
        return agentIDs;
    } else
        return _attachOne.call(this, agents, targets, source);
};
PhysicsEngine.prototype.attachTo = function attachTo(agentID, target) {
    _getAgentData.call(this, agentID).targets.push(target);
};
PhysicsEngine.prototype.detach = function detach(id) {
    var agent = this.getAgent(id);
    var agentArray = _mapAgentArray.call(this, agent);
    var index = agentArray.indexOf(id);
    agentArray.splice(index, 1);
    delete this._agentData[id];
};
PhysicsEngine.prototype.detachFrom = function detachFrom(id, target) {
    var boundAgent = _getAgentData.call(this, id);
    if (boundAgent.source === target)
        this.detach(id);
    else {
        var targets = boundAgent.targets;
        var index = targets.indexOf(target);
        if (index > -1)
            targets.splice(index, 1);
    }
};
PhysicsEngine.prototype.detachAll = function detachAll() {
    this._agentData = {};
    this._forces = [];
    this._constraints = [];
    this._currAgentId = 0;
};
function _getAgentData(id) {
    return this._agentData[id];
}
PhysicsEngine.prototype.getAgent = function getAgent(id) {
    return _getAgentData.call(this, id).agent;
};
PhysicsEngine.prototype.getParticles = function getParticles() {
    return this._particles;
};
PhysicsEngine.prototype.getBodies = function getBodies() {
    return this._bodies;
};
PhysicsEngine.prototype.getParticlesAndBodies = function getParticlesAndBodies() {
    return this.getParticles().concat(this.getBodies());
};
PhysicsEngine.prototype.forEachParticle = function forEachParticle(fn, dt) {
    var particles = this.getParticles();
    for (var index = 0, len = particles.length; index < len; index++)
        fn.call(this, particles[index], dt);
};
PhysicsEngine.prototype.forEachBody = function forEachBody(fn, dt) {
    if (!this._hasBodies)
        return;
    var bodies = this.getBodies();
    for (var index = 0, len = bodies.length; index < len; index++)
        fn.call(this, bodies[index], dt);
};
PhysicsEngine.prototype.forEach = function forEach(fn, dt) {
    this.forEachParticle(fn, dt);
    this.forEachBody(fn, dt);
};
function _updateForce(index) {
    var boundAgent = _getAgentData.call(this, this._forces[index]);
    boundAgent.agent.applyForce(boundAgent.targets, boundAgent.source);
}
function _updateForces() {
    for (var index = this._forces.length - 1; index > -1; index--)
        _updateForce.call(this, index);
}
function _updateConstraint(index, dt) {
    var boundAgent = this._agentData[this._constraints[index]];
    return boundAgent.agent.applyConstraint(boundAgent.targets, boundAgent.source, dt);
}
function _updateConstraints(dt) {
    var iteration = 0;
    while (iteration < this.options.constraintSteps) {
        for (var index = this._constraints.length - 1; index > -1; index--)
            _updateConstraint.call(this, index, dt);
        iteration++;
    }
}
function _updateVelocities(body, dt) {
    body.integrateVelocity(dt);
    if (this.options.velocityCap)
        body.velocity.cap(this.options.velocityCap).put(body.velocity);
}
function _updateAngularVelocities(body, dt) {
    body.integrateAngularMomentum(dt);
    body.updateAngularVelocity();
    if (this.options.angularVelocityCap)
        body.angularVelocity.cap(this.options.angularVelocityCap).put(body.angularVelocity);
}
function _updateOrientations(body, dt) {
    body.integrateOrientation(dt);
}
function _updatePositions(body, dt) {
    body.integratePosition(dt);
    body.emit(_events.update, body);
}
function _integrate(dt) {
    _updateForces.call(this, dt);
    this.forEach(_updateVelocities, dt);
    this.forEachBody(_updateAngularVelocities, dt);
    _updateConstraints.call(this, dt);
    this.forEachBody(_updateOrientations, dt);
    this.forEach(_updatePositions, dt);
}
function _getParticlesEnergy() {
    var energy = 0;
    var particleEnergy = 0;
    this.forEach(function (particle) {
        particleEnergy = particle.getEnergy();
        energy += particleEnergy;
    });
    return energy;
}
function _getAgentsEnergy() {
    var energy = 0;
    for (var id in this._agentData)
        energy += this.getAgentEnergy(id);
    return energy;
}
PhysicsEngine.prototype.getAgentEnergy = function (agentId) {
    var agentData = _getAgentData.call(this, agentId);
    return agentData.agent.getEnergy(agentData.targets, agentData.source);
};
PhysicsEngine.prototype.getEnergy = function getEnergy() {
    return _getParticlesEnergy.call(this) + _getAgentsEnergy.call(this);
};
PhysicsEngine.prototype.step = function step() {
    if (this.isSleeping())
        return;
    var currTime = now();
    var dtFrame = currTime - this._prevTime;
    this._prevTime = currTime;
    if (dtFrame < MIN_TIME_STEP)
        return;
    if (dtFrame > MAX_TIME_STEP)
        dtFrame = MAX_TIME_STEP;
    _integrate.call(this, TIMESTEP);
    this.emit(_events.update, this);
    if (this.getEnergy() < this.options.sleepTolerance)
        this.sleep();
};
PhysicsEngine.prototype.isSleeping = function isSleeping() {
    return this._isSleeping;
};
PhysicsEngine.prototype.isActive = function isSleeping() {
    return !this._isSleeping;
};
PhysicsEngine.prototype.sleep = function sleep() {
    if (this._isSleeping)
        return;
    this.forEach(function (body) {
        body.sleep();
    });
    this.emit(_events.end, this);
    this._isSleeping = true;
};
PhysicsEngine.prototype.wake = function wake() {
    if (!this._isSleeping)
        return;
    this._prevTime = now();
    this.emit(_events.start, this);
    this._isSleeping = false;
};
PhysicsEngine.prototype.emit = function emit(type, data) {
    if (this._eventHandler === null)
        return;
    this._eventHandler.emit(type, data);
};
PhysicsEngine.prototype.on = function on(event, fn) {
    if (this._eventHandler === null)
        this._eventHandler = new EventHandler();
    this._eventHandler.on(event, fn);
};
module.exports = PhysicsEngine;
},{"../core/EventHandler":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/EventHandler.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/physics/bodies/Particle.js":[function(require,module,exports){
var Vector = require('../../math/Vector');
var Transform = require('../../core/Transform');
var EventHandler = require('../../core/EventHandler');
var Integrator = require('../integrators/SymplecticEuler');
function Particle(options) {
    options = options || {};
    var defaults = Particle.DEFAULT_OPTIONS;
    this.position = new Vector();
    this.velocity = new Vector();
    this.force = new Vector();
    this._engine = null;
    this._isSleeping = true;
    this._eventOutput = null;
    this.mass = options.mass !== undefined ? options.mass : defaults.mass;
    this.inverseMass = 1 / this.mass;
    this.setPosition(options.position || defaults.position);
    this.setVelocity(options.velocity || defaults.velocity);
    this.force.set(options.force || [
        0,
        0,
        0
    ]);
    this.transform = Transform.identity.slice();
    this._spec = {
        size: [
            true,
            true
        ],
        target: {
            transform: this.transform,
            origin: [
                0.5,
                0.5
            ],
            target: null
        }
    };
}
Particle.DEFAULT_OPTIONS = {
    position: [
        0,
        0,
        0
    ],
    velocity: [
        0,
        0,
        0
    ],
    mass: 1
};
var _events = {
        start: 'start',
        update: 'update',
        end: 'end'
    };
var now = Date.now;
Particle.prototype.isBody = false;
Particle.prototype.isActive = function isActive() {
    return !this._isSleeping;
};
Particle.prototype.sleep = function sleep() {
    if (this._isSleeping)
        return;
    this.emit(_events.end, this);
    this._isSleeping = true;
};
Particle.prototype.wake = function wake() {
    if (!this._isSleeping)
        return;
    this.emit(_events.start, this);
    this._isSleeping = false;
    this._prevTime = now();
    if (this._engine)
        this._engine.wake();
};
Particle.prototype.setPosition = function setPosition(position) {
    this.position.set(position);
};
Particle.prototype.setPosition1D = function setPosition1D(x) {
    this.position.x = x;
};
Particle.prototype.getPosition = function getPosition() {
    this._engine.step();
    return this.position.get();
};
Particle.prototype.getPosition1D = function getPosition1D() {
    this._engine.step();
    return this.position.x;
};
Particle.prototype.setVelocity = function setVelocity(velocity) {
    this.velocity.set(velocity);
    if (!(velocity[0] === 0 && velocity[1] === 0 && velocity[2] === 0))
        this.wake();
};
Particle.prototype.setVelocity1D = function setVelocity1D(x) {
    this.velocity.x = x;
    if (x !== 0)
        this.wake();
};
Particle.prototype.getVelocity = function getVelocity() {
    return this.velocity.get();
};
Particle.prototype.setForce = function setForce(force) {
    this.force.set(force);
    this.wake();
};
Particle.prototype.getVelocity1D = function getVelocity1D() {
    return this.velocity.x;
};
Particle.prototype.setMass = function setMass(mass) {
    this.mass = mass;
    this.inverseMass = 1 / mass;
};
Particle.prototype.getMass = function getMass() {
    return this.mass;
};
Particle.prototype.reset = function reset(position, velocity) {
    this.setPosition(position || [
        0,
        0,
        0
    ]);
    this.setVelocity(velocity || [
        0,
        0,
        0
    ]);
};
Particle.prototype.applyForce = function applyForce(force) {
    if (force.isZero())
        return;
    this.force.add(force).put(this.force);
    this.wake();
};
Particle.prototype.applyImpulse = function applyImpulse(impulse) {
    if (impulse.isZero())
        return;
    var velocity = this.velocity;
    velocity.add(impulse.mult(this.inverseMass)).put(velocity);
};
Particle.prototype.integrateVelocity = function integrateVelocity(dt) {
    Integrator.integrateVelocity(this, dt);
};
Particle.prototype.integratePosition = function integratePosition(dt) {
    Integrator.integratePosition(this, dt);
};
Particle.prototype._integrate = function _integrate(dt) {
    this.integrateVelocity(dt);
    this.integratePosition(dt);
};
Particle.prototype.getEnergy = function getEnergy() {
    return 0.5 * this.mass * this.velocity.normSquared();
};
Particle.prototype.getTransform = function getTransform() {
    this._engine.step();
    var position = this.position;
    var transform = this.transform;
    transform[12] = position.x;
    transform[13] = position.y;
    transform[14] = position.z;
    return transform;
};
Particle.prototype.modify = function modify(target) {
    var _spec = this._spec.target;
    _spec.transform = this.getTransform();
    _spec.target = target;
    return this._spec;
};
function _createEventOutput() {
    this._eventOutput = new EventHandler();
    this._eventOutput.bindThis(this);
    EventHandler.setOutputHandler(this, this._eventOutput);
}
Particle.prototype.emit = function emit(type, data) {
    if (!this._eventOutput)
        return;
    this._eventOutput.emit(type, data);
};
Particle.prototype.on = function on() {
    _createEventOutput.call(this);
    return this.on.apply(this, arguments);
};
Particle.prototype.removeListener = function removeListener() {
    _createEventOutput.call(this);
    return this.removeListener.apply(this, arguments);
};
Particle.prototype.pipe = function pipe() {
    _createEventOutput.call(this);
    return this.pipe.apply(this, arguments);
};
Particle.prototype.unpipe = function unpipe() {
    _createEventOutput.call(this);
    return this.unpipe.apply(this, arguments);
};
module.exports = Particle;
},{"../../core/EventHandler":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/EventHandler.js","../../core/Transform":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Transform.js","../../math/Vector":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/math/Vector.js","../integrators/SymplecticEuler":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/physics/integrators/SymplecticEuler.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/physics/forces/Force.js":[function(require,module,exports){
var Vector = require('../../math/Vector');
var EventHandler = require('../../core/EventHandler');
function Force(force) {
    this.force = new Vector(force);
    this._eventOutput = new EventHandler();
    EventHandler.setOutputHandler(this, this._eventOutput);
}
Force.prototype.setOptions = function setOptions(options) {
    this._eventOutput.emit('change', options);
};
Force.prototype.applyForce = function applyForce(targets) {
    var length = targets.length;
    while (length--) {
        targets[length].applyForce(this.force);
    }
};
Force.prototype.getEnergy = function getEnergy() {
    return 0;
};
module.exports = Force;
},{"../../core/EventHandler":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/EventHandler.js","../../math/Vector":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/math/Vector.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/physics/forces/Spring.js":[function(require,module,exports){
var Force = require('./Force');
var Vector = require('../../math/Vector');
function Spring(options) {
    Force.call(this);
    this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this.disp = new Vector(0, 0, 0);
    _init.call(this);
}
Spring.prototype = Object.create(Force.prototype);
Spring.prototype.constructor = Spring;
var pi = Math.PI;
var MIN_PERIOD = 150;
Spring.FORCE_FUNCTIONS = {
    FENE: function (dist, rMax) {
        var rMaxSmall = rMax * 0.99;
        var r = Math.max(Math.min(dist, rMaxSmall), -rMaxSmall);
        return r / (1 - r * r / (rMax * rMax));
    },
    HOOK: function (dist) {
        return dist;
    }
};
Spring.DEFAULT_OPTIONS = {
    period: 300,
    dampingRatio: 0.1,
    length: 0,
    maxLength: Infinity,
    anchor: undefined,
    forceFunction: Spring.FORCE_FUNCTIONS.HOOK
};
function _calcStiffness() {
    var options = this.options;
    options.stiffness = Math.pow(2 * pi / options.period, 2);
}
function _calcDamping() {
    var options = this.options;
    options.damping = 4 * pi * options.dampingRatio / options.period;
}
function _init() {
    _calcStiffness.call(this);
    _calcDamping.call(this);
}
Spring.prototype.setOptions = function setOptions(options) {
    if (options.anchor !== undefined) {
        if (options.anchor.position instanceof Vector)
            this.options.anchor = options.anchor.position;
        if (options.anchor instanceof Vector)
            this.options.anchor = options.anchor;
        if (options.anchor instanceof Array)
            this.options.anchor = new Vector(options.anchor);
    }
    if (options.period !== undefined) {
        if (options.period < MIN_PERIOD) {
            options.period = MIN_PERIOD;
            console.warn('The period of a SpringTransition is capped at ' + MIN_PERIOD + ' ms. Use a SnapTransition for faster transitions');
        }
        this.options.period = options.period;
    }
    if (options.dampingRatio !== undefined)
        this.options.dampingRatio = options.dampingRatio;
    if (options.length !== undefined)
        this.options.length = options.length;
    if (options.forceFunction !== undefined)
        this.options.forceFunction = options.forceFunction;
    if (options.maxLength !== undefined)
        this.options.maxLength = options.maxLength;
    _init.call(this);
    Force.prototype.setOptions.call(this, options);
};
Spring.prototype.applyForce = function applyForce(targets, source) {
    var force = this.force;
    var disp = this.disp;
    var options = this.options;
    var stiffness = options.stiffness;
    var damping = options.damping;
    var restLength = options.length;
    var maxLength = options.maxLength;
    var anchor = options.anchor || source.position;
    var forceFunction = options.forceFunction;
    var i;
    var target;
    var p2;
    var v2;
    var dist;
    var m;
    for (i = 0; i < targets.length; i++) {
        target = targets[i];
        p2 = target.position;
        v2 = target.velocity;
        anchor.sub(p2).put(disp);
        dist = disp.norm() - restLength;
        if (dist === 0)
            return;
        m = target.mass;
        stiffness *= m;
        damping *= m;
        disp.normalize(stiffness * forceFunction(dist, maxLength)).put(force);
        if (damping)
            if (source)
                force.add(v2.sub(source.velocity).mult(-damping)).put(force);
            else
                force.add(v2.mult(-damping)).put(force);
        target.applyForce(force);
        if (source)
            source.applyForce(force.mult(-1));
    }
};
Spring.prototype.getEnergy = function getEnergy(targets, source) {
    var options = this.options;
    var restLength = options.length;
    var anchor = source ? source.position : options.anchor;
    var strength = options.stiffness;
    var energy = 0;
    for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        var dist = anchor.sub(target.position).norm() - restLength;
        energy += 0.5 * strength * dist * dist;
    }
    return energy;
};
module.exports = Spring;
},{"../../math/Vector":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/math/Vector.js","./Force":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/physics/forces/Force.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/physics/integrators/SymplecticEuler.js":[function(require,module,exports){
var SymplecticEuler = {};
SymplecticEuler.integrateVelocity = function integrateVelocity(body, dt) {
    var v = body.velocity;
    var w = body.inverseMass;
    var f = body.force;
    if (f.isZero())
        return;
    v.add(f.mult(dt * w)).put(v);
    f.clear();
};
SymplecticEuler.integratePosition = function integratePosition(body, dt) {
    var p = body.position;
    var v = body.velocity;
    p.add(v.mult(dt)).put(p);
};
SymplecticEuler.integrateAngularMomentum = function integrateAngularMomentum(body, dt) {
    var L = body.angularMomentum;
    var t = body.torque;
    if (t.isZero())
        return;
    L.add(t.mult(dt)).put(L);
    t.clear();
};
SymplecticEuler.integrateOrientation = function integrateOrientation(body, dt) {
    var q = body.orientation;
    var w = body.angularVelocity;
    if (w.isZero())
        return;
    q.add(q.multiply(w).scalarMultiply(0.5 * dt)).put(q);
};
module.exports = SymplecticEuler;
},{}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/surfaces/ImageSurface.js":[function(require,module,exports){
var Surface = require('../core/Surface');
function ImageSurface(options) {
    this._imageUrl = undefined;
    Surface.apply(this, arguments);
}
var urlCache = [];
var countCache = [];
var nodeCache = [];
var cacheEnabled = true;
ImageSurface.enableCache = function enableCache() {
    cacheEnabled = true;
};
ImageSurface.disableCache = function disableCache() {
    cacheEnabled = false;
};
ImageSurface.clearCache = function clearCache() {
    urlCache = [];
    countCache = [];
    nodeCache = [];
};
ImageSurface.getCache = function getCache() {
    return {
        urlCache: urlCache,
        countCache: countCache,
        nodeCache: countCache
    };
};
ImageSurface.prototype = Object.create(Surface.prototype);
ImageSurface.prototype.constructor = ImageSurface;
ImageSurface.prototype.elementType = 'img';
ImageSurface.prototype.elementClass = 'famous-surface';
ImageSurface.prototype.setContent = function setContent(imageUrl) {
    var urlIndex = urlCache.indexOf(this._imageUrl);
    if (urlIndex !== -1) {
        if (countCache[urlIndex] === 1) {
            urlCache.splice(urlIndex, 1);
            countCache.splice(urlIndex, 1);
            nodeCache.splice(urlIndex, 1);
        } else {
            countCache[urlIndex]--;
        }
    }
    urlIndex = urlCache.indexOf(imageUrl);
    if (urlIndex === -1) {
        urlCache.push(imageUrl);
        countCache.push(1);
    } else {
        countCache[urlIndex]++;
    }
    this._imageUrl = imageUrl;
    this._contentDirty = true;
};
ImageSurface.prototype.deploy = function deploy(target) {
    var urlIndex = urlCache.indexOf(this._imageUrl);
    if (nodeCache[urlIndex] === undefined && cacheEnabled) {
        var img = new Image();
        img.src = this._imageUrl || '';
        nodeCache[urlIndex] = img;
    }
    target.src = this._imageUrl || '';
};
ImageSurface.prototype.recall = function recall(target) {
    target.src = '';
};
module.exports = ImageSurface;
},{"../core/Surface":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Surface.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/MultipleTransition.js":[function(require,module,exports){
var Utility = require('../utilities/Utility');
function MultipleTransition(method) {
    this.method = method;
    this._instances = [];
    this.state = [];
}
MultipleTransition.SUPPORTS_MULTIPLE = true;
MultipleTransition.prototype.get = function get() {
    for (var i = 0; i < this._instances.length; i++) {
        this.state[i] = this._instances[i].get();
    }
    return this.state;
};
MultipleTransition.prototype.set = function set(endState, transition, callback) {
    var _allCallback = Utility.after(endState.length, callback);
    for (var i = 0; i < endState.length; i++) {
        if (!this._instances[i])
            this._instances[i] = new this.method();
        this._instances[i].set(endState[i], transition, _allCallback);
    }
};
MultipleTransition.prototype.reset = function reset(startState) {
    for (var i = 0; i < startState.length; i++) {
        if (!this._instances[i])
            this._instances[i] = new this.method();
        this._instances[i].reset(startState[i]);
    }
};
module.exports = MultipleTransition;
},{"../utilities/Utility":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/utilities/Utility.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/SpringTransition.js":[function(require,module,exports){
var PE = require('../physics/PhysicsEngine');
var Particle = require('../physics/bodies/Particle');
var Spring = require('../physics/forces/Spring');
var Vector = require('../math/Vector');
function SpringTransition(state) {
    state = state || 0;
    this.endState = new Vector(state);
    this.initState = new Vector();
    this._dimensions = undefined;
    this._restTolerance = 1e-10;
    this._absRestTolerance = this._restTolerance;
    this._callback = undefined;
    this.PE = new PE();
    this.spring = new Spring({ anchor: this.endState });
    this.particle = new Particle();
    this.PE.addBody(this.particle);
    this.PE.attach(this.spring, this.particle);
}
SpringTransition.SUPPORTS_MULTIPLE = 3;
SpringTransition.DEFAULT_OPTIONS = {
    period: 300,
    dampingRatio: 0.5,
    velocity: 0
};
function _getEnergy() {
    return this.particle.getEnergy() + this.spring.getEnergy([this.particle]);
}
function _setParticlePosition(p) {
    this.particle.setPosition(p);
}
function _setParticleVelocity(v) {
    this.particle.setVelocity(v);
}
function _getParticlePosition() {
    return this._dimensions === 0 ? this.particle.getPosition1D() : this.particle.getPosition();
}
function _getParticleVelocity() {
    return this._dimensions === 0 ? this.particle.getVelocity1D() : this.particle.getVelocity();
}
function _setCallback(callback) {
    this._callback = callback;
}
function _wake() {
    this.PE.wake();
}
function _sleep() {
    this.PE.sleep();
}
function _update() {
    if (this.PE.isSleeping()) {
        if (this._callback) {
            var cb = this._callback;
            this._callback = undefined;
            cb();
        }
        return;
    }
    if (_getEnergy.call(this) < this._absRestTolerance) {
        _setParticlePosition.call(this, this.endState);
        _setParticleVelocity.call(this, [
            0,
            0,
            0
        ]);
        _sleep.call(this);
    }
}
function _setupDefinition(definition) {
    var defaults = SpringTransition.DEFAULT_OPTIONS;
    if (definition.period === undefined)
        definition.period = defaults.period;
    if (definition.dampingRatio === undefined)
        definition.dampingRatio = defaults.dampingRatio;
    if (definition.velocity === undefined)
        definition.velocity = defaults.velocity;
    if (definition.period < 150) {
        definition.period = 150;
        console.warn('The period of a SpringTransition is capped at 150 ms. Use a SnapTransition for faster transitions');
    }
    this.spring.setOptions({
        period: definition.period,
        dampingRatio: definition.dampingRatio
    });
    _setParticleVelocity.call(this, definition.velocity);
}
function _setAbsoluteRestTolerance() {
    var distance = this.endState.sub(this.initState).normSquared();
    this._absRestTolerance = distance === 0 ? this._restTolerance : this._restTolerance * distance;
}
function _setTarget(target) {
    this.endState.set(target);
    _setAbsoluteRestTolerance.call(this);
}
SpringTransition.prototype.reset = function reset(pos, vel) {
    this._dimensions = pos instanceof Array ? pos.length : 0;
    this.initState.set(pos);
    _setParticlePosition.call(this, pos);
    _setTarget.call(this, pos);
    if (vel)
        _setParticleVelocity.call(this, vel);
    _setCallback.call(this, undefined);
};
SpringTransition.prototype.getVelocity = function getVelocity() {
    return _getParticleVelocity.call(this);
};
SpringTransition.prototype.setVelocity = function setVelocity(v) {
    this.call(this, _setParticleVelocity(v));
};
SpringTransition.prototype.isActive = function isActive() {
    return !this.PE.isSleeping();
};
SpringTransition.prototype.halt = function halt() {
    this.set(this.get());
};
SpringTransition.prototype.get = function get() {
    _update.call(this);
    return _getParticlePosition.call(this);
};
SpringTransition.prototype.set = function set(endState, definition, callback) {
    if (!definition) {
        this.reset(endState);
        if (callback)
            callback();
        return;
    }
    this._dimensions = endState instanceof Array ? endState.length : 0;
    _wake.call(this);
    _setupDefinition.call(this, definition);
    _setTarget.call(this, endState);
    _setCallback.call(this, callback);
};
module.exports = SpringTransition;
},{"../math/Vector":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/math/Vector.js","../physics/PhysicsEngine":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/physics/PhysicsEngine.js","../physics/bodies/Particle":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/physics/bodies/Particle.js","../physics/forces/Spring":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/physics/forces/Spring.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/Transitionable.js":[function(require,module,exports){
var MultipleTransition = require('./MultipleTransition');
var TweenTransition = require('./TweenTransition');
function Transitionable(start) {
    this.currentAction = null;
    this.actionQueue = [];
    this.callbackQueue = [];
    this.state = 0;
    this.velocity = undefined;
    this._callback = undefined;
    this._engineInstance = null;
    this._currentMethod = null;
    this.set(start);
}
var transitionMethods = {};
Transitionable.register = function register(methods) {
    var success = true;
    for (var method in methods) {
        if (!Transitionable.registerMethod(method, methods[method]))
            success = false;
    }
    return success;
};
Transitionable.registerMethod = function registerMethod(name, engineClass) {
    if (!(name in transitionMethods)) {
        transitionMethods[name] = engineClass;
        return true;
    } else
        return false;
};
Transitionable.unregisterMethod = function unregisterMethod(name) {
    if (name in transitionMethods) {
        delete transitionMethods[name];
        return true;
    } else
        return false;
};
function _loadNext() {
    if (this._callback) {
        var callback = this._callback;
        this._callback = undefined;
        callback();
    }
    if (this.actionQueue.length <= 0) {
        this.set(this.get());
        return;
    }
    this.currentAction = this.actionQueue.shift();
    this._callback = this.callbackQueue.shift();
    var method = null;
    var endValue = this.currentAction[0];
    var transition = this.currentAction[1];
    if (transition instanceof Object && transition.method) {
        method = transition.method;
        if (typeof method === 'string')
            method = transitionMethods[method];
    } else {
        method = TweenTransition;
    }
    if (this._currentMethod !== method) {
        if (!(endValue instanceof Object) || method.SUPPORTS_MULTIPLE === true || endValue.length <= method.SUPPORTS_MULTIPLE) {
            this._engineInstance = new method();
        } else {
            this._engineInstance = new MultipleTransition(method);
        }
        this._currentMethod = method;
    }
    this._engineInstance.reset(this.state, this.velocity);
    if (this.velocity !== undefined)
        transition.velocity = this.velocity;
    this._engineInstance.set(endValue, transition, _loadNext.bind(this));
}
Transitionable.prototype.set = function set(endState, transition, callback) {
    if (!transition) {
        this.reset(endState);
        if (callback)
            callback();
        return this;
    }
    var action = [
            endState,
            transition
        ];
    this.actionQueue.push(action);
    this.callbackQueue.push(callback);
    if (!this.currentAction)
        _loadNext.call(this);
    return this;
};
Transitionable.prototype.reset = function reset(startState, startVelocity) {
    this._currentMethod = null;
    this._engineInstance = null;
    this._callback = undefined;
    this.state = startState;
    this.velocity = startVelocity;
    this.currentAction = null;
    this.actionQueue = [];
    this.callbackQueue = [];
};
Transitionable.prototype.delay = function delay(duration, callback) {
    this.set(this.get(), {
        duration: duration,
        curve: function () {
            return 0;
        }
    }, callback);
};
Transitionable.prototype.get = function get(timestamp) {
    if (this._engineInstance) {
        if (this._engineInstance.getVelocity)
            this.velocity = this._engineInstance.getVelocity();
        this.state = this._engineInstance.get(timestamp);
    }
    return this.state;
};
Transitionable.prototype.isActive = function isActive() {
    return !!this.currentAction;
};
Transitionable.prototype.halt = function halt() {
    return this.set(this.get());
};
module.exports = Transitionable;
},{"./MultipleTransition":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/MultipleTransition.js","./TweenTransition":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/TweenTransition.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/TransitionableTransform.js":[function(require,module,exports){
var Transitionable = require('./Transitionable');
var Transform = require('../core/Transform');
var Utility = require('../utilities/Utility');
function TransitionableTransform(transform) {
    this._final = Transform.identity.slice();
    this._finalTranslate = [
        0,
        0,
        0
    ];
    this._finalRotate = [
        0,
        0,
        0
    ];
    this._finalSkew = [
        0,
        0,
        0
    ];
    this._finalScale = [
        1,
        1,
        1
    ];
    this.translate = new Transitionable(this._finalTranslate);
    this.rotate = new Transitionable(this._finalRotate);
    this.skew = new Transitionable(this._finalSkew);
    this.scale = new Transitionable(this._finalScale);
    if (transform)
        this.set(transform);
}
function _build() {
    return Transform.build({
        translate: this.translate.get(),
        rotate: this.rotate.get(),
        skew: this.skew.get(),
        scale: this.scale.get()
    });
}
function _buildFinal() {
    return Transform.build({
        translate: this._finalTranslate,
        rotate: this._finalRotate,
        skew: this._finalSkew,
        scale: this._finalScale
    });
}
TransitionableTransform.prototype.setTranslate = function setTranslate(translate, transition, callback) {
    this._finalTranslate = translate;
    this._final = _buildFinal.call(this);
    this.translate.set(translate, transition, callback);
    return this;
};
TransitionableTransform.prototype.setScale = function setScale(scale, transition, callback) {
    this._finalScale = scale;
    this._final = _buildFinal.call(this);
    this.scale.set(scale, transition, callback);
    return this;
};
TransitionableTransform.prototype.setRotate = function setRotate(eulerAngles, transition, callback) {
    this._finalRotate = eulerAngles;
    this._final = _buildFinal.call(this);
    this.rotate.set(eulerAngles, transition, callback);
    return this;
};
TransitionableTransform.prototype.setSkew = function setSkew(skewAngles, transition, callback) {
    this._finalSkew = skewAngles;
    this._final = _buildFinal.call(this);
    this.skew.set(skewAngles, transition, callback);
    return this;
};
TransitionableTransform.prototype.set = function set(transform, transition, callback) {
    var components = Transform.interpret(transform);
    this._finalTranslate = components.translate;
    this._finalRotate = components.rotate;
    this._finalSkew = components.skew;
    this._finalScale = components.scale;
    this._final = transform;
    var _callback = callback ? Utility.after(4, callback) : null;
    this.translate.set(components.translate, transition, _callback);
    this.rotate.set(components.rotate, transition, _callback);
    this.skew.set(components.skew, transition, _callback);
    this.scale.set(components.scale, transition, _callback);
    return this;
};
TransitionableTransform.prototype.setDefaultTransition = function setDefaultTransition(transition) {
    this.translate.setDefault(transition);
    this.rotate.setDefault(transition);
    this.skew.setDefault(transition);
    this.scale.setDefault(transition);
};
TransitionableTransform.prototype.get = function get() {
    if (this.isActive()) {
        return _build.call(this);
    } else
        return this._final;
};
TransitionableTransform.prototype.getFinal = function getFinal() {
    return this._final;
};
TransitionableTransform.prototype.isActive = function isActive() {
    return this.translate.isActive() || this.rotate.isActive() || this.scale.isActive() || this.skew.isActive();
};
TransitionableTransform.prototype.halt = function halt() {
    this.translate.halt();
    this.rotate.halt();
    this.skew.halt();
    this.scale.halt();
    this._final = this.get();
    this._finalTranslate = this.translate.get();
    this._finalRotate = this.rotate.get();
    this._finalSkew = this.skew.get();
    this._finalScale = this.scale.get();
    return this;
};
module.exports = TransitionableTransform;
},{"../core/Transform":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Transform.js","../utilities/Utility":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/utilities/Utility.js","./Transitionable":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/Transitionable.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/TweenTransition.js":[function(require,module,exports){
function TweenTransition(options) {
    this.options = Object.create(TweenTransition.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this._startTime = 0;
    this._startValue = 0;
    this._updateTime = 0;
    this._endValue = 0;
    this._curve = undefined;
    this._duration = 0;
    this._active = false;
    this._callback = undefined;
    this.state = 0;
    this.velocity = undefined;
}
TweenTransition.Curves = {
    linear: function (t) {
        return t;
    },
    easeIn: function (t) {
        return t * t;
    },
    easeOut: function (t) {
        return t * (2 - t);
    },
    easeInOut: function (t) {
        if (t <= 0.5)
            return 2 * t * t;
        else
            return -2 * t * t + 4 * t - 1;
    },
    easeOutBounce: function (t) {
        return t * (3 - 2 * t);
    },
    spring: function (t) {
        return (1 - t) * Math.sin(6 * Math.PI * t) + t;
    }
};
TweenTransition.SUPPORTS_MULTIPLE = true;
TweenTransition.DEFAULT_OPTIONS = {
    curve: TweenTransition.Curves.linear,
    duration: 500,
    speed: 0
};
var registeredCurves = {};
TweenTransition.registerCurve = function registerCurve(curveName, curve) {
    if (!registeredCurves[curveName]) {
        registeredCurves[curveName] = curve;
        return true;
    } else {
        return false;
    }
};
TweenTransition.unregisterCurve = function unregisterCurve(curveName) {
    if (registeredCurves[curveName]) {
        delete registeredCurves[curveName];
        return true;
    } else {
        return false;
    }
};
TweenTransition.getCurve = function getCurve(curveName) {
    var curve = registeredCurves[curveName];
    if (curve !== undefined)
        return curve;
    else
        throw new Error('curve not registered');
};
TweenTransition.getCurves = function getCurves() {
    return registeredCurves;
};
function _interpolate(a, b, t) {
    return (1 - t) * a + t * b;
}
function _clone(obj) {
    if (obj instanceof Object) {
        if (obj instanceof Array)
            return obj.slice(0);
        else
            return Object.create(obj);
    } else
        return obj;
}
function _normalize(transition, defaultTransition) {
    var result = { curve: defaultTransition.curve };
    if (defaultTransition.duration)
        result.duration = defaultTransition.duration;
    if (defaultTransition.speed)
        result.speed = defaultTransition.speed;
    if (transition instanceof Object) {
        if (transition.duration !== undefined)
            result.duration = transition.duration;
        if (transition.curve)
            result.curve = transition.curve;
        if (transition.speed)
            result.speed = transition.speed;
    }
    if (typeof result.curve === 'string')
        result.curve = TweenTransition.getCurve(result.curve);
    return result;
}
TweenTransition.prototype.setOptions = function setOptions(options) {
    if (options.curve !== undefined)
        this.options.curve = options.curve;
    if (options.duration !== undefined)
        this.options.duration = options.duration;
    if (options.speed !== undefined)
        this.options.speed = options.speed;
};
TweenTransition.prototype.set = function set(endValue, transition, callback) {
    if (!transition) {
        this.reset(endValue);
        if (callback)
            callback();
        return;
    }
    this._startValue = _clone(this.get());
    transition = _normalize(transition, this.options);
    if (transition.speed) {
        var startValue = this._startValue;
        if (startValue instanceof Object) {
            var variance = 0;
            for (var i in startValue)
                variance += (endValue[i] - startValue[i]) * (endValue[i] - startValue[i]);
            transition.duration = Math.sqrt(variance) / transition.speed;
        } else {
            transition.duration = Math.abs(endValue - startValue) / transition.speed;
        }
    }
    this._startTime = Date.now();
    this._endValue = _clone(endValue);
    this._startVelocity = _clone(transition.velocity);
    this._duration = transition.duration;
    this._curve = transition.curve;
    this._active = true;
    this._callback = callback;
};
TweenTransition.prototype.reset = function reset(startValue, startVelocity) {
    if (this._callback) {
        var callback = this._callback;
        this._callback = undefined;
        callback();
    }
    this.state = _clone(startValue);
    this.velocity = _clone(startVelocity);
    this._startTime = 0;
    this._duration = 0;
    this._updateTime = 0;
    this._startValue = this.state;
    this._startVelocity = this.velocity;
    this._endValue = this.state;
    this._active = false;
};
TweenTransition.prototype.getVelocity = function getVelocity() {
    return this.velocity;
};
TweenTransition.prototype.get = function get(timestamp) {
    this.update(timestamp);
    return this.state;
};
function _calculateVelocity(current, start, curve, duration, t) {
    var velocity;
    var eps = 1e-7;
    var speed = (curve(t) - curve(t - eps)) / eps;
    if (current instanceof Array) {
        velocity = [];
        for (var i = 0; i < current.length; i++) {
            if (typeof current[i] === 'number')
                velocity[i] = speed * (current[i] - start[i]) / duration;
            else
                velocity[i] = 0;
        }
    } else
        velocity = speed * (current - start) / duration;
    return velocity;
}
function _calculateState(start, end, t) {
    var state;
    if (start instanceof Array) {
        state = [];
        for (var i = 0; i < start.length; i++) {
            if (typeof start[i] === 'number')
                state[i] = _interpolate(start[i], end[i], t);
            else
                state[i] = start[i];
        }
    } else
        state = _interpolate(start, end, t);
    return state;
}
TweenTransition.prototype.update = function update(timestamp) {
    if (!this._active) {
        if (this._callback) {
            var callback = this._callback;
            this._callback = undefined;
            callback();
        }
        return;
    }
    if (!timestamp)
        timestamp = Date.now();
    if (this._updateTime >= timestamp)
        return;
    this._updateTime = timestamp;
    var timeSinceStart = timestamp - this._startTime;
    if (timeSinceStart >= this._duration) {
        this.state = this._endValue;
        this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, 1);
        this._active = false;
    } else if (timeSinceStart < 0) {
        this.state = this._startValue;
        this.velocity = this._startVelocity;
    } else {
        var t = timeSinceStart / this._duration;
        this.state = _calculateState(this._startValue, this._endValue, this._curve(t));
        this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, t);
    }
};
TweenTransition.prototype.isActive = function isActive() {
    return this._active;
};
TweenTransition.prototype.halt = function halt() {
    this.reset(this.get());
};
TweenTransition.registerCurve('linear', TweenTransition.Curves.linear);
TweenTransition.registerCurve('easeIn', TweenTransition.Curves.easeIn);
TweenTransition.registerCurve('easeOut', TweenTransition.Curves.easeOut);
TweenTransition.registerCurve('easeInOut', TweenTransition.Curves.easeInOut);
TweenTransition.registerCurve('easeOutBounce', TweenTransition.Curves.easeOutBounce);
TweenTransition.registerCurve('spring', TweenTransition.Curves.spring);
TweenTransition.customCurve = function customCurve(v1, v2) {
    v1 = v1 || 0;
    v2 = v2 || 0;
    return function (t) {
        return v1 * t + (-2 * v1 - v2 + 3) * t * t + (v1 + v2 - 2) * t * t * t;
    };
};
module.exports = TweenTransition;
},{}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/utilities/Utility.js":[function(require,module,exports){
var Utility = {};
Utility.Direction = {
    X: 0,
    Y: 1,
    Z: 2
};
Utility.after = function after(count, callback) {
    var counter = count;
    return function () {
        counter--;
        if (counter === 0)
            callback.apply(this, arguments);
    };
};
Utility.loadURL = function loadURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function onreadystatechange() {
        if (this.readyState === 4) {
            if (callback)
                callback(this.responseText);
        }
    };
    xhr.open('GET', url);
    xhr.send();
};
Utility.createDocumentFragmentFromHTML = function createDocumentFragmentFromHTML(html) {
    var element = document.createElement('div');
    element.innerHTML = html;
    var result = document.createDocumentFragment();
    while (element.hasChildNodes())
        result.appendChild(element.firstChild);
    return result;
};
Utility.clone = function clone(b) {
    var a;
    if (typeof b === 'object') {
        a = b instanceof Array ? [] : {};
        for (var key in b) {
            if (typeof b[key] === 'object' && b[key] !== null) {
                if (b[key] instanceof Array) {
                    a[key] = new Array(b[key].length);
                    for (var i = 0; i < b[key].length; i++) {
                        a[key][i] = Utility.clone(b[key][i]);
                    }
                } else {
                    a[key] = Utility.clone(b[key]);
                }
            } else {
                a[key] = b[key];
            }
        }
    } else {
        a = b;
    }
    return a;
};
module.exports = Utility;
},{}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/views/GridLayout.js":[function(require,module,exports){
var Entity = require('../core/Entity');
var RenderNode = require('../core/RenderNode');
var Transform = require('../core/Transform');
var ViewSequence = require('../core/ViewSequence');
var EventHandler = require('../core/EventHandler');
var Modifier = require('../core/Modifier');
var OptionsManager = require('../core/OptionsManager');
var Transitionable = require('../transitions/Transitionable');
var TransitionableTransform = require('../transitions/TransitionableTransform');
function GridLayout(options) {
    this.options = Object.create(GridLayout.DEFAULT_OPTIONS);
    this.optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    this.id = Entity.register(this);
    this._modifiers = [];
    this._states = [];
    this._contextSizeCache = [
        0,
        0
    ];
    this._dimensionsCache = [
        0,
        0
    ];
    this._activeCount = 0;
    this._eventOutput = new EventHandler();
    EventHandler.setOutputHandler(this, this._eventOutput);
}
function _reflow(size, cols, rows) {
    var usableSize = [
            size[0],
            size[1]
        ];
    usableSize[0] -= this.options.gutterSize[0] * (cols - 1);
    usableSize[1] -= this.options.gutterSize[1] * (rows - 1);
    var rowSize = Math.round(usableSize[1] / rows);
    var colSize = Math.round(usableSize[0] / cols);
    var currY = 0;
    var currX;
    var currIndex = 0;
    for (var i = 0; i < rows; i++) {
        currX = 0;
        for (var j = 0; j < cols; j++) {
            if (this._modifiers[currIndex] === undefined) {
                _createModifier.call(this, currIndex, [
                    colSize,
                    rowSize
                ], [
                    currX,
                    currY,
                    0
                ], 1);
            } else {
                _animateModifier.call(this, currIndex, [
                    colSize,
                    rowSize
                ], [
                    currX,
                    currY,
                    0
                ], 1);
            }
            currIndex++;
            currX += colSize + this.options.gutterSize[0];
        }
        currY += rowSize + this.options.gutterSize[1];
    }
    this._dimensionsCache = [
        this.options.dimensions[0],
        this.options.dimensions[1]
    ];
    this._contextSizeCache = [
        size[0],
        size[1]
    ];
    this._activeCount = rows * cols;
    for (i = this._activeCount; i < this._modifiers.length; i++)
        _animateModifier.call(this, i, [
            Math.round(colSize),
            Math.round(rowSize)
        ], [
            0,
            0
        ], 0);
    this._eventOutput.emit('reflow');
}
function _createModifier(index, size, position, opacity) {
    var transitionItem = {
            transform: new TransitionableTransform(Transform.translate.apply(null, position)),
            opacity: new Transitionable(opacity),
            size: new Transitionable(size)
        };
    var modifier = new Modifier({
            transform: transitionItem.transform,
            opacity: transitionItem.opacity,
            size: transitionItem.size
        });
    this._states[index] = transitionItem;
    this._modifiers[index] = modifier;
}
function _animateModifier(index, size, position, opacity) {
    var currState = this._states[index];
    var currSize = currState.size;
    var currOpacity = currState.opacity;
    var currTransform = currState.transform;
    var transition = this.options.transition;
    currTransform.halt();
    currOpacity.halt();
    currSize.halt();
    currTransform.setTranslate(position, transition);
    currSize.set(size, transition);
    currOpacity.set(opacity, transition);
}
GridLayout.DEFAULT_OPTIONS = {
    dimensions: [
        1,
        1
    ],
    transition: false,
    gutterSize: [
        0,
        0
    ]
};
GridLayout.prototype.render = function render() {
    return this.id;
};
GridLayout.prototype.setOptions = function setOptions(options) {
    return this.optionsManager.setOptions(options);
};
GridLayout.prototype.sequenceFrom = function sequenceFrom(sequence) {
    if (sequence instanceof Array)
        sequence = new ViewSequence(sequence);
    this.sequence = sequence;
};
GridLayout.prototype.commit = function commit(context) {
    var transform = context.transform;
    var opacity = context.opacity;
    var origin = context.origin;
    var size = context.size;
    var cols = this.options.dimensions[0];
    var rows = this.options.dimensions[1];
    if (size[0] !== this._contextSizeCache[0] || size[1] !== this._contextSizeCache[1] || cols !== this._dimensionsCache[0] || rows !== this._dimensionsCache[1]) {
        _reflow.call(this, size, cols, rows);
    }
    var sequence = this.sequence;
    var result = [];
    var currIndex = 0;
    while (sequence && currIndex < this._modifiers.length) {
        var item = sequence.get();
        var modifier = this._modifiers[currIndex];
        if (currIndex >= this._activeCount && this._states[currIndex].opacity.isActive()) {
            this._modifiers.splice(currIndex, 1);
            this._states.splice(currIndex, 1);
        }
        if (item) {
            result.push(modifier.modify({
                origin: origin,
                target: item.render()
            }));
        }
        sequence = sequence.getNext();
        currIndex++;
    }
    if (size)
        transform = Transform.moveThen([
            -size[0] * origin[0],
            -size[1] * origin[1],
            0
        ], transform);
    return {
        transform: transform,
        opacity: opacity,
        size: size,
        target: result
    };
};
module.exports = GridLayout;
},{"../core/Entity":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Entity.js","../core/EventHandler":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/EventHandler.js","../core/Modifier":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Modifier.js","../core/OptionsManager":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/OptionsManager.js","../core/RenderNode":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/RenderNode.js","../core/Transform":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Transform.js","../core/ViewSequence":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/ViewSequence.js","../transitions/Transitionable":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/Transitionable.js","../transitions/TransitionableTransform":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/TransitionableTransform.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/src/AdGenerator.js":[function(require,module,exports){
// Import additional modules to be used in this view 
var View = require('famous/src/core/View');
var Surface = require('famous/src/core/Surface');
var Transform = require('famous/src/core/Transform');
var Modifier   = require('famous/src/core/Modifier');
var ImageSurface = require('famous/src/surfaces/ImageSurface')

var StateModifier = require('famous/src/modifiers/StateModifier');
var GridLayout = require('famous/src/views/GridLayout');
var Transitionable = require('famous/src/transitions/Transitionable')
var Transform = require('famous/src/core/Transform');
var SpringTransition = require('famous/src/transitions/SpringTransition');

var GenericSync = require('famous/src/inputs/GenericSync');
var MouseSync   = require('famous/src/inputs/MouseSync');
var TouchSync   = require('famous/src/inputs/TouchSync');

// Register sync classes globally for later use in GenericSync
GenericSync.register({
    'mouse' : MouseSync,
    'touch' : TouchSync
});

// Assign mouse and touch syncing methods
var sync = new GenericSync(
    ['mouse', 'touch'],
    {direction : GenericSync.DIRECTION_X}
);

// Constructor function for our AppView class
function AdGenerator() {
    var logo = getLogo();
    var modifier = getModifier();
    var positionModifier = getPositionModifier();

    return {logo: logo, modifier: modifier, positionModifier: positionModifier};
}

function getLogo() {
    var logo = new ImageSurface({
      size: [300, 100],
      content: 'images/Coca-Cola.png',
      classes: ['backfaceVisibility'],
      properties: {
        textAlign: 'center',
        lineHeight: '100px'
      }
    });

    return logo;
}

function getModifier() {
    var modifier = new Modifier({
        size: [100,100],
        origin: [.5,1 ],
        align:[.5,.08],
        transform: Transform.rotate(2,0,0.1)
    });

    return modifier;
}

function getPositionModifier() {
    var position = [0, 0];
    var positionModifier = new Modifier({
        transform : function(){
            return Transform.translate(position[0], position[1], 0);
        }
    });

    return positionModifier;
}

module.exports = AdGenerator;
},{"famous/src/core/Modifier":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Modifier.js","famous/src/core/Surface":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Surface.js","famous/src/core/Transform":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Transform.js","famous/src/core/View":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/View.js","famous/src/inputs/GenericSync":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/inputs/GenericSync.js","famous/src/inputs/MouseSync":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/inputs/MouseSync.js","famous/src/inputs/TouchSync":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/inputs/TouchSync.js","famous/src/modifiers/StateModifier":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/modifiers/StateModifier.js","famous/src/surfaces/ImageSurface":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/surfaces/ImageSurface.js","famous/src/transitions/SpringTransition":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/SpringTransition.js","famous/src/transitions/Transitionable":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/Transitionable.js","famous/src/views/GridLayout":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/views/GridLayout.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/src/drag.js":[function(require,module,exports){
// Import additional modules to be used in this view 
var Transform = require('famous/src/core/Transform');
var Modifier = require('famous/src/core/Modifier');

var MouseSync     = require('famous/src/inputs/MouseSync');
var TouchSync     = require('famous/src/inputs/TouchSync');
var ScrollSync    = require('famous/src/inputs/ScrollSync');
var GenericSync   = require('famous/src/inputs/GenericSync');

var Transitionable = require('famous/src/transitions/Transitionable');

// Register sync inputs
GenericSync.register({
    'mouse': MouseSync,
    'touch': TouchSync,
    'scroll': ScrollSync
})

// Create a transitionable for position
position = new Transitionable([0, 0]);

// Set sync variable for generic sync methods
var sync = new GenericSync({
    'mouse': {},
    'touch': {},
    'scroll': {scale : .5}
});


function drag(surface) {
    // Links sync to our surface parameter
    surface.pipe(sync);

    // Updates position of transitionable
    sync.on('update', function(data){
        var currentPosition = position.get();

        position.set([
            currentPosition[0] + data.delta[0],
            currentPosition[1]
        ]);
    });

    // Applies updated position to surface
    var positionModifier = new Modifier({
        transform: function(){
            var currentPosition = position.get();
            return Transform.translate(currentPosition[0], currentPosition[1], 0);
        }
    });

    // Sends back the modified surface and position modifier
    return {surface: surface, positionModifier: positionModifier};
}

module.exports = drag;
},{"famous/src/core/Modifier":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Modifier.js","famous/src/core/Transform":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Transform.js","famous/src/inputs/GenericSync":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/inputs/GenericSync.js","famous/src/inputs/MouseSync":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/inputs/MouseSync.js","famous/src/inputs/ScrollSync":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/inputs/ScrollSync.js","famous/src/inputs/TouchSync":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/inputs/TouchSync.js","famous/src/transitions/Transitionable":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/Transitionable.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/src/index.js":[function(require,module,exports){
// Load css
require('./styles');
// Load polyfills
require('famous-polyfills');
// Load AdGenerator
var AdGenerator = require('./AdGenerator');
// Load drag
var drag = require('./drag');

// Import Dependencies
var Engine = require('famous/src/core/Engine');
var Surface = require('famous/src/core/Surface');

// Create container and set to main context
var el = document.getElementById('famous-container');
Engine.setOptions({ appMode: false });
var container = Engine.createContext(el);

createContainer();

// Fill container with a layout and content from the AdGenerator
function createContainer() {
	var adObject = AdGenerator();

	dragObject = drag(adObject.logo);

	container
		.add(adObject.modifier)
		.add(adObject.positionModifier)
		.add(dragObject.positionModifier)
		.add(dragObject.surface);
}

},{"./AdGenerator":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/src/AdGenerator.js","./drag":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/src/drag.js","./styles":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/src/styles/index.js","famous-polyfills":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous-polyfills/index.js","famous/src/core/Engine":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Engine.js","famous/src/core/Surface":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Surface.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/src/styles/app.css":[function(require,module,exports){
var css = "html {\n  background: #fff;\n}\n\n.backfaceVisibility {\n  -webkit-backface-visibility: visible;\n  backface-visibility: visible;\n}\n"; (require("/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/cssify"))(css); module.exports = css;
},{"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/cssify":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/cssify/browser.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/src/styles/index.js":[function(require,module,exports){
// load css
require('famous/src/core/famous.css');
require('./app.css');

},{"./app.css":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/src/styles/app.css","famous/src/core/famous.css":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/famous.css"}]},{},["/Users/pshatara/Documents/Programming/HackReactor/AdFame/src/index.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY3NzaWZ5L2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzLXBvbHlmaWxscy9jbGFzc0xpc3QuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzLXBvbHlmaWxscy9mdW5jdGlvblByb3RvdHlwZUJpbmQuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzLXBvbHlmaWxscy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMtcG9seWZpbGxzL3JlcXVlc3RBbmltYXRpb25GcmFtZS5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvQ29udGV4dC5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvRWxlbWVudEFsbG9jYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvRWxlbWVudE91dHB1dC5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvRW5naW5lLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvY29yZS9FbnRpdHkuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9jb3JlL0V2ZW50RW1pdHRlci5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvRXZlbnRIYW5kbGVyLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvY29yZS9Nb2RpZmllci5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvT3B0aW9uc01hbmFnZXIuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9jb3JlL1JlbmRlck5vZGUuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9jb3JlL1NwZWNQYXJzZXIuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9jb3JlL1N1cmZhY2UuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9jb3JlL1RyYW5zZm9ybS5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvVmlldy5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvVmlld1NlcXVlbmNlLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvY29yZS9mYW1vdXMuY3NzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvaW5wdXRzL0dlbmVyaWNTeW5jLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvaW5wdXRzL01vdXNlU3luYy5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2lucHV0cy9TY3JvbGxTeW5jLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvaW5wdXRzL1RvdWNoU3luYy5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2lucHV0cy9Ub3VjaFRyYWNrZXIuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9tYXRoL1ZlY3Rvci5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL21vZGlmaWVycy9TdGF0ZU1vZGlmaWVyLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvcGh5c2ljcy9QaHlzaWNzRW5naW5lLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvcGh5c2ljcy9ib2RpZXMvUGFydGljbGUuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9waHlzaWNzL2ZvcmNlcy9Gb3JjZS5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL3BoeXNpY3MvZm9yY2VzL1NwcmluZy5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL3BoeXNpY3MvaW50ZWdyYXRvcnMvU3ltcGxlY3RpY0V1bGVyLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvc3VyZmFjZXMvSW1hZ2VTdXJmYWNlLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvdHJhbnNpdGlvbnMvTXVsdGlwbGVUcmFuc2l0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvdHJhbnNpdGlvbnMvU3ByaW5nVHJhbnNpdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0uanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy90cmFuc2l0aW9ucy9Ud2VlblRyYW5zaXRpb24uanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy91dGlsaXRpZXMvVXRpbGl0eS5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL3ZpZXdzL0dyaWRMYXlvdXQuanMiLCJzcmMvQWRHZW5lcmF0b3IuanMiLCJzcmMvZHJhZy5qcyIsInNyYy9pbmRleC5qcyIsInNyYy9zdHlsZXMvYXBwLmNzcyIsInNyYy9zdHlsZXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeHJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hQQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbk1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcywgY3VzdG9tRG9jdW1lbnQpIHtcbiAgdmFyIGRvYyA9IGN1c3RvbURvY3VtZW50IHx8IGRvY3VtZW50O1xuICBpZiAoZG9jLmNyZWF0ZVN0eWxlU2hlZXQpIHtcbiAgICB2YXIgc2hlZXQgPSBkb2MuY3JlYXRlU3R5bGVTaGVldCgpXG4gICAgc2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgICByZXR1cm4gc2hlZXQub3duZXJOb2RlO1xuICB9IGVsc2Uge1xuICAgIHZhciBoZWFkID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0sXG4gICAgICAgIHN0eWxlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcblxuICAgIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvYy5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgICB9XG5cbiAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICByZXR1cm4gc3R5bGU7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLmJ5VXJsID0gZnVuY3Rpb24odXJsKSB7XG4gIGlmIChkb2N1bWVudC5jcmVhdGVTdHlsZVNoZWV0KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVN0eWxlU2hlZXQodXJsKS5vd25lck5vZGU7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLFxuICAgICAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuXG4gICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgbGluay5ocmVmID0gdXJsO1xuXG4gICAgaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICByZXR1cm4gbGluaztcbiAgfVxufTtcbiIsIlxuLypcbiAqIGNsYXNzTGlzdC5qczogQ3Jvc3MtYnJvd3NlciBmdWxsIGVsZW1lbnQuY2xhc3NMaXN0IGltcGxlbWVudGF0aW9uLlxuICogMjAxMS0wNi0xNVxuICpcbiAqIEJ5IEVsaSBHcmV5LCBodHRwOi8vZWxpZ3JleS5jb21cbiAqIFB1YmxpYyBEb21haW4uXG4gKiBOTyBXQVJSQU5UWSBFWFBSRVNTRUQgT1IgSU1QTElFRC4gVVNFIEFUIFlPVVIgT1dOIFJJU0suXG4gKi9cblxuLypnbG9iYWwgc2VsZiwgZG9jdW1lbnQsIERPTUV4Y2VwdGlvbiAqL1xuXG4vKiEgQHNvdXJjZSBodHRwOi8vcHVybC5lbGlncmV5LmNvbS9naXRodWIvY2xhc3NMaXN0LmpzL2Jsb2IvbWFzdGVyL2NsYXNzTGlzdC5qcyovXG5cbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgIShcImNsYXNzTGlzdFwiIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpKSkge1xuXG4oZnVuY3Rpb24gKHZpZXcpIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhclxuICAgICAgY2xhc3NMaXN0UHJvcCA9IFwiY2xhc3NMaXN0XCJcbiAgICAsIHByb3RvUHJvcCA9IFwicHJvdG90eXBlXCJcbiAgICAsIGVsZW1DdHJQcm90byA9ICh2aWV3LkhUTUxFbGVtZW50IHx8IHZpZXcuRWxlbWVudClbcHJvdG9Qcm9wXVxuICAgICwgb2JqQ3RyID0gT2JqZWN0XG4gICAgLCBzdHJUcmltID0gU3RyaW5nW3Byb3RvUHJvcF0udHJpbSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpO1xuICAgIH1cbiAgICAsIGFyckluZGV4T2YgPSBBcnJheVtwcm90b1Byb3BdLmluZGV4T2YgfHwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAgICAgIGkgPSAwXG4gICAgICAgICAgICAsIGxlbiA9IHRoaXMubGVuZ3RoXG4gICAgICAgIDtcbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgaW4gdGhpcyAmJiB0aGlzW2ldID09PSBpdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICAvLyBWZW5kb3JzOiBwbGVhc2UgYWxsb3cgY29udGVudCBjb2RlIHRvIGluc3RhbnRpYXRlIERPTUV4Y2VwdGlvbnNcbiAgICAsIERPTUV4ID0gZnVuY3Rpb24gKHR5cGUsIG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gdHlwZTtcbiAgICAgICAgdGhpcy5jb2RlID0gRE9NRXhjZXB0aW9uW3R5cGVdO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIH1cbiAgICAsIGNoZWNrVG9rZW5BbmRHZXRJbmRleCA9IGZ1bmN0aW9uIChjbGFzc0xpc3QsIHRva2VuKSB7XG4gICAgICAgIGlmICh0b2tlbiA9PT0gXCJcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IERPTUV4KFxuICAgICAgICAgICAgICAgICAgXCJTWU5UQVhfRVJSXCJcbiAgICAgICAgICAgICAgICAsIFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKC9cXHMvLnRlc3QodG9rZW4pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRE9NRXgoXG4gICAgICAgICAgICAgICAgICBcIklOVkFMSURfQ0hBUkFDVEVSX0VSUlwiXG4gICAgICAgICAgICAgICAgLCBcIlN0cmluZyBjb250YWlucyBhbiBpbnZhbGlkIGNoYXJhY3RlclwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJJbmRleE9mLmNhbGwoY2xhc3NMaXN0LCB0b2tlbik7XG4gICAgfVxuICAgICwgQ2xhc3NMaXN0ID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAgICAgIHRyaW1tZWRDbGFzc2VzID0gc3RyVHJpbS5jYWxsKGVsZW0uY2xhc3NOYW1lKVxuICAgICAgICAgICAgLCBjbGFzc2VzID0gdHJpbW1lZENsYXNzZXMgPyB0cmltbWVkQ2xhc3Nlcy5zcGxpdCgvXFxzKy8pIDogW11cbiAgICAgICAgICAgICwgaSA9IDBcbiAgICAgICAgICAgICwgbGVuID0gY2xhc3Nlcy5sZW5ndGhcbiAgICAgICAgO1xuICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnB1c2goY2xhc3Nlc1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlQ2xhc3NOYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZWxlbS5jbGFzc05hbWUgPSB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgICwgY2xhc3NMaXN0UHJvdG8gPSBDbGFzc0xpc3RbcHJvdG9Qcm9wXSA9IFtdXG4gICAgLCBjbGFzc0xpc3RHZXR0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ2xhc3NMaXN0KHRoaXMpO1xuICAgIH1cbjtcbi8vIE1vc3QgRE9NRXhjZXB0aW9uIGltcGxlbWVudGF0aW9ucyBkb24ndCBhbGxvdyBjYWxsaW5nIERPTUV4Y2VwdGlvbidzIHRvU3RyaW5nKClcbi8vIG9uIG5vbi1ET01FeGNlcHRpb25zLiBFcnJvcidzIHRvU3RyaW5nKCkgaXMgc3VmZmljaWVudCBoZXJlLlxuRE9NRXhbcHJvdG9Qcm9wXSA9IEVycm9yW3Byb3RvUHJvcF07XG5jbGFzc0xpc3RQcm90by5pdGVtID0gZnVuY3Rpb24gKGkpIHtcbiAgICByZXR1cm4gdGhpc1tpXSB8fCBudWxsO1xufTtcbmNsYXNzTGlzdFByb3RvLmNvbnRhaW5zID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgdG9rZW4gKz0gXCJcIjtcbiAgICByZXR1cm4gY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKSAhPT0gLTE7XG59O1xuY2xhc3NMaXN0UHJvdG8uYWRkID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgdG9rZW4gKz0gXCJcIjtcbiAgICBpZiAoY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5wdXNoKHRva2VuKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlQ2xhc3NOYW1lKCk7XG4gICAgfVxufTtcbmNsYXNzTGlzdFByb3RvLnJlbW92ZSA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHRva2VuICs9IFwiXCI7XG4gICAgdmFyIGluZGV4ID0gY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlQ2xhc3NOYW1lKCk7XG4gICAgfVxufTtcbmNsYXNzTGlzdFByb3RvLnRvZ2dsZSA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHRva2VuICs9IFwiXCI7XG4gICAgaWYgKGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbikgPT09IC0xKSB7XG4gICAgICAgIHRoaXMuYWRkKHRva2VuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZSh0b2tlbik7XG4gICAgfVxufTtcbmNsYXNzTGlzdFByb3RvLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmpvaW4oXCIgXCIpO1xufTtcblxuaWYgKG9iakN0ci5kZWZpbmVQcm9wZXJ0eSkge1xuICAgIHZhciBjbGFzc0xpc3RQcm9wRGVzYyA9IHtcbiAgICAgICAgICBnZXQ6IGNsYXNzTGlzdEdldHRlclxuICAgICAgICAsIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgLCBjb25maWd1cmFibGU6IHRydWVcbiAgICB9O1xuICAgIHRyeSB7XG4gICAgICAgIG9iakN0ci5kZWZpbmVQcm9wZXJ0eShlbGVtQ3RyUHJvdG8sIGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdFByb3BEZXNjKTtcbiAgICB9IGNhdGNoIChleCkgeyAvLyBJRSA4IGRvZXNuJ3Qgc3VwcG9ydCBlbnVtZXJhYmxlOnRydWVcbiAgICAgICAgaWYgKGV4Lm51bWJlciA9PT0gLTB4N0ZGNUVDNTQpIHtcbiAgICAgICAgICAgIGNsYXNzTGlzdFByb3BEZXNjLmVudW1lcmFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIG9iakN0ci5kZWZpbmVQcm9wZXJ0eShlbGVtQ3RyUHJvdG8sIGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdFByb3BEZXNjKTtcbiAgICAgICAgfVxuICAgIH1cbn0gZWxzZSBpZiAob2JqQ3RyW3Byb3RvUHJvcF0uX19kZWZpbmVHZXR0ZXJfXykge1xuICAgIGVsZW1DdHJQcm90by5fX2RlZmluZUdldHRlcl9fKGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdEdldHRlcik7XG59XG5cbn0oc2VsZikpO1xuXG59XG4iLCJpZiAoIUZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKSB7XG4gICAgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAob1RoaXMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIC8vIGNsb3Nlc3QgdGhpbmcgcG9zc2libGUgdG8gdGhlIEVDTUFTY3JpcHQgNSBpbnRlcm5hbCBJc0NhbGxhYmxlIGZ1bmN0aW9uXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgLSB3aGF0IGlzIHRyeWluZyB0byBiZSBib3VuZCBpcyBub3QgY2FsbGFibGVcIik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYUFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgICBmVG9CaW5kID0gdGhpcyxcbiAgICAgICAgZk5PUCA9IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgICBmQm91bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZlRvQmluZC5hcHBseSh0aGlzIGluc3RhbmNlb2YgZk5PUCAmJiBvVGhpc1xuICAgICAgICAgICAgICAgID8gdGhpc1xuICAgICAgICAgICAgICAgIDogb1RoaXMsXG4gICAgICAgICAgICAgICAgYUFyZ3MuY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgICAgfTtcblxuICAgICAgICBmTk9QLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuICAgICAgICBmQm91bmQucHJvdG90eXBlID0gbmV3IGZOT1AoKTtcblxuICAgICAgICByZXR1cm4gZkJvdW5kO1xuICAgIH07XG59XG4iLCJyZXF1aXJlKCcuL2NsYXNzTGlzdC5qcycpO1xucmVxdWlyZSgnLi9mdW5jdGlvblByb3RvdHlwZUJpbmQuanMnKTtcbnJlcXVpcmUoJy4vcmVxdWVzdEFuaW1hdGlvbkZyYW1lLmpzJyk7IiwiLy8gYWRkcyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgZnVuY3Rpb25hbGl0eVxuLy8gU291cmNlOiBodHRwOi8vc3RyZDYuY29tLzIwMTEvMDUvYmV0dGVyLXdpbmRvdy1yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtc2hpbS9cblxud2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCAod2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9XG4gIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxuICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgIHx8XG4gIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgfHxcbiAgZnVuY3Rpb24oY2FsbGJhY2ssIGVsZW1lbnQpIHtcbiAgICByZXR1cm4gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBjYWxsYmFjaygrbmV3IERhdGUoKSk7XG4gIH0sIDEwMDAgLyA2MCk7XG59KTtcbiIsInZhciBSZW5kZXJOb2RlID0gcmVxdWlyZSgnLi9SZW5kZXJOb2RlJyk7XG52YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnLi9FdmVudEhhbmRsZXInKTtcbnZhciBFbGVtZW50QWxsb2NhdG9yID0gcmVxdWlyZSgnLi9FbGVtZW50QWxsb2NhdG9yJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi9UcmFuc2Zvcm0nKTtcbnZhciBUcmFuc2l0aW9uYWJsZSA9IHJlcXVpcmUoJy4uL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlJyk7XG52YXIgX3plcm9aZXJvID0gW1xuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXTtcbnZhciB1c2VQcmVmaXggPSAhKCdwZXJzcGVjdGl2ZScgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlKTtcbmZ1bmN0aW9uIF9nZXRFbGVtZW50U2l6ZShlbGVtZW50KSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgZWxlbWVudC5jbGllbnRXaWR0aCxcbiAgICAgICAgZWxlbWVudC5jbGllbnRIZWlnaHRcbiAgICBdO1xufVxudmFyIF9zZXRQZXJzcGVjdGl2ZSA9IHVzZVByZWZpeCA/IGZ1bmN0aW9uIChlbGVtZW50LCBwZXJzcGVjdGl2ZSkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLndlYmtpdFBlcnNwZWN0aXZlID0gcGVyc3BlY3RpdmUgPyBwZXJzcGVjdGl2ZS50b0ZpeGVkKCkgKyAncHgnIDogJyc7XG4gICAgfSA6IGZ1bmN0aW9uIChlbGVtZW50LCBwZXJzcGVjdGl2ZSkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnBlcnNwZWN0aXZlID0gcGVyc3BlY3RpdmUgPyBwZXJzcGVjdGl2ZS50b0ZpeGVkKCkgKyAncHgnIDogJyc7XG4gICAgfTtcbmZ1bmN0aW9uIENvbnRleHQoY29udGFpbmVyKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgdGhpcy5fYWxsb2NhdG9yID0gbmV3IEVsZW1lbnRBbGxvY2F0b3IoY29udGFpbmVyKTtcbiAgICB0aGlzLl9ub2RlID0gbmV3IFJlbmRlck5vZGUoKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLl9zaXplID0gX2dldEVsZW1lbnRTaXplKHRoaXMuY29udGFpbmVyKTtcbiAgICB0aGlzLl9wZXJzcGVjdGl2ZVN0YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKDApO1xuICAgIHRoaXMuX3BlcnNwZWN0aXZlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX25vZGVDb250ZXh0ID0ge1xuICAgICAgICBhbGxvY2F0b3I6IHRoaXMuX2FsbG9jYXRvcixcbiAgICAgICAgdHJhbnNmb3JtOiBUcmFuc2Zvcm0uaWRlbnRpdHksXG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIG9yaWdpbjogX3plcm9aZXJvLFxuICAgICAgICBhbGlnbjogX3plcm9aZXJvLFxuICAgICAgICBzaXplOiB0aGlzLl9zaXplXG4gICAgfTtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNldFNpemUoX2dldEVsZW1lbnRTaXplKHRoaXMuY29udGFpbmVyKSk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbn1cbkNvbnRleHQucHJvdG90eXBlLmdldEFsbG9jYXRvciA9IGZ1bmN0aW9uIGdldEFsbG9jYXRvcigpIHtcbiAgICByZXR1cm4gdGhpcy5fYWxsb2NhdG9yO1xufTtcbkNvbnRleHQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZChvYmopIHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZS5hZGQob2JqKTtcbn07XG5Db250ZXh0LnByb3RvdHlwZS5taWdyYXRlID0gZnVuY3Rpb24gbWlncmF0ZShjb250YWluZXIpIHtcbiAgICBpZiAoY29udGFpbmVyID09PSB0aGlzLmNvbnRhaW5lcilcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIHRoaXMuX2FsbG9jYXRvci5taWdyYXRlKGNvbnRhaW5lcik7XG59O1xuQ29udGV4dC5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemU7XG59O1xuQ29udGV4dC5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uIHNldFNpemUoc2l6ZSkge1xuICAgIGlmICghc2l6ZSlcbiAgICAgICAgc2l6ZSA9IF9nZXRFbGVtZW50U2l6ZSh0aGlzLmNvbnRhaW5lcik7XG4gICAgdGhpcy5fc2l6ZVswXSA9IHNpemVbMF07XG4gICAgdGhpcy5fc2l6ZVsxXSA9IHNpemVbMV07XG59O1xuQ29udGV4dC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlKGNvbnRleHRQYXJhbWV0ZXJzKSB7XG4gICAgaWYgKGNvbnRleHRQYXJhbWV0ZXJzKSB7XG4gICAgICAgIGlmIChjb250ZXh0UGFyYW1ldGVycy50cmFuc2Zvcm0pXG4gICAgICAgICAgICB0aGlzLl9ub2RlQ29udGV4dC50cmFuc2Zvcm0gPSBjb250ZXh0UGFyYW1ldGVycy50cmFuc2Zvcm07XG4gICAgICAgIGlmIChjb250ZXh0UGFyYW1ldGVycy5vcGFjaXR5KVxuICAgICAgICAgICAgdGhpcy5fbm9kZUNvbnRleHQub3BhY2l0eSA9IGNvbnRleHRQYXJhbWV0ZXJzLm9wYWNpdHk7XG4gICAgICAgIGlmIChjb250ZXh0UGFyYW1ldGVycy5vcmlnaW4pXG4gICAgICAgICAgICB0aGlzLl9ub2RlQ29udGV4dC5vcmlnaW4gPSBjb250ZXh0UGFyYW1ldGVycy5vcmlnaW47XG4gICAgICAgIGlmIChjb250ZXh0UGFyYW1ldGVycy5hbGlnbilcbiAgICAgICAgICAgIHRoaXMuX25vZGVDb250ZXh0LmFsaWduID0gY29udGV4dFBhcmFtZXRlcnMuYWxpZ247XG4gICAgICAgIGlmIChjb250ZXh0UGFyYW1ldGVycy5zaXplKVxuICAgICAgICAgICAgdGhpcy5fbm9kZUNvbnRleHQuc2l6ZSA9IGNvbnRleHRQYXJhbWV0ZXJzLnNpemU7XG4gICAgfVxuICAgIHZhciBwZXJzcGVjdGl2ZSA9IHRoaXMuX3BlcnNwZWN0aXZlU3RhdGUuZ2V0KCk7XG4gICAgaWYgKHBlcnNwZWN0aXZlICE9PSB0aGlzLl9wZXJzcGVjdGl2ZSkge1xuICAgICAgICBfc2V0UGVyc3BlY3RpdmUodGhpcy5jb250YWluZXIsIHBlcnNwZWN0aXZlKTtcbiAgICAgICAgdGhpcy5fcGVyc3BlY3RpdmUgPSBwZXJzcGVjdGl2ZTtcbiAgICB9XG4gICAgdGhpcy5fbm9kZS5jb21taXQodGhpcy5fbm9kZUNvbnRleHQpO1xufTtcbkNvbnRleHQucHJvdG90eXBlLmdldFBlcnNwZWN0aXZlID0gZnVuY3Rpb24gZ2V0UGVyc3BlY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BlcnNwZWN0aXZlU3RhdGUuZ2V0KCk7XG59O1xuQ29udGV4dC5wcm90b3R5cGUuc2V0UGVyc3BlY3RpdmUgPSBmdW5jdGlvbiBzZXRQZXJzcGVjdGl2ZShwZXJzcGVjdGl2ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5fcGVyc3BlY3RpdmVTdGF0ZS5zZXQocGVyc3BlY3RpdmUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbn07XG5Db250ZXh0LnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBldmVudCkge1xuICAgIHJldHVybiB0aGlzLl9ldmVudE91dHB1dC5lbWl0KHR5cGUsIGV2ZW50KTtcbn07XG5Db250ZXh0LnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKHR5cGUsIGhhbmRsZXIpIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRPdXRwdXQub24odHlwZSwgaGFuZGxlcik7XG59O1xuQ29udGV4dC5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50T3V0cHV0LnJlbW92ZUxpc3RlbmVyKHR5cGUsIGhhbmRsZXIpO1xufTtcbkNvbnRleHQucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiBwaXBlKHRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLl9ldmVudE91dHB1dC5waXBlKHRhcmdldCk7XG59O1xuQ29udGV4dC5wcm90b3R5cGUudW5waXBlID0gZnVuY3Rpb24gdW5waXBlKHRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLl9ldmVudE91dHB1dC51bnBpcGUodGFyZ2V0KTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IENvbnRleHQ7IiwiZnVuY3Rpb24gRWxlbWVudEFsbG9jYXRvcihjb250YWluZXIpIHtcbiAgICBpZiAoIWNvbnRhaW5lcilcbiAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIHRoaXMuZGV0YWNoZWROb2RlcyA9IHt9O1xuICAgIHRoaXMubm9kZUNvdW50ID0gMDtcbn1cbkVsZW1lbnRBbGxvY2F0b3IucHJvdG90eXBlLm1pZ3JhdGUgPSBmdW5jdGlvbiBtaWdyYXRlKGNvbnRhaW5lcikge1xuICAgIHZhciBvbGRDb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICBpZiAoY29udGFpbmVyID09PSBvbGRDb250YWluZXIpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAob2xkQ29udGFpbmVyIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQob2xkQ29udGFpbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB3aGlsZSAob2xkQ29udGFpbmVyLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG9sZENvbnRhaW5lci5yZW1vdmVDaGlsZChvbGRDb250YWluZXIuZmlyc3RDaGlsZCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xufTtcbkVsZW1lbnRBbGxvY2F0b3IucHJvdG90eXBlLmFsbG9jYXRlID0gZnVuY3Rpb24gYWxsb2NhdGUodHlwZSkge1xuICAgIHR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKCEodHlwZSBpbiB0aGlzLmRldGFjaGVkTm9kZXMpKVxuICAgICAgICB0aGlzLmRldGFjaGVkTm9kZXNbdHlwZV0gPSBbXTtcbiAgICB2YXIgbm9kZVN0b3JlID0gdGhpcy5kZXRhY2hlZE5vZGVzW3R5cGVdO1xuICAgIHZhciByZXN1bHQ7XG4gICAgaWYgKG5vZGVTdG9yZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJlc3VsdCA9IG5vZGVTdG9yZS5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChyZXN1bHQpO1xuICAgIH1cbiAgICB0aGlzLm5vZGVDb3VudCsrO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuRWxlbWVudEFsbG9jYXRvci5wcm90b3R5cGUuZGVhbGxvY2F0ZSA9IGZ1bmN0aW9uIGRlYWxsb2NhdGUoZWxlbWVudCkge1xuICAgIHZhciBub2RlVHlwZSA9IGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgbm9kZVN0b3JlID0gdGhpcy5kZXRhY2hlZE5vZGVzW25vZGVUeXBlXTtcbiAgICBub2RlU3RvcmUucHVzaChlbGVtZW50KTtcbiAgICB0aGlzLm5vZGVDb3VudC0tO1xufTtcbkVsZW1lbnRBbGxvY2F0b3IucHJvdG90eXBlLmdldE5vZGVDb3VudCA9IGZ1bmN0aW9uIGdldE5vZGVDb3VudCgpIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlQ291bnQ7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBFbGVtZW50QWxsb2NhdG9yOyIsInZhciBFbnRpdHkgPSByZXF1aXJlKCcuL0VudGl0eScpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4vRXZlbnRIYW5kbGVyJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi9UcmFuc2Zvcm0nKTtcbnZhciB1c2VQcmVmaXggPSAhKCd0cmFuc2Zvcm0nIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSk7XG52YXIgZGV2aWNlUGl4ZWxSYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG5mdW5jdGlvbiBFbGVtZW50T3V0cHV0KGVsZW1lbnQpIHtcbiAgICB0aGlzLl9tYXRyaXggPSBudWxsO1xuICAgIHRoaXMuX29wYWNpdHkgPSAxO1xuICAgIHRoaXMuX29yaWdpbiA9IG51bGw7XG4gICAgdGhpcy5fc2l6ZSA9IG51bGw7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuYmluZFRoaXModGhpcyk7XG4gICAgdGhpcy5ldmVudEZvcndhcmRlciA9IGZ1bmN0aW9uIGV2ZW50Rm9yd2FyZGVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoZXZlbnQudHlwZSwgZXZlbnQpO1xuICAgIH0uYmluZCh0aGlzKTtcbiAgICB0aGlzLmlkID0gRW50aXR5LnJlZ2lzdGVyKHRoaXMpO1xuICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuX3NpemVEaXJ0eSA9IGZhbHNlO1xuICAgIHRoaXMuX29yaWdpbkRpcnR5ID0gZmFsc2U7XG4gICAgdGhpcy5fdHJhbnNmb3JtRGlydHkgPSBmYWxzZTtcbiAgICB0aGlzLl9pbnZpc2libGUgPSBmYWxzZTtcbiAgICBpZiAoZWxlbWVudClcbiAgICAgICAgdGhpcy5hdHRhY2goZWxlbWVudCk7XG59XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKHR5cGUsIGZuKSB7XG4gICAgaWYgKHRoaXMuX2VsZW1lbnQpXG4gICAgICAgIHRoaXMuX2VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCB0aGlzLmV2ZW50Rm9yd2FyZGVyKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5vbih0eXBlLCBmbik7XG59O1xuRWxlbWVudE91dHB1dC5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBmbikge1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LnJlbW92ZUxpc3RlbmVyKHR5cGUsIGZuKTtcbn07XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBldmVudCkge1xuICAgIGlmIChldmVudCAmJiAhZXZlbnQub3JpZ2luKVxuICAgICAgICBldmVudC5vcmlnaW4gPSB0aGlzO1xuICAgIHZhciBoYW5kbGVkID0gdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCh0eXBlLCBldmVudCk7XG4gICAgaWYgKGhhbmRsZWQgJiYgZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKVxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICByZXR1cm4gaGFuZGxlZDtcbn07XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gcGlwZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRPdXRwdXQucGlwZSh0YXJnZXQpO1xufTtcbkVsZW1lbnRPdXRwdXQucHJvdG90eXBlLnVucGlwZSA9IGZ1bmN0aW9uIHVucGlwZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRPdXRwdXQudW5waXBlKHRhcmdldCk7XG59O1xuRWxlbWVudE91dHB1dC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmlkO1xufTtcbmZ1bmN0aW9uIF9hZGRFdmVudExpc3RlbmVycyh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpIGluIHRoaXMuX2V2ZW50T3V0cHV0Lmxpc3RlbmVycykge1xuICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihpLCB0aGlzLmV2ZW50Rm9yd2FyZGVyKTtcbiAgICB9XG59XG5mdW5jdGlvbiBfcmVtb3ZlRXZlbnRMaXN0ZW5lcnModGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLl9ldmVudE91dHB1dC5saXN0ZW5lcnMpIHtcbiAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoaSwgdGhpcy5ldmVudEZvcndhcmRlcik7XG4gICAgfVxufVxuZnVuY3Rpb24gX2Zvcm1hdENTU1RyYW5zZm9ybShtKSB7XG4gICAgbVsxMl0gPSBNYXRoLnJvdW5kKG1bMTJdICogZGV2aWNlUGl4ZWxSYXRpbykgLyBkZXZpY2VQaXhlbFJhdGlvO1xuICAgIG1bMTNdID0gTWF0aC5yb3VuZChtWzEzXSAqIGRldmljZVBpeGVsUmF0aW8pIC8gZGV2aWNlUGl4ZWxSYXRpbztcbiAgICB2YXIgcmVzdWx0ID0gJ21hdHJpeDNkKCc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCArPSBtW2ldIDwgMC4wMDAwMDEgJiYgbVtpXSA+IC0wLjAwMDAwMSA/ICcwLCcgOiBtW2ldICsgJywnO1xuICAgIH1cbiAgICByZXN1bHQgKz0gbVsxNV0gKyAnKSc7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbnZhciBfc2V0TWF0cml4O1xuaWYgKG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdmaXJlZm94JykgPiAtMSkge1xuICAgIF9zZXRNYXRyaXggPSBmdW5jdGlvbiAoZWxlbWVudCwgbWF0cml4KSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuekluZGV4ID0gbWF0cml4WzE0XSAqIDEwMDAwMDAgfCAwO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IF9mb3JtYXRDU1NUcmFuc2Zvcm0obWF0cml4KTtcbiAgICB9O1xufSBlbHNlIGlmICh1c2VQcmVmaXgpIHtcbiAgICBfc2V0TWF0cml4ID0gZnVuY3Rpb24gKGVsZW1lbnQsIG1hdHJpeCkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IF9mb3JtYXRDU1NUcmFuc2Zvcm0obWF0cml4KTtcbiAgICB9O1xufSBlbHNlIHtcbiAgICBfc2V0TWF0cml4ID0gZnVuY3Rpb24gKGVsZW1lbnQsIG1hdHJpeCkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IF9mb3JtYXRDU1NUcmFuc2Zvcm0obWF0cml4KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gX2Zvcm1hdENTU09yaWdpbihvcmlnaW4pIHtcbiAgICByZXR1cm4gMTAwICogb3JpZ2luWzBdICsgJyUgJyArIDEwMCAqIG9yaWdpblsxXSArICclJztcbn1cbnZhciBfc2V0T3JpZ2luID0gdXNlUHJlZml4ID8gZnVuY3Rpb24gKGVsZW1lbnQsIG9yaWdpbikge1xuICAgICAgICBlbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybU9yaWdpbiA9IF9mb3JtYXRDU1NPcmlnaW4ob3JpZ2luKTtcbiAgICB9IDogZnVuY3Rpb24gKGVsZW1lbnQsIG9yaWdpbikge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9IF9mb3JtYXRDU1NPcmlnaW4ob3JpZ2luKTtcbiAgICB9O1xudmFyIF9zZXRJbnZpc2libGUgPSB1c2VQcmVmaXggPyBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZTNkKDAuMDAwMSwwLjAwMDEsMC4wMDAxKSc7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgfSA6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlM2QoMC4wMDAxLDAuMDAwMSwwLjAwMDEpJztcbiAgICAgICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICB9O1xuZnVuY3Rpb24gX3h5Tm90RXF1YWxzKGEsIGIpIHtcbiAgICByZXR1cm4gYSAmJiBiID8gYVswXSAhPT0gYlswXSB8fCBhWzFdICE9PSBiWzFdIDogYSAhPT0gYjtcbn1cbkVsZW1lbnRPdXRwdXQucHJvdG90eXBlLmNvbW1pdCA9IGZ1bmN0aW9uIGNvbW1pdChjb250ZXh0KSB7XG4gICAgdmFyIHRhcmdldCA9IHRoaXMuX2VsZW1lbnQ7XG4gICAgaWYgKCF0YXJnZXQpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgbWF0cml4ID0gY29udGV4dC50cmFuc2Zvcm07XG4gICAgdmFyIG9wYWNpdHkgPSBjb250ZXh0Lm9wYWNpdHk7XG4gICAgdmFyIG9yaWdpbiA9IGNvbnRleHQub3JpZ2luO1xuICAgIHZhciBzaXplID0gY29udGV4dC5zaXplO1xuICAgIGlmICghbWF0cml4ICYmIHRoaXMuX21hdHJpeCkge1xuICAgICAgICB0aGlzLl9tYXRyaXggPSBudWxsO1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gMDtcbiAgICAgICAgX3NldEludmlzaWJsZSh0YXJnZXQpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChfeHlOb3RFcXVhbHModGhpcy5fb3JpZ2luLCBvcmlnaW4pKVxuICAgICAgICB0aGlzLl9vcmlnaW5EaXJ0eSA9IHRydWU7XG4gICAgaWYgKFRyYW5zZm9ybS5ub3RFcXVhbHModGhpcy5fbWF0cml4LCBtYXRyaXgpKVxuICAgICAgICB0aGlzLl90cmFuc2Zvcm1EaXJ0eSA9IHRydWU7XG4gICAgaWYgKHRoaXMuX2ludmlzaWJsZSkge1xuICAgICAgICB0aGlzLl9pbnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgfVxuICAgIGlmICh0aGlzLl9vcGFjaXR5ICE9PSBvcGFjaXR5KSB7XG4gICAgICAgIHRoaXMuX29wYWNpdHkgPSBvcGFjaXR5O1xuICAgICAgICB0YXJnZXQuc3R5bGUub3BhY2l0eSA9IG9wYWNpdHkgPj0gMSA/ICcwLjk5OTk5OScgOiBvcGFjaXR5O1xuICAgIH1cbiAgICBpZiAodGhpcy5fdHJhbnNmb3JtRGlydHkgfHwgdGhpcy5fb3JpZ2luRGlydHkgfHwgdGhpcy5fc2l6ZURpcnR5KSB7XG4gICAgICAgIGlmICh0aGlzLl9zaXplRGlydHkpXG4gICAgICAgICAgICB0aGlzLl9zaXplRGlydHkgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuX29yaWdpbkRpcnR5KSB7XG4gICAgICAgICAgICBpZiAob3JpZ2luKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9vcmlnaW4pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29yaWdpbiA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgdGhpcy5fb3JpZ2luWzBdID0gb3JpZ2luWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMuX29yaWdpblsxXSA9IG9yaWdpblsxXTtcbiAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuX29yaWdpbiA9IG51bGw7XG4gICAgICAgICAgICBfc2V0T3JpZ2luKHRhcmdldCwgdGhpcy5fb3JpZ2luKTtcbiAgICAgICAgICAgIHRoaXMuX29yaWdpbkRpcnR5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtYXRyaXgpXG4gICAgICAgICAgICBtYXRyaXggPSBUcmFuc2Zvcm0uaWRlbnRpdHk7XG4gICAgICAgIHRoaXMuX21hdHJpeCA9IG1hdHJpeDtcbiAgICAgICAgdmFyIGFhTWF0cml4ID0gdGhpcy5fc2l6ZSA/IFRyYW5zZm9ybS50aGVuTW92ZShtYXRyaXgsIFtcbiAgICAgICAgICAgICAgICAtdGhpcy5fc2l6ZVswXSAqIG9yaWdpblswXSxcbiAgICAgICAgICAgICAgICAtdGhpcy5fc2l6ZVsxXSAqIG9yaWdpblsxXSxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdKSA6IG1hdHJpeDtcbiAgICAgICAgX3NldE1hdHJpeCh0YXJnZXQsIGFhTWF0cml4KTtcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtRGlydHkgPSBmYWxzZTtcbiAgICB9XG59O1xuRWxlbWVudE91dHB1dC5wcm90b3R5cGUuY2xlYW51cCA9IGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgaWYgKHRoaXMuX2VsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5faW52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbn07XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS5hdHRhY2ggPSBmdW5jdGlvbiBhdHRhY2godGFyZ2V0KSB7XG4gICAgdGhpcy5fZWxlbWVudCA9IHRhcmdldDtcbiAgICBfYWRkRXZlbnRMaXN0ZW5lcnMuY2FsbCh0aGlzLCB0YXJnZXQpO1xufTtcbkVsZW1lbnRPdXRwdXQucHJvdG90eXBlLmRldGFjaCA9IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5fZWxlbWVudDtcbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIF9yZW1vdmVFdmVudExpc3RlbmVycy5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgICAgIGlmICh0aGlzLl9pbnZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2ludmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgcmV0dXJuIHRhcmdldDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEVsZW1lbnRPdXRwdXQ7IiwidmFyIENvbnRleHQgPSByZXF1aXJlKCcuL0NvbnRleHQnKTtcbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuL0V2ZW50SGFuZGxlcicpO1xudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnLi9PcHRpb25zTWFuYWdlcicpO1xudmFyIEVuZ2luZSA9IHt9O1xudmFyIGNvbnRleHRzID0gW107XG52YXIgbmV4dFRpY2tRdWV1ZSA9IFtdO1xudmFyIGRlZmVyUXVldWUgPSBbXTtcbnZhciBsYXN0VGltZSA9IERhdGUubm93KCk7XG52YXIgZnJhbWVUaW1lO1xudmFyIGZyYW1lVGltZUxpbWl0O1xudmFyIGxvb3BFbmFibGVkID0gdHJ1ZTtcbnZhciBldmVudEZvcndhcmRlcnMgPSB7fTtcbnZhciBldmVudEhhbmRsZXIgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG52YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgY29udGFpbmVyVHlwZTogJ2RpdicsXG4gICAgICAgIGNvbnRhaW5lckNsYXNzOiAnZmFtb3VzLWNvbnRhaW5lcicsXG4gICAgICAgIGZwc0NhcDogdW5kZWZpbmVkLFxuICAgICAgICBydW5Mb29wOiB0cnVlLFxuICAgICAgICBhcHBNb2RlOiB0cnVlXG4gICAgfTtcbnZhciBvcHRpb25zTWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcihvcHRpb25zKTtcbnZhciBNQVhfREVGRVJfRlJBTUVfVElNRSA9IDEwO1xuRW5naW5lLnN0ZXAgPSBmdW5jdGlvbiBzdGVwKCkge1xuICAgIHZhciBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XG4gICAgaWYgKGZyYW1lVGltZUxpbWl0ICYmIGN1cnJlbnRUaW1lIC0gbGFzdFRpbWUgPCBmcmFtZVRpbWVMaW1pdClcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciBpID0gMDtcbiAgICBmcmFtZVRpbWUgPSBjdXJyZW50VGltZSAtIGxhc3RUaW1lO1xuICAgIGxhc3RUaW1lID0gY3VycmVudFRpbWU7XG4gICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3ByZXJlbmRlcicpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBuZXh0VGlja1F1ZXVlLmxlbmd0aDsgaSsrKVxuICAgICAgICBuZXh0VGlja1F1ZXVlW2ldLmNhbGwodGhpcyk7XG4gICAgbmV4dFRpY2tRdWV1ZS5zcGxpY2UoMCk7XG4gICAgd2hpbGUgKGRlZmVyUXVldWUubGVuZ3RoICYmIERhdGUubm93KCkgLSBjdXJyZW50VGltZSA8IE1BWF9ERUZFUl9GUkFNRV9USU1FKSB7XG4gICAgICAgIGRlZmVyUXVldWUuc2hpZnQoKS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgY29udGV4dHMubGVuZ3RoOyBpKyspXG4gICAgICAgIGNvbnRleHRzW2ldLnVwZGF0ZSgpO1xuICAgIGV2ZW50SGFuZGxlci5lbWl0KCdwb3N0cmVuZGVyJyk7XG59O1xuZnVuY3Rpb24gbG9vcCgpIHtcbiAgICBpZiAob3B0aW9ucy5ydW5Mb29wKSB7XG4gICAgICAgIEVuZ2luZS5zdGVwKCk7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgfSBlbHNlXG4gICAgICAgIGxvb3BFbmFibGVkID0gZmFsc2U7XG59XG53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuZnVuY3Rpb24gaGFuZGxlUmVzaXplKGV2ZW50KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250ZXh0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb250ZXh0c1tpXS5lbWl0KCdyZXNpemUnKTtcbiAgICB9XG4gICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3Jlc2l6ZScpO1xufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVJlc2l6ZSwgZmFsc2UpO1xuaGFuZGxlUmVzaXplKCk7XG5mdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9LCB0cnVlKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2ZhbW91cy1yb290Jyk7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ZhbW91cy1yb290Jyk7XG59XG52YXIgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbkVuZ2luZS5waXBlID0gZnVuY3Rpb24gcGlwZSh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LnN1YnNjcmliZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LnN1YnNjcmliZShFbmdpbmUpO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIGV2ZW50SGFuZGxlci5waXBlKHRhcmdldCk7XG59O1xuRW5naW5lLnVucGlwZSA9IGZ1bmN0aW9uIHVucGlwZSh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LnVuc3Vic2NyaWJlIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHJldHVybiB0YXJnZXQudW5zdWJzY3JpYmUoRW5naW5lKTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBldmVudEhhbmRsZXIudW5waXBlKHRhcmdldCk7XG59O1xuRW5naW5lLm9uID0gZnVuY3Rpb24gb24odHlwZSwgaGFuZGxlcikge1xuICAgIGlmICghKHR5cGUgaW4gZXZlbnRGb3J3YXJkZXJzKSkge1xuICAgICAgICBldmVudEZvcndhcmRlcnNbdHlwZV0gPSBldmVudEhhbmRsZXIuZW1pdC5iaW5kKGV2ZW50SGFuZGxlciwgdHlwZSk7XG4gICAgICAgIGlmIChkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZXZlbnRGb3J3YXJkZXJzW3R5cGVdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEVuZ2luZS5uZXh0VGljayhmdW5jdGlvbiAodHlwZSwgZm9yd2FyZGVyKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZvcndhcmRlcik7XG4gICAgICAgICAgICB9LmJpbmQodGhpcywgdHlwZSwgZXZlbnRGb3J3YXJkZXJzW3R5cGVdKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGV2ZW50SGFuZGxlci5vbih0eXBlLCBoYW5kbGVyKTtcbn07XG5FbmdpbmUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSwgZXZlbnQpIHtcbiAgICByZXR1cm4gZXZlbnRIYW5kbGVyLmVtaXQodHlwZSwgZXZlbnQpO1xufTtcbkVuZ2luZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGhhbmRsZXIpIHtcbiAgICByZXR1cm4gZXZlbnRIYW5kbGVyLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGhhbmRsZXIpO1xufTtcbkVuZ2luZS5nZXRGUFMgPSBmdW5jdGlvbiBnZXRGUFMoKSB7XG4gICAgcmV0dXJuIDEwMDAgLyBmcmFtZVRpbWU7XG59O1xuRW5naW5lLnNldEZQU0NhcCA9IGZ1bmN0aW9uIHNldEZQU0NhcChmcHMpIHtcbiAgICBmcmFtZVRpbWVMaW1pdCA9IE1hdGguZmxvb3IoMTAwMCAvIGZwcyk7XG59O1xuRW5naW5lLmdldE9wdGlvbnMgPSBmdW5jdGlvbiBnZXRPcHRpb25zKGtleSkge1xuICAgIHJldHVybiBvcHRpb25zTWFuYWdlci5nZXRPcHRpb25zKGtleSk7XG59O1xuRW5naW5lLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3B0aW9uc01hbmFnZXIuc2V0T3B0aW9ucy5hcHBseShvcHRpb25zTWFuYWdlciwgYXJndW1lbnRzKTtcbn07XG5FbmdpbmUuY3JlYXRlQ29udGV4dCA9IGZ1bmN0aW9uIGNyZWF0ZUNvbnRleHQoZWwpIHtcbiAgICBpZiAoIWluaXRpYWxpemVkICYmIG9wdGlvbnMuYXBwTW9kZSlcbiAgICAgICAgRW5naW5lLm5leHRUaWNrKGluaXRpYWxpemUpO1xuICAgIHZhciBuZWVkTW91bnRDb250YWluZXIgPSBmYWxzZTtcbiAgICBpZiAoIWVsKSB7XG4gICAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChvcHRpb25zLmNvbnRhaW5lclR5cGUpO1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKG9wdGlvbnMuY29udGFpbmVyQ2xhc3MpO1xuICAgICAgICBuZWVkTW91bnRDb250YWluZXIgPSB0cnVlO1xuICAgIH1cbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KGVsKTtcbiAgICBFbmdpbmUucmVnaXN0ZXJDb250ZXh0KGNvbnRleHQpO1xuICAgIGlmIChuZWVkTW91bnRDb250YWluZXIpIHtcbiAgICAgICAgRW5naW5lLm5leHRUaWNrKGZ1bmN0aW9uIChjb250ZXh0LCBlbCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbCk7XG4gICAgICAgICAgICBjb250ZXh0LmVtaXQoJ3Jlc2l6ZScpO1xuICAgICAgICB9LmJpbmQodGhpcywgY29udGV4dCwgZWwpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRleHQ7XG59O1xuRW5naW5lLnJlZ2lzdGVyQ29udGV4dCA9IGZ1bmN0aW9uIHJlZ2lzdGVyQ29udGV4dChjb250ZXh0KSB7XG4gICAgY29udGV4dHMucHVzaChjb250ZXh0KTtcbiAgICByZXR1cm4gY29udGV4dDtcbn07XG5FbmdpbmUuZ2V0Q29udGV4dHMgPSBmdW5jdGlvbiBnZXRDb250ZXh0cygpIHtcbiAgICByZXR1cm4gY29udGV4dHM7XG59O1xuRW5naW5lLmRlcmVnaXN0ZXJDb250ZXh0ID0gZnVuY3Rpb24gZGVyZWdpc3RlckNvbnRleHQoY29udGV4dCkge1xuICAgIHZhciBpID0gY29udGV4dHMuaW5kZXhPZihjb250ZXh0KTtcbiAgICBpZiAoaSA+PSAwKVxuICAgICAgICBjb250ZXh0cy5zcGxpY2UoaSwgMSk7XG59O1xuRW5naW5lLm5leHRUaWNrID0gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICBuZXh0VGlja1F1ZXVlLnB1c2goZm4pO1xufTtcbkVuZ2luZS5kZWZlciA9IGZ1bmN0aW9uIGRlZmVyKGZuKSB7XG4gICAgZGVmZXJRdWV1ZS5wdXNoKGZuKTtcbn07XG5vcHRpb25zTWFuYWdlci5vbignY2hhbmdlJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBpZiAoZGF0YS5pZCA9PT0gJ2Zwc0NhcCcpXG4gICAgICAgIEVuZ2luZS5zZXRGUFNDYXAoZGF0YS52YWx1ZSk7XG4gICAgZWxzZSBpZiAoZGF0YS5pZCA9PT0gJ3J1bkxvb3AnKSB7XG4gICAgICAgIGlmICghbG9vcEVuYWJsZWQgJiYgZGF0YS52YWx1ZSkge1xuICAgICAgICAgICAgbG9vcEVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBFbmdpbmU7IiwidmFyIGVudGl0aWVzID0gW107XG5mdW5jdGlvbiBnZXQoaWQpIHtcbiAgICByZXR1cm4gZW50aXRpZXNbaWRdO1xufVxuZnVuY3Rpb24gc2V0KGlkLCBlbnRpdHkpIHtcbiAgICBlbnRpdGllc1tpZF0gPSBlbnRpdHk7XG59XG5mdW5jdGlvbiByZWdpc3RlcihlbnRpdHkpIHtcbiAgICB2YXIgaWQgPSBlbnRpdGllcy5sZW5ndGg7XG4gICAgc2V0KGlkLCBlbnRpdHkpO1xuICAgIHJldHVybiBpZDtcbn1cbmZ1bmN0aW9uIHVucmVnaXN0ZXIoaWQpIHtcbiAgICBzZXQoaWQsIG51bGwpO1xufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcmVnaXN0ZXI6IHJlZ2lzdGVyLFxuICAgIHVucmVnaXN0ZXI6IHVucmVnaXN0ZXIsXG4gICAgZ2V0OiBnZXQsXG4gICAgc2V0OiBzZXRcbn07IiwiZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICAgIHRoaXMubGlzdGVuZXJzID0ge307XG4gICAgdGhpcy5fb3duZXIgPSB0aGlzO1xufVxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBldmVudCkge1xuICAgIHZhciBoYW5kbGVycyA9IHRoaXMubGlzdGVuZXJzW3R5cGVdO1xuICAgIGlmIChoYW5kbGVycykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhhbmRsZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBoYW5kbGVyc1tpXS5jYWxsKHRoaXMuX293bmVyLCBldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKHR5cGUsIGhhbmRsZXIpIHtcbiAgICBpZiAoISh0eXBlIGluIHRoaXMubGlzdGVuZXJzKSlcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0gPSBbXTtcbiAgICB2YXIgaW5kZXggPSB0aGlzLmxpc3RlbmVyc1t0eXBlXS5pbmRleE9mKGhhbmRsZXIpO1xuICAgIGlmIChpbmRleCA8IDApXG4gICAgICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdLnB1c2goaGFuZGxlcik7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUub247XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgaGFuZGxlcikge1xuICAgIHZhciBsaXN0ZW5lciA9IHRoaXMubGlzdGVuZXJzW3R5cGVdO1xuICAgIGlmIChsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGxpc3RlbmVyLmluZGV4T2YoaGFuZGxlcik7XG4gICAgICAgIGlmIChpbmRleCA+PSAwKVxuICAgICAgICAgICAgbGlzdGVuZXIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5iaW5kVGhpcyA9IGZ1bmN0aW9uIGJpbmRUaGlzKG93bmVyKSB7XG4gICAgdGhpcy5fb3duZXIgPSBvd25lcjtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjsiLCJ2YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnLi9FdmVudEVtaXR0ZXInKTtcbmZ1bmN0aW9uIEV2ZW50SGFuZGxlcigpIHtcbiAgICBFdmVudEVtaXR0ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLmRvd25zdHJlYW0gPSBbXTtcbiAgICB0aGlzLmRvd25zdHJlYW1GbiA9IFtdO1xuICAgIHRoaXMudXBzdHJlYW0gPSBbXTtcbiAgICB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzID0ge307XG59XG5FdmVudEhhbmRsZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFdmVudEVtaXR0ZXIucHJvdG90eXBlKTtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFdmVudEhhbmRsZXI7XG5FdmVudEhhbmRsZXIuc2V0SW5wdXRIYW5kbGVyID0gZnVuY3Rpb24gc2V0SW5wdXRIYW5kbGVyKG9iamVjdCwgaGFuZGxlcikge1xuICAgIG9iamVjdC50cmlnZ2VyID0gaGFuZGxlci50cmlnZ2VyLmJpbmQoaGFuZGxlcik7XG4gICAgaWYgKGhhbmRsZXIuc3Vic2NyaWJlICYmIGhhbmRsZXIudW5zdWJzY3JpYmUpIHtcbiAgICAgICAgb2JqZWN0LnN1YnNjcmliZSA9IGhhbmRsZXIuc3Vic2NyaWJlLmJpbmQoaGFuZGxlcik7XG4gICAgICAgIG9iamVjdC51bnN1YnNjcmliZSA9IGhhbmRsZXIudW5zdWJzY3JpYmUuYmluZChoYW5kbGVyKTtcbiAgICB9XG59O1xuRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIgPSBmdW5jdGlvbiBzZXRPdXRwdXRIYW5kbGVyKG9iamVjdCwgaGFuZGxlcikge1xuICAgIGlmIChoYW5kbGVyIGluc3RhbmNlb2YgRXZlbnRIYW5kbGVyKVxuICAgICAgICBoYW5kbGVyLmJpbmRUaGlzKG9iamVjdCk7XG4gICAgb2JqZWN0LnBpcGUgPSBoYW5kbGVyLnBpcGUuYmluZChoYW5kbGVyKTtcbiAgICBvYmplY3QudW5waXBlID0gaGFuZGxlci51bnBpcGUuYmluZChoYW5kbGVyKTtcbiAgICBvYmplY3Qub24gPSBoYW5kbGVyLm9uLmJpbmQoaGFuZGxlcik7XG4gICAgb2JqZWN0LmFkZExpc3RlbmVyID0gb2JqZWN0Lm9uO1xuICAgIG9iamVjdC5yZW1vdmVMaXN0ZW5lciA9IGhhbmRsZXIucmVtb3ZlTGlzdGVuZXIuYmluZChoYW5kbGVyKTtcbn07XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUsIGV2ZW50KSB7XG4gICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdmFyIGkgPSAwO1xuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmRvd25zdHJlYW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuZG93bnN0cmVhbVtpXS50cmlnZ2VyKVxuICAgICAgICAgICAgdGhpcy5kb3duc3RyZWFtW2ldLnRyaWdnZXIodHlwZSwgZXZlbnQpO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5kb3duc3RyZWFtRm4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5kb3duc3RyZWFtRm5baV0odHlwZSwgZXZlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLnRyaWdnZXIgPSBFdmVudEhhbmRsZXIucHJvdG90eXBlLmVtaXQ7XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiBwaXBlKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuc3Vic2NyaWJlIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHJldHVybiB0YXJnZXQuc3Vic2NyaWJlKHRoaXMpO1xuICAgIHZhciBkb3duc3RyZWFtQ3R4ID0gdGFyZ2V0IGluc3RhbmNlb2YgRnVuY3Rpb24gPyB0aGlzLmRvd25zdHJlYW1GbiA6IHRoaXMuZG93bnN0cmVhbTtcbiAgICB2YXIgaW5kZXggPSBkb3duc3RyZWFtQ3R4LmluZGV4T2YodGFyZ2V0KTtcbiAgICBpZiAoaW5kZXggPCAwKVxuICAgICAgICBkb3duc3RyZWFtQ3R4LnB1c2godGFyZ2V0KTtcbiAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRhcmdldCgncGlwZScsIG51bGwpO1xuICAgIGVsc2UgaWYgKHRhcmdldC50cmlnZ2VyKVxuICAgICAgICB0YXJnZXQudHJpZ2dlcigncGlwZScsIG51bGwpO1xuICAgIHJldHVybiB0YXJnZXQ7XG59O1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS51bnBpcGUgPSBmdW5jdGlvbiB1bnBpcGUodGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC51bnN1YnNjcmliZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LnVuc3Vic2NyaWJlKHRoaXMpO1xuICAgIHZhciBkb3duc3RyZWFtQ3R4ID0gdGFyZ2V0IGluc3RhbmNlb2YgRnVuY3Rpb24gPyB0aGlzLmRvd25zdHJlYW1GbiA6IHRoaXMuZG93bnN0cmVhbTtcbiAgICB2YXIgaW5kZXggPSBkb3duc3RyZWFtQ3R4LmluZGV4T2YodGFyZ2V0KTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICBkb3duc3RyZWFtQ3R4LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgICAgIHRhcmdldCgndW5waXBlJywgbnVsbCk7XG4gICAgICAgIGVsc2UgaWYgKHRhcmdldC50cmlnZ2VyKVxuICAgICAgICAgICAgdGFyZ2V0LnRyaWdnZXIoJ3VucGlwZScsIG51bGwpO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gZmFsc2U7XG59O1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKHR5cGUsIGhhbmRsZXIpIHtcbiAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKCEodHlwZSBpbiB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzKSkge1xuICAgICAgICB2YXIgdXBzdHJlYW1MaXN0ZW5lciA9IHRoaXMudHJpZ2dlci5iaW5kKHRoaXMsIHR5cGUpO1xuICAgICAgICB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzW3R5cGVdID0gdXBzdHJlYW1MaXN0ZW5lcjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnVwc3RyZWFtLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnVwc3RyZWFtW2ldLm9uKHR5cGUsIHVwc3RyZWFtTGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEhhbmRsZXIucHJvdG90eXBlLm9uO1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiBzdWJzY3JpYmUoc291cmNlKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy51cHN0cmVhbS5pbmRleE9mKHNvdXJjZSk7XG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICB0aGlzLnVwc3RyZWFtLnB1c2goc291cmNlKTtcbiAgICAgICAgZm9yICh2YXIgdHlwZSBpbiB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBzb3VyY2Uub24odHlwZSwgdGhpcy51cHN0cmVhbUxpc3RlbmVyc1t0eXBlXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uIHVuc3Vic2NyaWJlKHNvdXJjZSkge1xuICAgIHZhciBpbmRleCA9IHRoaXMudXBzdHJlYW0uaW5kZXhPZihzb3VyY2UpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgIHRoaXMudXBzdHJlYW0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgZm9yICh2YXIgdHlwZSBpbiB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBzb3VyY2UucmVtb3ZlTGlzdGVuZXIodHlwZSwgdGhpcy51cHN0cmVhbUxpc3RlbmVyc1t0eXBlXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBFdmVudEhhbmRsZXI7IiwidmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJy4vVHJhbnNmb3JtJyk7XG52YXIgVHJhbnNpdGlvbmFibGUgPSByZXF1aXJlKCcuLi90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZScpO1xudmFyIFRyYW5zaXRpb25hYmxlVHJhbnNmb3JtID0gcmVxdWlyZSgnLi4vdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0nKTtcbmZ1bmN0aW9uIE1vZGlmaWVyKG9wdGlvbnMpIHtcbiAgICB0aGlzLl90cmFuc2Zvcm1HZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX29wYWNpdHlHZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX29yaWdpbkdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fYWxpZ25HZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX3NpemVHZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX3Byb3BvcnRpb25HZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX2xlZ2FjeVN0YXRlcyA9IHt9O1xuICAgIHRoaXMuX291dHB1dCA9IHtcbiAgICAgICAgdHJhbnNmb3JtOiBUcmFuc2Zvcm0uaWRlbnRpdHksXG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIG9yaWdpbjogbnVsbCxcbiAgICAgICAgYWxpZ246IG51bGwsXG4gICAgICAgIHNpemU6IG51bGwsXG4gICAgICAgIHByb3BvcnRpb25zOiBudWxsLFxuICAgICAgICB0YXJnZXQ6IG51bGxcbiAgICB9O1xuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zLnRyYW5zZm9ybSlcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtRnJvbShvcHRpb25zLnRyYW5zZm9ybSk7XG4gICAgICAgIGlmIChvcHRpb25zLm9wYWNpdHkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRoaXMub3BhY2l0eUZyb20ob3B0aW9ucy5vcGFjaXR5KTtcbiAgICAgICAgaWYgKG9wdGlvbnMub3JpZ2luKVxuICAgICAgICAgICAgdGhpcy5vcmlnaW5Gcm9tKG9wdGlvbnMub3JpZ2luKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuYWxpZ24pXG4gICAgICAgICAgICB0aGlzLmFsaWduRnJvbShvcHRpb25zLmFsaWduKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuc2l6ZSlcbiAgICAgICAgICAgIHRoaXMuc2l6ZUZyb20ob3B0aW9ucy5zaXplKTtcbiAgICAgICAgaWYgKG9wdGlvbnMucHJvcG9ydGlvbnMpXG4gICAgICAgICAgICB0aGlzLnByb3BvcnRpb25zRnJvbShvcHRpb25zLnByb3BvcnRpb25zKTtcbiAgICB9XG59XG5Nb2RpZmllci5wcm90b3R5cGUudHJhbnNmb3JtRnJvbSA9IGZ1bmN0aW9uIHRyYW5zZm9ybUZyb20odHJhbnNmb3JtKSB7XG4gICAgaWYgKHRyYW5zZm9ybSBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICB0aGlzLl90cmFuc2Zvcm1HZXR0ZXIgPSB0cmFuc2Zvcm07XG4gICAgZWxzZSBpZiAodHJhbnNmb3JtIGluc3RhbmNlb2YgT2JqZWN0ICYmIHRyYW5zZm9ybS5nZXQpXG4gICAgICAgIHRoaXMuX3RyYW5zZm9ybUdldHRlciA9IHRyYW5zZm9ybS5nZXQuYmluZCh0cmFuc2Zvcm0pO1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl90cmFuc2Zvcm1HZXR0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9vdXRwdXQudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5Nb2RpZmllci5wcm90b3R5cGUub3BhY2l0eUZyb20gPSBmdW5jdGlvbiBvcGFjaXR5RnJvbShvcGFjaXR5KSB7XG4gICAgaWYgKG9wYWNpdHkgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGhpcy5fb3BhY2l0eUdldHRlciA9IG9wYWNpdHk7XG4gICAgZWxzZSBpZiAob3BhY2l0eSBpbnN0YW5jZW9mIE9iamVjdCAmJiBvcGFjaXR5LmdldClcbiAgICAgICAgdGhpcy5fb3BhY2l0eUdldHRlciA9IG9wYWNpdHkuZ2V0LmJpbmQob3BhY2l0eSk7XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX29wYWNpdHlHZXR0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9vdXRwdXQub3BhY2l0eSA9IG9wYWNpdHk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5vcmlnaW5Gcm9tID0gZnVuY3Rpb24gb3JpZ2luRnJvbShvcmlnaW4pIHtcbiAgICBpZiAob3JpZ2luIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRoaXMuX29yaWdpbkdldHRlciA9IG9yaWdpbjtcbiAgICBlbHNlIGlmIChvcmlnaW4gaW5zdGFuY2VvZiBPYmplY3QgJiYgb3JpZ2luLmdldClcbiAgICAgICAgdGhpcy5fb3JpZ2luR2V0dGVyID0gb3JpZ2luLmdldC5iaW5kKG9yaWdpbik7XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX29yaWdpbkdldHRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX291dHB1dC5vcmlnaW4gPSBvcmlnaW47XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5hbGlnbkZyb20gPSBmdW5jdGlvbiBhbGlnbkZyb20oYWxpZ24pIHtcbiAgICBpZiAoYWxpZ24gaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGhpcy5fYWxpZ25HZXR0ZXIgPSBhbGlnbjtcbiAgICBlbHNlIGlmIChhbGlnbiBpbnN0YW5jZW9mIE9iamVjdCAmJiBhbGlnbi5nZXQpXG4gICAgICAgIHRoaXMuX2FsaWduR2V0dGVyID0gYWxpZ24uZ2V0LmJpbmQoYWxpZ24pO1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9hbGlnbkdldHRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX291dHB1dC5hbGlnbiA9IGFsaWduO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuc2l6ZUZyb20gPSBmdW5jdGlvbiBzaXplRnJvbShzaXplKSB7XG4gICAgaWYgKHNpemUgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGhpcy5fc2l6ZUdldHRlciA9IHNpemU7XG4gICAgZWxzZSBpZiAoc2l6ZSBpbnN0YW5jZW9mIE9iamVjdCAmJiBzaXplLmdldClcbiAgICAgICAgdGhpcy5fc2l6ZUdldHRlciA9IHNpemUuZ2V0LmJpbmQoc2l6ZSk7XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX3NpemVHZXR0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9vdXRwdXQuc2l6ZSA9IHNpemU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5wcm9wb3J0aW9uc0Zyb20gPSBmdW5jdGlvbiBwcm9wb3J0aW9uc0Zyb20ocHJvcG9ydGlvbnMpIHtcbiAgICBpZiAocHJvcG9ydGlvbnMgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGhpcy5fcHJvcG9ydGlvbkdldHRlciA9IHByb3BvcnRpb25zO1xuICAgIGVsc2UgaWYgKHByb3BvcnRpb25zIGluc3RhbmNlb2YgT2JqZWN0ICYmIHByb3BvcnRpb25zLmdldClcbiAgICAgICAgdGhpcy5fcHJvcG9ydGlvbkdldHRlciA9IHByb3BvcnRpb25zLmdldC5iaW5kKHByb3BvcnRpb25zKTtcbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fcHJvcG9ydGlvbkdldHRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX291dHB1dC5wcm9wb3J0aW9ucyA9IHByb3BvcnRpb25zO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuc2V0VHJhbnNmb3JtID0gZnVuY3Rpb24gc2V0VHJhbnNmb3JtKHRyYW5zZm9ybSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAodHJhbnNpdGlvbiB8fCB0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtKSB7XG4gICAgICAgIGlmICghdGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybSkge1xuICAgICAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybSA9IG5ldyBUcmFuc2l0aW9uYWJsZVRyYW5zZm9ybSh0aGlzLl9vdXRwdXQudHJhbnNmb3JtKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX3RyYW5zZm9ybUdldHRlcilcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtRnJvbSh0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtKTtcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybS5zZXQodHJhbnNmb3JtLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm1Gcm9tKHRyYW5zZm9ybSk7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLnNldE9wYWNpdHkgPSBmdW5jdGlvbiBzZXRPcGFjaXR5KG9wYWNpdHksIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHRyYW5zaXRpb24gfHwgdGhpcy5fbGVnYWN5U3RhdGVzLm9wYWNpdHkpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sZWdhY3lTdGF0ZXMub3BhY2l0eSkge1xuICAgICAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLm9wYWNpdHkgPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fb3V0cHV0Lm9wYWNpdHkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fb3BhY2l0eUdldHRlcilcbiAgICAgICAgICAgIHRoaXMub3BhY2l0eUZyb20odGhpcy5fbGVnYWN5U3RhdGVzLm9wYWNpdHkpO1xuICAgICAgICByZXR1cm4gdGhpcy5fbGVnYWN5U3RhdGVzLm9wYWNpdHkuc2V0KG9wYWNpdHksIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIHRoaXMub3BhY2l0eUZyb20ob3BhY2l0eSk7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLnNldE9yaWdpbiA9IGZ1bmN0aW9uIHNldE9yaWdpbihvcmlnaW4sIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHRyYW5zaXRpb24gfHwgdGhpcy5fbGVnYWN5U3RhdGVzLm9yaWdpbikge1xuICAgICAgICBpZiAoIXRoaXMuX2xlZ2FjeVN0YXRlcy5vcmlnaW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5vcmlnaW4gPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fb3V0cHV0Lm9yaWdpbiB8fCBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX29yaWdpbkdldHRlcilcbiAgICAgICAgICAgIHRoaXMub3JpZ2luRnJvbSh0aGlzLl9sZWdhY3lTdGF0ZXMub3JpZ2luKTtcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLm9yaWdpbi5zZXQob3JpZ2luLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5Gcm9tKG9yaWdpbik7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLnNldEFsaWduID0gZnVuY3Rpb24gc2V0QWxpZ24oYWxpZ24sIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHRyYW5zaXRpb24gfHwgdGhpcy5fbGVnYWN5U3RhdGVzLmFsaWduKSB7XG4gICAgICAgIGlmICghdGhpcy5fbGVnYWN5U3RhdGVzLmFsaWduKSB7XG4gICAgICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMuYWxpZ24gPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fb3V0cHV0LmFsaWduIHx8IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fYWxpZ25HZXR0ZXIpXG4gICAgICAgICAgICB0aGlzLmFsaWduRnJvbSh0aGlzLl9sZWdhY3lTdGF0ZXMuYWxpZ24pO1xuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMuYWxpZ24uc2V0KGFsaWduLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy5hbGlnbkZyb20oYWxpZ24pO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24gc2V0U2l6ZShzaXplLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmIChzaXplICYmICh0cmFuc2l0aW9uIHx8IHRoaXMuX2xlZ2FjeVN0YXRlcy5zaXplKSkge1xuICAgICAgICBpZiAoIXRoaXMuX2xlZ2FjeVN0YXRlcy5zaXplKSB7XG4gICAgICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMuc2l6ZSA9IG5ldyBUcmFuc2l0aW9uYWJsZSh0aGlzLl9vdXRwdXQuc2l6ZSB8fCBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX3NpemVHZXR0ZXIpXG4gICAgICAgICAgICB0aGlzLnNpemVGcm9tKHRoaXMuX2xlZ2FjeVN0YXRlcy5zaXplKTtcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLnNpemUuc2V0KHNpemUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiB0aGlzLnNpemVGcm9tKHNpemUpO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5zZXRQcm9wb3J0aW9ucyA9IGZ1bmN0aW9uIHNldFByb3BvcnRpb25zKHByb3BvcnRpb25zLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmIChwcm9wb3J0aW9ucyAmJiAodHJhbnNpdGlvbiB8fCB0aGlzLl9sZWdhY3lTdGF0ZXMucHJvcG9ydGlvbnMpKSB7XG4gICAgICAgIGlmICghdGhpcy5fbGVnYWN5U3RhdGVzLnByb3BvcnRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMucHJvcG9ydGlvbnMgPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fb3V0cHV0LnByb3BvcnRpb25zIHx8IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fcHJvcG9ydGlvbkdldHRlcilcbiAgICAgICAgICAgIHRoaXMucHJvcG9ydGlvbnNGcm9tKHRoaXMuX2xlZ2FjeVN0YXRlcy5wcm9wb3J0aW9ucyk7XG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5wcm9wb3J0aW9ucy5zZXQocHJvcG9ydGlvbnMsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BvcnRpb25zRnJvbShwcm9wb3J0aW9ucyk7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLmhhbHQgPSBmdW5jdGlvbiBoYWx0KCkge1xuICAgIGlmICh0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtKVxuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtLmhhbHQoKTtcbiAgICBpZiAodGhpcy5fbGVnYWN5U3RhdGVzLm9wYWNpdHkpXG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5vcGFjaXR5LmhhbHQoKTtcbiAgICBpZiAodGhpcy5fbGVnYWN5U3RhdGVzLm9yaWdpbilcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLm9yaWdpbi5oYWx0KCk7XG4gICAgaWYgKHRoaXMuX2xlZ2FjeVN0YXRlcy5hbGlnbilcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLmFsaWduLmhhbHQoKTtcbiAgICBpZiAodGhpcy5fbGVnYWN5U3RhdGVzLnNpemUpXG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5zaXplLmhhbHQoKTtcbiAgICBpZiAodGhpcy5fbGVnYWN5U3RhdGVzLnByb3BvcnRpb25zKVxuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMucHJvcG9ydGlvbnMuaGFsdCgpO1xuICAgIHRoaXMuX3RyYW5zZm9ybUdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fb3BhY2l0eUdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fb3JpZ2luR2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9hbGlnbkdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fc2l6ZUdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fcHJvcG9ydGlvbkdldHRlciA9IG51bGw7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLmdldFRyYW5zZm9ybSA9IGZ1bmN0aW9uIGdldFRyYW5zZm9ybSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdHJhbnNmb3JtR2V0dGVyKCk7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLmdldEZpbmFsVHJhbnNmb3JtID0gZnVuY3Rpb24gZ2V0RmluYWxUcmFuc2Zvcm0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xlZ2FjeVN0YXRlcy50cmFuc2Zvcm0gPyB0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtLmdldEZpbmFsKCkgOiB0aGlzLl9vdXRwdXQudHJhbnNmb3JtO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5nZXRPcGFjaXR5ID0gZnVuY3Rpb24gZ2V0T3BhY2l0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5fb3BhY2l0eUdldHRlcigpO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5nZXRPcmlnaW4gPSBmdW5jdGlvbiBnZXRPcmlnaW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWdpbkdldHRlcigpO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5nZXRBbGlnbiA9IGZ1bmN0aW9uIGdldEFsaWduKCkge1xuICAgIHJldHVybiB0aGlzLl9hbGlnbkdldHRlcigpO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gZ2V0U2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZUdldHRlciA/IHRoaXMuX3NpemVHZXR0ZXIoKSA6IHRoaXMuX291dHB1dC5zaXplO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5nZXRQcm9wb3J0aW9ucyA9IGZ1bmN0aW9uIGdldFByb3BvcnRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLl9wcm9wb3J0aW9uR2V0dGVyID8gdGhpcy5fcHJvcG9ydGlvbkdldHRlcigpIDogdGhpcy5fb3V0cHV0LnByb3BvcnRpb25zO1xufTtcbmZ1bmN0aW9uIF91cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuX3RyYW5zZm9ybUdldHRlcilcbiAgICAgICAgdGhpcy5fb3V0cHV0LnRyYW5zZm9ybSA9IHRoaXMuX3RyYW5zZm9ybUdldHRlcigpO1xuICAgIGlmICh0aGlzLl9vcGFjaXR5R2V0dGVyKVxuICAgICAgICB0aGlzLl9vdXRwdXQub3BhY2l0eSA9IHRoaXMuX29wYWNpdHlHZXR0ZXIoKTtcbiAgICBpZiAodGhpcy5fb3JpZ2luR2V0dGVyKVxuICAgICAgICB0aGlzLl9vdXRwdXQub3JpZ2luID0gdGhpcy5fb3JpZ2luR2V0dGVyKCk7XG4gICAgaWYgKHRoaXMuX2FsaWduR2V0dGVyKVxuICAgICAgICB0aGlzLl9vdXRwdXQuYWxpZ24gPSB0aGlzLl9hbGlnbkdldHRlcigpO1xuICAgIGlmICh0aGlzLl9zaXplR2V0dGVyKVxuICAgICAgICB0aGlzLl9vdXRwdXQuc2l6ZSA9IHRoaXMuX3NpemVHZXR0ZXIoKTtcbiAgICBpZiAodGhpcy5fcHJvcG9ydGlvbkdldHRlcilcbiAgICAgICAgdGhpcy5fb3V0cHV0LnByb3BvcnRpb25zID0gdGhpcy5fcHJvcG9ydGlvbkdldHRlcigpO1xufVxuTW9kaWZpZXIucHJvdG90eXBlLm1vZGlmeSA9IGZ1bmN0aW9uIG1vZGlmeSh0YXJnZXQpIHtcbiAgICBfdXBkYXRlLmNhbGwodGhpcyk7XG4gICAgdGhpcy5fb3V0cHV0LnRhcmdldCA9IHRhcmdldDtcbiAgICByZXR1cm4gdGhpcy5fb3V0cHV0O1xufTtcbm1vZHVsZS5leHBvcnRzID0gTW9kaWZpZXI7IiwidmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4vRXZlbnRIYW5kbGVyJyk7XG5mdW5jdGlvbiBPcHRpb25zTWFuYWdlcih2YWx1ZSkge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5ldmVudE91dHB1dCA9IG51bGw7XG59XG5PcHRpb25zTWFuYWdlci5wYXRjaCA9IGZ1bmN0aW9uIHBhdGNoT2JqZWN0KHNvdXJjZSwgZGF0YSkge1xuICAgIHZhciBtYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHNvdXJjZSk7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXG4gICAgICAgIG1hbmFnZXIucGF0Y2goYXJndW1lbnRzW2ldKTtcbiAgICByZXR1cm4gc291cmNlO1xufTtcbmZ1bmN0aW9uIF9jcmVhdGVFdmVudE91dHB1dCgpIHtcbiAgICB0aGlzLmV2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuZXZlbnRPdXRwdXQuYmluZFRoaXModGhpcyk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5ldmVudE91dHB1dCk7XG59XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUucGF0Y2ggPSBmdW5jdGlvbiBwYXRjaCgpIHtcbiAgICB2YXIgbXlTdGF0ZSA9IHRoaXMuX3ZhbHVlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBkYXRhID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBmb3IgKHZhciBrIGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChrIGluIG15U3RhdGUgJiYgKGRhdGFba10gJiYgZGF0YVtrXS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSAmJiAobXlTdGF0ZVtrXSAmJiBteVN0YXRlW2tdLmNvbnN0cnVjdG9yID09PSBPYmplY3QpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFteVN0YXRlLmhhc093blByb3BlcnR5KGspKVxuICAgICAgICAgICAgICAgICAgICBteVN0YXRlW2tdID0gT2JqZWN0LmNyZWF0ZShteVN0YXRlW2tdKTtcbiAgICAgICAgICAgICAgICB0aGlzLmtleShrKS5wYXRjaChkYXRhW2tdKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ldmVudE91dHB1dClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudE91dHB1dC5lbWl0KCdjaGFuZ2UnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogayxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmtleShrKS52YWx1ZSgpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoaywgZGF0YVtrXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLnNldE9wdGlvbnMgPSBPcHRpb25zTWFuYWdlci5wcm90b3R5cGUucGF0Y2g7XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUua2V5ID0gZnVuY3Rpb24ga2V5KGlkZW50aWZpZXIpIHtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHRoaXMuX3ZhbHVlW2lkZW50aWZpZXJdKTtcbiAgICBpZiAoIShyZXN1bHQuX3ZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB8fCByZXN1bHQuX3ZhbHVlIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgIHJlc3VsdC5fdmFsdWUgPSB7fTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgcmV0dXJuIGtleSA/IHRoaXMuX3ZhbHVlW2tleV0gOiB0aGlzLl92YWx1ZTtcbn07XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUuZ2V0T3B0aW9ucyA9IE9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5nZXQ7XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpIHtcbiAgICB2YXIgb3JpZ2luYWxWYWx1ZSA9IHRoaXMuZ2V0KGtleSk7XG4gICAgdGhpcy5fdmFsdWVba2V5XSA9IHZhbHVlO1xuICAgIGlmICh0aGlzLmV2ZW50T3V0cHV0ICYmIHZhbHVlICE9PSBvcmlnaW5hbFZhbHVlKVxuICAgICAgICB0aGlzLmV2ZW50T3V0cHV0LmVtaXQoJ2NoYW5nZScsIHtcbiAgICAgICAgICAgIGlkOiBrZXksXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMub24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcigpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5yZW1vdmVMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbk9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gcGlwZSgpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5waXBlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLnVucGlwZSA9IGZ1bmN0aW9uIHVucGlwZSgpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy51bnBpcGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IE9wdGlvbnNNYW5hZ2VyOyIsInZhciBFbnRpdHkgPSByZXF1aXJlKCcuL0VudGl0eScpO1xudmFyIFNwZWNQYXJzZXIgPSByZXF1aXJlKCcuL1NwZWNQYXJzZXInKTtcbmZ1bmN0aW9uIFJlbmRlck5vZGUob2JqZWN0KSB7XG4gICAgdGhpcy5fb2JqZWN0ID0gbnVsbDtcbiAgICB0aGlzLl9jaGlsZCA9IG51bGw7XG4gICAgdGhpcy5faGFzTXVsdGlwbGVDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMuX2lzUmVuZGVyYWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuX2lzTW9kaWZpZXIgPSBmYWxzZTtcbiAgICB0aGlzLl9yZXN1bHRDYWNoZSA9IHt9O1xuICAgIHRoaXMuX3ByZXZSZXN1bHRzID0ge307XG4gICAgdGhpcy5fY2hpbGRSZXN1bHQgPSBudWxsO1xuICAgIGlmIChvYmplY3QpXG4gICAgICAgIHRoaXMuc2V0KG9iamVjdCk7XG59XG5SZW5kZXJOb2RlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQoY2hpbGQpIHtcbiAgICB2YXIgY2hpbGROb2RlID0gY2hpbGQgaW5zdGFuY2VvZiBSZW5kZXJOb2RlID8gY2hpbGQgOiBuZXcgUmVuZGVyTm9kZShjaGlsZCk7XG4gICAgaWYgKHRoaXMuX2NoaWxkIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgIHRoaXMuX2NoaWxkLnB1c2goY2hpbGROb2RlKTtcbiAgICBlbHNlIGlmICh0aGlzLl9jaGlsZCkge1xuICAgICAgICB0aGlzLl9jaGlsZCA9IFtcbiAgICAgICAgICAgIHRoaXMuX2NoaWxkLFxuICAgICAgICAgICAgY2hpbGROb2RlXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuX2hhc011bHRpcGxlQ2hpbGRyZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLl9jaGlsZFJlc3VsdCA9IFtdO1xuICAgIH0gZWxzZVxuICAgICAgICB0aGlzLl9jaGlsZCA9IGNoaWxkTm9kZTtcbiAgICByZXR1cm4gY2hpbGROb2RlO1xufTtcblJlbmRlck5vZGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gdGhpcy5fb2JqZWN0IHx8ICh0aGlzLl9oYXNNdWx0aXBsZUNoaWxkcmVuID8gbnVsbCA6IHRoaXMuX2NoaWxkID8gdGhpcy5fY2hpbGQuZ2V0KCkgOiBudWxsKTtcbn07XG5SZW5kZXJOb2RlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoY2hpbGQpIHtcbiAgICB0aGlzLl9jaGlsZFJlc3VsdCA9IG51bGw7XG4gICAgdGhpcy5faGFzTXVsdGlwbGVDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMuX2lzUmVuZGVyYWJsZSA9IGNoaWxkLnJlbmRlciA/IHRydWUgOiBmYWxzZTtcbiAgICB0aGlzLl9pc01vZGlmaWVyID0gY2hpbGQubW9kaWZ5ID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHRoaXMuX29iamVjdCA9IGNoaWxkO1xuICAgIHRoaXMuX2NoaWxkID0gbnVsbDtcbiAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBSZW5kZXJOb2RlKVxuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gdGhpcztcbn07XG5SZW5kZXJOb2RlLnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gZ2V0U2l6ZSgpIHtcbiAgICB2YXIgcmVzdWx0ID0gbnVsbDtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5nZXQoKTtcbiAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5nZXRTaXplKVxuICAgICAgICByZXN1bHQgPSB0YXJnZXQuZ2V0U2l6ZSgpO1xuICAgIGlmICghcmVzdWx0ICYmIHRoaXMuX2NoaWxkICYmIHRoaXMuX2NoaWxkLmdldFNpemUpXG4gICAgICAgIHJlc3VsdCA9IHRoaXMuX2NoaWxkLmdldFNpemUoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbmZ1bmN0aW9uIF9hcHBseUNvbW1pdChzcGVjLCBjb250ZXh0LCBjYWNoZVN0b3JhZ2UpIHtcbiAgICB2YXIgcmVzdWx0ID0gU3BlY1BhcnNlci5wYXJzZShzcGVjLCBjb250ZXh0KTtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHJlc3VsdCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBpZCA9IGtleXNbaV07XG4gICAgICAgIHZhciBjaGlsZE5vZGUgPSBFbnRpdHkuZ2V0KGlkKTtcbiAgICAgICAgdmFyIGNvbW1pdFBhcmFtcyA9IHJlc3VsdFtpZF07XG4gICAgICAgIGNvbW1pdFBhcmFtcy5hbGxvY2F0b3IgPSBjb250ZXh0LmFsbG9jYXRvcjtcbiAgICAgICAgdmFyIGNvbW1pdFJlc3VsdCA9IGNoaWxkTm9kZS5jb21taXQoY29tbWl0UGFyYW1zKTtcbiAgICAgICAgaWYgKGNvbW1pdFJlc3VsdClcbiAgICAgICAgICAgIF9hcHBseUNvbW1pdChjb21taXRSZXN1bHQsIGNvbnRleHQsIGNhY2hlU3RvcmFnZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNhY2hlU3RvcmFnZVtpZF0gPSBjb21taXRQYXJhbXM7XG4gICAgfVxufVxuUmVuZGVyTm9kZS5wcm90b3R5cGUuY29tbWl0ID0gZnVuY3Rpb24gY29tbWl0KGNvbnRleHQpIHtcbiAgICB2YXIgcHJldktleXMgPSBPYmplY3Qua2V5cyh0aGlzLl9wcmV2UmVzdWx0cyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmV2S2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaWQgPSBwcmV2S2V5c1tpXTtcbiAgICAgICAgaWYgKHRoaXMuX3Jlc3VsdENhY2hlW2lkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0gRW50aXR5LmdldChpZCk7XG4gICAgICAgICAgICBpZiAob2JqZWN0LmNsZWFudXApXG4gICAgICAgICAgICAgICAgb2JqZWN0LmNsZWFudXAoY29udGV4dC5hbGxvY2F0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuX3ByZXZSZXN1bHRzID0gdGhpcy5fcmVzdWx0Q2FjaGU7XG4gICAgdGhpcy5fcmVzdWx0Q2FjaGUgPSB7fTtcbiAgICBfYXBwbHlDb21taXQodGhpcy5yZW5kZXIoKSwgY29udGV4dCwgdGhpcy5fcmVzdWx0Q2FjaGUpO1xufTtcblJlbmRlck5vZGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5faXNSZW5kZXJhYmxlKVxuICAgICAgICByZXR1cm4gdGhpcy5fb2JqZWN0LnJlbmRlcigpO1xuICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgIGlmICh0aGlzLl9oYXNNdWx0aXBsZUNoaWxkcmVuKSB7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuX2NoaWxkUmVzdWx0O1xuICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLl9jaGlsZDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0W2ldID0gY2hpbGRyZW5baV0ucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuX2NoaWxkKVxuICAgICAgICByZXN1bHQgPSB0aGlzLl9jaGlsZC5yZW5kZXIoKTtcbiAgICByZXR1cm4gdGhpcy5faXNNb2RpZmllciA/IHRoaXMuX29iamVjdC5tb2RpZnkocmVzdWx0KSA6IHJlc3VsdDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFJlbmRlck5vZGU7IiwidmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJy4vVHJhbnNmb3JtJyk7XG5mdW5jdGlvbiBTcGVjUGFyc2VyKCkge1xuICAgIHRoaXMucmVzdWx0ID0ge307XG59XG5TcGVjUGFyc2VyLl9pbnN0YW5jZSA9IG5ldyBTcGVjUGFyc2VyKCk7XG5TcGVjUGFyc2VyLnBhcnNlID0gZnVuY3Rpb24gcGFyc2Uoc3BlYywgY29udGV4dCkge1xuICAgIHJldHVybiBTcGVjUGFyc2VyLl9pbnN0YW5jZS5wYXJzZShzcGVjLCBjb250ZXh0KTtcbn07XG5TcGVjUGFyc2VyLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIHBhcnNlKHNwZWMsIGNvbnRleHQpIHtcbiAgICB0aGlzLnJlc2V0KCk7XG4gICAgdGhpcy5fcGFyc2VTcGVjKHNwZWMsIGNvbnRleHQsIFRyYW5zZm9ybS5pZGVudGl0eSk7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0O1xufTtcblNwZWNQYXJzZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgdGhpcy5yZXN1bHQgPSB7fTtcbn07XG5mdW5jdGlvbiBfdmVjSW5Db250ZXh0KHYsIG0pIHtcbiAgICByZXR1cm4gW1xuICAgICAgICB2WzBdICogbVswXSArIHZbMV0gKiBtWzRdICsgdlsyXSAqIG1bOF0sXG4gICAgICAgIHZbMF0gKiBtWzFdICsgdlsxXSAqIG1bNV0gKyB2WzJdICogbVs5XSxcbiAgICAgICAgdlswXSAqIG1bMl0gKyB2WzFdICogbVs2XSArIHZbMl0gKiBtWzEwXVxuICAgIF07XG59XG52YXIgX3plcm9aZXJvID0gW1xuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXTtcblNwZWNQYXJzZXIucHJvdG90eXBlLl9wYXJzZVNwZWMgPSBmdW5jdGlvbiBfcGFyc2VTcGVjKHNwZWMsIHBhcmVudENvbnRleHQsIHNpemVDb250ZXh0KSB7XG4gICAgdmFyIGlkO1xuICAgIHZhciB0YXJnZXQ7XG4gICAgdmFyIHRyYW5zZm9ybTtcbiAgICB2YXIgb3BhY2l0eTtcbiAgICB2YXIgb3JpZ2luO1xuICAgIHZhciBhbGlnbjtcbiAgICB2YXIgc2l6ZTtcbiAgICBpZiAodHlwZW9mIHNwZWMgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGlkID0gc3BlYztcbiAgICAgICAgdHJhbnNmb3JtID0gcGFyZW50Q29udGV4dC50cmFuc2Zvcm07XG4gICAgICAgIGFsaWduID0gcGFyZW50Q29udGV4dC5hbGlnbiB8fCBfemVyb1plcm87XG4gICAgICAgIGlmIChwYXJlbnRDb250ZXh0LnNpemUgJiYgYWxpZ24gJiYgKGFsaWduWzBdIHx8IGFsaWduWzFdKSkge1xuICAgICAgICAgICAgdmFyIGFsaWduQWRqdXN0ID0gW1xuICAgICAgICAgICAgICAgICAgICBhbGlnblswXSAqIHBhcmVudENvbnRleHQuc2l6ZVswXSxcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25bMV0gKiBwYXJlbnRDb250ZXh0LnNpemVbMV0sXG4gICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgdHJhbnNmb3JtID0gVHJhbnNmb3JtLnRoZW5Nb3ZlKHRyYW5zZm9ybSwgX3ZlY0luQ29udGV4dChhbGlnbkFkanVzdCwgc2l6ZUNvbnRleHQpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc3VsdFtpZF0gPSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgICAgICAgICAgIG9wYWNpdHk6IHBhcmVudENvbnRleHQub3BhY2l0eSxcbiAgICAgICAgICAgIG9yaWdpbjogcGFyZW50Q29udGV4dC5vcmlnaW4gfHwgX3plcm9aZXJvLFxuICAgICAgICAgICAgYWxpZ246IHBhcmVudENvbnRleHQuYWxpZ24gfHwgX3plcm9aZXJvLFxuICAgICAgICAgICAgc2l6ZTogcGFyZW50Q29udGV4dC5zaXplXG4gICAgICAgIH07XG4gICAgfSBlbHNlIGlmICghc3BlYykge1xuICAgICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmIChzcGVjIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzcGVjLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJzZVNwZWMoc3BlY1tpXSwgcGFyZW50Q29udGV4dCwgc2l6ZUNvbnRleHQpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0ID0gc3BlYy50YXJnZXQ7XG4gICAgICAgIHRyYW5zZm9ybSA9IHBhcmVudENvbnRleHQudHJhbnNmb3JtO1xuICAgICAgICBvcGFjaXR5ID0gcGFyZW50Q29udGV4dC5vcGFjaXR5O1xuICAgICAgICBvcmlnaW4gPSBwYXJlbnRDb250ZXh0Lm9yaWdpbjtcbiAgICAgICAgYWxpZ24gPSBwYXJlbnRDb250ZXh0LmFsaWduO1xuICAgICAgICBzaXplID0gcGFyZW50Q29udGV4dC5zaXplO1xuICAgICAgICB2YXIgbmV4dFNpemVDb250ZXh0ID0gc2l6ZUNvbnRleHQ7XG4gICAgICAgIGlmIChzcGVjLm9wYWNpdHkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIG9wYWNpdHkgPSBwYXJlbnRDb250ZXh0Lm9wYWNpdHkgKiBzcGVjLm9wYWNpdHk7XG4gICAgICAgIGlmIChzcGVjLnRyYW5zZm9ybSlcbiAgICAgICAgICAgIHRyYW5zZm9ybSA9IFRyYW5zZm9ybS5tdWx0aXBseShwYXJlbnRDb250ZXh0LnRyYW5zZm9ybSwgc3BlYy50cmFuc2Zvcm0pO1xuICAgICAgICBpZiAoc3BlYy5vcmlnaW4pIHtcbiAgICAgICAgICAgIG9yaWdpbiA9IHNwZWMub3JpZ2luO1xuICAgICAgICAgICAgbmV4dFNpemVDb250ZXh0ID0gcGFyZW50Q29udGV4dC50cmFuc2Zvcm07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNwZWMuYWxpZ24pXG4gICAgICAgICAgICBhbGlnbiA9IHNwZWMuYWxpZ247XG4gICAgICAgIGlmIChzcGVjLnNpemUgfHwgc3BlYy5wcm9wb3J0aW9ucykge1xuICAgICAgICAgICAgdmFyIHBhcmVudFNpemUgPSBzaXplO1xuICAgICAgICAgICAgc2l6ZSA9IFtcbiAgICAgICAgICAgICAgICBzaXplWzBdLFxuICAgICAgICAgICAgICAgIHNpemVbMV1cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAoc3BlYy5zaXplKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNwZWMuc2l6ZVswXSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICBzaXplWzBdID0gc3BlYy5zaXplWzBdO1xuICAgICAgICAgICAgICAgIGlmIChzcGVjLnNpemVbMV0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgc2l6ZVsxXSA9IHNwZWMuc2l6ZVsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzcGVjLnByb3BvcnRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNwZWMucHJvcG9ydGlvbnNbMF0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgc2l6ZVswXSA9IHNpemVbMF0gKiBzcGVjLnByb3BvcnRpb25zWzBdO1xuICAgICAgICAgICAgICAgIGlmIChzcGVjLnByb3BvcnRpb25zWzFdICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgIHNpemVbMV0gPSBzaXplWzFdICogc3BlYy5wcm9wb3J0aW9uc1sxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJlbnRTaXplKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFsaWduICYmIChhbGlnblswXSB8fCBhbGlnblsxXSkpXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybSA9IFRyYW5zZm9ybS50aGVuTW92ZSh0cmFuc2Zvcm0sIF92ZWNJbkNvbnRleHQoW1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25bMF0gKiBwYXJlbnRTaXplWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25bMV0gKiBwYXJlbnRTaXplWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgICAgICBdLCBzaXplQ29udGV4dCkpO1xuICAgICAgICAgICAgICAgIGlmIChvcmlnaW4gJiYgKG9yaWdpblswXSB8fCBvcmlnaW5bMV0pKVxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gPSBUcmFuc2Zvcm0ubW92ZVRoZW4oW1xuICAgICAgICAgICAgICAgICAgICAgICAgLW9yaWdpblswXSAqIHNpemVbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAtb3JpZ2luWzFdICogc2l6ZVsxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICAgICAgXSwgdHJhbnNmb3JtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5leHRTaXplQ29udGV4dCA9IHBhcmVudENvbnRleHQudHJhbnNmb3JtO1xuICAgICAgICAgICAgb3JpZ2luID0gbnVsbDtcbiAgICAgICAgICAgIGFsaWduID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wYXJzZVNwZWModGFyZ2V0LCB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgICAgICAgICAgIG9wYWNpdHk6IG9wYWNpdHksXG4gICAgICAgICAgICBvcmlnaW46IG9yaWdpbixcbiAgICAgICAgICAgIGFsaWduOiBhbGlnbixcbiAgICAgICAgICAgIHNpemU6IHNpemVcbiAgICAgICAgfSwgbmV4dFNpemVDb250ZXh0KTtcbiAgICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTcGVjUGFyc2VyOyIsInZhciBFbGVtZW50T3V0cHV0ID0gcmVxdWlyZSgnLi9FbGVtZW50T3V0cHV0Jyk7XG5mdW5jdGlvbiBTdXJmYWNlKG9wdGlvbnMpIHtcbiAgICBFbGVtZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgdGhpcy5vcHRpb25zID0ge307XG4gICAgdGhpcy5wcm9wZXJ0aWVzID0ge307XG4gICAgdGhpcy5hdHRyaWJ1dGVzID0ge307XG4gICAgdGhpcy5jb250ZW50ID0gJyc7XG4gICAgdGhpcy5jbGFzc0xpc3QgPSBbXTtcbiAgICB0aGlzLnNpemUgPSBudWxsO1xuICAgIHRoaXMuX2NsYXNzZXNEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fc3R5bGVzRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX2F0dHJpYnV0ZXNEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fc2l6ZURpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl9jb250ZW50RGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX3RydWVTaXplQ2hlY2sgPSB0cnVlO1xuICAgIHRoaXMuX2RpcnR5Q2xhc3NlcyA9IFtdO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5fY3VycmVudFRhcmdldCA9IG51bGw7XG59XG5TdXJmYWNlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRWxlbWVudE91dHB1dC5wcm90b3R5cGUpO1xuU3VyZmFjZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTdXJmYWNlO1xuU3VyZmFjZS5wcm90b3R5cGUuZWxlbWVudFR5cGUgPSAnZGl2JztcblN1cmZhY2UucHJvdG90eXBlLmVsZW1lbnRDbGFzcyA9ICdmYW1vdXMtc3VyZmFjZSc7XG5TdXJmYWNlLnByb3RvdHlwZS5zZXRBdHRyaWJ1dGVzID0gZnVuY3Rpb24gc2V0QXR0cmlidXRlcyhhdHRyaWJ1dGVzKSB7XG4gICAgZm9yICh2YXIgbiBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGlmIChuID09PSAnc3R5bGUnKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgc2V0IHN0eWxlcyB2aWEgXCJzZXRBdHRyaWJ1dGVzXCIgYXMgaXQgd2lsbCBicmVhayBGYW1vLnVzLiAgVXNlIFwic2V0UHJvcGVydGllc1wiIGluc3RlYWQuJyk7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlc1tuXSA9IGF0dHJpYnV0ZXNbbl07XG4gICAgfVxuICAgIHRoaXMuX2F0dHJpYnV0ZXNEaXJ0eSA9IHRydWU7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuZ2V0QXR0cmlidXRlcyA9IGZ1bmN0aW9uIGdldEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlcztcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5zZXRQcm9wZXJ0aWVzID0gZnVuY3Rpb24gc2V0UHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgZm9yICh2YXIgbiBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHRoaXMucHJvcGVydGllc1tuXSA9IHByb3BlcnRpZXNbbl07XG4gICAgfVxuICAgIHRoaXMuX3N0eWxlc0RpcnR5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5nZXRQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZ2V0UHJvcGVydGllcygpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzO1xufTtcblN1cmZhY2UucHJvdG90eXBlLmFkZENsYXNzID0gZnVuY3Rpb24gYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgaWYgKHRoaXMuY2xhc3NMaXN0LmluZGV4T2YoY2xhc3NOYW1lKSA8IDApIHtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucHVzaChjbGFzc05hbWUpO1xuICAgICAgICB0aGlzLl9jbGFzc2VzRGlydHkgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xuICAgIHZhciBpID0gdGhpcy5jbGFzc0xpc3QuaW5kZXhPZihjbGFzc05hbWUpO1xuICAgIGlmIChpID49IDApIHtcbiAgICAgICAgdGhpcy5fZGlydHlDbGFzc2VzLnB1c2godGhpcy5jbGFzc0xpc3Quc3BsaWNlKGksIDEpWzBdKTtcbiAgICAgICAgdGhpcy5fY2xhc3Nlc0RpcnR5ID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUudG9nZ2xlQ2xhc3MgPSBmdW5jdGlvbiB0b2dnbGVDbGFzcyhjbGFzc05hbWUpIHtcbiAgICB2YXIgaSA9IHRoaXMuY2xhc3NMaXN0LmluZGV4T2YoY2xhc3NOYW1lKTtcbiAgICBpZiAoaSA+PSAwKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFkZENsYXNzKGNsYXNzTmFtZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblN1cmZhY2UucHJvdG90eXBlLnNldENsYXNzZXMgPSBmdW5jdGlvbiBzZXRDbGFzc2VzKGNsYXNzTGlzdCkge1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcmVtb3ZhbCA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmNsYXNzTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY2xhc3NMaXN0LmluZGV4T2YodGhpcy5jbGFzc0xpc3RbaV0pIDwgMClcbiAgICAgICAgICAgIHJlbW92YWwucHVzaCh0aGlzLmNsYXNzTGlzdFtpXSk7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCByZW1vdmFsLmxlbmd0aDsgaSsrKVxuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKHJlbW92YWxbaV0pO1xuICAgIGZvciAoaSA9IDA7IGkgPCBjbGFzc0xpc3QubGVuZ3RoOyBpKyspXG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoY2xhc3NMaXN0W2ldKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5nZXRDbGFzc0xpc3QgPSBmdW5jdGlvbiBnZXRDbGFzc0xpc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xhc3NMaXN0O1xufTtcblN1cmZhY2UucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiBzZXRDb250ZW50KGNvbnRlbnQpIHtcbiAgICBpZiAodGhpcy5jb250ZW50ICE9PSBjb250ZW50KSB7XG4gICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIHRoaXMuX2NvbnRlbnREaXJ0eSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblN1cmZhY2UucHJvdG90eXBlLmdldENvbnRlbnQgPSBmdW5jdGlvbiBnZXRDb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQ7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLnNpemUpXG4gICAgICAgIHRoaXMuc2V0U2l6ZShvcHRpb25zLnNpemUpO1xuICAgIGlmIChvcHRpb25zLmNsYXNzZXMpXG4gICAgICAgIHRoaXMuc2V0Q2xhc3NlcyhvcHRpb25zLmNsYXNzZXMpO1xuICAgIGlmIChvcHRpb25zLnByb3BlcnRpZXMpXG4gICAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhvcHRpb25zLnByb3BlcnRpZXMpO1xuICAgIGlmIChvcHRpb25zLmF0dHJpYnV0ZXMpXG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlcyhvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICAgIGlmIChvcHRpb25zLmNvbnRlbnQpXG4gICAgICAgIHRoaXMuc2V0Q29udGVudChvcHRpb25zLmNvbnRlbnQpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbmZ1bmN0aW9uIF9jbGVhbnVwQ2xhc3Nlcyh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2RpcnR5Q2xhc3Nlcy5sZW5ndGg7IGkrKylcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fZGlydHlDbGFzc2VzW2ldKTtcbiAgICB0aGlzLl9kaXJ0eUNsYXNzZXMgPSBbXTtcbn1cbmZ1bmN0aW9uIF9hcHBseVN0eWxlcyh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBuIGluIHRoaXMucHJvcGVydGllcykge1xuICAgICAgICB0YXJnZXQuc3R5bGVbbl0gPSB0aGlzLnByb3BlcnRpZXNbbl07XG4gICAgfVxufVxuZnVuY3Rpb24gX2NsZWFudXBTdHlsZXModGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgbiBpbiB0aGlzLnByb3BlcnRpZXMpIHtcbiAgICAgICAgdGFyZ2V0LnN0eWxlW25dID0gJyc7XG4gICAgfVxufVxuZnVuY3Rpb24gX2FwcGx5QXR0cmlidXRlcyh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBuIGluIHRoaXMuYXR0cmlidXRlcykge1xuICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKG4sIHRoaXMuYXR0cmlidXRlc1tuXSk7XG4gICAgfVxufVxuZnVuY3Rpb24gX2NsZWFudXBBdHRyaWJ1dGVzKHRhcmdldCkge1xuICAgIGZvciAodmFyIG4gaW4gdGhpcy5hdHRyaWJ1dGVzKSB7XG4gICAgICAgIHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUobik7XG4gICAgfVxufVxuZnVuY3Rpb24gX3h5Tm90RXF1YWxzKGEsIGIpIHtcbiAgICByZXR1cm4gYSAmJiBiID8gYVswXSAhPT0gYlswXSB8fCBhWzFdICE9PSBiWzFdIDogYSAhPT0gYjtcbn1cblN1cmZhY2UucHJvdG90eXBlLnNldHVwID0gZnVuY3Rpb24gc2V0dXAoYWxsb2NhdG9yKSB7XG4gICAgdmFyIHRhcmdldCA9IGFsbG9jYXRvci5hbGxvY2F0ZSh0aGlzLmVsZW1lbnRUeXBlKTtcbiAgICBpZiAodGhpcy5lbGVtZW50Q2xhc3MpIHtcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudENsYXNzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lbGVtZW50Q2xhc3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCh0aGlzLmVsZW1lbnRDbGFzc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCh0aGlzLmVsZW1lbnRDbGFzcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICB0aGlzLmF0dGFjaCh0YXJnZXQpO1xuICAgIHRoaXMuX29wYWNpdHkgPSBudWxsO1xuICAgIHRoaXMuX2N1cnJlbnRUYXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5fc3R5bGVzRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX2NsYXNzZXNEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fYXR0cmlidXRlc0RpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl9zaXplRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX2NvbnRlbnREaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fb3JpZ2luRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX3RyYW5zZm9ybURpcnR5ID0gdHJ1ZTtcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5jb21taXQgPSBmdW5jdGlvbiBjb21taXQoY29udGV4dCkge1xuICAgIGlmICghdGhpcy5fY3VycmVudFRhcmdldClcbiAgICAgICAgdGhpcy5zZXR1cChjb250ZXh0LmFsbG9jYXRvcik7XG4gICAgdmFyIHRhcmdldCA9IHRoaXMuX2N1cnJlbnRUYXJnZXQ7XG4gICAgdmFyIHNpemUgPSBjb250ZXh0LnNpemU7XG4gICAgaWYgKHRoaXMuX2NsYXNzZXNEaXJ0eSkge1xuICAgICAgICBfY2xlYW51cENsYXNzZXMuY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgICAgICB2YXIgY2xhc3NMaXN0ID0gdGhpcy5nZXRDbGFzc0xpc3QoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc0xpc3QubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChjbGFzc0xpc3RbaV0pO1xuICAgICAgICB0aGlzLl9jbGFzc2VzRGlydHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fdHJ1ZVNpemVDaGVjayA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0aGlzLl9zdHlsZXNEaXJ0eSkge1xuICAgICAgICBfYXBwbHlTdHlsZXMuY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgICAgICB0aGlzLl9zdHlsZXNEaXJ0eSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl90cnVlU2l6ZUNoZWNrID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2F0dHJpYnV0ZXNEaXJ0eSkge1xuICAgICAgICBfYXBwbHlBdHRyaWJ1dGVzLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgdGhpcy5fYXR0cmlidXRlc0RpcnR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3RydWVTaXplQ2hlY2sgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaXplKSB7XG4gICAgICAgIHZhciBvcmlnU2l6ZSA9IGNvbnRleHQuc2l6ZTtcbiAgICAgICAgc2l6ZSA9IFtcbiAgICAgICAgICAgIHRoaXMuc2l6ZVswXSxcbiAgICAgICAgICAgIHRoaXMuc2l6ZVsxXVxuICAgICAgICBdO1xuICAgICAgICBpZiAoc2l6ZVswXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgc2l6ZVswXSA9IG9yaWdTaXplWzBdO1xuICAgICAgICBpZiAoc2l6ZVsxXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgc2l6ZVsxXSA9IG9yaWdTaXplWzFdO1xuICAgICAgICBpZiAoc2l6ZVswXSA9PT0gdHJ1ZSB8fCBzaXplWzFdID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAoc2l6ZVswXSA9PT0gdHJ1ZSAmJiAodGhpcy5fdHJ1ZVNpemVDaGVjayB8fCB0aGlzLl9zaXplWzBdID09PSAwKSkge1xuICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IHRhcmdldC5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2l6ZSAmJiB0aGlzLl9zaXplWzBdICE9PSB3aWR0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaXplWzBdID0gd2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NpemVEaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNpemVbMF0gPSB3aWR0aDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NpemUpXG4gICAgICAgICAgICAgICAgICAgIHNpemVbMF0gPSB0aGlzLl9zaXplWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNpemVbMV0gPT09IHRydWUgJiYgKHRoaXMuX3RydWVTaXplQ2hlY2sgfHwgdGhpcy5fc2l6ZVsxXSA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0ID0gdGFyZ2V0Lm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2l6ZSAmJiB0aGlzLl9zaXplWzFdICE9PSBoZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2l6ZVsxXSA9IGhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2l6ZURpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2l6ZVsxXSA9IGhlaWdodDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NpemUpXG4gICAgICAgICAgICAgICAgICAgIHNpemVbMV0gPSB0aGlzLl9zaXplWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdHJ1ZVNpemVDaGVjayA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChfeHlOb3RFcXVhbHModGhpcy5fc2l6ZSwgc2l6ZSkpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9zaXplKVxuICAgICAgICAgICAgdGhpcy5fc2l6ZSA9IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF07XG4gICAgICAgIHRoaXMuX3NpemVbMF0gPSBzaXplWzBdO1xuICAgICAgICB0aGlzLl9zaXplWzFdID0gc2l6ZVsxXTtcbiAgICAgICAgdGhpcy5fc2l6ZURpcnR5ID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3NpemVEaXJ0eSkge1xuICAgICAgICBpZiAodGhpcy5fc2l6ZSkge1xuICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLndpZHRoID0gdGhpcy5zaXplICYmIHRoaXMuc2l6ZVswXSA9PT0gdHJ1ZSA/ICcnIDogdGhpcy5fc2l6ZVswXSArICdweCc7XG4gICAgICAgICAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gdGhpcy5zaXplICYmIHRoaXMuc2l6ZVsxXSA9PT0gdHJ1ZSA/ICcnIDogdGhpcy5fc2l6ZVsxXSArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgncmVzaXplJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9jb250ZW50RGlydHkpIHtcbiAgICAgICAgdGhpcy5kZXBsb3kodGFyZ2V0KTtcbiAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgnZGVwbG95Jyk7XG4gICAgICAgIHRoaXMuX2NvbnRlbnREaXJ0eSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl90cnVlU2l6ZUNoZWNrID0gdHJ1ZTtcbiAgICB9XG4gICAgRWxlbWVudE91dHB1dC5wcm90b3R5cGUuY29tbWl0LmNhbGwodGhpcywgY29udGV4dCk7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuY2xlYW51cCA9IGZ1bmN0aW9uIGNsZWFudXAoYWxsb2NhdG9yKSB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciB0YXJnZXQgPSB0aGlzLl9jdXJyZW50VGFyZ2V0O1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ3JlY2FsbCcpO1xuICAgIHRoaXMucmVjYWxsKHRhcmdldCk7XG4gICAgdGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgdGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAnJztcbiAgICB0YXJnZXQuc3R5bGUud2lkdGggPSAnJztcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gJyc7XG4gICAgX2NsZWFudXBTdHlsZXMuY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgIF9jbGVhbnVwQXR0cmlidXRlcy5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgdmFyIGNsYXNzTGlzdCA9IHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XG4gICAgX2NsZWFudXBDbGFzc2VzLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgY2xhc3NMaXN0Lmxlbmd0aDsgaSsrKVxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc0xpc3RbaV0pO1xuICAgIGlmICh0aGlzLmVsZW1lbnRDbGFzcykge1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50Q2xhc3MgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuZWxlbWVudENsYXNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5lbGVtZW50Q2xhc3NbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5lbGVtZW50Q2xhc3MpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuZGV0YWNoKHRhcmdldCk7XG4gICAgdGhpcy5fY3VycmVudFRhcmdldCA9IG51bGw7XG4gICAgYWxsb2NhdG9yLmRlYWxsb2NhdGUodGFyZ2V0KTtcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5kZXBsb3kgPSBmdW5jdGlvbiBkZXBsb3kodGFyZ2V0KSB7XG4gICAgdmFyIGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKTtcbiAgICBpZiAoY29udGVudCBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICAgICAgd2hpbGUgKHRhcmdldC5oYXNDaGlsZE5vZGVzKCkpXG4gICAgICAgICAgICB0YXJnZXQucmVtb3ZlQ2hpbGQodGFyZ2V0LmZpcnN0Q2hpbGQpO1xuICAgICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgfSBlbHNlXG4gICAgICAgIHRhcmdldC5pbm5lckhUTUwgPSBjb250ZW50O1xufTtcblN1cmZhY2UucHJvdG90eXBlLnJlY2FsbCA9IGZ1bmN0aW9uIHJlY2FsbCh0YXJnZXQpIHtcbiAgICB2YXIgZGYgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgd2hpbGUgKHRhcmdldC5oYXNDaGlsZE5vZGVzKCkpXG4gICAgICAgIGRmLmFwcGVuZENoaWxkKHRhcmdldC5maXJzdENoaWxkKTtcbiAgICB0aGlzLnNldENvbnRlbnQoZGYpO1xufTtcblN1cmZhY2UucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9zaXplID8gdGhpcy5fc2l6ZSA6IHRoaXMuc2l6ZTtcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24gc2V0U2l6ZShzaXplKSB7XG4gICAgdGhpcy5zaXplID0gc2l6ZSA/IFtcbiAgICAgICAgc2l6ZVswXSxcbiAgICAgICAgc2l6ZVsxXVxuICAgIF0gOiBudWxsO1xuICAgIHRoaXMuX3NpemVEaXJ0eSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTdXJmYWNlOyIsInZhciBUcmFuc2Zvcm0gPSB7fTtcblRyYW5zZm9ybS5wcmVjaXNpb24gPSAwLjAwMDAwMTtcblRyYW5zZm9ybS5pZGVudGl0eSA9IFtcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxXG5dO1xuVHJhbnNmb3JtLm11bHRpcGx5NHg0ID0gZnVuY3Rpb24gbXVsdGlwbHk0eDQoYSwgYikge1xuICAgIHJldHVybiBbXG4gICAgICAgIGFbMF0gKiBiWzBdICsgYVs0XSAqIGJbMV0gKyBhWzhdICogYlsyXSArIGFbMTJdICogYlszXSxcbiAgICAgICAgYVsxXSAqIGJbMF0gKyBhWzVdICogYlsxXSArIGFbOV0gKiBiWzJdICsgYVsxM10gKiBiWzNdLFxuICAgICAgICBhWzJdICogYlswXSArIGFbNl0gKiBiWzFdICsgYVsxMF0gKiBiWzJdICsgYVsxNF0gKiBiWzNdLFxuICAgICAgICBhWzNdICogYlswXSArIGFbN10gKiBiWzFdICsgYVsxMV0gKiBiWzJdICsgYVsxNV0gKiBiWzNdLFxuICAgICAgICBhWzBdICogYls0XSArIGFbNF0gKiBiWzVdICsgYVs4XSAqIGJbNl0gKyBhWzEyXSAqIGJbN10sXG4gICAgICAgIGFbMV0gKiBiWzRdICsgYVs1XSAqIGJbNV0gKyBhWzldICogYls2XSArIGFbMTNdICogYls3XSxcbiAgICAgICAgYVsyXSAqIGJbNF0gKyBhWzZdICogYls1XSArIGFbMTBdICogYls2XSArIGFbMTRdICogYls3XSxcbiAgICAgICAgYVszXSAqIGJbNF0gKyBhWzddICogYls1XSArIGFbMTFdICogYls2XSArIGFbMTVdICogYls3XSxcbiAgICAgICAgYVswXSAqIGJbOF0gKyBhWzRdICogYls5XSArIGFbOF0gKiBiWzEwXSArIGFbMTJdICogYlsxMV0sXG4gICAgICAgIGFbMV0gKiBiWzhdICsgYVs1XSAqIGJbOV0gKyBhWzldICogYlsxMF0gKyBhWzEzXSAqIGJbMTFdLFxuICAgICAgICBhWzJdICogYls4XSArIGFbNl0gKiBiWzldICsgYVsxMF0gKiBiWzEwXSArIGFbMTRdICogYlsxMV0sXG4gICAgICAgIGFbM10gKiBiWzhdICsgYVs3XSAqIGJbOV0gKyBhWzExXSAqIGJbMTBdICsgYVsxNV0gKiBiWzExXSxcbiAgICAgICAgYVswXSAqIGJbMTJdICsgYVs0XSAqIGJbMTNdICsgYVs4XSAqIGJbMTRdICsgYVsxMl0gKiBiWzE1XSxcbiAgICAgICAgYVsxXSAqIGJbMTJdICsgYVs1XSAqIGJbMTNdICsgYVs5XSAqIGJbMTRdICsgYVsxM10gKiBiWzE1XSxcbiAgICAgICAgYVsyXSAqIGJbMTJdICsgYVs2XSAqIGJbMTNdICsgYVsxMF0gKiBiWzE0XSArIGFbMTRdICogYlsxNV0sXG4gICAgICAgIGFbM10gKiBiWzEyXSArIGFbN10gKiBiWzEzXSArIGFbMTFdICogYlsxNF0gKyBhWzE1XSAqIGJbMTVdXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0ubXVsdGlwbHkgPSBmdW5jdGlvbiBtdWx0aXBseShhLCBiKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgYVswXSAqIGJbMF0gKyBhWzRdICogYlsxXSArIGFbOF0gKiBiWzJdLFxuICAgICAgICBhWzFdICogYlswXSArIGFbNV0gKiBiWzFdICsgYVs5XSAqIGJbMl0sXG4gICAgICAgIGFbMl0gKiBiWzBdICsgYVs2XSAqIGJbMV0gKyBhWzEwXSAqIGJbMl0sXG4gICAgICAgIDAsXG4gICAgICAgIGFbMF0gKiBiWzRdICsgYVs0XSAqIGJbNV0gKyBhWzhdICogYls2XSxcbiAgICAgICAgYVsxXSAqIGJbNF0gKyBhWzVdICogYls1XSArIGFbOV0gKiBiWzZdLFxuICAgICAgICBhWzJdICogYls0XSArIGFbNl0gKiBiWzVdICsgYVsxMF0gKiBiWzZdLFxuICAgICAgICAwLFxuICAgICAgICBhWzBdICogYls4XSArIGFbNF0gKiBiWzldICsgYVs4XSAqIGJbMTBdLFxuICAgICAgICBhWzFdICogYls4XSArIGFbNV0gKiBiWzldICsgYVs5XSAqIGJbMTBdLFxuICAgICAgICBhWzJdICogYls4XSArIGFbNl0gKiBiWzldICsgYVsxMF0gKiBiWzEwXSxcbiAgICAgICAgMCxcbiAgICAgICAgYVswXSAqIGJbMTJdICsgYVs0XSAqIGJbMTNdICsgYVs4XSAqIGJbMTRdICsgYVsxMl0sXG4gICAgICAgIGFbMV0gKiBiWzEyXSArIGFbNV0gKiBiWzEzXSArIGFbOV0gKiBiWzE0XSArIGFbMTNdLFxuICAgICAgICBhWzJdICogYlsxMl0gKyBhWzZdICogYlsxM10gKyBhWzEwXSAqIGJbMTRdICsgYVsxNF0sXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS50aGVuTW92ZSA9IGZ1bmN0aW9uIHRoZW5Nb3ZlKG0sIHQpIHtcbiAgICBpZiAoIXRbMl0pXG4gICAgICAgIHRbMl0gPSAwO1xuICAgIHJldHVybiBbXG4gICAgICAgIG1bMF0sXG4gICAgICAgIG1bMV0sXG4gICAgICAgIG1bMl0sXG4gICAgICAgIDAsXG4gICAgICAgIG1bNF0sXG4gICAgICAgIG1bNV0sXG4gICAgICAgIG1bNl0sXG4gICAgICAgIDAsXG4gICAgICAgIG1bOF0sXG4gICAgICAgIG1bOV0sXG4gICAgICAgIG1bMTBdLFxuICAgICAgICAwLFxuICAgICAgICBtWzEyXSArIHRbMF0sXG4gICAgICAgIG1bMTNdICsgdFsxXSxcbiAgICAgICAgbVsxNF0gKyB0WzJdLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0ubW92ZVRoZW4gPSBmdW5jdGlvbiBtb3ZlVGhlbih2LCBtKSB7XG4gICAgaWYgKCF2WzJdKVxuICAgICAgICB2WzJdID0gMDtcbiAgICB2YXIgdDAgPSB2WzBdICogbVswXSArIHZbMV0gKiBtWzRdICsgdlsyXSAqIG1bOF07XG4gICAgdmFyIHQxID0gdlswXSAqIG1bMV0gKyB2WzFdICogbVs1XSArIHZbMl0gKiBtWzldO1xuICAgIHZhciB0MiA9IHZbMF0gKiBtWzJdICsgdlsxXSAqIG1bNl0gKyB2WzJdICogbVsxMF07XG4gICAgcmV0dXJuIFRyYW5zZm9ybS50aGVuTW92ZShtLCBbXG4gICAgICAgIHQwLFxuICAgICAgICB0MSxcbiAgICAgICAgdDJcbiAgICBdKTtcbn07XG5UcmFuc2Zvcm0udHJhbnNsYXRlID0gZnVuY3Rpb24gdHJhbnNsYXRlKHgsIHksIHopIHtcbiAgICBpZiAoeiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB6ID0gMDtcbiAgICByZXR1cm4gW1xuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICB6LFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0udGhlblNjYWxlID0gZnVuY3Rpb24gdGhlblNjYWxlKG0sIHMpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBzWzBdICogbVswXSxcbiAgICAgICAgc1sxXSAqIG1bMV0sXG4gICAgICAgIHNbMl0gKiBtWzJdLFxuICAgICAgICAwLFxuICAgICAgICBzWzBdICogbVs0XSxcbiAgICAgICAgc1sxXSAqIG1bNV0sXG4gICAgICAgIHNbMl0gKiBtWzZdLFxuICAgICAgICAwLFxuICAgICAgICBzWzBdICogbVs4XSxcbiAgICAgICAgc1sxXSAqIG1bOV0sXG4gICAgICAgIHNbMl0gKiBtWzEwXSxcbiAgICAgICAgMCxcbiAgICAgICAgc1swXSAqIG1bMTJdLFxuICAgICAgICBzWzFdICogbVsxM10sXG4gICAgICAgIHNbMl0gKiBtWzE0XSxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnNjYWxlID0gZnVuY3Rpb24gc2NhbGUoeCwgeSwgeikge1xuICAgIGlmICh6ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHogPSAxO1xuICAgIGlmICh5ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHkgPSB4O1xuICAgIHJldHVybiBbXG4gICAgICAgIHgsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIHksXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIHosXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5yb3RhdGVYID0gZnVuY3Rpb24gcm90YXRlWCh0aGV0YSkge1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgY29zVGhldGEsXG4gICAgICAgIHNpblRoZXRhLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAtc2luVGhldGEsXG4gICAgICAgIGNvc1RoZXRhLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0ucm90YXRlWSA9IGZ1bmN0aW9uIHJvdGF0ZVkodGhldGEpIHtcbiAgICB2YXIgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIHJldHVybiBbXG4gICAgICAgIGNvc1RoZXRhLFxuICAgICAgICAwLFxuICAgICAgICAtc2luVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIHNpblRoZXRhLFxuICAgICAgICAwLFxuICAgICAgICBjb3NUaGV0YSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnJvdGF0ZVogPSBmdW5jdGlvbiByb3RhdGVaKHRoZXRhKSB7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICByZXR1cm4gW1xuICAgICAgICBjb3NUaGV0YSxcbiAgICAgICAgc2luVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIC1zaW5UaGV0YSxcbiAgICAgICAgY29zVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5yb3RhdGUgPSBmdW5jdGlvbiByb3RhdGUocGhpLCB0aGV0YSwgcHNpKSB7XG4gICAgdmFyIGNvc1BoaSA9IE1hdGguY29zKHBoaSk7XG4gICAgdmFyIHNpblBoaSA9IE1hdGguc2luKHBoaSk7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICB2YXIgY29zUHNpID0gTWF0aC5jb3MocHNpKTtcbiAgICB2YXIgc2luUHNpID0gTWF0aC5zaW4ocHNpKTtcbiAgICB2YXIgcmVzdWx0ID0gW1xuICAgICAgICAgICAgY29zVGhldGEgKiBjb3NQc2ksXG4gICAgICAgICAgICBjb3NQaGkgKiBzaW5Qc2kgKyBzaW5QaGkgKiBzaW5UaGV0YSAqIGNvc1BzaSxcbiAgICAgICAgICAgIHNpblBoaSAqIHNpblBzaSAtIGNvc1BoaSAqIHNpblRoZXRhICogY29zUHNpLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIC1jb3NUaGV0YSAqIHNpblBzaSxcbiAgICAgICAgICAgIGNvc1BoaSAqIGNvc1BzaSAtIHNpblBoaSAqIHNpblRoZXRhICogc2luUHNpLFxuICAgICAgICAgICAgc2luUGhpICogY29zUHNpICsgY29zUGhpICogc2luVGhldGEgKiBzaW5Qc2ksXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgc2luVGhldGEsXG4gICAgICAgICAgICAtc2luUGhpICogY29zVGhldGEsXG4gICAgICAgICAgICBjb3NQaGkgKiBjb3NUaGV0YSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAxXG4gICAgICAgIF07XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5UcmFuc2Zvcm0ucm90YXRlQXhpcyA9IGZ1bmN0aW9uIHJvdGF0ZUF4aXModiwgdGhldGEpIHtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciB2ZXJUaGV0YSA9IDEgLSBjb3NUaGV0YTtcbiAgICB2YXIgeHhWID0gdlswXSAqIHZbMF0gKiB2ZXJUaGV0YTtcbiAgICB2YXIgeHlWID0gdlswXSAqIHZbMV0gKiB2ZXJUaGV0YTtcbiAgICB2YXIgeHpWID0gdlswXSAqIHZbMl0gKiB2ZXJUaGV0YTtcbiAgICB2YXIgeXlWID0gdlsxXSAqIHZbMV0gKiB2ZXJUaGV0YTtcbiAgICB2YXIgeXpWID0gdlsxXSAqIHZbMl0gKiB2ZXJUaGV0YTtcbiAgICB2YXIgenpWID0gdlsyXSAqIHZbMl0gKiB2ZXJUaGV0YTtcbiAgICB2YXIgeHMgPSB2WzBdICogc2luVGhldGE7XG4gICAgdmFyIHlzID0gdlsxXSAqIHNpblRoZXRhO1xuICAgIHZhciB6cyA9IHZbMl0gKiBzaW5UaGV0YTtcbiAgICB2YXIgcmVzdWx0ID0gW1xuICAgICAgICAgICAgeHhWICsgY29zVGhldGEsXG4gICAgICAgICAgICB4eVYgKyB6cyxcbiAgICAgICAgICAgIHh6ViAtIHlzLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHh5ViAtIHpzLFxuICAgICAgICAgICAgeXlWICsgY29zVGhldGEsXG4gICAgICAgICAgICB5elYgKyB4cyxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB4elYgKyB5cyxcbiAgICAgICAgICAgIHl6ViAtIHhzLFxuICAgICAgICAgICAgenpWICsgY29zVGhldGEsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMVxuICAgICAgICBdO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuVHJhbnNmb3JtLmFib3V0T3JpZ2luID0gZnVuY3Rpb24gYWJvdXRPcmlnaW4odiwgbSkge1xuICAgIHZhciB0MCA9IHZbMF0gLSAodlswXSAqIG1bMF0gKyB2WzFdICogbVs0XSArIHZbMl0gKiBtWzhdKTtcbiAgICB2YXIgdDEgPSB2WzFdIC0gKHZbMF0gKiBtWzFdICsgdlsxXSAqIG1bNV0gKyB2WzJdICogbVs5XSk7XG4gICAgdmFyIHQyID0gdlsyXSAtICh2WzBdICogbVsyXSArIHZbMV0gKiBtWzZdICsgdlsyXSAqIG1bMTBdKTtcbiAgICByZXR1cm4gVHJhbnNmb3JtLnRoZW5Nb3ZlKG0sIFtcbiAgICAgICAgdDAsXG4gICAgICAgIHQxLFxuICAgICAgICB0MlxuICAgIF0pO1xufTtcblRyYW5zZm9ybS5za2V3ID0gZnVuY3Rpb24gc2tldyhwaGksIHRoZXRhLCBwc2kpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICAxLFxuICAgICAgICBNYXRoLnRhbih0aGV0YSksXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIE1hdGgudGFuKHBzaSksXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIE1hdGgudGFuKHBoaSksXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5za2V3WCA9IGZ1bmN0aW9uIHNrZXdYKGFuZ2xlKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgTWF0aC50YW4oYW5nbGUpLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0uc2tld1kgPSBmdW5jdGlvbiBza2V3WShhbmdsZSkge1xuICAgIHJldHVybiBbXG4gICAgICAgIDEsXG4gICAgICAgIE1hdGgudGFuKGFuZ2xlKSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnBlcnNwZWN0aXZlID0gZnVuY3Rpb24gcGVyc3BlY3RpdmUoZm9jdXNaKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgLTEgLyBmb2N1c1osXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5nZXRUcmFuc2xhdGUgPSBmdW5jdGlvbiBnZXRUcmFuc2xhdGUobSkge1xuICAgIHJldHVybiBbXG4gICAgICAgIG1bMTJdLFxuICAgICAgICBtWzEzXSxcbiAgICAgICAgbVsxNF1cbiAgICBdO1xufTtcblRyYW5zZm9ybS5pbnZlcnNlID0gZnVuY3Rpb24gaW52ZXJzZShtKSB7XG4gICAgdmFyIGMwID0gbVs1XSAqIG1bMTBdIC0gbVs2XSAqIG1bOV07XG4gICAgdmFyIGMxID0gbVs0XSAqIG1bMTBdIC0gbVs2XSAqIG1bOF07XG4gICAgdmFyIGMyID0gbVs0XSAqIG1bOV0gLSBtWzVdICogbVs4XTtcbiAgICB2YXIgYzQgPSBtWzFdICogbVsxMF0gLSBtWzJdICogbVs5XTtcbiAgICB2YXIgYzUgPSBtWzBdICogbVsxMF0gLSBtWzJdICogbVs4XTtcbiAgICB2YXIgYzYgPSBtWzBdICogbVs5XSAtIG1bMV0gKiBtWzhdO1xuICAgIHZhciBjOCA9IG1bMV0gKiBtWzZdIC0gbVsyXSAqIG1bNV07XG4gICAgdmFyIGM5ID0gbVswXSAqIG1bNl0gLSBtWzJdICogbVs0XTtcbiAgICB2YXIgYzEwID0gbVswXSAqIG1bNV0gLSBtWzFdICogbVs0XTtcbiAgICB2YXIgZGV0TSA9IG1bMF0gKiBjMCAtIG1bMV0gKiBjMSArIG1bMl0gKiBjMjtcbiAgICB2YXIgaW52RCA9IDEgLyBkZXRNO1xuICAgIHZhciByZXN1bHQgPSBbXG4gICAgICAgICAgICBpbnZEICogYzAsXG4gICAgICAgICAgICAtaW52RCAqIGM0LFxuICAgICAgICAgICAgaW52RCAqIGM4LFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIC1pbnZEICogYzEsXG4gICAgICAgICAgICBpbnZEICogYzUsXG4gICAgICAgICAgICAtaW52RCAqIGM5LFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIGludkQgKiBjMixcbiAgICAgICAgICAgIC1pbnZEICogYzYsXG4gICAgICAgICAgICBpbnZEICogYzEwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDFcbiAgICAgICAgXTtcbiAgICByZXN1bHRbMTJdID0gLW1bMTJdICogcmVzdWx0WzBdIC0gbVsxM10gKiByZXN1bHRbNF0gLSBtWzE0XSAqIHJlc3VsdFs4XTtcbiAgICByZXN1bHRbMTNdID0gLW1bMTJdICogcmVzdWx0WzFdIC0gbVsxM10gKiByZXN1bHRbNV0gLSBtWzE0XSAqIHJlc3VsdFs5XTtcbiAgICByZXN1bHRbMTRdID0gLW1bMTJdICogcmVzdWx0WzJdIC0gbVsxM10gKiByZXN1bHRbNl0gLSBtWzE0XSAqIHJlc3VsdFsxMF07XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5UcmFuc2Zvcm0udHJhbnNwb3NlID0gZnVuY3Rpb24gdHJhbnNwb3NlKG0pIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBtWzBdLFxuICAgICAgICBtWzRdLFxuICAgICAgICBtWzhdLFxuICAgICAgICBtWzEyXSxcbiAgICAgICAgbVsxXSxcbiAgICAgICAgbVs1XSxcbiAgICAgICAgbVs5XSxcbiAgICAgICAgbVsxM10sXG4gICAgICAgIG1bMl0sXG4gICAgICAgIG1bNl0sXG4gICAgICAgIG1bMTBdLFxuICAgICAgICBtWzE0XSxcbiAgICAgICAgbVszXSxcbiAgICAgICAgbVs3XSxcbiAgICAgICAgbVsxMV0sXG4gICAgICAgIG1bMTVdXG4gICAgXTtcbn07XG5mdW5jdGlvbiBfbm9ybVNxdWFyZWQodikge1xuICAgIHJldHVybiB2Lmxlbmd0aCA9PT0gMiA/IHZbMF0gKiB2WzBdICsgdlsxXSAqIHZbMV0gOiB2WzBdICogdlswXSArIHZbMV0gKiB2WzFdICsgdlsyXSAqIHZbMl07XG59XG5mdW5jdGlvbiBfbm9ybSh2KSB7XG4gICAgcmV0dXJuIE1hdGguc3FydChfbm9ybVNxdWFyZWQodikpO1xufVxuZnVuY3Rpb24gX3NpZ24obikge1xuICAgIHJldHVybiBuIDwgMCA/IC0xIDogMTtcbn1cblRyYW5zZm9ybS5pbnRlcnByZXQgPSBmdW5jdGlvbiBpbnRlcnByZXQoTSkge1xuICAgIHZhciB4ID0gW1xuICAgICAgICAgICAgTVswXSxcbiAgICAgICAgICAgIE1bMV0sXG4gICAgICAgICAgICBNWzJdXG4gICAgICAgIF07XG4gICAgdmFyIHNnbiA9IF9zaWduKHhbMF0pO1xuICAgIHZhciB4Tm9ybSA9IF9ub3JtKHgpO1xuICAgIHZhciB2ID0gW1xuICAgICAgICAgICAgeFswXSArIHNnbiAqIHhOb3JtLFxuICAgICAgICAgICAgeFsxXSxcbiAgICAgICAgICAgIHhbMl1cbiAgICAgICAgXTtcbiAgICB2YXIgbXVsdCA9IDIgLyBfbm9ybVNxdWFyZWQodik7XG4gICAgaWYgKG11bHQgPj0gSW5maW5pdHkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogVHJhbnNmb3JtLmdldFRyYW5zbGF0ZShNKSxcbiAgICAgICAgICAgIHJvdGF0ZTogW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2NhbGU6IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHNrZXc6IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cbiAgICB2YXIgUTEgPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAxXG4gICAgICAgIF07XG4gICAgUTFbMF0gPSAxIC0gbXVsdCAqIHZbMF0gKiB2WzBdO1xuICAgIFExWzVdID0gMSAtIG11bHQgKiB2WzFdICogdlsxXTtcbiAgICBRMVsxMF0gPSAxIC0gbXVsdCAqIHZbMl0gKiB2WzJdO1xuICAgIFExWzFdID0gLW11bHQgKiB2WzBdICogdlsxXTtcbiAgICBRMVsyXSA9IC1tdWx0ICogdlswXSAqIHZbMl07XG4gICAgUTFbNl0gPSAtbXVsdCAqIHZbMV0gKiB2WzJdO1xuICAgIFExWzRdID0gUTFbMV07XG4gICAgUTFbOF0gPSBRMVsyXTtcbiAgICBRMVs5XSA9IFExWzZdO1xuICAgIHZhciBNUTEgPSBUcmFuc2Zvcm0ubXVsdGlwbHkoUTEsIE0pO1xuICAgIHZhciB4MiA9IFtcbiAgICAgICAgICAgIE1RMVs1XSxcbiAgICAgICAgICAgIE1RMVs2XVxuICAgICAgICBdO1xuICAgIHZhciBzZ24yID0gX3NpZ24oeDJbMF0pO1xuICAgIHZhciB4Mk5vcm0gPSBfbm9ybSh4Mik7XG4gICAgdmFyIHYyID0gW1xuICAgICAgICAgICAgeDJbMF0gKyBzZ24yICogeDJOb3JtLFxuICAgICAgICAgICAgeDJbMV1cbiAgICAgICAgXTtcbiAgICB2YXIgbXVsdDIgPSAyIC8gX25vcm1TcXVhcmVkKHYyKTtcbiAgICB2YXIgUTIgPSBbXG4gICAgICAgICAgICAxLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAxXG4gICAgICAgIF07XG4gICAgUTJbNV0gPSAxIC0gbXVsdDIgKiB2MlswXSAqIHYyWzBdO1xuICAgIFEyWzEwXSA9IDEgLSBtdWx0MiAqIHYyWzFdICogdjJbMV07XG4gICAgUTJbNl0gPSAtbXVsdDIgKiB2MlswXSAqIHYyWzFdO1xuICAgIFEyWzldID0gUTJbNl07XG4gICAgdmFyIFEgPSBUcmFuc2Zvcm0ubXVsdGlwbHkoUTIsIFExKTtcbiAgICB2YXIgUiA9IFRyYW5zZm9ybS5tdWx0aXBseShRLCBNKTtcbiAgICB2YXIgcmVtb3ZlciA9IFRyYW5zZm9ybS5zY2FsZShSWzBdIDwgMCA/IC0xIDogMSwgUls1XSA8IDAgPyAtMSA6IDEsIFJbMTBdIDwgMCA/IC0xIDogMSk7XG4gICAgUiA9IFRyYW5zZm9ybS5tdWx0aXBseShSLCByZW1vdmVyKTtcbiAgICBRID0gVHJhbnNmb3JtLm11bHRpcGx5KHJlbW92ZXIsIFEpO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICByZXN1bHQudHJhbnNsYXRlID0gVHJhbnNmb3JtLmdldFRyYW5zbGF0ZShNKTtcbiAgICByZXN1bHQucm90YXRlID0gW1xuICAgICAgICBNYXRoLmF0YW4yKC1RWzZdLCBRWzEwXSksXG4gICAgICAgIE1hdGguYXNpbihRWzJdKSxcbiAgICAgICAgTWF0aC5hdGFuMigtUVsxXSwgUVswXSlcbiAgICBdO1xuICAgIGlmICghcmVzdWx0LnJvdGF0ZVswXSkge1xuICAgICAgICByZXN1bHQucm90YXRlWzBdID0gMDtcbiAgICAgICAgcmVzdWx0LnJvdGF0ZVsyXSA9IE1hdGguYXRhbjIoUVs0XSwgUVs1XSk7XG4gICAgfVxuICAgIHJlc3VsdC5zY2FsZSA9IFtcbiAgICAgICAgUlswXSxcbiAgICAgICAgUls1XSxcbiAgICAgICAgUlsxMF1cbiAgICBdO1xuICAgIHJlc3VsdC5za2V3ID0gW1xuICAgICAgICBNYXRoLmF0YW4yKFJbOV0sIHJlc3VsdC5zY2FsZVsyXSksXG4gICAgICAgIE1hdGguYXRhbjIoUls4XSwgcmVzdWx0LnNjYWxlWzJdKSxcbiAgICAgICAgTWF0aC5hdGFuMihSWzRdLCByZXN1bHQuc2NhbGVbMF0pXG4gICAgXTtcbiAgICBpZiAoTWF0aC5hYnMocmVzdWx0LnJvdGF0ZVswXSkgKyBNYXRoLmFicyhyZXN1bHQucm90YXRlWzJdKSA+IDEuNSAqIE1hdGguUEkpIHtcbiAgICAgICAgcmVzdWx0LnJvdGF0ZVsxXSA9IE1hdGguUEkgLSByZXN1bHQucm90YXRlWzFdO1xuICAgICAgICBpZiAocmVzdWx0LnJvdGF0ZVsxXSA+IE1hdGguUEkpXG4gICAgICAgICAgICByZXN1bHQucm90YXRlWzFdIC09IDIgKiBNYXRoLlBJO1xuICAgICAgICBpZiAocmVzdWx0LnJvdGF0ZVsxXSA8IC1NYXRoLlBJKVxuICAgICAgICAgICAgcmVzdWx0LnJvdGF0ZVsxXSArPSAyICogTWF0aC5QSTtcbiAgICAgICAgaWYgKHJlc3VsdC5yb3RhdGVbMF0gPCAwKVxuICAgICAgICAgICAgcmVzdWx0LnJvdGF0ZVswXSArPSBNYXRoLlBJO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXN1bHQucm90YXRlWzBdIC09IE1hdGguUEk7XG4gICAgICAgIGlmIChyZXN1bHQucm90YXRlWzJdIDwgMClcbiAgICAgICAgICAgIHJlc3VsdC5yb3RhdGVbMl0gKz0gTWF0aC5QSTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmVzdWx0LnJvdGF0ZVsyXSAtPSBNYXRoLlBJO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblRyYW5zZm9ybS5hdmVyYWdlID0gZnVuY3Rpb24gYXZlcmFnZShNMSwgTTIsIHQpIHtcbiAgICB0ID0gdCA9PT0gdW5kZWZpbmVkID8gMC41IDogdDtcbiAgICB2YXIgc3BlY00xID0gVHJhbnNmb3JtLmludGVycHJldChNMSk7XG4gICAgdmFyIHNwZWNNMiA9IFRyYW5zZm9ybS5pbnRlcnByZXQoTTIpO1xuICAgIHZhciBzcGVjQXZnID0ge1xuICAgICAgICAgICAgdHJhbnNsYXRlOiBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByb3RhdGU6IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHNjYWxlOiBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBza2V3OiBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBzcGVjQXZnLnRyYW5zbGF0ZVtpXSA9ICgxIC0gdCkgKiBzcGVjTTEudHJhbnNsYXRlW2ldICsgdCAqIHNwZWNNMi50cmFuc2xhdGVbaV07XG4gICAgICAgIHNwZWNBdmcucm90YXRlW2ldID0gKDEgLSB0KSAqIHNwZWNNMS5yb3RhdGVbaV0gKyB0ICogc3BlY00yLnJvdGF0ZVtpXTtcbiAgICAgICAgc3BlY0F2Zy5zY2FsZVtpXSA9ICgxIC0gdCkgKiBzcGVjTTEuc2NhbGVbaV0gKyB0ICogc3BlY00yLnNjYWxlW2ldO1xuICAgICAgICBzcGVjQXZnLnNrZXdbaV0gPSAoMSAtIHQpICogc3BlY00xLnNrZXdbaV0gKyB0ICogc3BlY00yLnNrZXdbaV07XG4gICAgfVxuICAgIHJldHVybiBUcmFuc2Zvcm0uYnVpbGQoc3BlY0F2Zyk7XG59O1xuVHJhbnNmb3JtLmJ1aWxkID0gZnVuY3Rpb24gYnVpbGQoc3BlYykge1xuICAgIHZhciBzY2FsZU1hdHJpeCA9IFRyYW5zZm9ybS5zY2FsZShzcGVjLnNjYWxlWzBdLCBzcGVjLnNjYWxlWzFdLCBzcGVjLnNjYWxlWzJdKTtcbiAgICB2YXIgc2tld01hdHJpeCA9IFRyYW5zZm9ybS5za2V3KHNwZWMuc2tld1swXSwgc3BlYy5za2V3WzFdLCBzcGVjLnNrZXdbMl0pO1xuICAgIHZhciByb3RhdGVNYXRyaXggPSBUcmFuc2Zvcm0ucm90YXRlKHNwZWMucm90YXRlWzBdLCBzcGVjLnJvdGF0ZVsxXSwgc3BlYy5yb3RhdGVbMl0pO1xuICAgIHJldHVybiBUcmFuc2Zvcm0udGhlbk1vdmUoVHJhbnNmb3JtLm11bHRpcGx5KFRyYW5zZm9ybS5tdWx0aXBseShyb3RhdGVNYXRyaXgsIHNrZXdNYXRyaXgpLCBzY2FsZU1hdHJpeCksIHNwZWMudHJhbnNsYXRlKTtcbn07XG5UcmFuc2Zvcm0uZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzKGEsIGIpIHtcbiAgICByZXR1cm4gIVRyYW5zZm9ybS5ub3RFcXVhbHMoYSwgYik7XG59O1xuVHJhbnNmb3JtLm5vdEVxdWFscyA9IGZ1bmN0aW9uIG5vdEVxdWFscyhhLCBiKSB7XG4gICAgaWYgKGEgPT09IGIpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gIShhICYmIGIpIHx8IGFbMTJdICE9PSBiWzEyXSB8fCBhWzEzXSAhPT0gYlsxM10gfHwgYVsxNF0gIT09IGJbMTRdIHx8IGFbMF0gIT09IGJbMF0gfHwgYVsxXSAhPT0gYlsxXSB8fCBhWzJdICE9PSBiWzJdIHx8IGFbNF0gIT09IGJbNF0gfHwgYVs1XSAhPT0gYls1XSB8fCBhWzZdICE9PSBiWzZdIHx8IGFbOF0gIT09IGJbOF0gfHwgYVs5XSAhPT0gYls5XSB8fCBhWzEwXSAhPT0gYlsxMF07XG59O1xuVHJhbnNmb3JtLm5vcm1hbGl6ZVJvdGF0aW9uID0gZnVuY3Rpb24gbm9ybWFsaXplUm90YXRpb24ocm90YXRpb24pIHtcbiAgICB2YXIgcmVzdWx0ID0gcm90YXRpb24uc2xpY2UoMCk7XG4gICAgaWYgKHJlc3VsdFswXSA9PT0gTWF0aC5QSSAqIDAuNSB8fCByZXN1bHRbMF0gPT09IC1NYXRoLlBJICogMC41KSB7XG4gICAgICAgIHJlc3VsdFswXSA9IC1yZXN1bHRbMF07XG4gICAgICAgIHJlc3VsdFsxXSA9IE1hdGguUEkgLSByZXN1bHRbMV07XG4gICAgICAgIHJlc3VsdFsyXSAtPSBNYXRoLlBJO1xuICAgIH1cbiAgICBpZiAocmVzdWx0WzBdID4gTWF0aC5QSSAqIDAuNSkge1xuICAgICAgICByZXN1bHRbMF0gPSByZXN1bHRbMF0gLSBNYXRoLlBJO1xuICAgICAgICByZXN1bHRbMV0gPSBNYXRoLlBJIC0gcmVzdWx0WzFdO1xuICAgICAgICByZXN1bHRbMl0gLT0gTWF0aC5QSTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdFswXSA8IC1NYXRoLlBJICogMC41KSB7XG4gICAgICAgIHJlc3VsdFswXSA9IHJlc3VsdFswXSArIE1hdGguUEk7XG4gICAgICAgIHJlc3VsdFsxXSA9IC1NYXRoLlBJIC0gcmVzdWx0WzFdO1xuICAgICAgICByZXN1bHRbMl0gLT0gTWF0aC5QSTtcbiAgICB9XG4gICAgd2hpbGUgKHJlc3VsdFsxXSA8IC1NYXRoLlBJKVxuICAgICAgICByZXN1bHRbMV0gKz0gMiAqIE1hdGguUEk7XG4gICAgd2hpbGUgKHJlc3VsdFsxXSA+PSBNYXRoLlBJKVxuICAgICAgICByZXN1bHRbMV0gLT0gMiAqIE1hdGguUEk7XG4gICAgd2hpbGUgKHJlc3VsdFsyXSA8IC1NYXRoLlBJKVxuICAgICAgICByZXN1bHRbMl0gKz0gMiAqIE1hdGguUEk7XG4gICAgd2hpbGUgKHJlc3VsdFsyXSA+PSBNYXRoLlBJKVxuICAgICAgICByZXN1bHRbMl0gLT0gMiAqIE1hdGguUEk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5UcmFuc2Zvcm0uaW5Gcm9udCA9IFtcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMC4wMDEsXG4gICAgMVxuXTtcblRyYW5zZm9ybS5iZWhpbmQgPSBbXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIC0wLjAwMSxcbiAgICAxXG5dO1xubW9kdWxlLmV4cG9ydHMgPSBUcmFuc2Zvcm07IiwidmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4vRXZlbnRIYW5kbGVyJyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCcuL09wdGlvbnNNYW5hZ2VyJyk7XG52YXIgUmVuZGVyTm9kZSA9IHJlcXVpcmUoJy4vUmVuZGVyTm9kZScpO1xudmFyIFV0aWxpdHkgPSByZXF1aXJlKCcuLi91dGlsaXRpZXMvVXRpbGl0eScpO1xuZnVuY3Rpb24gVmlldyhvcHRpb25zKSB7XG4gICAgdGhpcy5fbm9kZSA9IG5ldyBSZW5kZXJOb2RlKCk7XG4gICAgdGhpcy5fZXZlbnRJbnB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0SW5wdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50SW5wdXQpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50T3V0cHV0KTtcbiAgICB0aGlzLm9wdGlvbnMgPSBVdGlsaXR5LmNsb25lKHRoaXMuY29uc3RydWN0b3IuREVGQVVMVF9PUFRJT05TIHx8IFZpZXcuREVGQVVMVF9PUFRJT05TKTtcbiAgICB0aGlzLl9vcHRpb25zTWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcih0aGlzLm9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG59XG5WaWV3LkRFRkFVTFRfT1BUSU9OUyA9IHt9O1xuVmlldy5wcm90b3R5cGUuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uIGdldE9wdGlvbnMoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnNNYW5hZ2VyLmdldE9wdGlvbnMoa2V5KTtcbn07XG5WaWV3LnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgdGhpcy5fb3B0aW9uc01hbmFnZXIucGF0Y2gob3B0aW9ucyk7XG59O1xuVmlldy5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkKCkge1xuICAgIHJldHVybiB0aGlzLl9ub2RlLmFkZC5hcHBseSh0aGlzLl9ub2RlLCBhcmd1bWVudHMpO1xufTtcblZpZXcucHJvdG90eXBlLl9hZGQgPSBWaWV3LnByb3RvdHlwZS5hZGQ7XG5WaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGUucmVuZGVyKCk7XG59O1xuVmlldy5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgaWYgKHRoaXMuX25vZGUgJiYgdGhpcy5fbm9kZS5nZXRTaXplKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ub2RlLmdldFNpemUuYXBwbHkodGhpcy5fbm9kZSwgYXJndW1lbnRzKSB8fCB0aGlzLm9wdGlvbnMuc2l6ZTtcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zaXplO1xufTtcbm1vZHVsZS5leHBvcnRzID0gVmlldzsiLCJmdW5jdGlvbiBWaWV3U2VxdWVuY2Uob3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucylcbiAgICAgICAgb3B0aW9ucyA9IFtdO1xuICAgIGlmIChvcHRpb25zIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgIG9wdGlvbnMgPSB7IGFycmF5OiBvcHRpb25zIH07XG4gICAgdGhpcy5fID0gbnVsbDtcbiAgICB0aGlzLmluZGV4ID0gb3B0aW9ucy5pbmRleCB8fCAwO1xuICAgIGlmIChvcHRpb25zLmFycmF5KVxuICAgICAgICB0aGlzLl8gPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvci5CYWNraW5nKG9wdGlvbnMuYXJyYXkpO1xuICAgIGVsc2UgaWYgKG9wdGlvbnMuXylcbiAgICAgICAgdGhpcy5fID0gb3B0aW9ucy5fO1xuICAgIGlmICh0aGlzLmluZGV4ID09PSB0aGlzLl8uZmlyc3RJbmRleClcbiAgICAgICAgdGhpcy5fLmZpcnN0Tm9kZSA9IHRoaXM7XG4gICAgaWYgKHRoaXMuaW5kZXggPT09IHRoaXMuXy5maXJzdEluZGV4ICsgdGhpcy5fLmFycmF5Lmxlbmd0aCAtIDEpXG4gICAgICAgIHRoaXMuXy5sYXN0Tm9kZSA9IHRoaXM7XG4gICAgaWYgKG9wdGlvbnMubG9vcCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLl8ubG9vcCA9IG9wdGlvbnMubG9vcDtcbiAgICBpZiAob3B0aW9ucy50cmFja1NpemUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5fLnRyYWNrU2l6ZSA9IG9wdGlvbnMudHJhY2tTaXplO1xuICAgIHRoaXMuX3ByZXZpb3VzTm9kZSA9IG51bGw7XG4gICAgdGhpcy5fbmV4dE5vZGUgPSBudWxsO1xufVxuVmlld1NlcXVlbmNlLkJhY2tpbmcgPSBmdW5jdGlvbiBCYWNraW5nKGFycmF5KSB7XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xuICAgIHRoaXMuZmlyc3RJbmRleCA9IDA7XG4gICAgdGhpcy5sb29wID0gZmFsc2U7XG4gICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xuICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xuICAgIHRoaXMuY3VtdWxhdGl2ZVNpemVzID0gW1tcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF1dO1xuICAgIHRoaXMuc2l6ZURpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLnRyYWNrU2l6ZSA9IGZhbHNlO1xufTtcblZpZXdTZXF1ZW5jZS5CYWNraW5nLnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uIGdldFZhbHVlKGkpIHtcbiAgICB2YXIgX2kgPSBpIC0gdGhpcy5maXJzdEluZGV4O1xuICAgIGlmIChfaSA8IDAgfHwgX2kgPj0gdGhpcy5hcnJheS5sZW5ndGgpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIHJldHVybiB0aGlzLmFycmF5W19pXTtcbn07XG5WaWV3U2VxdWVuY2UuQmFja2luZy5wcm90b3R5cGUuc2V0VmFsdWUgPSBmdW5jdGlvbiBzZXRWYWx1ZShpLCB2YWx1ZSkge1xuICAgIHRoaXMuYXJyYXlbaSAtIHRoaXMuZmlyc3RJbmRleF0gPSB2YWx1ZTtcbn07XG5WaWV3U2VxdWVuY2UuQmFja2luZy5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoaW5kZXgpIHtcbiAgICByZXR1cm4gdGhpcy5jdW11bGF0aXZlU2l6ZXNbaW5kZXhdO1xufTtcblZpZXdTZXF1ZW5jZS5CYWNraW5nLnByb3RvdHlwZS5jYWxjdWxhdGVTaXplID0gZnVuY3Rpb24gY2FsY3VsYXRlU2l6ZShpbmRleCkge1xuICAgIGluZGV4ID0gaW5kZXggfHwgdGhpcy5hcnJheS5sZW5ndGg7XG4gICAgdmFyIHNpemUgPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kZXg7IGkrKykge1xuICAgICAgICB2YXIgbm9kZVNpemUgPSB0aGlzLmFycmF5W2ldLmdldFNpemUoKTtcbiAgICAgICAgaWYgKCFub2RlU2l6ZSlcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChzaXplWzBdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChub2RlU2l6ZVswXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHNpemVbMF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgc2l6ZVswXSArPSBub2RlU2l6ZVswXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2l6ZVsxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAobm9kZVNpemVbMV0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBzaXplWzFdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHNpemVbMV0gKz0gbm9kZVNpemVbMV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdW11bGF0aXZlU2l6ZXNbaSArIDFdID0gc2l6ZS5zbGljZSgpO1xuICAgIH1cbiAgICB0aGlzLnNpemVEaXJ0eSA9IGZhbHNlO1xuICAgIHJldHVybiBzaXplO1xufTtcblZpZXdTZXF1ZW5jZS5CYWNraW5nLnByb3RvdHlwZS5yZWluZGV4ID0gZnVuY3Rpb24gcmVpbmRleChzdGFydCwgcmVtb3ZlQ291bnQsIGluc2VydENvdW50KSB7XG4gICAgaWYgKCF0aGlzLmFycmF5WzBdKVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBpbmRleCA9IHRoaXMuZmlyc3RJbmRleDtcbiAgICB2YXIgaW5kZXhTaGlmdEFtb3VudCA9IGluc2VydENvdW50IC0gcmVtb3ZlQ291bnQ7XG4gICAgdmFyIG5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICB3aGlsZSAoaW5kZXggPCBzdGFydCAtIDEpIHtcbiAgICAgICAgbm9kZSA9IG5vZGUuZ2V0TmV4dCgpO1xuICAgICAgICBpbmRleCsrO1xuICAgIH1cbiAgICB2YXIgc3BsaWNlU3RhcnROb2RlID0gbm9kZTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgcmVtb3ZlQ291bnQ7IGkrKykge1xuICAgICAgICBub2RlID0gbm9kZS5nZXROZXh0KCk7XG4gICAgICAgIGlmIChub2RlKVxuICAgICAgICAgICAgbm9kZS5fcHJldmlvdXNOb2RlID0gc3BsaWNlU3RhcnROb2RlO1xuICAgIH1cbiAgICB2YXIgc3BsaWNlUmVzdW1lTm9kZSA9IG5vZGUgPyBub2RlLmdldE5leHQoKSA6IG51bGw7XG4gICAgc3BsaWNlU3RhcnROb2RlLl9uZXh0Tm9kZSA9IG51bGw7XG4gICAgbm9kZSA9IHNwbGljZVN0YXJ0Tm9kZTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgaW5zZXJ0Q291bnQ7IGkrKylcbiAgICAgICAgbm9kZSA9IG5vZGUuZ2V0TmV4dCgpO1xuICAgIGluZGV4ICs9IGluc2VydENvdW50O1xuICAgIGlmIChub2RlICE9PSBzcGxpY2VSZXN1bWVOb2RlKSB7XG4gICAgICAgIG5vZGUuX25leHROb2RlID0gc3BsaWNlUmVzdW1lTm9kZTtcbiAgICAgICAgaWYgKHNwbGljZVJlc3VtZU5vZGUpXG4gICAgICAgICAgICBzcGxpY2VSZXN1bWVOb2RlLl9wcmV2aW91c05vZGUgPSBub2RlO1xuICAgIH1cbiAgICBpZiAoc3BsaWNlUmVzdW1lTm9kZSkge1xuICAgICAgICBub2RlID0gc3BsaWNlUmVzdW1lTm9kZTtcbiAgICAgICAgaW5kZXgrKztcbiAgICAgICAgd2hpbGUgKG5vZGUgJiYgaW5kZXggPCB0aGlzLmFycmF5Lmxlbmd0aCArIHRoaXMuZmlyc3RJbmRleCkge1xuICAgICAgICAgICAgaWYgKG5vZGUuX25leHROb2RlKVxuICAgICAgICAgICAgICAgIG5vZGUuaW5kZXggKz0gaW5kZXhTaGlmdEFtb3VudDtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBub2RlLmluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICBub2RlID0gbm9kZS5nZXROZXh0KCk7XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnRyYWNrU2l6ZSlcbiAgICAgICAgdGhpcy5zaXplRGlydHkgPSB0cnVlO1xufTtcblZpZXdTZXF1ZW5jZS5wcm90b3R5cGUuZ2V0UHJldmlvdXMgPSBmdW5jdGlvbiBnZXRQcmV2aW91cygpIHtcbiAgICB2YXIgbGVuID0gdGhpcy5fLmFycmF5Lmxlbmd0aDtcbiAgICBpZiAoIWxlbikge1xuICAgICAgICB0aGlzLl9wcmV2aW91c05vZGUgPSBudWxsO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pbmRleCA9PT0gdGhpcy5fLmZpcnN0SW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuXy5sb29wKSB7XG4gICAgICAgICAgICB0aGlzLl9wcmV2aW91c05vZGUgPSB0aGlzLl8ubGFzdE5vZGUgfHwgbmV3IHRoaXMuY29uc3RydWN0b3Ioe1xuICAgICAgICAgICAgICAgIF86IHRoaXMuXyxcbiAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5fLmZpcnN0SW5kZXggKyBsZW4gLSAxXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzTm9kZS5fbmV4dE5vZGUgPSB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNOb2RlID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXRoaXMuX3ByZXZpb3VzTm9kZSkge1xuICAgICAgICB0aGlzLl9wcmV2aW91c05vZGUgPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih7XG4gICAgICAgICAgICBfOiB0aGlzLl8sXG4gICAgICAgICAgICBpbmRleDogdGhpcy5pbmRleCAtIDFcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3ByZXZpb3VzTm9kZS5fbmV4dE5vZGUgPSB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcHJldmlvdXNOb2RlO1xufTtcblZpZXdTZXF1ZW5jZS5wcm90b3R5cGUuZ2V0TmV4dCA9IGZ1bmN0aW9uIGdldE5leHQoKSB7XG4gICAgdmFyIGxlbiA9IHRoaXMuXy5hcnJheS5sZW5ndGg7XG4gICAgaWYgKCFsZW4pIHtcbiAgICAgICAgdGhpcy5fbmV4dE5vZGUgPSBudWxsO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pbmRleCA9PT0gdGhpcy5fLmZpcnN0SW5kZXggKyBsZW4gLSAxKSB7XG4gICAgICAgIGlmICh0aGlzLl8ubG9vcCkge1xuICAgICAgICAgICAgdGhpcy5fbmV4dE5vZGUgPSB0aGlzLl8uZmlyc3ROb2RlIHx8IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHtcbiAgICAgICAgICAgICAgICBfOiB0aGlzLl8sXG4gICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuXy5maXJzdEluZGV4XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX25leHROb2RlLl9wcmV2aW91c05vZGUgPSB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbmV4dE5vZGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmICghdGhpcy5fbmV4dE5vZGUpIHtcbiAgICAgICAgdGhpcy5fbmV4dE5vZGUgPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih7XG4gICAgICAgICAgICBfOiB0aGlzLl8sXG4gICAgICAgICAgICBpbmRleDogdGhpcy5pbmRleCArIDFcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX25leHROb2RlLl9wcmV2aW91c05vZGUgPSB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fbmV4dE5vZGU7XG59O1xuVmlld1NlcXVlbmNlLnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZihpdGVtKSB7XG4gICAgcmV0dXJuIHRoaXMuXy5hcnJheS5pbmRleE9mKGl0ZW0pO1xufTtcblZpZXdTZXF1ZW5jZS5wcm90b3R5cGUuZ2V0SW5kZXggPSBmdW5jdGlvbiBnZXRJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmRleDtcbn07XG5WaWV3U2VxdWVuY2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuICcnICsgdGhpcy5pbmRleDtcbn07XG5WaWV3U2VxdWVuY2UucHJvdG90eXBlLnVuc2hpZnQgPSBmdW5jdGlvbiB1bnNoaWZ0KHZhbHVlKSB7XG4gICAgdGhpcy5fLmFycmF5LnVuc2hpZnQuYXBwbHkodGhpcy5fLmFycmF5LCBhcmd1bWVudHMpO1xuICAgIHRoaXMuXy5maXJzdEluZGV4IC09IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKHRoaXMuXy50cmFja1NpemUpXG4gICAgICAgIHRoaXMuXy5zaXplRGlydHkgPSB0cnVlO1xufTtcblZpZXdTZXF1ZW5jZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIHB1c2godmFsdWUpIHtcbiAgICB0aGlzLl8uYXJyYXkucHVzaC5hcHBseSh0aGlzLl8uYXJyYXksIGFyZ3VtZW50cyk7XG4gICAgaWYgKHRoaXMuXy50cmFja1NpemUpXG4gICAgICAgIHRoaXMuXy5zaXplRGlydHkgPSB0cnVlO1xufTtcblZpZXdTZXF1ZW5jZS5wcm90b3R5cGUuc3BsaWNlID0gZnVuY3Rpb24gc3BsaWNlKGluZGV4LCBob3dNYW55KSB7XG4gICAgdmFyIHZhbHVlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgdGhpcy5fLmFycmF5LnNwbGljZS5hcHBseSh0aGlzLl8uYXJyYXksIFtcbiAgICAgICAgaW5kZXggLSB0aGlzLl8uZmlyc3RJbmRleCxcbiAgICAgICAgaG93TWFueVxuICAgIF0uY29uY2F0KHZhbHVlcykpO1xuICAgIHRoaXMuXy5yZWluZGV4KGluZGV4LCBob3dNYW55LCB2YWx1ZXMubGVuZ3RoKTtcbn07XG5WaWV3U2VxdWVuY2UucHJvdG90eXBlLnN3YXAgPSBmdW5jdGlvbiBzd2FwKG90aGVyKSB7XG4gICAgdmFyIG90aGVyVmFsdWUgPSBvdGhlci5nZXQoKTtcbiAgICB2YXIgbXlWYWx1ZSA9IHRoaXMuZ2V0KCk7XG4gICAgdGhpcy5fLnNldFZhbHVlKHRoaXMuaW5kZXgsIG90aGVyVmFsdWUpO1xuICAgIHRoaXMuXy5zZXRWYWx1ZShvdGhlci5pbmRleCwgbXlWYWx1ZSk7XG4gICAgdmFyIG15UHJldmlvdXMgPSB0aGlzLl9wcmV2aW91c05vZGU7XG4gICAgdmFyIG15TmV4dCA9IHRoaXMuX25leHROb2RlO1xuICAgIHZhciBteUluZGV4ID0gdGhpcy5pbmRleDtcbiAgICB2YXIgb3RoZXJQcmV2aW91cyA9IG90aGVyLl9wcmV2aW91c05vZGU7XG4gICAgdmFyIG90aGVyTmV4dCA9IG90aGVyLl9uZXh0Tm9kZTtcbiAgICB2YXIgb3RoZXJJbmRleCA9IG90aGVyLmluZGV4O1xuICAgIHRoaXMuaW5kZXggPSBvdGhlckluZGV4O1xuICAgIHRoaXMuX3ByZXZpb3VzTm9kZSA9IG90aGVyUHJldmlvdXMgPT09IHRoaXMgPyBvdGhlciA6IG90aGVyUHJldmlvdXM7XG4gICAgaWYgKHRoaXMuX3ByZXZpb3VzTm9kZSlcbiAgICAgICAgdGhpcy5fcHJldmlvdXNOb2RlLl9uZXh0Tm9kZSA9IHRoaXM7XG4gICAgdGhpcy5fbmV4dE5vZGUgPSBvdGhlck5leHQgPT09IHRoaXMgPyBvdGhlciA6IG90aGVyTmV4dDtcbiAgICBpZiAodGhpcy5fbmV4dE5vZGUpXG4gICAgICAgIHRoaXMuX25leHROb2RlLl9wcmV2aW91c05vZGUgPSB0aGlzO1xuICAgIG90aGVyLmluZGV4ID0gbXlJbmRleDtcbiAgICBvdGhlci5fcHJldmlvdXNOb2RlID0gbXlQcmV2aW91cyA9PT0gb3RoZXIgPyB0aGlzIDogbXlQcmV2aW91cztcbiAgICBpZiAob3RoZXIuX3ByZXZpb3VzTm9kZSlcbiAgICAgICAgb3RoZXIuX3ByZXZpb3VzTm9kZS5fbmV4dE5vZGUgPSBvdGhlcjtcbiAgICBvdGhlci5fbmV4dE5vZGUgPSBteU5leHQgPT09IG90aGVyID8gdGhpcyA6IG15TmV4dDtcbiAgICBpZiAob3RoZXIuX25leHROb2RlKVxuICAgICAgICBvdGhlci5fbmV4dE5vZGUuX3ByZXZpb3VzTm9kZSA9IG90aGVyO1xuICAgIGlmICh0aGlzLmluZGV4ID09PSB0aGlzLl8uZmlyc3RJbmRleClcbiAgICAgICAgdGhpcy5fLmZpcnN0Tm9kZSA9IHRoaXM7XG4gICAgZWxzZSBpZiAodGhpcy5pbmRleCA9PT0gdGhpcy5fLmZpcnN0SW5kZXggKyB0aGlzLl8uYXJyYXkubGVuZ3RoIC0gMSlcbiAgICAgICAgdGhpcy5fLmxhc3ROb2RlID0gdGhpcztcbiAgICBpZiAob3RoZXIuaW5kZXggPT09IHRoaXMuXy5maXJzdEluZGV4KVxuICAgICAgICB0aGlzLl8uZmlyc3ROb2RlID0gb3RoZXI7XG4gICAgZWxzZSBpZiAob3RoZXIuaW5kZXggPT09IHRoaXMuXy5maXJzdEluZGV4ICsgdGhpcy5fLmFycmF5Lmxlbmd0aCAtIDEpXG4gICAgICAgIHRoaXMuXy5sYXN0Tm9kZSA9IG90aGVyO1xuICAgIGlmICh0aGlzLl8udHJhY2tTaXplKVxuICAgICAgICB0aGlzLl8uc2l6ZURpcnR5ID0gdHJ1ZTtcbn07XG5WaWV3U2VxdWVuY2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gdGhpcy5fLmdldFZhbHVlKHRoaXMuaW5kZXgpO1xufTtcblZpZXdTZXF1ZW5jZS5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgdmFyIHRhcmdldCA9IHRoaXMuZ2V0KCk7XG4gICAgcmV0dXJuIHRhcmdldCA/IHRhcmdldC5nZXRTaXplKCkgOiBudWxsO1xufTtcblZpZXdTZXF1ZW5jZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLl8udHJhY2tTaXplICYmIHRoaXMuXy5zaXplRGlydHkpXG4gICAgICAgIHRoaXMuXy5jYWxjdWxhdGVTaXplKCk7XG4gICAgdmFyIHRhcmdldCA9IHRoaXMuZ2V0KCk7XG4gICAgcmV0dXJuIHRhcmdldCA/IHRhcmdldC5yZW5kZXIuYXBwbHkodGFyZ2V0LCBhcmd1bWVudHMpIDogbnVsbDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFZpZXdTZXF1ZW5jZTsiLCJ2YXIgY3NzID0gXCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXFxuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXFxuICpcXG4gKiBPd25lcjogbWFya0BmYW1vLnVzXFxuICogQGxpY2Vuc2UgTVBMIDIuMFxcbiAqIEBjb3B5cmlnaHQgRmFtb3VzIEluZHVzdHJpZXMsIEluYy4gMjAxNFxcbiAqL1xcblxcbi5mYW1vdXMtcm9vdCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIG1hcmdpbjogMHB4O1xcbiAgICBwYWRkaW5nOiAwcHg7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gICAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG59XFxuXFxuLmZhbW91cy1jb250YWluZXIsIC5mYW1vdXMtZ3JvdXAge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMHB4O1xcbiAgICBsZWZ0OiAwcHg7XFxuICAgIGJvdHRvbTogMHB4O1xcbiAgICByaWdodDogMHB4O1xcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbiAgICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbiAgICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IHZpc2libGU7XFxuICAgIGJhY2tmYWNlLXZpc2liaWxpdHk6IHZpc2libGU7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG4uZmFtb3VzLWdyb3VwIHtcXG4gICAgd2lkdGg6IDBweDtcXG4gICAgaGVpZ2h0OiAwcHg7XFxuICAgIG1hcmdpbjogMHB4O1xcbiAgICBwYWRkaW5nOiAwcHg7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gICAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG59XFxuXFxuLmZhbW91cy1zdXJmYWNlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBjZW50ZXI7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBjZW50ZXI7XFxuICAgIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gICAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xcbn1cXG5cXG4uZmFtb3VzLWNvbnRhaW5lci1ncm91cCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXCI7IChyZXF1aXJlKFwiL1VzZXJzL3BzaGF0YXJhL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9IYWNrUmVhY3Rvci9BZEZhbWUvbm9kZV9tb2R1bGVzL2Nzc2lmeVwiKSkoY3NzKTsgbW9kdWxlLmV4cG9ydHMgPSBjc3M7IiwidmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4uL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG5mdW5jdGlvbiBHZW5lcmljU3luYyhzeW5jcywgb3B0aW9ucykge1xuICAgIHRoaXMuX2V2ZW50SW5wdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldElucHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudElucHV0KTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudE91dHB1dCk7XG4gICAgdGhpcy5fc3luY3MgPSB7fTtcbiAgICBpZiAoc3luY3MpXG4gICAgICAgIHRoaXMuYWRkU3luYyhzeW5jcyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbn1cbkdlbmVyaWNTeW5jLkRJUkVDVElPTl9YID0gMDtcbkdlbmVyaWNTeW5jLkRJUkVDVElPTl9ZID0gMTtcbkdlbmVyaWNTeW5jLkRJUkVDVElPTl9aID0gMjtcbnZhciByZWdpc3RyeSA9IHt9O1xuR2VuZXJpY1N5bmMucmVnaXN0ZXIgPSBmdW5jdGlvbiByZWdpc3RlcihzeW5jT2JqZWN0KSB7XG4gICAgZm9yICh2YXIga2V5IGluIHN5bmNPYmplY3QpIHtcbiAgICAgICAgaWYgKHJlZ2lzdHJ5W2tleV0pIHtcbiAgICAgICAgICAgIGlmIChyZWdpc3RyeVtrZXldID09PSBzeW5jT2JqZWN0W2tleV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGhpcyBrZXkgaXMgcmVnaXN0ZXJlZCB0byBhIGRpZmZlcmVudCBzeW5jIGNsYXNzJyk7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgcmVnaXN0cnlba2V5XSA9IHN5bmNPYmplY3Rba2V5XTtcbiAgICB9XG59O1xuR2VuZXJpY1N5bmMucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9zeW5jcykge1xuICAgICAgICB0aGlzLl9zeW5jc1trZXldLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgfVxufTtcbkdlbmVyaWNTeW5jLnByb3RvdHlwZS5waXBlU3luYyA9IGZ1bmN0aW9uIHBpcGVUb1N5bmMoa2V5KSB7XG4gICAgdmFyIHN5bmMgPSB0aGlzLl9zeW5jc1trZXldO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQucGlwZShzeW5jKTtcbiAgICBzeW5jLnBpcGUodGhpcy5fZXZlbnRPdXRwdXQpO1xufTtcbkdlbmVyaWNTeW5jLnByb3RvdHlwZS51bnBpcGVTeW5jID0gZnVuY3Rpb24gdW5waXBlRnJvbVN5bmMoa2V5KSB7XG4gICAgdmFyIHN5bmMgPSB0aGlzLl9zeW5jc1trZXldO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQudW5waXBlKHN5bmMpO1xuICAgIHN5bmMudW5waXBlKHRoaXMuX2V2ZW50T3V0cHV0KTtcbn07XG5mdW5jdGlvbiBfYWRkU2luZ2xlU3luYyhrZXksIG9wdGlvbnMpIHtcbiAgICBpZiAoIXJlZ2lzdHJ5W2tleV0pXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLl9zeW5jc1trZXldID0gbmV3IHJlZ2lzdHJ5W2tleV0ob3B0aW9ucyk7XG4gICAgdGhpcy5waXBlU3luYyhrZXkpO1xufVxuR2VuZXJpY1N5bmMucHJvdG90eXBlLmFkZFN5bmMgPSBmdW5jdGlvbiBhZGRTeW5jKHN5bmNzKSB7XG4gICAgaWYgKHN5bmNzIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3luY3MubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBfYWRkU2luZ2xlU3luYy5jYWxsKHRoaXMsIHN5bmNzW2ldKTtcbiAgICBlbHNlIGlmIChzeW5jcyBpbnN0YW5jZW9mIE9iamVjdClcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHN5bmNzKVxuICAgICAgICAgICAgX2FkZFNpbmdsZVN5bmMuY2FsbCh0aGlzLCBrZXksIHN5bmNzW2tleV0pO1xufTtcbm1vZHVsZS5leHBvcnRzID0gR2VuZXJpY1N5bmM7IiwidmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4uL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCcuLi9jb3JlL09wdGlvbnNNYW5hZ2VyJyk7XG5mdW5jdGlvbiBNb3VzZVN5bmMob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoTW91c2VTeW5jLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgdGhpcy5fb3B0aW9uc01hbmFnZXIgPSBuZXcgT3B0aW9uc01hbmFnZXIodGhpcy5vcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldElucHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudElucHV0KTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudE91dHB1dCk7XG4gICAgdGhpcy5fZXZlbnRJbnB1dC5vbignbW91c2Vkb3duJywgX2hhbmRsZVN0YXJ0LmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQub24oJ21vdXNlbW92ZScsIF9oYW5kbGVNb3ZlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQub24oJ21vdXNldXAnLCBfaGFuZGxlRW5kLmJpbmQodGhpcykpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMucHJvcG9nYXRlKVxuICAgICAgICB0aGlzLl9ldmVudElucHV0Lm9uKCdtb3VzZWxlYXZlJywgX2hhbmRsZUxlYXZlLmJpbmQodGhpcykpO1xuICAgIGVsc2VcbiAgICAgICAgdGhpcy5fZXZlbnRJbnB1dC5vbignbW91c2VsZWF2ZScsIF9oYW5kbGVFbmQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fcGF5bG9hZCA9IHtcbiAgICAgICAgZGVsdGE6IG51bGwsXG4gICAgICAgIHBvc2l0aW9uOiBudWxsLFxuICAgICAgICB2ZWxvY2l0eTogbnVsbCxcbiAgICAgICAgY2xpZW50WDogMCxcbiAgICAgICAgY2xpZW50WTogMCxcbiAgICAgICAgb2Zmc2V0WDogMCxcbiAgICAgICAgb2Zmc2V0WTogMFxuICAgIH07XG4gICAgdGhpcy5fcG9zaXRpb25IaXN0b3J5ID0gW107XG4gICAgdGhpcy5fcG9zaXRpb24gPSBudWxsO1xuICAgIHRoaXMuX3ByZXZDb29yZCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9wcmV2VGltZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9kb3duID0gZmFsc2U7XG4gICAgdGhpcy5fbW92ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9kb2N1bWVudEFjdGl2ZSA9IGZhbHNlO1xufVxuTW91c2VTeW5jLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBkaXJlY3Rpb246IHVuZGVmaW5lZCxcbiAgICByYWlsczogZmFsc2UsXG4gICAgc2NhbGU6IDEsXG4gICAgcHJvcG9nYXRlOiB0cnVlLFxuICAgIHZlbG9jaXR5U2FtcGxlTGVuZ3RoOiAxMCxcbiAgICBwcmV2ZW50RGVmYXVsdDogdHJ1ZVxufTtcbk1vdXNlU3luYy5ESVJFQ1RJT05fWCA9IDA7XG5Nb3VzZVN5bmMuRElSRUNUSU9OX1kgPSAxO1xudmFyIE1JTklNVU1fVElDS19USU1FID0gODtcbmZ1bmN0aW9uIF9oYW5kbGVTdGFydChldmVudCkge1xuICAgIHZhciBkZWx0YTtcbiAgICB2YXIgdmVsb2NpdHk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5wcmV2ZW50RGVmYXVsdClcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgeCA9IGV2ZW50LmNsaWVudFg7XG4gICAgdmFyIHkgPSBldmVudC5jbGllbnRZO1xuICAgIHRoaXMuX3ByZXZDb29yZCA9IFtcbiAgICAgICAgeCxcbiAgICAgICAgeVxuICAgIF07XG4gICAgdGhpcy5fcHJldlRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuX2Rvd24gPSB0cnVlO1xuICAgIHRoaXMuX21vdmUgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5vcHRpb25zLmRpcmVjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgZGVsdGEgPSAwO1xuICAgICAgICB2ZWxvY2l0eSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdO1xuICAgICAgICBkZWx0YSA9IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF07XG4gICAgICAgIHZlbG9jaXR5ID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXTtcbiAgICB9XG4gICAgdmFyIHBheWxvYWQgPSB0aGlzLl9wYXlsb2FkO1xuICAgIHBheWxvYWQuZGVsdGEgPSBkZWx0YTtcbiAgICBwYXlsb2FkLnBvc2l0aW9uID0gdGhpcy5fcG9zaXRpb247XG4gICAgcGF5bG9hZC52ZWxvY2l0eSA9IHZlbG9jaXR5O1xuICAgIHBheWxvYWQuY2xpZW50WCA9IHg7XG4gICAgcGF5bG9hZC5jbGllbnRZID0geTtcbiAgICBwYXlsb2FkLm9mZnNldFggPSBldmVudC5vZmZzZXRYO1xuICAgIHBheWxvYWQub2Zmc2V0WSA9IGV2ZW50Lm9mZnNldFk7XG4gICAgdGhpcy5fcG9zaXRpb25IaXN0b3J5LnB1c2goe1xuICAgICAgICBwb3NpdGlvbjogcGF5bG9hZC5wb3NpdGlvbi5zbGljZSA/IHBheWxvYWQucG9zaXRpb24uc2xpY2UoMCkgOiBwYXlsb2FkLnBvc2l0aW9uLFxuICAgICAgICB0aW1lOiB0aGlzLl9wcmV2VGltZVxuICAgIH0pO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ3N0YXJ0JywgcGF5bG9hZCk7XG4gICAgdGhpcy5fZG9jdW1lbnRBY3RpdmUgPSBmYWxzZTtcbn1cbmZ1bmN0aW9uIF9oYW5kbGVNb3ZlKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLl9wcmV2Q29vcmQpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgcHJldkNvb3JkID0gdGhpcy5fcHJldkNvb3JkO1xuICAgIHZhciBwcmV2VGltZSA9IHRoaXMuX3ByZXZUaW1lO1xuICAgIHZhciB4ID0gZXZlbnQuY2xpZW50WDtcbiAgICB2YXIgeSA9IGV2ZW50LmNsaWVudFk7XG4gICAgdmFyIGN1cnJUaW1lID0gRGF0ZS5ub3coKTtcbiAgICB2YXIgZGlmZlggPSB4IC0gcHJldkNvb3JkWzBdO1xuICAgIHZhciBkaWZmWSA9IHkgLSBwcmV2Q29vcmRbMV07XG4gICAgaWYgKHRoaXMub3B0aW9ucy5yYWlscykge1xuICAgICAgICBpZiAoTWF0aC5hYnMoZGlmZlgpID4gTWF0aC5hYnMoZGlmZlkpKVxuICAgICAgICAgICAgZGlmZlkgPSAwO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBkaWZmWCA9IDA7XG4gICAgfVxuICAgIHZhciBkaWZmVGltZSA9IE1hdGgubWF4KGN1cnJUaW1lIC0gdGhpcy5fcG9zaXRpb25IaXN0b3J5WzBdLnRpbWUsIE1JTklNVU1fVElDS19USU1FKTtcbiAgICB2YXIgc2NhbGUgPSB0aGlzLm9wdGlvbnMuc2NhbGU7XG4gICAgdmFyIG5leHRWZWw7XG4gICAgdmFyIG5leHREZWx0YTtcbiAgICBpZiAodGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PT0gTW91c2VTeW5jLkRJUkVDVElPTl9YKSB7XG4gICAgICAgIG5leHREZWx0YSA9IHNjYWxlICogZGlmZlg7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uICs9IG5leHREZWx0YTtcbiAgICAgICAgbmV4dFZlbCA9IHNjYWxlICogKHRoaXMuX3Bvc2l0aW9uIC0gdGhpcy5fcG9zaXRpb25IaXN0b3J5WzBdLnBvc2l0aW9uKSAvIGRpZmZUaW1lO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PT0gTW91c2VTeW5jLkRJUkVDVElPTl9ZKSB7XG4gICAgICAgIG5leHREZWx0YSA9IHNjYWxlICogZGlmZlk7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uICs9IG5leHREZWx0YTtcbiAgICAgICAgbmV4dFZlbCA9IHNjYWxlICogKHRoaXMuX3Bvc2l0aW9uIC0gdGhpcy5fcG9zaXRpb25IaXN0b3J5WzBdLnBvc2l0aW9uKSAvIGRpZmZUaW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHREZWx0YSA9IFtcbiAgICAgICAgICAgIHNjYWxlICogZGlmZlgsXG4gICAgICAgICAgICBzY2FsZSAqIGRpZmZZXG4gICAgICAgIF07XG4gICAgICAgIG5leHRWZWwgPSBbXG4gICAgICAgICAgICBzY2FsZSAqICh0aGlzLl9wb3NpdGlvblswXSAtIHRoaXMuX3Bvc2l0aW9uSGlzdG9yeVswXS5wb3NpdGlvblswXSkgLyBkaWZmVGltZSxcbiAgICAgICAgICAgIHNjYWxlICogKHRoaXMuX3Bvc2l0aW9uWzFdIC0gdGhpcy5fcG9zaXRpb25IaXN0b3J5WzBdLnBvc2l0aW9uWzFdKSAvIGRpZmZUaW1lXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uWzBdICs9IG5leHREZWx0YVswXTtcbiAgICAgICAgdGhpcy5fcG9zaXRpb25bMV0gKz0gbmV4dERlbHRhWzFdO1xuICAgIH1cbiAgICB2YXIgcGF5bG9hZCA9IHRoaXMuX3BheWxvYWQ7XG4gICAgcGF5bG9hZC5kZWx0YSA9IG5leHREZWx0YTtcbiAgICBwYXlsb2FkLnBvc2l0aW9uID0gdGhpcy5fcG9zaXRpb247XG4gICAgcGF5bG9hZC52ZWxvY2l0eSA9IG5leHRWZWw7XG4gICAgcGF5bG9hZC5jbGllbnRYID0geDtcbiAgICBwYXlsb2FkLmNsaWVudFkgPSB5O1xuICAgIHBheWxvYWQub2Zmc2V0WCA9IGV2ZW50Lm9mZnNldFg7XG4gICAgcGF5bG9hZC5vZmZzZXRZID0gZXZlbnQub2Zmc2V0WTtcbiAgICBpZiAodGhpcy5fcG9zaXRpb25IaXN0b3J5Lmxlbmd0aCA9PT0gdGhpcy5vcHRpb25zLnZlbG9jaXR5U2FtcGxlTGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uSGlzdG9yeS5zaGlmdCgpO1xuICAgIH1cbiAgICB0aGlzLl9wb3NpdGlvbkhpc3RvcnkucHVzaCh7XG4gICAgICAgIHBvc2l0aW9uOiBwYXlsb2FkLnBvc2l0aW9uLnNsaWNlID8gcGF5bG9hZC5wb3NpdGlvbi5zbGljZSgwKSA6IHBheWxvYWQucG9zaXRpb24sXG4gICAgICAgIHRpbWU6IGN1cnJUaW1lXG4gICAgfSk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgndXBkYXRlJywgcGF5bG9hZCk7XG4gICAgdGhpcy5fcHJldkNvb3JkID0gW1xuICAgICAgICB4LFxuICAgICAgICB5XG4gICAgXTtcbiAgICB0aGlzLl9wcmV2VGltZSA9IGN1cnJUaW1lO1xuICAgIHRoaXMuX21vdmUgPSB0cnVlO1xufVxuZnVuY3Rpb24gX2hhbmRsZUVuZChldmVudCkge1xuICAgIGlmICghdGhpcy5fZG93bilcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2VuZCcsIHRoaXMuX3BheWxvYWQpO1xuICAgIHRoaXMuX3ByZXZDb29yZCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9wcmV2VGltZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9kb3duID0gZmFsc2U7XG4gICAgdGhpcy5fbW92ZSA9IGZhbHNlO1xuICAgIHRoaXMuX3Bvc2l0aW9uSGlzdG9yeSA9IFtdO1xufVxuZnVuY3Rpb24gX2hhbmRsZUxlYXZlKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLl9kb3duIHx8ICF0aGlzLl9tb3ZlKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKCF0aGlzLl9kb2N1bWVudEFjdGl2ZSkge1xuICAgICAgICB2YXIgYm91bmRNb3ZlID0gX2hhbmRsZU1vdmUuYmluZCh0aGlzKTtcbiAgICAgICAgdmFyIGJvdW5kRW5kID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgX2hhbmRsZUVuZC5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBib3VuZE1vdmUpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBib3VuZEVuZCk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcywgZXZlbnQpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBib3VuZE1vdmUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgYm91bmRFbmQpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudEFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuTW91c2VTeW5jLnByb3RvdHlwZS5nZXRPcHRpb25zID0gZnVuY3Rpb24gZ2V0T3B0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zO1xufTtcbk1vdXNlU3luYy5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zTWFuYWdlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gTW91c2VTeW5jOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuLi9jb3JlL0V2ZW50SGFuZGxlcicpO1xudmFyIEVuZ2luZSA9IHJlcXVpcmUoJy4uL2NvcmUvRW5naW5lJyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCcuLi9jb3JlL09wdGlvbnNNYW5hZ2VyJyk7XG5mdW5jdGlvbiBTY3JvbGxTeW5jKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKFNjcm9sbFN5bmMuREVGQVVMVF9PUFRJT05TKTtcbiAgICB0aGlzLl9vcHRpb25zTWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcih0aGlzLm9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5fcGF5bG9hZCA9IHtcbiAgICAgICAgZGVsdGE6IG51bGwsXG4gICAgICAgIHBvc2l0aW9uOiBudWxsLFxuICAgICAgICB2ZWxvY2l0eTogbnVsbCxcbiAgICAgICAgc2xpcDogdHJ1ZVxuICAgIH07XG4gICAgdGhpcy5fZXZlbnRJbnB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0SW5wdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50SW5wdXQpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50T3V0cHV0KTtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT09IHVuZGVmaW5lZCA/IFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0gOiAwO1xuICAgIHRoaXMuX3ByZXZUaW1lID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3ByZXZWZWwgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZXZlbnRJbnB1dC5vbignbW91c2V3aGVlbCcsIF9oYW5kbGVNb3ZlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQub24oJ3doZWVsJywgX2hhbmRsZU1vdmUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5faW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgIHRoaXMuX2xvb3BCb3VuZCA9IGZhbHNlO1xufVxuU2Nyb2xsU3luYy5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgZGlyZWN0aW9uOiB1bmRlZmluZWQsXG4gICAgbWluaW11bUVuZFNwZWVkOiBJbmZpbml0eSxcbiAgICByYWlsczogZmFsc2UsXG4gICAgc2NhbGU6IDEsXG4gICAgc3RhbGxUaW1lOiA1MCxcbiAgICBsaW5lSGVpZ2h0OiA0MCxcbiAgICBwcmV2ZW50RGVmYXVsdDogdHJ1ZVxufTtcblNjcm9sbFN5bmMuRElSRUNUSU9OX1ggPSAwO1xuU2Nyb2xsU3luYy5ESVJFQ1RJT05fWSA9IDE7XG52YXIgTUlOSU1VTV9USUNLX1RJTUUgPSA4O1xudmFyIF9ub3cgPSBEYXRlLm5vdztcbmZ1bmN0aW9uIF9uZXdGcmFtZSgpIHtcbiAgICBpZiAodGhpcy5faW5Qcm9ncmVzcyAmJiBfbm93KCkgLSB0aGlzLl9wcmV2VGltZSA+IHRoaXMub3B0aW9ucy5zdGFsbFRpbWUpIHtcbiAgICAgICAgdGhpcy5faW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgICB2YXIgZmluYWxWZWwgPSBNYXRoLmFicyh0aGlzLl9wcmV2VmVsKSA+PSB0aGlzLm9wdGlvbnMubWluaW11bUVuZFNwZWVkID8gdGhpcy5fcHJldlZlbCA6IDA7XG4gICAgICAgIHZhciBwYXlsb2FkID0gdGhpcy5fcGF5bG9hZDtcbiAgICAgICAgcGF5bG9hZC5wb3NpdGlvbiA9IHRoaXMuX3Bvc2l0aW9uO1xuICAgICAgICBwYXlsb2FkLnZlbG9jaXR5ID0gZmluYWxWZWw7XG4gICAgICAgIHBheWxvYWQuc2xpcCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2VuZCcsIHBheWxvYWQpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9oYW5kbGVNb3ZlKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5wcmV2ZW50RGVmYXVsdClcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoIXRoaXMuX2luUHJvZ3Jlc3MpIHtcbiAgICAgICAgdGhpcy5faW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gdGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PT0gdW5kZWZpbmVkID8gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSA6IDA7XG4gICAgICAgIHBheWxvYWQgPSB0aGlzLl9wYXlsb2FkO1xuICAgICAgICBwYXlsb2FkLnNsaXAgPSB0cnVlO1xuICAgICAgICBwYXlsb2FkLnBvc2l0aW9uID0gdGhpcy5fcG9zaXRpb247XG4gICAgICAgIHBheWxvYWQuY2xpZW50WCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgIHBheWxvYWQuY2xpZW50WSA9IGV2ZW50LmNsaWVudFk7XG4gICAgICAgIHBheWxvYWQub2Zmc2V0WCA9IGV2ZW50Lm9mZnNldFg7XG4gICAgICAgIHBheWxvYWQub2Zmc2V0WSA9IGV2ZW50Lm9mZnNldFk7XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ3N0YXJ0JywgcGF5bG9hZCk7XG4gICAgICAgIGlmICghdGhpcy5fbG9vcEJvdW5kKSB7XG4gICAgICAgICAgICBFbmdpbmUub24oJ3ByZXJlbmRlcicsIF9uZXdGcmFtZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuX2xvb3BCb3VuZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGN1cnJUaW1lID0gX25vdygpO1xuICAgIHZhciBwcmV2VGltZSA9IHRoaXMuX3ByZXZUaW1lIHx8IGN1cnJUaW1lO1xuICAgIHZhciBkaWZmWCA9IGV2ZW50LndoZWVsRGVsdGFYICE9PSB1bmRlZmluZWQgPyBldmVudC53aGVlbERlbHRhWCA6IC1ldmVudC5kZWx0YVg7XG4gICAgdmFyIGRpZmZZID0gZXZlbnQud2hlZWxEZWx0YVkgIT09IHVuZGVmaW5lZCA/IGV2ZW50LndoZWVsRGVsdGFZIDogLWV2ZW50LmRlbHRhWTtcbiAgICBpZiAoZXZlbnQuZGVsdGFNb2RlID09PSAxKSB7XG4gICAgICAgIGRpZmZYICo9IHRoaXMub3B0aW9ucy5saW5lSGVpZ2h0O1xuICAgICAgICBkaWZmWSAqPSB0aGlzLm9wdGlvbnMubGluZUhlaWdodDtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5yYWlscykge1xuICAgICAgICBpZiAoTWF0aC5hYnMoZGlmZlgpID4gTWF0aC5hYnMoZGlmZlkpKVxuICAgICAgICAgICAgZGlmZlkgPSAwO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBkaWZmWCA9IDA7XG4gICAgfVxuICAgIHZhciBkaWZmVGltZSA9IE1hdGgubWF4KGN1cnJUaW1lIC0gcHJldlRpbWUsIE1JTklNVU1fVElDS19USU1FKTtcbiAgICB2YXIgdmVsWCA9IGRpZmZYIC8gZGlmZlRpbWU7XG4gICAgdmFyIHZlbFkgPSBkaWZmWSAvIGRpZmZUaW1lO1xuICAgIHZhciBzY2FsZSA9IHRoaXMub3B0aW9ucy5zY2FsZTtcbiAgICB2YXIgbmV4dFZlbDtcbiAgICB2YXIgbmV4dERlbHRhO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZGlyZWN0aW9uID09PSBTY3JvbGxTeW5jLkRJUkVDVElPTl9YKSB7XG4gICAgICAgIG5leHREZWx0YSA9IHNjYWxlICogZGlmZlg7XG4gICAgICAgIG5leHRWZWwgPSBzY2FsZSAqIHZlbFg7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uICs9IG5leHREZWx0YTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT09IFNjcm9sbFN5bmMuRElSRUNUSU9OX1kpIHtcbiAgICAgICAgbmV4dERlbHRhID0gc2NhbGUgKiBkaWZmWTtcbiAgICAgICAgbmV4dFZlbCA9IHNjYWxlICogdmVsWTtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gKz0gbmV4dERlbHRhO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHREZWx0YSA9IFtcbiAgICAgICAgICAgIHNjYWxlICogZGlmZlgsXG4gICAgICAgICAgICBzY2FsZSAqIGRpZmZZXG4gICAgICAgIF07XG4gICAgICAgIG5leHRWZWwgPSBbXG4gICAgICAgICAgICBzY2FsZSAqIHZlbFgsXG4gICAgICAgICAgICBzY2FsZSAqIHZlbFlcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5fcG9zaXRpb25bMF0gKz0gbmV4dERlbHRhWzBdO1xuICAgICAgICB0aGlzLl9wb3NpdGlvblsxXSArPSBuZXh0RGVsdGFbMV07XG4gICAgfVxuICAgIHZhciBwYXlsb2FkID0gdGhpcy5fcGF5bG9hZDtcbiAgICBwYXlsb2FkLmRlbHRhID0gbmV4dERlbHRhO1xuICAgIHBheWxvYWQudmVsb2NpdHkgPSBuZXh0VmVsO1xuICAgIHBheWxvYWQucG9zaXRpb24gPSB0aGlzLl9wb3NpdGlvbjtcbiAgICBwYXlsb2FkLnNsaXAgPSB0cnVlO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ3VwZGF0ZScsIHBheWxvYWQpO1xuICAgIHRoaXMuX3ByZXZUaW1lID0gY3VyclRpbWU7XG4gICAgdGhpcy5fcHJldlZlbCA9IG5leHRWZWw7XG59XG5TY3JvbGxTeW5jLnByb3RvdHlwZS5nZXRPcHRpb25zID0gZnVuY3Rpb24gZ2V0T3B0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zO1xufTtcblNjcm9sbFN5bmMucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9uc01hbmFnZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFNjcm9sbFN5bmM7IiwidmFyIFRvdWNoVHJhY2tlciA9IHJlcXVpcmUoJy4vVG91Y2hUcmFja2VyJyk7XG52YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnLi4vY29yZS9FdmVudEhhbmRsZXInKTtcbnZhciBPcHRpb25zTWFuYWdlciA9IHJlcXVpcmUoJy4uL2NvcmUvT3B0aW9uc01hbmFnZXInKTtcbmZ1bmN0aW9uIFRvdWNoU3luYyhvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShUb3VjaFN5bmMuREVGQVVMVF9PUFRJT05TKTtcbiAgICB0aGlzLl9vcHRpb25zTWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcih0aGlzLm9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fdG91Y2hUcmFja2VyID0gbmV3IFRvdWNoVHJhY2tlcih7IHRvdWNoTGltaXQ6IHRoaXMub3B0aW9ucy50b3VjaExpbWl0IH0pO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50T3V0cHV0KTtcbiAgICBFdmVudEhhbmRsZXIuc2V0SW5wdXRIYW5kbGVyKHRoaXMsIHRoaXMuX3RvdWNoVHJhY2tlcik7XG4gICAgdGhpcy5fdG91Y2hUcmFja2VyLm9uKCd0cmFja3N0YXJ0JywgX2hhbmRsZVN0YXJ0LmJpbmQodGhpcykpO1xuICAgIHRoaXMuX3RvdWNoVHJhY2tlci5vbigndHJhY2ttb3ZlJywgX2hhbmRsZU1vdmUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fdG91Y2hUcmFja2VyLm9uKCd0cmFja2VuZCcsIF9oYW5kbGVFbmQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fcGF5bG9hZCA9IHtcbiAgICAgICAgZGVsdGE6IG51bGwsXG4gICAgICAgIHBvc2l0aW9uOiBudWxsLFxuICAgICAgICB2ZWxvY2l0eTogbnVsbCxcbiAgICAgICAgY2xpZW50WDogdW5kZWZpbmVkLFxuICAgICAgICBjbGllbnRZOiB1bmRlZmluZWQsXG4gICAgICAgIGNvdW50OiAwLFxuICAgICAgICB0b3VjaDogdW5kZWZpbmVkXG4gICAgfTtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IG51bGw7XG59XG5Ub3VjaFN5bmMuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIGRpcmVjdGlvbjogdW5kZWZpbmVkLFxuICAgIHJhaWxzOiBmYWxzZSxcbiAgICB0b3VjaExpbWl0OiAxLFxuICAgIHZlbG9jaXR5U2FtcGxlTGVuZ3RoOiAxMCxcbiAgICBzY2FsZTogMVxufTtcblRvdWNoU3luYy5ESVJFQ1RJT05fWCA9IDA7XG5Ub3VjaFN5bmMuRElSRUNUSU9OX1kgPSAxO1xudmFyIE1JTklNVU1fVElDS19USU1FID0gODtcbmZ1bmN0aW9uIF9oYW5kbGVTdGFydChkYXRhKSB7XG4gICAgdmFyIHZlbG9jaXR5O1xuICAgIHZhciBkZWx0YTtcbiAgICBpZiAodGhpcy5vcHRpb25zLmRpcmVjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgdmVsb2NpdHkgPSAwO1xuICAgICAgICBkZWx0YSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdO1xuICAgICAgICB2ZWxvY2l0eSA9IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF07XG4gICAgICAgIGRlbHRhID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXTtcbiAgICB9XG4gICAgdmFyIHBheWxvYWQgPSB0aGlzLl9wYXlsb2FkO1xuICAgIHBheWxvYWQuZGVsdGEgPSBkZWx0YTtcbiAgICBwYXlsb2FkLnBvc2l0aW9uID0gdGhpcy5fcG9zaXRpb247XG4gICAgcGF5bG9hZC52ZWxvY2l0eSA9IHZlbG9jaXR5O1xuICAgIHBheWxvYWQuY2xpZW50WCA9IGRhdGEueDtcbiAgICBwYXlsb2FkLmNsaWVudFkgPSBkYXRhLnk7XG4gICAgcGF5bG9hZC5jb3VudCA9IGRhdGEuY291bnQ7XG4gICAgcGF5bG9hZC50b3VjaCA9IGRhdGEuaWRlbnRpZmllcjtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdzdGFydCcsIHBheWxvYWQpO1xufVxuZnVuY3Rpb24gX2hhbmRsZU1vdmUoZGF0YSkge1xuICAgIHZhciBoaXN0b3J5ID0gZGF0YS5oaXN0b3J5O1xuICAgIHZhciBjdXJySGlzdG9yeSA9IGhpc3RvcnlbaGlzdG9yeS5sZW5ndGggLSAxXTtcbiAgICB2YXIgcHJldkhpc3RvcnkgPSBoaXN0b3J5W2hpc3RvcnkubGVuZ3RoIC0gMl07XG4gICAgdmFyIGRpc3RhbnRIaXN0b3J5ID0gaGlzdG9yeVtoaXN0b3J5Lmxlbmd0aCAtIHRoaXMub3B0aW9ucy52ZWxvY2l0eVNhbXBsZUxlbmd0aF0gPyBoaXN0b3J5W2hpc3RvcnkubGVuZ3RoIC0gdGhpcy5vcHRpb25zLnZlbG9jaXR5U2FtcGxlTGVuZ3RoXSA6IGhpc3RvcnlbaGlzdG9yeS5sZW5ndGggLSAyXTtcbiAgICB2YXIgZGlzdGFudFRpbWUgPSBkaXN0YW50SGlzdG9yeS50aW1lc3RhbXA7XG4gICAgdmFyIGN1cnJUaW1lID0gY3Vyckhpc3RvcnkudGltZXN0YW1wO1xuICAgIHZhciBkaWZmWCA9IGN1cnJIaXN0b3J5LnggLSBwcmV2SGlzdG9yeS54O1xuICAgIHZhciBkaWZmWSA9IGN1cnJIaXN0b3J5LnkgLSBwcmV2SGlzdG9yeS55O1xuICAgIHZhciB2ZWxEaWZmWCA9IGN1cnJIaXN0b3J5LnggLSBkaXN0YW50SGlzdG9yeS54O1xuICAgIHZhciB2ZWxEaWZmWSA9IGN1cnJIaXN0b3J5LnkgLSBkaXN0YW50SGlzdG9yeS55O1xuICAgIGlmICh0aGlzLm9wdGlvbnMucmFpbHMpIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKGRpZmZYKSA+IE1hdGguYWJzKGRpZmZZKSlcbiAgICAgICAgICAgIGRpZmZZID0gMDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGlmZlggPSAwO1xuICAgICAgICBpZiAoTWF0aC5hYnModmVsRGlmZlgpID4gTWF0aC5hYnModmVsRGlmZlkpKVxuICAgICAgICAgICAgdmVsRGlmZlkgPSAwO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB2ZWxEaWZmWCA9IDA7XG4gICAgfVxuICAgIHZhciBkaWZmVGltZSA9IE1hdGgubWF4KGN1cnJUaW1lIC0gZGlzdGFudFRpbWUsIE1JTklNVU1fVElDS19USU1FKTtcbiAgICB2YXIgdmVsWCA9IHZlbERpZmZYIC8gZGlmZlRpbWU7XG4gICAgdmFyIHZlbFkgPSB2ZWxEaWZmWSAvIGRpZmZUaW1lO1xuICAgIHZhciBzY2FsZSA9IHRoaXMub3B0aW9ucy5zY2FsZTtcbiAgICB2YXIgbmV4dFZlbDtcbiAgICB2YXIgbmV4dERlbHRhO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZGlyZWN0aW9uID09PSBUb3VjaFN5bmMuRElSRUNUSU9OX1gpIHtcbiAgICAgICAgbmV4dERlbHRhID0gc2NhbGUgKiBkaWZmWDtcbiAgICAgICAgbmV4dFZlbCA9IHNjYWxlICogdmVsWDtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gKz0gbmV4dERlbHRhO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PT0gVG91Y2hTeW5jLkRJUkVDVElPTl9ZKSB7XG4gICAgICAgIG5leHREZWx0YSA9IHNjYWxlICogZGlmZlk7XG4gICAgICAgIG5leHRWZWwgPSBzY2FsZSAqIHZlbFk7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uICs9IG5leHREZWx0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBuZXh0RGVsdGEgPSBbXG4gICAgICAgICAgICBzY2FsZSAqIGRpZmZYLFxuICAgICAgICAgICAgc2NhbGUgKiBkaWZmWVxuICAgICAgICBdO1xuICAgICAgICBuZXh0VmVsID0gW1xuICAgICAgICAgICAgc2NhbGUgKiB2ZWxYLFxuICAgICAgICAgICAgc2NhbGUgKiB2ZWxZXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uWzBdICs9IG5leHREZWx0YVswXTtcbiAgICAgICAgdGhpcy5fcG9zaXRpb25bMV0gKz0gbmV4dERlbHRhWzFdO1xuICAgIH1cbiAgICB2YXIgcGF5bG9hZCA9IHRoaXMuX3BheWxvYWQ7XG4gICAgcGF5bG9hZC5kZWx0YSA9IG5leHREZWx0YTtcbiAgICBwYXlsb2FkLnZlbG9jaXR5ID0gbmV4dFZlbDtcbiAgICBwYXlsb2FkLnBvc2l0aW9uID0gdGhpcy5fcG9zaXRpb247XG4gICAgcGF5bG9hZC5jbGllbnRYID0gZGF0YS54O1xuICAgIHBheWxvYWQuY2xpZW50WSA9IGRhdGEueTtcbiAgICBwYXlsb2FkLmNvdW50ID0gZGF0YS5jb3VudDtcbiAgICBwYXlsb2FkLnRvdWNoID0gZGF0YS5pZGVudGlmaWVyO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ3VwZGF0ZScsIHBheWxvYWQpO1xufVxuZnVuY3Rpb24gX2hhbmRsZUVuZChkYXRhKSB7XG4gICAgdGhpcy5fcGF5bG9hZC5jb3VudCA9IGRhdGEuY291bnQ7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgnZW5kJywgdGhpcy5fcGF5bG9hZCk7XG59XG5Ub3VjaFN5bmMucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9uc01hbmFnZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbn07XG5Ub3VjaFN5bmMucHJvdG90eXBlLmdldE9wdGlvbnMgPSBmdW5jdGlvbiBnZXRPcHRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnM7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBUb3VjaFN5bmM7IiwidmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4uL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG52YXIgX25vdyA9IERhdGUubm93O1xuZnVuY3Rpb24gX3RpbWVzdGFtcFRvdWNoKHRvdWNoLCBldmVudCwgaGlzdG9yeSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHg6IHRvdWNoLmNsaWVudFgsXG4gICAgICAgIHk6IHRvdWNoLmNsaWVudFksXG4gICAgICAgIGlkZW50aWZpZXI6IHRvdWNoLmlkZW50aWZpZXIsXG4gICAgICAgIG9yaWdpbjogZXZlbnQub3JpZ2luLFxuICAgICAgICB0aW1lc3RhbXA6IF9ub3coKSxcbiAgICAgICAgY291bnQ6IGV2ZW50LnRvdWNoZXMubGVuZ3RoLFxuICAgICAgICBoaXN0b3J5OiBoaXN0b3J5XG4gICAgfTtcbn1cbmZ1bmN0aW9uIF9oYW5kbGVTdGFydChldmVudCkge1xuICAgIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA+IHRoaXMudG91Y2hMaW1pdClcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuaXNUb3VjaGVkID0gdHJ1ZTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzW2ldO1xuICAgICAgICB2YXIgZGF0YSA9IF90aW1lc3RhbXBUb3VjaCh0b3VjaCwgZXZlbnQsIG51bGwpO1xuICAgICAgICB0aGlzLmV2ZW50T3V0cHV0LmVtaXQoJ3RyYWNrc3RhcnQnLCBkYXRhKTtcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGl2ZSAmJiAhdGhpcy50b3VjaEhpc3RvcnlbdG91Y2guaWRlbnRpZmllcl0pXG4gICAgICAgICAgICB0aGlzLnRyYWNrKGRhdGEpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9oYW5kbGVNb3ZlKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID4gdGhpcy50b3VjaExpbWl0KVxuICAgICAgICByZXR1cm47XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXTtcbiAgICAgICAgdmFyIGhpc3RvcnkgPSB0aGlzLnRvdWNoSGlzdG9yeVt0b3VjaC5pZGVudGlmaWVyXTtcbiAgICAgICAgaWYgKGhpc3RvcnkpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gX3RpbWVzdGFtcFRvdWNoKHRvdWNoLCBldmVudCwgaGlzdG9yeSk7XG4gICAgICAgICAgICB0aGlzLnRvdWNoSGlzdG9yeVt0b3VjaC5pZGVudGlmaWVyXS5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5ldmVudE91dHB1dC5lbWl0KCd0cmFja21vdmUnLCBkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIF9oYW5kbGVFbmQoZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuaXNUb3VjaGVkKVxuICAgICAgICByZXR1cm47XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXTtcbiAgICAgICAgdmFyIGhpc3RvcnkgPSB0aGlzLnRvdWNoSGlzdG9yeVt0b3VjaC5pZGVudGlmaWVyXTtcbiAgICAgICAgaWYgKGhpc3RvcnkpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gX3RpbWVzdGFtcFRvdWNoKHRvdWNoLCBldmVudCwgaGlzdG9yeSk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50T3V0cHV0LmVtaXQoJ3RyYWNrZW5kJywgZGF0YSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy50b3VjaEhpc3RvcnlbdG91Y2guaWRlbnRpZmllcl07XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5pc1RvdWNoZWQgPSBmYWxzZTtcbn1cbmZ1bmN0aW9uIF9oYW5kbGVVbnBpcGUoKSB7XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLnRvdWNoSGlzdG9yeSkge1xuICAgICAgICB2YXIgaGlzdG9yeSA9IHRoaXMudG91Y2hIaXN0b3J5W2ldO1xuICAgICAgICB0aGlzLmV2ZW50T3V0cHV0LmVtaXQoJ3RyYWNrZW5kJywge1xuICAgICAgICAgICAgdG91Y2g6IGhpc3RvcnlbaGlzdG9yeS5sZW5ndGggLSAxXS50b3VjaCxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIGNvdW50OiAwLFxuICAgICAgICAgICAgaGlzdG9yeTogaGlzdG9yeVxuICAgICAgICB9KTtcbiAgICAgICAgZGVsZXRlIHRoaXMudG91Y2hIaXN0b3J5W2ldO1xuICAgIH1cbn1cbmZ1bmN0aW9uIFRvdWNoVHJhY2tlcihvcHRpb25zKSB7XG4gICAgdGhpcy5zZWxlY3RpdmUgPSBvcHRpb25zLnNlbGVjdGl2ZTtcbiAgICB0aGlzLnRvdWNoTGltaXQgPSBvcHRpb25zLnRvdWNoTGltaXQgfHwgMTtcbiAgICB0aGlzLnRvdWNoSGlzdG9yeSA9IHt9O1xuICAgIHRoaXMuZXZlbnRJbnB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLmV2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRJbnB1dEhhbmRsZXIodGhpcywgdGhpcy5ldmVudElucHV0KTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLmV2ZW50T3V0cHV0KTtcbiAgICB0aGlzLmV2ZW50SW5wdXQub24oJ3RvdWNoc3RhcnQnLCBfaGFuZGxlU3RhcnQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5ldmVudElucHV0Lm9uKCd0b3VjaG1vdmUnLCBfaGFuZGxlTW92ZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmV2ZW50SW5wdXQub24oJ3RvdWNoZW5kJywgX2hhbmRsZUVuZC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmV2ZW50SW5wdXQub24oJ3RvdWNoY2FuY2VsJywgX2hhbmRsZUVuZC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmV2ZW50SW5wdXQub24oJ3VucGlwZScsIF9oYW5kbGVVbnBpcGUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5pc1RvdWNoZWQgPSBmYWxzZTtcbn1cblRvdWNoVHJhY2tlci5wcm90b3R5cGUudHJhY2sgPSBmdW5jdGlvbiB0cmFjayhkYXRhKSB7XG4gICAgdGhpcy50b3VjaEhpc3RvcnlbZGF0YS5pZGVudGlmaWVyXSA9IFtkYXRhXTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFRvdWNoVHJhY2tlcjsiLCJmdW5jdGlvbiBWZWN0b3IoeCwgeSwgeikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHggIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5zZXQoeCk7XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMueCA9IHggfHwgMDtcbiAgICAgICAgdGhpcy55ID0geSB8fCAwO1xuICAgICAgICB0aGlzLnogPSB6IHx8IDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufVxudmFyIF9yZWdpc3RlciA9IG5ldyBWZWN0b3IoMCwgMCwgMCk7XG5WZWN0b3IucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZCh2KSB7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbChfcmVnaXN0ZXIsIHRoaXMueCArIHYueCwgdGhpcy55ICsgdi55LCB0aGlzLnogKyB2LnopO1xufTtcblZlY3Rvci5wcm90b3R5cGUuc3ViID0gZnVuY3Rpb24gc3ViKHYpIHtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKF9yZWdpc3RlciwgdGhpcy54IC0gdi54LCB0aGlzLnkgLSB2LnksIHRoaXMueiAtIHYueik7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5tdWx0ID0gZnVuY3Rpb24gbXVsdChyKSB7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbChfcmVnaXN0ZXIsIHIgKiB0aGlzLngsIHIgKiB0aGlzLnksIHIgKiB0aGlzLnopO1xufTtcblZlY3Rvci5wcm90b3R5cGUuZGl2ID0gZnVuY3Rpb24gZGl2KHIpIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0KDEgLyByKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmNyb3NzID0gZnVuY3Rpb24gY3Jvc3Modikge1xuICAgIHZhciB4ID0gdGhpcy54O1xuICAgIHZhciB5ID0gdGhpcy55O1xuICAgIHZhciB6ID0gdGhpcy56O1xuICAgIHZhciB2eCA9IHYueDtcbiAgICB2YXIgdnkgPSB2Lnk7XG4gICAgdmFyIHZ6ID0gdi56O1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwoX3JlZ2lzdGVyLCB6ICogdnkgLSB5ICogdnosIHggKiB2eiAtIHogKiB2eCwgeSAqIHZ4IC0geCAqIHZ5KTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyh2KSB7XG4gICAgcmV0dXJuIHYueCA9PT0gdGhpcy54ICYmIHYueSA9PT0gdGhpcy55ICYmIHYueiA9PT0gdGhpcy56O1xufTtcblZlY3Rvci5wcm90b3R5cGUucm90YXRlWCA9IGZ1bmN0aW9uIHJvdGF0ZVgodGhldGEpIHtcbiAgICB2YXIgeCA9IHRoaXMueDtcbiAgICB2YXIgeSA9IHRoaXMueTtcbiAgICB2YXIgeiA9IHRoaXMuejtcbiAgICB2YXIgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwoX3JlZ2lzdGVyLCB4LCB5ICogY29zVGhldGEgLSB6ICogc2luVGhldGEsIHkgKiBzaW5UaGV0YSArIHogKiBjb3NUaGV0YSk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5yb3RhdGVZID0gZnVuY3Rpb24gcm90YXRlWSh0aGV0YSkge1xuICAgIHZhciB4ID0gdGhpcy54O1xuICAgIHZhciB5ID0gdGhpcy55O1xuICAgIHZhciB6ID0gdGhpcy56O1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbChfcmVnaXN0ZXIsIHogKiBzaW5UaGV0YSArIHggKiBjb3NUaGV0YSwgeSwgeiAqIGNvc1RoZXRhIC0geCAqIHNpblRoZXRhKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLnJvdGF0ZVogPSBmdW5jdGlvbiByb3RhdGVaKHRoZXRhKSB7XG4gICAgdmFyIHggPSB0aGlzLng7XG4gICAgdmFyIHkgPSB0aGlzLnk7XG4gICAgdmFyIHogPSB0aGlzLno7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKF9yZWdpc3RlciwgeCAqIGNvc1RoZXRhIC0geSAqIHNpblRoZXRhLCB4ICogc2luVGhldGEgKyB5ICogY29zVGhldGEsIHopO1xufTtcblZlY3Rvci5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gZG90KHYpIHtcbiAgICByZXR1cm4gdGhpcy54ICogdi54ICsgdGhpcy55ICogdi55ICsgdGhpcy56ICogdi56O1xufTtcblZlY3Rvci5wcm90b3R5cGUubm9ybVNxdWFyZWQgPSBmdW5jdGlvbiBub3JtU3F1YXJlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5kb3QodGhpcyk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5ub3JtID0gZnVuY3Rpb24gbm9ybSgpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubm9ybVNxdWFyZWQoKSk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5ub3JtYWxpemUgPSBmdW5jdGlvbiBub3JtYWxpemUobGVuZ3RoKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICAgIGxlbmd0aCA9IDE7XG4gICAgdmFyIG5vcm0gPSB0aGlzLm5vcm0oKTtcbiAgICBpZiAobm9ybSA+IDFlLTcpXG4gICAgICAgIHJldHVybiBfc2V0RnJvbVZlY3Rvci5jYWxsKF9yZWdpc3RlciwgdGhpcy5tdWx0KGxlbmd0aCAvIG5vcm0pKTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBfc2V0WFlaLmNhbGwoX3JlZ2lzdGVyLCBsZW5ndGgsIDAsIDApO1xufTtcblZlY3Rvci5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmlzWmVybyA9IGZ1bmN0aW9uIGlzWmVybygpIHtcbiAgICByZXR1cm4gISh0aGlzLnggfHwgdGhpcy55IHx8IHRoaXMueik7XG59O1xuZnVuY3Rpb24gX3NldFhZWih4LCB5LCB6KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMueiA9IHo7XG4gICAgcmV0dXJuIHRoaXM7XG59XG5mdW5jdGlvbiBfc2V0RnJvbUFycmF5KHYpIHtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKHRoaXMsIHZbMF0sIHZbMV0sIHZbMl0gfHwgMCk7XG59XG5mdW5jdGlvbiBfc2V0RnJvbVZlY3Rvcih2KSB7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbCh0aGlzLCB2LngsIHYueSwgdi56KTtcbn1cbmZ1bmN0aW9uIF9zZXRGcm9tTnVtYmVyKHgpIHtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKHRoaXMsIHgsIDAsIDApO1xufVxuVmVjdG9yLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQodikge1xuICAgIGlmICh2IGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgIHJldHVybiBfc2V0RnJvbUFycmF5LmNhbGwodGhpcywgdik7XG4gICAgaWYgKHR5cGVvZiB2ID09PSAnbnVtYmVyJylcbiAgICAgICAgcmV0dXJuIF9zZXRGcm9tTnVtYmVyLmNhbGwodGhpcywgdik7XG4gICAgcmV0dXJuIF9zZXRGcm9tVmVjdG9yLmNhbGwodGhpcywgdik7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5zZXRYWVogPSBmdW5jdGlvbiAoeCwgeSwgeikge1xuICAgIHJldHVybiBfc2V0WFlaLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5zZXQxRCA9IGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIF9zZXRGcm9tTnVtYmVyLmNhbGwodGhpcywgeCk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5wdXQgPSBmdW5jdGlvbiBwdXQodikge1xuICAgIGlmICh0aGlzID09PSBfcmVnaXN0ZXIpXG4gICAgICAgIF9zZXRGcm9tVmVjdG9yLmNhbGwodiwgX3JlZ2lzdGVyKTtcbiAgICBlbHNlXG4gICAgICAgIF9zZXRGcm9tVmVjdG9yLmNhbGwodiwgdGhpcyk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwodGhpcywgMCwgMCwgMCk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5jYXAgPSBmdW5jdGlvbiBjYXAoY2FwKSB7XG4gICAgaWYgKGNhcCA9PT0gSW5maW5pdHkpXG4gICAgICAgIHJldHVybiBfc2V0RnJvbVZlY3Rvci5jYWxsKF9yZWdpc3RlciwgdGhpcyk7XG4gICAgdmFyIG5vcm0gPSB0aGlzLm5vcm0oKTtcbiAgICBpZiAobm9ybSA+IGNhcClcbiAgICAgICAgcmV0dXJuIF9zZXRGcm9tVmVjdG9yLmNhbGwoX3JlZ2lzdGVyLCB0aGlzLm11bHQoY2FwIC8gbm9ybSkpO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIF9zZXRGcm9tVmVjdG9yLmNhbGwoX3JlZ2lzdGVyLCB0aGlzKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLnByb2plY3QgPSBmdW5jdGlvbiBwcm9qZWN0KG4pIHtcbiAgICByZXR1cm4gbi5tdWx0KHRoaXMuZG90KG4pKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLnJlZmxlY3RBY3Jvc3MgPSBmdW5jdGlvbiByZWZsZWN0QWNyb3NzKG4pIHtcbiAgICBuLm5vcm1hbGl6ZSgpLnB1dChuKTtcbiAgICByZXR1cm4gX3NldEZyb21WZWN0b3IoX3JlZ2lzdGVyLCB0aGlzLnN1Yih0aGlzLnByb2plY3QobikubXVsdCgyKSkpO1xufTtcblZlY3Rvci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBbXG4gICAgICAgIHRoaXMueCxcbiAgICAgICAgdGhpcy55LFxuICAgICAgICB0aGlzLnpcbiAgICBdO1xufTtcblZlY3Rvci5wcm90b3R5cGUuZ2V0MUQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMueDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFZlY3RvcjsiLCJ2YXIgTW9kaWZpZXIgPSByZXF1aXJlKCcuLi9jb3JlL01vZGlmaWVyJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi4vY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBUcmFuc2l0aW9uYWJsZSA9IHJlcXVpcmUoJy4uL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlJyk7XG52YXIgVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0gPSByZXF1aXJlKCcuLi90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybScpO1xuZnVuY3Rpb24gU3RhdGVNb2RpZmllcihvcHRpb25zKSB7XG4gICAgdGhpcy5fdHJhbnNmb3JtU3RhdGUgPSBuZXcgVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0oVHJhbnNmb3JtLmlkZW50aXR5KTtcbiAgICB0aGlzLl9vcGFjaXR5U3RhdGUgPSBuZXcgVHJhbnNpdGlvbmFibGUoMSk7XG4gICAgdGhpcy5fb3JpZ2luU3RhdGUgPSBuZXcgVHJhbnNpdGlvbmFibGUoW1xuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSk7XG4gICAgdGhpcy5fYWxpZ25TdGF0ZSA9IG5ldyBUcmFuc2l0aW9uYWJsZShbXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdKTtcbiAgICB0aGlzLl9zaXplU3RhdGUgPSBuZXcgVHJhbnNpdGlvbmFibGUoW1xuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSk7XG4gICAgdGhpcy5fcHJvcG9ydGlvbnNTdGF0ZSA9IG5ldyBUcmFuc2l0aW9uYWJsZShbXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdKTtcbiAgICB0aGlzLl9tb2RpZmllciA9IG5ldyBNb2RpZmllcih7XG4gICAgICAgIHRyYW5zZm9ybTogdGhpcy5fdHJhbnNmb3JtU3RhdGUsXG4gICAgICAgIG9wYWNpdHk6IHRoaXMuX29wYWNpdHlTdGF0ZSxcbiAgICAgICAgb3JpZ2luOiBudWxsLFxuICAgICAgICBhbGlnbjogbnVsbCxcbiAgICAgICAgc2l6ZTogbnVsbCxcbiAgICAgICAgcHJvcG9ydGlvbnM6IG51bGxcbiAgICB9KTtcbiAgICB0aGlzLl9oYXNPcmlnaW4gPSBmYWxzZTtcbiAgICB0aGlzLl9oYXNBbGlnbiA9IGZhbHNlO1xuICAgIHRoaXMuX2hhc1NpemUgPSBmYWxzZTtcbiAgICB0aGlzLl9oYXNQcm9wb3J0aW9ucyA9IGZhbHNlO1xuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zLnRyYW5zZm9ybSlcbiAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKG9wdGlvbnMudHJhbnNmb3JtKTtcbiAgICAgICAgaWYgKG9wdGlvbnMub3BhY2l0eSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhpcy5zZXRPcGFjaXR5KG9wdGlvbnMub3BhY2l0eSk7XG4gICAgICAgIGlmIChvcHRpb25zLm9yaWdpbilcbiAgICAgICAgICAgIHRoaXMuc2V0T3JpZ2luKG9wdGlvbnMub3JpZ2luKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuYWxpZ24pXG4gICAgICAgICAgICB0aGlzLnNldEFsaWduKG9wdGlvbnMuYWxpZ24pO1xuICAgICAgICBpZiAob3B0aW9ucy5zaXplKVxuICAgICAgICAgICAgdGhpcy5zZXRTaXplKG9wdGlvbnMuc2l6ZSk7XG4gICAgICAgIGlmIChvcHRpb25zLnByb3BvcnRpb25zKVxuICAgICAgICAgICAgdGhpcy5zZXRQcm9wb3J0aW9ucyhvcHRpb25zLnByb3BvcnRpb25zKTtcbiAgICB9XG59XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5zZXRUcmFuc2Zvcm0gPSBmdW5jdGlvbiBzZXRUcmFuc2Zvcm0odHJhbnNmb3JtLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX3RyYW5zZm9ybVN0YXRlLnNldCh0cmFuc2Zvcm0sIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5zZXRPcGFjaXR5ID0gZnVuY3Rpb24gc2V0T3BhY2l0eShvcGFjaXR5LCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX29wYWNpdHlTdGF0ZS5zZXQob3BhY2l0eSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xufTtcblN0YXRlTW9kaWZpZXIucHJvdG90eXBlLnNldE9yaWdpbiA9IGZ1bmN0aW9uIHNldE9yaWdpbihvcmlnaW4sIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKG9yaWdpbiA9PT0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5faGFzT3JpZ2luKSB7XG4gICAgICAgICAgICB0aGlzLl9tb2RpZmllci5vcmlnaW5Gcm9tKG51bGwpO1xuICAgICAgICAgICAgdGhpcy5faGFzT3JpZ2luID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIGlmICghdGhpcy5faGFzT3JpZ2luKSB7XG4gICAgICAgIHRoaXMuX2hhc09yaWdpbiA9IHRydWU7XG4gICAgICAgIHRoaXMuX21vZGlmaWVyLm9yaWdpbkZyb20odGhpcy5fb3JpZ2luU3RhdGUpO1xuICAgIH1cbiAgICB0aGlzLl9vcmlnaW5TdGF0ZS5zZXQob3JpZ2luLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuc2V0QWxpZ24gPSBmdW5jdGlvbiBzZXRPcmlnaW4oYWxpZ24sIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKGFsaWduID09PSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLl9oYXNBbGlnbikge1xuICAgICAgICAgICAgdGhpcy5fbW9kaWZpZXIuYWxpZ25Gcm9tKG51bGwpO1xuICAgICAgICAgICAgdGhpcy5faGFzQWxpZ24gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9oYXNBbGlnbikge1xuICAgICAgICB0aGlzLl9oYXNBbGlnbiA9IHRydWU7XG4gICAgICAgIHRoaXMuX21vZGlmaWVyLmFsaWduRnJvbSh0aGlzLl9hbGlnblN0YXRlKTtcbiAgICB9XG4gICAgdGhpcy5fYWxpZ25TdGF0ZS5zZXQoYWxpZ24sIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24gc2V0U2l6ZShzaXplLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmIChzaXplID09PSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLl9oYXNTaXplKSB7XG4gICAgICAgICAgICB0aGlzLl9tb2RpZmllci5zaXplRnJvbShudWxsKTtcbiAgICAgICAgICAgIHRoaXMuX2hhc1NpemUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9oYXNTaXplKSB7XG4gICAgICAgIHRoaXMuX2hhc1NpemUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9tb2RpZmllci5zaXplRnJvbSh0aGlzLl9zaXplU3RhdGUpO1xuICAgIH1cbiAgICB0aGlzLl9zaXplU3RhdGUuc2V0KHNpemUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5zZXRQcm9wb3J0aW9ucyA9IGZ1bmN0aW9uIHNldFNpemUocHJvcG9ydGlvbnMsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHByb3BvcnRpb25zID09PSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLl9oYXNQcm9wb3J0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5fbW9kaWZpZXIucHJvcG9ydGlvbnNGcm9tKG51bGwpO1xuICAgICAgICAgICAgdGhpcy5faGFzUHJvcG9ydGlvbnMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9oYXNQcm9wb3J0aW9ucykge1xuICAgICAgICB0aGlzLl9oYXNQcm9wb3J0aW9ucyA9IHRydWU7XG4gICAgICAgIHRoaXMuX21vZGlmaWVyLnByb3BvcnRpb25zRnJvbSh0aGlzLl9wcm9wb3J0aW9uc1N0YXRlKTtcbiAgICB9XG4gICAgdGhpcy5fcHJvcG9ydGlvbnNTdGF0ZS5zZXQocHJvcG9ydGlvbnMsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5oYWx0ID0gZnVuY3Rpb24gaGFsdCgpIHtcbiAgICB0aGlzLl90cmFuc2Zvcm1TdGF0ZS5oYWx0KCk7XG4gICAgdGhpcy5fb3BhY2l0eVN0YXRlLmhhbHQoKTtcbiAgICB0aGlzLl9vcmlnaW5TdGF0ZS5oYWx0KCk7XG4gICAgdGhpcy5fYWxpZ25TdGF0ZS5oYWx0KCk7XG4gICAgdGhpcy5fc2l6ZVN0YXRlLmhhbHQoKTtcbiAgICB0aGlzLl9wcm9wb3J0aW9uc1N0YXRlLmhhbHQoKTtcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5nZXRUcmFuc2Zvcm0gPSBmdW5jdGlvbiBnZXRUcmFuc2Zvcm0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyYW5zZm9ybVN0YXRlLmdldCgpO1xufTtcblN0YXRlTW9kaWZpZXIucHJvdG90eXBlLmdldEZpbmFsVHJhbnNmb3JtID0gZnVuY3Rpb24gZ2V0RmluYWxUcmFuc2Zvcm0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyYW5zZm9ybVN0YXRlLmdldEZpbmFsKCk7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuZ2V0T3BhY2l0eSA9IGZ1bmN0aW9uIGdldE9wYWNpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wYWNpdHlTdGF0ZS5nZXQoKTtcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5nZXRPcmlnaW4gPSBmdW5jdGlvbiBnZXRPcmlnaW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc09yaWdpbiA/IHRoaXMuX29yaWdpblN0YXRlLmdldCgpIDogbnVsbDtcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5nZXRBbGlnbiA9IGZ1bmN0aW9uIGdldEFsaWduKCkge1xuICAgIHJldHVybiB0aGlzLl9oYXNBbGlnbiA/IHRoaXMuX2FsaWduU3RhdGUuZ2V0KCkgOiBudWxsO1xufTtcblN0YXRlTW9kaWZpZXIucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9oYXNTaXplID8gdGhpcy5fc2l6ZVN0YXRlLmdldCgpIDogbnVsbDtcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5nZXRQcm9wb3J0aW9ucyA9IGZ1bmN0aW9uIGdldFByb3BvcnRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLl9oYXNQcm9wb3J0aW9ucyA/IHRoaXMuX3Byb3BvcnRpb25zU3RhdGUuZ2V0KCkgOiBudWxsO1xufTtcblN0YXRlTW9kaWZpZXIucHJvdG90eXBlLm1vZGlmeSA9IGZ1bmN0aW9uIG1vZGlmeSh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kaWZpZXIubW9kaWZ5KHRhcmdldCk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTdGF0ZU1vZGlmaWVyOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuLi9jb3JlL0V2ZW50SGFuZGxlcicpO1xuZnVuY3Rpb24gUGh5c2ljc0VuZ2luZShvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShQaHlzaWNzRW5naW5lLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLl9wYXJ0aWNsZXMgPSBbXTtcbiAgICB0aGlzLl9ib2RpZXMgPSBbXTtcbiAgICB0aGlzLl9hZ2VudERhdGEgPSB7fTtcbiAgICB0aGlzLl9mb3JjZXMgPSBbXTtcbiAgICB0aGlzLl9jb25zdHJhaW50cyA9IFtdO1xuICAgIHRoaXMuX2J1ZmZlciA9IDA7XG4gICAgdGhpcy5fcHJldlRpbWUgPSBub3coKTtcbiAgICB0aGlzLl9pc1NsZWVwaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyID0gbnVsbDtcbiAgICB0aGlzLl9jdXJyQWdlbnRJZCA9IDA7XG4gICAgdGhpcy5faGFzQm9kaWVzID0gZmFsc2U7XG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyID0gbnVsbDtcbn1cbnZhciBUSU1FU1RFUCA9IDE3O1xudmFyIE1JTl9USU1FX1NURVAgPSAxMDAwIC8gMTIwO1xudmFyIE1BWF9USU1FX1NURVAgPSAxNztcbnZhciBub3cgPSBEYXRlLm5vdztcbnZhciBfZXZlbnRzID0ge1xuICAgICAgICBzdGFydDogJ3N0YXJ0JyxcbiAgICAgICAgdXBkYXRlOiAndXBkYXRlJyxcbiAgICAgICAgZW5kOiAnZW5kJ1xuICAgIH07XG5QaHlzaWNzRW5naW5lLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBjb25zdHJhaW50U3RlcHM6IDEsXG4gICAgc2xlZXBUb2xlcmFuY2U6IDFlLTcsXG4gICAgdmVsb2NpdHlDYXA6IHVuZGVmaW5lZCxcbiAgICBhbmd1bGFyVmVsb2NpdHlDYXA6IHVuZGVmaW5lZFxufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdHMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gb3B0cylcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1trZXldKVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zW2tleV0gPSBvcHRzW2tleV07XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuYWRkQm9keSA9IGZ1bmN0aW9uIGFkZEJvZHkoYm9keSkge1xuICAgIGJvZHkuX2VuZ2luZSA9IHRoaXM7XG4gICAgaWYgKGJvZHkuaXNCb2R5KSB7XG4gICAgICAgIHRoaXMuX2JvZGllcy5wdXNoKGJvZHkpO1xuICAgICAgICB0aGlzLl9oYXNCb2RpZXMgPSB0cnVlO1xuICAgIH0gZWxzZVxuICAgICAgICB0aGlzLl9wYXJ0aWNsZXMucHVzaChib2R5KTtcbiAgICBib2R5Lm9uKCdzdGFydCcsIHRoaXMud2FrZS5iaW5kKHRoaXMpKTtcbiAgICByZXR1cm4gYm9keTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5yZW1vdmVCb2R5ID0gZnVuY3Rpb24gcmVtb3ZlQm9keShib2R5KSB7XG4gICAgdmFyIGFycmF5ID0gYm9keS5pc0JvZHkgPyB0aGlzLl9ib2RpZXMgOiB0aGlzLl9wYXJ0aWNsZXM7XG4gICAgdmFyIGluZGV4ID0gYXJyYXkuaW5kZXhPZihib2R5KTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICBmb3IgKHZhciBhZ2VudCBpbiB0aGlzLl9hZ2VudERhdGEpXG4gICAgICAgICAgICB0aGlzLmRldGFjaEZyb20oYWdlbnQuaWQsIGJvZHkpO1xuICAgICAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICBpZiAodGhpcy5nZXRCb2RpZXMoKS5sZW5ndGggPT09IDApXG4gICAgICAgIHRoaXMuX2hhc0JvZGllcyA9IGZhbHNlO1xufTtcbmZ1bmN0aW9uIF9tYXBBZ2VudEFycmF5KGFnZW50KSB7XG4gICAgaWYgKGFnZW50LmFwcGx5Rm9yY2UpXG4gICAgICAgIHJldHVybiB0aGlzLl9mb3JjZXM7XG4gICAgaWYgKGFnZW50LmFwcGx5Q29uc3RyYWludClcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnN0cmFpbnRzO1xufVxuZnVuY3Rpb24gX2F0dGFjaE9uZShhZ2VudCwgdGFyZ2V0cywgc291cmNlKSB7XG4gICAgaWYgKHRhcmdldHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgdGFyZ2V0cyA9IHRoaXMuZ2V0UGFydGljbGVzQW5kQm9kaWVzKCk7XG4gICAgaWYgKCEodGFyZ2V0cyBpbnN0YW5jZW9mIEFycmF5KSlcbiAgICAgICAgdGFyZ2V0cyA9IFt0YXJnZXRzXTtcbiAgICBhZ2VudC5vbignY2hhbmdlJywgdGhpcy53YWtlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2FnZW50RGF0YVt0aGlzLl9jdXJyQWdlbnRJZF0gPSB7XG4gICAgICAgIGFnZW50OiBhZ2VudCxcbiAgICAgICAgaWQ6IHRoaXMuX2N1cnJBZ2VudElkLFxuICAgICAgICB0YXJnZXRzOiB0YXJnZXRzLFxuICAgICAgICBzb3VyY2U6IHNvdXJjZVxuICAgIH07XG4gICAgX21hcEFnZW50QXJyYXkuY2FsbCh0aGlzLCBhZ2VudCkucHVzaCh0aGlzLl9jdXJyQWdlbnRJZCk7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJBZ2VudElkKys7XG59XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5hdHRhY2ggPSBmdW5jdGlvbiBhdHRhY2goYWdlbnRzLCB0YXJnZXRzLCBzb3VyY2UpIHtcbiAgICB0aGlzLndha2UoKTtcbiAgICBpZiAoYWdlbnRzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgdmFyIGFnZW50SURzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWdlbnRzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgYWdlbnRJRHNbaV0gPSBfYXR0YWNoT25lLmNhbGwodGhpcywgYWdlbnRzW2ldLCB0YXJnZXRzLCBzb3VyY2UpO1xuICAgICAgICByZXR1cm4gYWdlbnRJRHM7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiBfYXR0YWNoT25lLmNhbGwodGhpcywgYWdlbnRzLCB0YXJnZXRzLCBzb3VyY2UpO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmF0dGFjaFRvID0gZnVuY3Rpb24gYXR0YWNoVG8oYWdlbnRJRCwgdGFyZ2V0KSB7XG4gICAgX2dldEFnZW50RGF0YS5jYWxsKHRoaXMsIGFnZW50SUQpLnRhcmdldHMucHVzaCh0YXJnZXQpO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmRldGFjaCA9IGZ1bmN0aW9uIGRldGFjaChpZCkge1xuICAgIHZhciBhZ2VudCA9IHRoaXMuZ2V0QWdlbnQoaWQpO1xuICAgIHZhciBhZ2VudEFycmF5ID0gX21hcEFnZW50QXJyYXkuY2FsbCh0aGlzLCBhZ2VudCk7XG4gICAgdmFyIGluZGV4ID0gYWdlbnRBcnJheS5pbmRleE9mKGlkKTtcbiAgICBhZ2VudEFycmF5LnNwbGljZShpbmRleCwgMSk7XG4gICAgZGVsZXRlIHRoaXMuX2FnZW50RGF0YVtpZF07XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZGV0YWNoRnJvbSA9IGZ1bmN0aW9uIGRldGFjaEZyb20oaWQsIHRhcmdldCkge1xuICAgIHZhciBib3VuZEFnZW50ID0gX2dldEFnZW50RGF0YS5jYWxsKHRoaXMsIGlkKTtcbiAgICBpZiAoYm91bmRBZ2VudC5zb3VyY2UgPT09IHRhcmdldClcbiAgICAgICAgdGhpcy5kZXRhY2goaWQpO1xuICAgIGVsc2Uge1xuICAgICAgICB2YXIgdGFyZ2V0cyA9IGJvdW5kQWdlbnQudGFyZ2V0cztcbiAgICAgICAgdmFyIGluZGV4ID0gdGFyZ2V0cy5pbmRleE9mKHRhcmdldCk7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKVxuICAgICAgICAgICAgdGFyZ2V0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5kZXRhY2hBbGwgPSBmdW5jdGlvbiBkZXRhY2hBbGwoKSB7XG4gICAgdGhpcy5fYWdlbnREYXRhID0ge307XG4gICAgdGhpcy5fZm9yY2VzID0gW107XG4gICAgdGhpcy5fY29uc3RyYWludHMgPSBbXTtcbiAgICB0aGlzLl9jdXJyQWdlbnRJZCA9IDA7XG59O1xuZnVuY3Rpb24gX2dldEFnZW50RGF0YShpZCkge1xuICAgIHJldHVybiB0aGlzLl9hZ2VudERhdGFbaWRdO1xufVxuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZ2V0QWdlbnQgPSBmdW5jdGlvbiBnZXRBZ2VudChpZCkge1xuICAgIHJldHVybiBfZ2V0QWdlbnREYXRhLmNhbGwodGhpcywgaWQpLmFnZW50O1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmdldFBhcnRpY2xlcyA9IGZ1bmN0aW9uIGdldFBhcnRpY2xlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fcGFydGljbGVzO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmdldEJvZGllcyA9IGZ1bmN0aW9uIGdldEJvZGllcygpIHtcbiAgICByZXR1cm4gdGhpcy5fYm9kaWVzO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmdldFBhcnRpY2xlc0FuZEJvZGllcyA9IGZ1bmN0aW9uIGdldFBhcnRpY2xlc0FuZEJvZGllcygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRQYXJ0aWNsZXMoKS5jb25jYXQodGhpcy5nZXRCb2RpZXMoKSk7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZm9yRWFjaFBhcnRpY2xlID0gZnVuY3Rpb24gZm9yRWFjaFBhcnRpY2xlKGZuLCBkdCkge1xuICAgIHZhciBwYXJ0aWNsZXMgPSB0aGlzLmdldFBhcnRpY2xlcygpO1xuICAgIGZvciAodmFyIGluZGV4ID0gMCwgbGVuID0gcGFydGljbGVzLmxlbmd0aDsgaW5kZXggPCBsZW47IGluZGV4KyspXG4gICAgICAgIGZuLmNhbGwodGhpcywgcGFydGljbGVzW2luZGV4XSwgZHQpO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmZvckVhY2hCb2R5ID0gZnVuY3Rpb24gZm9yRWFjaEJvZHkoZm4sIGR0KSB7XG4gICAgaWYgKCF0aGlzLl9oYXNCb2RpZXMpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgYm9kaWVzID0gdGhpcy5nZXRCb2RpZXMoKTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDAsIGxlbiA9IGJvZGllcy5sZW5ndGg7IGluZGV4IDwgbGVuOyBpbmRleCsrKVxuICAgICAgICBmbi5jYWxsKHRoaXMsIGJvZGllc1tpbmRleF0sIGR0KTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbiwgZHQpIHtcbiAgICB0aGlzLmZvckVhY2hQYXJ0aWNsZShmbiwgZHQpO1xuICAgIHRoaXMuZm9yRWFjaEJvZHkoZm4sIGR0KTtcbn07XG5mdW5jdGlvbiBfdXBkYXRlRm9yY2UoaW5kZXgpIHtcbiAgICB2YXIgYm91bmRBZ2VudCA9IF9nZXRBZ2VudERhdGEuY2FsbCh0aGlzLCB0aGlzLl9mb3JjZXNbaW5kZXhdKTtcbiAgICBib3VuZEFnZW50LmFnZW50LmFwcGx5Rm9yY2UoYm91bmRBZ2VudC50YXJnZXRzLCBib3VuZEFnZW50LnNvdXJjZSk7XG59XG5mdW5jdGlvbiBfdXBkYXRlRm9yY2VzKCkge1xuICAgIGZvciAodmFyIGluZGV4ID0gdGhpcy5fZm9yY2VzLmxlbmd0aCAtIDE7IGluZGV4ID4gLTE7IGluZGV4LS0pXG4gICAgICAgIF91cGRhdGVGb3JjZS5jYWxsKHRoaXMsIGluZGV4KTtcbn1cbmZ1bmN0aW9uIF91cGRhdGVDb25zdHJhaW50KGluZGV4LCBkdCkge1xuICAgIHZhciBib3VuZEFnZW50ID0gdGhpcy5fYWdlbnREYXRhW3RoaXMuX2NvbnN0cmFpbnRzW2luZGV4XV07XG4gICAgcmV0dXJuIGJvdW5kQWdlbnQuYWdlbnQuYXBwbHlDb25zdHJhaW50KGJvdW5kQWdlbnQudGFyZ2V0cywgYm91bmRBZ2VudC5zb3VyY2UsIGR0KTtcbn1cbmZ1bmN0aW9uIF91cGRhdGVDb25zdHJhaW50cyhkdCkge1xuICAgIHZhciBpdGVyYXRpb24gPSAwO1xuICAgIHdoaWxlIChpdGVyYXRpb24gPCB0aGlzLm9wdGlvbnMuY29uc3RyYWludFN0ZXBzKSB7XG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gdGhpcy5fY29uc3RyYWludHMubGVuZ3RoIC0gMTsgaW5kZXggPiAtMTsgaW5kZXgtLSlcbiAgICAgICAgICAgIF91cGRhdGVDb25zdHJhaW50LmNhbGwodGhpcywgaW5kZXgsIGR0KTtcbiAgICAgICAgaXRlcmF0aW9uKys7XG4gICAgfVxufVxuZnVuY3Rpb24gX3VwZGF0ZVZlbG9jaXRpZXMoYm9keSwgZHQpIHtcbiAgICBib2R5LmludGVncmF0ZVZlbG9jaXR5KGR0KTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnZlbG9jaXR5Q2FwKVxuICAgICAgICBib2R5LnZlbG9jaXR5LmNhcCh0aGlzLm9wdGlvbnMudmVsb2NpdHlDYXApLnB1dChib2R5LnZlbG9jaXR5KTtcbn1cbmZ1bmN0aW9uIF91cGRhdGVBbmd1bGFyVmVsb2NpdGllcyhib2R5LCBkdCkge1xuICAgIGJvZHkuaW50ZWdyYXRlQW5ndWxhck1vbWVudHVtKGR0KTtcbiAgICBib2R5LnVwZGF0ZUFuZ3VsYXJWZWxvY2l0eSgpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuYW5ndWxhclZlbG9jaXR5Q2FwKVxuICAgICAgICBib2R5LmFuZ3VsYXJWZWxvY2l0eS5jYXAodGhpcy5vcHRpb25zLmFuZ3VsYXJWZWxvY2l0eUNhcCkucHV0KGJvZHkuYW5ndWxhclZlbG9jaXR5KTtcbn1cbmZ1bmN0aW9uIF91cGRhdGVPcmllbnRhdGlvbnMoYm9keSwgZHQpIHtcbiAgICBib2R5LmludGVncmF0ZU9yaWVudGF0aW9uKGR0KTtcbn1cbmZ1bmN0aW9uIF91cGRhdGVQb3NpdGlvbnMoYm9keSwgZHQpIHtcbiAgICBib2R5LmludGVncmF0ZVBvc2l0aW9uKGR0KTtcbiAgICBib2R5LmVtaXQoX2V2ZW50cy51cGRhdGUsIGJvZHkpO1xufVxuZnVuY3Rpb24gX2ludGVncmF0ZShkdCkge1xuICAgIF91cGRhdGVGb3JjZXMuY2FsbCh0aGlzLCBkdCk7XG4gICAgdGhpcy5mb3JFYWNoKF91cGRhdGVWZWxvY2l0aWVzLCBkdCk7XG4gICAgdGhpcy5mb3JFYWNoQm9keShfdXBkYXRlQW5ndWxhclZlbG9jaXRpZXMsIGR0KTtcbiAgICBfdXBkYXRlQ29uc3RyYWludHMuY2FsbCh0aGlzLCBkdCk7XG4gICAgdGhpcy5mb3JFYWNoQm9keShfdXBkYXRlT3JpZW50YXRpb25zLCBkdCk7XG4gICAgdGhpcy5mb3JFYWNoKF91cGRhdGVQb3NpdGlvbnMsIGR0KTtcbn1cbmZ1bmN0aW9uIF9nZXRQYXJ0aWNsZXNFbmVyZ3koKSB7XG4gICAgdmFyIGVuZXJneSA9IDA7XG4gICAgdmFyIHBhcnRpY2xlRW5lcmd5ID0gMDtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKHBhcnRpY2xlKSB7XG4gICAgICAgIHBhcnRpY2xlRW5lcmd5ID0gcGFydGljbGUuZ2V0RW5lcmd5KCk7XG4gICAgICAgIGVuZXJneSArPSBwYXJ0aWNsZUVuZXJneTtcbiAgICB9KTtcbiAgICByZXR1cm4gZW5lcmd5O1xufVxuZnVuY3Rpb24gX2dldEFnZW50c0VuZXJneSgpIHtcbiAgICB2YXIgZW5lcmd5ID0gMDtcbiAgICBmb3IgKHZhciBpZCBpbiB0aGlzLl9hZ2VudERhdGEpXG4gICAgICAgIGVuZXJneSArPSB0aGlzLmdldEFnZW50RW5lcmd5KGlkKTtcbiAgICByZXR1cm4gZW5lcmd5O1xufVxuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZ2V0QWdlbnRFbmVyZ3kgPSBmdW5jdGlvbiAoYWdlbnRJZCkge1xuICAgIHZhciBhZ2VudERhdGEgPSBfZ2V0QWdlbnREYXRhLmNhbGwodGhpcywgYWdlbnRJZCk7XG4gICAgcmV0dXJuIGFnZW50RGF0YS5hZ2VudC5nZXRFbmVyZ3koYWdlbnREYXRhLnRhcmdldHMsIGFnZW50RGF0YS5zb3VyY2UpO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmdldEVuZXJneSA9IGZ1bmN0aW9uIGdldEVuZXJneSgpIHtcbiAgICByZXR1cm4gX2dldFBhcnRpY2xlc0VuZXJneS5jYWxsKHRoaXMpICsgX2dldEFnZW50c0VuZXJneS5jYWxsKHRoaXMpO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLnN0ZXAgPSBmdW5jdGlvbiBzdGVwKCkge1xuICAgIGlmICh0aGlzLmlzU2xlZXBpbmcoKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciBjdXJyVGltZSA9IG5vdygpO1xuICAgIHZhciBkdEZyYW1lID0gY3VyclRpbWUgLSB0aGlzLl9wcmV2VGltZTtcbiAgICB0aGlzLl9wcmV2VGltZSA9IGN1cnJUaW1lO1xuICAgIGlmIChkdEZyYW1lIDwgTUlOX1RJTUVfU1RFUClcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChkdEZyYW1lID4gTUFYX1RJTUVfU1RFUClcbiAgICAgICAgZHRGcmFtZSA9IE1BWF9USU1FX1NURVA7XG4gICAgX2ludGVncmF0ZS5jYWxsKHRoaXMsIFRJTUVTVEVQKTtcbiAgICB0aGlzLmVtaXQoX2V2ZW50cy51cGRhdGUsIHRoaXMpO1xuICAgIGlmICh0aGlzLmdldEVuZXJneSgpIDwgdGhpcy5vcHRpb25zLnNsZWVwVG9sZXJhbmNlKVxuICAgICAgICB0aGlzLnNsZWVwKCk7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuaXNTbGVlcGluZyA9IGZ1bmN0aW9uIGlzU2xlZXBpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzU2xlZXBpbmc7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiBpc1NsZWVwaW5nKCkge1xuICAgIHJldHVybiAhdGhpcy5faXNTbGVlcGluZztcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5zbGVlcCA9IGZ1bmN0aW9uIHNsZWVwKCkge1xuICAgIGlmICh0aGlzLl9pc1NsZWVwaW5nKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChib2R5KSB7XG4gICAgICAgIGJvZHkuc2xlZXAoKTtcbiAgICB9KTtcbiAgICB0aGlzLmVtaXQoX2V2ZW50cy5lbmQsIHRoaXMpO1xuICAgIHRoaXMuX2lzU2xlZXBpbmcgPSB0cnVlO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLndha2UgPSBmdW5jdGlvbiB3YWtlKCkge1xuICAgIGlmICghdGhpcy5faXNTbGVlcGluZylcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuX3ByZXZUaW1lID0gbm93KCk7XG4gICAgdGhpcy5lbWl0KF9ldmVudHMuc3RhcnQsIHRoaXMpO1xuICAgIHRoaXMuX2lzU2xlZXBpbmcgPSBmYWxzZTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBkYXRhKSB7XG4gICAgaWYgKHRoaXMuX2V2ZW50SGFuZGxlciA9PT0gbnVsbClcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuX2V2ZW50SGFuZGxlci5lbWl0KHR5cGUsIGRhdGEpO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oZXZlbnQsIGZuKSB7XG4gICAgaWYgKHRoaXMuX2V2ZW50SGFuZGxlciA9PT0gbnVsbClcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX2V2ZW50SGFuZGxlci5vbihldmVudCwgZm4pO1xufTtcbm1vZHVsZS5leHBvcnRzID0gUGh5c2ljc0VuZ2luZTsiLCJ2YXIgVmVjdG9yID0gcmVxdWlyZSgnLi4vLi4vbWF0aC9WZWN0b3InKTtcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCcuLi8uLi9jb3JlL1RyYW5zZm9ybScpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4uLy4uL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG52YXIgSW50ZWdyYXRvciA9IHJlcXVpcmUoJy4uL2ludGVncmF0b3JzL1N5bXBsZWN0aWNFdWxlcicpO1xuZnVuY3Rpb24gUGFydGljbGUob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHZhciBkZWZhdWx0cyA9IFBhcnRpY2xlLkRFRkFVTFRfT1BUSU9OUztcbiAgICB0aGlzLnBvc2l0aW9uID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMudmVsb2NpdHkgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5mb3JjZSA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLl9lbmdpbmUgPSBudWxsO1xuICAgIHRoaXMuX2lzU2xlZXBpbmcgPSB0cnVlO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbnVsbDtcbiAgICB0aGlzLm1hc3MgPSBvcHRpb25zLm1hc3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubWFzcyA6IGRlZmF1bHRzLm1hc3M7XG4gICAgdGhpcy5pbnZlcnNlTWFzcyA9IDEgLyB0aGlzLm1hc3M7XG4gICAgdGhpcy5zZXRQb3NpdGlvbihvcHRpb25zLnBvc2l0aW9uIHx8IGRlZmF1bHRzLnBvc2l0aW9uKTtcbiAgICB0aGlzLnNldFZlbG9jaXR5KG9wdGlvbnMudmVsb2NpdHkgfHwgZGVmYXVsdHMudmVsb2NpdHkpO1xuICAgIHRoaXMuZm9yY2Uuc2V0KG9wdGlvbnMuZm9yY2UgfHwgW1xuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSk7XG4gICAgdGhpcy50cmFuc2Zvcm0gPSBUcmFuc2Zvcm0uaWRlbnRpdHkuc2xpY2UoKTtcbiAgICB0aGlzLl9zcGVjID0ge1xuICAgICAgICBzaXplOiBbXG4gICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgdHJ1ZVxuICAgICAgICBdLFxuICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdGhpcy50cmFuc2Zvcm0sXG4gICAgICAgICAgICBvcmlnaW46IFtcbiAgICAgICAgICAgICAgICAwLjUsXG4gICAgICAgICAgICAgICAgMC41XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgdGFyZ2V0OiBudWxsXG4gICAgICAgIH1cbiAgICB9O1xufVxuUGFydGljbGUuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHBvc2l0aW9uOiBbXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdLFxuICAgIHZlbG9jaXR5OiBbXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdLFxuICAgIG1hc3M6IDFcbn07XG52YXIgX2V2ZW50cyA9IHtcbiAgICAgICAgc3RhcnQ6ICdzdGFydCcsXG4gICAgICAgIHVwZGF0ZTogJ3VwZGF0ZScsXG4gICAgICAgIGVuZDogJ2VuZCdcbiAgICB9O1xudmFyIG5vdyA9IERhdGUubm93O1xuUGFydGljbGUucHJvdG90eXBlLmlzQm9keSA9IGZhbHNlO1xuUGFydGljbGUucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuICF0aGlzLl9pc1NsZWVwaW5nO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5zbGVlcCA9IGZ1bmN0aW9uIHNsZWVwKCkge1xuICAgIGlmICh0aGlzLl9pc1NsZWVwaW5nKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5lbWl0KF9ldmVudHMuZW5kLCB0aGlzKTtcbiAgICB0aGlzLl9pc1NsZWVwaW5nID0gdHJ1ZTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUud2FrZSA9IGZ1bmN0aW9uIHdha2UoKSB7XG4gICAgaWYgKCF0aGlzLl9pc1NsZWVwaW5nKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5lbWl0KF9ldmVudHMuc3RhcnQsIHRoaXMpO1xuICAgIHRoaXMuX2lzU2xlZXBpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9wcmV2VGltZSA9IG5vdygpO1xuICAgIGlmICh0aGlzLl9lbmdpbmUpXG4gICAgICAgIHRoaXMuX2VuZ2luZS53YWtlKCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnNldFBvc2l0aW9uID0gZnVuY3Rpb24gc2V0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICB0aGlzLnBvc2l0aW9uLnNldChwb3NpdGlvbik7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnNldFBvc2l0aW9uMUQgPSBmdW5jdGlvbiBzZXRQb3NpdGlvbjFEKHgpIHtcbiAgICB0aGlzLnBvc2l0aW9uLnggPSB4O1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uIGdldFBvc2l0aW9uKCkge1xuICAgIHRoaXMuX2VuZ2luZS5zdGVwKCk7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24uZ2V0KCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmdldFBvc2l0aW9uMUQgPSBmdW5jdGlvbiBnZXRQb3NpdGlvbjFEKCkge1xuICAgIHRoaXMuX2VuZ2luZS5zdGVwKCk7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24ueDtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuc2V0VmVsb2NpdHkgPSBmdW5jdGlvbiBzZXRWZWxvY2l0eSh2ZWxvY2l0eSkge1xuICAgIHRoaXMudmVsb2NpdHkuc2V0KHZlbG9jaXR5KTtcbiAgICBpZiAoISh2ZWxvY2l0eVswXSA9PT0gMCAmJiB2ZWxvY2l0eVsxXSA9PT0gMCAmJiB2ZWxvY2l0eVsyXSA9PT0gMCkpXG4gICAgICAgIHRoaXMud2FrZSgpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5zZXRWZWxvY2l0eTFEID0gZnVuY3Rpb24gc2V0VmVsb2NpdHkxRCh4KSB7XG4gICAgdGhpcy52ZWxvY2l0eS54ID0geDtcbiAgICBpZiAoeCAhPT0gMClcbiAgICAgICAgdGhpcy53YWtlKCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmdldFZlbG9jaXR5ID0gZnVuY3Rpb24gZ2V0VmVsb2NpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMudmVsb2NpdHkuZ2V0KCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnNldEZvcmNlID0gZnVuY3Rpb24gc2V0Rm9yY2UoZm9yY2UpIHtcbiAgICB0aGlzLmZvcmNlLnNldChmb3JjZSk7XG4gICAgdGhpcy53YWtlKCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmdldFZlbG9jaXR5MUQgPSBmdW5jdGlvbiBnZXRWZWxvY2l0eTFEKCkge1xuICAgIHJldHVybiB0aGlzLnZlbG9jaXR5Lng7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnNldE1hc3MgPSBmdW5jdGlvbiBzZXRNYXNzKG1hc3MpIHtcbiAgICB0aGlzLm1hc3MgPSBtYXNzO1xuICAgIHRoaXMuaW52ZXJzZU1hc3MgPSAxIC8gbWFzcztcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuZ2V0TWFzcyA9IGZ1bmN0aW9uIGdldE1hc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFzcztcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiByZXNldChwb3NpdGlvbiwgdmVsb2NpdHkpIHtcbiAgICB0aGlzLnNldFBvc2l0aW9uKHBvc2l0aW9uIHx8IFtcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0pO1xuICAgIHRoaXMuc2V0VmVsb2NpdHkodmVsb2NpdHkgfHwgW1xuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmFwcGx5Rm9yY2UgPSBmdW5jdGlvbiBhcHBseUZvcmNlKGZvcmNlKSB7XG4gICAgaWYgKGZvcmNlLmlzWmVybygpKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5mb3JjZS5hZGQoZm9yY2UpLnB1dCh0aGlzLmZvcmNlKTtcbiAgICB0aGlzLndha2UoKTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuYXBwbHlJbXB1bHNlID0gZnVuY3Rpb24gYXBwbHlJbXB1bHNlKGltcHVsc2UpIHtcbiAgICBpZiAoaW1wdWxzZS5pc1plcm8oKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciB2ZWxvY2l0eSA9IHRoaXMudmVsb2NpdHk7XG4gICAgdmVsb2NpdHkuYWRkKGltcHVsc2UubXVsdCh0aGlzLmludmVyc2VNYXNzKSkucHV0KHZlbG9jaXR5KTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuaW50ZWdyYXRlVmVsb2NpdHkgPSBmdW5jdGlvbiBpbnRlZ3JhdGVWZWxvY2l0eShkdCkge1xuICAgIEludGVncmF0b3IuaW50ZWdyYXRlVmVsb2NpdHkodGhpcywgZHQpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5pbnRlZ3JhdGVQb3NpdGlvbiA9IGZ1bmN0aW9uIGludGVncmF0ZVBvc2l0aW9uKGR0KSB7XG4gICAgSW50ZWdyYXRvci5pbnRlZ3JhdGVQb3NpdGlvbih0aGlzLCBkdCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLl9pbnRlZ3JhdGUgPSBmdW5jdGlvbiBfaW50ZWdyYXRlKGR0KSB7XG4gICAgdGhpcy5pbnRlZ3JhdGVWZWxvY2l0eShkdCk7XG4gICAgdGhpcy5pbnRlZ3JhdGVQb3NpdGlvbihkdCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmdldEVuZXJneSA9IGZ1bmN0aW9uIGdldEVuZXJneSgpIHtcbiAgICByZXR1cm4gMC41ICogdGhpcy5tYXNzICogdGhpcy52ZWxvY2l0eS5ub3JtU3F1YXJlZCgpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5nZXRUcmFuc2Zvcm0gPSBmdW5jdGlvbiBnZXRUcmFuc2Zvcm0oKSB7XG4gICAgdGhpcy5fZW5naW5lLnN0ZXAoKTtcbiAgICB2YXIgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uO1xuICAgIHZhciB0cmFuc2Zvcm0gPSB0aGlzLnRyYW5zZm9ybTtcbiAgICB0cmFuc2Zvcm1bMTJdID0gcG9zaXRpb24ueDtcbiAgICB0cmFuc2Zvcm1bMTNdID0gcG9zaXRpb24ueTtcbiAgICB0cmFuc2Zvcm1bMTRdID0gcG9zaXRpb24uejtcbiAgICByZXR1cm4gdHJhbnNmb3JtO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5tb2RpZnkgPSBmdW5jdGlvbiBtb2RpZnkodGFyZ2V0KSB7XG4gICAgdmFyIF9zcGVjID0gdGhpcy5fc3BlYy50YXJnZXQ7XG4gICAgX3NwZWMudHJhbnNmb3JtID0gdGhpcy5nZXRUcmFuc2Zvcm0oKTtcbiAgICBfc3BlYy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgcmV0dXJuIHRoaXMuX3NwZWM7XG59O1xuZnVuY3Rpb24gX2NyZWF0ZUV2ZW50T3V0cHV0KCkge1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmJpbmRUaGlzKHRoaXMpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50T3V0cHV0KTtcbn1cblBhcnRpY2xlLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBkYXRhKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudE91dHB1dClcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQodHlwZSwgZGF0YSk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMub24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcigpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5yZW1vdmVMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gcGlwZSgpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5waXBlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnVucGlwZSA9IGZ1bmN0aW9uIHVucGlwZSgpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy51bnBpcGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFBhcnRpY2xlOyIsInZhciBWZWN0b3IgPSByZXF1aXJlKCcuLi8uLi9tYXRoL1ZlY3RvcicpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4uLy4uL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG5mdW5jdGlvbiBGb3JjZShmb3JjZSkge1xuICAgIHRoaXMuZm9yY2UgPSBuZXcgVmVjdG9yKGZvcmNlKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudE91dHB1dCk7XG59XG5Gb3JjZS5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2NoYW5nZScsIG9wdGlvbnMpO1xufTtcbkZvcmNlLnByb3RvdHlwZS5hcHBseUZvcmNlID0gZnVuY3Rpb24gYXBwbHlGb3JjZSh0YXJnZXRzKSB7XG4gICAgdmFyIGxlbmd0aCA9IHRhcmdldHMubGVuZ3RoO1xuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICB0YXJnZXRzW2xlbmd0aF0uYXBwbHlGb3JjZSh0aGlzLmZvcmNlKTtcbiAgICB9XG59O1xuRm9yY2UucHJvdG90eXBlLmdldEVuZXJneSA9IGZ1bmN0aW9uIGdldEVuZXJneSgpIHtcbiAgICByZXR1cm4gMDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEZvcmNlOyIsInZhciBGb3JjZSA9IHJlcXVpcmUoJy4vRm9yY2UnKTtcbnZhciBWZWN0b3IgPSByZXF1aXJlKCcuLi8uLi9tYXRoL1ZlY3RvcicpO1xuZnVuY3Rpb24gU3ByaW5nKG9wdGlvbnMpIHtcbiAgICBGb3JjZS5jYWxsKHRoaXMpO1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUodGhpcy5jb25zdHJ1Y3Rvci5ERUZBVUxUX09QVElPTlMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5kaXNwID0gbmV3IFZlY3RvcigwLCAwLCAwKTtcbiAgICBfaW5pdC5jYWxsKHRoaXMpO1xufVxuU3ByaW5nLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRm9yY2UucHJvdG90eXBlKTtcblNwcmluZy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTcHJpbmc7XG52YXIgcGkgPSBNYXRoLlBJO1xudmFyIE1JTl9QRVJJT0QgPSAxNTA7XG5TcHJpbmcuRk9SQ0VfRlVOQ1RJT05TID0ge1xuICAgIEZFTkU6IGZ1bmN0aW9uIChkaXN0LCByTWF4KSB7XG4gICAgICAgIHZhciByTWF4U21hbGwgPSByTWF4ICogMC45OTtcbiAgICAgICAgdmFyIHIgPSBNYXRoLm1heChNYXRoLm1pbihkaXN0LCByTWF4U21hbGwpLCAtck1heFNtYWxsKTtcbiAgICAgICAgcmV0dXJuIHIgLyAoMSAtIHIgKiByIC8gKHJNYXggKiByTWF4KSk7XG4gICAgfSxcbiAgICBIT09LOiBmdW5jdGlvbiAoZGlzdCkge1xuICAgICAgICByZXR1cm4gZGlzdDtcbiAgICB9XG59O1xuU3ByaW5nLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBwZXJpb2Q6IDMwMCxcbiAgICBkYW1waW5nUmF0aW86IDAuMSxcbiAgICBsZW5ndGg6IDAsXG4gICAgbWF4TGVuZ3RoOiBJbmZpbml0eSxcbiAgICBhbmNob3I6IHVuZGVmaW5lZCxcbiAgICBmb3JjZUZ1bmN0aW9uOiBTcHJpbmcuRk9SQ0VfRlVOQ1RJT05TLkhPT0tcbn07XG5mdW5jdGlvbiBfY2FsY1N0aWZmbmVzcygpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICBvcHRpb25zLnN0aWZmbmVzcyA9IE1hdGgucG93KDIgKiBwaSAvIG9wdGlvbnMucGVyaW9kLCAyKTtcbn1cbmZ1bmN0aW9uIF9jYWxjRGFtcGluZygpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICBvcHRpb25zLmRhbXBpbmcgPSA0ICogcGkgKiBvcHRpb25zLmRhbXBpbmdSYXRpbyAvIG9wdGlvbnMucGVyaW9kO1xufVxuZnVuY3Rpb24gX2luaXQoKSB7XG4gICAgX2NhbGNTdGlmZm5lc3MuY2FsbCh0aGlzKTtcbiAgICBfY2FsY0RhbXBpbmcuY2FsbCh0aGlzKTtcbn1cblNwcmluZy5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmFuY2hvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmFuY2hvci5wb3NpdGlvbiBpbnN0YW5jZW9mIFZlY3RvcilcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hbmNob3IgPSBvcHRpb25zLmFuY2hvci5wb3NpdGlvbjtcbiAgICAgICAgaWYgKG9wdGlvbnMuYW5jaG9yIGluc3RhbmNlb2YgVmVjdG9yKVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFuY2hvciA9IG9wdGlvbnMuYW5jaG9yO1xuICAgICAgICBpZiAob3B0aW9ucy5hbmNob3IgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hbmNob3IgPSBuZXcgVmVjdG9yKG9wdGlvbnMuYW5jaG9yKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMucGVyaW9kICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMucGVyaW9kIDwgTUlOX1BFUklPRCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wZXJpb2QgPSBNSU5fUEVSSU9EO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdUaGUgcGVyaW9kIG9mIGEgU3ByaW5nVHJhbnNpdGlvbiBpcyBjYXBwZWQgYXQgJyArIE1JTl9QRVJJT0QgKyAnIG1zLiBVc2UgYSBTbmFwVHJhbnNpdGlvbiBmb3IgZmFzdGVyIHRyYW5zaXRpb25zJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcHRpb25zLnBlcmlvZCA9IG9wdGlvbnMucGVyaW9kO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5kYW1waW5nUmF0aW8gIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmRhbXBpbmdSYXRpbyA9IG9wdGlvbnMuZGFtcGluZ1JhdGlvO1xuICAgIGlmIChvcHRpb25zLmxlbmd0aCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMubGVuZ3RoID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgaWYgKG9wdGlvbnMuZm9yY2VGdW5jdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMuZm9yY2VGdW5jdGlvbiA9IG9wdGlvbnMuZm9yY2VGdW5jdGlvbjtcbiAgICBpZiAob3B0aW9ucy5tYXhMZW5ndGggIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLm1heExlbmd0aCA9IG9wdGlvbnMubWF4TGVuZ3RoO1xuICAgIF9pbml0LmNhbGwodGhpcyk7XG4gICAgRm9yY2UucHJvdG90eXBlLnNldE9wdGlvbnMuY2FsbCh0aGlzLCBvcHRpb25zKTtcbn07XG5TcHJpbmcucHJvdG90eXBlLmFwcGx5Rm9yY2UgPSBmdW5jdGlvbiBhcHBseUZvcmNlKHRhcmdldHMsIHNvdXJjZSkge1xuICAgIHZhciBmb3JjZSA9IHRoaXMuZm9yY2U7XG4gICAgdmFyIGRpc3AgPSB0aGlzLmRpc3A7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgdmFyIHN0aWZmbmVzcyA9IG9wdGlvbnMuc3RpZmZuZXNzO1xuICAgIHZhciBkYW1waW5nID0gb3B0aW9ucy5kYW1waW5nO1xuICAgIHZhciByZXN0TGVuZ3RoID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgdmFyIG1heExlbmd0aCA9IG9wdGlvbnMubWF4TGVuZ3RoO1xuICAgIHZhciBhbmNob3IgPSBvcHRpb25zLmFuY2hvciB8fCBzb3VyY2UucG9zaXRpb247XG4gICAgdmFyIGZvcmNlRnVuY3Rpb24gPSBvcHRpb25zLmZvcmNlRnVuY3Rpb247XG4gICAgdmFyIGk7XG4gICAgdmFyIHRhcmdldDtcbiAgICB2YXIgcDI7XG4gICAgdmFyIHYyO1xuICAgIHZhciBkaXN0O1xuICAgIHZhciBtO1xuICAgIGZvciAoaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRhcmdldCA9IHRhcmdldHNbaV07XG4gICAgICAgIHAyID0gdGFyZ2V0LnBvc2l0aW9uO1xuICAgICAgICB2MiA9IHRhcmdldC52ZWxvY2l0eTtcbiAgICAgICAgYW5jaG9yLnN1YihwMikucHV0KGRpc3ApO1xuICAgICAgICBkaXN0ID0gZGlzcC5ub3JtKCkgLSByZXN0TGVuZ3RoO1xuICAgICAgICBpZiAoZGlzdCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbSA9IHRhcmdldC5tYXNzO1xuICAgICAgICBzdGlmZm5lc3MgKj0gbTtcbiAgICAgICAgZGFtcGluZyAqPSBtO1xuICAgICAgICBkaXNwLm5vcm1hbGl6ZShzdGlmZm5lc3MgKiBmb3JjZUZ1bmN0aW9uKGRpc3QsIG1heExlbmd0aCkpLnB1dChmb3JjZSk7XG4gICAgICAgIGlmIChkYW1waW5nKVxuICAgICAgICAgICAgaWYgKHNvdXJjZSlcbiAgICAgICAgICAgICAgICBmb3JjZS5hZGQodjIuc3ViKHNvdXJjZS52ZWxvY2l0eSkubXVsdCgtZGFtcGluZykpLnB1dChmb3JjZSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZm9yY2UuYWRkKHYyLm11bHQoLWRhbXBpbmcpKS5wdXQoZm9yY2UpO1xuICAgICAgICB0YXJnZXQuYXBwbHlGb3JjZShmb3JjZSk7XG4gICAgICAgIGlmIChzb3VyY2UpXG4gICAgICAgICAgICBzb3VyY2UuYXBwbHlGb3JjZShmb3JjZS5tdWx0KC0xKSk7XG4gICAgfVxufTtcblNwcmluZy5wcm90b3R5cGUuZ2V0RW5lcmd5ID0gZnVuY3Rpb24gZ2V0RW5lcmd5KHRhcmdldHMsIHNvdXJjZSkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIHZhciByZXN0TGVuZ3RoID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgdmFyIGFuY2hvciA9IHNvdXJjZSA/IHNvdXJjZS5wb3NpdGlvbiA6IG9wdGlvbnMuYW5jaG9yO1xuICAgIHZhciBzdHJlbmd0aCA9IG9wdGlvbnMuc3RpZmZuZXNzO1xuICAgIHZhciBlbmVyZ3kgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFyZ2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gdGFyZ2V0c1tpXTtcbiAgICAgICAgdmFyIGRpc3QgPSBhbmNob3Iuc3ViKHRhcmdldC5wb3NpdGlvbikubm9ybSgpIC0gcmVzdExlbmd0aDtcbiAgICAgICAgZW5lcmd5ICs9IDAuNSAqIHN0cmVuZ3RoICogZGlzdCAqIGRpc3Q7XG4gICAgfVxuICAgIHJldHVybiBlbmVyZ3k7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTcHJpbmc7IiwidmFyIFN5bXBsZWN0aWNFdWxlciA9IHt9O1xuU3ltcGxlY3RpY0V1bGVyLmludGVncmF0ZVZlbG9jaXR5ID0gZnVuY3Rpb24gaW50ZWdyYXRlVmVsb2NpdHkoYm9keSwgZHQpIHtcbiAgICB2YXIgdiA9IGJvZHkudmVsb2NpdHk7XG4gICAgdmFyIHcgPSBib2R5LmludmVyc2VNYXNzO1xuICAgIHZhciBmID0gYm9keS5mb3JjZTtcbiAgICBpZiAoZi5pc1plcm8oKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHYuYWRkKGYubXVsdChkdCAqIHcpKS5wdXQodik7XG4gICAgZi5jbGVhcigpO1xufTtcblN5bXBsZWN0aWNFdWxlci5pbnRlZ3JhdGVQb3NpdGlvbiA9IGZ1bmN0aW9uIGludGVncmF0ZVBvc2l0aW9uKGJvZHksIGR0KSB7XG4gICAgdmFyIHAgPSBib2R5LnBvc2l0aW9uO1xuICAgIHZhciB2ID0gYm9keS52ZWxvY2l0eTtcbiAgICBwLmFkZCh2Lm11bHQoZHQpKS5wdXQocCk7XG59O1xuU3ltcGxlY3RpY0V1bGVyLmludGVncmF0ZUFuZ3VsYXJNb21lbnR1bSA9IGZ1bmN0aW9uIGludGVncmF0ZUFuZ3VsYXJNb21lbnR1bShib2R5LCBkdCkge1xuICAgIHZhciBMID0gYm9keS5hbmd1bGFyTW9tZW50dW07XG4gICAgdmFyIHQgPSBib2R5LnRvcnF1ZTtcbiAgICBpZiAodC5pc1plcm8oKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIEwuYWRkKHQubXVsdChkdCkpLnB1dChMKTtcbiAgICB0LmNsZWFyKCk7XG59O1xuU3ltcGxlY3RpY0V1bGVyLmludGVncmF0ZU9yaWVudGF0aW9uID0gZnVuY3Rpb24gaW50ZWdyYXRlT3JpZW50YXRpb24oYm9keSwgZHQpIHtcbiAgICB2YXIgcSA9IGJvZHkub3JpZW50YXRpb247XG4gICAgdmFyIHcgPSBib2R5LmFuZ3VsYXJWZWxvY2l0eTtcbiAgICBpZiAody5pc1plcm8oKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHEuYWRkKHEubXVsdGlwbHkodykuc2NhbGFyTXVsdGlwbHkoMC41ICogZHQpKS5wdXQocSk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTeW1wbGVjdGljRXVsZXI7IiwidmFyIFN1cmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL1N1cmZhY2UnKTtcbmZ1bmN0aW9uIEltYWdlU3VyZmFjZShvcHRpb25zKSB7XG4gICAgdGhpcy5faW1hZ2VVcmwgPSB1bmRlZmluZWQ7XG4gICAgU3VyZmFjZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxudmFyIHVybENhY2hlID0gW107XG52YXIgY291bnRDYWNoZSA9IFtdO1xudmFyIG5vZGVDYWNoZSA9IFtdO1xudmFyIGNhY2hlRW5hYmxlZCA9IHRydWU7XG5JbWFnZVN1cmZhY2UuZW5hYmxlQ2FjaGUgPSBmdW5jdGlvbiBlbmFibGVDYWNoZSgpIHtcbiAgICBjYWNoZUVuYWJsZWQgPSB0cnVlO1xufTtcbkltYWdlU3VyZmFjZS5kaXNhYmxlQ2FjaGUgPSBmdW5jdGlvbiBkaXNhYmxlQ2FjaGUoKSB7XG4gICAgY2FjaGVFbmFibGVkID0gZmFsc2U7XG59O1xuSW1hZ2VTdXJmYWNlLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiBjbGVhckNhY2hlKCkge1xuICAgIHVybENhY2hlID0gW107XG4gICAgY291bnRDYWNoZSA9IFtdO1xuICAgIG5vZGVDYWNoZSA9IFtdO1xufTtcbkltYWdlU3VyZmFjZS5nZXRDYWNoZSA9IGZ1bmN0aW9uIGdldENhY2hlKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHVybENhY2hlOiB1cmxDYWNoZSxcbiAgICAgICAgY291bnRDYWNoZTogY291bnRDYWNoZSxcbiAgICAgICAgbm9kZUNhY2hlOiBjb3VudENhY2hlXG4gICAgfTtcbn07XG5JbWFnZVN1cmZhY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdXJmYWNlLnByb3RvdHlwZSk7XG5JbWFnZVN1cmZhY2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gSW1hZ2VTdXJmYWNlO1xuSW1hZ2VTdXJmYWNlLnByb3RvdHlwZS5lbGVtZW50VHlwZSA9ICdpbWcnO1xuSW1hZ2VTdXJmYWNlLnByb3RvdHlwZS5lbGVtZW50Q2xhc3MgPSAnZmFtb3VzLXN1cmZhY2UnO1xuSW1hZ2VTdXJmYWNlLnByb3RvdHlwZS5zZXRDb250ZW50ID0gZnVuY3Rpb24gc2V0Q29udGVudChpbWFnZVVybCkge1xuICAgIHZhciB1cmxJbmRleCA9IHVybENhY2hlLmluZGV4T2YodGhpcy5faW1hZ2VVcmwpO1xuICAgIGlmICh1cmxJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgaWYgKGNvdW50Q2FjaGVbdXJsSW5kZXhdID09PSAxKSB7XG4gICAgICAgICAgICB1cmxDYWNoZS5zcGxpY2UodXJsSW5kZXgsIDEpO1xuICAgICAgICAgICAgY291bnRDYWNoZS5zcGxpY2UodXJsSW5kZXgsIDEpO1xuICAgICAgICAgICAgbm9kZUNhY2hlLnNwbGljZSh1cmxJbmRleCwgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb3VudENhY2hlW3VybEluZGV4XS0tO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVybEluZGV4ID0gdXJsQ2FjaGUuaW5kZXhPZihpbWFnZVVybCk7XG4gICAgaWYgKHVybEluZGV4ID09PSAtMSkge1xuICAgICAgICB1cmxDYWNoZS5wdXNoKGltYWdlVXJsKTtcbiAgICAgICAgY291bnRDYWNoZS5wdXNoKDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvdW50Q2FjaGVbdXJsSW5kZXhdKys7XG4gICAgfVxuICAgIHRoaXMuX2ltYWdlVXJsID0gaW1hZ2VVcmw7XG4gICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcbn07XG5JbWFnZVN1cmZhY2UucHJvdG90eXBlLmRlcGxveSA9IGZ1bmN0aW9uIGRlcGxveSh0YXJnZXQpIHtcbiAgICB2YXIgdXJsSW5kZXggPSB1cmxDYWNoZS5pbmRleE9mKHRoaXMuX2ltYWdlVXJsKTtcbiAgICBpZiAobm9kZUNhY2hlW3VybEluZGV4XSA9PT0gdW5kZWZpbmVkICYmIGNhY2hlRW5hYmxlZCkge1xuICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltZy5zcmMgPSB0aGlzLl9pbWFnZVVybCB8fCAnJztcbiAgICAgICAgbm9kZUNhY2hlW3VybEluZGV4XSA9IGltZztcbiAgICB9XG4gICAgdGFyZ2V0LnNyYyA9IHRoaXMuX2ltYWdlVXJsIHx8ICcnO1xufTtcbkltYWdlU3VyZmFjZS5wcm90b3R5cGUucmVjYWxsID0gZnVuY3Rpb24gcmVjYWxsKHRhcmdldCkge1xuICAgIHRhcmdldC5zcmMgPSAnJztcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEltYWdlU3VyZmFjZTsiLCJ2YXIgVXRpbGl0eSA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9VdGlsaXR5Jyk7XG5mdW5jdGlvbiBNdWx0aXBsZVRyYW5zaXRpb24obWV0aG9kKSB7XG4gICAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XG4gICAgdGhpcy5faW5zdGFuY2VzID0gW107XG4gICAgdGhpcy5zdGF0ZSA9IFtdO1xufVxuTXVsdGlwbGVUcmFuc2l0aW9uLlNVUFBPUlRTX01VTFRJUExFID0gdHJ1ZTtcbk11bHRpcGxlVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5faW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuc3RhdGVbaV0gPSB0aGlzLl9pbnN0YW5jZXNbaV0uZ2V0KCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN0YXRlO1xufTtcbk11bHRpcGxlVHJhbnNpdGlvbi5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KGVuZFN0YXRlLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHZhciBfYWxsQ2FsbGJhY2sgPSBVdGlsaXR5LmFmdGVyKGVuZFN0YXRlLmxlbmd0aCwgY2FsbGJhY2spO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW5kU3RhdGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZXNbaV0pXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZXNbaV0gPSBuZXcgdGhpcy5tZXRob2QoKTtcbiAgICAgICAgdGhpcy5faW5zdGFuY2VzW2ldLnNldChlbmRTdGF0ZVtpXSwgdHJhbnNpdGlvbiwgX2FsbENhbGxiYWNrKTtcbiAgICB9XG59O1xuTXVsdGlwbGVUcmFuc2l0aW9uLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KHN0YXJ0U3RhdGUpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXJ0U3RhdGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZXNbaV0pXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZXNbaV0gPSBuZXcgdGhpcy5tZXRob2QoKTtcbiAgICAgICAgdGhpcy5faW5zdGFuY2VzW2ldLnJlc2V0KHN0YXJ0U3RhdGVbaV0pO1xuICAgIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IE11bHRpcGxlVHJhbnNpdGlvbjsiLCJ2YXIgUEUgPSByZXF1aXJlKCcuLi9waHlzaWNzL1BoeXNpY3NFbmdpbmUnKTtcbnZhciBQYXJ0aWNsZSA9IHJlcXVpcmUoJy4uL3BoeXNpY3MvYm9kaWVzL1BhcnRpY2xlJyk7XG52YXIgU3ByaW5nID0gcmVxdWlyZSgnLi4vcGh5c2ljcy9mb3JjZXMvU3ByaW5nJyk7XG52YXIgVmVjdG9yID0gcmVxdWlyZSgnLi4vbWF0aC9WZWN0b3InKTtcbmZ1bmN0aW9uIFNwcmluZ1RyYW5zaXRpb24oc3RhdGUpIHtcbiAgICBzdGF0ZSA9IHN0YXRlIHx8IDA7XG4gICAgdGhpcy5lbmRTdGF0ZSA9IG5ldyBWZWN0b3Ioc3RhdGUpO1xuICAgIHRoaXMuaW5pdFN0YXRlID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMuX2RpbWVuc2lvbnMgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcmVzdFRvbGVyYW5jZSA9IDFlLTEwO1xuICAgIHRoaXMuX2Fic1Jlc3RUb2xlcmFuY2UgPSB0aGlzLl9yZXN0VG9sZXJhbmNlO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuUEUgPSBuZXcgUEUoKTtcbiAgICB0aGlzLnNwcmluZyA9IG5ldyBTcHJpbmcoeyBhbmNob3I6IHRoaXMuZW5kU3RhdGUgfSk7XG4gICAgdGhpcy5wYXJ0aWNsZSA9IG5ldyBQYXJ0aWNsZSgpO1xuICAgIHRoaXMuUEUuYWRkQm9keSh0aGlzLnBhcnRpY2xlKTtcbiAgICB0aGlzLlBFLmF0dGFjaCh0aGlzLnNwcmluZywgdGhpcy5wYXJ0aWNsZSk7XG59XG5TcHJpbmdUcmFuc2l0aW9uLlNVUFBPUlRTX01VTFRJUExFID0gMztcblNwcmluZ1RyYW5zaXRpb24uREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHBlcmlvZDogMzAwLFxuICAgIGRhbXBpbmdSYXRpbzogMC41LFxuICAgIHZlbG9jaXR5OiAwXG59O1xuZnVuY3Rpb24gX2dldEVuZXJneSgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJ0aWNsZS5nZXRFbmVyZ3koKSArIHRoaXMuc3ByaW5nLmdldEVuZXJneShbdGhpcy5wYXJ0aWNsZV0pO1xufVxuZnVuY3Rpb24gX3NldFBhcnRpY2xlUG9zaXRpb24ocCkge1xuICAgIHRoaXMucGFydGljbGUuc2V0UG9zaXRpb24ocCk7XG59XG5mdW5jdGlvbiBfc2V0UGFydGljbGVWZWxvY2l0eSh2KSB7XG4gICAgdGhpcy5wYXJ0aWNsZS5zZXRWZWxvY2l0eSh2KTtcbn1cbmZ1bmN0aW9uIF9nZXRQYXJ0aWNsZVBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9kaW1lbnNpb25zID09PSAwID8gdGhpcy5wYXJ0aWNsZS5nZXRQb3NpdGlvbjFEKCkgOiB0aGlzLnBhcnRpY2xlLmdldFBvc2l0aW9uKCk7XG59XG5mdW5jdGlvbiBfZ2V0UGFydGljbGVWZWxvY2l0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGltZW5zaW9ucyA9PT0gMCA/IHRoaXMucGFydGljbGUuZ2V0VmVsb2NpdHkxRCgpIDogdGhpcy5wYXJ0aWNsZS5nZXRWZWxvY2l0eSgpO1xufVxuZnVuY3Rpb24gX3NldENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbn1cbmZ1bmN0aW9uIF93YWtlKCkge1xuICAgIHRoaXMuUEUud2FrZSgpO1xufVxuZnVuY3Rpb24gX3NsZWVwKCkge1xuICAgIHRoaXMuUEUuc2xlZXAoKTtcbn1cbmZ1bmN0aW9uIF91cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuUEUuaXNTbGVlcGluZygpKSB7XG4gICAgICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGNiID0gdGhpcy5fY2FsbGJhY2s7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNiKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoX2dldEVuZXJneS5jYWxsKHRoaXMpIDwgdGhpcy5fYWJzUmVzdFRvbGVyYW5jZSkge1xuICAgICAgICBfc2V0UGFydGljbGVQb3NpdGlvbi5jYWxsKHRoaXMsIHRoaXMuZW5kU3RhdGUpO1xuICAgICAgICBfc2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMsIFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdKTtcbiAgICAgICAgX3NsZWVwLmNhbGwodGhpcyk7XG4gICAgfVxufVxuZnVuY3Rpb24gX3NldHVwRGVmaW5pdGlvbihkZWZpbml0aW9uKSB7XG4gICAgdmFyIGRlZmF1bHRzID0gU3ByaW5nVHJhbnNpdGlvbi5ERUZBVUxUX09QVElPTlM7XG4gICAgaWYgKGRlZmluaXRpb24ucGVyaW9kID09PSB1bmRlZmluZWQpXG4gICAgICAgIGRlZmluaXRpb24ucGVyaW9kID0gZGVmYXVsdHMucGVyaW9kO1xuICAgIGlmIChkZWZpbml0aW9uLmRhbXBpbmdSYXRpbyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBkZWZpbml0aW9uLmRhbXBpbmdSYXRpbyA9IGRlZmF1bHRzLmRhbXBpbmdSYXRpbztcbiAgICBpZiAoZGVmaW5pdGlvbi52ZWxvY2l0eSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBkZWZpbml0aW9uLnZlbG9jaXR5ID0gZGVmYXVsdHMudmVsb2NpdHk7XG4gICAgaWYgKGRlZmluaXRpb24ucGVyaW9kIDwgMTUwKSB7XG4gICAgICAgIGRlZmluaXRpb24ucGVyaW9kID0gMTUwO1xuICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSBwZXJpb2Qgb2YgYSBTcHJpbmdUcmFuc2l0aW9uIGlzIGNhcHBlZCBhdCAxNTAgbXMuIFVzZSBhIFNuYXBUcmFuc2l0aW9uIGZvciBmYXN0ZXIgdHJhbnNpdGlvbnMnKTtcbiAgICB9XG4gICAgdGhpcy5zcHJpbmcuc2V0T3B0aW9ucyh7XG4gICAgICAgIHBlcmlvZDogZGVmaW5pdGlvbi5wZXJpb2QsXG4gICAgICAgIGRhbXBpbmdSYXRpbzogZGVmaW5pdGlvbi5kYW1waW5nUmF0aW9cbiAgICB9KTtcbiAgICBfc2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMsIGRlZmluaXRpb24udmVsb2NpdHkpO1xufVxuZnVuY3Rpb24gX3NldEFic29sdXRlUmVzdFRvbGVyYW5jZSgpIHtcbiAgICB2YXIgZGlzdGFuY2UgPSB0aGlzLmVuZFN0YXRlLnN1Yih0aGlzLmluaXRTdGF0ZSkubm9ybVNxdWFyZWQoKTtcbiAgICB0aGlzLl9hYnNSZXN0VG9sZXJhbmNlID0gZGlzdGFuY2UgPT09IDAgPyB0aGlzLl9yZXN0VG9sZXJhbmNlIDogdGhpcy5fcmVzdFRvbGVyYW5jZSAqIGRpc3RhbmNlO1xufVxuZnVuY3Rpb24gX3NldFRhcmdldCh0YXJnZXQpIHtcbiAgICB0aGlzLmVuZFN0YXRlLnNldCh0YXJnZXQpO1xuICAgIF9zZXRBYnNvbHV0ZVJlc3RUb2xlcmFuY2UuY2FsbCh0aGlzKTtcbn1cblNwcmluZ1RyYW5zaXRpb24ucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQocG9zLCB2ZWwpIHtcbiAgICB0aGlzLl9kaW1lbnNpb25zID0gcG9zIGluc3RhbmNlb2YgQXJyYXkgPyBwb3MubGVuZ3RoIDogMDtcbiAgICB0aGlzLmluaXRTdGF0ZS5zZXQocG9zKTtcbiAgICBfc2V0UGFydGljbGVQb3NpdGlvbi5jYWxsKHRoaXMsIHBvcyk7XG4gICAgX3NldFRhcmdldC5jYWxsKHRoaXMsIHBvcyk7XG4gICAgaWYgKHZlbClcbiAgICAgICAgX3NldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzLCB2ZWwpO1xuICAgIF9zZXRDYWxsYmFjay5jYWxsKHRoaXMsIHVuZGVmaW5lZCk7XG59O1xuU3ByaW5nVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0VmVsb2NpdHkgPSBmdW5jdGlvbiBnZXRWZWxvY2l0eSgpIHtcbiAgICByZXR1cm4gX2dldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzKTtcbn07XG5TcHJpbmdUcmFuc2l0aW9uLnByb3RvdHlwZS5zZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIHNldFZlbG9jaXR5KHYpIHtcbiAgICB0aGlzLmNhbGwodGhpcywgX3NldFBhcnRpY2xlVmVsb2NpdHkodikpO1xufTtcblNwcmluZ1RyYW5zaXRpb24ucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuICF0aGlzLlBFLmlzU2xlZXBpbmcoKTtcbn07XG5TcHJpbmdUcmFuc2l0aW9uLnByb3RvdHlwZS5oYWx0ID0gZnVuY3Rpb24gaGFsdCgpIHtcbiAgICB0aGlzLnNldCh0aGlzLmdldCgpKTtcbn07XG5TcHJpbmdUcmFuc2l0aW9uLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgX3VwZGF0ZS5jYWxsKHRoaXMpO1xuICAgIHJldHVybiBfZ2V0UGFydGljbGVQb3NpdGlvbi5jYWxsKHRoaXMpO1xufTtcblNwcmluZ1RyYW5zaXRpb24ucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChlbmRTdGF0ZSwgZGVmaW5pdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoIWRlZmluaXRpb24pIHtcbiAgICAgICAgdGhpcy5yZXNldChlbmRTdGF0ZSk7XG4gICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZGltZW5zaW9ucyA9IGVuZFN0YXRlIGluc3RhbmNlb2YgQXJyYXkgPyBlbmRTdGF0ZS5sZW5ndGggOiAwO1xuICAgIF93YWtlLmNhbGwodGhpcyk7XG4gICAgX3NldHVwRGVmaW5pdGlvbi5jYWxsKHRoaXMsIGRlZmluaXRpb24pO1xuICAgIF9zZXRUYXJnZXQuY2FsbCh0aGlzLCBlbmRTdGF0ZSk7XG4gICAgX3NldENhbGxiYWNrLmNhbGwodGhpcywgY2FsbGJhY2spO1xufTtcbm1vZHVsZS5leHBvcnRzID0gU3ByaW5nVHJhbnNpdGlvbjsiLCJ2YXIgTXVsdGlwbGVUcmFuc2l0aW9uID0gcmVxdWlyZSgnLi9NdWx0aXBsZVRyYW5zaXRpb24nKTtcbnZhciBUd2VlblRyYW5zaXRpb24gPSByZXF1aXJlKCcuL1R3ZWVuVHJhbnNpdGlvbicpO1xuZnVuY3Rpb24gVHJhbnNpdGlvbmFibGUoc3RhcnQpIHtcbiAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBudWxsO1xuICAgIHRoaXMuYWN0aW9uUXVldWUgPSBbXTtcbiAgICB0aGlzLmNhbGxiYWNrUXVldWUgPSBbXTtcbiAgICB0aGlzLnN0YXRlID0gMDtcbiAgICB0aGlzLnZlbG9jaXR5ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2VuZ2luZUluc3RhbmNlID0gbnVsbDtcbiAgICB0aGlzLl9jdXJyZW50TWV0aG9kID0gbnVsbDtcbiAgICB0aGlzLnNldChzdGFydCk7XG59XG52YXIgdHJhbnNpdGlvbk1ldGhvZHMgPSB7fTtcblRyYW5zaXRpb25hYmxlLnJlZ2lzdGVyID0gZnVuY3Rpb24gcmVnaXN0ZXIobWV0aG9kcykge1xuICAgIHZhciBzdWNjZXNzID0gdHJ1ZTtcbiAgICBmb3IgKHZhciBtZXRob2QgaW4gbWV0aG9kcykge1xuICAgICAgICBpZiAoIVRyYW5zaXRpb25hYmxlLnJlZ2lzdGVyTWV0aG9kKG1ldGhvZCwgbWV0aG9kc1ttZXRob2RdKSlcbiAgICAgICAgICAgIHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHN1Y2Nlc3M7XG59O1xuVHJhbnNpdGlvbmFibGUucmVnaXN0ZXJNZXRob2QgPSBmdW5jdGlvbiByZWdpc3Rlck1ldGhvZChuYW1lLCBlbmdpbmVDbGFzcykge1xuICAgIGlmICghKG5hbWUgaW4gdHJhbnNpdGlvbk1ldGhvZHMpKSB7XG4gICAgICAgIHRyYW5zaXRpb25NZXRob2RzW25hbWVdID0gZW5naW5lQ2xhc3M7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gZmFsc2U7XG59O1xuVHJhbnNpdGlvbmFibGUudW5yZWdpc3Rlck1ldGhvZCA9IGZ1bmN0aW9uIHVucmVnaXN0ZXJNZXRob2QobmFtZSkge1xuICAgIGlmIChuYW1lIGluIHRyYW5zaXRpb25NZXRob2RzKSB7XG4gICAgICAgIGRlbGV0ZSB0cmFuc2l0aW9uTWV0aG9kc1tuYW1lXTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiBmYWxzZTtcbn07XG5mdW5jdGlvbiBfbG9hZE5leHQoKSB7XG4gICAgaWYgKHRoaXMuX2NhbGxiYWNrKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRoaXMuX2NhbGxiYWNrO1xuICAgICAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuYWN0aW9uUXVldWUubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgdGhpcy5zZXQodGhpcy5nZXQoKSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50QWN0aW9uID0gdGhpcy5hY3Rpb25RdWV1ZS5zaGlmdCgpO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gdGhpcy5jYWxsYmFja1F1ZXVlLnNoaWZ0KCk7XG4gICAgdmFyIG1ldGhvZCA9IG51bGw7XG4gICAgdmFyIGVuZFZhbHVlID0gdGhpcy5jdXJyZW50QWN0aW9uWzBdO1xuICAgIHZhciB0cmFuc2l0aW9uID0gdGhpcy5jdXJyZW50QWN0aW9uWzFdO1xuICAgIGlmICh0cmFuc2l0aW9uIGluc3RhbmNlb2YgT2JqZWN0ICYmIHRyYW5zaXRpb24ubWV0aG9kKSB7XG4gICAgICAgIG1ldGhvZCA9IHRyYW5zaXRpb24ubWV0aG9kO1xuICAgICAgICBpZiAodHlwZW9mIG1ldGhvZCA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICBtZXRob2QgPSB0cmFuc2l0aW9uTWV0aG9kc1ttZXRob2RdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG1ldGhvZCA9IFR3ZWVuVHJhbnNpdGlvbjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRNZXRob2QgIT09IG1ldGhvZCkge1xuICAgICAgICBpZiAoIShlbmRWYWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkgfHwgbWV0aG9kLlNVUFBPUlRTX01VTFRJUExFID09PSB0cnVlIHx8IGVuZFZhbHVlLmxlbmd0aCA8PSBtZXRob2QuU1VQUE9SVFNfTVVMVElQTEUpIHtcbiAgICAgICAgICAgIHRoaXMuX2VuZ2luZUluc3RhbmNlID0gbmV3IG1ldGhvZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZW5naW5lSW5zdGFuY2UgPSBuZXcgTXVsdGlwbGVUcmFuc2l0aW9uKG1ldGhvZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY3VycmVudE1ldGhvZCA9IG1ldGhvZDtcbiAgICB9XG4gICAgdGhpcy5fZW5naW5lSW5zdGFuY2UucmVzZXQodGhpcy5zdGF0ZSwgdGhpcy52ZWxvY2l0eSk7XG4gICAgaWYgKHRoaXMudmVsb2NpdHkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdHJhbnNpdGlvbi52ZWxvY2l0eSA9IHRoaXMudmVsb2NpdHk7XG4gICAgdGhpcy5fZW5naW5lSW5zdGFuY2Uuc2V0KGVuZFZhbHVlLCB0cmFuc2l0aW9uLCBfbG9hZE5leHQuYmluZCh0aGlzKSk7XG59XG5UcmFuc2l0aW9uYWJsZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KGVuZFN0YXRlLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICghdHJhbnNpdGlvbikge1xuICAgICAgICB0aGlzLnJlc2V0KGVuZFN0YXRlKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKVxuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHZhciBhY3Rpb24gPSBbXG4gICAgICAgICAgICBlbmRTdGF0ZSxcbiAgICAgICAgICAgIHRyYW5zaXRpb25cbiAgICAgICAgXTtcbiAgICB0aGlzLmFjdGlvblF1ZXVlLnB1c2goYWN0aW9uKTtcbiAgICB0aGlzLmNhbGxiYWNrUXVldWUucHVzaChjYWxsYmFjayk7XG4gICAgaWYgKCF0aGlzLmN1cnJlbnRBY3Rpb24pXG4gICAgICAgIF9sb2FkTmV4dC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblRyYW5zaXRpb25hYmxlLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KHN0YXJ0U3RhdGUsIHN0YXJ0VmVsb2NpdHkpIHtcbiAgICB0aGlzLl9jdXJyZW50TWV0aG9kID0gbnVsbDtcbiAgICB0aGlzLl9lbmdpbmVJbnN0YW5jZSA9IG51bGw7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXJ0U3RhdGU7XG4gICAgdGhpcy52ZWxvY2l0eSA9IHN0YXJ0VmVsb2NpdHk7XG4gICAgdGhpcy5jdXJyZW50QWN0aW9uID0gbnVsbDtcbiAgICB0aGlzLmFjdGlvblF1ZXVlID0gW107XG4gICAgdGhpcy5jYWxsYmFja1F1ZXVlID0gW107XG59O1xuVHJhbnNpdGlvbmFibGUucHJvdG90eXBlLmRlbGF5ID0gZnVuY3Rpb24gZGVsYXkoZHVyYXRpb24sIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5zZXQodGhpcy5nZXQoKSwge1xuICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgIGN1cnZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH0sIGNhbGxiYWNrKTtcbn07XG5UcmFuc2l0aW9uYWJsZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KHRpbWVzdGFtcCkge1xuICAgIGlmICh0aGlzLl9lbmdpbmVJbnN0YW5jZSkge1xuICAgICAgICBpZiAodGhpcy5fZW5naW5lSW5zdGFuY2UuZ2V0VmVsb2NpdHkpXG4gICAgICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy5fZW5naW5lSW5zdGFuY2UuZ2V0VmVsb2NpdHkoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuX2VuZ2luZUluc3RhbmNlLmdldCh0aW1lc3RhbXApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbn07XG5UcmFuc2l0aW9uYWJsZS5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gISF0aGlzLmN1cnJlbnRBY3Rpb247XG59O1xuVHJhbnNpdGlvbmFibGUucHJvdG90eXBlLmhhbHQgPSBmdW5jdGlvbiBoYWx0KCkge1xuICAgIHJldHVybiB0aGlzLnNldCh0aGlzLmdldCgpKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFRyYW5zaXRpb25hYmxlOyIsInZhciBUcmFuc2l0aW9uYWJsZSA9IHJlcXVpcmUoJy4vVHJhbnNpdGlvbmFibGUnKTtcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCcuLi9jb3JlL1RyYW5zZm9ybScpO1xudmFyIFV0aWxpdHkgPSByZXF1aXJlKCcuLi91dGlsaXRpZXMvVXRpbGl0eScpO1xuZnVuY3Rpb24gVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0odHJhbnNmb3JtKSB7XG4gICAgdGhpcy5fZmluYWwgPSBUcmFuc2Zvcm0uaWRlbnRpdHkuc2xpY2UoKTtcbiAgICB0aGlzLl9maW5hbFRyYW5zbGF0ZSA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF07XG4gICAgdGhpcy5fZmluYWxSb3RhdGUgPSBbXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdO1xuICAgIHRoaXMuX2ZpbmFsU2tldyA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF07XG4gICAgdGhpcy5fZmluYWxTY2FsZSA9IFtcbiAgICAgICAgMSxcbiAgICAgICAgMSxcbiAgICAgICAgMVxuICAgIF07XG4gICAgdGhpcy50cmFuc2xhdGUgPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fZmluYWxUcmFuc2xhdGUpO1xuICAgIHRoaXMucm90YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKHRoaXMuX2ZpbmFsUm90YXRlKTtcbiAgICB0aGlzLnNrZXcgPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fZmluYWxTa2V3KTtcbiAgICB0aGlzLnNjYWxlID0gbmV3IFRyYW5zaXRpb25hYmxlKHRoaXMuX2ZpbmFsU2NhbGUpO1xuICAgIGlmICh0cmFuc2Zvcm0pXG4gICAgICAgIHRoaXMuc2V0KHRyYW5zZm9ybSk7XG59XG5mdW5jdGlvbiBfYnVpbGQoKSB7XG4gICAgcmV0dXJuIFRyYW5zZm9ybS5idWlsZCh7XG4gICAgICAgIHRyYW5zbGF0ZTogdGhpcy50cmFuc2xhdGUuZ2V0KCksXG4gICAgICAgIHJvdGF0ZTogdGhpcy5yb3RhdGUuZ2V0KCksXG4gICAgICAgIHNrZXc6IHRoaXMuc2tldy5nZXQoKSxcbiAgICAgICAgc2NhbGU6IHRoaXMuc2NhbGUuZ2V0KClcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIF9idWlsZEZpbmFsKCkge1xuICAgIHJldHVybiBUcmFuc2Zvcm0uYnVpbGQoe1xuICAgICAgICB0cmFuc2xhdGU6IHRoaXMuX2ZpbmFsVHJhbnNsYXRlLFxuICAgICAgICByb3RhdGU6IHRoaXMuX2ZpbmFsUm90YXRlLFxuICAgICAgICBza2V3OiB0aGlzLl9maW5hbFNrZXcsXG4gICAgICAgIHNjYWxlOiB0aGlzLl9maW5hbFNjYWxlXG4gICAgfSk7XG59XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuc2V0VHJhbnNsYXRlID0gZnVuY3Rpb24gc2V0VHJhbnNsYXRlKHRyYW5zbGF0ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0aGlzLl9maW5hbFRyYW5zbGF0ZSA9IHRyYW5zbGF0ZTtcbiAgICB0aGlzLl9maW5hbCA9IF9idWlsZEZpbmFsLmNhbGwodGhpcyk7XG4gICAgdGhpcy50cmFuc2xhdGUuc2V0KHRyYW5zbGF0ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xufTtcblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5zZXRTY2FsZSA9IGZ1bmN0aW9uIHNldFNjYWxlKHNjYWxlLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX2ZpbmFsU2NhbGUgPSBzY2FsZTtcbiAgICB0aGlzLl9maW5hbCA9IF9idWlsZEZpbmFsLmNhbGwodGhpcyk7XG4gICAgdGhpcy5zY2FsZS5zZXQoc2NhbGUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuc2V0Um90YXRlID0gZnVuY3Rpb24gc2V0Um90YXRlKGV1bGVyQW5nbGVzLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX2ZpbmFsUm90YXRlID0gZXVsZXJBbmdsZXM7XG4gICAgdGhpcy5fZmluYWwgPSBfYnVpbGRGaW5hbC5jYWxsKHRoaXMpO1xuICAgIHRoaXMucm90YXRlLnNldChldWxlckFuZ2xlcywgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xufTtcblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5zZXRTa2V3ID0gZnVuY3Rpb24gc2V0U2tldyhza2V3QW5nbGVzLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX2ZpbmFsU2tldyA9IHNrZXdBbmdsZXM7XG4gICAgdGhpcy5fZmluYWwgPSBfYnVpbGRGaW5hbC5jYWxsKHRoaXMpO1xuICAgIHRoaXMuc2tldy5zZXQoc2tld0FuZ2xlcywgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xufTtcblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQodHJhbnNmb3JtLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHZhciBjb21wb25lbnRzID0gVHJhbnNmb3JtLmludGVycHJldCh0cmFuc2Zvcm0pO1xuICAgIHRoaXMuX2ZpbmFsVHJhbnNsYXRlID0gY29tcG9uZW50cy50cmFuc2xhdGU7XG4gICAgdGhpcy5fZmluYWxSb3RhdGUgPSBjb21wb25lbnRzLnJvdGF0ZTtcbiAgICB0aGlzLl9maW5hbFNrZXcgPSBjb21wb25lbnRzLnNrZXc7XG4gICAgdGhpcy5fZmluYWxTY2FsZSA9IGNvbXBvbmVudHMuc2NhbGU7XG4gICAgdGhpcy5fZmluYWwgPSB0cmFuc2Zvcm07XG4gICAgdmFyIF9jYWxsYmFjayA9IGNhbGxiYWNrID8gVXRpbGl0eS5hZnRlcig0LCBjYWxsYmFjaykgOiBudWxsO1xuICAgIHRoaXMudHJhbnNsYXRlLnNldChjb21wb25lbnRzLnRyYW5zbGF0ZSwgdHJhbnNpdGlvbiwgX2NhbGxiYWNrKTtcbiAgICB0aGlzLnJvdGF0ZS5zZXQoY29tcG9uZW50cy5yb3RhdGUsIHRyYW5zaXRpb24sIF9jYWxsYmFjayk7XG4gICAgdGhpcy5za2V3LnNldChjb21wb25lbnRzLnNrZXcsIHRyYW5zaXRpb24sIF9jYWxsYmFjayk7XG4gICAgdGhpcy5zY2FsZS5zZXQoY29tcG9uZW50cy5zY2FsZSwgdHJhbnNpdGlvbiwgX2NhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuc2V0RGVmYXVsdFRyYW5zaXRpb24gPSBmdW5jdGlvbiBzZXREZWZhdWx0VHJhbnNpdGlvbih0cmFuc2l0aW9uKSB7XG4gICAgdGhpcy50cmFuc2xhdGUuc2V0RGVmYXVsdCh0cmFuc2l0aW9uKTtcbiAgICB0aGlzLnJvdGF0ZS5zZXREZWZhdWx0KHRyYW5zaXRpb24pO1xuICAgIHRoaXMuc2tldy5zZXREZWZhdWx0KHRyYW5zaXRpb24pO1xuICAgIHRoaXMuc2NhbGUuc2V0RGVmYXVsdCh0cmFuc2l0aW9uKTtcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIGlmICh0aGlzLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgcmV0dXJuIF9idWlsZC5jYWxsKHRoaXMpO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy5fZmluYWw7XG59O1xuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLmdldEZpbmFsID0gZnVuY3Rpb24gZ2V0RmluYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbmFsO1xufTtcblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZS5pc0FjdGl2ZSgpIHx8IHRoaXMucm90YXRlLmlzQWN0aXZlKCkgfHwgdGhpcy5zY2FsZS5pc0FjdGl2ZSgpIHx8IHRoaXMuc2tldy5pc0FjdGl2ZSgpO1xufTtcblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5oYWx0ID0gZnVuY3Rpb24gaGFsdCgpIHtcbiAgICB0aGlzLnRyYW5zbGF0ZS5oYWx0KCk7XG4gICAgdGhpcy5yb3RhdGUuaGFsdCgpO1xuICAgIHRoaXMuc2tldy5oYWx0KCk7XG4gICAgdGhpcy5zY2FsZS5oYWx0KCk7XG4gICAgdGhpcy5fZmluYWwgPSB0aGlzLmdldCgpO1xuICAgIHRoaXMuX2ZpbmFsVHJhbnNsYXRlID0gdGhpcy50cmFuc2xhdGUuZ2V0KCk7XG4gICAgdGhpcy5fZmluYWxSb3RhdGUgPSB0aGlzLnJvdGF0ZS5nZXQoKTtcbiAgICB0aGlzLl9maW5hbFNrZXcgPSB0aGlzLnNrZXcuZ2V0KCk7XG4gICAgdGhpcy5fZmluYWxTY2FsZSA9IHRoaXMuc2NhbGUuZ2V0KCk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBUcmFuc2l0aW9uYWJsZVRyYW5zZm9ybTsiLCJmdW5jdGlvbiBUd2VlblRyYW5zaXRpb24ob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoVHdlZW5UcmFuc2l0aW9uLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLl9zdGFydFRpbWUgPSAwO1xuICAgIHRoaXMuX3N0YXJ0VmFsdWUgPSAwO1xuICAgIHRoaXMuX3VwZGF0ZVRpbWUgPSAwO1xuICAgIHRoaXMuX2VuZFZhbHVlID0gMDtcbiAgICB0aGlzLl9jdXJ2ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9kdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5zdGF0ZSA9IDA7XG4gICAgdGhpcy52ZWxvY2l0eSA9IHVuZGVmaW5lZDtcbn1cblR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMgPSB7XG4gICAgbGluZWFyOiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gdDtcbiAgICB9LFxuICAgIGVhc2VJbjogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIHQgKiB0O1xuICAgIH0sXG4gICAgZWFzZU91dDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIHQgKiAoMiAtIHQpO1xuICAgIH0sXG4gICAgZWFzZUluT3V0OiBmdW5jdGlvbiAodCkge1xuICAgICAgICBpZiAodCA8PSAwLjUpXG4gICAgICAgICAgICByZXR1cm4gMiAqIHQgKiB0O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gLTIgKiB0ICogdCArIDQgKiB0IC0gMTtcbiAgICB9LFxuICAgIGVhc2VPdXRCb3VuY2U6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB0ICogKDMgLSAyICogdCk7XG4gICAgfSxcbiAgICBzcHJpbmc6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiAoMSAtIHQpICogTWF0aC5zaW4oNiAqIE1hdGguUEkgKiB0KSArIHQ7XG4gICAgfVxufTtcblR3ZWVuVHJhbnNpdGlvbi5TVVBQT1JUU19NVUxUSVBMRSA9IHRydWU7XG5Ud2VlblRyYW5zaXRpb24uREVGQVVMVF9PUFRJT05TID0ge1xuICAgIGN1cnZlOiBUd2VlblRyYW5zaXRpb24uQ3VydmVzLmxpbmVhcixcbiAgICBkdXJhdGlvbjogNTAwLFxuICAgIHNwZWVkOiAwXG59O1xudmFyIHJlZ2lzdGVyZWRDdXJ2ZXMgPSB7fTtcblR3ZWVuVHJhbnNpdGlvbi5yZWdpc3RlckN1cnZlID0gZnVuY3Rpb24gcmVnaXN0ZXJDdXJ2ZShjdXJ2ZU5hbWUsIGN1cnZlKSB7XG4gICAgaWYgKCFyZWdpc3RlcmVkQ3VydmVzW2N1cnZlTmFtZV0pIHtcbiAgICAgICAgcmVnaXN0ZXJlZEN1cnZlc1tjdXJ2ZU5hbWVdID0gY3VydmU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuVHdlZW5UcmFuc2l0aW9uLnVucmVnaXN0ZXJDdXJ2ZSA9IGZ1bmN0aW9uIHVucmVnaXN0ZXJDdXJ2ZShjdXJ2ZU5hbWUpIHtcbiAgICBpZiAocmVnaXN0ZXJlZEN1cnZlc1tjdXJ2ZU5hbWVdKSB7XG4gICAgICAgIGRlbGV0ZSByZWdpc3RlcmVkQ3VydmVzW2N1cnZlTmFtZV07XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuVHdlZW5UcmFuc2l0aW9uLmdldEN1cnZlID0gZnVuY3Rpb24gZ2V0Q3VydmUoY3VydmVOYW1lKSB7XG4gICAgdmFyIGN1cnZlID0gcmVnaXN0ZXJlZEN1cnZlc1tjdXJ2ZU5hbWVdO1xuICAgIGlmIChjdXJ2ZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gY3VydmU7XG4gICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2N1cnZlIG5vdCByZWdpc3RlcmVkJyk7XG59O1xuVHdlZW5UcmFuc2l0aW9uLmdldEN1cnZlcyA9IGZ1bmN0aW9uIGdldEN1cnZlcygpIHtcbiAgICByZXR1cm4gcmVnaXN0ZXJlZEN1cnZlcztcbn07XG5mdW5jdGlvbiBfaW50ZXJwb2xhdGUoYSwgYiwgdCkge1xuICAgIHJldHVybiAoMSAtIHQpICogYSArIHQgKiBiO1xufVxuZnVuY3Rpb24gX2Nsb25lKG9iaikge1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICAgICAgcmV0dXJuIG9iai5zbGljZSgwKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5jcmVhdGUob2JqKTtcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIG9iajtcbn1cbmZ1bmN0aW9uIF9ub3JtYWxpemUodHJhbnNpdGlvbiwgZGVmYXVsdFRyYW5zaXRpb24pIHtcbiAgICB2YXIgcmVzdWx0ID0geyBjdXJ2ZTogZGVmYXVsdFRyYW5zaXRpb24uY3VydmUgfTtcbiAgICBpZiAoZGVmYXVsdFRyYW5zaXRpb24uZHVyYXRpb24pXG4gICAgICAgIHJlc3VsdC5kdXJhdGlvbiA9IGRlZmF1bHRUcmFuc2l0aW9uLmR1cmF0aW9uO1xuICAgIGlmIChkZWZhdWx0VHJhbnNpdGlvbi5zcGVlZClcbiAgICAgICAgcmVzdWx0LnNwZWVkID0gZGVmYXVsdFRyYW5zaXRpb24uc3BlZWQ7XG4gICAgaWYgKHRyYW5zaXRpb24gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgaWYgKHRyYW5zaXRpb24uZHVyYXRpb24gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJlc3VsdC5kdXJhdGlvbiA9IHRyYW5zaXRpb24uZHVyYXRpb247XG4gICAgICAgIGlmICh0cmFuc2l0aW9uLmN1cnZlKVxuICAgICAgICAgICAgcmVzdWx0LmN1cnZlID0gdHJhbnNpdGlvbi5jdXJ2ZTtcbiAgICAgICAgaWYgKHRyYW5zaXRpb24uc3BlZWQpXG4gICAgICAgICAgICByZXN1bHQuc3BlZWQgPSB0cmFuc2l0aW9uLnNwZWVkO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHJlc3VsdC5jdXJ2ZSA9PT0gJ3N0cmluZycpXG4gICAgICAgIHJlc3VsdC5jdXJ2ZSA9IFR3ZWVuVHJhbnNpdGlvbi5nZXRDdXJ2ZShyZXN1bHQuY3VydmUpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5jdXJ2ZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMuY3VydmUgPSBvcHRpb25zLmN1cnZlO1xuICAgIGlmIChvcHRpb25zLmR1cmF0aW9uICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5kdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb247XG4gICAgaWYgKG9wdGlvbnMuc3BlZWQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLnNwZWVkID0gb3B0aW9ucy5zcGVlZDtcbn07XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChlbmRWYWx1ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoIXRyYW5zaXRpb24pIHtcbiAgICAgICAgdGhpcy5yZXNldChlbmRWYWx1ZSk7XG4gICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fc3RhcnRWYWx1ZSA9IF9jbG9uZSh0aGlzLmdldCgpKTtcbiAgICB0cmFuc2l0aW9uID0gX25vcm1hbGl6ZSh0cmFuc2l0aW9uLCB0aGlzLm9wdGlvbnMpO1xuICAgIGlmICh0cmFuc2l0aW9uLnNwZWVkKSB7XG4gICAgICAgIHZhciBzdGFydFZhbHVlID0gdGhpcy5fc3RhcnRWYWx1ZTtcbiAgICAgICAgaWYgKHN0YXJ0VmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgIHZhciB2YXJpYW5jZSA9IDA7XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHN0YXJ0VmFsdWUpXG4gICAgICAgICAgICAgICAgdmFyaWFuY2UgKz0gKGVuZFZhbHVlW2ldIC0gc3RhcnRWYWx1ZVtpXSkgKiAoZW5kVmFsdWVbaV0gLSBzdGFydFZhbHVlW2ldKTtcbiAgICAgICAgICAgIHRyYW5zaXRpb24uZHVyYXRpb24gPSBNYXRoLnNxcnQodmFyaWFuY2UpIC8gdHJhbnNpdGlvbi5zcGVlZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb24uZHVyYXRpb24gPSBNYXRoLmFicyhlbmRWYWx1ZSAtIHN0YXJ0VmFsdWUpIC8gdHJhbnNpdGlvbi5zcGVlZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuX2VuZFZhbHVlID0gX2Nsb25lKGVuZFZhbHVlKTtcbiAgICB0aGlzLl9zdGFydFZlbG9jaXR5ID0gX2Nsb25lKHRyYW5zaXRpb24udmVsb2NpdHkpO1xuICAgIHRoaXMuX2R1cmF0aW9uID0gdHJhbnNpdGlvbi5kdXJhdGlvbjtcbiAgICB0aGlzLl9jdXJ2ZSA9IHRyYW5zaXRpb24uY3VydmU7XG4gICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xufTtcblR3ZWVuVHJhbnNpdGlvbi5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiByZXNldChzdGFydFZhbHVlLCBzdGFydFZlbG9jaXR5KSB7XG4gICAgaWYgKHRoaXMuX2NhbGxiYWNrKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRoaXMuX2NhbGxiYWNrO1xuICAgICAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZSA9IF9jbG9uZShzdGFydFZhbHVlKTtcbiAgICB0aGlzLnZlbG9jaXR5ID0gX2Nsb25lKHN0YXJ0VmVsb2NpdHkpO1xuICAgIHRoaXMuX3N0YXJ0VGltZSA9IDA7XG4gICAgdGhpcy5fZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuX3VwZGF0ZVRpbWUgPSAwO1xuICAgIHRoaXMuX3N0YXJ0VmFsdWUgPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMuX3N0YXJ0VmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5O1xuICAgIHRoaXMuX2VuZFZhbHVlID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcbn07XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLmdldFZlbG9jaXR5ID0gZnVuY3Rpb24gZ2V0VmVsb2NpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMudmVsb2NpdHk7XG59O1xuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQodGltZXN0YW1wKSB7XG4gICAgdGhpcy51cGRhdGUodGltZXN0YW1wKTtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbn07XG5mdW5jdGlvbiBfY2FsY3VsYXRlVmVsb2NpdHkoY3VycmVudCwgc3RhcnQsIGN1cnZlLCBkdXJhdGlvbiwgdCkge1xuICAgIHZhciB2ZWxvY2l0eTtcbiAgICB2YXIgZXBzID0gMWUtNztcbiAgICB2YXIgc3BlZWQgPSAoY3VydmUodCkgLSBjdXJ2ZSh0IC0gZXBzKSkgLyBlcHM7XG4gICAgaWYgKGN1cnJlbnQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICB2ZWxvY2l0eSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1cnJlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY3VycmVudFtpXSA9PT0gJ251bWJlcicpXG4gICAgICAgICAgICAgICAgdmVsb2NpdHlbaV0gPSBzcGVlZCAqIChjdXJyZW50W2ldIC0gc3RhcnRbaV0pIC8gZHVyYXRpb247XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdmVsb2NpdHlbaV0gPSAwO1xuICAgICAgICB9XG4gICAgfSBlbHNlXG4gICAgICAgIHZlbG9jaXR5ID0gc3BlZWQgKiAoY3VycmVudCAtIHN0YXJ0KSAvIGR1cmF0aW9uO1xuICAgIHJldHVybiB2ZWxvY2l0eTtcbn1cbmZ1bmN0aW9uIF9jYWxjdWxhdGVTdGF0ZShzdGFydCwgZW5kLCB0KSB7XG4gICAgdmFyIHN0YXRlO1xuICAgIGlmIChzdGFydCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHN0YXRlID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhcnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhcnRbaV0gPT09ICdudW1iZXInKVxuICAgICAgICAgICAgICAgIHN0YXRlW2ldID0gX2ludGVycG9sYXRlKHN0YXJ0W2ldLCBlbmRbaV0sIHQpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHN0YXRlW2ldID0gc3RhcnRbaV07XG4gICAgICAgIH1cbiAgICB9IGVsc2VcbiAgICAgICAgc3RhdGUgPSBfaW50ZXJwb2xhdGUoc3RhcnQsIGVuZCwgdCk7XG4gICAgcmV0dXJuIHN0YXRlO1xufVxuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUodGltZXN0YW1wKSB7XG4gICAgaWYgKCF0aGlzLl9hY3RpdmUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLl9jYWxsYmFjaztcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdGltZXN0YW1wKVxuICAgICAgICB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICAgIGlmICh0aGlzLl91cGRhdGVUaW1lID49IHRpbWVzdGFtcClcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuX3VwZGF0ZVRpbWUgPSB0aW1lc3RhbXA7XG4gICAgdmFyIHRpbWVTaW5jZVN0YXJ0ID0gdGltZXN0YW1wIC0gdGhpcy5fc3RhcnRUaW1lO1xuICAgIGlmICh0aW1lU2luY2VTdGFydCA+PSB0aGlzLl9kdXJhdGlvbikge1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5fZW5kVmFsdWU7XG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSBfY2FsY3VsYXRlVmVsb2NpdHkodGhpcy5zdGF0ZSwgdGhpcy5fc3RhcnRWYWx1ZSwgdGhpcy5fY3VydmUsIHRoaXMuX2R1cmF0aW9uLCAxKTtcbiAgICAgICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh0aW1lU2luY2VTdGFydCA8IDApIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuX3N0YXJ0VmFsdWU7XG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB0aGlzLl9zdGFydFZlbG9jaXR5O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciB0ID0gdGltZVNpbmNlU3RhcnQgLyB0aGlzLl9kdXJhdGlvbjtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IF9jYWxjdWxhdGVTdGF0ZSh0aGlzLl9zdGFydFZhbHVlLCB0aGlzLl9lbmRWYWx1ZSwgdGhpcy5fY3VydmUodCkpO1xuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gX2NhbGN1bGF0ZVZlbG9jaXR5KHRoaXMuc3RhdGUsIHRoaXMuX3N0YXJ0VmFsdWUsIHRoaXMuX2N1cnZlLCB0aGlzLl9kdXJhdGlvbiwgdCk7XG4gICAgfVxufTtcblR3ZWVuVHJhbnNpdGlvbi5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlO1xufTtcblR3ZWVuVHJhbnNpdGlvbi5wcm90b3R5cGUuaGFsdCA9IGZ1bmN0aW9uIGhhbHQoKSB7XG4gICAgdGhpcy5yZXNldCh0aGlzLmdldCgpKTtcbn07XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSgnbGluZWFyJywgVHdlZW5UcmFuc2l0aW9uLkN1cnZlcy5saW5lYXIpO1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUoJ2Vhc2VJbicsIFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMuZWFzZUluKTtcblR3ZWVuVHJhbnNpdGlvbi5yZWdpc3RlckN1cnZlKCdlYXNlT3V0JywgVHdlZW5UcmFuc2l0aW9uLkN1cnZlcy5lYXNlT3V0KTtcblR3ZWVuVHJhbnNpdGlvbi5yZWdpc3RlckN1cnZlKCdlYXNlSW5PdXQnLCBUd2VlblRyYW5zaXRpb24uQ3VydmVzLmVhc2VJbk91dCk7XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSgnZWFzZU91dEJvdW5jZScsIFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMuZWFzZU91dEJvdW5jZSk7XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSgnc3ByaW5nJywgVHdlZW5UcmFuc2l0aW9uLkN1cnZlcy5zcHJpbmcpO1xuVHdlZW5UcmFuc2l0aW9uLmN1c3RvbUN1cnZlID0gZnVuY3Rpb24gY3VzdG9tQ3VydmUodjEsIHYyKSB7XG4gICAgdjEgPSB2MSB8fCAwO1xuICAgIHYyID0gdjIgfHwgMDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIHYxICogdCArICgtMiAqIHYxIC0gdjIgKyAzKSAqIHQgKiB0ICsgKHYxICsgdjIgLSAyKSAqIHQgKiB0ICogdDtcbiAgICB9O1xufTtcbm1vZHVsZS5leHBvcnRzID0gVHdlZW5UcmFuc2l0aW9uOyIsInZhciBVdGlsaXR5ID0ge307XG5VdGlsaXR5LkRpcmVjdGlvbiA9IHtcbiAgICBYOiAwLFxuICAgIFk6IDEsXG4gICAgWjogMlxufTtcblV0aWxpdHkuYWZ0ZXIgPSBmdW5jdGlvbiBhZnRlcihjb3VudCwgY2FsbGJhY2spIHtcbiAgICB2YXIgY291bnRlciA9IGNvdW50O1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvdW50ZXItLTtcbiAgICAgICAgaWYgKGNvdW50ZXIgPT09IDApXG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG59O1xuVXRpbGl0eS5sb2FkVVJMID0gZnVuY3Rpb24gbG9hZFVSTCh1cmwsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBvbnJlYWR5c3RhdGVjaGFuZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHhoci5vcGVuKCdHRVQnLCB1cmwpO1xuICAgIHhoci5zZW5kKCk7XG59O1xuVXRpbGl0eS5jcmVhdGVEb2N1bWVudEZyYWdtZW50RnJvbUhUTUwgPSBmdW5jdGlvbiBjcmVhdGVEb2N1bWVudEZyYWdtZW50RnJvbUhUTUwoaHRtbCkge1xuICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBodG1sO1xuICAgIHZhciByZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgd2hpbGUgKGVsZW1lbnQuaGFzQ2hpbGROb2RlcygpKVxuICAgICAgICByZXN1bHQuYXBwZW5kQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblV0aWxpdHkuY2xvbmUgPSBmdW5jdGlvbiBjbG9uZShiKSB7XG4gICAgdmFyIGE7XG4gICAgaWYgKHR5cGVvZiBiID09PSAnb2JqZWN0Jykge1xuICAgICAgICBhID0gYiBpbnN0YW5jZW9mIEFycmF5ID8gW10gOiB7fTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYltrZXldID09PSAnb2JqZWN0JyAmJiBiW2tleV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoYltrZXldIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgYVtrZXldID0gbmV3IEFycmF5KGJba2V5XS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJba2V5XS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYVtrZXldW2ldID0gVXRpbGl0eS5jbG9uZShiW2tleV1baV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYVtrZXldID0gVXRpbGl0eS5jbG9uZShiW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYVtrZXldID0gYltrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYSA9IGI7XG4gICAgfVxuICAgIHJldHVybiBhO1xufTtcbm1vZHVsZS5leHBvcnRzID0gVXRpbGl0eTsiLCJ2YXIgRW50aXR5ID0gcmVxdWlyZSgnLi4vY29yZS9FbnRpdHknKTtcbnZhciBSZW5kZXJOb2RlID0gcmVxdWlyZSgnLi4vY29yZS9SZW5kZXJOb2RlJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi4vY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBWaWV3U2VxdWVuY2UgPSByZXF1aXJlKCcuLi9jb3JlL1ZpZXdTZXF1ZW5jZScpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4uL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG52YXIgTW9kaWZpZXIgPSByZXF1aXJlKCcuLi9jb3JlL01vZGlmaWVyJyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCcuLi9jb3JlL09wdGlvbnNNYW5hZ2VyJyk7XG52YXIgVHJhbnNpdGlvbmFibGUgPSByZXF1aXJlKCcuLi90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZScpO1xudmFyIFRyYW5zaXRpb25hYmxlVHJhbnNmb3JtID0gcmVxdWlyZSgnLi4vdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0nKTtcbmZ1bmN0aW9uIEdyaWRMYXlvdXQob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoR3JpZExheW91dC5ERUZBVUxUX09QVElPTlMpO1xuICAgIHRoaXMub3B0aW9uc01hbmFnZXIgPSBuZXcgT3B0aW9uc01hbmFnZXIodGhpcy5vcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuaWQgPSBFbnRpdHkucmVnaXN0ZXIodGhpcyk7XG4gICAgdGhpcy5fbW9kaWZpZXJzID0gW107XG4gICAgdGhpcy5fc3RhdGVzID0gW107XG4gICAgdGhpcy5fY29udGV4dFNpemVDYWNoZSA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF07XG4gICAgdGhpcy5fZGltZW5zaW9uc0NhY2hlID0gW1xuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXTtcbiAgICB0aGlzLl9hY3RpdmVDb3VudCA9IDA7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRPdXRwdXQpO1xufVxuZnVuY3Rpb24gX3JlZmxvdyhzaXplLCBjb2xzLCByb3dzKSB7XG4gICAgdmFyIHVzYWJsZVNpemUgPSBbXG4gICAgICAgICAgICBzaXplWzBdLFxuICAgICAgICAgICAgc2l6ZVsxXVxuICAgICAgICBdO1xuICAgIHVzYWJsZVNpemVbMF0gLT0gdGhpcy5vcHRpb25zLmd1dHRlclNpemVbMF0gKiAoY29scyAtIDEpO1xuICAgIHVzYWJsZVNpemVbMV0gLT0gdGhpcy5vcHRpb25zLmd1dHRlclNpemVbMV0gKiAocm93cyAtIDEpO1xuICAgIHZhciByb3dTaXplID0gTWF0aC5yb3VuZCh1c2FibGVTaXplWzFdIC8gcm93cyk7XG4gICAgdmFyIGNvbFNpemUgPSBNYXRoLnJvdW5kKHVzYWJsZVNpemVbMF0gLyBjb2xzKTtcbiAgICB2YXIgY3VyclkgPSAwO1xuICAgIHZhciBjdXJyWDtcbiAgICB2YXIgY3VyckluZGV4ID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvd3M7IGkrKykge1xuICAgICAgICBjdXJyWCA9IDA7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29sczsgaisrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbW9kaWZpZXJzW2N1cnJJbmRleF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIF9jcmVhdGVNb2RpZmllci5jYWxsKHRoaXMsIGN1cnJJbmRleCwgW1xuICAgICAgICAgICAgICAgICAgICBjb2xTaXplLFxuICAgICAgICAgICAgICAgICAgICByb3dTaXplXG4gICAgICAgICAgICAgICAgXSwgW1xuICAgICAgICAgICAgICAgICAgICBjdXJyWCxcbiAgICAgICAgICAgICAgICAgICAgY3VyclksXG4gICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICBdLCAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX2FuaW1hdGVNb2RpZmllci5jYWxsKHRoaXMsIGN1cnJJbmRleCwgW1xuICAgICAgICAgICAgICAgICAgICBjb2xTaXplLFxuICAgICAgICAgICAgICAgICAgICByb3dTaXplXG4gICAgICAgICAgICAgICAgXSwgW1xuICAgICAgICAgICAgICAgICAgICBjdXJyWCxcbiAgICAgICAgICAgICAgICAgICAgY3VyclksXG4gICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICBdLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJJbmRleCsrO1xuICAgICAgICAgICAgY3VyclggKz0gY29sU2l6ZSArIHRoaXMub3B0aW9ucy5ndXR0ZXJTaXplWzBdO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJZICs9IHJvd1NpemUgKyB0aGlzLm9wdGlvbnMuZ3V0dGVyU2l6ZVsxXTtcbiAgICB9XG4gICAgdGhpcy5fZGltZW5zaW9uc0NhY2hlID0gW1xuICAgICAgICB0aGlzLm9wdGlvbnMuZGltZW5zaW9uc1swXSxcbiAgICAgICAgdGhpcy5vcHRpb25zLmRpbWVuc2lvbnNbMV1cbiAgICBdO1xuICAgIHRoaXMuX2NvbnRleHRTaXplQ2FjaGUgPSBbXG4gICAgICAgIHNpemVbMF0sXG4gICAgICAgIHNpemVbMV1cbiAgICBdO1xuICAgIHRoaXMuX2FjdGl2ZUNvdW50ID0gcm93cyAqIGNvbHM7XG4gICAgZm9yIChpID0gdGhpcy5fYWN0aXZlQ291bnQ7IGkgPCB0aGlzLl9tb2RpZmllcnMubGVuZ3RoOyBpKyspXG4gICAgICAgIF9hbmltYXRlTW9kaWZpZXIuY2FsbCh0aGlzLCBpLCBbXG4gICAgICAgICAgICBNYXRoLnJvdW5kKGNvbFNpemUpLFxuICAgICAgICAgICAgTWF0aC5yb3VuZChyb3dTaXplKVxuICAgICAgICBdLCBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdLCAwKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdyZWZsb3cnKTtcbn1cbmZ1bmN0aW9uIF9jcmVhdGVNb2RpZmllcihpbmRleCwgc2l6ZSwgcG9zaXRpb24sIG9wYWNpdHkpIHtcbiAgICB2YXIgdHJhbnNpdGlvbkl0ZW0gPSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IG5ldyBUcmFuc2l0aW9uYWJsZVRyYW5zZm9ybShUcmFuc2Zvcm0udHJhbnNsYXRlLmFwcGx5KG51bGwsIHBvc2l0aW9uKSksXG4gICAgICAgICAgICBvcGFjaXR5OiBuZXcgVHJhbnNpdGlvbmFibGUob3BhY2l0eSksXG4gICAgICAgICAgICBzaXplOiBuZXcgVHJhbnNpdGlvbmFibGUoc2l6ZSlcbiAgICAgICAgfTtcbiAgICB2YXIgbW9kaWZpZXIgPSBuZXcgTW9kaWZpZXIoe1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2l0aW9uSXRlbS50cmFuc2Zvcm0sXG4gICAgICAgICAgICBvcGFjaXR5OiB0cmFuc2l0aW9uSXRlbS5vcGFjaXR5LFxuICAgICAgICAgICAgc2l6ZTogdHJhbnNpdGlvbkl0ZW0uc2l6ZVxuICAgICAgICB9KTtcbiAgICB0aGlzLl9zdGF0ZXNbaW5kZXhdID0gdHJhbnNpdGlvbkl0ZW07XG4gICAgdGhpcy5fbW9kaWZpZXJzW2luZGV4XSA9IG1vZGlmaWVyO1xufVxuZnVuY3Rpb24gX2FuaW1hdGVNb2RpZmllcihpbmRleCwgc2l6ZSwgcG9zaXRpb24sIG9wYWNpdHkpIHtcbiAgICB2YXIgY3VyclN0YXRlID0gdGhpcy5fc3RhdGVzW2luZGV4XTtcbiAgICB2YXIgY3VyclNpemUgPSBjdXJyU3RhdGUuc2l6ZTtcbiAgICB2YXIgY3Vyck9wYWNpdHkgPSBjdXJyU3RhdGUub3BhY2l0eTtcbiAgICB2YXIgY3VyclRyYW5zZm9ybSA9IGN1cnJTdGF0ZS50cmFuc2Zvcm07XG4gICAgdmFyIHRyYW5zaXRpb24gPSB0aGlzLm9wdGlvbnMudHJhbnNpdGlvbjtcbiAgICBjdXJyVHJhbnNmb3JtLmhhbHQoKTtcbiAgICBjdXJyT3BhY2l0eS5oYWx0KCk7XG4gICAgY3VyclNpemUuaGFsdCgpO1xuICAgIGN1cnJUcmFuc2Zvcm0uc2V0VHJhbnNsYXRlKHBvc2l0aW9uLCB0cmFuc2l0aW9uKTtcbiAgICBjdXJyU2l6ZS5zZXQoc2l6ZSwgdHJhbnNpdGlvbik7XG4gICAgY3Vyck9wYWNpdHkuc2V0KG9wYWNpdHksIHRyYW5zaXRpb24pO1xufVxuR3JpZExheW91dC5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgZGltZW5zaW9uczogW1xuICAgICAgICAxLFxuICAgICAgICAxXG4gICAgXSxcbiAgICB0cmFuc2l0aW9uOiBmYWxzZSxcbiAgICBndXR0ZXJTaXplOiBbXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdXG59O1xuR3JpZExheW91dC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmlkO1xufTtcbkdyaWRMYXlvdXQucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zTWFuYWdlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xufTtcbkdyaWRMYXlvdXQucHJvdG90eXBlLnNlcXVlbmNlRnJvbSA9IGZ1bmN0aW9uIHNlcXVlbmNlRnJvbShzZXF1ZW5jZSkge1xuICAgIGlmIChzZXF1ZW5jZSBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICBzZXF1ZW5jZSA9IG5ldyBWaWV3U2VxdWVuY2Uoc2VxdWVuY2UpO1xuICAgIHRoaXMuc2VxdWVuY2UgPSBzZXF1ZW5jZTtcbn07XG5HcmlkTGF5b3V0LnByb3RvdHlwZS5jb21taXQgPSBmdW5jdGlvbiBjb21taXQoY29udGV4dCkge1xuICAgIHZhciB0cmFuc2Zvcm0gPSBjb250ZXh0LnRyYW5zZm9ybTtcbiAgICB2YXIgb3BhY2l0eSA9IGNvbnRleHQub3BhY2l0eTtcbiAgICB2YXIgb3JpZ2luID0gY29udGV4dC5vcmlnaW47XG4gICAgdmFyIHNpemUgPSBjb250ZXh0LnNpemU7XG4gICAgdmFyIGNvbHMgPSB0aGlzLm9wdGlvbnMuZGltZW5zaW9uc1swXTtcbiAgICB2YXIgcm93cyA9IHRoaXMub3B0aW9ucy5kaW1lbnNpb25zWzFdO1xuICAgIGlmIChzaXplWzBdICE9PSB0aGlzLl9jb250ZXh0U2l6ZUNhY2hlWzBdIHx8IHNpemVbMV0gIT09IHRoaXMuX2NvbnRleHRTaXplQ2FjaGVbMV0gfHwgY29scyAhPT0gdGhpcy5fZGltZW5zaW9uc0NhY2hlWzBdIHx8IHJvd3MgIT09IHRoaXMuX2RpbWVuc2lvbnNDYWNoZVsxXSkge1xuICAgICAgICBfcmVmbG93LmNhbGwodGhpcywgc2l6ZSwgY29scywgcm93cyk7XG4gICAgfVxuICAgIHZhciBzZXF1ZW5jZSA9IHRoaXMuc2VxdWVuY2U7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBjdXJySW5kZXggPSAwO1xuICAgIHdoaWxlIChzZXF1ZW5jZSAmJiBjdXJySW5kZXggPCB0aGlzLl9tb2RpZmllcnMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBpdGVtID0gc2VxdWVuY2UuZ2V0KCk7XG4gICAgICAgIHZhciBtb2RpZmllciA9IHRoaXMuX21vZGlmaWVyc1tjdXJySW5kZXhdO1xuICAgICAgICBpZiAoY3VyckluZGV4ID49IHRoaXMuX2FjdGl2ZUNvdW50ICYmIHRoaXMuX3N0YXRlc1tjdXJySW5kZXhdLm9wYWNpdHkuaXNBY3RpdmUoKSkge1xuICAgICAgICAgICAgdGhpcy5fbW9kaWZpZXJzLnNwbGljZShjdXJySW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdGVzLnNwbGljZShjdXJySW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChtb2RpZmllci5tb2RpZnkoe1xuICAgICAgICAgICAgICAgIG9yaWdpbjogb3JpZ2luLFxuICAgICAgICAgICAgICAgIHRhcmdldDogaXRlbS5yZW5kZXIoKVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHNlcXVlbmNlID0gc2VxdWVuY2UuZ2V0TmV4dCgpO1xuICAgICAgICBjdXJySW5kZXgrKztcbiAgICB9XG4gICAgaWYgKHNpemUpXG4gICAgICAgIHRyYW5zZm9ybSA9IFRyYW5zZm9ybS5tb3ZlVGhlbihbXG4gICAgICAgICAgICAtc2l6ZVswXSAqIG9yaWdpblswXSxcbiAgICAgICAgICAgIC1zaXplWzFdICogb3JpZ2luWzFdLFxuICAgICAgICAgICAgMFxuICAgICAgICBdLCB0cmFuc2Zvcm0pO1xuICAgIHJldHVybiB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNmb3JtLFxuICAgICAgICBvcGFjaXR5OiBvcGFjaXR5LFxuICAgICAgICBzaXplOiBzaXplLFxuICAgICAgICB0YXJnZXQ6IHJlc3VsdFxuICAgIH07XG59O1xubW9kdWxlLmV4cG9ydHMgPSBHcmlkTGF5b3V0OyIsIi8vIEltcG9ydCBhZGRpdGlvbmFsIG1vZHVsZXMgdG8gYmUgdXNlZCBpbiB0aGlzIHZpZXcgXG52YXIgVmlldyA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvY29yZS9WaWV3Jyk7XG52YXIgU3VyZmFjZSA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvY29yZS9TdXJmYWNlJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9jb3JlL1RyYW5zZm9ybScpO1xudmFyIE1vZGlmaWVyICAgPSByZXF1aXJlKCdmYW1vdXMvc3JjL2NvcmUvTW9kaWZpZXInKTtcbnZhciBJbWFnZVN1cmZhY2UgPSByZXF1aXJlKCdmYW1vdXMvc3JjL3N1cmZhY2VzL0ltYWdlU3VyZmFjZScpXG5cbnZhciBTdGF0ZU1vZGlmaWVyID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9tb2RpZmllcnMvU3RhdGVNb2RpZmllcicpO1xudmFyIEdyaWRMYXlvdXQgPSByZXF1aXJlKCdmYW1vdXMvc3JjL3ZpZXdzL0dyaWRMYXlvdXQnKTtcbnZhciBUcmFuc2l0aW9uYWJsZSA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGUnKVxudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBTcHJpbmdUcmFuc2l0aW9uID0gcmVxdWlyZSgnZmFtb3VzL3NyYy90cmFuc2l0aW9ucy9TcHJpbmdUcmFuc2l0aW9uJyk7XG5cbnZhciBHZW5lcmljU3luYyA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvaW5wdXRzL0dlbmVyaWNTeW5jJyk7XG52YXIgTW91c2VTeW5jICAgPSByZXF1aXJlKCdmYW1vdXMvc3JjL2lucHV0cy9Nb3VzZVN5bmMnKTtcbnZhciBUb3VjaFN5bmMgICA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvaW5wdXRzL1RvdWNoU3luYycpO1xuXG4vLyBSZWdpc3RlciBzeW5jIGNsYXNzZXMgZ2xvYmFsbHkgZm9yIGxhdGVyIHVzZSBpbiBHZW5lcmljU3luY1xuR2VuZXJpY1N5bmMucmVnaXN0ZXIoe1xuICAgICdtb3VzZScgOiBNb3VzZVN5bmMsXG4gICAgJ3RvdWNoJyA6IFRvdWNoU3luY1xufSk7XG5cbi8vIEFzc2lnbiBtb3VzZSBhbmQgdG91Y2ggc3luY2luZyBtZXRob2RzXG52YXIgc3luYyA9IG5ldyBHZW5lcmljU3luYyhcbiAgICBbJ21vdXNlJywgJ3RvdWNoJ10sXG4gICAge2RpcmVjdGlvbiA6IEdlbmVyaWNTeW5jLkRJUkVDVElPTl9YfVxuKTtcblxuLy8gQ29uc3RydWN0b3IgZnVuY3Rpb24gZm9yIG91ciBBcHBWaWV3IGNsYXNzXG5mdW5jdGlvbiBBZEdlbmVyYXRvcigpIHtcbiAgICB2YXIgbG9nbyA9IGdldExvZ28oKTtcbiAgICB2YXIgbW9kaWZpZXIgPSBnZXRNb2RpZmllcigpO1xuICAgIHZhciBwb3NpdGlvbk1vZGlmaWVyID0gZ2V0UG9zaXRpb25Nb2RpZmllcigpO1xuXG4gICAgcmV0dXJuIHtsb2dvOiBsb2dvLCBtb2RpZmllcjogbW9kaWZpZXIsIHBvc2l0aW9uTW9kaWZpZXI6IHBvc2l0aW9uTW9kaWZpZXJ9O1xufVxuXG5mdW5jdGlvbiBnZXRMb2dvKCkge1xuICAgIHZhciBsb2dvID0gbmV3IEltYWdlU3VyZmFjZSh7XG4gICAgICBzaXplOiBbMzAwLCAxMDBdLFxuICAgICAgY29udGVudDogJ2ltYWdlcy9Db2NhLUNvbGEucG5nJyxcbiAgICAgIGNsYXNzZXM6IFsnYmFja2ZhY2VWaXNpYmlsaXR5J10sXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgIGxpbmVIZWlnaHQ6ICcxMDBweCdcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBsb2dvO1xufVxuXG5mdW5jdGlvbiBnZXRNb2RpZmllcigpIHtcbiAgICB2YXIgbW9kaWZpZXIgPSBuZXcgTW9kaWZpZXIoe1xuICAgICAgICBzaXplOiBbMTAwLDEwMF0sXG4gICAgICAgIG9yaWdpbjogWy41LDEgXSxcbiAgICAgICAgYWxpZ246Wy41LC4wOF0sXG4gICAgICAgIHRyYW5zZm9ybTogVHJhbnNmb3JtLnJvdGF0ZSgyLDAsMC4xKVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1vZGlmaWVyO1xufVxuXG5mdW5jdGlvbiBnZXRQb3NpdGlvbk1vZGlmaWVyKCkge1xuICAgIHZhciBwb3NpdGlvbiA9IFswLCAwXTtcbiAgICB2YXIgcG9zaXRpb25Nb2RpZmllciA9IG5ldyBNb2RpZmllcih7XG4gICAgICAgIHRyYW5zZm9ybSA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gVHJhbnNmb3JtLnRyYW5zbGF0ZShwb3NpdGlvblswXSwgcG9zaXRpb25bMV0sIDApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcG9zaXRpb25Nb2RpZmllcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBZEdlbmVyYXRvcjsiLCIvLyBJbXBvcnQgYWRkaXRpb25hbCBtb2R1bGVzIHRvIGJlIHVzZWQgaW4gdGhpcyB2aWV3IFxudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBNb2RpZmllciA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvY29yZS9Nb2RpZmllcicpO1xuXG52YXIgTW91c2VTeW5jICAgICA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvaW5wdXRzL01vdXNlU3luYycpO1xudmFyIFRvdWNoU3luYyAgICAgPSByZXF1aXJlKCdmYW1vdXMvc3JjL2lucHV0cy9Ub3VjaFN5bmMnKTtcbnZhciBTY3JvbGxTeW5jICAgID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9pbnB1dHMvU2Nyb2xsU3luYycpO1xudmFyIEdlbmVyaWNTeW5jICAgPSByZXF1aXJlKCdmYW1vdXMvc3JjL2lucHV0cy9HZW5lcmljU3luYycpO1xuXG52YXIgVHJhbnNpdGlvbmFibGUgPSByZXF1aXJlKCdmYW1vdXMvc3JjL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlJyk7XG5cbi8vIFJlZ2lzdGVyIHN5bmMgaW5wdXRzXG5HZW5lcmljU3luYy5yZWdpc3Rlcih7XG4gICAgJ21vdXNlJzogTW91c2VTeW5jLFxuICAgICd0b3VjaCc6IFRvdWNoU3luYyxcbiAgICAnc2Nyb2xsJzogU2Nyb2xsU3luY1xufSlcblxuLy8gQ3JlYXRlIGEgdHJhbnNpdGlvbmFibGUgZm9yIHBvc2l0aW9uXG5wb3NpdGlvbiA9IG5ldyBUcmFuc2l0aW9uYWJsZShbMCwgMF0pO1xuXG4vLyBTZXQgc3luYyB2YXJpYWJsZSBmb3IgZ2VuZXJpYyBzeW5jIG1ldGhvZHNcbnZhciBzeW5jID0gbmV3IEdlbmVyaWNTeW5jKHtcbiAgICAnbW91c2UnOiB7fSxcbiAgICAndG91Y2gnOiB7fSxcbiAgICAnc2Nyb2xsJzoge3NjYWxlIDogLjV9XG59KTtcblxuXG5mdW5jdGlvbiBkcmFnKHN1cmZhY2UpIHtcbiAgICAvLyBMaW5rcyBzeW5jIHRvIG91ciBzdXJmYWNlIHBhcmFtZXRlclxuICAgIHN1cmZhY2UucGlwZShzeW5jKTtcblxuICAgIC8vIFVwZGF0ZXMgcG9zaXRpb24gb2YgdHJhbnNpdGlvbmFibGVcbiAgICBzeW5jLm9uKCd1cGRhdGUnLCBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgdmFyIGN1cnJlbnRQb3NpdGlvbiA9IHBvc2l0aW9uLmdldCgpO1xuXG4gICAgICAgIHBvc2l0aW9uLnNldChbXG4gICAgICAgICAgICBjdXJyZW50UG9zaXRpb25bMF0gKyBkYXRhLmRlbHRhWzBdLFxuICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uWzFdXG4gICAgICAgIF0pO1xuICAgIH0pO1xuXG4gICAgLy8gQXBwbGllcyB1cGRhdGVkIHBvc2l0aW9uIHRvIHN1cmZhY2VcbiAgICB2YXIgcG9zaXRpb25Nb2RpZmllciA9IG5ldyBNb2RpZmllcih7XG4gICAgICAgIHRyYW5zZm9ybTogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBjdXJyZW50UG9zaXRpb24gPSBwb3NpdGlvbi5nZXQoKTtcbiAgICAgICAgICAgIHJldHVybiBUcmFuc2Zvcm0udHJhbnNsYXRlKGN1cnJlbnRQb3NpdGlvblswXSwgY3VycmVudFBvc2l0aW9uWzFdLCAwKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gU2VuZHMgYmFjayB0aGUgbW9kaWZpZWQgc3VyZmFjZSBhbmQgcG9zaXRpb24gbW9kaWZpZXJcbiAgICByZXR1cm4ge3N1cmZhY2U6IHN1cmZhY2UsIHBvc2l0aW9uTW9kaWZpZXI6IHBvc2l0aW9uTW9kaWZpZXJ9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRyYWc7IiwiLy8gTG9hZCBjc3NcbnJlcXVpcmUoJy4vc3R5bGVzJyk7XG4vLyBMb2FkIHBvbHlmaWxsc1xucmVxdWlyZSgnZmFtb3VzLXBvbHlmaWxscycpO1xuLy8gTG9hZCBBZEdlbmVyYXRvclxudmFyIEFkR2VuZXJhdG9yID0gcmVxdWlyZSgnLi9BZEdlbmVyYXRvcicpO1xuLy8gTG9hZCBkcmFnXG52YXIgZHJhZyA9IHJlcXVpcmUoJy4vZHJhZycpO1xuXG4vLyBJbXBvcnQgRGVwZW5kZW5jaWVzXG52YXIgRW5naW5lID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9jb3JlL0VuZ2luZScpO1xudmFyIFN1cmZhY2UgPSByZXF1aXJlKCdmYW1vdXMvc3JjL2NvcmUvU3VyZmFjZScpO1xuXG4vLyBDcmVhdGUgY29udGFpbmVyIGFuZCBzZXQgdG8gbWFpbiBjb250ZXh0XG52YXIgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmFtb3VzLWNvbnRhaW5lcicpO1xuRW5naW5lLnNldE9wdGlvbnMoeyBhcHBNb2RlOiBmYWxzZSB9KTtcbnZhciBjb250YWluZXIgPSBFbmdpbmUuY3JlYXRlQ29udGV4dChlbCk7XG5cbmNyZWF0ZUNvbnRhaW5lcigpO1xuXG4vLyBGaWxsIGNvbnRhaW5lciB3aXRoIGEgbGF5b3V0IGFuZCBjb250ZW50IGZyb20gdGhlIEFkR2VuZXJhdG9yXG5mdW5jdGlvbiBjcmVhdGVDb250YWluZXIoKSB7XG5cdHZhciBhZE9iamVjdCA9IEFkR2VuZXJhdG9yKCk7XG5cblx0ZHJhZ09iamVjdCA9IGRyYWcoYWRPYmplY3QubG9nbyk7XG5cblx0Y29udGFpbmVyXG5cdFx0LmFkZChhZE9iamVjdC5tb2RpZmllcilcblx0XHQuYWRkKGFkT2JqZWN0LnBvc2l0aW9uTW9kaWZpZXIpXG5cdFx0LmFkZChkcmFnT2JqZWN0LnBvc2l0aW9uTW9kaWZpZXIpXG5cdFx0LmFkZChkcmFnT2JqZWN0LnN1cmZhY2UpO1xufVxuIiwidmFyIGNzcyA9IFwiaHRtbCB7XFxuICBiYWNrZ3JvdW5kOiAjZmZmO1xcbn1cXG5cXG4uYmFja2ZhY2VWaXNpYmlsaXR5IHtcXG4gIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gIGJhY2tmYWNlLXZpc2liaWxpdHk6IHZpc2libGU7XFxufVxcblwiOyAocmVxdWlyZShcIi9Vc2Vycy9wc2hhdGFyYS9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvSGFja1JlYWN0b3IvQWRGYW1lL25vZGVfbW9kdWxlcy9jc3NpZnlcIikpKGNzcyk7IG1vZHVsZS5leHBvcnRzID0gY3NzOyIsIi8vIGxvYWQgY3NzXG5yZXF1aXJlKCdmYW1vdXMvc3JjL2NvcmUvZmFtb3VzLmNzcycpO1xucmVxdWlyZSgnLi9hcHAuY3NzJyk7XG4iXX0=

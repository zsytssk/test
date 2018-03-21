/**
 * Based on ReactKonva.js
 * Copyright (c) 2017-present Lavrenov Anton.
 * All rights reserved.
 *
 * MIT
 */
"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var invariant = require("fbjs/lib/invariant");
var emptyObject = require("fbjs/lib/emptyObject");
var React = require("react");
var Konva = Laya;
var ReactFiberReconciler = require("react-reconciler");
var ReactDOMFrameScheduling = require("./ReactDOMFrameScheduling");
var ReactDOMComponentTree = require("./ReactDOMComponentTree");

var Component = React.Component;

var propsToSkip = {
  children: true,
  ref: true,
  key: true,
  style: true
};

var warningShowed = false;

function applyNodeProps(instance, props) {
  var oldProps =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!warningShowed && "id" in props) {
    var message =
      'ReactKonva: You are using "id" attribute for a Konva node. In some very rare cases it may produce bugs. Currently we recommend not to use it and use "name" attribute instead.\nYou are using id = "' +
      props.id +
      '".\nFor me info see: https://github.com/lavrton/react-konva/issues/119';
    console.warn(message);
    warningShowed = true;
  }

  var updatedProps = {};
  var hasUpdates = false;
  for (var key in oldProps) {
    if (propsToSkip[key]) {
      continue;
    }
    var isEvent = key.slice(0, 2) === "on";
    var propChanged = oldProps[key] !== props[key];
    if (isEvent && propChanged) {
      var eventName = key.substr(2).toLowerCase();
      if (eventName.substr(0, 7) === "content") {
        eventName =
          "content" +
          eventName.substr(7, 1).toUpperCase() +
          eventName.substr(8);
      }
      instance.off(eventName, oldProps[key]);
    }
    var toRemove = !props.hasOwnProperty(key);
    if (toRemove) {
      instance[key] = undefined;
    }
  }
  for (var key in props) {
    if (propsToSkip[key]) {
      continue;
    }
    var isEvent = key.slice(0, 2) === "on";
    var toAdd = oldProps[key] !== props[key];
    if (isEvent && toAdd) {
      var eventName = key.substr(2).toLowerCase();
      if (eventName.substr(0, 7) === "content") {
        eventName =
          "content" +
          eventName.substr(7, 1).toUpperCase() +
          eventName.substr(8);
      }
      if (props[key]) {
        instance.on(eventName, instance, props[key]);
      }
    }
    if (
      !isEvent &&
      (props[key] !== oldProps[key] || props[key] !== instance[key])
    ) {
      hasUpdates = true;
      updatedProps[key] = props[key];
    }
  }

  if (hasUpdates) {
    setAttrs(instance, updatedProps);
  }
}

function setAttrs(instance, props) {
  for (let key in props) {
    instance[key] = props[key];
  }
}

var Stage = (function(_Component) {
  _inherits(Stage, _Component);

  function Stage() {
    _classCallCheck(this, Stage);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Stage.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
      height = _props.height,
      width = _props.width;
    Laya.init(_props.width, _props.height);
    this._stage = Laya.stage;
    applyNodeProps(this._stage, this.props);

    this._mountNode = KonvaRenderer.createContainer(this._stage);

    console.log(this._mountNode);
    KonvaRenderer.updateContainer(this.props.children, this._mountNode, this);
  };

  Stage.prototype.componentDidUpdate = function componentDidUpdate(
    prevProps,
    prevState
  ) {
    var props = this.props;

    applyNodeProps(this._stage, this.props, prevProps);

    KonvaRenderer.updateContainer(this.props.children, this._mountNode, this);
  };

  Stage.prototype.componentWillUnmount = function componentWillUnmount() {
    KonvaRenderer.updateContainer(null, this._mountNode, this);
    this._stage.destroy();
  };

  Stage.prototype.getStage = function getStage() {
    return this._stage;
  };

  Stage.prototype.render = function render() {
    return "";
  };

  return Stage;
})(Component);

var KONVA_NODES = ["Sprite", "Text", "Image", "Button", "Box"];

var TYPES = {};

KONVA_NODES.forEach(function(nodeName) {
  TYPES[nodeName] = nodeName;
});

var UPDATE_SIGNAL = {};

var KonvaRenderer = ReactFiberReconciler({
  appendInitialChild: function appendInitialChild(parentInstance, child) {
    if (typeof child === "string") {
      // Noop for string children of Text (eg <Text>{'foo'}{'bar'}</Text>)
      invariant(
        false,
        'Don not use plain text as child of Konva.Node. You are using text: "%s"',
        child
      );
      return;
    }

    parentInstance.addChild(child);
  },
  createInstance: function createInstance(type, props, internalInstanceHandle) {
    var NodeClass = Konva[type];
    if (!NodeClass) {
      invariant(instance, 'ReactKonva does not support the type "%s"', type);
      return;
    }

    var instance = new NodeClass();
    applyNodeProps(instance, props);

    return instance;
  },
  createTextInstance: function createTextInstance(
    text,
    rootContainerInstance,
    internalInstanceHandle
  ) {
    invariant(
      false,
      "Text components are not supported for now in ReactKonva."
    );
  },
  finalizeInitialChildren: function finalizeInitialChildren(
    domElement,
    type,
    props
  ) {
    return false;
  },
  getPublicInstance: function getPublicInstance(instance) {
    return instance;
  },
  prepareForCommit: function prepareForCommit() {
    // Noop
  },
  prepareUpdate: function prepareUpdate(domElement, type, oldProps, newProps) {
    return UPDATE_SIGNAL;
  },
  resetAfterCommit: function resetAfterCommit() {
    // Noop
  },
  resetTextContent: function resetTextContent(domElement) {
    // Noop
  },
  shouldDeprioritizeSubtree: function shouldDeprioritizeSubtree(type, props) {
    return false;
  },
  getRootHostContext: function getRootHostContext() {
    return emptyObject;
  },
  getChildHostContext: function getChildHostContext() {
    return emptyObject;
  },

  scheduleDeferredCallback: ReactDOMFrameScheduling.rIC,

  shouldSetTextContent: function shouldSetTextContent(type, props) {
    return false;
  },

  now: ReactDOMFrameScheduling.now,

  useSyncScheduling: true,

  mutation: {
    appendChild: function appendChild(parentInstance, child) {
      if (child.parent === parentInstance) {
        return;
      }
      parentInstance.addChild(child);
    },
    appendChildToContainer: function appendChildToContainer(
      parentInstance,
      child
    ) {
      if (child.parent === parentInstance) {
        return;
      }
      parentInstance.addChild(child);
    },
    insertBefore: function insertBefore(parentInstance, child, beforeChild) {
      invariant(
        child !== beforeChild,
        "ReactKonva: Can not insert node before itself"
      );
      for (let i = 0; i < parentInstance.numChildren; i++) {
        if (parentInstance.getChildAt(i) == beforeChild) {
          parentInstance.addChildAt(child, i + 1);
          return;
        }
      }
    },
    insertInContainerBefore: function insertInContainerBefore(
      parentInstance,
      child,
      beforeChild
    ) {
      invariant(
        child !== beforeChild,
        "ReactKonva: Can not insert node before itself"
      );
      for (let i = 0; i < parentInstance.numChildren; i++) {
        if (parentInstance.getChildAt(i) == beforeChild) {
          parentInstance.addChildAt(child, i + 1);
          return;
        }
      }
    },
    removeChild: function removeChild(parentInstance, child) {
      child.destroy();
    },
    removeChildFromContainer: function removeChildFromContainer(
      parentInstance,
      child
    ) {
      child.destroy();
    },
    commitTextUpdate: function commitTextUpdate(
      textInstance,
      oldText,
      newText
    ) {
      invariant(false, "Text components are not yet supported in ReactKonva.");
    },
    commitMount: function commitMount(instance, type, newProps) {
      // Noop
    },
    commitUpdate: function commitUpdate(
      instance,
      updatePayload,
      type,
      oldProps,
      newProps,
      fiberInstance
    ) {
      applyNodeProps(instance, newProps, oldProps);
    }
  }
});

var foundDevTools = KonvaRenderer.injectIntoDevTools({
  findFiberByHostInstance: ReactDOMComponentTree.getClosestInstanceFromNode,
  bundleType: 1,
  version: React.version || 16,
  rendererPackageName: "react-konva",
  getInspectorDataForViewTag: function getInspectorDataForViewTag() {
    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    console.log(args);
  }
});

/** API */

module.exports = Object.assign({}, TYPES, {
  Stage: Stage
});

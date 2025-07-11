(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var objectAssign;
var hasRequiredObjectAssign;
function requireObjectAssign() {
  if (hasRequiredObjectAssign) return objectAssign;
  hasRequiredObjectAssign = 1;
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;
  function toObject(val) {
    if (val === null || val === void 0) {
      throw new TypeError("Object.assign cannot be called with null or undefined");
    }
    return Object(val);
  }
  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      }
      var test1 = new String("abc");
      test1[5] = "de";
      if (Object.getOwnPropertyNames(test1)[0] === "5") {
        return false;
      }
      var test2 = {};
      for (var i = 0; i < 10; i++) {
        test2["_" + String.fromCharCode(i)] = i;
      }
      var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
        return test2[n];
      });
      if (order2.join("") !== "0123456789") {
        return false;
      }
      var test3 = {};
      "abcdefghijklmnopqrst".split("").forEach(function(letter) {
        test3[letter] = letter;
      });
      if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }
  objectAssign = shouldUseNative() ? Object.assign : function(target, source) {
    var from;
    var to = toObject(target);
    var symbols;
    for (var s = 1; s < arguments.length; s++) {
      from = Object(arguments[s]);
      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }
      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from);
        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from, symbols[i])) {
            to[symbols[i]] = from[symbols[i]];
          }
        }
      }
    }
    return to;
  };
  return objectAssign;
}
var react = { exports: {} };
var react_production_min = {};
/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReact_production_min;
function requireReact_production_min() {
  if (hasRequiredReact_production_min) return react_production_min;
  hasRequiredReact_production_min = 1;
  var l = requireObjectAssign(), n = 60103, p = 60106;
  react_production_min.Fragment = 60107;
  react_production_min.StrictMode = 60108;
  react_production_min.Profiler = 60114;
  var q = 60109, r = 60110, t = 60112;
  react_production_min.Suspense = 60113;
  var u = 60115, v = 60116;
  if ("function" === typeof Symbol && Symbol.for) {
    var w = Symbol.for;
    n = w("react.element");
    p = w("react.portal");
    react_production_min.Fragment = w("react.fragment");
    react_production_min.StrictMode = w("react.strict_mode");
    react_production_min.Profiler = w("react.profiler");
    q = w("react.provider");
    r = w("react.context");
    t = w("react.forward_ref");
    react_production_min.Suspense = w("react.suspense");
    u = w("react.memo");
    v = w("react.lazy");
  }
  var x = "function" === typeof Symbol && Symbol.iterator;
  function y(a) {
    if (null === a || "object" !== typeof a) return null;
    a = x && a[x] || a["@@iterator"];
    return "function" === typeof a ? a : null;
  }
  function z(a) {
    for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
    return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var A = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, B = {};
  function C(a, b, c) {
    this.props = a;
    this.context = b;
    this.refs = B;
    this.updater = c || A;
  }
  C.prototype.isReactComponent = {};
  C.prototype.setState = function(a, b) {
    if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error(z(85));
    this.updater.enqueueSetState(this, a, b, "setState");
  };
  C.prototype.forceUpdate = function(a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
  };
  function D() {
  }
  D.prototype = C.prototype;
  function E(a, b, c) {
    this.props = a;
    this.context = b;
    this.refs = B;
    this.updater = c || A;
  }
  var F = E.prototype = new D();
  F.constructor = E;
  l(F, C.prototype);
  F.isPureReactComponent = true;
  var G = { current: null }, H = Object.prototype.hasOwnProperty, I = { key: true, ref: true, __self: true, __source: true };
  function J(a, b, c) {
    var e, d = {}, k = null, h = null;
    if (null != b) for (e in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) H.call(b, e) && !I.hasOwnProperty(e) && (d[e] = b[e]);
    var g = arguments.length - 2;
    if (1 === g) d.children = c;
    else if (1 < g) {
      for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
      d.children = f;
    }
    if (a && a.defaultProps) for (e in g = a.defaultProps, g) void 0 === d[e] && (d[e] = g[e]);
    return { $$typeof: n, type: a, key: k, ref: h, props: d, _owner: G.current };
  }
  function K(a, b) {
    return { $$typeof: n, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
  }
  function L(a) {
    return "object" === typeof a && null !== a && a.$$typeof === n;
  }
  function escape(a) {
    var b = { "=": "=0", ":": "=2" };
    return "$" + a.replace(/[=:]/g, function(a2) {
      return b[a2];
    });
  }
  var M = /\/+/g;
  function N(a, b) {
    return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
  }
  function O(a, b, c, e, d) {
    var k = typeof a;
    if ("undefined" === k || "boolean" === k) a = null;
    var h = false;
    if (null === a) h = true;
    else switch (k) {
      case "string":
      case "number":
        h = true;
        break;
      case "object":
        switch (a.$$typeof) {
          case n:
          case p:
            h = true;
        }
    }
    if (h) return h = a, d = d(h), a = "" === e ? "." + N(h, 0) : e, Array.isArray(d) ? (c = "", null != a && (c = a.replace(M, "$&/") + "/"), O(d, b, c, "", function(a2) {
      return a2;
    })) : null != d && (L(d) && (d = K(d, c + (!d.key || h && h.key === d.key ? "" : ("" + d.key).replace(M, "$&/") + "/") + a)), b.push(d)), 1;
    h = 0;
    e = "" === e ? "." : e + ":";
    if (Array.isArray(a)) for (var g = 0; g < a.length; g++) {
      k = a[g];
      var f = e + N(k, g);
      h += O(k, b, c, f, d);
    }
    else if (f = y(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done; ) k = k.value, f = e + N(k, g++), h += O(k, b, c, f, d);
    else if ("object" === k) throw b = "" + a, Error(z(31, "[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b));
    return h;
  }
  function P(a, b, c) {
    if (null == a) return a;
    var e = [], d = 0;
    O(a, e, "", "", function(a2) {
      return b.call(c, a2, d++);
    });
    return e;
  }
  function Q(a) {
    if (-1 === a._status) {
      var b = a._result;
      b = b();
      a._status = 0;
      a._result = b;
      b.then(function(b2) {
        0 === a._status && (b2 = b2.default, a._status = 1, a._result = b2);
      }, function(b2) {
        0 === a._status && (a._status = 2, a._result = b2);
      });
    }
    if (1 === a._status) return a._result;
    throw a._result;
  }
  var R = { current: null };
  function S() {
    var a = R.current;
    if (null === a) throw Error(z(321));
    return a;
  }
  var T = { ReactCurrentDispatcher: R, ReactCurrentBatchConfig: { transition: 0 }, ReactCurrentOwner: G, IsSomeRendererActing: { current: false }, assign: l };
  react_production_min.Children = { map: P, forEach: function(a, b, c) {
    P(a, function() {
      b.apply(this, arguments);
    }, c);
  }, count: function(a) {
    var b = 0;
    P(a, function() {
      b++;
    });
    return b;
  }, toArray: function(a) {
    return P(a, function(a2) {
      return a2;
    }) || [];
  }, only: function(a) {
    if (!L(a)) throw Error(z(143));
    return a;
  } };
  react_production_min.Component = C;
  react_production_min.PureComponent = E;
  react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T;
  react_production_min.cloneElement = function(a, b, c) {
    if (null === a || void 0 === a) throw Error(z(267, a));
    var e = l({}, a.props), d = a.key, k = a.ref, h = a._owner;
    if (null != b) {
      void 0 !== b.ref && (k = b.ref, h = G.current);
      void 0 !== b.key && (d = "" + b.key);
      if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
      for (f in b) H.call(b, f) && !I.hasOwnProperty(f) && (e[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
    }
    var f = arguments.length - 2;
    if (1 === f) e.children = c;
    else if (1 < f) {
      g = Array(f);
      for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
      e.children = g;
    }
    return {
      $$typeof: n,
      type: a.type,
      key: d,
      ref: k,
      props: e,
      _owner: h
    };
  };
  react_production_min.createContext = function(a, b) {
    void 0 === b && (b = null);
    a = { $$typeof: r, _calculateChangedBits: b, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null };
    a.Provider = { $$typeof: q, _context: a };
    return a.Consumer = a;
  };
  react_production_min.createElement = J;
  react_production_min.createFactory = function(a) {
    var b = J.bind(null, a);
    b.type = a;
    return b;
  };
  react_production_min.createRef = function() {
    return { current: null };
  };
  react_production_min.forwardRef = function(a) {
    return { $$typeof: t, render: a };
  };
  react_production_min.isValidElement = L;
  react_production_min.lazy = function(a) {
    return { $$typeof: v, _payload: { _status: -1, _result: a }, _init: Q };
  };
  react_production_min.memo = function(a, b) {
    return { $$typeof: u, type: a, compare: void 0 === b ? null : b };
  };
  react_production_min.useCallback = function(a, b) {
    return S().useCallback(a, b);
  };
  react_production_min.useContext = function(a, b) {
    return S().useContext(a, b);
  };
  react_production_min.useDebugValue = function() {
  };
  react_production_min.useEffect = function(a, b) {
    return S().useEffect(a, b);
  };
  react_production_min.useImperativeHandle = function(a, b, c) {
    return S().useImperativeHandle(a, b, c);
  };
  react_production_min.useLayoutEffect = function(a, b) {
    return S().useLayoutEffect(a, b);
  };
  react_production_min.useMemo = function(a, b) {
    return S().useMemo(a, b);
  };
  react_production_min.useReducer = function(a, b, c) {
    return S().useReducer(a, b, c);
  };
  react_production_min.useRef = function(a) {
    return S().useRef(a);
  };
  react_production_min.useState = function(a) {
    return S().useState(a);
  };
  react_production_min.version = "17.0.2";
  return react_production_min;
}
var hasRequiredReact;
function requireReact() {
  if (hasRequiredReact) return react.exports;
  hasRequiredReact = 1;
  {
    react.exports = requireReact_production_min();
  }
  return react.exports;
}
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_production_min;
function requireReactJsxRuntime_production_min() {
  if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
  hasRequiredReactJsxRuntime_production_min = 1;
  requireObjectAssign();
  var f = requireReact(), g = 60103;
  reactJsxRuntime_production_min.Fragment = 60107;
  if ("function" === typeof Symbol && Symbol.for) {
    var h = Symbol.for;
    g = h("react.element");
    reactJsxRuntime_production_min.Fragment = h("react.fragment");
  }
  var m = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, n = Object.prototype.hasOwnProperty, p = { key: true, ref: true, __self: true, __source: true };
  function q(c, a, k) {
    var b, d = {}, e = null, l = null;
    void 0 !== k && (e = "" + k);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (l = a.ref);
    for (b in a) n.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
    return { $$typeof: g, type: c, key: e, ref: l, props: d, _owner: m.current };
  }
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  return reactJsxRuntime_production_min;
}
var hasRequiredJsxRuntime;
function requireJsxRuntime() {
  if (hasRequiredJsxRuntime) return jsxRuntime.exports;
  hasRequiredJsxRuntime = 1;
  {
    jsxRuntime.exports = requireReactJsxRuntime_production_min();
  }
  return jsxRuntime.exports;
}
var jsxRuntimeExports = requireJsxRuntime();
var reactExports = requireReact();
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/** @license React v0.20.2
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredScheduler_production_min;
function requireScheduler_production_min() {
  if (hasRequiredScheduler_production_min) return scheduler_production_min;
  hasRequiredScheduler_production_min = 1;
  (function(exports) {
    var f, g, h, k;
    if ("object" === typeof performance && "function" === typeof performance.now) {
      var l = performance;
      exports.unstable_now = function() {
        return l.now();
      };
    } else {
      var p = Date, q = p.now();
      exports.unstable_now = function() {
        return p.now() - q;
      };
    }
    if ("undefined" === typeof window || "function" !== typeof MessageChannel) {
      var t = null, u = null, w = function() {
        if (null !== t) try {
          var a = exports.unstable_now();
          t(true, a);
          t = null;
        } catch (b) {
          throw setTimeout(w, 0), b;
        }
      };
      f = function(a) {
        null !== t ? setTimeout(f, 0, a) : (t = a, setTimeout(w, 0));
      };
      g = function(a, b) {
        u = setTimeout(a, b);
      };
      h = function() {
        clearTimeout(u);
      };
      exports.unstable_shouldYield = function() {
        return false;
      };
      k = exports.unstable_forceFrameRate = function() {
      };
    } else {
      var x = window.setTimeout, y = window.clearTimeout;
      if ("undefined" !== typeof console) {
        var z = window.cancelAnimationFrame;
        "function" !== typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
        "function" !== typeof z && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
      }
      var A = false, B = null, C = -1, D = 5, E = 0;
      exports.unstable_shouldYield = function() {
        return exports.unstable_now() >= E;
      };
      k = function() {
      };
      exports.unstable_forceFrameRate = function(a) {
        0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : D = 0 < a ? Math.floor(1e3 / a) : 5;
      };
      var F = new MessageChannel(), G = F.port2;
      F.port1.onmessage = function() {
        if (null !== B) {
          var a = exports.unstable_now();
          E = a + D;
          try {
            B(true, a) ? G.postMessage(null) : (A = false, B = null);
          } catch (b) {
            throw G.postMessage(null), b;
          }
        } else A = false;
      };
      f = function(a) {
        B = a;
        A || (A = true, G.postMessage(null));
      };
      g = function(a, b) {
        C = x(function() {
          a(exports.unstable_now());
        }, b);
      };
      h = function() {
        y(C);
        C = -1;
      };
    }
    function H(a, b) {
      var c = a.length;
      a.push(b);
      a: for (; ; ) {
        var d = c - 1 >>> 1, e = a[d];
        if (void 0 !== e && 0 < I(e, b)) a[d] = b, a[c] = e, c = d;
        else break a;
      }
    }
    function J(a) {
      a = a[0];
      return void 0 === a ? null : a;
    }
    function K(a) {
      var b = a[0];
      if (void 0 !== b) {
        var c = a.pop();
        if (c !== b) {
          a[0] = c;
          a: for (var d = 0, e = a.length; d < e; ) {
            var m = 2 * (d + 1) - 1, n = a[m], v = m + 1, r = a[v];
            if (void 0 !== n && 0 > I(n, c)) void 0 !== r && 0 > I(r, n) ? (a[d] = r, a[v] = c, d = v) : (a[d] = n, a[m] = c, d = m);
            else if (void 0 !== r && 0 > I(r, c)) a[d] = r, a[v] = c, d = v;
            else break a;
          }
        }
        return b;
      }
      return null;
    }
    function I(a, b) {
      var c = a.sortIndex - b.sortIndex;
      return 0 !== c ? c : a.id - b.id;
    }
    var L = [], M = [], N = 1, O = null, P = 3, Q = false, R = false, S = false;
    function T(a) {
      for (var b = J(M); null !== b; ) {
        if (null === b.callback) K(M);
        else if (b.startTime <= a) K(M), b.sortIndex = b.expirationTime, H(L, b);
        else break;
        b = J(M);
      }
    }
    function U(a) {
      S = false;
      T(a);
      if (!R) if (null !== J(L)) R = true, f(V);
      else {
        var b = J(M);
        null !== b && g(U, b.startTime - a);
      }
    }
    function V(a, b) {
      R = false;
      S && (S = false, h());
      Q = true;
      var c = P;
      try {
        T(b);
        for (O = J(L); null !== O && (!(O.expirationTime > b) || a && !exports.unstable_shouldYield()); ) {
          var d = O.callback;
          if ("function" === typeof d) {
            O.callback = null;
            P = O.priorityLevel;
            var e = d(O.expirationTime <= b);
            b = exports.unstable_now();
            "function" === typeof e ? O.callback = e : O === J(L) && K(L);
            T(b);
          } else K(L);
          O = J(L);
        }
        if (null !== O) var m = true;
        else {
          var n = J(M);
          null !== n && g(U, n.startTime - b);
          m = false;
        }
        return m;
      } finally {
        O = null, P = c, Q = false;
      }
    }
    var W = k;
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(a) {
      a.callback = null;
    };
    exports.unstable_continueExecution = function() {
      R || Q || (R = true, f(V));
    };
    exports.unstable_getCurrentPriorityLevel = function() {
      return P;
    };
    exports.unstable_getFirstCallbackNode = function() {
      return J(L);
    };
    exports.unstable_next = function(a) {
      switch (P) {
        case 1:
        case 2:
        case 3:
          var b = 3;
          break;
        default:
          b = P;
      }
      var c = P;
      P = b;
      try {
        return a();
      } finally {
        P = c;
      }
    };
    exports.unstable_pauseExecution = function() {
    };
    exports.unstable_requestPaint = W;
    exports.unstable_runWithPriority = function(a, b) {
      switch (a) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          a = 3;
      }
      var c = P;
      P = a;
      try {
        return b();
      } finally {
        P = c;
      }
    };
    exports.unstable_scheduleCallback = function(a, b, c) {
      var d = exports.unstable_now();
      "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
      switch (a) {
        case 1:
          var e = -1;
          break;
        case 2:
          e = 250;
          break;
        case 5:
          e = 1073741823;
          break;
        case 4:
          e = 1e4;
          break;
        default:
          e = 5e3;
      }
      e = c + e;
      a = { id: N++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
      c > d ? (a.sortIndex = c, H(M, a), null === J(L) && a === J(M) && (S ? h() : S = true, g(U, c - d))) : (a.sortIndex = e, H(L, a), R || Q || (R = true, f(V)));
      return a;
    };
    exports.unstable_wrapCallback = function(a) {
      var b = P;
      return function() {
        var c = P;
        P = b;
        try {
          return a.apply(this, arguments);
        } finally {
          P = c;
        }
      };
    };
  })(scheduler_production_min);
  return scheduler_production_min;
}
var hasRequiredScheduler;
function requireScheduler() {
  if (hasRequiredScheduler) return scheduler.exports;
  hasRequiredScheduler = 1;
  {
    scheduler.exports = requireScheduler_production_min();
  }
  return scheduler.exports;
}
/** @license React v17.0.2
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactDom_production_min;
function requireReactDom_production_min() {
  if (hasRequiredReactDom_production_min) return reactDom_production_min;
  hasRequiredReactDom_production_min = 1;
  var aa = requireReact(), m = requireObjectAssign(), r = requireScheduler();
  function y(a) {
    for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
    return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  if (!aa) throw Error(y(227));
  var ba = /* @__PURE__ */ new Set(), ca = {};
  function da(a, b) {
    ea(a, b);
    ea(a + "Capture", b);
  }
  function ea(a, b) {
    ca[a] = b;
    for (a = 0; a < b.length; a++) ba.add(b[a]);
  }
  var fa = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ha = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ia = Object.prototype.hasOwnProperty, ja = {}, ka = {};
  function la(a) {
    if (ia.call(ka, a)) return true;
    if (ia.call(ja, a)) return false;
    if (ha.test(a)) return ka[a] = true;
    ja[a] = true;
    return false;
  }
  function ma(a, b, c, d) {
    if (null !== c && 0 === c.type) return false;
    switch (typeof b) {
      case "function":
      case "symbol":
        return true;
      case "boolean":
        if (d) return false;
        if (null !== c) return !c.acceptsBooleans;
        a = a.toLowerCase().slice(0, 5);
        return "data-" !== a && "aria-" !== a;
      default:
        return false;
    }
  }
  function na(a, b, c, d) {
    if (null === b || "undefined" === typeof b || ma(a, b, c, d)) return true;
    if (d) return false;
    if (null !== c) switch (c.type) {
      case 3:
        return !b;
      case 4:
        return false === b;
      case 5:
        return isNaN(b);
      case 6:
        return isNaN(b) || 1 > b;
    }
    return false;
  }
  function B(a, b, c, d, e, f, g) {
    this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
    this.attributeName = d;
    this.attributeNamespace = e;
    this.mustUseProperty = c;
    this.propertyName = a;
    this.type = b;
    this.sanitizeURL = f;
    this.removeEmptyString = g;
  }
  var D = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
    D[a] = new B(a, 0, false, a, null, false, false);
  });
  [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
    var b = a[0];
    D[b] = new B(b, 1, false, a[1], null, false, false);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
    D[a] = new B(a, 2, false, a.toLowerCase(), null, false, false);
  });
  ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
    D[a] = new B(a, 2, false, a, null, false, false);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
    D[a] = new B(a, 3, false, a.toLowerCase(), null, false, false);
  });
  ["checked", "multiple", "muted", "selected"].forEach(function(a) {
    D[a] = new B(a, 3, true, a, null, false, false);
  });
  ["capture", "download"].forEach(function(a) {
    D[a] = new B(a, 4, false, a, null, false, false);
  });
  ["cols", "rows", "size", "span"].forEach(function(a) {
    D[a] = new B(a, 6, false, a, null, false, false);
  });
  ["rowSpan", "start"].forEach(function(a) {
    D[a] = new B(a, 5, false, a.toLowerCase(), null, false, false);
  });
  var oa = /[\-:]([a-z])/g;
  function pa(a) {
    return a[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
    var b = a.replace(
      oa,
      pa
    );
    D[b] = new B(b, 1, false, a, null, false, false);
  });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
    var b = a.replace(oa, pa);
    D[b] = new B(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
  });
  ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
    var b = a.replace(oa, pa);
    D[b] = new B(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
  });
  ["tabIndex", "crossOrigin"].forEach(function(a) {
    D[a] = new B(a, 1, false, a.toLowerCase(), null, false, false);
  });
  D.xlinkHref = new B("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
  ["src", "href", "action", "formAction"].forEach(function(a) {
    D[a] = new B(a, 1, false, a.toLowerCase(), null, true, true);
  });
  function qa(a, b, c, d) {
    var e = D.hasOwnProperty(b) ? D[b] : null;
    var f = null !== e ? 0 === e.type : d ? false : !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1] ? false : true;
    f || (na(b, c, e, d) && (c = null), d || null === e ? la(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c))));
  }
  var ra = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, sa = 60103, ta = 60106, ua = 60107, wa = 60108, xa = 60114, ya = 60109, za = 60110, Aa = 60112, Ba = 60113, Ca = 60120, Da = 60115, Ea = 60116, Fa = 60121, Ga = 60128, Ha = 60129, Ia = 60130, Ja = 60131;
  if ("function" === typeof Symbol && Symbol.for) {
    var E = Symbol.for;
    sa = E("react.element");
    ta = E("react.portal");
    ua = E("react.fragment");
    wa = E("react.strict_mode");
    xa = E("react.profiler");
    ya = E("react.provider");
    za = E("react.context");
    Aa = E("react.forward_ref");
    Ba = E("react.suspense");
    Ca = E("react.suspense_list");
    Da = E("react.memo");
    Ea = E("react.lazy");
    Fa = E("react.block");
    E("react.scope");
    Ga = E("react.opaque.id");
    Ha = E("react.debug_trace_mode");
    Ia = E("react.offscreen");
    Ja = E("react.legacy_hidden");
  }
  var Ka = "function" === typeof Symbol && Symbol.iterator;
  function La(a) {
    if (null === a || "object" !== typeof a) return null;
    a = Ka && a[Ka] || a["@@iterator"];
    return "function" === typeof a ? a : null;
  }
  var Ma;
  function Na(a) {
    if (void 0 === Ma) try {
      throw Error();
    } catch (c) {
      var b = c.stack.trim().match(/\n( *(at )?)/);
      Ma = b && b[1] || "";
    }
    return "\n" + Ma + a;
  }
  var Oa = false;
  function Pa(a, b) {
    if (!a || Oa) return "";
    Oa = true;
    var c = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (b) if (b = function() {
        throw Error();
      }, Object.defineProperty(b.prototype, "props", { set: function() {
        throw Error();
      } }), "object" === typeof Reflect && Reflect.construct) {
        try {
          Reflect.construct(b, []);
        } catch (k) {
          var d = k;
        }
        Reflect.construct(a, [], b);
      } else {
        try {
          b.call();
        } catch (k) {
          d = k;
        }
        a.call(b.prototype);
      }
      else {
        try {
          throw Error();
        } catch (k) {
          d = k;
        }
        a();
      }
    } catch (k) {
      if (k && d && "string" === typeof k.stack) {
        for (var e = k.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; ) h--;
        for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f[h]) {
          if (1 !== g || 1 !== h) {
            do
              if (g--, h--, 0 > h || e[g] !== f[h]) return "\n" + e[g].replace(" at new ", " at ");
            while (1 <= g && 0 <= h);
          }
          break;
        }
      }
    } finally {
      Oa = false, Error.prepareStackTrace = c;
    }
    return (a = a ? a.displayName || a.name : "") ? Na(a) : "";
  }
  function Qa(a) {
    switch (a.tag) {
      case 5:
        return Na(a.type);
      case 16:
        return Na("Lazy");
      case 13:
        return Na("Suspense");
      case 19:
        return Na("SuspenseList");
      case 0:
      case 2:
      case 15:
        return a = Pa(a.type, false), a;
      case 11:
        return a = Pa(a.type.render, false), a;
      case 22:
        return a = Pa(a.type._render, false), a;
      case 1:
        return a = Pa(a.type, true), a;
      default:
        return "";
    }
  }
  function Ra(a) {
    if (null == a) return null;
    if ("function" === typeof a) return a.displayName || a.name || null;
    if ("string" === typeof a) return a;
    switch (a) {
      case ua:
        return "Fragment";
      case ta:
        return "Portal";
      case xa:
        return "Profiler";
      case wa:
        return "StrictMode";
      case Ba:
        return "Suspense";
      case Ca:
        return "SuspenseList";
    }
    if ("object" === typeof a) switch (a.$$typeof) {
      case za:
        return (a.displayName || "Context") + ".Consumer";
      case ya:
        return (a._context.displayName || "Context") + ".Provider";
      case Aa:
        var b = a.render;
        b = b.displayName || b.name || "";
        return a.displayName || ("" !== b ? "ForwardRef(" + b + ")" : "ForwardRef");
      case Da:
        return Ra(a.type);
      case Fa:
        return Ra(a._render);
      case Ea:
        b = a._payload;
        a = a._init;
        try {
          return Ra(a(b));
        } catch (c) {
        }
    }
    return null;
  }
  function Sa(a) {
    switch (typeof a) {
      case "boolean":
      case "number":
      case "object":
      case "string":
      case "undefined":
        return a;
      default:
        return "";
    }
  }
  function Ta(a) {
    var b = a.type;
    return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
  }
  function Ua(a) {
    var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
    if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
      var e = c.get, f = c.set;
      Object.defineProperty(a, b, { configurable: true, get: function() {
        return e.call(this);
      }, set: function(a2) {
        d = "" + a2;
        f.call(this, a2);
      } });
      Object.defineProperty(a, b, { enumerable: c.enumerable });
      return { getValue: function() {
        return d;
      }, setValue: function(a2) {
        d = "" + a2;
      }, stopTracking: function() {
        a._valueTracker = null;
        delete a[b];
      } };
    }
  }
  function Va(a) {
    a._valueTracker || (a._valueTracker = Ua(a));
  }
  function Wa(a) {
    if (!a) return false;
    var b = a._valueTracker;
    if (!b) return true;
    var c = b.getValue();
    var d = "";
    a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
    a = d;
    return a !== c ? (b.setValue(a), true) : false;
  }
  function Xa(a) {
    a = a || ("undefined" !== typeof document ? document : void 0);
    if ("undefined" === typeof a) return null;
    try {
      return a.activeElement || a.body;
    } catch (b) {
      return a.body;
    }
  }
  function Ya(a, b) {
    var c = b.checked;
    return m({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
  }
  function Za(a, b) {
    var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
    c = Sa(null != b.value ? b.value : c);
    a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
  }
  function $a(a, b) {
    b = b.checked;
    null != b && qa(a, "checked", b, false);
  }
  function ab(a, b) {
    $a(a, b);
    var c = Sa(b.value), d = b.type;
    if (null != c) if ("number" === d) {
      if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
    } else a.value !== "" + c && (a.value = "" + c);
    else if ("submit" === d || "reset" === d) {
      a.removeAttribute("value");
      return;
    }
    b.hasOwnProperty("value") ? bb(a, b.type, c) : b.hasOwnProperty("defaultValue") && bb(a, b.type, Sa(b.defaultValue));
    null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
  }
  function cb(a, b, c) {
    if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
      var d = b.type;
      if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
      b = "" + a._wrapperState.initialValue;
      c || b === a.value || (a.value = b);
      a.defaultValue = b;
    }
    c = a.name;
    "" !== c && (a.name = "");
    a.defaultChecked = !!a._wrapperState.initialChecked;
    "" !== c && (a.name = c);
  }
  function bb(a, b, c) {
    if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
  }
  function db(a) {
    var b = "";
    aa.Children.forEach(a, function(a2) {
      null != a2 && (b += a2);
    });
    return b;
  }
  function eb(a, b) {
    a = m({ children: void 0 }, b);
    if (b = db(b.children)) a.children = b;
    return a;
  }
  function fb(a, b, c, d) {
    a = a.options;
    if (b) {
      b = {};
      for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
      for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
    } else {
      c = "" + Sa(c);
      b = null;
      for (e = 0; e < a.length; e++) {
        if (a[e].value === c) {
          a[e].selected = true;
          d && (a[e].defaultSelected = true);
          return;
        }
        null !== b || a[e].disabled || (b = a[e]);
      }
      null !== b && (b.selected = true);
    }
  }
  function gb(a, b) {
    if (null != b.dangerouslySetInnerHTML) throw Error(y(91));
    return m({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
  }
  function hb(a, b) {
    var c = b.value;
    if (null == c) {
      c = b.children;
      b = b.defaultValue;
      if (null != c) {
        if (null != b) throw Error(y(92));
        if (Array.isArray(c)) {
          if (!(1 >= c.length)) throw Error(y(93));
          c = c[0];
        }
        b = c;
      }
      null == b && (b = "");
      c = b;
    }
    a._wrapperState = { initialValue: Sa(c) };
  }
  function ib(a, b) {
    var c = Sa(b.value), d = Sa(b.defaultValue);
    null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
    null != d && (a.defaultValue = "" + d);
  }
  function jb(a) {
    var b = a.textContent;
    b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
  }
  var kb = { html: "http://www.w3.org/1999/xhtml", svg: "http://www.w3.org/2000/svg" };
  function lb(a) {
    switch (a) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function mb(a, b) {
    return null == a || "http://www.w3.org/1999/xhtml" === a ? lb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
  }
  var nb, ob = function(a) {
    return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
      MSApp.execUnsafeLocalFunction(function() {
        return a(b, c, d, e);
      });
    } : a;
  }(function(a, b) {
    if (a.namespaceURI !== kb.svg || "innerHTML" in a) a.innerHTML = b;
    else {
      nb = nb || document.createElement("div");
      nb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
      for (b = nb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
      for (; b.firstChild; ) a.appendChild(b.firstChild);
    }
  });
  function pb(a, b) {
    if (b) {
      var c = a.firstChild;
      if (c && c === a.lastChild && 3 === c.nodeType) {
        c.nodeValue = b;
        return;
      }
    }
    a.textContent = b;
  }
  var qb = {
    animationIterationCount: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridArea: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true
  }, rb = ["Webkit", "ms", "Moz", "O"];
  Object.keys(qb).forEach(function(a) {
    rb.forEach(function(b) {
      b = b + a.charAt(0).toUpperCase() + a.substring(1);
      qb[b] = qb[a];
    });
  });
  function sb(a, b, c) {
    return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || qb.hasOwnProperty(a) && qb[a] ? ("" + b).trim() : b + "px";
  }
  function tb(a, b) {
    a = a.style;
    for (var c in b) if (b.hasOwnProperty(c)) {
      var d = 0 === c.indexOf("--"), e = sb(c, b[c], d);
      "float" === c && (c = "cssFloat");
      d ? a.setProperty(c, e) : a[c] = e;
    }
  }
  var ub = m({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
  function vb(a, b) {
    if (b) {
      if (ub[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(y(137, a));
      if (null != b.dangerouslySetInnerHTML) {
        if (null != b.children) throw Error(y(60));
        if (!("object" === typeof b.dangerouslySetInnerHTML && "__html" in b.dangerouslySetInnerHTML)) throw Error(y(61));
      }
      if (null != b.style && "object" !== typeof b.style) throw Error(y(62));
    }
  }
  function wb(a, b) {
    if (-1 === a.indexOf("-")) return "string" === typeof b.is;
    switch (a) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  function xb(a) {
    a = a.target || a.srcElement || window;
    a.correspondingUseElement && (a = a.correspondingUseElement);
    return 3 === a.nodeType ? a.parentNode : a;
  }
  var yb = null, zb = null, Ab = null;
  function Bb(a) {
    if (a = Cb(a)) {
      if ("function" !== typeof yb) throw Error(y(280));
      var b = a.stateNode;
      b && (b = Db(b), yb(a.stateNode, a.type, b));
    }
  }
  function Eb(a) {
    zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
  }
  function Fb() {
    if (zb) {
      var a = zb, b = Ab;
      Ab = zb = null;
      Bb(a);
      if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
    }
  }
  function Gb(a, b) {
    return a(b);
  }
  function Hb(a, b, c, d, e) {
    return a(b, c, d, e);
  }
  function Ib() {
  }
  var Jb = Gb, Kb = false, Lb = false;
  function Mb() {
    if (null !== zb || null !== Ab) Ib(), Fb();
  }
  function Nb(a, b, c) {
    if (Lb) return a(b, c);
    Lb = true;
    try {
      return Jb(a, b, c);
    } finally {
      Lb = false, Mb();
    }
  }
  function Ob(a, b) {
    var c = a.stateNode;
    if (null === c) return null;
    var d = Db(c);
    if (null === d) return null;
    c = d[b];
    a: switch (b) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
        a = !d;
        break a;
      default:
        a = false;
    }
    if (a) return null;
    if (c && "function" !== typeof c) throw Error(y(231, b, typeof c));
    return c;
  }
  var Pb = false;
  if (fa) try {
    var Qb = {};
    Object.defineProperty(Qb, "passive", { get: function() {
      Pb = true;
    } });
    window.addEventListener("test", Qb, Qb);
    window.removeEventListener("test", Qb, Qb);
  } catch (a) {
    Pb = false;
  }
  function Rb(a, b, c, d, e, f, g, h, k) {
    var l = Array.prototype.slice.call(arguments, 3);
    try {
      b.apply(c, l);
    } catch (n) {
      this.onError(n);
    }
  }
  var Sb = false, Tb = null, Ub = false, Vb = null, Wb = { onError: function(a) {
    Sb = true;
    Tb = a;
  } };
  function Xb(a, b, c, d, e, f, g, h, k) {
    Sb = false;
    Tb = null;
    Rb.apply(Wb, arguments);
  }
  function Yb(a, b, c, d, e, f, g, h, k) {
    Xb.apply(this, arguments);
    if (Sb) {
      if (Sb) {
        var l = Tb;
        Sb = false;
        Tb = null;
      } else throw Error(y(198));
      Ub || (Ub = true, Vb = l);
    }
  }
  function Zb(a) {
    var b = a, c = a;
    if (a.alternate) for (; b.return; ) b = b.return;
    else {
      a = b;
      do
        b = a, 0 !== (b.flags & 1026) && (c = b.return), a = b.return;
      while (a);
    }
    return 3 === b.tag ? c : null;
  }
  function $b(a) {
    if (13 === a.tag) {
      var b = a.memoizedState;
      null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
      if (null !== b) return b.dehydrated;
    }
    return null;
  }
  function ac(a) {
    if (Zb(a) !== a) throw Error(y(188));
  }
  function bc(a) {
    var b = a.alternate;
    if (!b) {
      b = Zb(a);
      if (null === b) throw Error(y(188));
      return b !== a ? null : a;
    }
    for (var c = a, d = b; ; ) {
      var e = c.return;
      if (null === e) break;
      var f = e.alternate;
      if (null === f) {
        d = e.return;
        if (null !== d) {
          c = d;
          continue;
        }
        break;
      }
      if (e.child === f.child) {
        for (f = e.child; f; ) {
          if (f === c) return ac(e), a;
          if (f === d) return ac(e), b;
          f = f.sibling;
        }
        throw Error(y(188));
      }
      if (c.return !== d.return) c = e, d = f;
      else {
        for (var g = false, h = e.child; h; ) {
          if (h === c) {
            g = true;
            c = e;
            d = f;
            break;
          }
          if (h === d) {
            g = true;
            d = e;
            c = f;
            break;
          }
          h = h.sibling;
        }
        if (!g) {
          for (h = f.child; h; ) {
            if (h === c) {
              g = true;
              c = f;
              d = e;
              break;
            }
            if (h === d) {
              g = true;
              d = f;
              c = e;
              break;
            }
            h = h.sibling;
          }
          if (!g) throw Error(y(189));
        }
      }
      if (c.alternate !== d) throw Error(y(190));
    }
    if (3 !== c.tag) throw Error(y(188));
    return c.stateNode.current === c ? a : b;
  }
  function cc(a) {
    a = bc(a);
    if (!a) return null;
    for (var b = a; ; ) {
      if (5 === b.tag || 6 === b.tag) return b;
      if (b.child) b.child.return = b, b = b.child;
      else {
        if (b === a) break;
        for (; !b.sibling; ) {
          if (!b.return || b.return === a) return null;
          b = b.return;
        }
        b.sibling.return = b.return;
        b = b.sibling;
      }
    }
    return null;
  }
  function dc(a, b) {
    for (var c = a.alternate; null !== b; ) {
      if (b === a || b === c) return true;
      b = b.return;
    }
    return false;
  }
  var ec, fc, gc, hc, ic = false, jc = [], kc = null, lc = null, mc = null, nc = /* @__PURE__ */ new Map(), oc = /* @__PURE__ */ new Map(), pc = [], qc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function rc(a, b, c, d, e) {
    return { blockedOn: a, domEventName: b, eventSystemFlags: c | 16, nativeEvent: e, targetContainers: [d] };
  }
  function sc(a, b) {
    switch (a) {
      case "focusin":
      case "focusout":
        kc = null;
        break;
      case "dragenter":
      case "dragleave":
        lc = null;
        break;
      case "mouseover":
      case "mouseout":
        mc = null;
        break;
      case "pointerover":
      case "pointerout":
        nc.delete(b.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        oc.delete(b.pointerId);
    }
  }
  function tc(a, b, c, d, e, f) {
    if (null === a || a.nativeEvent !== f) return a = rc(b, c, d, e, f), null !== b && (b = Cb(b), null !== b && fc(b)), a;
    a.eventSystemFlags |= d;
    b = a.targetContainers;
    null !== e && -1 === b.indexOf(e) && b.push(e);
    return a;
  }
  function uc(a, b, c, d, e) {
    switch (b) {
      case "focusin":
        return kc = tc(kc, a, b, c, d, e), true;
      case "dragenter":
        return lc = tc(lc, a, b, c, d, e), true;
      case "mouseover":
        return mc = tc(mc, a, b, c, d, e), true;
      case "pointerover":
        var f = e.pointerId;
        nc.set(f, tc(nc.get(f) || null, a, b, c, d, e));
        return true;
      case "gotpointercapture":
        return f = e.pointerId, oc.set(f, tc(oc.get(f) || null, a, b, c, d, e)), true;
    }
    return false;
  }
  function vc(a) {
    var b = wc(a.target);
    if (null !== b) {
      var c = Zb(b);
      if (null !== c) {
        if (b = c.tag, 13 === b) {
          if (b = $b(c), null !== b) {
            a.blockedOn = b;
            hc(a.lanePriority, function() {
              r.unstable_runWithPriority(a.priority, function() {
                gc(c);
              });
            });
            return;
          }
        } else if (3 === b && c.stateNode.hydrate) {
          a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
          return;
        }
      }
    }
    a.blockedOn = null;
  }
  function xc(a) {
    if (null !== a.blockedOn) return false;
    for (var b = a.targetContainers; 0 < b.length; ) {
      var c = yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
      if (null !== c) return b = Cb(c), null !== b && fc(b), a.blockedOn = c, false;
      b.shift();
    }
    return true;
  }
  function zc(a, b, c) {
    xc(a) && c.delete(b);
  }
  function Ac() {
    for (ic = false; 0 < jc.length; ) {
      var a = jc[0];
      if (null !== a.blockedOn) {
        a = Cb(a.blockedOn);
        null !== a && ec(a);
        break;
      }
      for (var b = a.targetContainers; 0 < b.length; ) {
        var c = yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
        if (null !== c) {
          a.blockedOn = c;
          break;
        }
        b.shift();
      }
      null === a.blockedOn && jc.shift();
    }
    null !== kc && xc(kc) && (kc = null);
    null !== lc && xc(lc) && (lc = null);
    null !== mc && xc(mc) && (mc = null);
    nc.forEach(zc);
    oc.forEach(zc);
  }
  function Bc(a, b) {
    a.blockedOn === b && (a.blockedOn = null, ic || (ic = true, r.unstable_scheduleCallback(r.unstable_NormalPriority, Ac)));
  }
  function Cc(a) {
    function b(b2) {
      return Bc(b2, a);
    }
    if (0 < jc.length) {
      Bc(jc[0], a);
      for (var c = 1; c < jc.length; c++) {
        var d = jc[c];
        d.blockedOn === a && (d.blockedOn = null);
      }
    }
    null !== kc && Bc(kc, a);
    null !== lc && Bc(lc, a);
    null !== mc && Bc(mc, a);
    nc.forEach(b);
    oc.forEach(b);
    for (c = 0; c < pc.length; c++) d = pc[c], d.blockedOn === a && (d.blockedOn = null);
    for (; 0 < pc.length && (c = pc[0], null === c.blockedOn); ) vc(c), null === c.blockedOn && pc.shift();
  }
  function Dc(a, b) {
    var c = {};
    c[a.toLowerCase()] = b.toLowerCase();
    c["Webkit" + a] = "webkit" + b;
    c["Moz" + a] = "moz" + b;
    return c;
  }
  var Ec = { animationend: Dc("Animation", "AnimationEnd"), animationiteration: Dc("Animation", "AnimationIteration"), animationstart: Dc("Animation", "AnimationStart"), transitionend: Dc("Transition", "TransitionEnd") }, Fc = {}, Gc = {};
  fa && (Gc = document.createElement("div").style, "AnimationEvent" in window || (delete Ec.animationend.animation, delete Ec.animationiteration.animation, delete Ec.animationstart.animation), "TransitionEvent" in window || delete Ec.transitionend.transition);
  function Hc(a) {
    if (Fc[a]) return Fc[a];
    if (!Ec[a]) return a;
    var b = Ec[a], c;
    for (c in b) if (b.hasOwnProperty(c) && c in Gc) return Fc[a] = b[c];
    return a;
  }
  var Ic = Hc("animationend"), Jc = Hc("animationiteration"), Kc = Hc("animationstart"), Lc = Hc("transitionend"), Mc = /* @__PURE__ */ new Map(), Nc = /* @__PURE__ */ new Map(), Oc = [
    "abort",
    "abort",
    Ic,
    "animationEnd",
    Jc,
    "animationIteration",
    Kc,
    "animationStart",
    "canplay",
    "canPlay",
    "canplaythrough",
    "canPlayThrough",
    "durationchange",
    "durationChange",
    "emptied",
    "emptied",
    "encrypted",
    "encrypted",
    "ended",
    "ended",
    "error",
    "error",
    "gotpointercapture",
    "gotPointerCapture",
    "load",
    "load",
    "loadeddata",
    "loadedData",
    "loadedmetadata",
    "loadedMetadata",
    "loadstart",
    "loadStart",
    "lostpointercapture",
    "lostPointerCapture",
    "playing",
    "playing",
    "progress",
    "progress",
    "seeking",
    "seeking",
    "stalled",
    "stalled",
    "suspend",
    "suspend",
    "timeupdate",
    "timeUpdate",
    Lc,
    "transitionEnd",
    "waiting",
    "waiting"
  ];
  function Pc(a, b) {
    for (var c = 0; c < a.length; c += 2) {
      var d = a[c], e = a[c + 1];
      e = "on" + (e[0].toUpperCase() + e.slice(1));
      Nc.set(d, b);
      Mc.set(d, e);
      da(e, [d]);
    }
  }
  var Qc = r.unstable_now;
  Qc();
  var F = 8;
  function Rc(a) {
    if (0 !== (1 & a)) return F = 15, 1;
    if (0 !== (2 & a)) return F = 14, 2;
    if (0 !== (4 & a)) return F = 13, 4;
    var b = 24 & a;
    if (0 !== b) return F = 12, b;
    if (0 !== (a & 32)) return F = 11, 32;
    b = 192 & a;
    if (0 !== b) return F = 10, b;
    if (0 !== (a & 256)) return F = 9, 256;
    b = 3584 & a;
    if (0 !== b) return F = 8, b;
    if (0 !== (a & 4096)) return F = 7, 4096;
    b = 4186112 & a;
    if (0 !== b) return F = 6, b;
    b = 62914560 & a;
    if (0 !== b) return F = 5, b;
    if (a & 67108864) return F = 4, 67108864;
    if (0 !== (a & 134217728)) return F = 3, 134217728;
    b = 805306368 & a;
    if (0 !== b) return F = 2, b;
    if (0 !== (1073741824 & a)) return F = 1, 1073741824;
    F = 8;
    return a;
  }
  function Sc(a) {
    switch (a) {
      case 99:
        return 15;
      case 98:
        return 10;
      case 97:
      case 96:
        return 8;
      case 95:
        return 2;
      default:
        return 0;
    }
  }
  function Tc(a) {
    switch (a) {
      case 15:
      case 14:
        return 99;
      case 13:
      case 12:
      case 11:
      case 10:
        return 98;
      case 9:
      case 8:
      case 7:
      case 6:
      case 4:
      case 5:
        return 97;
      case 3:
      case 2:
      case 1:
        return 95;
      case 0:
        return 90;
      default:
        throw Error(y(358, a));
    }
  }
  function Uc(a, b) {
    var c = a.pendingLanes;
    if (0 === c) return F = 0;
    var d = 0, e = 0, f = a.expiredLanes, g = a.suspendedLanes, h = a.pingedLanes;
    if (0 !== f) d = f, e = F = 15;
    else if (f = c & 134217727, 0 !== f) {
      var k = f & ~g;
      0 !== k ? (d = Rc(k), e = F) : (h &= f, 0 !== h && (d = Rc(h), e = F));
    } else f = c & ~g, 0 !== f ? (d = Rc(f), e = F) : 0 !== h && (d = Rc(h), e = F);
    if (0 === d) return 0;
    d = 31 - Vc(d);
    d = c & ((0 > d ? 0 : 1 << d) << 1) - 1;
    if (0 !== b && b !== d && 0 === (b & g)) {
      Rc(b);
      if (e <= F) return b;
      F = e;
    }
    b = a.entangledLanes;
    if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - Vc(b), e = 1 << c, d |= a[c], b &= ~e;
    return d;
  }
  function Wc(a) {
    a = a.pendingLanes & -1073741825;
    return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
  }
  function Xc(a, b) {
    switch (a) {
      case 15:
        return 1;
      case 14:
        return 2;
      case 12:
        return a = Yc(24 & ~b), 0 === a ? Xc(10, b) : a;
      case 10:
        return a = Yc(192 & ~b), 0 === a ? Xc(8, b) : a;
      case 8:
        return a = Yc(3584 & ~b), 0 === a && (a = Yc(4186112 & ~b), 0 === a && (a = 512)), a;
      case 2:
        return b = Yc(805306368 & ~b), 0 === b && (b = 268435456), b;
    }
    throw Error(y(358, a));
  }
  function Yc(a) {
    return a & -a;
  }
  function Zc(a) {
    for (var b = [], c = 0; 31 > c; c++) b.push(a);
    return b;
  }
  function $c(a, b, c) {
    a.pendingLanes |= b;
    var d = b - 1;
    a.suspendedLanes &= d;
    a.pingedLanes &= d;
    a = a.eventTimes;
    b = 31 - Vc(b);
    a[b] = c;
  }
  var Vc = Math.clz32 ? Math.clz32 : ad, bd = Math.log, cd = Math.LN2;
  function ad(a) {
    return 0 === a ? 32 : 31 - (bd(a) / cd | 0) | 0;
  }
  var dd = r.unstable_UserBlockingPriority, ed = r.unstable_runWithPriority, fd = true;
  function gd(a, b, c, d) {
    Kb || Ib();
    var e = hd, f = Kb;
    Kb = true;
    try {
      Hb(e, a, b, c, d);
    } finally {
      (Kb = f) || Mb();
    }
  }
  function id(a, b, c, d) {
    ed(dd, hd.bind(null, a, b, c, d));
  }
  function hd(a, b, c, d) {
    if (fd) {
      var e;
      if ((e = 0 === (b & 4)) && 0 < jc.length && -1 < qc.indexOf(a)) a = rc(null, a, b, c, d), jc.push(a);
      else {
        var f = yc(a, b, c, d);
        if (null === f) e && sc(a, d);
        else {
          if (e) {
            if (-1 < qc.indexOf(a)) {
              a = rc(f, a, b, c, d);
              jc.push(a);
              return;
            }
            if (uc(f, a, b, c, d)) return;
            sc(a, d);
          }
          jd(a, b, d, null, c);
        }
      }
    }
  }
  function yc(a, b, c, d) {
    var e = xb(d);
    e = wc(e);
    if (null !== e) {
      var f = Zb(e);
      if (null === f) e = null;
      else {
        var g = f.tag;
        if (13 === g) {
          e = $b(f);
          if (null !== e) return e;
          e = null;
        } else if (3 === g) {
          if (f.stateNode.hydrate) return 3 === f.tag ? f.stateNode.containerInfo : null;
          e = null;
        } else f !== e && (e = null);
      }
    }
    jd(a, b, d, e, c);
    return null;
  }
  var kd = null, ld = null, md = null;
  function nd() {
    if (md) return md;
    var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
    for (a = 0; a < c && b[a] === e[a]; a++) ;
    var g = c - a;
    for (d = 1; d <= g && b[c - d] === e[f - d]; d++) ;
    return md = e.slice(a, 1 < d ? 1 - d : void 0);
  }
  function od(a) {
    var b = a.keyCode;
    "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
    10 === a && (a = 13);
    return 32 <= a || 13 === a ? a : 0;
  }
  function pd() {
    return true;
  }
  function qd() {
    return false;
  }
  function rd(a) {
    function b(b2, d, e, f, g) {
      this._reactName = b2;
      this._targetInst = e;
      this.type = d;
      this.nativeEvent = f;
      this.target = g;
      this.currentTarget = null;
      for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f) : f[c]);
      this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : false === f.returnValue) ? pd : qd;
      this.isPropagationStopped = qd;
      return this;
    }
    m(b.prototype, { preventDefault: function() {
      this.defaultPrevented = true;
      var a2 = this.nativeEvent;
      a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
    }, stopPropagation: function() {
      var a2 = this.nativeEvent;
      a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
    }, persist: function() {
    }, isPersistent: pd });
    return b;
  }
  var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
    return a.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = m({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = m({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
    return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
  }, movementX: function(a) {
    if ("movementX" in a) return a.movementX;
    a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
    return wd;
  }, movementY: function(a) {
    return "movementY" in a ? a.movementY : xd;
  } }), Bd = rd(Ad), Cd = m({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = m({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = m({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = m({}, sd, { clipboardData: function(a) {
    return "clipboardData" in a ? a.clipboardData : window.clipboardData;
  } }), Jd = rd(Id), Kd = m({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Nd = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Pd(a) {
    var b = this.nativeEvent;
    return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
  }
  function zd() {
    return Pd;
  }
  var Qd = m({}, ud, { key: function(a) {
    if (a.key) {
      var b = Md[a.key] || a.key;
      if ("Unidentified" !== b) return b;
    }
    return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
    return "keypress" === a.type ? od(a) : 0;
  }, keyCode: function(a) {
    return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  }, which: function(a) {
    return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  } }), Rd = rd(Qd), Sd = m({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = m({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = m({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = m({}, Ad, {
    deltaX: function(a) {
      return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
    },
    deltaY: function(a) {
      return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = fa && "CompositionEvent" in window, be = null;
  fa && "documentMode" in document && (be = document.documentMode);
  var ce = fa && "TextEvent" in window && !be, de = fa && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
  function ge(a, b) {
    switch (a) {
      case "keyup":
        return -1 !== $d.indexOf(b.keyCode);
      case "keydown":
        return 229 !== b.keyCode;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function he(a) {
    a = a.detail;
    return "object" === typeof a && "data" in a ? a.data : null;
  }
  var ie = false;
  function je(a, b) {
    switch (a) {
      case "compositionend":
        return he(b);
      case "keypress":
        if (32 !== b.which) return null;
        fe = true;
        return ee;
      case "textInput":
        return a = b.data, a === ee && fe ? null : a;
      default:
        return null;
    }
  }
  function ke(a, b) {
    if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
    switch (a) {
      case "paste":
        return null;
      case "keypress":
        if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
          if (b.char && 1 < b.char.length) return b.char;
          if (b.which) return String.fromCharCode(b.which);
        }
        return null;
      case "compositionend":
        return de && "ko" !== b.locale ? null : b.data;
      default:
        return null;
    }
  }
  var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function me(a) {
    var b = a && a.nodeName && a.nodeName.toLowerCase();
    return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
  }
  function ne(a, b, c, d) {
    Eb(d);
    b = oe(b, "onChange");
    0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
  }
  var pe = null, qe = null;
  function re(a) {
    se(a, 0);
  }
  function te(a) {
    var b = ue(a);
    if (Wa(b)) return a;
  }
  function ve(a, b) {
    if ("change" === a) return b;
  }
  var we = false;
  if (fa) {
    var xe;
    if (fa) {
      var ye = "oninput" in document;
      if (!ye) {
        var ze = document.createElement("div");
        ze.setAttribute("oninput", "return;");
        ye = "function" === typeof ze.oninput;
      }
      xe = ye;
    } else xe = false;
    we = xe && (!document.documentMode || 9 < document.documentMode);
  }
  function Ae() {
    pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
  }
  function Be(a) {
    if ("value" === a.propertyName && te(qe)) {
      var b = [];
      ne(b, qe, a, xb(a));
      a = re;
      if (Kb) a(b);
      else {
        Kb = true;
        try {
          Gb(a, b);
        } finally {
          Kb = false, Mb();
        }
      }
    }
  }
  function Ce(a, b, c) {
    "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
  }
  function De(a) {
    if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
  }
  function Ee(a, b) {
    if ("click" === a) return te(b);
  }
  function Fe(a, b) {
    if ("input" === a || "change" === a) return te(b);
  }
  function Ge(a, b) {
    return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
  }
  var He = "function" === typeof Object.is ? Object.is : Ge, Ie = Object.prototype.hasOwnProperty;
  function Je(a, b) {
    if (He(a, b)) return true;
    if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
    var c = Object.keys(a), d = Object.keys(b);
    if (c.length !== d.length) return false;
    for (d = 0; d < c.length; d++) if (!Ie.call(b, c[d]) || !He(a[c[d]], b[c[d]])) return false;
    return true;
  }
  function Ke(a) {
    for (; a && a.firstChild; ) a = a.firstChild;
    return a;
  }
  function Le(a, b) {
    var c = Ke(a);
    a = 0;
    for (var d; c; ) {
      if (3 === c.nodeType) {
        d = a + c.textContent.length;
        if (a <= b && d >= b) return { node: c, offset: b - a };
        a = d;
      }
      a: {
        for (; c; ) {
          if (c.nextSibling) {
            c = c.nextSibling;
            break a;
          }
          c = c.parentNode;
        }
        c = void 0;
      }
      c = Ke(c);
    }
  }
  function Me(a, b) {
    return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Me(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
  }
  function Ne() {
    for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
      try {
        var c = "string" === typeof b.contentWindow.location.href;
      } catch (d) {
        c = false;
      }
      if (c) a = b.contentWindow;
      else break;
      b = Xa(a.document);
    }
    return b;
  }
  function Oe(a) {
    var b = a && a.nodeName && a.nodeName.toLowerCase();
    return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
  }
  var Pe = fa && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
  function Ue(a, b, c) {
    var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
    Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Oe(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Je(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
  }
  Pc(
    "cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "),
    0
  );
  Pc("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "), 1);
  Pc(Oc, 2);
  for (var Ve = "change selectionchange textInput compositionstart compositionend compositionupdate".split(" "), We = 0; We < Ve.length; We++) Nc.set(Ve[We], 0);
  ea("onMouseEnter", ["mouseout", "mouseover"]);
  ea("onMouseLeave", ["mouseout", "mouseover"]);
  ea("onPointerEnter", ["pointerout", "pointerover"]);
  ea("onPointerLeave", ["pointerout", "pointerover"]);
  da("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
  da("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
  da("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
  da("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
  da("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
  da("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Xe = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Ye = new Set("cancel close invalid load scroll toggle".split(" ").concat(Xe));
  function Ze(a, b, c) {
    var d = a.type || "unknown-event";
    a.currentTarget = c;
    Yb(d, b, void 0, a);
    a.currentTarget = null;
  }
  function se(a, b) {
    b = 0 !== (b & 4);
    for (var c = 0; c < a.length; c++) {
      var d = a[c], e = d.event;
      d = d.listeners;
      a: {
        var f = void 0;
        if (b) for (var g = d.length - 1; 0 <= g; g--) {
          var h = d[g], k = h.instance, l = h.currentTarget;
          h = h.listener;
          if (k !== f && e.isPropagationStopped()) break a;
          Ze(e, h, l);
          f = k;
        }
        else for (g = 0; g < d.length; g++) {
          h = d[g];
          k = h.instance;
          l = h.currentTarget;
          h = h.listener;
          if (k !== f && e.isPropagationStopped()) break a;
          Ze(e, h, l);
          f = k;
        }
      }
    }
    if (Ub) throw a = Vb, Ub = false, Vb = null, a;
  }
  function G(a, b) {
    var c = $e(b), d = a + "__bubble";
    c.has(d) || (af(b, a, 2, false), c.add(d));
  }
  var bf = "_reactListening" + Math.random().toString(36).slice(2);
  function cf(a) {
    a[bf] || (a[bf] = true, ba.forEach(function(b) {
      Ye.has(b) || df(b, false, a, null);
      df(b, true, a, null);
    }));
  }
  function df(a, b, c, d) {
    var e = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 0, f = c;
    "selectionchange" === a && 9 !== c.nodeType && (f = c.ownerDocument);
    var g = $e(f), h = a + "__" + (b ? "capture" : "bubble");
    g.has(h) || (b && (e |= 4), af(f, a, e, b), g.add(h));
  }
  function af(a, b, c, d) {
    var e = Nc.get(b);
    switch (void 0 === e ? 2 : e) {
      case 0:
        e = gd;
        break;
      case 1:
        e = id;
        break;
      default:
        e = hd;
    }
    c = e.bind(null, b, c, a);
    e = void 0;
    !Pb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
    d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
  }
  function jd(a, b, c, d, e) {
    var f = d;
    if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
      if (null === d) return;
      var g = d.tag;
      if (3 === g || 4 === g) {
        var h = d.stateNode.containerInfo;
        if (h === e || 8 === h.nodeType && h.parentNode === e) break;
        if (4 === g) for (g = d.return; null !== g; ) {
          var k = g.tag;
          if (3 === k || 4 === k) {
            if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e) return;
          }
          g = g.return;
        }
        for (; null !== h; ) {
          g = wc(h);
          if (null === g) return;
          k = g.tag;
          if (5 === k || 6 === k) {
            d = f = g;
            continue a;
          }
          h = h.parentNode;
        }
      }
      d = d.return;
    }
    Nb(function() {
      var d2 = f, e2 = xb(c), g2 = [];
      a: {
        var h2 = Mc.get(a);
        if (void 0 !== h2) {
          var k2 = td, x = a;
          switch (a) {
            case "keypress":
              if (0 === od(c)) break a;
            case "keydown":
            case "keyup":
              k2 = Rd;
              break;
            case "focusin":
              x = "focus";
              k2 = Fd;
              break;
            case "focusout":
              x = "blur";
              k2 = Fd;
              break;
            case "beforeblur":
            case "afterblur":
              k2 = Fd;
              break;
            case "click":
              if (2 === c.button) break a;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              k2 = Bd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              k2 = Dd;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              k2 = Vd;
              break;
            case Ic:
            case Jc:
            case Kc:
              k2 = Hd;
              break;
            case Lc:
              k2 = Xd;
              break;
            case "scroll":
              k2 = vd;
              break;
            case "wheel":
              k2 = Zd;
              break;
            case "copy":
            case "cut":
            case "paste":
              k2 = Jd;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              k2 = Td;
          }
          var w = 0 !== (b & 4), z = !w && "scroll" === a, u = w ? null !== h2 ? h2 + "Capture" : null : h2;
          w = [];
          for (var t = d2, q; null !== t; ) {
            q = t;
            var v = q.stateNode;
            5 === q.tag && null !== v && (q = v, null !== u && (v = Ob(t, u), null != v && w.push(ef(t, v, q))));
            if (z) break;
            t = t.return;
          }
          0 < w.length && (h2 = new k2(h2, x, null, c, e2), g2.push({ event: h2, listeners: w }));
        }
      }
      if (0 === (b & 7)) {
        a: {
          h2 = "mouseover" === a || "pointerover" === a;
          k2 = "mouseout" === a || "pointerout" === a;
          if (h2 && 0 === (b & 16) && (x = c.relatedTarget || c.fromElement) && (wc(x) || x[ff])) break a;
          if (k2 || h2) {
            h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
            if (k2) {
              if (x = c.relatedTarget || c.toElement, k2 = d2, x = x ? wc(x) : null, null !== x && (z = Zb(x), x !== z || 5 !== x.tag && 6 !== x.tag)) x = null;
            } else k2 = null, x = d2;
            if (k2 !== x) {
              w = Bd;
              v = "onMouseLeave";
              u = "onMouseEnter";
              t = "mouse";
              if ("pointerout" === a || "pointerover" === a) w = Td, v = "onPointerLeave", u = "onPointerEnter", t = "pointer";
              z = null == k2 ? h2 : ue(k2);
              q = null == x ? h2 : ue(x);
              h2 = new w(v, t + "leave", k2, c, e2);
              h2.target = z;
              h2.relatedTarget = q;
              v = null;
              wc(e2) === d2 && (w = new w(u, t + "enter", x, c, e2), w.target = q, w.relatedTarget = z, v = w);
              z = v;
              if (k2 && x) b: {
                w = k2;
                u = x;
                t = 0;
                for (q = w; q; q = gf(q)) t++;
                q = 0;
                for (v = u; v; v = gf(v)) q++;
                for (; 0 < t - q; ) w = gf(w), t--;
                for (; 0 < q - t; ) u = gf(u), q--;
                for (; t--; ) {
                  if (w === u || null !== u && w === u.alternate) break b;
                  w = gf(w);
                  u = gf(u);
                }
                w = null;
              }
              else w = null;
              null !== k2 && hf(g2, h2, k2, w, false);
              null !== x && null !== z && hf(g2, z, x, w, true);
            }
          }
        }
        a: {
          h2 = d2 ? ue(d2) : window;
          k2 = h2.nodeName && h2.nodeName.toLowerCase();
          if ("select" === k2 || "input" === k2 && "file" === h2.type) var J = ve;
          else if (me(h2)) if (we) J = Fe;
          else {
            J = De;
            var K = Ce;
          }
          else (k2 = h2.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (J = Ee);
          if (J && (J = J(a, d2))) {
            ne(g2, J, c, e2);
            break a;
          }
          K && K(a, h2, d2);
          "focusout" === a && (K = h2._wrapperState) && K.controlled && "number" === h2.type && bb(h2, "number", h2.value);
        }
        K = d2 ? ue(d2) : window;
        switch (a) {
          case "focusin":
            if (me(K) || "true" === K.contentEditable) Qe = K, Re = d2, Se = null;
            break;
          case "focusout":
            Se = Re = Qe = null;
            break;
          case "mousedown":
            Te = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Te = false;
            Ue(g2, c, e2);
            break;
          case "selectionchange":
            if (Pe) break;
          case "keydown":
          case "keyup":
            Ue(g2, c, e2);
        }
        var Q;
        if (ae) b: {
          switch (a) {
            case "compositionstart":
              var L = "onCompositionStart";
              break b;
            case "compositionend":
              L = "onCompositionEnd";
              break b;
            case "compositionupdate":
              L = "onCompositionUpdate";
              break b;
          }
          L = void 0;
        }
        else ie ? ge(a, c) && (L = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (L = "onCompositionStart");
        L && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== L ? "onCompositionEnd" === L && ie && (Q = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), K = oe(d2, L), 0 < K.length && (L = new Ld(L, a, null, c, e2), g2.push({ event: L, listeners: K }), Q ? L.data = Q : (Q = he(c), null !== Q && (L.data = Q))));
        if (Q = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld(
          "onBeforeInput",
          "beforeinput",
          null,
          c,
          e2
        ), g2.push({ event: e2, listeners: d2 }), e2.data = Q);
      }
      se(g2, b);
    });
  }
  function ef(a, b, c) {
    return { instance: a, listener: b, currentTarget: c };
  }
  function oe(a, b) {
    for (var c = b + "Capture", d = []; null !== a; ) {
      var e = a, f = e.stateNode;
      5 === e.tag && null !== f && (e = f, f = Ob(a, c), null != f && d.unshift(ef(a, f, e)), f = Ob(a, b), null != f && d.push(ef(a, f, e)));
      a = a.return;
    }
    return d;
  }
  function gf(a) {
    if (null === a) return null;
    do
      a = a.return;
    while (a && 5 !== a.tag);
    return a ? a : null;
  }
  function hf(a, b, c, d, e) {
    for (var f = b._reactName, g = []; null !== c && c !== d; ) {
      var h = c, k = h.alternate, l = h.stateNode;
      if (null !== k && k === d) break;
      5 === h.tag && null !== l && (h = l, e ? (k = Ob(c, f), null != k && g.unshift(ef(c, k, h))) : e || (k = Ob(c, f), null != k && g.push(ef(c, k, h))));
      c = c.return;
    }
    0 !== g.length && a.push({ event: b, listeners: g });
  }
  function jf() {
  }
  var kf = null, lf = null;
  function mf(a, b) {
    switch (a) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        return !!b.autoFocus;
    }
    return false;
  }
  function nf(a, b) {
    return "textarea" === a || "option" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
  }
  var of = "function" === typeof setTimeout ? setTimeout : void 0, pf = "function" === typeof clearTimeout ? clearTimeout : void 0;
  function qf(a) {
    1 === a.nodeType ? a.textContent = "" : 9 === a.nodeType && (a = a.body, null != a && (a.textContent = ""));
  }
  function rf(a) {
    for (; null != a; a = a.nextSibling) {
      var b = a.nodeType;
      if (1 === b || 3 === b) break;
    }
    return a;
  }
  function sf(a) {
    a = a.previousSibling;
    for (var b = 0; a; ) {
      if (8 === a.nodeType) {
        var c = a.data;
        if ("$" === c || "$!" === c || "$?" === c) {
          if (0 === b) return a;
          b--;
        } else "/$" === c && b++;
      }
      a = a.previousSibling;
    }
    return null;
  }
  var tf = 0;
  function uf(a) {
    return { $$typeof: Ga, toString: a, valueOf: a };
  }
  var vf = Math.random().toString(36).slice(2), wf = "__reactFiber$" + vf, xf = "__reactProps$" + vf, ff = "__reactContainer$" + vf, yf = "__reactEvents$" + vf;
  function wc(a) {
    var b = a[wf];
    if (b) return b;
    for (var c = a.parentNode; c; ) {
      if (b = c[ff] || c[wf]) {
        c = b.alternate;
        if (null !== b.child || null !== c && null !== c.child) for (a = sf(a); null !== a; ) {
          if (c = a[wf]) return c;
          a = sf(a);
        }
        return b;
      }
      a = c;
      c = a.parentNode;
    }
    return null;
  }
  function Cb(a) {
    a = a[wf] || a[ff];
    return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
  }
  function ue(a) {
    if (5 === a.tag || 6 === a.tag) return a.stateNode;
    throw Error(y(33));
  }
  function Db(a) {
    return a[xf] || null;
  }
  function $e(a) {
    var b = a[yf];
    void 0 === b && (b = a[yf] = /* @__PURE__ */ new Set());
    return b;
  }
  var zf = [], Af = -1;
  function Bf(a) {
    return { current: a };
  }
  function H(a) {
    0 > Af || (a.current = zf[Af], zf[Af] = null, Af--);
  }
  function I(a, b) {
    Af++;
    zf[Af] = a.current;
    a.current = b;
  }
  var Cf = {}, M = Bf(Cf), N = Bf(false), Df = Cf;
  function Ef(a, b) {
    var c = a.type.contextTypes;
    if (!c) return Cf;
    var d = a.stateNode;
    if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
    var e = {}, f;
    for (f in c) e[f] = b[f];
    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
    return e;
  }
  function Ff(a) {
    a = a.childContextTypes;
    return null !== a && void 0 !== a;
  }
  function Gf() {
    H(N);
    H(M);
  }
  function Hf(a, b, c) {
    if (M.current !== Cf) throw Error(y(168));
    I(M, b);
    I(N, c);
  }
  function If(a, b, c) {
    var d = a.stateNode;
    a = b.childContextTypes;
    if ("function" !== typeof d.getChildContext) return c;
    d = d.getChildContext();
    for (var e in d) if (!(e in a)) throw Error(y(108, Ra(b) || "Unknown", e));
    return m({}, c, d);
  }
  function Jf(a) {
    a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Cf;
    Df = M.current;
    I(M, a);
    I(N, N.current);
    return true;
  }
  function Kf(a, b, c) {
    var d = a.stateNode;
    if (!d) throw Error(y(169));
    c ? (a = If(a, b, Df), d.__reactInternalMemoizedMergedChildContext = a, H(N), H(M), I(M, a)) : H(N);
    I(N, c);
  }
  var Lf = null, Mf = null, Nf = r.unstable_runWithPriority, Of = r.unstable_scheduleCallback, Pf = r.unstable_cancelCallback, Qf = r.unstable_shouldYield, Rf = r.unstable_requestPaint, Sf = r.unstable_now, Tf = r.unstable_getCurrentPriorityLevel, Uf = r.unstable_ImmediatePriority, Vf = r.unstable_UserBlockingPriority, Wf = r.unstable_NormalPriority, Xf = r.unstable_LowPriority, Yf = r.unstable_IdlePriority, Zf = {}, $f = void 0 !== Rf ? Rf : function() {
  }, ag = null, bg = null, cg = false, dg = Sf(), O = 1e4 > dg ? Sf : function() {
    return Sf() - dg;
  };
  function eg() {
    switch (Tf()) {
      case Uf:
        return 99;
      case Vf:
        return 98;
      case Wf:
        return 97;
      case Xf:
        return 96;
      case Yf:
        return 95;
      default:
        throw Error(y(332));
    }
  }
  function fg(a) {
    switch (a) {
      case 99:
        return Uf;
      case 98:
        return Vf;
      case 97:
        return Wf;
      case 96:
        return Xf;
      case 95:
        return Yf;
      default:
        throw Error(y(332));
    }
  }
  function gg(a, b) {
    a = fg(a);
    return Nf(a, b);
  }
  function hg(a, b, c) {
    a = fg(a);
    return Of(a, b, c);
  }
  function ig() {
    if (null !== bg) {
      var a = bg;
      bg = null;
      Pf(a);
    }
    jg();
  }
  function jg() {
    if (!cg && null !== ag) {
      cg = true;
      var a = 0;
      try {
        var b = ag;
        gg(99, function() {
          for (; a < b.length; a++) {
            var c = b[a];
            do
              c = c(true);
            while (null !== c);
          }
        });
        ag = null;
      } catch (c) {
        throw null !== ag && (ag = ag.slice(a + 1)), Of(Uf, ig), c;
      } finally {
        cg = false;
      }
    }
  }
  var kg = ra.ReactCurrentBatchConfig;
  function lg(a, b) {
    if (a && a.defaultProps) {
      b = m({}, b);
      a = a.defaultProps;
      for (var c in a) void 0 === b[c] && (b[c] = a[c]);
      return b;
    }
    return b;
  }
  var mg = Bf(null), ng = null, og = null, pg = null;
  function qg() {
    pg = og = ng = null;
  }
  function rg(a) {
    var b = mg.current;
    H(mg);
    a.type._context._currentValue = b;
  }
  function sg(a, b) {
    for (; null !== a; ) {
      var c = a.alternate;
      if ((a.childLanes & b) === b) if (null === c || (c.childLanes & b) === b) break;
      else c.childLanes |= b;
      else a.childLanes |= b, null !== c && (c.childLanes |= b);
      a = a.return;
    }
  }
  function tg(a, b) {
    ng = a;
    pg = og = null;
    a = a.dependencies;
    null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (ug = true), a.firstContext = null);
  }
  function vg(a, b) {
    if (pg !== a && false !== b && 0 !== b) {
      if ("number" !== typeof b || 1073741823 === b) pg = a, b = 1073741823;
      b = { context: a, observedBits: b, next: null };
      if (null === og) {
        if (null === ng) throw Error(y(308));
        og = b;
        ng.dependencies = { lanes: 0, firstContext: b, responders: null };
      } else og = og.next = b;
    }
    return a._currentValue;
  }
  var wg = false;
  function xg(a) {
    a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null }, effects: null };
  }
  function yg(a, b) {
    a = a.updateQueue;
    b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
  }
  function zg(a, b) {
    return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
  }
  function Ag(a, b) {
    a = a.updateQueue;
    if (null !== a) {
      a = a.shared;
      var c = a.pending;
      null === c ? b.next = b : (b.next = c.next, c.next = b);
      a.pending = b;
    }
  }
  function Bg(a, b) {
    var c = a.updateQueue, d = a.alternate;
    if (null !== d && (d = d.updateQueue, c === d)) {
      var e = null, f = null;
      c = c.firstBaseUpdate;
      if (null !== c) {
        do {
          var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
          null === f ? e = f = g : f = f.next = g;
          c = c.next;
        } while (null !== c);
        null === f ? e = f = b : f = f.next = b;
      } else e = f = b;
      c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects };
      a.updateQueue = c;
      return;
    }
    a = c.lastBaseUpdate;
    null === a ? c.firstBaseUpdate = b : a.next = b;
    c.lastBaseUpdate = b;
  }
  function Cg(a, b, c, d) {
    var e = a.updateQueue;
    wg = false;
    var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
    if (null !== h) {
      e.shared.pending = null;
      var k = h, l = k.next;
      k.next = null;
      null === g ? f = l : g.next = l;
      g = k;
      var n = a.alternate;
      if (null !== n) {
        n = n.updateQueue;
        var A = n.lastBaseUpdate;
        A !== g && (null === A ? n.firstBaseUpdate = l : A.next = l, n.lastBaseUpdate = k);
      }
    }
    if (null !== f) {
      A = e.baseState;
      g = 0;
      n = l = k = null;
      do {
        h = f.lane;
        var p = f.eventTime;
        if ((d & h) === h) {
          null !== n && (n = n.next = {
            eventTime: p,
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          });
          a: {
            var C = a, x = f;
            h = b;
            p = c;
            switch (x.tag) {
              case 1:
                C = x.payload;
                if ("function" === typeof C) {
                  A = C.call(p, A, h);
                  break a;
                }
                A = C;
                break a;
              case 3:
                C.flags = C.flags & -4097 | 64;
              case 0:
                C = x.payload;
                h = "function" === typeof C ? C.call(p, A, h) : C;
                if (null === h || void 0 === h) break a;
                A = m({}, A, h);
                break a;
              case 2:
                wg = true;
            }
          }
          null !== f.callback && (a.flags |= 32, h = e.effects, null === h ? e.effects = [f] : h.push(f));
        } else p = { eventTime: p, lane: h, tag: f.tag, payload: f.payload, callback: f.callback, next: null }, null === n ? (l = n = p, k = A) : n = n.next = p, g |= h;
        f = f.next;
        if (null === f) if (h = e.shared.pending, null === h) break;
        else f = h.next, h.next = null, e.lastBaseUpdate = h, e.shared.pending = null;
      } while (1);
      null === n && (k = A);
      e.baseState = k;
      e.firstBaseUpdate = l;
      e.lastBaseUpdate = n;
      Dg |= g;
      a.lanes = g;
      a.memoizedState = A;
    }
  }
  function Eg(a, b, c) {
    a = b.effects;
    b.effects = null;
    if (null !== a) for (b = 0; b < a.length; b++) {
      var d = a[b], e = d.callback;
      if (null !== e) {
        d.callback = null;
        d = c;
        if ("function" !== typeof e) throw Error(y(191, e));
        e.call(d);
      }
    }
  }
  var Fg = new aa.Component().refs;
  function Gg(a, b, c, d) {
    b = a.memoizedState;
    c = c(d, b);
    c = null === c || void 0 === c ? b : m({}, b, c);
    a.memoizedState = c;
    0 === a.lanes && (a.updateQueue.baseState = c);
  }
  var Kg = { isMounted: function(a) {
    return (a = a._reactInternals) ? Zb(a) === a : false;
  }, enqueueSetState: function(a, b, c) {
    a = a._reactInternals;
    var d = Hg(), e = Ig(a), f = zg(d, e);
    f.payload = b;
    void 0 !== c && null !== c && (f.callback = c);
    Ag(a, f);
    Jg(a, e, d);
  }, enqueueReplaceState: function(a, b, c) {
    a = a._reactInternals;
    var d = Hg(), e = Ig(a), f = zg(d, e);
    f.tag = 1;
    f.payload = b;
    void 0 !== c && null !== c && (f.callback = c);
    Ag(a, f);
    Jg(a, e, d);
  }, enqueueForceUpdate: function(a, b) {
    a = a._reactInternals;
    var c = Hg(), d = Ig(a), e = zg(c, d);
    e.tag = 2;
    void 0 !== b && null !== b && (e.callback = b);
    Ag(a, e);
    Jg(a, d, c);
  } };
  function Lg(a, b, c, d, e, f, g) {
    a = a.stateNode;
    return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Je(c, d) || !Je(e, f) : true;
  }
  function Mg(a, b, c) {
    var d = false, e = Cf;
    var f = b.contextType;
    "object" === typeof f && null !== f ? f = vg(f) : (e = Ff(b) ? Df : M.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Ef(a, e) : Cf);
    b = new b(c, f);
    a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
    b.updater = Kg;
    a.stateNode = b;
    b._reactInternals = a;
    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
    return b;
  }
  function Ng(a, b, c, d) {
    a = b.state;
    "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
    "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
    b.state !== a && Kg.enqueueReplaceState(b, b.state, null);
  }
  function Og(a, b, c, d) {
    var e = a.stateNode;
    e.props = c;
    e.state = a.memoizedState;
    e.refs = Fg;
    xg(a);
    var f = b.contextType;
    "object" === typeof f && null !== f ? e.context = vg(f) : (f = Ff(b) ? Df : M.current, e.context = Ef(a, f));
    Cg(a, c, e, d);
    e.state = a.memoizedState;
    f = b.getDerivedStateFromProps;
    "function" === typeof f && (Gg(a, b, f, c), e.state = a.memoizedState);
    "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Kg.enqueueReplaceState(e, e.state, null), Cg(a, c, e, d), e.state = a.memoizedState);
    "function" === typeof e.componentDidMount && (a.flags |= 4);
  }
  var Pg = Array.isArray;
  function Qg(a, b, c) {
    a = c.ref;
    if (null !== a && "function" !== typeof a && "object" !== typeof a) {
      if (c._owner) {
        c = c._owner;
        if (c) {
          if (1 !== c.tag) throw Error(y(309));
          var d = c.stateNode;
        }
        if (!d) throw Error(y(147, a));
        var e = "" + a;
        if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === e) return b.ref;
        b = function(a2) {
          var b2 = d.refs;
          b2 === Fg && (b2 = d.refs = {});
          null === a2 ? delete b2[e] : b2[e] = a2;
        };
        b._stringRef = e;
        return b;
      }
      if ("string" !== typeof a) throw Error(y(284));
      if (!c._owner) throw Error(y(290, a));
    }
    return a;
  }
  function Rg(a, b) {
    if ("textarea" !== a.type) throw Error(y(31, "[object Object]" === Object.prototype.toString.call(b) ? "object with keys {" + Object.keys(b).join(", ") + "}" : b));
  }
  function Sg(a) {
    function b(b2, c2) {
      if (a) {
        var d2 = b2.lastEffect;
        null !== d2 ? (d2.nextEffect = c2, b2.lastEffect = c2) : b2.firstEffect = b2.lastEffect = c2;
        c2.nextEffect = null;
        c2.flags = 8;
      }
    }
    function c(c2, d2) {
      if (!a) return null;
      for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
      return null;
    }
    function d(a2, b2) {
      for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
      return a2;
    }
    function e(a2, b2) {
      a2 = Tg(a2, b2);
      a2.index = 0;
      a2.sibling = null;
      return a2;
    }
    function f(b2, c2, d2) {
      b2.index = d2;
      if (!a) return c2;
      d2 = b2.alternate;
      if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags = 2, c2) : d2;
      b2.flags = 2;
      return c2;
    }
    function g(b2) {
      a && null === b2.alternate && (b2.flags = 2);
      return b2;
    }
    function h(a2, b2, c2, d2) {
      if (null === b2 || 6 !== b2.tag) return b2 = Ug(c2, a2.mode, d2), b2.return = a2, b2;
      b2 = e(b2, c2);
      b2.return = a2;
      return b2;
    }
    function k(a2, b2, c2, d2) {
      if (null !== b2 && b2.elementType === c2.type) return d2 = e(b2, c2.props), d2.ref = Qg(a2, b2, c2), d2.return = a2, d2;
      d2 = Vg(c2.type, c2.key, c2.props, null, a2.mode, d2);
      d2.ref = Qg(a2, b2, c2);
      d2.return = a2;
      return d2;
    }
    function l(a2, b2, c2, d2) {
      if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Wg(c2, a2.mode, d2), b2.return = a2, b2;
      b2 = e(b2, c2.children || []);
      b2.return = a2;
      return b2;
    }
    function n(a2, b2, c2, d2, f2) {
      if (null === b2 || 7 !== b2.tag) return b2 = Xg(c2, a2.mode, d2, f2), b2.return = a2, b2;
      b2 = e(b2, c2);
      b2.return = a2;
      return b2;
    }
    function A(a2, b2, c2) {
      if ("string" === typeof b2 || "number" === typeof b2) return b2 = Ug("" + b2, a2.mode, c2), b2.return = a2, b2;
      if ("object" === typeof b2 && null !== b2) {
        switch (b2.$$typeof) {
          case sa:
            return c2 = Vg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Qg(a2, null, b2), c2.return = a2, c2;
          case ta:
            return b2 = Wg(b2, a2.mode, c2), b2.return = a2, b2;
        }
        if (Pg(b2) || La(b2)) return b2 = Xg(
          b2,
          a2.mode,
          c2,
          null
        ), b2.return = a2, b2;
        Rg(a2, b2);
      }
      return null;
    }
    function p(a2, b2, c2, d2) {
      var e2 = null !== b2 ? b2.key : null;
      if ("string" === typeof c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
      if ("object" === typeof c2 && null !== c2) {
        switch (c2.$$typeof) {
          case sa:
            return c2.key === e2 ? c2.type === ua ? n(a2, b2, c2.props.children, d2, e2) : k(a2, b2, c2, d2) : null;
          case ta:
            return c2.key === e2 ? l(a2, b2, c2, d2) : null;
        }
        if (Pg(c2) || La(c2)) return null !== e2 ? null : n(a2, b2, c2, d2, null);
        Rg(a2, c2);
      }
      return null;
    }
    function C(a2, b2, c2, d2, e2) {
      if ("string" === typeof d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
      if ("object" === typeof d2 && null !== d2) {
        switch (d2.$$typeof) {
          case sa:
            return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, d2.type === ua ? n(b2, a2, d2.props.children, e2, d2.key) : k(b2, a2, d2, e2);
          case ta:
            return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l(b2, a2, d2, e2);
        }
        if (Pg(d2) || La(d2)) return a2 = a2.get(c2) || null, n(b2, a2, d2, e2, null);
        Rg(b2, d2);
      }
      return null;
    }
    function x(e2, g2, h2, k2) {
      for (var l2 = null, t = null, u = g2, z = g2 = 0, q = null; null !== u && z < h2.length; z++) {
        u.index > z ? (q = u, u = null) : q = u.sibling;
        var n2 = p(e2, u, h2[z], k2);
        if (null === n2) {
          null === u && (u = q);
          break;
        }
        a && u && null === n2.alternate && b(e2, u);
        g2 = f(n2, g2, z);
        null === t ? l2 = n2 : t.sibling = n2;
        t = n2;
        u = q;
      }
      if (z === h2.length) return c(e2, u), l2;
      if (null === u) {
        for (; z < h2.length; z++) u = A(e2, h2[z], k2), null !== u && (g2 = f(u, g2, z), null === t ? l2 = u : t.sibling = u, t = u);
        return l2;
      }
      for (u = d(e2, u); z < h2.length; z++) q = C(u, e2, z, h2[z], k2), null !== q && (a && null !== q.alternate && u.delete(null === q.key ? z : q.key), g2 = f(q, g2, z), null === t ? l2 = q : t.sibling = q, t = q);
      a && u.forEach(function(a2) {
        return b(e2, a2);
      });
      return l2;
    }
    function w(e2, g2, h2, k2) {
      var l2 = La(h2);
      if ("function" !== typeof l2) throw Error(y(150));
      h2 = l2.call(h2);
      if (null == h2) throw Error(y(151));
      for (var t = l2 = null, u = g2, z = g2 = 0, q = null, n2 = h2.next(); null !== u && !n2.done; z++, n2 = h2.next()) {
        u.index > z ? (q = u, u = null) : q = u.sibling;
        var w2 = p(e2, u, n2.value, k2);
        if (null === w2) {
          null === u && (u = q);
          break;
        }
        a && u && null === w2.alternate && b(e2, u);
        g2 = f(w2, g2, z);
        null === t ? l2 = w2 : t.sibling = w2;
        t = w2;
        u = q;
      }
      if (n2.done) return c(e2, u), l2;
      if (null === u) {
        for (; !n2.done; z++, n2 = h2.next()) n2 = A(e2, n2.value, k2), null !== n2 && (g2 = f(n2, g2, z), null === t ? l2 = n2 : t.sibling = n2, t = n2);
        return l2;
      }
      for (u = d(e2, u); !n2.done; z++, n2 = h2.next()) n2 = C(u, e2, z, n2.value, k2), null !== n2 && (a && null !== n2.alternate && u.delete(null === n2.key ? z : n2.key), g2 = f(n2, g2, z), null === t ? l2 = n2 : t.sibling = n2, t = n2);
      a && u.forEach(function(a2) {
        return b(e2, a2);
      });
      return l2;
    }
    return function(a2, d2, f2, h2) {
      var k2 = "object" === typeof f2 && null !== f2 && f2.type === ua && null === f2.key;
      k2 && (f2 = f2.props.children);
      var l2 = "object" === typeof f2 && null !== f2;
      if (l2) switch (f2.$$typeof) {
        case sa:
          a: {
            l2 = f2.key;
            for (k2 = d2; null !== k2; ) {
              if (k2.key === l2) {
                switch (k2.tag) {
                  case 7:
                    if (f2.type === ua) {
                      c(a2, k2.sibling);
                      d2 = e(k2, f2.props.children);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    }
                    break;
                  default:
                    if (k2.elementType === f2.type) {
                      c(a2, k2.sibling);
                      d2 = e(k2, f2.props);
                      d2.ref = Qg(a2, k2, f2);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    }
                }
                c(a2, k2);
                break;
              } else b(a2, k2);
              k2 = k2.sibling;
            }
            f2.type === ua ? (d2 = Xg(f2.props.children, a2.mode, h2, f2.key), d2.return = a2, a2 = d2) : (h2 = Vg(f2.type, f2.key, f2.props, null, a2.mode, h2), h2.ref = Qg(a2, d2, f2), h2.return = a2, a2 = h2);
          }
          return g(a2);
        case ta:
          a: {
            for (k2 = f2.key; null !== d2; ) {
              if (d2.key === k2) if (4 === d2.tag && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                c(a2, d2.sibling);
                d2 = e(d2, f2.children || []);
                d2.return = a2;
                a2 = d2;
                break a;
              } else {
                c(a2, d2);
                break;
              }
              else b(a2, d2);
              d2 = d2.sibling;
            }
            d2 = Wg(f2, a2.mode, h2);
            d2.return = a2;
            a2 = d2;
          }
          return g(a2);
      }
      if ("string" === typeof f2 || "number" === typeof f2) return f2 = "" + f2, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Ug(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2);
      if (Pg(f2)) return x(a2, d2, f2, h2);
      if (La(f2)) return w(a2, d2, f2, h2);
      l2 && Rg(a2, f2);
      if ("undefined" === typeof f2 && !k2) switch (a2.tag) {
        case 1:
        case 22:
        case 0:
        case 11:
        case 15:
          throw Error(y(152, Ra(a2.type) || "Component"));
      }
      return c(a2, d2);
    };
  }
  var Yg = Sg(true), Zg = Sg(false), $g = {}, ah = Bf($g), bh = Bf($g), ch = Bf($g);
  function dh(a) {
    if (a === $g) throw Error(y(174));
    return a;
  }
  function eh(a, b) {
    I(ch, b);
    I(bh, a);
    I(ah, $g);
    a = b.nodeType;
    switch (a) {
      case 9:
      case 11:
        b = (b = b.documentElement) ? b.namespaceURI : mb(null, "");
        break;
      default:
        a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = mb(b, a);
    }
    H(ah);
    I(ah, b);
  }
  function fh() {
    H(ah);
    H(bh);
    H(ch);
  }
  function gh(a) {
    dh(ch.current);
    var b = dh(ah.current);
    var c = mb(b, a.type);
    b !== c && (I(bh, a), I(ah, c));
  }
  function hh(a) {
    bh.current === a && (H(ah), H(bh));
  }
  var P = Bf(0);
  function ih(a) {
    for (var b = a; null !== b; ) {
      if (13 === b.tag) {
        var c = b.memoizedState;
        if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
      } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
        if (0 !== (b.flags & 64)) return b;
      } else if (null !== b.child) {
        b.child.return = b;
        b = b.child;
        continue;
      }
      if (b === a) break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a) return null;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
    return null;
  }
  var jh = null, kh = null, lh = false;
  function mh(a, b) {
    var c = nh(5, null, null, 0);
    c.elementType = "DELETED";
    c.type = "DELETED";
    c.stateNode = b;
    c.return = a;
    c.flags = 8;
    null !== a.lastEffect ? (a.lastEffect.nextEffect = c, a.lastEffect = c) : a.firstEffect = a.lastEffect = c;
  }
  function oh(a, b) {
    switch (a.tag) {
      case 5:
        var c = a.type;
        b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
        return null !== b ? (a.stateNode = b, true) : false;
      case 6:
        return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, true) : false;
      case 13:
        return false;
      default:
        return false;
    }
  }
  function ph(a) {
    if (lh) {
      var b = kh;
      if (b) {
        var c = b;
        if (!oh(a, b)) {
          b = rf(c.nextSibling);
          if (!b || !oh(a, b)) {
            a.flags = a.flags & -1025 | 2;
            lh = false;
            jh = a;
            return;
          }
          mh(jh, c);
        }
        jh = a;
        kh = rf(b.firstChild);
      } else a.flags = a.flags & -1025 | 2, lh = false, jh = a;
    }
  }
  function qh(a) {
    for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
    jh = a;
  }
  function rh(a) {
    if (a !== jh) return false;
    if (!lh) return qh(a), lh = true, false;
    var b = a.type;
    if (5 !== a.tag || "head" !== b && "body" !== b && !nf(b, a.memoizedProps)) for (b = kh; b; ) mh(a, b), b = rf(b.nextSibling);
    qh(a);
    if (13 === a.tag) {
      a = a.memoizedState;
      a = null !== a ? a.dehydrated : null;
      if (!a) throw Error(y(317));
      a: {
        a = a.nextSibling;
        for (b = 0; a; ) {
          if (8 === a.nodeType) {
            var c = a.data;
            if ("/$" === c) {
              if (0 === b) {
                kh = rf(a.nextSibling);
                break a;
              }
              b--;
            } else "$" !== c && "$!" !== c && "$?" !== c || b++;
          }
          a = a.nextSibling;
        }
        kh = null;
      }
    } else kh = jh ? rf(a.stateNode.nextSibling) : null;
    return true;
  }
  function sh() {
    kh = jh = null;
    lh = false;
  }
  var th = [];
  function uh() {
    for (var a = 0; a < th.length; a++) th[a]._workInProgressVersionPrimary = null;
    th.length = 0;
  }
  var vh = ra.ReactCurrentDispatcher, wh = ra.ReactCurrentBatchConfig, xh = 0, R = null, S = null, T = null, yh = false, zh = false;
  function Ah() {
    throw Error(y(321));
  }
  function Bh(a, b) {
    if (null === b) return false;
    for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
    return true;
  }
  function Ch(a, b, c, d, e, f) {
    xh = f;
    R = b;
    b.memoizedState = null;
    b.updateQueue = null;
    b.lanes = 0;
    vh.current = null === a || null === a.memoizedState ? Dh : Eh;
    a = c(d, e);
    if (zh) {
      f = 0;
      do {
        zh = false;
        if (!(25 > f)) throw Error(y(301));
        f += 1;
        T = S = null;
        b.updateQueue = null;
        vh.current = Fh;
        a = c(d, e);
      } while (zh);
    }
    vh.current = Gh;
    b = null !== S && null !== S.next;
    xh = 0;
    T = S = R = null;
    yh = false;
    if (b) throw Error(y(300));
    return a;
  }
  function Hh() {
    var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    null === T ? R.memoizedState = T = a : T = T.next = a;
    return T;
  }
  function Ih() {
    if (null === S) {
      var a = R.alternate;
      a = null !== a ? a.memoizedState : null;
    } else a = S.next;
    var b = null === T ? R.memoizedState : T.next;
    if (null !== b) T = b, S = a;
    else {
      if (null === a) throw Error(y(310));
      S = a;
      a = { memoizedState: S.memoizedState, baseState: S.baseState, baseQueue: S.baseQueue, queue: S.queue, next: null };
      null === T ? R.memoizedState = T = a : T = T.next = a;
    }
    return T;
  }
  function Jh(a, b) {
    return "function" === typeof b ? b(a) : b;
  }
  function Kh(a) {
    var b = Ih(), c = b.queue;
    if (null === c) throw Error(y(311));
    c.lastRenderedReducer = a;
    var d = S, e = d.baseQueue, f = c.pending;
    if (null !== f) {
      if (null !== e) {
        var g = e.next;
        e.next = f.next;
        f.next = g;
      }
      d.baseQueue = e = f;
      c.pending = null;
    }
    if (null !== e) {
      e = e.next;
      d = d.baseState;
      var h = g = f = null, k = e;
      do {
        var l = k.lane;
        if ((xh & l) === l) null !== h && (h = h.next = { lane: 0, action: k.action, eagerReducer: k.eagerReducer, eagerState: k.eagerState, next: null }), d = k.eagerReducer === a ? k.eagerState : a(d, k.action);
        else {
          var n = {
            lane: l,
            action: k.action,
            eagerReducer: k.eagerReducer,
            eagerState: k.eagerState,
            next: null
          };
          null === h ? (g = h = n, f = d) : h = h.next = n;
          R.lanes |= l;
          Dg |= l;
        }
        k = k.next;
      } while (null !== k && k !== e);
      null === h ? f = d : h.next = g;
      He(d, b.memoizedState) || (ug = true);
      b.memoizedState = d;
      b.baseState = f;
      b.baseQueue = h;
      c.lastRenderedState = d;
    }
    return [b.memoizedState, c.dispatch];
  }
  function Lh(a) {
    var b = Ih(), c = b.queue;
    if (null === c) throw Error(y(311));
    c.lastRenderedReducer = a;
    var d = c.dispatch, e = c.pending, f = b.memoizedState;
    if (null !== e) {
      c.pending = null;
      var g = e = e.next;
      do
        f = a(f, g.action), g = g.next;
      while (g !== e);
      He(f, b.memoizedState) || (ug = true);
      b.memoizedState = f;
      null === b.baseQueue && (b.baseState = f);
      c.lastRenderedState = f;
    }
    return [f, d];
  }
  function Mh(a, b, c) {
    var d = b._getVersion;
    d = d(b._source);
    var e = b._workInProgressVersionPrimary;
    if (null !== e) a = e === d;
    else if (a = a.mutableReadLanes, a = (xh & a) === a) b._workInProgressVersionPrimary = d, th.push(b);
    if (a) return c(b._source);
    th.push(b);
    throw Error(y(350));
  }
  function Nh(a, b, c, d) {
    var e = U;
    if (null === e) throw Error(y(349));
    var f = b._getVersion, g = f(b._source), h = vh.current, k = h.useState(function() {
      return Mh(e, b, c);
    }), l = k[1], n = k[0];
    k = T;
    var A = a.memoizedState, p = A.refs, C = p.getSnapshot, x = A.source;
    A = A.subscribe;
    var w = R;
    a.memoizedState = { refs: p, source: b, subscribe: d };
    h.useEffect(function() {
      p.getSnapshot = c;
      p.setSnapshot = l;
      var a2 = f(b._source);
      if (!He(g, a2)) {
        a2 = c(b._source);
        He(n, a2) || (l(a2), a2 = Ig(w), e.mutableReadLanes |= a2 & e.pendingLanes);
        a2 = e.mutableReadLanes;
        e.entangledLanes |= a2;
        for (var d2 = e.entanglements, h2 = a2; 0 < h2; ) {
          var k2 = 31 - Vc(h2), v = 1 << k2;
          d2[k2] |= a2;
          h2 &= ~v;
        }
      }
    }, [c, b, d]);
    h.useEffect(function() {
      return d(b._source, function() {
        var a2 = p.getSnapshot, c2 = p.setSnapshot;
        try {
          c2(a2(b._source));
          var d2 = Ig(w);
          e.mutableReadLanes |= d2 & e.pendingLanes;
        } catch (q) {
          c2(function() {
            throw q;
          });
        }
      });
    }, [b, d]);
    He(C, c) && He(x, b) && He(A, d) || (a = { pending: null, dispatch: null, lastRenderedReducer: Jh, lastRenderedState: n }, a.dispatch = l = Oh.bind(null, R, a), k.queue = a, k.baseQueue = null, n = Mh(e, b, c), k.memoizedState = k.baseState = n);
    return n;
  }
  function Ph(a, b, c) {
    var d = Ih();
    return Nh(d, a, b, c);
  }
  function Qh(a) {
    var b = Hh();
    "function" === typeof a && (a = a());
    b.memoizedState = b.baseState = a;
    a = b.queue = { pending: null, dispatch: null, lastRenderedReducer: Jh, lastRenderedState: a };
    a = a.dispatch = Oh.bind(null, R, a);
    return [b.memoizedState, a];
  }
  function Rh(a, b, c, d) {
    a = { tag: a, create: b, destroy: c, deps: d, next: null };
    b = R.updateQueue;
    null === b ? (b = { lastEffect: null }, R.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
    return a;
  }
  function Sh(a) {
    var b = Hh();
    a = { current: a };
    return b.memoizedState = a;
  }
  function Th() {
    return Ih().memoizedState;
  }
  function Uh(a, b, c, d) {
    var e = Hh();
    R.flags |= a;
    e.memoizedState = Rh(1 | b, c, void 0, void 0 === d ? null : d);
  }
  function Vh(a, b, c, d) {
    var e = Ih();
    d = void 0 === d ? null : d;
    var f = void 0;
    if (null !== S) {
      var g = S.memoizedState;
      f = g.destroy;
      if (null !== d && Bh(d, g.deps)) {
        Rh(b, c, f, d);
        return;
      }
    }
    R.flags |= a;
    e.memoizedState = Rh(1 | b, c, f, d);
  }
  function Wh(a, b) {
    return Uh(516, 4, a, b);
  }
  function Xh(a, b) {
    return Vh(516, 4, a, b);
  }
  function Yh(a, b) {
    return Vh(4, 2, a, b);
  }
  function Zh(a, b) {
    if ("function" === typeof b) return a = a(), b(a), function() {
      b(null);
    };
    if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
      b.current = null;
    };
  }
  function $h(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return Vh(4, 2, Zh.bind(null, b, a), c);
  }
  function ai() {
  }
  function bi(a, b) {
    var c = Ih();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Bh(b, d[1])) return d[0];
    c.memoizedState = [a, b];
    return a;
  }
  function ci(a, b) {
    var c = Ih();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Bh(b, d[1])) return d[0];
    a = a();
    c.memoizedState = [a, b];
    return a;
  }
  function di(a, b) {
    var c = eg();
    gg(98 > c ? 98 : c, function() {
      a(true);
    });
    gg(97 < c ? 97 : c, function() {
      var c2 = wh.transition;
      wh.transition = 1;
      try {
        a(false), b();
      } finally {
        wh.transition = c2;
      }
    });
  }
  function Oh(a, b, c) {
    var d = Hg(), e = Ig(a), f = { lane: e, action: c, eagerReducer: null, eagerState: null, next: null }, g = b.pending;
    null === g ? f.next = f : (f.next = g.next, g.next = f);
    b.pending = f;
    g = a.alternate;
    if (a === R || null !== g && g === R) zh = yh = true;
    else {
      if (0 === a.lanes && (null === g || 0 === g.lanes) && (g = b.lastRenderedReducer, null !== g)) try {
        var h = b.lastRenderedState, k = g(h, c);
        f.eagerReducer = g;
        f.eagerState = k;
        if (He(k, h)) return;
      } catch (l) {
      } finally {
      }
      Jg(a, e, d);
    }
  }
  var Gh = { readContext: vg, useCallback: Ah, useContext: Ah, useEffect: Ah, useImperativeHandle: Ah, useLayoutEffect: Ah, useMemo: Ah, useReducer: Ah, useRef: Ah, useState: Ah, useDebugValue: Ah, useDeferredValue: Ah, useTransition: Ah, useMutableSource: Ah, useOpaqueIdentifier: Ah, unstable_isNewReconciler: false }, Dh = { readContext: vg, useCallback: function(a, b) {
    Hh().memoizedState = [a, void 0 === b ? null : b];
    return a;
  }, useContext: vg, useEffect: Wh, useImperativeHandle: function(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return Uh(4, 2, Zh.bind(
      null,
      b,
      a
    ), c);
  }, useLayoutEffect: function(a, b) {
    return Uh(4, 2, a, b);
  }, useMemo: function(a, b) {
    var c = Hh();
    b = void 0 === b ? null : b;
    a = a();
    c.memoizedState = [a, b];
    return a;
  }, useReducer: function(a, b, c) {
    var d = Hh();
    b = void 0 !== c ? c(b) : b;
    d.memoizedState = d.baseState = b;
    a = d.queue = { pending: null, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
    a = a.dispatch = Oh.bind(null, R, a);
    return [d.memoizedState, a];
  }, useRef: Sh, useState: Qh, useDebugValue: ai, useDeferredValue: function(a) {
    var b = Qh(a), c = b[0], d = b[1];
    Wh(function() {
      var b2 = wh.transition;
      wh.transition = 1;
      try {
        d(a);
      } finally {
        wh.transition = b2;
      }
    }, [a]);
    return c;
  }, useTransition: function() {
    var a = Qh(false), b = a[0];
    a = di.bind(null, a[1]);
    Sh(a);
    return [a, b];
  }, useMutableSource: function(a, b, c) {
    var d = Hh();
    d.memoizedState = { refs: { getSnapshot: b, setSnapshot: null }, source: a, subscribe: c };
    return Nh(d, a, b, c);
  }, useOpaqueIdentifier: function() {
    if (lh) {
      var a = false, b = uf(function() {
        a || (a = true, c("r:" + (tf++).toString(36)));
        throw Error(y(355));
      }), c = Qh(b)[1];
      0 === (R.mode & 2) && (R.flags |= 516, Rh(
        5,
        function() {
          c("r:" + (tf++).toString(36));
        },
        void 0,
        null
      ));
      return b;
    }
    b = "r:" + (tf++).toString(36);
    Qh(b);
    return b;
  }, unstable_isNewReconciler: false }, Eh = { readContext: vg, useCallback: bi, useContext: vg, useEffect: Xh, useImperativeHandle: $h, useLayoutEffect: Yh, useMemo: ci, useReducer: Kh, useRef: Th, useState: function() {
    return Kh(Jh);
  }, useDebugValue: ai, useDeferredValue: function(a) {
    var b = Kh(Jh), c = b[0], d = b[1];
    Xh(function() {
      var b2 = wh.transition;
      wh.transition = 1;
      try {
        d(a);
      } finally {
        wh.transition = b2;
      }
    }, [a]);
    return c;
  }, useTransition: function() {
    var a = Kh(Jh)[0];
    return [
      Th().current,
      a
    ];
  }, useMutableSource: Ph, useOpaqueIdentifier: function() {
    return Kh(Jh)[0];
  }, unstable_isNewReconciler: false }, Fh = { readContext: vg, useCallback: bi, useContext: vg, useEffect: Xh, useImperativeHandle: $h, useLayoutEffect: Yh, useMemo: ci, useReducer: Lh, useRef: Th, useState: function() {
    return Lh(Jh);
  }, useDebugValue: ai, useDeferredValue: function(a) {
    var b = Lh(Jh), c = b[0], d = b[1];
    Xh(function() {
      var b2 = wh.transition;
      wh.transition = 1;
      try {
        d(a);
      } finally {
        wh.transition = b2;
      }
    }, [a]);
    return c;
  }, useTransition: function() {
    var a = Lh(Jh)[0];
    return [
      Th().current,
      a
    ];
  }, useMutableSource: Ph, useOpaqueIdentifier: function() {
    return Lh(Jh)[0];
  }, unstable_isNewReconciler: false }, ei = ra.ReactCurrentOwner, ug = false;
  function fi(a, b, c, d) {
    b.child = null === a ? Zg(b, null, c, d) : Yg(b, a.child, c, d);
  }
  function gi(a, b, c, d, e) {
    c = c.render;
    var f = b.ref;
    tg(b, e);
    d = Ch(a, b, c, d, f, e);
    if (null !== a && !ug) return b.updateQueue = a.updateQueue, b.flags &= -517, a.lanes &= ~e, hi(a, b, e);
    b.flags |= 1;
    fi(a, b, d, e);
    return b.child;
  }
  function ii(a, b, c, d, e, f) {
    if (null === a) {
      var g = c.type;
      if ("function" === typeof g && !ji(g) && void 0 === g.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = g, ki(a, b, g, d, e, f);
      a = Vg(c.type, null, d, b, b.mode, f);
      a.ref = b.ref;
      a.return = b;
      return b.child = a;
    }
    g = a.child;
    if (0 === (e & f) && (e = g.memoizedProps, c = c.compare, c = null !== c ? c : Je, c(e, d) && a.ref === b.ref)) return hi(a, b, f);
    b.flags |= 1;
    a = Tg(g, d);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  function ki(a, b, c, d, e, f) {
    if (null !== a && Je(a.memoizedProps, d) && a.ref === b.ref) if (ug = false, 0 !== (f & e)) 0 !== (a.flags & 16384) && (ug = true);
    else return b.lanes = a.lanes, hi(a, b, f);
    return li(a, b, c, d, f);
  }
  function mi(a, b, c) {
    var d = b.pendingProps, e = d.children, f = null !== a ? a.memoizedState : null;
    if ("hidden" === d.mode || "unstable-defer-without-hiding" === d.mode) if (0 === (b.mode & 4)) b.memoizedState = { baseLanes: 0 }, ni(b, c);
    else if (0 !== (c & 1073741824)) b.memoizedState = { baseLanes: 0 }, ni(b, null !== f ? f.baseLanes : c);
    else return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a }, ni(b, a), null;
    else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, ni(b, d);
    fi(a, b, e, c);
    return b.child;
  }
  function oi(a, b) {
    var c = b.ref;
    if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 128;
  }
  function li(a, b, c, d, e) {
    var f = Ff(c) ? Df : M.current;
    f = Ef(b, f);
    tg(b, e);
    c = Ch(a, b, c, d, f, e);
    if (null !== a && !ug) return b.updateQueue = a.updateQueue, b.flags &= -517, a.lanes &= ~e, hi(a, b, e);
    b.flags |= 1;
    fi(a, b, c, e);
    return b.child;
  }
  function pi(a, b, c, d, e) {
    if (Ff(c)) {
      var f = true;
      Jf(b);
    } else f = false;
    tg(b, e);
    if (null === b.stateNode) null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2), Mg(b, c, d), Og(b, c, d, e), d = true;
    else if (null === a) {
      var g = b.stateNode, h = b.memoizedProps;
      g.props = h;
      var k = g.context, l = c.contextType;
      "object" === typeof l && null !== l ? l = vg(l) : (l = Ff(c) ? Df : M.current, l = Ef(b, l));
      var n = c.getDerivedStateFromProps, A = "function" === typeof n || "function" === typeof g.getSnapshotBeforeUpdate;
      A || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Ng(b, g, d, l);
      wg = false;
      var p = b.memoizedState;
      g.state = p;
      Cg(b, d, g, e);
      k = b.memoizedState;
      h !== d || p !== k || N.current || wg ? ("function" === typeof n && (Gg(b, c, n, d), k = b.memoizedState), (h = wg || Lg(b, c, h, d, p, k, l)) ? (A || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4)) : ("function" === typeof g.componentDidMount && (b.flags |= 4), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4), d = false);
    } else {
      g = b.stateNode;
      yg(a, b);
      h = b.memoizedProps;
      l = b.type === b.elementType ? h : lg(b.type, h);
      g.props = l;
      A = b.pendingProps;
      p = g.context;
      k = c.contextType;
      "object" === typeof k && null !== k ? k = vg(k) : (k = Ff(c) ? Df : M.current, k = Ef(b, k));
      var C = c.getDerivedStateFromProps;
      (n = "function" === typeof C || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== A || p !== k) && Ng(b, g, d, k);
      wg = false;
      p = b.memoizedState;
      g.state = p;
      Cg(b, d, g, e);
      var x = b.memoizedState;
      h !== A || p !== x || N.current || wg ? ("function" === typeof C && (Gg(b, c, C, d), x = b.memoizedState), (l = wg || Lg(b, c, l, d, p, x, k)) ? (n || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(
        d,
        x,
        k
      ), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, x, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 256)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 256), b.memoizedProps = d, b.memoizedState = x), g.props = d, g.state = x, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 256), d = false);
    }
    return qi(a, b, c, d, f, e);
  }
  function qi(a, b, c, d, e, f) {
    oi(a, b);
    var g = 0 !== (b.flags & 64);
    if (!d && !g) return e && Kf(b, c, false), hi(a, b, f);
    d = b.stateNode;
    ei.current = b;
    var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
    b.flags |= 1;
    null !== a && g ? (b.child = Yg(b, a.child, null, f), b.child = Yg(b, null, h, f)) : fi(a, b, h, f);
    b.memoizedState = d.state;
    e && Kf(b, c, true);
    return b.child;
  }
  function ri(a) {
    var b = a.stateNode;
    b.pendingContext ? Hf(a, b.pendingContext, b.pendingContext !== b.context) : b.context && Hf(a, b.context, false);
    eh(a, b.containerInfo);
  }
  var si = { dehydrated: null, retryLane: 0 };
  function ti(a, b, c) {
    var d = b.pendingProps, e = P.current, f = false, g;
    (g = 0 !== (b.flags & 64)) || (g = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
    g ? (f = true, b.flags &= -65) : null !== a && null === a.memoizedState || void 0 === d.fallback || true === d.unstable_avoidThisFallback || (e |= 1);
    I(P, e & 1);
    if (null === a) {
      void 0 !== d.fallback && ph(b);
      a = d.children;
      e = d.fallback;
      if (f) return a = ui(b, a, e, c), b.child.memoizedState = { baseLanes: c }, b.memoizedState = si, a;
      if ("number" === typeof d.unstable_expectedLoadTime) return a = ui(b, a, e, c), b.child.memoizedState = { baseLanes: c }, b.memoizedState = si, b.lanes = 33554432, a;
      c = vi({ mode: "visible", children: a }, b.mode, c, null);
      c.return = b;
      return b.child = c;
    }
    if (null !== a.memoizedState) {
      if (f) return d = wi(a, b, d.children, d.fallback, c), f = b.child, e = a.child.memoizedState, f.memoizedState = null === e ? { baseLanes: c } : { baseLanes: e.baseLanes | c }, f.childLanes = a.childLanes & ~c, b.memoizedState = si, d;
      c = xi(a, b, d.children, c);
      b.memoizedState = null;
      return c;
    }
    if (f) return d = wi(a, b, d.children, d.fallback, c), f = b.child, e = a.child.memoizedState, f.memoizedState = null === e ? { baseLanes: c } : { baseLanes: e.baseLanes | c }, f.childLanes = a.childLanes & ~c, b.memoizedState = si, d;
    c = xi(a, b, d.children, c);
    b.memoizedState = null;
    return c;
  }
  function ui(a, b, c, d) {
    var e = a.mode, f = a.child;
    b = { mode: "hidden", children: b };
    0 === (e & 2) && null !== f ? (f.childLanes = 0, f.pendingProps = b) : f = vi(b, e, 0, null);
    c = Xg(c, e, d, null);
    f.return = a;
    c.return = a;
    f.sibling = c;
    a.child = f;
    return c;
  }
  function xi(a, b, c, d) {
    var e = a.child;
    a = e.sibling;
    c = Tg(e, { mode: "visible", children: c });
    0 === (b.mode & 2) && (c.lanes = d);
    c.return = b;
    c.sibling = null;
    null !== a && (a.nextEffect = null, a.flags = 8, b.firstEffect = b.lastEffect = a);
    return b.child = c;
  }
  function wi(a, b, c, d, e) {
    var f = b.mode, g = a.child;
    a = g.sibling;
    var h = { mode: "hidden", children: c };
    0 === (f & 2) && b.child !== g ? (c = b.child, c.childLanes = 0, c.pendingProps = h, g = c.lastEffect, null !== g ? (b.firstEffect = c.firstEffect, b.lastEffect = g, g.nextEffect = null) : b.firstEffect = b.lastEffect = null) : c = Tg(g, h);
    null !== a ? d = Tg(a, d) : (d = Xg(d, f, e, null), d.flags |= 2);
    d.return = b;
    c.return = b;
    c.sibling = d;
    b.child = c;
    return d;
  }
  function yi(a, b) {
    a.lanes |= b;
    var c = a.alternate;
    null !== c && (c.lanes |= b);
    sg(a.return, b);
  }
  function zi(a, b, c, d, e, f) {
    var g = a.memoizedState;
    null === g ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e, lastEffect: f } : (g.isBackwards = b, g.rendering = null, g.renderingStartTime = 0, g.last = d, g.tail = c, g.tailMode = e, g.lastEffect = f);
  }
  function Ai(a, b, c) {
    var d = b.pendingProps, e = d.revealOrder, f = d.tail;
    fi(a, b, d.children, c);
    d = P.current;
    if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 64;
    else {
      if (null !== a && 0 !== (a.flags & 64)) a: for (a = b.child; null !== a; ) {
        if (13 === a.tag) null !== a.memoizedState && yi(a, c);
        else if (19 === a.tag) yi(a, c);
        else if (null !== a.child) {
          a.child.return = a;
          a = a.child;
          continue;
        }
        if (a === b) break a;
        for (; null === a.sibling; ) {
          if (null === a.return || a.return === b) break a;
          a = a.return;
        }
        a.sibling.return = a.return;
        a = a.sibling;
      }
      d &= 1;
    }
    I(P, d);
    if (0 === (b.mode & 2)) b.memoizedState = null;
    else switch (e) {
      case "forwards":
        c = b.child;
        for (e = null; null !== c; ) a = c.alternate, null !== a && null === ih(a) && (e = c), c = c.sibling;
        c = e;
        null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
        zi(b, false, e, c, f, b.lastEffect);
        break;
      case "backwards":
        c = null;
        e = b.child;
        for (b.child = null; null !== e; ) {
          a = e.alternate;
          if (null !== a && null === ih(a)) {
            b.child = e;
            break;
          }
          a = e.sibling;
          e.sibling = c;
          c = e;
          e = a;
        }
        zi(b, true, c, null, f, b.lastEffect);
        break;
      case "together":
        zi(b, false, null, null, void 0, b.lastEffect);
        break;
      default:
        b.memoizedState = null;
    }
    return b.child;
  }
  function hi(a, b, c) {
    null !== a && (b.dependencies = a.dependencies);
    Dg |= b.lanes;
    if (0 !== (c & b.childLanes)) {
      if (null !== a && b.child !== a.child) throw Error(y(153));
      if (null !== b.child) {
        a = b.child;
        c = Tg(a, a.pendingProps);
        b.child = c;
        for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Tg(a, a.pendingProps), c.return = b;
        c.sibling = null;
      }
      return b.child;
    }
    return null;
  }
  var Bi, Ci, Di, Ei;
  Bi = function(a, b) {
    for (var c = b.child; null !== c; ) {
      if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
      else if (4 !== c.tag && null !== c.child) {
        c.child.return = c;
        c = c.child;
        continue;
      }
      if (c === b) break;
      for (; null === c.sibling; ) {
        if (null === c.return || c.return === b) return;
        c = c.return;
      }
      c.sibling.return = c.return;
      c = c.sibling;
    }
  };
  Ci = function() {
  };
  Di = function(a, b, c, d) {
    var e = a.memoizedProps;
    if (e !== d) {
      a = b.stateNode;
      dh(ah.current);
      var f = null;
      switch (c) {
        case "input":
          e = Ya(a, e);
          d = Ya(a, d);
          f = [];
          break;
        case "option":
          e = eb(a, e);
          d = eb(a, d);
          f = [];
          break;
        case "select":
          e = m({}, e, { value: void 0 });
          d = m({}, d, { value: void 0 });
          f = [];
          break;
        case "textarea":
          e = gb(a, e);
          d = gb(a, d);
          f = [];
          break;
        default:
          "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = jf);
      }
      vb(c, d);
      var g;
      c = null;
      for (l in e) if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l]) if ("style" === l) {
        var h = e[l];
        for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
      } else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ca.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
      for (l in d) {
        var k = d[l];
        h = null != e ? e[l] : void 0;
        if (d.hasOwnProperty(l) && k !== h && (null != k || null != h)) if ("style" === l) if (h) {
          for (g in h) !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
          for (g in k) k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
        } else c || (f || (f = []), f.push(l, c)), c = k;
        else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ca.hasOwnProperty(l) ? (null != k && "onScroll" === l && G("scroll", a), f || h === k || (f = [])) : "object" === typeof k && null !== k && k.$$typeof === Ga ? k.toString() : (f = f || []).push(l, k));
      }
      c && (f = f || []).push(
        "style",
        c
      );
      var l = f;
      if (b.updateQueue = l) b.flags |= 4;
    }
  };
  Ei = function(a, b, c, d) {
    c !== d && (b.flags |= 4);
  };
  function Fi(a, b) {
    if (!lh) switch (a.tailMode) {
      case "hidden":
        b = a.tail;
        for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
        null === c ? a.tail = null : c.sibling = null;
        break;
      case "collapsed":
        c = a.tail;
        for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
        null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
    }
  }
  function Gi(a, b, c) {
    var d = b.pendingProps;
    switch (b.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return null;
      case 1:
        return Ff(b.type) && Gf(), null;
      case 3:
        fh();
        H(N);
        H(M);
        uh();
        d = b.stateNode;
        d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
        if (null === a || null === a.child) rh(b) ? b.flags |= 4 : d.hydrate || (b.flags |= 256);
        Ci(b);
        return null;
      case 5:
        hh(b);
        var e = dh(ch.current);
        c = b.type;
        if (null !== a && null != b.stateNode) Di(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 128);
        else {
          if (!d) {
            if (null === b.stateNode) throw Error(y(166));
            return null;
          }
          a = dh(ah.current);
          if (rh(b)) {
            d = b.stateNode;
            c = b.type;
            var f = b.memoizedProps;
            d[wf] = b;
            d[xf] = f;
            switch (c) {
              case "dialog":
                G("cancel", d);
                G("close", d);
                break;
              case "iframe":
              case "object":
              case "embed":
                G("load", d);
                break;
              case "video":
              case "audio":
                for (a = 0; a < Xe.length; a++) G(Xe[a], d);
                break;
              case "source":
                G("error", d);
                break;
              case "img":
              case "image":
              case "link":
                G("error", d);
                G("load", d);
                break;
              case "details":
                G("toggle", d);
                break;
              case "input":
                Za(d, f);
                G("invalid", d);
                break;
              case "select":
                d._wrapperState = { wasMultiple: !!f.multiple };
                G("invalid", d);
                break;
              case "textarea":
                hb(d, f), G("invalid", d);
            }
            vb(c, f);
            a = null;
            for (var g in f) f.hasOwnProperty(g) && (e = f[g], "children" === g ? "string" === typeof e ? d.textContent !== e && (a = ["children", e]) : "number" === typeof e && d.textContent !== "" + e && (a = ["children", "" + e]) : ca.hasOwnProperty(g) && null != e && "onScroll" === g && G("scroll", d));
            switch (c) {
              case "input":
                Va(d);
                cb(d, f, true);
                break;
              case "textarea":
                Va(d);
                jb(d);
                break;
              case "select":
              case "option":
                break;
              default:
                "function" === typeof f.onClick && (d.onclick = jf);
            }
            d = a;
            b.updateQueue = d;
            null !== d && (b.flags |= 4);
          } else {
            g = 9 === e.nodeType ? e : e.ownerDocument;
            a === kb.html && (a = lb(c));
            a === kb.html ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
            a[wf] = b;
            a[xf] = d;
            Bi(a, b, false, false);
            b.stateNode = a;
            g = wb(c, d);
            switch (c) {
              case "dialog":
                G("cancel", a);
                G("close", a);
                e = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                G("load", a);
                e = d;
                break;
              case "video":
              case "audio":
                for (e = 0; e < Xe.length; e++) G(Xe[e], a);
                e = d;
                break;
              case "source":
                G("error", a);
                e = d;
                break;
              case "img":
              case "image":
              case "link":
                G("error", a);
                G("load", a);
                e = d;
                break;
              case "details":
                G("toggle", a);
                e = d;
                break;
              case "input":
                Za(a, d);
                e = Ya(a, d);
                G("invalid", a);
                break;
              case "option":
                e = eb(a, d);
                break;
              case "select":
                a._wrapperState = { wasMultiple: !!d.multiple };
                e = m({}, d, { value: void 0 });
                G("invalid", a);
                break;
              case "textarea":
                hb(a, d);
                e = gb(a, d);
                G("invalid", a);
                break;
              default:
                e = d;
            }
            vb(c, e);
            var h = e;
            for (f in h) if (h.hasOwnProperty(f)) {
              var k = h[f];
              "style" === f ? tb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && ob(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && pb(a, k) : "number" === typeof k && pb(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ca.hasOwnProperty(f) ? null != k && "onScroll" === f && G("scroll", a) : null != k && qa(a, f, k, g));
            }
            switch (c) {
              case "input":
                Va(a);
                cb(a, d, false);
                break;
              case "textarea":
                Va(a);
                jb(a);
                break;
              case "option":
                null != d.value && a.setAttribute("value", "" + Sa(d.value));
                break;
              case "select":
                a.multiple = !!d.multiple;
                f = d.value;
                null != f ? fb(a, !!d.multiple, f, false) : null != d.defaultValue && fb(a, !!d.multiple, d.defaultValue, true);
                break;
              default:
                "function" === typeof e.onClick && (a.onclick = jf);
            }
            mf(c, d) && (b.flags |= 4);
          }
          null !== b.ref && (b.flags |= 128);
        }
        return null;
      case 6:
        if (a && null != b.stateNode) Ei(a, b, a.memoizedProps, d);
        else {
          if ("string" !== typeof d && null === b.stateNode) throw Error(y(166));
          c = dh(ch.current);
          dh(ah.current);
          rh(b) ? (d = b.stateNode, c = b.memoizedProps, d[wf] = b, d.nodeValue !== c && (b.flags |= 4)) : (d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[wf] = b, b.stateNode = d);
        }
        return null;
      case 13:
        H(P);
        d = b.memoizedState;
        if (0 !== (b.flags & 64)) return b.lanes = c, b;
        d = null !== d;
        c = false;
        null === a ? void 0 !== b.memoizedProps.fallback && rh(b) : c = null !== a.memoizedState;
        if (d && !c && 0 !== (b.mode & 2)) if (null === a && true !== b.memoizedProps.unstable_avoidThisFallback || 0 !== (P.current & 1)) 0 === V && (V = 3);
        else {
          if (0 === V || 3 === V) V = 4;
          null === U || 0 === (Dg & 134217727) && 0 === (Hi & 134217727) || Ii(U, W);
        }
        if (d || c) b.flags |= 4;
        return null;
      case 4:
        return fh(), Ci(b), null === a && cf(b.stateNode.containerInfo), null;
      case 10:
        return rg(b), null;
      case 17:
        return Ff(b.type) && Gf(), null;
      case 19:
        H(P);
        d = b.memoizedState;
        if (null === d) return null;
        f = 0 !== (b.flags & 64);
        g = d.rendering;
        if (null === g) if (f) Fi(d, false);
        else {
          if (0 !== V || null !== a && 0 !== (a.flags & 64)) for (a = b.child; null !== a; ) {
            g = ih(a);
            if (null !== g) {
              b.flags |= 64;
              Fi(d, false);
              f = g.updateQueue;
              null !== f && (b.updateQueue = f, b.flags |= 4);
              null === d.lastEffect && (b.firstEffect = null);
              b.lastEffect = d.lastEffect;
              d = c;
              for (c = b.child; null !== c; ) f = c, a = d, f.flags &= 2, f.nextEffect = null, f.firstEffect = null, f.lastEffect = null, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
              I(P, P.current & 1 | 2);
              return b.child;
            }
            a = a.sibling;
          }
          null !== d.tail && O() > Ji && (b.flags |= 64, f = true, Fi(d, false), b.lanes = 33554432);
        }
        else {
          if (!f) if (a = ih(g), null !== a) {
            if (b.flags |= 64, f = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Fi(d, true), null === d.tail && "hidden" === d.tailMode && !g.alternate && !lh) return b = b.lastEffect = d.lastEffect, null !== b && (b.nextEffect = null), null;
          } else 2 * O() - d.renderingStartTime > Ji && 1073741824 !== c && (b.flags |= 64, f = true, Fi(d, false), b.lanes = 33554432);
          d.isBackwards ? (g.sibling = b.child, b.child = g) : (c = d.last, null !== c ? c.sibling = g : b.child = g, d.last = g);
        }
        return null !== d.tail ? (c = d.tail, d.rendering = c, d.tail = c.sibling, d.lastEffect = b.lastEffect, d.renderingStartTime = O(), c.sibling = null, b = P.current, I(P, f ? b & 1 | 2 : b & 1), c) : null;
      case 23:
      case 24:
        return Ki(), null !== a && null !== a.memoizedState !== (null !== b.memoizedState) && "unstable-defer-without-hiding" !== d.mode && (b.flags |= 4), null;
    }
    throw Error(y(156, b.tag));
  }
  function Li(a) {
    switch (a.tag) {
      case 1:
        Ff(a.type) && Gf();
        var b = a.flags;
        return b & 4096 ? (a.flags = b & -4097 | 64, a) : null;
      case 3:
        fh();
        H(N);
        H(M);
        uh();
        b = a.flags;
        if (0 !== (b & 64)) throw Error(y(285));
        a.flags = b & -4097 | 64;
        return a;
      case 5:
        return hh(a), null;
      case 13:
        return H(P), b = a.flags, b & 4096 ? (a.flags = b & -4097 | 64, a) : null;
      case 19:
        return H(P), null;
      case 4:
        return fh(), null;
      case 10:
        return rg(a), null;
      case 23:
      case 24:
        return Ki(), null;
      default:
        return null;
    }
  }
  function Mi(a, b) {
    try {
      var c = "", d = b;
      do
        c += Qa(d), d = d.return;
      while (d);
      var e = c;
    } catch (f) {
      e = "\nError generating stack: " + f.message + "\n" + f.stack;
    }
    return { value: a, source: b, stack: e };
  }
  function Ni(a, b) {
    try {
      console.error(b.value);
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  var Oi = "function" === typeof WeakMap ? WeakMap : Map;
  function Pi(a, b, c) {
    c = zg(-1, c);
    c.tag = 3;
    c.payload = { element: null };
    var d = b.value;
    c.callback = function() {
      Qi || (Qi = true, Ri = d);
      Ni(a, b);
    };
    return c;
  }
  function Si(a, b, c) {
    c = zg(-1, c);
    c.tag = 3;
    var d = a.type.getDerivedStateFromError;
    if ("function" === typeof d) {
      var e = b.value;
      c.payload = function() {
        Ni(a, b);
        return d(e);
      };
    }
    var f = a.stateNode;
    null !== f && "function" === typeof f.componentDidCatch && (c.callback = function() {
      "function" !== typeof d && (null === Ti ? Ti = /* @__PURE__ */ new Set([this]) : Ti.add(this), Ni(a, b));
      var c2 = b.stack;
      this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
    });
    return c;
  }
  var Ui = "function" === typeof WeakSet ? WeakSet : Set;
  function Vi(a) {
    var b = a.ref;
    if (null !== b) if ("function" === typeof b) try {
      b(null);
    } catch (c) {
      Wi(a, c);
    }
    else b.current = null;
  }
  function Xi(a, b) {
    switch (b.tag) {
      case 0:
      case 11:
      case 15:
      case 22:
        return;
      case 1:
        if (b.flags & 256 && null !== a) {
          var c = a.memoizedProps, d = a.memoizedState;
          a = b.stateNode;
          b = a.getSnapshotBeforeUpdate(b.elementType === b.type ? c : lg(b.type, c), d);
          a.__reactInternalSnapshotBeforeUpdate = b;
        }
        return;
      case 3:
        b.flags & 256 && qf(b.stateNode.containerInfo);
        return;
      case 5:
      case 6:
      case 4:
      case 17:
        return;
    }
    throw Error(y(163));
  }
  function Yi(a, b, c) {
    switch (c.tag) {
      case 0:
      case 11:
      case 15:
      case 22:
        b = c.updateQueue;
        b = null !== b ? b.lastEffect : null;
        if (null !== b) {
          a = b = b.next;
          do {
            if (3 === (a.tag & 3)) {
              var d = a.create;
              a.destroy = d();
            }
            a = a.next;
          } while (a !== b);
        }
        b = c.updateQueue;
        b = null !== b ? b.lastEffect : null;
        if (null !== b) {
          a = b = b.next;
          do {
            var e = a;
            d = e.next;
            e = e.tag;
            0 !== (e & 4) && 0 !== (e & 1) && (Zi(c, a), $i(c, a));
            a = d;
          } while (a !== b);
        }
        return;
      case 1:
        a = c.stateNode;
        c.flags & 4 && (null === b ? a.componentDidMount() : (d = c.elementType === c.type ? b.memoizedProps : lg(c.type, b.memoizedProps), a.componentDidUpdate(
          d,
          b.memoizedState,
          a.__reactInternalSnapshotBeforeUpdate
        )));
        b = c.updateQueue;
        null !== b && Eg(c, b, a);
        return;
      case 3:
        b = c.updateQueue;
        if (null !== b) {
          a = null;
          if (null !== c.child) switch (c.child.tag) {
            case 5:
              a = c.child.stateNode;
              break;
            case 1:
              a = c.child.stateNode;
          }
          Eg(c, b, a);
        }
        return;
      case 5:
        a = c.stateNode;
        null === b && c.flags & 4 && mf(c.type, c.memoizedProps) && a.focus();
        return;
      case 6:
        return;
      case 4:
        return;
      case 12:
        return;
      case 13:
        null === c.memoizedState && (c = c.alternate, null !== c && (c = c.memoizedState, null !== c && (c = c.dehydrated, null !== c && Cc(c))));
        return;
      case 19:
      case 17:
      case 20:
      case 21:
      case 23:
      case 24:
        return;
    }
    throw Error(y(163));
  }
  function aj(a, b) {
    for (var c = a; ; ) {
      if (5 === c.tag) {
        var d = c.stateNode;
        if (b) d = d.style, "function" === typeof d.setProperty ? d.setProperty("display", "none", "important") : d.display = "none";
        else {
          d = c.stateNode;
          var e = c.memoizedProps.style;
          e = void 0 !== e && null !== e && e.hasOwnProperty("display") ? e.display : null;
          d.style.display = sb("display", e);
        }
      } else if (6 === c.tag) c.stateNode.nodeValue = b ? "" : c.memoizedProps;
      else if ((23 !== c.tag && 24 !== c.tag || null === c.memoizedState || c === a) && null !== c.child) {
        c.child.return = c;
        c = c.child;
        continue;
      }
      if (c === a) break;
      for (; null === c.sibling; ) {
        if (null === c.return || c.return === a) return;
        c = c.return;
      }
      c.sibling.return = c.return;
      c = c.sibling;
    }
  }
  function bj(a, b) {
    if (Mf && "function" === typeof Mf.onCommitFiberUnmount) try {
      Mf.onCommitFiberUnmount(Lf, b);
    } catch (f) {
    }
    switch (b.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
      case 22:
        a = b.updateQueue;
        if (null !== a && (a = a.lastEffect, null !== a)) {
          var c = a = a.next;
          do {
            var d = c, e = d.destroy;
            d = d.tag;
            if (void 0 !== e) if (0 !== (d & 4)) Zi(b, c);
            else {
              d = b;
              try {
                e();
              } catch (f) {
                Wi(d, f);
              }
            }
            c = c.next;
          } while (c !== a);
        }
        break;
      case 1:
        Vi(b);
        a = b.stateNode;
        if ("function" === typeof a.componentWillUnmount) try {
          a.props = b.memoizedProps, a.state = b.memoizedState, a.componentWillUnmount();
        } catch (f) {
          Wi(
            b,
            f
          );
        }
        break;
      case 5:
        Vi(b);
        break;
      case 4:
        cj(a, b);
    }
  }
  function dj(a) {
    a.alternate = null;
    a.child = null;
    a.dependencies = null;
    a.firstEffect = null;
    a.lastEffect = null;
    a.memoizedProps = null;
    a.memoizedState = null;
    a.pendingProps = null;
    a.return = null;
    a.updateQueue = null;
  }
  function ej(a) {
    return 5 === a.tag || 3 === a.tag || 4 === a.tag;
  }
  function fj(a) {
    a: {
      for (var b = a.return; null !== b; ) {
        if (ej(b)) break a;
        b = b.return;
      }
      throw Error(y(160));
    }
    var c = b;
    b = c.stateNode;
    switch (c.tag) {
      case 5:
        var d = false;
        break;
      case 3:
        b = b.containerInfo;
        d = true;
        break;
      case 4:
        b = b.containerInfo;
        d = true;
        break;
      default:
        throw Error(y(161));
    }
    c.flags & 16 && (pb(b, ""), c.flags &= -17);
    a: b: for (c = a; ; ) {
      for (; null === c.sibling; ) {
        if (null === c.return || ej(c.return)) {
          c = null;
          break a;
        }
        c = c.return;
      }
      c.sibling.return = c.return;
      for (c = c.sibling; 5 !== c.tag && 6 !== c.tag && 18 !== c.tag; ) {
        if (c.flags & 2) continue b;
        if (null === c.child || 4 === c.tag) continue b;
        else c.child.return = c, c = c.child;
      }
      if (!(c.flags & 2)) {
        c = c.stateNode;
        break a;
      }
    }
    d ? gj(a, c, b) : hj(a, c, b);
  }
  function gj(a, b, c) {
    var d = a.tag, e = 5 === d || 6 === d;
    if (e) a = e ? a.stateNode : a.stateNode.instance, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = jf));
    else if (4 !== d && (a = a.child, null !== a)) for (gj(a, b, c), a = a.sibling; null !== a; ) gj(a, b, c), a = a.sibling;
  }
  function hj(a, b, c) {
    var d = a.tag, e = 5 === d || 6 === d;
    if (e) a = e ? a.stateNode : a.stateNode.instance, b ? c.insertBefore(a, b) : c.appendChild(a);
    else if (4 !== d && (a = a.child, null !== a)) for (hj(a, b, c), a = a.sibling; null !== a; ) hj(a, b, c), a = a.sibling;
  }
  function cj(a, b) {
    for (var c = b, d = false, e, f; ; ) {
      if (!d) {
        d = c.return;
        a: for (; ; ) {
          if (null === d) throw Error(y(160));
          e = d.stateNode;
          switch (d.tag) {
            case 5:
              f = false;
              break a;
            case 3:
              e = e.containerInfo;
              f = true;
              break a;
            case 4:
              e = e.containerInfo;
              f = true;
              break a;
          }
          d = d.return;
        }
        d = true;
      }
      if (5 === c.tag || 6 === c.tag) {
        a: for (var g = a, h = c, k = h; ; ) if (bj(g, k), null !== k.child && 4 !== k.tag) k.child.return = k, k = k.child;
        else {
          if (k === h) break a;
          for (; null === k.sibling; ) {
            if (null === k.return || k.return === h) break a;
            k = k.return;
          }
          k.sibling.return = k.return;
          k = k.sibling;
        }
        f ? (g = e, h = c.stateNode, 8 === g.nodeType ? g.parentNode.removeChild(h) : g.removeChild(h)) : e.removeChild(c.stateNode);
      } else if (4 === c.tag) {
        if (null !== c.child) {
          e = c.stateNode.containerInfo;
          f = true;
          c.child.return = c;
          c = c.child;
          continue;
        }
      } else if (bj(a, c), null !== c.child) {
        c.child.return = c;
        c = c.child;
        continue;
      }
      if (c === b) break;
      for (; null === c.sibling; ) {
        if (null === c.return || c.return === b) return;
        c = c.return;
        4 === c.tag && (d = false);
      }
      c.sibling.return = c.return;
      c = c.sibling;
    }
  }
  function ij(a, b) {
    switch (b.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
      case 22:
        var c = b.updateQueue;
        c = null !== c ? c.lastEffect : null;
        if (null !== c) {
          var d = c = c.next;
          do
            3 === (d.tag & 3) && (a = d.destroy, d.destroy = void 0, void 0 !== a && a()), d = d.next;
          while (d !== c);
        }
        return;
      case 1:
        return;
      case 5:
        c = b.stateNode;
        if (null != c) {
          d = b.memoizedProps;
          var e = null !== a ? a.memoizedProps : d;
          a = b.type;
          var f = b.updateQueue;
          b.updateQueue = null;
          if (null !== f) {
            c[xf] = d;
            "input" === a && "radio" === d.type && null != d.name && $a(c, d);
            wb(a, e);
            b = wb(a, d);
            for (e = 0; e < f.length; e += 2) {
              var g = f[e], h = f[e + 1];
              "style" === g ? tb(c, h) : "dangerouslySetInnerHTML" === g ? ob(c, h) : "children" === g ? pb(c, h) : qa(c, g, h, b);
            }
            switch (a) {
              case "input":
                ab(c, d);
                break;
              case "textarea":
                ib(c, d);
                break;
              case "select":
                a = c._wrapperState.wasMultiple, c._wrapperState.wasMultiple = !!d.multiple, f = d.value, null != f ? fb(c, !!d.multiple, f, false) : a !== !!d.multiple && (null != d.defaultValue ? fb(c, !!d.multiple, d.defaultValue, true) : fb(c, !!d.multiple, d.multiple ? [] : "", false));
            }
          }
        }
        return;
      case 6:
        if (null === b.stateNode) throw Error(y(162));
        b.stateNode.nodeValue = b.memoizedProps;
        return;
      case 3:
        c = b.stateNode;
        c.hydrate && (c.hydrate = false, Cc(c.containerInfo));
        return;
      case 12:
        return;
      case 13:
        null !== b.memoizedState && (jj = O(), aj(b.child, true));
        kj(b);
        return;
      case 19:
        kj(b);
        return;
      case 17:
        return;
      case 23:
      case 24:
        aj(b, null !== b.memoizedState);
        return;
    }
    throw Error(y(163));
  }
  function kj(a) {
    var b = a.updateQueue;
    if (null !== b) {
      a.updateQueue = null;
      var c = a.stateNode;
      null === c && (c = a.stateNode = new Ui());
      b.forEach(function(b2) {
        var d = lj.bind(null, a, b2);
        c.has(b2) || (c.add(b2), b2.then(d, d));
      });
    }
  }
  function mj(a, b) {
    return null !== a && (a = a.memoizedState, null === a || null !== a.dehydrated) ? (b = b.memoizedState, null !== b && null === b.dehydrated) : false;
  }
  var nj = Math.ceil, oj = ra.ReactCurrentDispatcher, pj = ra.ReactCurrentOwner, X = 0, U = null, Y = null, W = 0, qj = 0, rj = Bf(0), V = 0, sj = null, tj = 0, Dg = 0, Hi = 0, uj = 0, vj = null, jj = 0, Ji = Infinity;
  function wj() {
    Ji = O() + 500;
  }
  var Z = null, Qi = false, Ri = null, Ti = null, xj = false, yj = null, zj = 90, Aj = [], Bj = [], Cj = null, Dj = 0, Ej = null, Fj = -1, Gj = 0, Hj = 0, Ij = null, Jj = false;
  function Hg() {
    return 0 !== (X & 48) ? O() : -1 !== Fj ? Fj : Fj = O();
  }
  function Ig(a) {
    a = a.mode;
    if (0 === (a & 2)) return 1;
    if (0 === (a & 4)) return 99 === eg() ? 1 : 2;
    0 === Gj && (Gj = tj);
    if (0 !== kg.transition) {
      0 !== Hj && (Hj = null !== vj ? vj.pendingLanes : 0);
      a = Gj;
      var b = 4186112 & ~Hj;
      b &= -b;
      0 === b && (a = 4186112 & ~a, b = a & -a, 0 === b && (b = 8192));
      return b;
    }
    a = eg();
    0 !== (X & 4) && 98 === a ? a = Xc(12, Gj) : (a = Sc(a), a = Xc(a, Gj));
    return a;
  }
  function Jg(a, b, c) {
    if (50 < Dj) throw Dj = 0, Ej = null, Error(y(185));
    a = Kj(a, b);
    if (null === a) return null;
    $c(a, b, c);
    a === U && (Hi |= b, 4 === V && Ii(a, W));
    var d = eg();
    1 === b ? 0 !== (X & 8) && 0 === (X & 48) ? Lj(a) : (Mj(a, c), 0 === X && (wj(), ig())) : (0 === (X & 4) || 98 !== d && 99 !== d || (null === Cj ? Cj = /* @__PURE__ */ new Set([a]) : Cj.add(a)), Mj(a, c));
    vj = a;
  }
  function Kj(a, b) {
    a.lanes |= b;
    var c = a.alternate;
    null !== c && (c.lanes |= b);
    c = a;
    for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
    return 3 === c.tag ? c.stateNode : null;
  }
  function Mj(a, b) {
    for (var c = a.callbackNode, d = a.suspendedLanes, e = a.pingedLanes, f = a.expirationTimes, g = a.pendingLanes; 0 < g; ) {
      var h = 31 - Vc(g), k = 1 << h, l = f[h];
      if (-1 === l) {
        if (0 === (k & d) || 0 !== (k & e)) {
          l = b;
          Rc(k);
          var n = F;
          f[h] = 10 <= n ? l + 250 : 6 <= n ? l + 5e3 : -1;
        }
      } else l <= b && (a.expiredLanes |= k);
      g &= ~k;
    }
    d = Uc(a, a === U ? W : 0);
    b = F;
    if (0 === d) null !== c && (c !== Zf && Pf(c), a.callbackNode = null, a.callbackPriority = 0);
    else {
      if (null !== c) {
        if (a.callbackPriority === b) return;
        c !== Zf && Pf(c);
      }
      15 === b ? (c = Lj.bind(null, a), null === ag ? (ag = [c], bg = Of(Uf, jg)) : ag.push(c), c = Zf) : 14 === b ? c = hg(99, Lj.bind(null, a)) : (c = Tc(b), c = hg(c, Nj.bind(null, a)));
      a.callbackPriority = b;
      a.callbackNode = c;
    }
  }
  function Nj(a) {
    Fj = -1;
    Hj = Gj = 0;
    if (0 !== (X & 48)) throw Error(y(327));
    var b = a.callbackNode;
    if (Oj() && a.callbackNode !== b) return null;
    var c = Uc(a, a === U ? W : 0);
    if (0 === c) return null;
    var d = c;
    var e = X;
    X |= 16;
    var f = Pj();
    if (U !== a || W !== d) wj(), Qj(a, d);
    do
      try {
        Rj();
        break;
      } catch (h) {
        Sj(a, h);
      }
    while (1);
    qg();
    oj.current = f;
    X = e;
    null !== Y ? d = 0 : (U = null, W = 0, d = V);
    if (0 !== (tj & Hi)) Qj(a, 0);
    else if (0 !== d) {
      2 === d && (X |= 64, a.hydrate && (a.hydrate = false, qf(a.containerInfo)), c = Wc(a), 0 !== c && (d = Tj(a, c)));
      if (1 === d) throw b = sj, Qj(a, 0), Ii(a, c), Mj(a, O()), b;
      a.finishedWork = a.current.alternate;
      a.finishedLanes = c;
      switch (d) {
        case 0:
        case 1:
          throw Error(y(345));
        case 2:
          Uj(a);
          break;
        case 3:
          Ii(a, c);
          if ((c & 62914560) === c && (d = jj + 500 - O(), 10 < d)) {
            if (0 !== Uc(a, 0)) break;
            e = a.suspendedLanes;
            if ((e & c) !== c) {
              Hg();
              a.pingedLanes |= a.suspendedLanes & e;
              break;
            }
            a.timeoutHandle = of(Uj.bind(null, a), d);
            break;
          }
          Uj(a);
          break;
        case 4:
          Ii(a, c);
          if ((c & 4186112) === c) break;
          d = a.eventTimes;
          for (e = -1; 0 < c; ) {
            var g = 31 - Vc(c);
            f = 1 << g;
            g = d[g];
            g > e && (e = g);
            c &= ~f;
          }
          c = e;
          c = O() - c;
          c = (120 > c ? 120 : 480 > c ? 480 : 1080 > c ? 1080 : 1920 > c ? 1920 : 3e3 > c ? 3e3 : 4320 > c ? 4320 : 1960 * nj(c / 1960)) - c;
          if (10 < c) {
            a.timeoutHandle = of(Uj.bind(null, a), c);
            break;
          }
          Uj(a);
          break;
        case 5:
          Uj(a);
          break;
        default:
          throw Error(y(329));
      }
    }
    Mj(a, O());
    return a.callbackNode === b ? Nj.bind(null, a) : null;
  }
  function Ii(a, b) {
    b &= ~uj;
    b &= ~Hi;
    a.suspendedLanes |= b;
    a.pingedLanes &= ~b;
    for (a = a.expirationTimes; 0 < b; ) {
      var c = 31 - Vc(b), d = 1 << c;
      a[c] = -1;
      b &= ~d;
    }
  }
  function Lj(a) {
    if (0 !== (X & 48)) throw Error(y(327));
    Oj();
    if (a === U && 0 !== (a.expiredLanes & W)) {
      var b = W;
      var c = Tj(a, b);
      0 !== (tj & Hi) && (b = Uc(a, b), c = Tj(a, b));
    } else b = Uc(a, 0), c = Tj(a, b);
    0 !== a.tag && 2 === c && (X |= 64, a.hydrate && (a.hydrate = false, qf(a.containerInfo)), b = Wc(a), 0 !== b && (c = Tj(a, b)));
    if (1 === c) throw c = sj, Qj(a, 0), Ii(a, b), Mj(a, O()), c;
    a.finishedWork = a.current.alternate;
    a.finishedLanes = b;
    Uj(a);
    Mj(a, O());
    return null;
  }
  function Vj() {
    if (null !== Cj) {
      var a = Cj;
      Cj = null;
      a.forEach(function(a2) {
        a2.expiredLanes |= 24 & a2.pendingLanes;
        Mj(a2, O());
      });
    }
    ig();
  }
  function Wj(a, b) {
    var c = X;
    X |= 1;
    try {
      return a(b);
    } finally {
      X = c, 0 === X && (wj(), ig());
    }
  }
  function Xj(a, b) {
    var c = X;
    X &= -2;
    X |= 8;
    try {
      return a(b);
    } finally {
      X = c, 0 === X && (wj(), ig());
    }
  }
  function ni(a, b) {
    I(rj, qj);
    qj |= b;
    tj |= b;
  }
  function Ki() {
    qj = rj.current;
    H(rj);
  }
  function Qj(a, b) {
    a.finishedWork = null;
    a.finishedLanes = 0;
    var c = a.timeoutHandle;
    -1 !== c && (a.timeoutHandle = -1, pf(c));
    if (null !== Y) for (c = Y.return; null !== c; ) {
      var d = c;
      switch (d.tag) {
        case 1:
          d = d.type.childContextTypes;
          null !== d && void 0 !== d && Gf();
          break;
        case 3:
          fh();
          H(N);
          H(M);
          uh();
          break;
        case 5:
          hh(d);
          break;
        case 4:
          fh();
          break;
        case 13:
          H(P);
          break;
        case 19:
          H(P);
          break;
        case 10:
          rg(d);
          break;
        case 23:
        case 24:
          Ki();
      }
      c = c.return;
    }
    U = a;
    Y = Tg(a.current, null);
    W = qj = tj = b;
    V = 0;
    sj = null;
    uj = Hi = Dg = 0;
  }
  function Sj(a, b) {
    do {
      var c = Y;
      try {
        qg();
        vh.current = Gh;
        if (yh) {
          for (var d = R.memoizedState; null !== d; ) {
            var e = d.queue;
            null !== e && (e.pending = null);
            d = d.next;
          }
          yh = false;
        }
        xh = 0;
        T = S = R = null;
        zh = false;
        pj.current = null;
        if (null === c || null === c.return) {
          V = 1;
          sj = b;
          Y = null;
          break;
        }
        a: {
          var f = a, g = c.return, h = c, k = b;
          b = W;
          h.flags |= 2048;
          h.firstEffect = h.lastEffect = null;
          if (null !== k && "object" === typeof k && "function" === typeof k.then) {
            var l = k;
            if (0 === (h.mode & 2)) {
              var n = h.alternate;
              n ? (h.updateQueue = n.updateQueue, h.memoizedState = n.memoizedState, h.lanes = n.lanes) : (h.updateQueue = null, h.memoizedState = null);
            }
            var A = 0 !== (P.current & 1), p = g;
            do {
              var C;
              if (C = 13 === p.tag) {
                var x = p.memoizedState;
                if (null !== x) C = null !== x.dehydrated ? true : false;
                else {
                  var w = p.memoizedProps;
                  C = void 0 === w.fallback ? false : true !== w.unstable_avoidThisFallback ? true : A ? false : true;
                }
              }
              if (C) {
                var z = p.updateQueue;
                if (null === z) {
                  var u = /* @__PURE__ */ new Set();
                  u.add(l);
                  p.updateQueue = u;
                } else z.add(l);
                if (0 === (p.mode & 2)) {
                  p.flags |= 64;
                  h.flags |= 16384;
                  h.flags &= -2981;
                  if (1 === h.tag) if (null === h.alternate) h.tag = 17;
                  else {
                    var t = zg(-1, 1);
                    t.tag = 2;
                    Ag(h, t);
                  }
                  h.lanes |= 1;
                  break a;
                }
                k = void 0;
                h = b;
                var q = f.pingCache;
                null === q ? (q = f.pingCache = new Oi(), k = /* @__PURE__ */ new Set(), q.set(l, k)) : (k = q.get(l), void 0 === k && (k = /* @__PURE__ */ new Set(), q.set(l, k)));
                if (!k.has(h)) {
                  k.add(h);
                  var v = Yj.bind(null, f, l, h);
                  l.then(v, v);
                }
                p.flags |= 4096;
                p.lanes = b;
                break a;
              }
              p = p.return;
            } while (null !== p);
            k = Error((Ra(h.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.");
          }
          5 !== V && (V = 2);
          k = Mi(k, h);
          p = g;
          do {
            switch (p.tag) {
              case 3:
                f = k;
                p.flags |= 4096;
                b &= -b;
                p.lanes |= b;
                var J = Pi(p, f, b);
                Bg(p, J);
                break a;
              case 1:
                f = k;
                var K = p.type, Q = p.stateNode;
                if (0 === (p.flags & 64) && ("function" === typeof K.getDerivedStateFromError || null !== Q && "function" === typeof Q.componentDidCatch && (null === Ti || !Ti.has(Q)))) {
                  p.flags |= 4096;
                  b &= -b;
                  p.lanes |= b;
                  var L = Si(p, f, b);
                  Bg(p, L);
                  break a;
                }
            }
            p = p.return;
          } while (null !== p);
        }
        Zj(c);
      } catch (va) {
        b = va;
        Y === c && null !== c && (Y = c = c.return);
        continue;
      }
      break;
    } while (1);
  }
  function Pj() {
    var a = oj.current;
    oj.current = Gh;
    return null === a ? Gh : a;
  }
  function Tj(a, b) {
    var c = X;
    X |= 16;
    var d = Pj();
    U === a && W === b || Qj(a, b);
    do
      try {
        ak();
        break;
      } catch (e) {
        Sj(a, e);
      }
    while (1);
    qg();
    X = c;
    oj.current = d;
    if (null !== Y) throw Error(y(261));
    U = null;
    W = 0;
    return V;
  }
  function ak() {
    for (; null !== Y; ) bk(Y);
  }
  function Rj() {
    for (; null !== Y && !Qf(); ) bk(Y);
  }
  function bk(a) {
    var b = ck(a.alternate, a, qj);
    a.memoizedProps = a.pendingProps;
    null === b ? Zj(a) : Y = b;
    pj.current = null;
  }
  function Zj(a) {
    var b = a;
    do {
      var c = b.alternate;
      a = b.return;
      if (0 === (b.flags & 2048)) {
        c = Gi(c, b, qj);
        if (null !== c) {
          Y = c;
          return;
        }
        c = b;
        if (24 !== c.tag && 23 !== c.tag || null === c.memoizedState || 0 !== (qj & 1073741824) || 0 === (c.mode & 4)) {
          for (var d = 0, e = c.child; null !== e; ) d |= e.lanes | e.childLanes, e = e.sibling;
          c.childLanes = d;
        }
        null !== a && 0 === (a.flags & 2048) && (null === a.firstEffect && (a.firstEffect = b.firstEffect), null !== b.lastEffect && (null !== a.lastEffect && (a.lastEffect.nextEffect = b.firstEffect), a.lastEffect = b.lastEffect), 1 < b.flags && (null !== a.lastEffect ? a.lastEffect.nextEffect = b : a.firstEffect = b, a.lastEffect = b));
      } else {
        c = Li(b);
        if (null !== c) {
          c.flags &= 2047;
          Y = c;
          return;
        }
        null !== a && (a.firstEffect = a.lastEffect = null, a.flags |= 2048);
      }
      b = b.sibling;
      if (null !== b) {
        Y = b;
        return;
      }
      Y = b = a;
    } while (null !== b);
    0 === V && (V = 5);
  }
  function Uj(a) {
    var b = eg();
    gg(99, dk.bind(null, a, b));
    return null;
  }
  function dk(a, b) {
    do
      Oj();
    while (null !== yj);
    if (0 !== (X & 48)) throw Error(y(327));
    var c = a.finishedWork;
    if (null === c) return null;
    a.finishedWork = null;
    a.finishedLanes = 0;
    if (c === a.current) throw Error(y(177));
    a.callbackNode = null;
    var d = c.lanes | c.childLanes, e = d, f = a.pendingLanes & ~e;
    a.pendingLanes = e;
    a.suspendedLanes = 0;
    a.pingedLanes = 0;
    a.expiredLanes &= e;
    a.mutableReadLanes &= e;
    a.entangledLanes &= e;
    e = a.entanglements;
    for (var g = a.eventTimes, h = a.expirationTimes; 0 < f; ) {
      var k = 31 - Vc(f), l = 1 << k;
      e[k] = 0;
      g[k] = -1;
      h[k] = -1;
      f &= ~l;
    }
    null !== Cj && 0 === (d & 24) && Cj.has(a) && Cj.delete(a);
    a === U && (Y = U = null, W = 0);
    1 < c.flags ? null !== c.lastEffect ? (c.lastEffect.nextEffect = c, d = c.firstEffect) : d = c : d = c.firstEffect;
    if (null !== d) {
      e = X;
      X |= 32;
      pj.current = null;
      kf = fd;
      g = Ne();
      if (Oe(g)) {
        if ("selectionStart" in g) h = { start: g.selectionStart, end: g.selectionEnd };
        else a: if (h = (h = g.ownerDocument) && h.defaultView || window, (l = h.getSelection && h.getSelection()) && 0 !== l.rangeCount) {
          h = l.anchorNode;
          f = l.anchorOffset;
          k = l.focusNode;
          l = l.focusOffset;
          try {
            h.nodeType, k.nodeType;
          } catch (va) {
            h = null;
            break a;
          }
          var n = 0, A = -1, p = -1, C = 0, x = 0, w = g, z = null;
          b: for (; ; ) {
            for (var u; ; ) {
              w !== h || 0 !== f && 3 !== w.nodeType || (A = n + f);
              w !== k || 0 !== l && 3 !== w.nodeType || (p = n + l);
              3 === w.nodeType && (n += w.nodeValue.length);
              if (null === (u = w.firstChild)) break;
              z = w;
              w = u;
            }
            for (; ; ) {
              if (w === g) break b;
              z === h && ++C === f && (A = n);
              z === k && ++x === l && (p = n);
              if (null !== (u = w.nextSibling)) break;
              w = z;
              z = w.parentNode;
            }
            w = u;
          }
          h = -1 === A || -1 === p ? null : { start: A, end: p };
        } else h = null;
        h = h || { start: 0, end: 0 };
      } else h = null;
      lf = { focusedElem: g, selectionRange: h };
      fd = false;
      Ij = null;
      Jj = false;
      Z = d;
      do
        try {
          ek();
        } catch (va) {
          if (null === Z) throw Error(y(330));
          Wi(Z, va);
          Z = Z.nextEffect;
        }
      while (null !== Z);
      Ij = null;
      Z = d;
      do
        try {
          for (g = a; null !== Z; ) {
            var t = Z.flags;
            t & 16 && pb(Z.stateNode, "");
            if (t & 128) {
              var q = Z.alternate;
              if (null !== q) {
                var v = q.ref;
                null !== v && ("function" === typeof v ? v(null) : v.current = null);
              }
            }
            switch (t & 1038) {
              case 2:
                fj(Z);
                Z.flags &= -3;
                break;
              case 6:
                fj(Z);
                Z.flags &= -3;
                ij(Z.alternate, Z);
                break;
              case 1024:
                Z.flags &= -1025;
                break;
              case 1028:
                Z.flags &= -1025;
                ij(Z.alternate, Z);
                break;
              case 4:
                ij(Z.alternate, Z);
                break;
              case 8:
                h = Z;
                cj(g, h);
                var J = h.alternate;
                dj(h);
                null !== J && dj(J);
            }
            Z = Z.nextEffect;
          }
        } catch (va) {
          if (null === Z) throw Error(y(330));
          Wi(Z, va);
          Z = Z.nextEffect;
        }
      while (null !== Z);
      v = lf;
      q = Ne();
      t = v.focusedElem;
      g = v.selectionRange;
      if (q !== t && t && t.ownerDocument && Me(t.ownerDocument.documentElement, t)) {
        null !== g && Oe(t) && (q = g.start, v = g.end, void 0 === v && (v = q), "selectionStart" in t ? (t.selectionStart = q, t.selectionEnd = Math.min(v, t.value.length)) : (v = (q = t.ownerDocument || document) && q.defaultView || window, v.getSelection && (v = v.getSelection(), h = t.textContent.length, J = Math.min(g.start, h), g = void 0 === g.end ? J : Math.min(g.end, h), !v.extend && J > g && (h = g, g = J, J = h), h = Le(t, J), f = Le(t, g), h && f && (1 !== v.rangeCount || v.anchorNode !== h.node || v.anchorOffset !== h.offset || v.focusNode !== f.node || v.focusOffset !== f.offset) && (q = q.createRange(), q.setStart(h.node, h.offset), v.removeAllRanges(), J > g ? (v.addRange(q), v.extend(f.node, f.offset)) : (q.setEnd(f.node, f.offset), v.addRange(q))))));
        q = [];
        for (v = t; v = v.parentNode; ) 1 === v.nodeType && q.push({ element: v, left: v.scrollLeft, top: v.scrollTop });
        "function" === typeof t.focus && t.focus();
        for (t = 0; t < q.length; t++) v = q[t], v.element.scrollLeft = v.left, v.element.scrollTop = v.top;
      }
      fd = !!kf;
      lf = kf = null;
      a.current = c;
      Z = d;
      do
        try {
          for (t = a; null !== Z; ) {
            var K = Z.flags;
            K & 36 && Yi(t, Z.alternate, Z);
            if (K & 128) {
              q = void 0;
              var Q = Z.ref;
              if (null !== Q) {
                var L = Z.stateNode;
                switch (Z.tag) {
                  case 5:
                    q = L;
                    break;
                  default:
                    q = L;
                }
                "function" === typeof Q ? Q(q) : Q.current = q;
              }
            }
            Z = Z.nextEffect;
          }
        } catch (va) {
          if (null === Z) throw Error(y(330));
          Wi(Z, va);
          Z = Z.nextEffect;
        }
      while (null !== Z);
      Z = null;
      $f();
      X = e;
    } else a.current = c;
    if (xj) xj = false, yj = a, zj = b;
    else for (Z = d; null !== Z; ) b = Z.nextEffect, Z.nextEffect = null, Z.flags & 8 && (K = Z, K.sibling = null, K.stateNode = null), Z = b;
    d = a.pendingLanes;
    0 === d && (Ti = null);
    1 === d ? a === Ej ? Dj++ : (Dj = 0, Ej = a) : Dj = 0;
    c = c.stateNode;
    if (Mf && "function" === typeof Mf.onCommitFiberRoot) try {
      Mf.onCommitFiberRoot(Lf, c, void 0, 64 === (c.current.flags & 64));
    } catch (va) {
    }
    Mj(a, O());
    if (Qi) throw Qi = false, a = Ri, Ri = null, a;
    if (0 !== (X & 8)) return null;
    ig();
    return null;
  }
  function ek() {
    for (; null !== Z; ) {
      var a = Z.alternate;
      Jj || null === Ij || (0 !== (Z.flags & 8) ? dc(Z, Ij) && (Jj = true) : 13 === Z.tag && mj(a, Z) && dc(Z, Ij) && (Jj = true));
      var b = Z.flags;
      0 !== (b & 256) && Xi(a, Z);
      0 === (b & 512) || xj || (xj = true, hg(97, function() {
        Oj();
        return null;
      }));
      Z = Z.nextEffect;
    }
  }
  function Oj() {
    if (90 !== zj) {
      var a = 97 < zj ? 97 : zj;
      zj = 90;
      return gg(a, fk);
    }
    return false;
  }
  function $i(a, b) {
    Aj.push(b, a);
    xj || (xj = true, hg(97, function() {
      Oj();
      return null;
    }));
  }
  function Zi(a, b) {
    Bj.push(b, a);
    xj || (xj = true, hg(97, function() {
      Oj();
      return null;
    }));
  }
  function fk() {
    if (null === yj) return false;
    var a = yj;
    yj = null;
    if (0 !== (X & 48)) throw Error(y(331));
    var b = X;
    X |= 32;
    var c = Bj;
    Bj = [];
    for (var d = 0; d < c.length; d += 2) {
      var e = c[d], f = c[d + 1], g = e.destroy;
      e.destroy = void 0;
      if ("function" === typeof g) try {
        g();
      } catch (k) {
        if (null === f) throw Error(y(330));
        Wi(f, k);
      }
    }
    c = Aj;
    Aj = [];
    for (d = 0; d < c.length; d += 2) {
      e = c[d];
      f = c[d + 1];
      try {
        var h = e.create;
        e.destroy = h();
      } catch (k) {
        if (null === f) throw Error(y(330));
        Wi(f, k);
      }
    }
    for (h = a.current.firstEffect; null !== h; ) a = h.nextEffect, h.nextEffect = null, h.flags & 8 && (h.sibling = null, h.stateNode = null), h = a;
    X = b;
    ig();
    return true;
  }
  function gk(a, b, c) {
    b = Mi(c, b);
    b = Pi(a, b, 1);
    Ag(a, b);
    b = Hg();
    a = Kj(a, 1);
    null !== a && ($c(a, 1, b), Mj(a, b));
  }
  function Wi(a, b) {
    if (3 === a.tag) gk(a, a, b);
    else for (var c = a.return; null !== c; ) {
      if (3 === c.tag) {
        gk(c, a, b);
        break;
      } else if (1 === c.tag) {
        var d = c.stateNode;
        if ("function" === typeof c.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ti || !Ti.has(d))) {
          a = Mi(b, a);
          var e = Si(c, a, 1);
          Ag(c, e);
          e = Hg();
          c = Kj(c, 1);
          if (null !== c) $c(c, 1, e), Mj(c, e);
          else if ("function" === typeof d.componentDidCatch && (null === Ti || !Ti.has(d))) try {
            d.componentDidCatch(b, a);
          } catch (f) {
          }
          break;
        }
      }
      c = c.return;
    }
  }
  function Yj(a, b, c) {
    var d = a.pingCache;
    null !== d && d.delete(b);
    b = Hg();
    a.pingedLanes |= a.suspendedLanes & c;
    U === a && (W & c) === c && (4 === V || 3 === V && (W & 62914560) === W && 500 > O() - jj ? Qj(a, 0) : uj |= c);
    Mj(a, b);
  }
  function lj(a, b) {
    var c = a.stateNode;
    null !== c && c.delete(b);
    b = 0;
    0 === b && (b = a.mode, 0 === (b & 2) ? b = 1 : 0 === (b & 4) ? b = 99 === eg() ? 1 : 2 : (0 === Gj && (Gj = tj), b = Yc(62914560 & ~Gj), 0 === b && (b = 4194304)));
    c = Hg();
    a = Kj(a, b);
    null !== a && ($c(a, b, c), Mj(a, c));
  }
  var ck;
  ck = function(a, b, c) {
    var d = b.lanes;
    if (null !== a) if (a.memoizedProps !== b.pendingProps || N.current) ug = true;
    else if (0 !== (c & d)) ug = 0 !== (a.flags & 16384) ? true : false;
    else {
      ug = false;
      switch (b.tag) {
        case 3:
          ri(b);
          sh();
          break;
        case 5:
          gh(b);
          break;
        case 1:
          Ff(b.type) && Jf(b);
          break;
        case 4:
          eh(b, b.stateNode.containerInfo);
          break;
        case 10:
          d = b.memoizedProps.value;
          var e = b.type._context;
          I(mg, e._currentValue);
          e._currentValue = d;
          break;
        case 13:
          if (null !== b.memoizedState) {
            if (0 !== (c & b.child.childLanes)) return ti(a, b, c);
            I(P, P.current & 1);
            b = hi(a, b, c);
            return null !== b ? b.sibling : null;
          }
          I(P, P.current & 1);
          break;
        case 19:
          d = 0 !== (c & b.childLanes);
          if (0 !== (a.flags & 64)) {
            if (d) return Ai(a, b, c);
            b.flags |= 64;
          }
          e = b.memoizedState;
          null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
          I(P, P.current);
          if (d) break;
          else return null;
        case 23:
        case 24:
          return b.lanes = 0, mi(a, b, c);
      }
      return hi(a, b, c);
    }
    else ug = false;
    b.lanes = 0;
    switch (b.tag) {
      case 2:
        d = b.type;
        null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
        a = b.pendingProps;
        e = Ef(b, M.current);
        tg(b, c);
        e = Ch(null, b, d, a, e, c);
        b.flags |= 1;
        if ("object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof) {
          b.tag = 1;
          b.memoizedState = null;
          b.updateQueue = null;
          if (Ff(d)) {
            var f = true;
            Jf(b);
          } else f = false;
          b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null;
          xg(b);
          var g = d.getDerivedStateFromProps;
          "function" === typeof g && Gg(b, d, g, a);
          e.updater = Kg;
          b.stateNode = e;
          e._reactInternals = b;
          Og(b, d, a, c);
          b = qi(null, b, d, true, f, c);
        } else b.tag = 0, fi(null, b, e, c), b = b.child;
        return b;
      case 16:
        e = b.elementType;
        a: {
          null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
          a = b.pendingProps;
          f = e._init;
          e = f(e._payload);
          b.type = e;
          f = b.tag = hk(e);
          a = lg(e, a);
          switch (f) {
            case 0:
              b = li(null, b, e, a, c);
              break a;
            case 1:
              b = pi(null, b, e, a, c);
              break a;
            case 11:
              b = gi(null, b, e, a, c);
              break a;
            case 14:
              b = ii(null, b, e, lg(e.type, a), d, c);
              break a;
          }
          throw Error(y(306, e, ""));
        }
        return b;
      case 0:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), li(a, b, d, e, c);
      case 1:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), pi(a, b, d, e, c);
      case 3:
        ri(b);
        d = b.updateQueue;
        if (null === a || null === d) throw Error(y(282));
        d = b.pendingProps;
        e = b.memoizedState;
        e = null !== e ? e.element : null;
        yg(a, b);
        Cg(b, d, null, c);
        d = b.memoizedState.element;
        if (d === e) sh(), b = hi(a, b, c);
        else {
          e = b.stateNode;
          if (f = e.hydrate) kh = rf(b.stateNode.containerInfo.firstChild), jh = b, f = lh = true;
          if (f) {
            a = e.mutableSourceEagerHydrationData;
            if (null != a) for (e = 0; e < a.length; e += 2) f = a[e], f._workInProgressVersionPrimary = a[e + 1], th.push(f);
            c = Zg(b, null, d, c);
            for (b.child = c; c; ) c.flags = c.flags & -3 | 1024, c = c.sibling;
          } else fi(a, b, d, c), sh();
          b = b.child;
        }
        return b;
      case 5:
        return gh(b), null === a && ph(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, nf(d, e) ? g = null : null !== f && nf(d, f) && (b.flags |= 16), oi(a, b), fi(a, b, g, c), b.child;
      case 6:
        return null === a && ph(b), null;
      case 13:
        return ti(a, b, c);
      case 4:
        return eh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Yg(b, null, d, c) : fi(a, b, d, c), b.child;
      case 11:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), gi(a, b, d, e, c);
      case 7:
        return fi(a, b, b.pendingProps, c), b.child;
      case 8:
        return fi(
          a,
          b,
          b.pendingProps.children,
          c
        ), b.child;
      case 12:
        return fi(a, b, b.pendingProps.children, c), b.child;
      case 10:
        a: {
          d = b.type._context;
          e = b.pendingProps;
          g = b.memoizedProps;
          f = e.value;
          var h = b.type._context;
          I(mg, h._currentValue);
          h._currentValue = f;
          if (null !== g) if (h = g.value, f = He(h, f) ? 0 : ("function" === typeof d._calculateChangedBits ? d._calculateChangedBits(h, f) : 1073741823) | 0, 0 === f) {
            if (g.children === e.children && !N.current) {
              b = hi(a, b, c);
              break a;
            }
          } else for (h = b.child, null !== h && (h.return = b); null !== h; ) {
            var k = h.dependencies;
            if (null !== k) {
              g = h.child;
              for (var l = k.firstContext; null !== l; ) {
                if (l.context === d && 0 !== (l.observedBits & f)) {
                  1 === h.tag && (l = zg(-1, c & -c), l.tag = 2, Ag(h, l));
                  h.lanes |= c;
                  l = h.alternate;
                  null !== l && (l.lanes |= c);
                  sg(h.return, c);
                  k.lanes |= c;
                  break;
                }
                l = l.next;
              }
            } else g = 10 === h.tag ? h.type === b.type ? null : h.child : h.child;
            if (null !== g) g.return = h;
            else for (g = h; null !== g; ) {
              if (g === b) {
                g = null;
                break;
              }
              h = g.sibling;
              if (null !== h) {
                h.return = g.return;
                g = h;
                break;
              }
              g = g.return;
            }
            h = g;
          }
          fi(a, b, e.children, c);
          b = b.child;
        }
        return b;
      case 9:
        return e = b.type, f = b.pendingProps, d = f.children, tg(b, c), e = vg(
          e,
          f.unstable_observedBits
        ), d = d(e), b.flags |= 1, fi(a, b, d, c), b.child;
      case 14:
        return e = b.type, f = lg(e, b.pendingProps), f = lg(e.type, f), ii(a, b, e, f, d, c);
      case 15:
        return ki(a, b, b.type, b.pendingProps, d, c);
      case 17:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2), b.tag = 1, Ff(d) ? (a = true, Jf(b)) : a = false, tg(b, c), Mg(b, d, e), Og(b, d, e, c), qi(null, b, d, true, a, c);
      case 19:
        return Ai(a, b, c);
      case 23:
        return mi(a, b, c);
      case 24:
        return mi(a, b, c);
    }
    throw Error(y(156, b.tag));
  };
  function ik(a, b, c, d) {
    this.tag = a;
    this.key = c;
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.ref = null;
    this.pendingProps = b;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = d;
    this.flags = 0;
    this.lastEffect = this.firstEffect = this.nextEffect = null;
    this.childLanes = this.lanes = 0;
    this.alternate = null;
  }
  function nh(a, b, c, d) {
    return new ik(a, b, c, d);
  }
  function ji(a) {
    a = a.prototype;
    return !(!a || !a.isReactComponent);
  }
  function hk(a) {
    if ("function" === typeof a) return ji(a) ? 1 : 0;
    if (void 0 !== a && null !== a) {
      a = a.$$typeof;
      if (a === Aa) return 11;
      if (a === Da) return 14;
    }
    return 2;
  }
  function Tg(a, b) {
    var c = a.alternate;
    null === c ? (c = nh(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.nextEffect = null, c.firstEffect = null, c.lastEffect = null);
    c.childLanes = a.childLanes;
    c.lanes = a.lanes;
    c.child = a.child;
    c.memoizedProps = a.memoizedProps;
    c.memoizedState = a.memoizedState;
    c.updateQueue = a.updateQueue;
    b = a.dependencies;
    c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
    c.sibling = a.sibling;
    c.index = a.index;
    c.ref = a.ref;
    return c;
  }
  function Vg(a, b, c, d, e, f) {
    var g = 2;
    d = a;
    if ("function" === typeof a) ji(a) && (g = 1);
    else if ("string" === typeof a) g = 5;
    else a: switch (a) {
      case ua:
        return Xg(c.children, e, f, b);
      case Ha:
        g = 8;
        e |= 16;
        break;
      case wa:
        g = 8;
        e |= 1;
        break;
      case xa:
        return a = nh(12, c, b, e | 8), a.elementType = xa, a.type = xa, a.lanes = f, a;
      case Ba:
        return a = nh(13, c, b, e), a.type = Ba, a.elementType = Ba, a.lanes = f, a;
      case Ca:
        return a = nh(19, c, b, e), a.elementType = Ca, a.lanes = f, a;
      case Ia:
        return vi(c, e, f, b);
      case Ja:
        return a = nh(24, c, b, e), a.elementType = Ja, a.lanes = f, a;
      default:
        if ("object" === typeof a && null !== a) switch (a.$$typeof) {
          case ya:
            g = 10;
            break a;
          case za:
            g = 9;
            break a;
          case Aa:
            g = 11;
            break a;
          case Da:
            g = 14;
            break a;
          case Ea:
            g = 16;
            d = null;
            break a;
          case Fa:
            g = 22;
            break a;
        }
        throw Error(y(130, null == a ? a : typeof a, ""));
    }
    b = nh(g, c, b, e);
    b.elementType = a;
    b.type = d;
    b.lanes = f;
    return b;
  }
  function Xg(a, b, c, d) {
    a = nh(7, a, d, b);
    a.lanes = c;
    return a;
  }
  function vi(a, b, c, d) {
    a = nh(23, a, d, b);
    a.elementType = Ia;
    a.lanes = c;
    return a;
  }
  function Ug(a, b, c) {
    a = nh(6, a, null, b);
    a.lanes = c;
    return a;
  }
  function Wg(a, b, c) {
    b = nh(4, null !== a.children ? a.children : [], a.key, b);
    b.lanes = c;
    b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
    return b;
  }
  function jk(a, b, c) {
    this.tag = b;
    this.containerInfo = a;
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
    this.timeoutHandle = -1;
    this.pendingContext = this.context = null;
    this.hydrate = c;
    this.callbackNode = null;
    this.callbackPriority = 0;
    this.eventTimes = Zc(0);
    this.expirationTimes = Zc(-1);
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
    this.entanglements = Zc(0);
    this.mutableSourceEagerHydrationData = null;
  }
  function kk(a, b, c) {
    var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return { $$typeof: ta, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
  }
  function lk(a, b, c, d) {
    var e = b.current, f = Hg(), g = Ig(e);
    a: if (c) {
      c = c._reactInternals;
      b: {
        if (Zb(c) !== c || 1 !== c.tag) throw Error(y(170));
        var h = c;
        do {
          switch (h.tag) {
            case 3:
              h = h.stateNode.context;
              break b;
            case 1:
              if (Ff(h.type)) {
                h = h.stateNode.__reactInternalMemoizedMergedChildContext;
                break b;
              }
          }
          h = h.return;
        } while (null !== h);
        throw Error(y(171));
      }
      if (1 === c.tag) {
        var k = c.type;
        if (Ff(k)) {
          c = If(c, k, h);
          break a;
        }
      }
      c = h;
    } else c = Cf;
    null === b.context ? b.context = c : b.pendingContext = c;
    b = zg(f, g);
    b.payload = { element: a };
    d = void 0 === d ? null : d;
    null !== d && (b.callback = d);
    Ag(e, b);
    Jg(e, g, f);
    return g;
  }
  function mk(a) {
    a = a.current;
    if (!a.child) return null;
    switch (a.child.tag) {
      case 5:
        return a.child.stateNode;
      default:
        return a.child.stateNode;
    }
  }
  function nk(a, b) {
    a = a.memoizedState;
    if (null !== a && null !== a.dehydrated) {
      var c = a.retryLane;
      a.retryLane = 0 !== c && c < b ? c : b;
    }
  }
  function ok(a, b) {
    nk(a, b);
    (a = a.alternate) && nk(a, b);
  }
  function pk() {
    return null;
  }
  function qk(a, b, c) {
    var d = null != c && null != c.hydrationOptions && c.hydrationOptions.mutableSources || null;
    c = new jk(a, b, null != c && true === c.hydrate);
    b = nh(3, null, null, 2 === b ? 7 : 1 === b ? 3 : 0);
    c.current = b;
    b.stateNode = c;
    xg(b);
    a[ff] = c.current;
    cf(8 === a.nodeType ? a.parentNode : a);
    if (d) for (a = 0; a < d.length; a++) {
      b = d[a];
      var e = b._getVersion;
      e = e(b._source);
      null == c.mutableSourceEagerHydrationData ? c.mutableSourceEagerHydrationData = [b, e] : c.mutableSourceEagerHydrationData.push(b, e);
    }
    this._internalRoot = c;
  }
  qk.prototype.render = function(a) {
    lk(a, this._internalRoot, null, null);
  };
  qk.prototype.unmount = function() {
    var a = this._internalRoot, b = a.containerInfo;
    lk(null, a, null, function() {
      b[ff] = null;
    });
  };
  function rk(a) {
    return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
  }
  function sk(a, b) {
    b || (b = a ? 9 === a.nodeType ? a.documentElement : a.firstChild : null, b = !(!b || 1 !== b.nodeType || !b.hasAttribute("data-reactroot")));
    if (!b) for (var c; c = a.lastChild; ) a.removeChild(c);
    return new qk(a, 0, b ? { hydrate: true } : void 0);
  }
  function tk(a, b, c, d, e) {
    var f = c._reactRootContainer;
    if (f) {
      var g = f._internalRoot;
      if ("function" === typeof e) {
        var h = e;
        e = function() {
          var a2 = mk(g);
          h.call(a2);
        };
      }
      lk(b, g, a, e);
    } else {
      f = c._reactRootContainer = sk(c, d);
      g = f._internalRoot;
      if ("function" === typeof e) {
        var k = e;
        e = function() {
          var a2 = mk(g);
          k.call(a2);
        };
      }
      Xj(function() {
        lk(b, g, a, e);
      });
    }
    return mk(g);
  }
  ec = function(a) {
    if (13 === a.tag) {
      var b = Hg();
      Jg(a, 4, b);
      ok(a, 4);
    }
  };
  fc = function(a) {
    if (13 === a.tag) {
      var b = Hg();
      Jg(a, 67108864, b);
      ok(a, 67108864);
    }
  };
  gc = function(a) {
    if (13 === a.tag) {
      var b = Hg(), c = Ig(a);
      Jg(a, c, b);
      ok(a, c);
    }
  };
  hc = function(a, b) {
    return b();
  };
  yb = function(a, b, c) {
    switch (b) {
      case "input":
        ab(a, c);
        b = c.name;
        if ("radio" === c.type && null != b) {
          for (c = a; c.parentNode; ) c = c.parentNode;
          c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
          for (b = 0; b < c.length; b++) {
            var d = c[b];
            if (d !== a && d.form === a.form) {
              var e = Db(d);
              if (!e) throw Error(y(90));
              Wa(d);
              ab(d, e);
            }
          }
        }
        break;
      case "textarea":
        ib(a, c);
        break;
      case "select":
        b = c.value, null != b && fb(a, !!c.multiple, b, false);
    }
  };
  Gb = Wj;
  Hb = function(a, b, c, d, e) {
    var f = X;
    X |= 4;
    try {
      return gg(98, a.bind(null, b, c, d, e));
    } finally {
      X = f, 0 === X && (wj(), ig());
    }
  };
  Ib = function() {
    0 === (X & 49) && (Vj(), Oj());
  };
  Jb = function(a, b) {
    var c = X;
    X |= 2;
    try {
      return a(b);
    } finally {
      X = c, 0 === X && (wj(), ig());
    }
  };
  function uk(a, b) {
    var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!rk(b)) throw Error(y(200));
    return kk(a, b, null, c);
  }
  var vk = { Events: [Cb, ue, Db, Eb, Fb, Oj, { current: false }] }, wk = { findFiberByHostInstance: wc, bundleType: 0, version: "17.0.2", rendererPackageName: "react-dom" };
  var xk = { bundleType: wk.bundleType, version: wk.version, rendererPackageName: wk.rendererPackageName, rendererConfig: wk.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ra.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
    a = cc(a);
    return null === a ? null : a.stateNode;
  }, findFiberByHostInstance: wk.findFiberByHostInstance || pk, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null };
  if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
    var yk = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!yk.isDisabled && yk.supportsFiber) try {
      Lf = yk.inject(xk), Mf = yk;
    } catch (a) {
    }
  }
  reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = vk;
  reactDom_production_min.createPortal = uk;
  reactDom_production_min.findDOMNode = function(a) {
    if (null == a) return null;
    if (1 === a.nodeType) return a;
    var b = a._reactInternals;
    if (void 0 === b) {
      if ("function" === typeof a.render) throw Error(y(188));
      throw Error(y(268, Object.keys(a)));
    }
    a = cc(b);
    a = null === a ? null : a.stateNode;
    return a;
  };
  reactDom_production_min.flushSync = function(a, b) {
    var c = X;
    if (0 !== (c & 48)) return a(b);
    X |= 1;
    try {
      if (a) return gg(99, a.bind(null, b));
    } finally {
      X = c, ig();
    }
  };
  reactDom_production_min.hydrate = function(a, b, c) {
    if (!rk(b)) throw Error(y(200));
    return tk(null, a, b, true, c);
  };
  reactDom_production_min.render = function(a, b, c) {
    if (!rk(b)) throw Error(y(200));
    return tk(null, a, b, false, c);
  };
  reactDom_production_min.unmountComponentAtNode = function(a) {
    if (!rk(a)) throw Error(y(40));
    return a._reactRootContainer ? (Xj(function() {
      tk(null, null, a, false, function() {
        a._reactRootContainer = null;
        a[ff] = null;
      });
    }), true) : false;
  };
  reactDom_production_min.unstable_batchedUpdates = Wj;
  reactDom_production_min.unstable_createPortal = function(a, b) {
    return uk(a, b, 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null);
  };
  reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
    if (!rk(c)) throw Error(y(200));
    if (null == a || void 0 === a._reactInternals) throw Error(y(38));
    return tk(a, b, c, false, d);
  };
  reactDom_production_min.version = "17.0.2";
  return reactDom_production_min;
}
var hasRequiredReactDom;
function requireReactDom() {
  if (hasRequiredReactDom) return reactDom.exports;
  hasRequiredReactDom = 1;
  function checkDCE() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
      return;
    }
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
    } catch (err) {
      console.error(err);
    }
  }
  {
    checkDCE();
    reactDom.exports = requireReactDom_production_min();
  }
  return reactDom.exports;
}
var reactDomExports = requireReactDom();
const ReactDOM = /* @__PURE__ */ getDefaultExportFromCjs(reactDomExports);
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
    return t2.__proto__ = e2, t2;
  }, _setPrototypeOf(t, e);
}
function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}
var propTypes = { exports: {} };
var ReactPropTypesSecret_1;
var hasRequiredReactPropTypesSecret;
function requireReactPropTypesSecret() {
  if (hasRequiredReactPropTypesSecret) return ReactPropTypesSecret_1;
  hasRequiredReactPropTypesSecret = 1;
  var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  ReactPropTypesSecret_1 = ReactPropTypesSecret;
  return ReactPropTypesSecret_1;
}
var factoryWithThrowingShims;
var hasRequiredFactoryWithThrowingShims;
function requireFactoryWithThrowingShims() {
  if (hasRequiredFactoryWithThrowingShims) return factoryWithThrowingShims;
  hasRequiredFactoryWithThrowingShims = 1;
  var ReactPropTypesSecret = /* @__PURE__ */ requireReactPropTypesSecret();
  function emptyFunction() {
  }
  function emptyFunctionWithReset() {
  }
  emptyFunctionWithReset.resetWarningCache = emptyFunction;
  factoryWithThrowingShims = function() {
    function shim(props, propName, componentName, location, propFullName, secret) {
      if (secret === ReactPropTypesSecret) {
        return;
      }
      var err = new Error(
        "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
      );
      err.name = "Invariant Violation";
      throw err;
    }
    shim.isRequired = shim;
    function getShim() {
      return shim;
    }
    var ReactPropTypes = {
      array: shim,
      bigint: shim,
      bool: shim,
      func: shim,
      number: shim,
      object: shim,
      string: shim,
      symbol: shim,
      any: shim,
      arrayOf: getShim,
      element: shim,
      elementType: shim,
      instanceOf: getShim,
      node: shim,
      objectOf: getShim,
      oneOf: getShim,
      oneOfType: getShim,
      shape: getShim,
      exact: getShim,
      checkPropTypes: emptyFunctionWithReset,
      resetWarningCache: emptyFunction
    };
    ReactPropTypes.PropTypes = ReactPropTypes;
    return ReactPropTypes;
  };
  return factoryWithThrowingShims;
}
var hasRequiredPropTypes;
function requirePropTypes() {
  if (hasRequiredPropTypes) return propTypes.exports;
  hasRequiredPropTypes = 1;
  {
    propTypes.exports = /* @__PURE__ */ requireFactoryWithThrowingShims()();
  }
  return propTypes.exports;
}
var propTypesExports = /* @__PURE__ */ requirePropTypes();
const PropTypes = /* @__PURE__ */ getDefaultExportFromCjs(propTypesExports);
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function isAbsolute(pathname) {
  return pathname.charAt(0) === "/";
}
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }
  list.pop();
}
function resolvePathname(to, from) {
  if (from === void 0) from = "";
  var toParts = to && to.split("/") || [];
  var fromParts = from && from.split("/") || [];
  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;
  if (to && isAbsolute(to)) {
    fromParts = toParts;
  } else if (toParts.length) {
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }
  if (!fromParts.length) return "/";
  var hasTrailingSlash;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === "." || last === ".." || last === "";
  } else {
    hasTrailingSlash = false;
  }
  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];
    if (part === ".") {
      spliceOne(fromParts, i);
    } else if (part === "..") {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }
  if (!mustEndAbs) for (; up--; up) fromParts.unshift("..");
  if (mustEndAbs && fromParts[0] !== "" && (!fromParts[0] || !isAbsolute(fromParts[0])))
    fromParts.unshift("");
  var result = fromParts.join("/");
  if (hasTrailingSlash && result.substr(-1) !== "/") result += "/";
  return result;
}
function valueOf(obj) {
  return obj.valueOf ? obj.valueOf() : Object.prototype.valueOf.call(obj);
}
function valueEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (Array.isArray(a)) {
    return Array.isArray(b) && a.length === b.length && a.every(function(item, index) {
      return valueEqual(item, b[index]);
    });
  }
  if (typeof a === "object" || typeof b === "object") {
    var aValue = valueOf(a);
    var bValue = valueOf(b);
    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);
    return Object.keys(Object.assign({}, a, b)).every(function(key) {
      return valueEqual(a[key], b[key]);
    });
  }
  return false;
}
var prefix = "Invariant failed";
function invariant(condition, message) {
  {
    throw new Error(prefix);
  }
}
function addLeadingSlash$1(path) {
  return path.charAt(0) === "/" ? path : "/" + path;
}
function stripLeadingSlash(path) {
  return path.charAt(0) === "/" ? path.substr(1) : path;
}
function hasBasename(path, prefix2) {
  return path.toLowerCase().indexOf(prefix2.toLowerCase()) === 0 && "/?#".indexOf(path.charAt(prefix2.length)) !== -1;
}
function stripBasename$1(path, prefix2) {
  return hasBasename(path, prefix2) ? path.substr(prefix2.length) : path;
}
function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === "/" ? path.slice(0, -1) : path;
}
function parsePath(path) {
  var pathname = path || "/";
  var search = "";
  var hash = "";
  var hashIndex = pathname.indexOf("#");
  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }
  var searchIndex = pathname.indexOf("?");
  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }
  return {
    pathname,
    search: search === "?" ? "" : search,
    hash: hash === "#" ? "" : hash
  };
}
function createPath(location) {
  var pathname = location.pathname, search = location.search, hash = location.hash;
  var path = pathname || "/";
  if (search && search !== "?") path += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#") path += hash.charAt(0) === "#" ? hash : "#" + hash;
  return path;
}
function createLocation(path, state, key, currentLocation) {
  var location;
  if (typeof path === "string") {
    location = parsePath(path);
    location.state = state;
  } else {
    location = _extends({}, path);
    if (location.pathname === void 0) location.pathname = "";
    if (location.search) {
      if (location.search.charAt(0) !== "?") location.search = "?" + location.search;
    } else {
      location.search = "";
    }
    if (location.hash) {
      if (location.hash.charAt(0) !== "#") location.hash = "#" + location.hash;
    } else {
      location.hash = "";
    }
    if (state !== void 0 && location.state === void 0) location.state = state;
  }
  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }
  if (key) location.key = key;
  if (currentLocation) {
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== "/") {
      location.pathname = resolvePathname(location.pathname, currentLocation.pathname);
    }
  } else {
    if (!location.pathname) {
      location.pathname = "/";
    }
  }
  return location;
}
function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && valueEqual(a.state, b.state);
}
function createTransitionManager() {
  var prompt = null;
  function setPrompt(nextPrompt) {
    prompt = nextPrompt;
    return function() {
      if (prompt === nextPrompt) prompt = null;
    };
  }
  function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    if (prompt != null) {
      var result = typeof prompt === "function" ? prompt(location, action) : prompt;
      if (typeof result === "string") {
        if (typeof getUserConfirmation === "function") {
          getUserConfirmation(result, callback);
        } else {
          callback(true);
        }
      } else {
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  }
  var listeners = [];
  function appendListener(fn) {
    var isActive = true;
    function listener() {
      if (isActive) fn.apply(void 0, arguments);
    }
    listeners.push(listener);
    return function() {
      isActive = false;
      listeners = listeners.filter(function(item) {
        return item !== listener;
      });
    };
  }
  function notifyListeners() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    listeners.forEach(function(listener) {
      return listener.apply(void 0, args);
    });
  }
  return {
    setPrompt,
    confirmTransitionTo,
    appendListener,
    notifyListeners
  };
}
var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
function getConfirmation(message, callback) {
  callback(window.confirm(message));
}
function supportsHistory() {
  var ua = window.navigator.userAgent;
  if ((ua.indexOf("Android 2.") !== -1 || ua.indexOf("Android 4.0") !== -1) && ua.indexOf("Mobile Safari") !== -1 && ua.indexOf("Chrome") === -1 && ua.indexOf("Windows Phone") === -1) return false;
  return window.history && "pushState" in window.history;
}
function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf("Trident") === -1;
}
function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf("Firefox") === -1;
}
function isExtraneousPopstateEvent(event) {
  return event.state === void 0 && navigator.userAgent.indexOf("CriOS") === -1;
}
var PopStateEvent = "popstate";
var HashChangeEvent = "hashchange";
function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    return {};
  }
}
function createBrowserHistory(props) {
  if (props === void 0) {
    props = {};
  }
  !canUseDOM ? invariant() : void 0;
  var globalHistory = window.history;
  var canUseHistory = supportsHistory();
  var needsHashChangeListener = !supportsPopStateOnHashChange();
  var _props = props, _props$forceRefresh = _props.forceRefresh, forceRefresh = _props$forceRefresh === void 0 ? false : _props$forceRefresh, _props$getUserConfirm = _props.getUserConfirmation, getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm, _props$keyLength = _props.keyLength, keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash$1(props.basename)) : "";
  function getDOMLocation(historyState) {
    var _ref = historyState || {}, key = _ref.key, state = _ref.state;
    var _window$location = window.location, pathname = _window$location.pathname, search = _window$location.search, hash = _window$location.hash;
    var path = pathname + search + hash;
    if (basename) path = stripBasename$1(path, basename);
    return createLocation(path, state, key);
  }
  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }
  var transitionManager = createTransitionManager();
  function setState(nextState) {
    _extends(history, nextState);
    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }
  function handlePopState(event) {
    if (isExtraneousPopstateEvent(event)) return;
    handlePop(getDOMLocation(event.state));
  }
  function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  }
  var forceNextPop = false;
  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = "POP";
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
        if (ok) {
          setState({
            action,
            location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }
  function revertPop(fromLocation) {
    var toLocation = history.location;
    var toIndex = allKeys.indexOf(toLocation.key);
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allKeys.indexOf(fromLocation.key);
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;
    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  }
  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key];
  function createHref(location) {
    return basename + createPath(location);
  }
  function push(path, state) {
    var action = "PUSH";
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key, state2 = location.state;
      if (canUseHistory) {
        globalHistory.pushState({
          key,
          state: state2
        }, null, href);
        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex + 1);
          nextKeys.push(location.key);
          allKeys = nextKeys;
          setState({
            action,
            location
          });
        }
      } else {
        window.location.href = href;
      }
    });
  }
  function replace(path, state) {
    var action = "REPLACE";
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key, state2 = location.state;
      if (canUseHistory) {
        globalHistory.replaceState({
          key,
          state: state2
        }, null, href);
        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          if (prevIndex !== -1) allKeys[prevIndex] = location.key;
          setState({
            action,
            location
          });
        }
      } else {
        window.location.replace(href);
      }
    });
  }
  function go(n) {
    globalHistory.go(n);
  }
  function goBack() {
    go(-1);
  }
  function goForward() {
    go(1);
  }
  var listenerCount = 0;
  function checkDOMListeners(delta) {
    listenerCount += delta;
    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.addEventListener(HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.removeEventListener(HashChangeEvent, handleHashChange);
    }
  }
  var isBlocked = false;
  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }
    var unblock = transitionManager.setPrompt(prompt);
    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }
    return function() {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }
      return unblock();
    };
  }
  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function() {
      checkDOMListeners(-1);
      unlisten();
    };
  }
  var history = {
    length: globalHistory.length,
    action: "POP",
    location: initialLocation,
    createHref,
    push,
    replace,
    go,
    goBack,
    goForward,
    block,
    listen
  };
  return history;
}
var HashChangeEvent$1 = "hashchange";
var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === "!" ? path : "!/" + stripLeadingSlash(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === "!" ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: stripLeadingSlash,
    decodePath: addLeadingSlash$1
  },
  slash: {
    encodePath: addLeadingSlash$1,
    decodePath: addLeadingSlash$1
  }
};
function stripHash(url) {
  var hashIndex = url.indexOf("#");
  return hashIndex === -1 ? url : url.slice(0, hashIndex);
}
function getHashPath() {
  var href = window.location.href;
  var hashIndex = href.indexOf("#");
  return hashIndex === -1 ? "" : href.substring(hashIndex + 1);
}
function pushHashPath(path) {
  window.location.hash = path;
}
function replaceHashPath(path) {
  window.location.replace(stripHash(window.location.href) + "#" + path);
}
function createHashHistory(props) {
  if (props === void 0) {
    props = {};
  }
  !canUseDOM ? invariant() : void 0;
  var globalHistory = window.history;
  supportsGoWithoutReloadUsingHash();
  var _props = props, _props$getUserConfirm = _props.getUserConfirmation, getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm, _props$hashType = _props.hashType, hashType = _props$hashType === void 0 ? "slash" : _props$hashType;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash$1(props.basename)) : "";
  var _HashPathCoders$hashT = HashPathCoders[hashType], encodePath2 = _HashPathCoders$hashT.encodePath, decodePath2 = _HashPathCoders$hashT.decodePath;
  function getDOMLocation() {
    var path2 = decodePath2(getHashPath());
    if (basename) path2 = stripBasename$1(path2, basename);
    return createLocation(path2);
  }
  var transitionManager = createTransitionManager();
  function setState(nextState) {
    _extends(history, nextState);
    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }
  var forceNextPop = false;
  var ignorePath = null;
  function locationsAreEqual$$1(a, b) {
    return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash;
  }
  function handleHashChange() {
    var path2 = getHashPath();
    var encodedPath2 = encodePath2(path2);
    if (path2 !== encodedPath2) {
      replaceHashPath(encodedPath2);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;
      if (!forceNextPop && locationsAreEqual$$1(prevLocation, location)) return;
      if (ignorePath === createPath(location)) return;
      ignorePath = null;
      handlePop(location);
    }
  }
  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = "POP";
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
        if (ok) {
          setState({
            action,
            location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }
  function revertPop(fromLocation) {
    var toLocation = history.location;
    var toIndex = allPaths.lastIndexOf(createPath(toLocation));
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allPaths.lastIndexOf(createPath(fromLocation));
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;
    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  }
  var path = getHashPath();
  var encodedPath = encodePath2(path);
  if (path !== encodedPath) replaceHashPath(encodedPath);
  var initialLocation = getDOMLocation();
  var allPaths = [createPath(initialLocation)];
  function createHref(location) {
    var baseTag = document.querySelector("base");
    var href = "";
    if (baseTag && baseTag.getAttribute("href")) {
      href = stripHash(window.location.href);
    }
    return href + "#" + encodePath2(basename + createPath(location));
  }
  function push(path2, state) {
    var action = "PUSH";
    var location = createLocation(path2, void 0, void 0, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
      if (!ok) return;
      var path3 = createPath(location);
      var encodedPath2 = encodePath2(basename + path3);
      var hashChanged = getHashPath() !== encodedPath2;
      if (hashChanged) {
        ignorePath = path3;
        pushHashPath(encodedPath2);
        var prevIndex = allPaths.lastIndexOf(createPath(history.location));
        var nextPaths = allPaths.slice(0, prevIndex + 1);
        nextPaths.push(path3);
        allPaths = nextPaths;
        setState({
          action,
          location
        });
      } else {
        setState();
      }
    });
  }
  function replace(path2, state) {
    var action = "REPLACE";
    var location = createLocation(path2, void 0, void 0, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
      if (!ok) return;
      var path3 = createPath(location);
      var encodedPath2 = encodePath2(basename + path3);
      var hashChanged = getHashPath() !== encodedPath2;
      if (hashChanged) {
        ignorePath = path3;
        replaceHashPath(encodedPath2);
      }
      var prevIndex = allPaths.indexOf(createPath(history.location));
      if (prevIndex !== -1) allPaths[prevIndex] = path3;
      setState({
        action,
        location
      });
    });
  }
  function go(n) {
    globalHistory.go(n);
  }
  function goBack() {
    go(-1);
  }
  function goForward() {
    go(1);
  }
  var listenerCount = 0;
  function checkDOMListeners(delta) {
    listenerCount += delta;
    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(HashChangeEvent$1, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(HashChangeEvent$1, handleHashChange);
    }
  }
  var isBlocked = false;
  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }
    var unblock = transitionManager.setPrompt(prompt);
    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }
    return function() {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }
      return unblock();
    };
  }
  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function() {
      checkDOMListeners(-1);
      unlisten();
    };
  }
  var history = {
    length: globalHistory.length,
    action: "POP",
    location: initialLocation,
    createHref,
    push,
    replace,
    go,
    goBack,
    goForward,
    block,
    listen
  };
  return history;
}
function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
}
function createMemoryHistory(props) {
  if (props === void 0) {
    props = {};
  }
  var _props = props, getUserConfirmation = _props.getUserConfirmation, _props$initialEntries = _props.initialEntries, initialEntries = _props$initialEntries === void 0 ? ["/"] : _props$initialEntries, _props$initialIndex = _props.initialIndex, initialIndex = _props$initialIndex === void 0 ? 0 : _props$initialIndex, _props$keyLength = _props.keyLength, keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var transitionManager = createTransitionManager();
  function setState(nextState) {
    _extends(history, nextState);
    history.length = history.entries.length;
    transitionManager.notifyListeners(history.location, history.action);
  }
  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }
  var index = clamp(initialIndex, 0, initialEntries.length - 1);
  var entries = initialEntries.map(function(entry) {
    return typeof entry === "string" ? createLocation(entry, void 0, createKey()) : createLocation(entry, void 0, entry.key || createKey());
  });
  var createHref = createPath;
  function push(path, state) {
    var action = "PUSH";
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
      if (!ok) return;
      var prevIndex = history.index;
      var nextIndex = prevIndex + 1;
      var nextEntries = history.entries.slice(0);
      if (nextEntries.length > nextIndex) {
        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
      } else {
        nextEntries.push(location);
      }
      setState({
        action,
        location,
        index: nextIndex,
        entries: nextEntries
      });
    });
  }
  function replace(path, state) {
    var action = "REPLACE";
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
      if (!ok) return;
      history.entries[history.index] = location;
      setState({
        action,
        location
      });
    });
  }
  function go(n) {
    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);
    var action = "POP";
    var location = history.entries[nextIndex];
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
      if (ok) {
        setState({
          action,
          location,
          index: nextIndex
        });
      } else {
        setState();
      }
    });
  }
  function goBack() {
    go(-1);
  }
  function goForward() {
    go(1);
  }
  function canGo(n) {
    var nextIndex = history.index + n;
    return nextIndex >= 0 && nextIndex < history.entries.length;
  }
  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }
    return transitionManager.setPrompt(prompt);
  }
  function listen(listener) {
    return transitionManager.appendListener(listener);
  }
  var history = {
    length: entries.length,
    action: "POP",
    location: entries[index],
    index,
    entries,
    createHref,
    push,
    replace,
    go,
    goBack,
    goForward,
    canGo,
    block,
    listen
  };
  return history;
}
var pathToRegexp$1 = { exports: {} };
var isarray;
var hasRequiredIsarray;
function requireIsarray() {
  if (hasRequiredIsarray) return isarray;
  hasRequiredIsarray = 1;
  isarray = Array.isArray || function(arr) {
    return Object.prototype.toString.call(arr) == "[object Array]";
  };
  return isarray;
}
var hasRequiredPathToRegexp;
function requirePathToRegexp() {
  if (hasRequiredPathToRegexp) return pathToRegexp$1.exports;
  hasRequiredPathToRegexp = 1;
  var isarray2 = requireIsarray();
  pathToRegexp$1.exports = pathToRegexp2;
  pathToRegexp$1.exports.parse = parse;
  pathToRegexp$1.exports.compile = compile;
  pathToRegexp$1.exports.tokensToFunction = tokensToFunction;
  pathToRegexp$1.exports.tokensToRegExp = tokensToRegExp;
  var PATH_REGEXP = new RegExp([
    // Match escaped characters that would otherwise appear in future matches.
    // This allows the user to escape special characters that won't transform.
    "(\\\\.)",
    // Match Express-style parameters and un-named parameters with a prefix
    // and optional suffixes. Matches appear as:
    //
    // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
    // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
    // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
    "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"
  ].join("|"), "g");
  function parse(str, options) {
    var tokens = [];
    var key = 0;
    var index = 0;
    var path = "";
    var defaultDelimiter = options && options.delimiter || "/";
    var res;
    while ((res = PATH_REGEXP.exec(str)) != null) {
      var m = res[0];
      var escaped = res[1];
      var offset = res.index;
      path += str.slice(index, offset);
      index = offset + m.length;
      if (escaped) {
        path += escaped[1];
        continue;
      }
      var next = str[index];
      var prefix2 = res[2];
      var name = res[3];
      var capture = res[4];
      var group = res[5];
      var modifier = res[6];
      var asterisk = res[7];
      if (path) {
        tokens.push(path);
        path = "";
      }
      var partial = prefix2 != null && next != null && next !== prefix2;
      var repeat = modifier === "+" || modifier === "*";
      var optional = modifier === "?" || modifier === "*";
      var delimiter = prefix2 || defaultDelimiter;
      var pattern = capture || group;
      var prevText = prefix2 || (typeof tokens[tokens.length - 1] === "string" ? tokens[tokens.length - 1] : "");
      tokens.push({
        name: name || key++,
        prefix: prefix2 || "",
        delimiter,
        optional,
        repeat,
        partial,
        asterisk: !!asterisk,
        pattern: pattern ? escapeGroup(pattern) : asterisk ? ".*" : restrictBacktrack(delimiter, prevText)
      });
    }
    if (index < str.length) {
      path += str.substr(index);
    }
    if (path) {
      tokens.push(path);
    }
    return tokens;
  }
  function restrictBacktrack(delimiter, prevText) {
    if (!prevText || prevText.indexOf(delimiter) > -1) {
      return "[^" + escapeString(delimiter) + "]+?";
    }
    return escapeString(prevText) + "|(?:(?!" + escapeString(prevText) + ")[^" + escapeString(delimiter) + "])+?";
  }
  function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
  }
  function encodeURIComponentPretty(str) {
    return encodeURI(str).replace(/[\/?#]/g, function(c) {
      return "%" + c.charCodeAt(0).toString(16).toUpperCase();
    });
  }
  function encodeAsterisk(str) {
    return encodeURI(str).replace(/[?#]/g, function(c) {
      return "%" + c.charCodeAt(0).toString(16).toUpperCase();
    });
  }
  function tokensToFunction(tokens, options) {
    var matches = new Array(tokens.length);
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] === "object") {
        matches[i] = new RegExp("^(?:" + tokens[i].pattern + ")$", flags(options));
      }
    }
    return function(obj, opts) {
      var path = "";
      var data = obj || {};
      var options2 = opts || {};
      var encode = options2.pretty ? encodeURIComponentPretty : encodeURIComponent;
      for (var i2 = 0; i2 < tokens.length; i2++) {
        var token = tokens[i2];
        if (typeof token === "string") {
          path += token;
          continue;
        }
        var value = data[token.name];
        var segment;
        if (value == null) {
          if (token.optional) {
            if (token.partial) {
              path += token.prefix;
            }
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to be defined');
          }
        }
        if (isarray2(value)) {
          if (!token.repeat) {
            throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + "`");
          }
          if (value.length === 0) {
            if (token.optional) {
              continue;
            } else {
              throw new TypeError('Expected "' + token.name + '" to not be empty');
            }
          }
          for (var j = 0; j < value.length; j++) {
            segment = encode(value[j]);
            if (!matches[i2].test(segment)) {
              throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + "`");
            }
            path += (j === 0 ? token.prefix : token.delimiter) + segment;
          }
          continue;
        }
        segment = token.asterisk ? encodeAsterisk(value) : encode(value);
        if (!matches[i2].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
        }
        path += token.prefix + segment;
      }
      return path;
    };
  }
  function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");
  }
  function escapeGroup(group) {
    return group.replace(/([=!:$\/()])/g, "\\$1");
  }
  function attachKeys(re, keys) {
    re.keys = keys;
    return re;
  }
  function flags(options) {
    return options && options.sensitive ? "" : "i";
  }
  function regexpToRegexp(path, keys) {
    var groups = path.source.match(/\((?!\?)/g);
    if (groups) {
      for (var i = 0; i < groups.length; i++) {
        keys.push({
          name: i,
          prefix: null,
          delimiter: null,
          optional: false,
          repeat: false,
          partial: false,
          asterisk: false,
          pattern: null
        });
      }
    }
    return attachKeys(path, keys);
  }
  function arrayToRegexp(path, keys, options) {
    var parts = [];
    for (var i = 0; i < path.length; i++) {
      parts.push(pathToRegexp2(path[i], keys, options).source);
    }
    var regexp = new RegExp("(?:" + parts.join("|") + ")", flags(options));
    return attachKeys(regexp, keys);
  }
  function stringToRegexp(path, keys, options) {
    return tokensToRegExp(parse(path, options), keys, options);
  }
  function tokensToRegExp(tokens, keys, options) {
    if (!isarray2(keys)) {
      options = /** @type {!Object} */
      keys || options;
      keys = [];
    }
    options = options || {};
    var strict = options.strict;
    var end = options.end !== false;
    var route = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        route += escapeString(token);
      } else {
        var prefix2 = escapeString(token.prefix);
        var capture = "(?:" + token.pattern + ")";
        keys.push(token);
        if (token.repeat) {
          capture += "(?:" + prefix2 + capture + ")*";
        }
        if (token.optional) {
          if (!token.partial) {
            capture = "(?:" + prefix2 + "(" + capture + "))?";
          } else {
            capture = prefix2 + "(" + capture + ")?";
          }
        } else {
          capture = prefix2 + "(" + capture + ")";
        }
        route += capture;
      }
    }
    var delimiter = escapeString(options.delimiter || "/");
    var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;
    if (!strict) {
      route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + "(?:" + delimiter + "(?=$))?";
    }
    if (end) {
      route += "$";
    } else {
      route += strict && endsWithDelimiter ? "" : "(?=" + delimiter + "|$)";
    }
    return attachKeys(new RegExp("^" + route, flags(options)), keys);
  }
  function pathToRegexp2(path, keys, options) {
    if (!isarray2(keys)) {
      options = /** @type {!Object} */
      keys || options;
      keys = [];
    }
    options = options || {};
    if (path instanceof RegExp) {
      return regexpToRegexp(
        path,
        /** @type {!Array} */
        keys
      );
    }
    if (isarray2(path)) {
      return arrayToRegexp(
        /** @type {!Array} */
        path,
        /** @type {!Array} */
        keys,
        options
      );
    }
    return stringToRegexp(
      /** @type {string} */
      path,
      /** @type {!Array} */
      keys,
      options
    );
  }
  return pathToRegexp$1.exports;
}
var pathToRegexpExports = requirePathToRegexp();
const pathToRegexp = /* @__PURE__ */ getDefaultExportFromCjs(pathToRegexpExports);
var reactIs$1 = { exports: {} };
var reactIs_production_min$1 = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactIs_production_min$1;
function requireReactIs_production_min$1() {
  if (hasRequiredReactIs_production_min$1) return reactIs_production_min$1;
  hasRequiredReactIs_production_min$1 = 1;
  var b = "function" === typeof Symbol && Symbol.for, c = b ? Symbol.for("react.element") : 60103, d = b ? Symbol.for("react.portal") : 60106, e = b ? Symbol.for("react.fragment") : 60107, f = b ? Symbol.for("react.strict_mode") : 60108, g = b ? Symbol.for("react.profiler") : 60114, h = b ? Symbol.for("react.provider") : 60109, k = b ? Symbol.for("react.context") : 60110, l = b ? Symbol.for("react.async_mode") : 60111, m = b ? Symbol.for("react.concurrent_mode") : 60111, n = b ? Symbol.for("react.forward_ref") : 60112, p = b ? Symbol.for("react.suspense") : 60113, q = b ? Symbol.for("react.suspense_list") : 60120, r = b ? Symbol.for("react.memo") : 60115, t = b ? Symbol.for("react.lazy") : 60116, v = b ? Symbol.for("react.block") : 60121, w = b ? Symbol.for("react.fundamental") : 60117, x = b ? Symbol.for("react.responder") : 60118, y = b ? Symbol.for("react.scope") : 60119;
  function z(a) {
    if ("object" === typeof a && null !== a) {
      var u = a.$$typeof;
      switch (u) {
        case c:
          switch (a = a.type, a) {
            case l:
            case m:
            case e:
            case g:
            case f:
            case p:
              return a;
            default:
              switch (a = a && a.$$typeof, a) {
                case k:
                case n:
                case t:
                case r:
                case h:
                  return a;
                default:
                  return u;
              }
          }
        case d:
          return u;
      }
    }
  }
  function A(a) {
    return z(a) === m;
  }
  reactIs_production_min$1.AsyncMode = l;
  reactIs_production_min$1.ConcurrentMode = m;
  reactIs_production_min$1.ContextConsumer = k;
  reactIs_production_min$1.ContextProvider = h;
  reactIs_production_min$1.Element = c;
  reactIs_production_min$1.ForwardRef = n;
  reactIs_production_min$1.Fragment = e;
  reactIs_production_min$1.Lazy = t;
  reactIs_production_min$1.Memo = r;
  reactIs_production_min$1.Portal = d;
  reactIs_production_min$1.Profiler = g;
  reactIs_production_min$1.StrictMode = f;
  reactIs_production_min$1.Suspense = p;
  reactIs_production_min$1.isAsyncMode = function(a) {
    return A(a) || z(a) === l;
  };
  reactIs_production_min$1.isConcurrentMode = A;
  reactIs_production_min$1.isContextConsumer = function(a) {
    return z(a) === k;
  };
  reactIs_production_min$1.isContextProvider = function(a) {
    return z(a) === h;
  };
  reactIs_production_min$1.isElement = function(a) {
    return "object" === typeof a && null !== a && a.$$typeof === c;
  };
  reactIs_production_min$1.isForwardRef = function(a) {
    return z(a) === n;
  };
  reactIs_production_min$1.isFragment = function(a) {
    return z(a) === e;
  };
  reactIs_production_min$1.isLazy = function(a) {
    return z(a) === t;
  };
  reactIs_production_min$1.isMemo = function(a) {
    return z(a) === r;
  };
  reactIs_production_min$1.isPortal = function(a) {
    return z(a) === d;
  };
  reactIs_production_min$1.isProfiler = function(a) {
    return z(a) === g;
  };
  reactIs_production_min$1.isStrictMode = function(a) {
    return z(a) === f;
  };
  reactIs_production_min$1.isSuspense = function(a) {
    return z(a) === p;
  };
  reactIs_production_min$1.isValidElementType = function(a) {
    return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
  };
  reactIs_production_min$1.typeOf = z;
  return reactIs_production_min$1;
}
var hasRequiredReactIs$1;
function requireReactIs$1() {
  if (hasRequiredReactIs$1) return reactIs$1.exports;
  hasRequiredReactIs$1 = 1;
  {
    reactIs$1.exports = requireReactIs_production_min$1();
  }
  return reactIs$1.exports;
}
requireReactIs$1();
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var reactIs = { exports: {} };
var reactIs_production_min = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactIs_production_min;
function requireReactIs_production_min() {
  if (hasRequiredReactIs_production_min) return reactIs_production_min;
  hasRequiredReactIs_production_min = 1;
  var b = "function" === typeof Symbol && Symbol.for, c = b ? Symbol.for("react.element") : 60103, d = b ? Symbol.for("react.portal") : 60106, e = b ? Symbol.for("react.fragment") : 60107, f = b ? Symbol.for("react.strict_mode") : 60108, g = b ? Symbol.for("react.profiler") : 60114, h = b ? Symbol.for("react.provider") : 60109, k = b ? Symbol.for("react.context") : 60110, l = b ? Symbol.for("react.async_mode") : 60111, m = b ? Symbol.for("react.concurrent_mode") : 60111, n = b ? Symbol.for("react.forward_ref") : 60112, p = b ? Symbol.for("react.suspense") : 60113, q = b ? Symbol.for("react.suspense_list") : 60120, r = b ? Symbol.for("react.memo") : 60115, t = b ? Symbol.for("react.lazy") : 60116, v = b ? Symbol.for("react.block") : 60121, w = b ? Symbol.for("react.fundamental") : 60117, x = b ? Symbol.for("react.responder") : 60118, y = b ? Symbol.for("react.scope") : 60119;
  function z(a) {
    if ("object" === typeof a && null !== a) {
      var u = a.$$typeof;
      switch (u) {
        case c:
          switch (a = a.type, a) {
            case l:
            case m:
            case e:
            case g:
            case f:
            case p:
              return a;
            default:
              switch (a = a && a.$$typeof, a) {
                case k:
                case n:
                case t:
                case r:
                case h:
                  return a;
                default:
                  return u;
              }
          }
        case d:
          return u;
      }
    }
  }
  function A(a) {
    return z(a) === m;
  }
  reactIs_production_min.AsyncMode = l;
  reactIs_production_min.ConcurrentMode = m;
  reactIs_production_min.ContextConsumer = k;
  reactIs_production_min.ContextProvider = h;
  reactIs_production_min.Element = c;
  reactIs_production_min.ForwardRef = n;
  reactIs_production_min.Fragment = e;
  reactIs_production_min.Lazy = t;
  reactIs_production_min.Memo = r;
  reactIs_production_min.Portal = d;
  reactIs_production_min.Profiler = g;
  reactIs_production_min.StrictMode = f;
  reactIs_production_min.Suspense = p;
  reactIs_production_min.isAsyncMode = function(a) {
    return A(a) || z(a) === l;
  };
  reactIs_production_min.isConcurrentMode = A;
  reactIs_production_min.isContextConsumer = function(a) {
    return z(a) === k;
  };
  reactIs_production_min.isContextProvider = function(a) {
    return z(a) === h;
  };
  reactIs_production_min.isElement = function(a) {
    return "object" === typeof a && null !== a && a.$$typeof === c;
  };
  reactIs_production_min.isForwardRef = function(a) {
    return z(a) === n;
  };
  reactIs_production_min.isFragment = function(a) {
    return z(a) === e;
  };
  reactIs_production_min.isLazy = function(a) {
    return z(a) === t;
  };
  reactIs_production_min.isMemo = function(a) {
    return z(a) === r;
  };
  reactIs_production_min.isPortal = function(a) {
    return z(a) === d;
  };
  reactIs_production_min.isProfiler = function(a) {
    return z(a) === g;
  };
  reactIs_production_min.isStrictMode = function(a) {
    return z(a) === f;
  };
  reactIs_production_min.isSuspense = function(a) {
    return z(a) === p;
  };
  reactIs_production_min.isValidElementType = function(a) {
    return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
  };
  reactIs_production_min.typeOf = z;
  return reactIs_production_min;
}
var hasRequiredReactIs;
function requireReactIs() {
  if (hasRequiredReactIs) return reactIs.exports;
  hasRequiredReactIs = 1;
  {
    reactIs.exports = requireReactIs_production_min();
  }
  return reactIs.exports;
}
var hoistNonReactStatics_cjs;
var hasRequiredHoistNonReactStatics_cjs;
function requireHoistNonReactStatics_cjs() {
  if (hasRequiredHoistNonReactStatics_cjs) return hoistNonReactStatics_cjs;
  hasRequiredHoistNonReactStatics_cjs = 1;
  var reactIs2 = requireReactIs();
  var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
  };
  var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
  };
  var FORWARD_REF_STATICS = {
    "$$typeof": true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
  };
  var MEMO_STATICS = {
    "$$typeof": true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
  };
  var TYPE_STATICS = {};
  TYPE_STATICS[reactIs2.ForwardRef] = FORWARD_REF_STATICS;
  TYPE_STATICS[reactIs2.Memo] = MEMO_STATICS;
  function getStatics(component) {
    if (reactIs2.isMemo(component)) {
      return MEMO_STATICS;
    }
    return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
  }
  var defineProperty = Object.defineProperty;
  var getOwnPropertyNames = Object.getOwnPropertyNames;
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var getPrototypeOf = Object.getPrototypeOf;
  var objectPrototype = Object.prototype;
  function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== "string") {
      if (objectPrototype) {
        var inheritedComponent = getPrototypeOf(sourceComponent);
        if (inheritedComponent && inheritedComponent !== objectPrototype) {
          hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
        }
      }
      var keys = getOwnPropertyNames(sourceComponent);
      if (getOwnPropertySymbols) {
        keys = keys.concat(getOwnPropertySymbols(sourceComponent));
      }
      var targetStatics = getStatics(targetComponent);
      var sourceStatics = getStatics(sourceComponent);
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
          var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
          try {
            defineProperty(targetComponent, key, descriptor);
          } catch (e) {
          }
        }
      }
    }
    return targetComponent;
  }
  hoistNonReactStatics_cjs = hoistNonReactStatics;
  return hoistNonReactStatics_cjs;
}
requireHoistNonReactStatics_cjs();
var MAX_SIGNED_31_BIT_INT = 1073741823;
var commonjsGlobal = typeof globalThis !== "undefined" ? (
  // eslint-disable-next-line no-undef
  globalThis
) : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
function getUniqueId() {
  var key = "__global_unique_id__";
  return commonjsGlobal[key] = (commonjsGlobal[key] || 0) + 1;
}
function objectIs(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
function createEventEmitter(value) {
  var handlers = [];
  return {
    on: function on(handler) {
      handlers.push(handler);
    },
    off: function off(handler) {
      handlers = handlers.filter(function(h) {
        return h !== handler;
      });
    },
    get: function get() {
      return value;
    },
    set: function set(newValue, changedBits) {
      value = newValue;
      handlers.forEach(function(handler) {
        return handler(value, changedBits);
      });
    }
  };
}
function onlyChild(children) {
  return Array.isArray(children) ? children[0] : children;
}
function createReactContext(defaultValue, calculateChangedBits) {
  var _Provider$childContex, _Consumer$contextType;
  var contextProp = "__create-react-context-" + getUniqueId() + "__";
  var Provider = /* @__PURE__ */ function(_React$Component) {
    _inheritsLoose(Provider2, _React$Component);
    function Provider2() {
      var _this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
      _this.emitter = createEventEmitter(_this.props.value);
      return _this;
    }
    var _proto = Provider2.prototype;
    _proto.getChildContext = function getChildContext() {
      var _ref;
      return _ref = {}, _ref[contextProp] = this.emitter, _ref;
    };
    _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        var oldValue = this.props.value;
        var newValue = nextProps.value;
        var changedBits;
        if (objectIs(oldValue, newValue)) {
          changedBits = 0;
        } else {
          changedBits = typeof calculateChangedBits === "function" ? calculateChangedBits(oldValue, newValue) : MAX_SIGNED_31_BIT_INT;
          changedBits |= 0;
          if (changedBits !== 0) {
            this.emitter.set(nextProps.value, changedBits);
          }
        }
      }
    };
    _proto.render = function render() {
      return this.props.children;
    };
    return Provider2;
  }(React.Component);
  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[contextProp] = PropTypes.object.isRequired, _Provider$childContex);
  var Consumer = /* @__PURE__ */ function(_React$Component2) {
    _inheritsLoose(Consumer2, _React$Component2);
    function Consumer2() {
      var _this2;
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      _this2 = _React$Component2.call.apply(_React$Component2, [this].concat(args)) || this;
      _this2.observedBits = void 0;
      _this2.state = {
        value: _this2.getValue()
      };
      _this2.onUpdate = function(newValue, changedBits) {
        var observedBits = _this2.observedBits | 0;
        if ((observedBits & changedBits) !== 0) {
          _this2.setState({
            value: _this2.getValue()
          });
        }
      };
      return _this2;
    }
    var _proto2 = Consumer2.prototype;
    _proto2.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var observedBits = nextProps.observedBits;
      this.observedBits = observedBits === void 0 || observedBits === null ? MAX_SIGNED_31_BIT_INT : observedBits;
    };
    _proto2.componentDidMount = function componentDidMount() {
      if (this.context[contextProp]) {
        this.context[contextProp].on(this.onUpdate);
      }
      var observedBits = this.props.observedBits;
      this.observedBits = observedBits === void 0 || observedBits === null ? MAX_SIGNED_31_BIT_INT : observedBits;
    };
    _proto2.componentWillUnmount = function componentWillUnmount() {
      if (this.context[contextProp]) {
        this.context[contextProp].off(this.onUpdate);
      }
    };
    _proto2.getValue = function getValue() {
      if (this.context[contextProp]) {
        return this.context[contextProp].get();
      } else {
        return defaultValue;
      }
    };
    _proto2.render = function render() {
      return onlyChild(this.props.children)(this.state.value);
    };
    return Consumer2;
  }(React.Component);
  Consumer.contextTypes = (_Consumer$contextType = {}, _Consumer$contextType[contextProp] = PropTypes.object, _Consumer$contextType);
  return {
    Provider,
    Consumer
  };
}
var createContext = React.createContext || createReactContext;
var createNamedContext = function createNamedContext2(name) {
  var context2 = createContext();
  context2.displayName = name;
  return context2;
};
var historyContext = /* @__PURE__ */ createNamedContext("Router-History");
var context = /* @__PURE__ */ createNamedContext("Router");
var Router = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(Router2, _React$Component);
  Router2.computeRootMatch = function computeRootMatch(pathname) {
    return {
      path: "/",
      url: "/",
      params: {},
      isExact: pathname === "/"
    };
  };
  function Router2(props) {
    var _this;
    _this = _React$Component.call(this, props) || this;
    _this.state = {
      location: props.history.location
    };
    _this._isMounted = false;
    _this._pendingLocation = null;
    if (!props.staticContext) {
      _this.unlisten = props.history.listen(function(location) {
        _this._pendingLocation = location;
      });
    }
    return _this;
  }
  var _proto = Router2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;
    this._isMounted = true;
    if (this.unlisten) {
      this.unlisten();
    }
    if (!this.props.staticContext) {
      this.unlisten = this.props.history.listen(function(location) {
        if (_this2._isMounted) {
          _this2.setState({
            location
          });
        }
      });
    }
    if (this._pendingLocation) {
      this.setState({
        location: this._pendingLocation
      });
    }
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
      this._isMounted = false;
      this._pendingLocation = null;
    }
  };
  _proto.render = function render() {
    return /* @__PURE__ */ React.createElement(context.Provider, {
      value: {
        history: this.props.history,
        location: this.state.location,
        match: Router2.computeRootMatch(this.state.location.pathname),
        staticContext: this.props.staticContext
      }
    }, /* @__PURE__ */ React.createElement(historyContext.Provider, {
      children: this.props.children || null,
      value: this.props.history
    }));
  };
  return Router2;
}(React.Component);
/* @__PURE__ */ (function(_React$Component) {
  _inheritsLoose(MemoryRouter2, _React$Component);
  function MemoryRouter2() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.history = createMemoryHistory(_this.props);
    return _this;
  }
  var _proto = MemoryRouter2.prototype;
  _proto.render = function render() {
    return /* @__PURE__ */ React.createElement(Router, {
      history: this.history,
      children: this.props.children
    });
  };
  return MemoryRouter2;
})(React.Component);
var Lifecycle = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(Lifecycle2, _React$Component);
  function Lifecycle2() {
    return _React$Component.apply(this, arguments) || this;
  }
  var _proto = Lifecycle2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    if (this.props.onMount) this.props.onMount.call(this, this);
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.onUpdate) this.props.onUpdate.call(this, this, prevProps);
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.props.onUnmount) this.props.onUnmount.call(this, this);
  };
  _proto.render = function render() {
    return null;
  };
  return Lifecycle2;
}(React.Component);
var cache = {};
var cacheLimit = 1e4;
var cacheCount = 0;
function compilePath(path) {
  if (cache[path]) return cache[path];
  var generator = pathToRegexp.compile(path);
  if (cacheCount < cacheLimit) {
    cache[path] = generator;
    cacheCount++;
  }
  return generator;
}
function generatePath(path, params) {
  if (path === void 0) {
    path = "/";
  }
  if (params === void 0) {
    params = {};
  }
  return path === "/" ? path : compilePath(path)(params, {
    pretty: true
  });
}
function Redirect(_ref) {
  var computedMatch = _ref.computedMatch, to = _ref.to, _ref$push = _ref.push, push = _ref$push === void 0 ? false : _ref$push;
  return /* @__PURE__ */ React.createElement(context.Consumer, null, function(context2) {
    !context2 ? invariant() : void 0;
    var history = context2.history, staticContext = context2.staticContext;
    var method = push ? history.push : history.replace;
    var location = createLocation(computedMatch ? typeof to === "string" ? generatePath(to, computedMatch.params) : _extends({}, to, {
      pathname: generatePath(to.pathname, computedMatch.params)
    }) : to);
    if (staticContext) {
      method(location);
      return null;
    }
    return /* @__PURE__ */ React.createElement(Lifecycle, {
      onMount: function onMount() {
        method(location);
      },
      onUpdate: function onUpdate(self, prevProps) {
        var prevLocation = createLocation(prevProps.to);
        if (!locationsAreEqual(prevLocation, _extends({}, location, {
          key: prevLocation.key
        }))) {
          method(location);
        }
      },
      to
    });
  });
}
var cache$1 = {};
var cacheLimit$1 = 1e4;
var cacheCount$1 = 0;
function compilePath$1(path, options) {
  var cacheKey = "" + options.end + options.strict + options.sensitive;
  var pathCache = cache$1[cacheKey] || (cache$1[cacheKey] = {});
  if (pathCache[path]) return pathCache[path];
  var keys = [];
  var regexp = pathToRegexp(path, keys, options);
  var result = {
    regexp,
    keys
  };
  if (cacheCount$1 < cacheLimit$1) {
    pathCache[path] = result;
    cacheCount$1++;
  }
  return result;
}
function matchPath(pathname, options) {
  if (options === void 0) {
    options = {};
  }
  if (typeof options === "string" || Array.isArray(options)) {
    options = {
      path: options
    };
  }
  var _options = options, path = _options.path, _options$exact = _options.exact, exact = _options$exact === void 0 ? false : _options$exact, _options$strict = _options.strict, strict = _options$strict === void 0 ? false : _options$strict, _options$sensitive = _options.sensitive, sensitive = _options$sensitive === void 0 ? false : _options$sensitive;
  var paths = [].concat(path);
  return paths.reduce(function(matched, path2) {
    if (!path2 && path2 !== "") return null;
    if (matched) return matched;
    var _compilePath = compilePath$1(path2, {
      end: exact,
      strict,
      sensitive
    }), regexp = _compilePath.regexp, keys = _compilePath.keys;
    var match = regexp.exec(pathname);
    if (!match) return null;
    var url = match[0], values = match.slice(1);
    var isExact = pathname === url;
    if (exact && !isExact) return null;
    return {
      path: path2,
      // the path used to match
      url: path2 === "/" && url === "" ? "/" : url,
      // the matched portion of the URL
      isExact,
      // whether or not we matched exactly
      params: keys.reduce(function(memo, key, index) {
        memo[key.name] = values[index];
        return memo;
      }, {})
    };
  }, null);
}
function isEmptyChildren(children) {
  return React.Children.count(children) === 0;
}
var Route = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(Route2, _React$Component);
  function Route2() {
    return _React$Component.apply(this, arguments) || this;
  }
  var _proto = Route2.prototype;
  _proto.render = function render() {
    var _this = this;
    return /* @__PURE__ */ React.createElement(context.Consumer, null, function(context$1) {
      !context$1 ? invariant() : void 0;
      var location = _this.props.location || context$1.location;
      var match = _this.props.computedMatch ? _this.props.computedMatch : _this.props.path ? matchPath(location.pathname, _this.props) : context$1.match;
      var props = _extends({}, context$1, {
        location,
        match
      });
      var _this$props = _this.props, children = _this$props.children, component = _this$props.component, render2 = _this$props.render;
      if (Array.isArray(children) && isEmptyChildren(children)) {
        children = null;
      }
      return /* @__PURE__ */ React.createElement(context.Provider, {
        value: props
      }, props.match ? children ? typeof children === "function" ? children(props) : children : component ? /* @__PURE__ */ React.createElement(component, props) : render2 ? render2(props) : null : typeof children === "function" ? children(props) : null);
    });
  };
  return Route2;
}(React.Component);
function addLeadingSlash(path) {
  return path.charAt(0) === "/" ? path : "/" + path;
}
function addBasename(basename, location) {
  if (!basename) return location;
  return _extends({}, location, {
    pathname: addLeadingSlash(basename) + location.pathname
  });
}
function stripBasename(basename, location) {
  if (!basename) return location;
  var base = addLeadingSlash(basename);
  if (location.pathname.indexOf(base) !== 0) return location;
  return _extends({}, location, {
    pathname: location.pathname.substr(base.length)
  });
}
function createURL(location) {
  return typeof location === "string" ? location : createPath(location);
}
function staticHandler(methodName) {
  return function() {
    invariant();
  };
}
function noop() {
}
/* @__PURE__ */ (function(_React$Component) {
  _inheritsLoose(StaticRouter2, _React$Component);
  function StaticRouter2() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.handlePush = function(location) {
      return _this.navigateTo(location, "PUSH");
    };
    _this.handleReplace = function(location) {
      return _this.navigateTo(location, "REPLACE");
    };
    _this.handleListen = function() {
      return noop;
    };
    _this.handleBlock = function() {
      return noop;
    };
    return _this;
  }
  var _proto = StaticRouter2.prototype;
  _proto.navigateTo = function navigateTo(location, action) {
    var _this$props = this.props, _this$props$basename = _this$props.basename, basename = _this$props$basename === void 0 ? "" : _this$props$basename, _this$props$context = _this$props.context, context2 = _this$props$context === void 0 ? {} : _this$props$context;
    context2.action = action;
    context2.location = addBasename(basename, createLocation(location));
    context2.url = createURL(context2.location);
  };
  _proto.render = function render() {
    var _this$props2 = this.props, _this$props2$basename = _this$props2.basename, basename = _this$props2$basename === void 0 ? "" : _this$props2$basename, _this$props2$context = _this$props2.context, context2 = _this$props2$context === void 0 ? {} : _this$props2$context, _this$props2$location = _this$props2.location, location = _this$props2$location === void 0 ? "/" : _this$props2$location, rest = _objectWithoutPropertiesLoose(_this$props2, ["basename", "context", "location"]);
    var history = {
      createHref: function createHref(path) {
        return addLeadingSlash(basename + createURL(path));
      },
      action: "POP",
      location: stripBasename(basename, createLocation(location)),
      push: this.handlePush,
      replace: this.handleReplace,
      go: staticHandler(),
      goBack: staticHandler(),
      goForward: staticHandler(),
      listen: this.handleListen,
      block: this.handleBlock
    };
    return /* @__PURE__ */ React.createElement(Router, _extends({}, rest, {
      history,
      staticContext: context2
    }));
  };
  return StaticRouter2;
})(React.Component);
var Switch = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(Switch2, _React$Component);
  function Switch2() {
    return _React$Component.apply(this, arguments) || this;
  }
  var _proto = Switch2.prototype;
  _proto.render = function render() {
    var _this = this;
    return /* @__PURE__ */ React.createElement(context.Consumer, null, function(context2) {
      !context2 ? invariant() : void 0;
      var location = _this.props.location || context2.location;
      var element, match;
      React.Children.forEach(_this.props.children, function(child) {
        if (match == null && /* @__PURE__ */ React.isValidElement(child)) {
          element = child;
          var path = child.props.path || child.props.from;
          match = path ? matchPath(location.pathname, _extends({}, child.props, {
            path
          })) : context2.match;
        }
      });
      return match ? /* @__PURE__ */ React.cloneElement(element, {
        location,
        computedMatch: match
      }) : null;
    });
  };
  return Switch2;
}(React.Component);
var useContext = React.useContext;
function useHistory() {
  return useContext(historyContext);
}
function useLocation() {
  return useContext(context).location;
}
var BrowserRouter = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(BrowserRouter2, _React$Component);
  function BrowserRouter2() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.history = createBrowserHistory(_this.props);
    return _this;
  }
  var _proto = BrowserRouter2.prototype;
  _proto.render = function render() {
    return /* @__PURE__ */ React.createElement(Router, {
      history: this.history,
      children: this.props.children
    });
  };
  return BrowserRouter2;
}(React.Component);
/* @__PURE__ */ (function(_React$Component) {
  _inheritsLoose(HashRouter2, _React$Component);
  function HashRouter2() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.history = createHashHistory(_this.props);
    return _this;
  }
  var _proto = HashRouter2.prototype;
  _proto.render = function render() {
    return /* @__PURE__ */ React.createElement(Router, {
      history: this.history,
      children: this.props.children
    });
  };
  return HashRouter2;
})(React.Component);
var resolveToLocation = function resolveToLocation2(to, currentLocation) {
  return typeof to === "function" ? to(currentLocation) : to;
};
var normalizeToLocation = function normalizeToLocation2(to, currentLocation) {
  return typeof to === "string" ? createLocation(to, null, null, currentLocation) : to;
};
var forwardRefShim = function forwardRefShim2(C) {
  return C;
};
var forwardRef = React.forwardRef;
if (typeof forwardRef === "undefined") {
  forwardRef = forwardRefShim;
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
var LinkAnchor = forwardRef(function(_ref, forwardedRef) {
  var innerRef = _ref.innerRef, navigate = _ref.navigate, _onClick = _ref.onClick, rest = _objectWithoutPropertiesLoose(_ref, ["innerRef", "navigate", "onClick"]);
  var target = rest.target;
  var props = _extends({}, rest, {
    onClick: function onClick(event) {
      try {
        if (_onClick) _onClick(event);
      } catch (ex) {
        event.preventDefault();
        throw ex;
      }
      if (!event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      (!target || target === "_self") && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event)) {
        event.preventDefault();
        navigate();
      }
    }
  });
  if (forwardRefShim !== forwardRef) {
    props.ref = forwardedRef || innerRef;
  } else {
    props.ref = innerRef;
  }
  return /* @__PURE__ */ React.createElement("a", props);
});
var Link = forwardRef(function(_ref2, forwardedRef) {
  var _ref2$component = _ref2.component, component = _ref2$component === void 0 ? LinkAnchor : _ref2$component, replace = _ref2.replace, to = _ref2.to, innerRef = _ref2.innerRef, rest = _objectWithoutPropertiesLoose(_ref2, ["component", "replace", "to", "innerRef"]);
  return /* @__PURE__ */ React.createElement(context.Consumer, null, function(context2) {
    !context2 ? invariant() : void 0;
    var history = context2.history;
    var location = normalizeToLocation(resolveToLocation(to, context2.location), context2.location);
    var href = location ? history.createHref(location) : "";
    var props = _extends({}, rest, {
      href,
      navigate: function navigate() {
        var location2 = resolveToLocation(to, context2.location);
        var isDuplicateNavigation = createPath(context2.location) === createPath(normalizeToLocation(location2));
        var method = replace || isDuplicateNavigation ? history.replace : history.push;
        method(location2);
      }
    });
    if (forwardRefShim !== forwardRef) {
      props.ref = forwardedRef || innerRef;
    } else {
      props.innerRef = innerRef;
    }
    return /* @__PURE__ */ React.createElement(component, props);
  });
});
var forwardRefShim$1 = function forwardRefShim3(C) {
  return C;
};
var forwardRef$1 = React.forwardRef;
if (typeof forwardRef$1 === "undefined") {
  forwardRef$1 = forwardRefShim$1;
}
function joinClassnames() {
  for (var _len = arguments.length, classnames = new Array(_len), _key = 0; _key < _len; _key++) {
    classnames[_key] = arguments[_key];
  }
  return classnames.filter(function(i) {
    return i;
  }).join(" ");
}
var NavLink = forwardRef$1(function(_ref, forwardedRef) {
  var _ref$ariaCurrent = _ref["aria-current"], ariaCurrent = _ref$ariaCurrent === void 0 ? "page" : _ref$ariaCurrent, _ref$activeClassName = _ref.activeClassName, activeClassName = _ref$activeClassName === void 0 ? "active" : _ref$activeClassName, activeStyle = _ref.activeStyle, classNameProp = _ref.className, exact = _ref.exact, isActiveProp = _ref.isActive, locationProp = _ref.location, sensitive = _ref.sensitive, strict = _ref.strict, styleProp = _ref.style, to = _ref.to, innerRef = _ref.innerRef, rest = _objectWithoutPropertiesLoose(_ref, ["aria-current", "activeClassName", "activeStyle", "className", "exact", "isActive", "location", "sensitive", "strict", "style", "to", "innerRef"]);
  return /* @__PURE__ */ React.createElement(context.Consumer, null, function(context2) {
    !context2 ? invariant() : void 0;
    var currentLocation = locationProp || context2.location;
    var toLocation = normalizeToLocation(resolveToLocation(to, currentLocation), currentLocation);
    var path = toLocation.pathname;
    var escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
    var match = escapedPath ? matchPath(currentLocation.pathname, {
      path: escapedPath,
      exact,
      sensitive,
      strict
    }) : null;
    var isActive = !!(isActiveProp ? isActiveProp(match, currentLocation) : match);
    var className = typeof classNameProp === "function" ? classNameProp(isActive) : classNameProp;
    var style = typeof styleProp === "function" ? styleProp(isActive) : styleProp;
    if (isActive) {
      className = joinClassnames(className, activeClassName);
      style = _extends({}, style, activeStyle);
    }
    var props = _extends({
      "aria-current": isActive && ariaCurrent || null,
      className,
      style,
      to: toLocation
    }, rest);
    if (forwardRefShim$1 !== forwardRef$1) {
      props.ref = forwardedRef || innerRef;
    } else {
      props.innerRef = innerRef;
    }
    return /* @__PURE__ */ React.createElement(Link, props);
  });
});
var axios$2 = { exports: {} };
var bind;
var hasRequiredBind;
function requireBind() {
  if (hasRequiredBind) return bind;
  hasRequiredBind = 1;
  bind = function bind2(fn, thisArg) {
    return function wrap() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      return fn.apply(thisArg, args);
    };
  };
  return bind;
}
var utils;
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  var bind2 = requireBind();
  var toString = Object.prototype.toString;
  function isArray(val) {
    return toString.call(val) === "[object Array]";
  }
  function isUndefined(val) {
    return typeof val === "undefined";
  }
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
  }
  function isArrayBuffer(val) {
    return toString.call(val) === "[object ArrayBuffer]";
  }
  function isFormData(val) {
    return typeof FormData !== "undefined" && val instanceof FormData;
  }
  function isArrayBufferView(val) {
    var result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && val.buffer instanceof ArrayBuffer;
    }
    return result;
  }
  function isString(val) {
    return typeof val === "string";
  }
  function isNumber(val) {
    return typeof val === "number";
  }
  function isObject(val) {
    return val !== null && typeof val === "object";
  }
  function isPlainObject(val) {
    if (toString.call(val) !== "[object Object]") {
      return false;
    }
    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
  }
  function isDate(val) {
    return toString.call(val) === "[object Date]";
  }
  function isFile(val) {
    return toString.call(val) === "[object File]";
  }
  function isBlob(val) {
    return toString.call(val) === "[object Blob]";
  }
  function isFunction(val) {
    return toString.call(val) === "[object Function]";
  }
  function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
  }
  function isURLSearchParams(val) {
    return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
  }
  function trim(str) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
  }
  function isStandardBrowserEnv() {
    if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
      return false;
    }
    return typeof window !== "undefined" && typeof document !== "undefined";
  }
  function forEach(obj, fn) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray(obj)) {
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }
  function merge() {
    var result = {};
    function assignValue(val, key) {
      if (isPlainObject(result[key]) && isPlainObject(val)) {
        result[key] = merge(result[key], val);
      } else if (isPlainObject(val)) {
        result[key] = merge({}, val);
      } else if (isArray(val)) {
        result[key] = val.slice();
      } else {
        result[key] = val;
      }
    }
    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }
    return result;
  }
  function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
      if (thisArg && typeof val === "function") {
        a[key] = bind2(val, thisArg);
      } else {
        a[key] = val;
      }
    });
    return a;
  }
  function stripBOM(content) {
    if (content.charCodeAt(0) === 65279) {
      content = content.slice(1);
    }
    return content;
  }
  utils = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isObject,
    isPlainObject,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isFunction,
    isStream,
    isURLSearchParams,
    isStandardBrowserEnv,
    forEach,
    merge,
    extend,
    trim,
    stripBOM
  };
  return utils;
}
var buildURL;
var hasRequiredBuildURL;
function requireBuildURL() {
  if (hasRequiredBuildURL) return buildURL;
  hasRequiredBuildURL = 1;
  var utils2 = requireUtils();
  function encode(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  buildURL = function buildURL2(url, params, paramsSerializer) {
    if (!params) {
      return url;
    }
    var serializedParams;
    if (paramsSerializer) {
      serializedParams = paramsSerializer(params);
    } else if (utils2.isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      var parts = [];
      utils2.forEach(params, function serialize(val, key) {
        if (val === null || typeof val === "undefined") {
          return;
        }
        if (utils2.isArray(val)) {
          key = key + "[]";
        } else {
          val = [val];
        }
        utils2.forEach(val, function parseValue(v) {
          if (utils2.isDate(v)) {
            v = v.toISOString();
          } else if (utils2.isObject(v)) {
            v = JSON.stringify(v);
          }
          parts.push(encode(key) + "=" + encode(v));
        });
      });
      serializedParams = parts.join("&");
    }
    if (serializedParams) {
      var hashmarkIndex = url.indexOf("#");
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url;
  };
  return buildURL;
}
var InterceptorManager_1;
var hasRequiredInterceptorManager;
function requireInterceptorManager() {
  if (hasRequiredInterceptorManager) return InterceptorManager_1;
  hasRequiredInterceptorManager = 1;
  var utils2 = requireUtils();
  function InterceptorManager() {
    this.handlers = [];
  }
  InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  };
  InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  };
  InterceptorManager.prototype.forEach = function forEach(fn) {
    utils2.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  };
  InterceptorManager_1 = InterceptorManager;
  return InterceptorManager_1;
}
var normalizeHeaderName;
var hasRequiredNormalizeHeaderName;
function requireNormalizeHeaderName() {
  if (hasRequiredNormalizeHeaderName) return normalizeHeaderName;
  hasRequiredNormalizeHeaderName = 1;
  var utils2 = requireUtils();
  normalizeHeaderName = function normalizeHeaderName2(headers, normalizedName) {
    utils2.forEach(headers, function processHeader(value, name) {
      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
        headers[normalizedName] = value;
        delete headers[name];
      }
    });
  };
  return normalizeHeaderName;
}
var enhanceError;
var hasRequiredEnhanceError;
function requireEnhanceError() {
  if (hasRequiredEnhanceError) return enhanceError;
  hasRequiredEnhanceError = 1;
  enhanceError = function enhanceError2(error, config, code, request, response) {
    error.config = config;
    if (code) {
      error.code = code;
    }
    error.request = request;
    error.response = response;
    error.isAxiosError = true;
    error.toJSON = function toJSON() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: this.config,
        code: this.code
      };
    };
    return error;
  };
  return enhanceError;
}
var createError;
var hasRequiredCreateError;
function requireCreateError() {
  if (hasRequiredCreateError) return createError;
  hasRequiredCreateError = 1;
  var enhanceError2 = requireEnhanceError();
  createError = function createError2(message, config, code, request, response) {
    var error = new Error(message);
    return enhanceError2(error, config, code, request, response);
  };
  return createError;
}
var settle;
var hasRequiredSettle;
function requireSettle() {
  if (hasRequiredSettle) return settle;
  hasRequiredSettle = 1;
  var createError2 = requireCreateError();
  settle = function settle2(resolve, reject, response) {
    var validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(createError2(
        "Request failed with status code " + response.status,
        response.config,
        null,
        response.request,
        response
      ));
    }
  };
  return settle;
}
var cookies;
var hasRequiredCookies;
function requireCookies() {
  if (hasRequiredCookies) return cookies;
  hasRequiredCookies = 1;
  var utils2 = requireUtils();
  cookies = utils2.isStandardBrowserEnv() ? (
    // Standard browser envs support document.cookie
    /* @__PURE__ */ function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value));
          if (utils2.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils2.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils2.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }()
  ) : (
    // Non standard browser env (web workers, react-native) lack needed support.
    /* @__PURE__ */ function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }()
  );
  return cookies;
}
var isAbsoluteURL;
var hasRequiredIsAbsoluteURL;
function requireIsAbsoluteURL() {
  if (hasRequiredIsAbsoluteURL) return isAbsoluteURL;
  hasRequiredIsAbsoluteURL = 1;
  isAbsoluteURL = function isAbsoluteURL2(url) {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
  };
  return isAbsoluteURL;
}
var combineURLs;
var hasRequiredCombineURLs;
function requireCombineURLs() {
  if (hasRequiredCombineURLs) return combineURLs;
  hasRequiredCombineURLs = 1;
  combineURLs = function combineURLs2(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
  };
  return combineURLs;
}
var buildFullPath;
var hasRequiredBuildFullPath;
function requireBuildFullPath() {
  if (hasRequiredBuildFullPath) return buildFullPath;
  hasRequiredBuildFullPath = 1;
  var isAbsoluteURL2 = requireIsAbsoluteURL();
  var combineURLs2 = requireCombineURLs();
  buildFullPath = function buildFullPath2(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL2(requestedURL)) {
      return combineURLs2(baseURL, requestedURL);
    }
    return requestedURL;
  };
  return buildFullPath;
}
var parseHeaders;
var hasRequiredParseHeaders;
function requireParseHeaders() {
  if (hasRequiredParseHeaders) return parseHeaders;
  hasRequiredParseHeaders = 1;
  var utils2 = requireUtils();
  var ignoreDuplicateOf = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ];
  parseHeaders = function parseHeaders2(headers) {
    var parsed = {};
    var key;
    var val;
    var i;
    if (!headers) {
      return parsed;
    }
    utils2.forEach(headers.split("\n"), function parser(line) {
      i = line.indexOf(":");
      key = utils2.trim(line.substr(0, i)).toLowerCase();
      val = utils2.trim(line.substr(i + 1));
      if (key) {
        if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
          return;
        }
        if (key === "set-cookie") {
          parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
        }
      }
    });
    return parsed;
  };
  return parseHeaders;
}
var isURLSameOrigin;
var hasRequiredIsURLSameOrigin;
function requireIsURLSameOrigin() {
  if (hasRequiredIsURLSameOrigin) return isURLSameOrigin;
  hasRequiredIsURLSameOrigin = 1;
  var utils2 = requireUtils();
  isURLSameOrigin = utils2.isStandardBrowserEnv() ? (
    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;
      function resolveURL(url) {
        var href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin2(requestURL) {
        var parsed = utils2.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }()
  ) : (
    // Non standard browser envs (web workers, react-native) lack needed support.
    /* @__PURE__ */ function nonStandardBrowserEnv() {
      return function isURLSameOrigin2() {
        return true;
      };
    }()
  );
  return isURLSameOrigin;
}
var xhr;
var hasRequiredXhr;
function requireXhr() {
  if (hasRequiredXhr) return xhr;
  hasRequiredXhr = 1;
  var utils2 = requireUtils();
  var settle2 = requireSettle();
  var cookies2 = requireCookies();
  var buildURL2 = requireBuildURL();
  var buildFullPath2 = requireBuildFullPath();
  var parseHeaders2 = requireParseHeaders();
  var isURLSameOrigin2 = requireIsURLSameOrigin();
  var createError2 = requireCreateError();
  xhr = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      var requestData = config.data;
      var requestHeaders = config.headers;
      var responseType = config.responseType;
      if (utils2.isFormData(requestData)) {
        delete requestHeaders["Content-Type"];
      }
      var request = new XMLHttpRequest();
      if (config.auth) {
        var username = config.auth.username || "";
        var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
        requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
      }
      var fullPath = buildFullPath2(config.baseURL, config.url);
      request.open(config.method.toUpperCase(), buildURL2(fullPath, config.params, config.paramsSerializer), true);
      request.timeout = config.timeout;
      function onloadend() {
        if (!request) {
          return;
        }
        var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders2(request.getAllResponseHeaders()) : null;
        var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
        var response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        };
        settle2(resolve, reject, response);
        request = null;
      }
      if ("onloadend" in request) {
        request.onloadend = onloadend;
      } else {
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
            return;
          }
          setTimeout(onloadend);
        };
      }
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }
        reject(createError2("Request aborted", config, "ECONNABORTED", request));
        request = null;
      };
      request.onerror = function handleError() {
        reject(createError2("Network Error", config, null, request));
        request = null;
      };
      request.ontimeout = function handleTimeout() {
        var timeoutErrorMessage = "timeout of " + config.timeout + "ms exceeded";
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        reject(createError2(
          timeoutErrorMessage,
          config,
          config.transitional && config.transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED",
          request
        ));
        request = null;
      };
      if (utils2.isStandardBrowserEnv()) {
        var xsrfValue = (config.withCredentials || isURLSameOrigin2(fullPath)) && config.xsrfCookieName ? cookies2.read(config.xsrfCookieName) : void 0;
        if (xsrfValue) {
          requestHeaders[config.xsrfHeaderName] = xsrfValue;
        }
      }
      if ("setRequestHeader" in request) {
        utils2.forEach(requestHeaders, function setRequestHeader(val, key) {
          if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
            delete requestHeaders[key];
          } else {
            request.setRequestHeader(key, val);
          }
        });
      }
      if (!utils2.isUndefined(config.withCredentials)) {
        request.withCredentials = !!config.withCredentials;
      }
      if (responseType && responseType !== "json") {
        request.responseType = config.responseType;
      }
      if (typeof config.onDownloadProgress === "function") {
        request.addEventListener("progress", config.onDownloadProgress);
      }
      if (typeof config.onUploadProgress === "function" && request.upload) {
        request.upload.addEventListener("progress", config.onUploadProgress);
      }
      if (config.cancelToken) {
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (!request) {
            return;
          }
          request.abort();
          reject(cancel);
          request = null;
        });
      }
      if (!requestData) {
        requestData = null;
      }
      request.send(requestData);
    });
  };
  return xhr;
}
var defaults_1;
var hasRequiredDefaults;
function requireDefaults() {
  if (hasRequiredDefaults) return defaults_1;
  hasRequiredDefaults = 1;
  var utils2 = requireUtils();
  var normalizeHeaderName2 = requireNormalizeHeaderName();
  var enhanceError2 = requireEnhanceError();
  var DEFAULT_CONTENT_TYPE = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  function setContentTypeIfUnset(headers, value) {
    if (!utils2.isUndefined(headers) && utils2.isUndefined(headers["Content-Type"])) {
      headers["Content-Type"] = value;
    }
  }
  function getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== "undefined") {
      adapter = requireXhr();
    } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
      adapter = requireXhr();
    }
    return adapter;
  }
  function stringifySafely(rawValue, parser, encoder) {
    if (utils2.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils2.trim(rawValue);
      } catch (e) {
        if (e.name !== "SyntaxError") {
          throw e;
        }
      }
    }
    return (encoder || JSON.stringify)(rawValue);
  }
  var defaults = {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    },
    adapter: getDefaultAdapter(),
    transformRequest: [function transformRequest(data, headers) {
      normalizeHeaderName2(headers, "Accept");
      normalizeHeaderName2(headers, "Content-Type");
      if (utils2.isFormData(data) || utils2.isArrayBuffer(data) || utils2.isBuffer(data) || utils2.isStream(data) || utils2.isFile(data) || utils2.isBlob(data)) {
        return data;
      }
      if (utils2.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils2.isURLSearchParams(data)) {
        setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
        return data.toString();
      }
      if (utils2.isObject(data) || headers && headers["Content-Type"] === "application/json") {
        setContentTypeIfUnset(headers, "application/json");
        return stringifySafely(data);
      }
      return data;
    }],
    transformResponse: [function transformResponse(data) {
      var transitional = this.transitional;
      var silentJSONParsing = transitional && transitional.silentJSONParsing;
      var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
      var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
      if (strictJSONParsing || forcedJSONParsing && utils2.isString(data) && data.length) {
        try {
          return JSON.parse(data);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === "SyntaxError") {
              throw enhanceError2(e, this, "E_JSON_PARSE");
            }
            throw e;
          }
        }
      }
      return data;
    }],
    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    }
  };
  defaults.headers = {
    common: {
      "Accept": "application/json, text/plain, */*"
    }
  };
  utils2.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
    defaults.headers[method] = {};
  });
  utils2.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
    defaults.headers[method] = utils2.merge(DEFAULT_CONTENT_TYPE);
  });
  defaults_1 = defaults;
  return defaults_1;
}
var transformData;
var hasRequiredTransformData;
function requireTransformData() {
  if (hasRequiredTransformData) return transformData;
  hasRequiredTransformData = 1;
  var utils2 = requireUtils();
  var defaults = requireDefaults();
  transformData = function transformData2(data, headers, fns) {
    var context2 = this || defaults;
    utils2.forEach(fns, function transform(fn) {
      data = fn.call(context2, data, headers);
    });
    return data;
  };
  return transformData;
}
var isCancel;
var hasRequiredIsCancel;
function requireIsCancel() {
  if (hasRequiredIsCancel) return isCancel;
  hasRequiredIsCancel = 1;
  isCancel = function isCancel2(value) {
    return !!(value && value.__CANCEL__);
  };
  return isCancel;
}
var dispatchRequest;
var hasRequiredDispatchRequest;
function requireDispatchRequest() {
  if (hasRequiredDispatchRequest) return dispatchRequest;
  hasRequiredDispatchRequest = 1;
  var utils2 = requireUtils();
  var transformData2 = requireTransformData();
  var isCancel2 = requireIsCancel();
  var defaults = requireDefaults();
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
  }
  dispatchRequest = function dispatchRequest2(config) {
    throwIfCancellationRequested(config);
    config.headers = config.headers || {};
    config.data = transformData2.call(
      config,
      config.data,
      config.headers,
      config.transformRequest
    );
    config.headers = utils2.merge(
      config.headers.common || {},
      config.headers[config.method] || {},
      config.headers
    );
    utils2.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      function cleanHeaderConfig(method) {
        delete config.headers[method];
      }
    );
    var adapter = config.adapter || defaults.adapter;
    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);
      response.data = transformData2.call(
        config,
        response.data,
        response.headers,
        config.transformResponse
      );
      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel2(reason)) {
        throwIfCancellationRequested(config);
        if (reason && reason.response) {
          reason.response.data = transformData2.call(
            config,
            reason.response.data,
            reason.response.headers,
            config.transformResponse
          );
        }
      }
      return Promise.reject(reason);
    });
  };
  return dispatchRequest;
}
var mergeConfig;
var hasRequiredMergeConfig;
function requireMergeConfig() {
  if (hasRequiredMergeConfig) return mergeConfig;
  hasRequiredMergeConfig = 1;
  var utils2 = requireUtils();
  mergeConfig = function mergeConfig2(config1, config2) {
    config2 = config2 || {};
    var config = {};
    var valueFromConfig2Keys = ["url", "method", "data"];
    var mergeDeepPropertiesKeys = ["headers", "auth", "proxy", "params"];
    var defaultToConfig2Keys = [
      "baseURL",
      "transformRequest",
      "transformResponse",
      "paramsSerializer",
      "timeout",
      "timeoutMessage",
      "withCredentials",
      "adapter",
      "responseType",
      "xsrfCookieName",
      "xsrfHeaderName",
      "onUploadProgress",
      "onDownloadProgress",
      "decompress",
      "maxContentLength",
      "maxBodyLength",
      "maxRedirects",
      "transport",
      "httpAgent",
      "httpsAgent",
      "cancelToken",
      "socketPath",
      "responseEncoding"
    ];
    var directMergeKeys = ["validateStatus"];
    function getMergedValue(target, source) {
      if (utils2.isPlainObject(target) && utils2.isPlainObject(source)) {
        return utils2.merge(target, source);
      } else if (utils2.isPlainObject(source)) {
        return utils2.merge({}, source);
      } else if (utils2.isArray(source)) {
        return source.slice();
      }
      return source;
    }
    function mergeDeepProperties(prop) {
      if (!utils2.isUndefined(config2[prop])) {
        config[prop] = getMergedValue(config1[prop], config2[prop]);
      } else if (!utils2.isUndefined(config1[prop])) {
        config[prop] = getMergedValue(void 0, config1[prop]);
      }
    }
    utils2.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
      if (!utils2.isUndefined(config2[prop])) {
        config[prop] = getMergedValue(void 0, config2[prop]);
      }
    });
    utils2.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
    utils2.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
      if (!utils2.isUndefined(config2[prop])) {
        config[prop] = getMergedValue(void 0, config2[prop]);
      } else if (!utils2.isUndefined(config1[prop])) {
        config[prop] = getMergedValue(void 0, config1[prop]);
      }
    });
    utils2.forEach(directMergeKeys, function merge(prop) {
      if (prop in config2) {
        config[prop] = getMergedValue(config1[prop], config2[prop]);
      } else if (prop in config1) {
        config[prop] = getMergedValue(void 0, config1[prop]);
      }
    });
    var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
    var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });
    utils2.forEach(otherKeys, mergeDeepProperties);
    return config;
  };
  return mergeConfig;
}
const version = "0.21.4";
const require$$0 = {
  version
};
var validator;
var hasRequiredValidator;
function requireValidator() {
  if (hasRequiredValidator) return validator;
  hasRequiredValidator = 1;
  var pkg = require$$0;
  var validators = {};
  ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
    validators[type] = function validator2(thing) {
      return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
    };
  });
  var deprecatedWarnings = {};
  var currentVerArr = pkg.version.split(".");
  function isOlderVersion(version2, thanVersion) {
    var pkgVersionArr = thanVersion ? thanVersion.split(".") : currentVerArr;
    var destVer = version2.split(".");
    for (var i = 0; i < 3; i++) {
      if (pkgVersionArr[i] > destVer[i]) {
        return true;
      } else if (pkgVersionArr[i] < destVer[i]) {
        return false;
      }
    }
    return false;
  }
  validators.transitional = function transitional(validator2, version2, message) {
    var isDeprecated = version2 && isOlderVersion(version2);
    function formatMessage(opt, desc) {
      return "[Axios v" + pkg.version + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
    }
    return function(value, opt, opts) {
      if (validator2 === false) {
        throw new Error(formatMessage(opt, " has been removed in " + version2));
      }
      if (isDeprecated && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        console.warn(
          formatMessage(
            opt,
            " has been deprecated since v" + version2 + " and will be removed in the near future"
          )
        );
      }
      return validator2 ? validator2(value, opt, opts) : true;
    };
  };
  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== "object") {
      throw new TypeError("options must be an object");
    }
    var keys = Object.keys(options);
    var i = keys.length;
    while (i-- > 0) {
      var opt = keys[i];
      var validator2 = schema[opt];
      if (validator2) {
        var value = options[opt];
        var result = value === void 0 || validator2(value, opt, options);
        if (result !== true) {
          throw new TypeError("option " + opt + " must be " + result);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw Error("Unknown option " + opt);
      }
    }
  }
  validator = {
    isOlderVersion,
    assertOptions,
    validators
  };
  return validator;
}
var Axios_1;
var hasRequiredAxios$2;
function requireAxios$2() {
  if (hasRequiredAxios$2) return Axios_1;
  hasRequiredAxios$2 = 1;
  var utils2 = requireUtils();
  var buildURL2 = requireBuildURL();
  var InterceptorManager = requireInterceptorManager();
  var dispatchRequest2 = requireDispatchRequest();
  var mergeConfig2 = requireMergeConfig();
  var validator2 = requireValidator();
  var validators = validator2.validators;
  function Axios(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  Axios.prototype.request = function request(config) {
    if (typeof config === "string") {
      config = arguments[1] || {};
      config.url = arguments[0];
    } else {
      config = config || {};
    }
    config = mergeConfig2(this.defaults, config);
    if (config.method) {
      config.method = config.method.toLowerCase();
    } else if (this.defaults.method) {
      config.method = this.defaults.method.toLowerCase();
    } else {
      config.method = "get";
    }
    var transitional = config.transitional;
    if (transitional !== void 0) {
      validator2.assertOptions(transitional, {
        silentJSONParsing: validators.transitional(validators.boolean, "1.0.0"),
        forcedJSONParsing: validators.transitional(validators.boolean, "1.0.0"),
        clarifyTimeoutError: validators.transitional(validators.boolean, "1.0.0")
      }, false);
    }
    var requestInterceptorChain = [];
    var synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    var responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    var promise;
    if (!synchronousRequestInterceptors) {
      var chain = [dispatchRequest2, void 0];
      Array.prototype.unshift.apply(chain, requestInterceptorChain);
      chain = chain.concat(responseInterceptorChain);
      promise = Promise.resolve(config);
      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }
      return promise;
    }
    var newConfig = config;
    while (requestInterceptorChain.length) {
      var onFulfilled = requestInterceptorChain.shift();
      var onRejected = requestInterceptorChain.shift();
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected(error);
        break;
      }
    }
    try {
      promise = dispatchRequest2(newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    while (responseInterceptorChain.length) {
      promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
    }
    return promise;
  };
  Axios.prototype.getUri = function getUri(config) {
    config = mergeConfig2(this.defaults, config);
    return buildURL2(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
  };
  utils2.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
    Axios.prototype[method] = function(url, config) {
      return this.request(mergeConfig2(config || {}, {
        method,
        url,
        data: (config || {}).data
      }));
    };
  });
  utils2.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
    Axios.prototype[method] = function(url, data, config) {
      return this.request(mergeConfig2(config || {}, {
        method,
        url,
        data
      }));
    };
  });
  Axios_1 = Axios;
  return Axios_1;
}
var Cancel_1;
var hasRequiredCancel;
function requireCancel() {
  if (hasRequiredCancel) return Cancel_1;
  hasRequiredCancel = 1;
  function Cancel(message) {
    this.message = message;
  }
  Cancel.prototype.toString = function toString() {
    return "Cancel" + (this.message ? ": " + this.message : "");
  };
  Cancel.prototype.__CANCEL__ = true;
  Cancel_1 = Cancel;
  return Cancel_1;
}
var CancelToken_1;
var hasRequiredCancelToken;
function requireCancelToken() {
  if (hasRequiredCancelToken) return CancelToken_1;
  hasRequiredCancelToken = 1;
  var Cancel = requireCancel();
  function CancelToken(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    var token = this;
    executor(function cancel(message) {
      if (token.reason) {
        return;
      }
      token.reason = new Cancel(message);
      resolvePromise(token.reason);
    });
  }
  CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  };
  CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  };
  CancelToken_1 = CancelToken;
  return CancelToken_1;
}
var spread;
var hasRequiredSpread;
function requireSpread() {
  if (hasRequiredSpread) return spread;
  hasRequiredSpread = 1;
  spread = function spread2(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  };
  return spread;
}
var isAxiosError;
var hasRequiredIsAxiosError;
function requireIsAxiosError() {
  if (hasRequiredIsAxiosError) return isAxiosError;
  hasRequiredIsAxiosError = 1;
  isAxiosError = function isAxiosError2(payload) {
    return typeof payload === "object" && payload.isAxiosError === true;
  };
  return isAxiosError;
}
var hasRequiredAxios$1;
function requireAxios$1() {
  if (hasRequiredAxios$1) return axios$2.exports;
  hasRequiredAxios$1 = 1;
  var utils2 = requireUtils();
  var bind2 = requireBind();
  var Axios = requireAxios$2();
  var mergeConfig2 = requireMergeConfig();
  var defaults = requireDefaults();
  function createInstance(defaultConfig) {
    var context2 = new Axios(defaultConfig);
    var instance = bind2(Axios.prototype.request, context2);
    utils2.extend(instance, Axios.prototype, context2);
    utils2.extend(instance, context2);
    return instance;
  }
  var axios2 = createInstance(defaults);
  axios2.Axios = Axios;
  axios2.create = function create(instanceConfig) {
    return createInstance(mergeConfig2(axios2.defaults, instanceConfig));
  };
  axios2.Cancel = requireCancel();
  axios2.CancelToken = requireCancelToken();
  axios2.isCancel = requireIsCancel();
  axios2.all = function all(promises) {
    return Promise.all(promises);
  };
  axios2.spread = requireSpread();
  axios2.isAxiosError = requireIsAxiosError();
  axios$2.exports = axios2;
  axios$2.exports.default = axios2;
  return axios$2.exports;
}
var axios$1;
var hasRequiredAxios;
function requireAxios() {
  if (hasRequiredAxios) return axios$1;
  hasRequiredAxios = 1;
  axios$1 = requireAxios$1();
  return axios$1;
}
var axiosExports = requireAxios();
const axios = /* @__PURE__ */ getDefaultExportFromCjs(axiosExports);
const API_URL$4 = "/api/users";
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL$4}/register`, userData);
    return { success: true, data: response.data };
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
    return { success: false, error: message };
  }
};
const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL$4}/login`, userData);
    if (response.data && response.data.token) {
      localStorage.setItem("psv_token", response.data.token);
      setAuthToken(response.data.token);
    }
    return response.data;
  } catch (error) {
    error.response && error.response.data && error.response.data.message || error.message || error.toString();
    throw error;
  }
};
const logout = () => {
  localStorage.removeItem("psv_token");
  setAuthToken(null);
};
const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL$4}/me`);
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};
const authService = {
  setAuthToken,
  // Expose if needed externally, though mostly internal to auth flow
  register,
  login,
  logout,
  getCurrentUser
};
const initialState = {
  isAuthenticated: false,
  user: null,
  // Store user object { _id, name, email, role, memberId, token }
  token: localStorage.getItem("psv_token"),
  // Get token from local storage
  loading: true,
  // To check if auth state has been loaded (e.g. from localStorage)
  error: null
};
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const AUTH_ERROR = "AUTH_ERROR";
const USER_LOADED = "USER_LOADED";
const LOGOUT = "LOGOUT";
const CLEAR_ERRORS = "CLEAR_ERRORS";
const SET_LOADING = "SET_LOADING";
const authReducer = (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        // User object without token, token is separate
        loading: false,
        error: null
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("psv_token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        // User object, includes token here for simplicity or store separately
        token: action.payload.token,
        loading: false,
        error: null
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
        // Clear any previous errors
        // isAuthenticated remains false, user is null until login
      };
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("psv_token");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: action.payload
        // Error message for AUTH_ERROR
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
const AuthContext = reactExports.createContext(initialState);
const AuthProvider = ({ children }) => {
  const [state, dispatch] = reactExports.useReducer(authReducer, initialState);
  reactExports.useEffect(() => {
    let isMounted = true;
    const loadUser = async () => {
      const token = localStorage.getItem("psv_token");
      if (token) {
        authService.setAuthToken(token);
        try {
          const userData = await authService.getCurrentUser();
          if (isMounted) {
            dispatch({ type: USER_LOADED, payload: userData });
          }
        } catch (err) {
          if (isMounted) {
            dispatch({ type: AUTH_ERROR, payload: "Session expired or token invalid. Please login again." });
          }
        }
      } else {
        if (isMounted) {
          dispatch({ type: AUTH_ERROR, payload: null });
        }
      }
    };
    loadUser();
    return () => {
      isMounted = false;
    };
  }, [state.token]);
  const login2 = async (formData) => {
    dispatch({ type: SET_LOADING });
    try {
      const userData = await authService.login(formData);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: userData
      });
      return { success: true };
    } catch (err) {
      const errorMsg = err.response && err.response.data && err.response.data.message ? err.response.data.message : err.message;
      dispatch({
        type: AUTH_ERROR,
        payload: errorMsg
      });
      return { success: false, error: errorMsg };
    }
  };
  const register2 = async (formData) => {
    dispatch({ type: SET_LOADING });
    const result = await authService.register(formData);
    if (result.success) {
      dispatch({ type: REGISTER_SUCCESS });
      return { success: true };
    } else {
      dispatch({
        type: AUTH_ERROR,
        payload: result.error
      });
      return { success: false, error: result.error };
    }
  };
  const logout2 = () => {
    authService.logout();
    dispatch({ type: LOGOUT });
  };
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AuthContext.Provider,
    {
      value: {
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        loading: state.loading,
        error: state.error,
        // loadUser is no longer explicitly provided; useEffect handles loading based on token.
        login: login2,
        register: register2,
        logout: logout2,
        clearErrors
      },
      children
    }
  );
};
const Sidebar = () => {
  const { isAuthenticated, user, logout: logout2, loading } = reactExports.useContext(AuthContext);
  const history = useHistory();
  const handleLogout = () => {
    logout2();
    history.push("/login");
  };
  const sidebarStyle = {
    height: "100vh",
    // Full height
    width: "220px",
    // Sidebar width
    position: "fixed",
    // Fixed sidebar
    zIndex: 1,
    top: 0,
    left: 0,
    backgroundColor: "#2c3e50",
    // Dark blue/grey
    paddingTop: "20px",
    overflowX: "hidden"
    // Hide horizontal scrollbar
  };
  const linkStyle = {
    padding: "10px 15px",
    textDecoration: "none",
    fontSize: "1.1em",
    color: "#bdc3c7",
    // Light grey text
    display: "block",
    transition: "0.3s"
  };
  const activeLinkStyle = {
    // Example for active link, react-router's NavLink is better for this
    ...linkStyle,
    color: "#ffffff",
    // White text for active
    backgroundColor: "#34495e"
    // Slightly darker background for active
  };
  const userInfoStyle = {
    padding: "10px 15px",
    color: "#ecf0f1",
    // Lighter text for user info
    borderBottom: "1px solid #34495e",
    // Separator
    marginBottom: "10px"
  };
  const logoutButtonStyle = {
    // Making logout look more like a button within the sidebar
    ...linkStyle,
    cursor: "pointer",
    backgroundColor: "#c0392b",
    // Reddish for logout
    color: "#ffffff",
    textAlign: "center",
    margin: "20px 15px 0 15px",
    borderRadius: "5px"
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: sidebarStyle, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: linkStyle, children: "Loading..." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: sidebarStyle, children: [
    isAuthenticated && user && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: userInfoStyle, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: user.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
        "(",
        user.role,
        ")"
      ] }),
      user.idVerification && /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { style: { display: "block", marginTop: "5px", color: user.idVerification.status === "verified" ? "lightgreen" : "yellow" }, children: [
        "ID Status: ",
        user.idVerification.status.replace("_", " ")
      ] })
    ] }),
    isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/dashboard", style: linkStyle, activeStyle: activeLinkStyle, exact: true, children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/vehicles", style: linkStyle, activeStyle: activeLinkStyle, children: "Vehicles" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/crew", style: linkStyle, activeStyle: activeLinkStyle, children: "Crew" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/routes", style: linkStyle, activeStyle: activeLinkStyle, children: "Routes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/welfare", style: linkStyle, activeStyle: activeLinkStyle, children: "Welfare" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/payroll", style: linkStyle, activeStyle: activeLinkStyle, children: "Payroll" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/verify-id", style: linkStyle, activeStyle: activeLinkStyle, children: "ID Verification" }),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#!", onClick: handleLogout, style: logoutButtonStyle, children: "Logout" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/", style: linkStyle, activeStyle: activeLinkStyle, exact: true, children: "Home" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/register", style: linkStyle, activeStyle: activeLinkStyle, children: "Register" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/login", style: linkStyle, activeStyle: activeLinkStyle, children: "Login" })
    ] })
  ] });
};
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = reactExports.useContext(AuthContext);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Route,
    {
      ...rest,
      render: (props) => {
        if (loading) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading authentication state..." });
        }
        if (!isAuthenticated) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Redirect, { to: { pathname: "/login", state: { from: props.location } } });
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Component, { ...props });
      }
    }
  );
};
const HomePage = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Welcome to PSV Sacco Management" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "This is the public home page." })
  ] });
};
const LoginPage = () => {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const { login: login2, error, loading, clearErrors } = reactExports.useContext(AuthContext);
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();
    const result = await login2({ email, password });
    if (result && result.success) {
      const { state } = history.location;
      const from = state && state.from && state.from.pathname;
      history.push(from || "/dashboard");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Login" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", children: "Email:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "email",
            id: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "password", children: "Password:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "password",
            id: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            required: true
          }
        )
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "red" }, children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "btn btn-success", disabled: loading, children: loading ? "Logging in..." : "Login" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Don't have an account? ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", children: "Register here" })
    ] })
  ] });
};
const RegisterPage = () => {
  const [formData, setFormData] = reactExports.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    // role: 'sacco_member', // Default role will be set by backend
    memberId: "",
    // Keep for SACCO members, conditionally shown or handled
    phoneNumber: ""
  });
  const { register: register2, error, loading, clearErrors } = reactExports.useContext(AuthContext);
  const history = useHistory();
  const [pageError, setPageError] = reactExports.useState("");
  const { name, email, password, confirmPassword, memberId, phoneNumber } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();
    setPageError("");
    if (password !== confirmPassword) {
      setPageError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setPageError("Password must be at least 6 characters");
      return;
    }
    const registrationData = { name, email, password, memberId, phoneNumber };
    if (registrationData.memberId && registrationData.memberId.trim() === "") {
      delete registrationData.memberId;
    }
    const result = await register2(registrationData);
    if (result && result.success) {
      history.push("/login?registration=success");
    } else if (result && result.error) {
      setPageError(result.error);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Register" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "name", children: "Name:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", id: "name", name: "name", value: name, onChange: handleChange, required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", children: "Email:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", id: "email", name: "email", value: email, onChange: handleChange, required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "password", children: "Password:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", id: "password", name: "password", value: password, onChange: handleChange, required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "confirmPassword", children: "Confirm Password:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "password",
            id: "confirmPassword",
            name: "confirmPassword",
            value: confirmPassword,
            onChange: handleChange,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "memberId", children: "Member ID (if applicable):" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            id: "memberId",
            name: "memberId",
            value: memberId,
            onChange: handleChange
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "phoneNumber", children: "Phone Number:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "tel",
            id: "phoneNumber",
            name: "phoneNumber",
            value: phoneNumber,
            onChange: handleChange
          }
        )
      ] }),
      (pageError || error) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "red" }, children: pageError || error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "btn btn-success", disabled: loading, children: loading ? "Registering..." : "Register" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Already have an account? ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: "Login here" })
    ] })
  ] });
};
const DashboardPage = () => {
  const { user, loading } = reactExports.useContext(AuthContext);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading dashboard..." });
  }
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "You are not logged in. Please ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: "login" }),
      "."
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Dashboard" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Welcome, ",
      user.name,
      "!"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Your Role: ",
      user.role
    ] }),
    user.memberId && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Member ID: ",
      user.memberId
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Quick Links:" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vehicles", children: "Manage Vehicles" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/crew", children: "Manage Crew" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/routes", children: "Manage Routes" }) })
    ] }),
    user.role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Admin Section" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Admin specific tools and reports will appear here." })
    ] }),
    user.role === "sacco_member" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Member Section" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Your vehicle details and financial summaries will appear here." })
    ] }),
    user.role === "driver" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Driver Section" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Your assigned vehicle, schedule, and deposit records." })
    ] })
  ] });
};
const API_URL$3 = "/api/vehicles";
const getAllVehicles = async (token) => {
  try {
    const response = await axios.get(API_URL$3);
    return response.data;
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
    throw new Error(`Could not fetch vehicles: ${message}`);
  }
};
const createVehicle = async (vehicleData, token) => {
  try {
    const response = await axios.post(API_URL$3, vehicleData);
    return response.data;
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
    throw new Error(`Could not create vehicle: ${message}`);
  }
};
const getVehicleById = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL$3}/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
    throw new Error(`Could not fetch vehicle ${id}: ${message}`);
  }
};
const updateVehicle = async (id, vehicleData, token) => {
  try {
    const response = await axios.put(`${API_URL$3}/${id}`, vehicleData);
    return response.data;
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
    throw new Error(`Could not update vehicle ${id}: ${message}`);
  }
};
const deleteVehicle = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL$3}/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
    throw new Error(`Could not delete vehicle ${id}: ${message}`);
  }
};
const vehicleService = {
  getAllVehicles,
  createVehicle,
  getVehicleById,
  updateVehicle,
  deleteVehicle
};
const VehicleListPage = () => {
  const [vehicles, setVehicles] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const { token } = reactExports.useContext(AuthContext);
  reactExports.useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await vehicleService.getAllVehicles(token);
        setVehicles(data);
      } catch (err) {
        setError(err.message || "Failed to fetch vehicles.");
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [token]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading vehicles..." });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "red" }, children: [
      "Error: ",
      error
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Vehicle Management" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vehicles/add", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-success mb-3", children: "Add New Vehicle" }) }),
    vehicles.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No vehicles found." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { border: "1", style: { width: "100%", borderCollapse: "collapse" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Number Plate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Nickname" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Capacity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Owner" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: vehicles.map((vehicle) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: vehicle.numberPlate }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: vehicle.vehicleType }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: vehicle.nickname || "-" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: vehicle.passengerCapacity }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: vehicle.owner ? vehicle.owner.name : "N/A" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: vehicle.status }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/vehicles/${vehicle._id}`, className: "btn btn-success btn-sm me-1", children: "View" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/vehicles/${vehicle._id}/edit`, className: "btn btn-success btn-sm me-1", children: "Edit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => alert(`Delete ${vehicle._id}? Implement me!`), className: "btn btn-danger btn-sm", children: "Delete" })
        ] })
      ] }, vehicle._id)) })
    ] })
  ] });
};
const AddVehiclePage = () => {
  const [formData, setFormData] = reactExports.useState({
    numberPlate: "",
    vehicleType: "Minibus",
    // Default value
    logbookNumber: "",
    passengerCapacity: "",
    owner: ""
    // Will be UserId of Sacco Member
  });
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const { token, user } = reactExports.useContext(AuthContext);
  const history = useHistory();
  const { numberPlate, vehicleType, logbookNumber, passengerCapacity, owner } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to add a vehicle.");
      return;
    }
    if (!numberPlate || !vehicleType || !logbookNumber || !passengerCapacity || !owner) {
      setError("Please fill in all required fields: Number Plate, Type, Logbook, Capacity, Owner ID.");
      return;
    }
    const vehicleData = {
      ...formData,
      passengerCapacity: parseInt(passengerCapacity)
      // createdBy will be set by backend using token
    };
    setLoading(true);
    setError("");
    try {
      await vehicleService.createVehicle(vehicleData, token);
      history.push("/vehicles");
    } catch (err) {
      setError(err.message || "Failed to create vehicle.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Add New Vehicle" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "numberPlate", children: "Number Plate:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            id: "numberPlate",
            name: "numberPlate",
            value: numberPlate,
            onChange: handleChange,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "vehicleType", children: "Vehicle Type:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { name: "vehicleType", value: vehicleType, onChange: handleChange, required: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Bus", children: "Bus" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Minibus", children: "Minibus" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Van", children: "Van" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Shuttle", children: "Shuttle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Coach", children: "Coach" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "logbookNumber", children: "Logbook Number:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            id: "logbookNumber",
            name: "logbookNumber",
            value: logbookNumber,
            onChange: handleChange,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "passengerCapacity", children: "Passenger Capacity:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            id: "passengerCapacity",
            name: "passengerCapacity",
            value: passengerCapacity,
            onChange: handleChange,
            required: true,
            min: "1"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "owner", children: "Owner User ID (Sacco Member):" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            id: "owner",
            name: "owner",
            value: owner,
            onChange: handleChange,
            required: true,
            placeholder: "Enter User ID of the owner"
          }
        )
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "red" }, children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "btn btn-success", disabled: loading, children: loading ? "Adding Vehicle..." : "Add Vehicle" })
    ] })
  ] });
};
const CrewListPage = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Crew Management" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/crew/add", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-success", children: "Add New Crew Profile" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "List of crew members will appear here..." })
  ] });
};
const AddCrewProfilePage = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Add New Crew Profile" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Form to add a new crew profile will appear here..." })
  ] });
};
const RouteListPage = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Route Definitions" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/routes/add", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-success", children: "Define New Route" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "List of defined routes will appear here..." })
  ] });
};
const AddRoutePage = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Define New Route" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Form to define a new route will appear here..." })
  ] });
};
const API_URL$2 = "/api/welfare/contributions";
const recordContribution = async (contributionData) => {
  try {
    const response = await axios.post(API_URL$2, contributionData);
    return response.data;
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
    throw new Error(`Could not record contribution: ${message}`);
  }
};
const getAllContributions = async (filters = {}) => {
  try {
    const response = await axios.get(API_URL$2, { params: filters });
    return response.data;
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
    throw new Error(`Could not fetch contributions: ${message}`);
  }
};
const getMemberContributions = async (userId) => {
  try {
    const response = await axios.get(`${API_URL$2}/member/${userId}`);
    return response.data;
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
    throw new Error(`Could not fetch member contributions: ${message}`);
  }
};
const getContributionById = async (contributionId) => {
  try {
    const response = await axios.get(`${API_URL$2}/${contributionId}`);
    return response.data;
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
    throw new Error(`Could not fetch contribution ${contributionId}: ${message}`);
  }
};
const updateContribution = async (contributionId, contributionData) => {
  try {
    const response = await axios.put(`${API_URL$2}/${contributionId}`, contributionData);
    return response.data;
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
    throw new Error(`Could not update contribution ${contributionId}: ${message}`);
  }
};
const deleteContribution = async (contributionId) => {
  try {
    const response = await axios.delete(`${API_URL$2}/${contributionId}`);
    return response.data;
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
    throw new Error(`Could not delete contribution ${contributionId}: ${message}`);
  }
};
const welfareService = {
  recordContribution,
  getAllContributions,
  getMemberContributions,
  getContributionById,
  updateContribution,
  deleteContribution
};
const WelfareContributionForm = ({ onContributionAdded, editingContribution, clearEditing }) => {
  const [formData, setFormData] = reactExports.useState({
    member: "",
    // User ID of the Sacco member
    contributionDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    // Default to today
    amount: "",
    contributionType: "Standard Monthly",
    paymentMethod: "Cash",
    referenceNumber: "",
    remarks: ""
  });
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [successMessage, setSuccessMessage] = reactExports.useState("");
  const { user } = reactExports.useContext(AuthContext);
  reactExports.useEffect(() => {
    if (editingContribution) {
      setFormData({
        member: editingContribution.member._id || editingContribution.member,
        // member can be populated or just ID
        contributionDate: new Date(editingContribution.contributionDate).toISOString().split("T")[0],
        amount: editingContribution.amount,
        contributionType: editingContribution.contributionType,
        paymentMethod: editingContribution.paymentMethod,
        referenceNumber: editingContribution.referenceNumber || "",
        remarks: editingContribution.remarks || ""
      });
    } else {
      setFormData({
        member: "",
        contributionDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        amount: "",
        contributionType: "Standard Monthly",
        paymentMethod: "Cash",
        referenceNumber: "",
        remarks: ""
      });
    }
  }, [editingContribution]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.member || !formData.amount || !formData.contributionDate) {
      setError("Member, Amount, and Date are required.");
      return;
    }
    if (parseFloat(formData.amount) <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccessMessage("");
    const contributionData = {
      ...formData,
      amount: parseFloat(formData.amount),
      recordedBy: user._id
      // Assuming logged-in user is recording
    };
    try {
      let savedContribution;
      if (editingContribution) {
        savedContribution = await welfareService.updateContribution(editingContribution._id, contributionData);
        setSuccessMessage("Contribution updated successfully!");
      } else {
        savedContribution = await welfareService.recordContribution(contributionData);
        setSuccessMessage("Contribution recorded successfully!");
      }
      if (onContributionAdded) {
        onContributionAdded(savedContribution);
      }
      if (!editingContribution) {
        setFormData({
          member: "",
          contributionDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          amount: "",
          contributionType: "Standard Monthly",
          paymentMethod: "Cash",
          referenceNumber: "",
          remarks: ""
        });
      } else if (clearEditing) {
        clearEditing();
      }
    } catch (err) {
      setError(err.message || "Failed to save contribution.");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMessage(""), 3e3);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, style: { marginBottom: "20px", padding: "15px", border: "1px solid #eee" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: editingContribution ? "Edit Contribution" : "Record New Welfare Contribution" }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "red" }, children: error }),
    successMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "green" }, children: successMessage }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "member", children: "Member User ID:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          name: "member",
          id: "member",
          value: formData.member,
          onChange: handleChange,
          placeholder: "Enter User ID of SACCO Member",
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "contributionDate", children: "Contribution Date:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "date",
          name: "contributionDate",
          id: "contributionDate",
          value: formData.contributionDate,
          onChange: handleChange,
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "amount", children: "Amount:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "number",
          name: "amount",
          id: "amount",
          value: formData.amount,
          onChange: handleChange,
          required: true,
          min: "0.01",
          step: "0.01"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "contributionType", children: "Contribution Type:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { name: "contributionType", id: "contributionType", value: formData.contributionType, onChange: handleChange, required: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Standard Monthly", children: "Standard Monthly" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Benevolent Fund", children: "Benevolent Fund" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Emergency Support", children: "Emergency Support" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Shares Purchase", children: "Shares Purchase" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Other", children: "Other" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "paymentMethod", children: "Payment Method:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { name: "paymentMethod", id: "paymentMethod", value: formData.paymentMethod, onChange: handleChange, required: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Cash", children: "Cash" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Bank Transfer", children: "Bank Transfer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Mobile Money", children: "Mobile Money" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Payroll Deduction", children: "Payroll Deduction" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Other", children: "Other" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "referenceNumber", children: "Reference Number (Optional):" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          name: "referenceNumber",
          id: "referenceNumber",
          value: formData.referenceNumber,
          onChange: handleChange
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "remarks", children: "Remarks (Optional):" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          name: "remarks",
          id: "remarks",
          value: formData.remarks,
          onChange: handleChange,
          rows: "3"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "btn btn-success", disabled: loading, children: loading ? editingContribution ? "Updating..." : "Recording..." : editingContribution ? "Update Contribution" : "Record Contribution" }),
    editingContribution && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: clearEditing, className: "btn btn-secondary ms-2", children: "Cancel Edit" })
  ] });
};
const WelfareContributionsList = ({ contributions, onEdit, onDelete, isLoading }) => {
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading contributions..." });
  }
  if (!contributions || contributions.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No welfare contributions found." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Welfare Contributions History" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { border: "1", style: { width: "100%", borderCollapse: "collapse" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Member Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Member ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Payment Method" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Reference" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Recorded By" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Remarks" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: contributions.map((contrib) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: new Date(contrib.contributionDate).toLocaleDateString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: contrib.member ? contrib.member.name : "N/A" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: contrib.member ? contrib.member.memberId || "N/A" : "N/A" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: contrib.amount.toFixed(2) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: contrib.contributionType }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: contrib.paymentMethod }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: contrib.referenceNumber || "-" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: contrib.recordedBy ? contrib.recordedBy.name : "N/A" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: contrib.remarks || "-" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onEdit(contrib), className: "btn btn-success btn-sm me-1", children: "Edit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onDelete(contrib._id), className: "btn btn-danger btn-sm", children: "Delete" })
        ] })
      ] }, contrib._id)) })
    ] })
  ] });
};
const WelfarePage = () => {
  const [contributions, setContributions] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [editingContribution, setEditingContribution] = reactExports.useState(null);
  const { user } = reactExports.useContext(AuthContext);
  const fetchContributions = reactExports.useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await welfareService.getAllContributions();
      setContributions(data);
    } catch (err) {
      setError(err.message || "Failed to fetch contributions.");
    } finally {
      setIsLoading(false);
    }
  }, []);
  reactExports.useEffect(() => {
    fetchContributions();
  }, [fetchContributions]);
  const handleContributionAddedOrUpdated = (newOrUpdatedContribution) => {
    if (editingContribution) {
      setContributions(
        (prev) => prev.map((c) => c._id === newOrUpdatedContribution._id ? newOrUpdatedContribution : c)
      );
    } else {
      setContributions((prev) => [newOrUpdatedContribution, ...prev]);
    }
    setEditingContribution(null);
  };
  const handleEdit = (contribution) => {
    setEditingContribution(contribution);
    window.scrollTo(0, 0);
  };
  const clearEditingState = () => {
    setEditingContribution(null);
  };
  const handleDelete = async (contributionId) => {
    if (window.confirm("Are you sure you want to delete this contribution?")) {
      setIsLoading(true);
      try {
        await welfareService.deleteContribution(contributionId);
        setContributions((prev) => prev.filter((c) => c._id !== contributionId));
      } catch (err) {
        setError(err.message || "Failed to delete contribution.");
      } finally {
        setIsLoading(false);
      }
    }
  };
  const canManageWelfare = user && (user.role === "admin" || user.role === "route_marshal");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Welfare Contributions Management" }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "red" }, children: [
      "Error: ",
      error
    ] }),
    canManageWelfare && /* @__PURE__ */ jsxRuntimeExports.jsx(
      WelfareContributionForm,
      {
        onContributionAdded: handleContributionAddedOrUpdated,
        editingContribution,
        clearEditing: clearEditingState
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      WelfareContributionsList,
      {
        contributions,
        onEdit: canManageWelfare ? handleEdit : null,
        onDelete: canManageWelfare ? handleDelete : null,
        isLoading
      }
    )
  ] });
};
const API_URL$1 = "/api/payroll/records";
const createPayrollRecord = async (payrollData) => {
  try {
    const response = await axios.post(API_URL$1, payrollData);
    return response.data;
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
    throw new Error(`Could not create payroll record: ${message}`);
  }
};
const getAllPayrollRecords = async (filters = {}) => {
  try {
    const response = await axios.get(API_URL$1, { params: filters });
    return response.data;
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
    throw new Error(`Could not fetch payroll records: ${message}`);
  }
};
const getCrewMemberPayrollRecords = async (userId) => {
  try {
    const response = await axios.get(`${API_URL$1}/crew/${userId}`);
    return response.data;
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
    throw new Error(`Could not fetch crew member payroll records: ${message}`);
  }
};
const getPayrollRecordById = async (recordId) => {
  try {
    const response = await axios.get(`${API_URL$1}/${recordId}`);
    return response.data;
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
    throw new Error(`Could not fetch payroll record ${recordId}: ${message}`);
  }
};
const updatePayrollRecord = async (recordId, payrollData) => {
  try {
    const response = await axios.put(`${API_URL$1}/${recordId}`, payrollData);
    return response.data;
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
    throw new Error(`Could not update payroll record ${recordId}: ${message}`);
  }
};
const payrollService = {
  createPayrollRecord,
  getAllPayrollRecords,
  getCrewMemberPayrollRecords,
  getPayrollRecordById,
  updatePayrollRecord
};
const PayrollRecordForm = ({ onRecordAddedOrUpdated, editingRecord, clearEditing }) => {
  const initialDeductionState = { type: "", description: "", amount: "" };
  const initialFormState = {
    crewMember: "",
    // User ID of the crew member
    payPeriodStartDate: "",
    payPeriodEndDate: "",
    grossPay: "",
    deductions: [initialDeductionState],
    paymentMethod: "Bank Transfer",
    referenceNumber: "",
    status: "Pending",
    notes: "",
    basisOfPayment: "Fixed Rate"
  };
  const [formData, setFormData] = reactExports.useState(initialFormState);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [successMessage, setSuccessMessage] = reactExports.useState("");
  const { user } = reactExports.useContext(AuthContext);
  reactExports.useEffect(() => {
    if (editingRecord) {
      setFormData({
        crewMember: editingRecord.crewMember._id || editingRecord.crewMember,
        payPeriodStartDate: new Date(editingRecord.payPeriodStartDate).toISOString().split("T")[0],
        payPeriodEndDate: new Date(editingRecord.payPeriodEndDate).toISOString().split("T")[0],
        grossPay: editingRecord.grossPay,
        deductions: editingRecord.deductions && editingRecord.deductions.length > 0 ? editingRecord.deductions : [initialDeductionState],
        paymentMethod: editingRecord.paymentMethod,
        referenceNumber: editingRecord.referenceNumber || "",
        status: editingRecord.status,
        notes: editingRecord.notes || "",
        basisOfPayment: editingRecord.basisOfPayment
      });
    } else {
      setFormData(initialFormState);
    }
  }, [editingRecord]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleDeductionChange = (index, e) => {
    const updatedDeductions = formData.deductions.map(
      (deduction, i) => index === i ? { ...deduction, [e.target.name]: e.target.value } : deduction
    );
    setFormData({ ...formData, deductions: updatedDeductions });
  };
  const addDeduction = () => {
    setFormData({
      ...formData,
      deductions: [...formData.deductions, { ...initialDeductionState }]
    });
  };
  const removeDeduction = (index) => {
    const filteredDeductions = formData.deductions.filter((_, i) => i !== index);
    setFormData({ ...formData, deductions: filteredDeductions.length > 0 ? filteredDeductions : [initialDeductionState] });
  };
  const calculateNetPay = () => {
    const gross = parseFloat(formData.grossPay) || 0;
    const totalDeductions = formData.deductions.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);
    return (gross - totalDeductions).toFixed(2);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.crewMember || !formData.payPeriodStartDate || !formData.payPeriodEndDate || !formData.grossPay) {
      setError("Crew Member, Pay Period Dates, and Gross Pay are required.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccessMessage("");
    const recordData = {
      ...formData,
      grossPay: parseFloat(formData.grossPay),
      deductions: formData.deductions.filter((d) => d.type && d.amount).map((d) => ({ ...d, amount: parseFloat(d.amount) })),
      generatedBy: user._id
    };
    try {
      let savedRecord;
      if (editingRecord) {
        savedRecord = await payrollService.updatePayrollRecord(editingRecord._id, recordData);
        setSuccessMessage("Payroll record updated successfully!");
      } else {
        savedRecord = await payrollService.createPayrollRecord(recordData);
        setSuccessMessage("Payroll record created successfully!");
      }
      if (onRecordAddedOrUpdated) {
        onRecordAddedOrUpdated(savedRecord);
      }
      if (!editingRecord) {
        setFormData(initialFormState);
      } else if (clearEditing) {
        clearEditing();
      }
    } catch (err) {
      setError(err.message || "Failed to save payroll record.");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMessage(""), 3e3);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, style: { marginBottom: "20px", padding: "15px", border: "1px solid #eee" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: editingRecord ? "Edit Payroll Record" : "Create New Payroll Record" }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error-message", children: error }),
    successMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "green" }, children: successMessage }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "crewMember", children: "Crew Member User ID:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", name: "crewMember", value: formData.crewMember, onChange: handleChange, placeholder: "Enter User ID of Crew Member", required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "payPeriodStartDate", children: "Pay Period Start Date:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", name: "payPeriodStartDate", value: formData.payPeriodStartDate, onChange: handleChange, required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "payPeriodEndDate", children: "Pay Period End Date:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", name: "payPeriodEndDate", value: formData.payPeriodEndDate, onChange: handleChange, required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "basisOfPayment", children: "Basis of Payment:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { name: "basisOfPayment", value: formData.basisOfPayment, onChange: handleChange, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Fixed Rate", children: "Fixed Rate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Commission", children: "Commission" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Hourly", children: "Hourly" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Daily Rate", children: "Daily Rate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Trip Rate", children: "Trip Rate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Mixed", children: "Mixed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Other", children: "Other" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "grossPay", children: "Gross Pay:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", name: "grossPay", value: formData.grossPay, onChange: handleChange, required: true, min: "0", step: "0.01" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Deductions" }),
    formData.deductions.map((deduction, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { border: "1px dashed #ccc", padding: "10px", marginBottom: "10px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: `deductionType-${index}`, children: "Deduction Type:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", name: "type", id: `deductionType-${index}`, value: deduction.type, onChange: (e) => handleDeductionChange(index, e), placeholder: "e.g., NSSF, Loan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: `deductionDesc-${index}`, children: "Description (Optional):" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", name: "description", id: `deductionDesc-${index}`, value: deduction.description, onChange: (e) => handleDeductionChange(index, e) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: `deductionAmount-${index}`, children: "Amount:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", name: "amount", id: `deductionAmount-${index}`, value: deduction.amount, onChange: (e) => handleDeductionChange(index, e), min: "0", step: "0.01" }),
      formData.deductions.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => removeDeduction(index), className: "btn btn-danger btn-sm mt-1", children: "Remove Deduction" })
    ] }, index)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: addDeduction, className: "btn btn-info btn-sm mb-2", children: "Add Deduction" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
      "Calculated Net Pay: ",
      calculateNetPay()
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "paymentMethod", children: "Payment Method:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { name: "paymentMethod", value: formData.paymentMethod, onChange: handleChange, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Bank Transfer", children: "Bank Transfer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Cash", children: "Cash" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Mobile Money", children: "Mobile Money" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Cheque", children: "Cheque" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Other", children: "Other" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "referenceNumber", children: "Payment Reference (Optional):" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", name: "referenceNumber", value: formData.referenceNumber, onChange: handleChange })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "status", children: "Status:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { name: "status", value: formData.status, onChange: handleChange, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Pending", children: "Pending" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Processing", children: "Processing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Paid", children: "Paid" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Failed", children: "Failed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Cancelled", children: "Cancelled" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "On Hold", children: "On Hold" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "notes", children: "Notes (Optional):" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { name: "notes", value: formData.notes, onChange: handleChange, rows: "3" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "btn btn-success", disabled: loading, children: loading ? editingRecord ? "Updating..." : "Creating..." : editingRecord ? "Update Record" : "Create Record" }),
    editingRecord && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: clearEditing, className: "btn btn-secondary ms-2", children: "Cancel Edit" })
  ] });
};
const PayrollRecordsList = ({ records, onEdit, isLoading }) => {
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading payroll records..." });
  }
  if (!records || records.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No payroll records found." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Payroll History" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { border: "1", style: { width: "100%", borderCollapse: "collapse", fontSize: "0.9em" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Pay Period" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Crew Member" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Gross Pay" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Deductions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Net Pay" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Payment Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Basis" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: records.map((record) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
          new Date(record.payPeriodStartDate).toLocaleDateString(),
          " - ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          new Date(record.payPeriodEndDate).toLocaleDateString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: record.crewMember ? record.crewMember.name : "N/A" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: record.grossPay.toFixed(2) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: record.deductionsTotal.toFixed(2) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: record.netPay.toFixed(2) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: new Date(record.paymentDate).toLocaleDateString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: record.status }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: record.basisOfPayment }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onEdit(record), className: "btn btn-success btn-sm me-1", children: "Edit/View" }) })
      ] }, record._id)) })
    ] })
  ] });
};
const PayrollPage = () => {
  const [records, setRecords] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [editingRecord, setEditingRecord] = reactExports.useState(null);
  const { user } = reactExports.useContext(AuthContext);
  const fetchPayrollRecords = reactExports.useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await payrollService.getAllPayrollRecords();
      setRecords(data);
    } catch (err) {
      setError(err.message || "Failed to fetch payroll records.");
    } finally {
      setIsLoading(false);
    }
  }, []);
  reactExports.useEffect(() => {
    fetchPayrollRecords();
  }, [fetchPayrollRecords]);
  const handleRecordAddedOrUpdated = (newOrUpdatedRecord) => {
    if (editingRecord) {
      setRecords(
        (prev) => prev.map((r) => r._id === newOrUpdatedRecord._id ? newOrUpdatedRecord : r)
      );
    } else {
      setRecords((prev) => [newOrUpdatedRecord, ...prev]);
    }
    setEditingRecord(null);
  };
  const handleEdit = (record) => {
    setEditingRecord(record);
    window.scrollTo(0, 0);
  };
  const clearEditingState = () => {
    setEditingRecord(null);
  };
  const canManagePayroll = user && (user.role === "admin" || user.role === "route_marshal");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Crew Payroll Management" }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "error-message", children: [
      "Error: ",
      error
    ] }),
    canManagePayroll && /* @__PURE__ */ jsxRuntimeExports.jsx(
      PayrollRecordForm,
      {
        onRecordAddedOrUpdated: handleRecordAddedOrUpdated,
        editingRecord,
        clearEditing: clearEditingState
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PayrollRecordsList,
      {
        records,
        onEdit: canManagePayroll ? handleEdit : null,
        isLoading
      }
    )
  ] });
};
const getAuthToken = () => {
  return localStorage.getItem("psv_token");
};
const API_URL = "/api";
const submitIdForVerification = async (idData) => {
  const token = getAuthToken();
  if (!token) {
    return { success: false, message: "Authentication token not found." };
  }
  try {
    const response = await axios.post(
      `${API_URL}/verification/submit-id`,
      idData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );
    return { success: true, ...response.data };
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
    return { success: false, message, details: error.response?.data?.details };
  }
};
const fetchVerificationStatus = async () => {
  const token = getAuthToken();
  if (!token) {
    return { success: false, message: "Authentication token not found." };
  }
  try {
    const response = await axios.get(`${API_URL}/verification/status`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return { success: true, data: response.data };
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
    return { success: false, message };
  }
};
const IDVerificationPage = () => {
  const { token } = reactExports.useContext(AuthContext);
  const [formData, setFormData] = reactExports.useState({
    nationalIdNumber: "",
    fullNameOnId: "",
    dobOnId: ""
    // Should be YYYY-MM-DD for input type="date"
  });
  const [verificationStatus, setVerificationStatus] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [message, setMessage] = reactExports.useState("");
  const [statusLoading, setStatusLoading] = reactExports.useState(true);
  const { nationalIdNumber, fullNameOnId, dobOnId } = formData;
  reactExports.useEffect(() => {
    const getStatus = async () => {
      if (!token) {
        setStatusLoading(false);
        setMessage("Not authenticated. Cannot fetch verification status.");
        return;
      }
      setStatusLoading(true);
      const response = await fetchVerificationStatus();
      if (response.success) {
        setVerificationStatus(response.data);
        if (response.data.status !== "not_verified" && response.data.status !== "failed") ;
      } else {
        setMessage(response.message || "Could not fetch verification status.");
      }
      setStatusLoading(false);
    };
    getStatus();
  }, [token]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nationalIdNumber || !fullNameOnId || !dobOnId) {
      setMessage("All fields are required.");
      return;
    }
    setIsLoading(true);
    setMessage("");
    const response = await submitIdForVerification({ nationalIdNumber, fullNameOnId, dobOnId });
    if (response.success) {
      setMessage(response.message || "ID details submitted successfully.");
      if (response.details) {
        setVerificationStatus(response.details);
      } else if (response.idVerificationStatus) {
        setVerificationStatus((prevStatus) => ({ ...prevStatus, status: response.idVerificationStatus, remarks: response.message }));
      }
    } else {
      setMessage(response.message || "An error occurred during submission.");
      if (response.details) {
        setVerificationStatus(response.details);
      }
    }
    setIsLoading(false);
  };
  const renderStatusDetails = () => {
    if (!verificationStatus) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading verification status..." });
    let statusText = "Unknown";
    let statusColor = "grey";
    switch (verificationStatus.status) {
      case "not_verified":
        statusText = "Not Verified";
        statusColor = "orange";
        break;
      case "pending":
        statusText = "Pending Verification";
        statusColor = "blue";
        break;
      case "verified":
        statusText = "Verified";
        statusColor = "green";
        break;
      case "failed":
        statusText = "Verification Failed";
        statusColor = "red";
        break;
      case "needs_review":
        statusText = "Needs Manual Review";
        statusColor = "purple";
        break;
      default:
        statusText = verificationStatus.status;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "20px", padding: "10px", border: `1px solid ${statusColor}` }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { children: [
        "Current Verification Status: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: statusColor }, children: statusText })
      ] }),
      verificationStatus.remarks && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Remarks:" }),
        " ",
        verificationStatus.remarks
      ] }),
      verificationStatus.lastAttemptAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Last Attempt: ",
        new Date(verificationStatus.lastAttemptAt).toLocaleString()
      ] }),
      verificationStatus.verifiedAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Verified At: ",
        new Date(verificationStatus.verifiedAt).toLocaleString()
      ] })
    ] });
  };
  if (statusLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading ID Verification Information..." });
  }
  if (verificationStatus && verificationStatus.status === "verified") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "ID Verification" }),
      renderStatusDetails(),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Your ID has been successfully verified. No further action is needed." })
    ] });
  }
  if (verificationStatus && (verificationStatus.status === "pending" || verificationStatus.status === "needs_review")) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "ID Verification" }),
      renderStatusDetails(),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Your ID verification is currently being processed or requires review. Please check back later." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "National ID Verification" }),
    verificationStatus && renderStatusDetails(),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "nationalIdNumber", children: "National ID Number:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            id: "nationalIdNumber",
            name: "nationalIdNumber",
            value: nationalIdNumber,
            onChange: handleChange,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "fullNameOnId", children: "Full Name (as on ID):" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            id: "fullNameOnId",
            name: "fullNameOnId",
            value: fullNameOnId,
            onChange: handleChange,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "dobOnId", children: "Date of Birth (on ID):" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "date",
            id: "dobOnId",
            name: "dobOnId",
            value: dobOnId,
            onChange: handleChange,
            required: true
          }
        )
      ] }),
      message && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: message.startsWith("ID details submitted successfully") || message.startsWith("Verification successful") ? "green" : "red" }, children: message }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "btn btn-success", disabled: isLoading, children: isLoading ? "Submitting..." : "Submit for Verification" })
    ] })
  ] });
};
function App() {
  useLocation();
  const { isAuthenticated, loading } = reactExports.useContext(AuthContext);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-container", children: [
    " ",
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "main-content", children: [
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Switch, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { exact: true, path: "/", component: HomePage }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/login", render: (props) => isAuthenticated && !loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Redirect, { to: "/dashboard" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LoginPage, { ...props }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/register", render: (props) => isAuthenticated && !loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Redirect, { to: "/dashboard" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RegisterPage, { ...props }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrivateRoute, { exact: true, path: "/dashboard", component: DashboardPage }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrivateRoute, { exact: true, path: "/vehicles", component: VehicleListPage }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrivateRoute, { exact: true, path: "/vehicles/add", component: AddVehiclePage }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrivateRoute, { exact: true, path: "/crew", component: CrewListPage }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrivateRoute, { exact: true, path: "/crew/add", component: AddCrewProfilePage }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrivateRoute, { exact: true, path: "/routes", component: RouteListPage }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrivateRoute, { exact: true, path: "/routes/add", component: AddRoutePage }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrivateRoute, { exact: true, path: "/welfare", component: WelfarePage }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrivateRoute, { exact: true, path: "/payroll", component: PayrollPage }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrivateRoute, { exact: true, path: "/verify-id", component: IDVerificationPage }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "*", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "404 - Page Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The page you are looking for does not exist." })
        ] }) })
      ] })
    ] }),
    " "
  ] });
}
const ThemeContext = reactExports.createContext();
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = reactExports.useState("light");
  const toggleTheme = () => {
    setTheme((prevTheme) => prevTheme === "light" ? "dark" : "light");
  };
  React.useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeContext.Provider, { value: { theme, toggleTheme }, children });
};
ReactDOM.render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ThemeProvider, { children: [
    " ",
    /* @__PURE__ */ jsxRuntimeExports.jsx(App, {})
  ] }) }) }) }),
  document.getElementById("root")
);

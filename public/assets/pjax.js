var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var pjax = { exports: {} };
var foreachEls = function(els, fn, context) {
  if (els instanceof HTMLCollection || els instanceof NodeList || els instanceof Array) {
    return Array.prototype.forEach.call(els, fn, context);
  }
  return fn.call(context, els);
};
var evalScript$1 = function(el) {
  var code = el.text || el.textContent || el.innerHTML || "";
  var src = el.src || "";
  var parent = el.parentNode || document.querySelector("head") || document.documentElement;
  var script = document.createElement("script");
  if (code.match("document.write")) {
    if (console && console.log) {
      console.log(
        "Script contains document.write. Can’t be executed correctly. Code skipped ",
        el
      );
    }
    return false;
  }
  script.type = "text/javascript";
  script.id = el.id;
  if (src !== "") {
    script.src = src;
    script.async = false;
  }
  if (code !== "") {
    try {
      script.appendChild(document.createTextNode(code));
    } catch (e) {
      script.text = code;
    }
  }
  parent.appendChild(script);
  if ((parent instanceof HTMLHeadElement || parent instanceof HTMLBodyElement) && parent.contains(script)) {
    parent.removeChild(script);
  }
  return true;
};
var forEachEls$3 = foreachEls;
var evalScript = evalScript$1;
var executeScripts$1 = function(el) {
  if (el.tagName.toLowerCase() === "script") {
    evalScript(el);
  }
  forEachEls$3(el.querySelectorAll("script"), function(script) {
    if (!script.type || script.type.toLowerCase() === "text/javascript") {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      evalScript(script);
    }
  });
};
var forEachEls$2 = foreachEls;
var on$2 = function(els, events, listener, useCapture) {
  events = typeof events === "string" ? events.split(" ") : events;
  events.forEach(function(e) {
    forEachEls$2(els, function(el) {
      el.addEventListener(e, listener, useCapture);
    });
  });
};
var on$1 = on$2;
var switches$1 = {
  outerHTML: function(oldEl, newEl) {
    oldEl.outerHTML = newEl.outerHTML;
    this.onSwitch();
  },
  innerHTML: function(oldEl, newEl) {
    oldEl.innerHTML = newEl.innerHTML;
    if (newEl.className === "") {
      oldEl.removeAttribute("class");
    } else {
      oldEl.className = newEl.className;
    }
    this.onSwitch();
  },
  switchElementsAlt: function(oldEl, newEl) {
    oldEl.innerHTML = newEl.innerHTML;
    if (newEl.hasAttributes()) {
      var attrs = newEl.attributes;
      for (var i = 0; i < attrs.length; i++) {
        oldEl.attributes.setNamedItem(attrs[i].cloneNode());
      }
    }
    this.onSwitch();
  },
  // Equivalent to outerHTML(), but doesn't require switchElementsAlt() for <head> and <body>
  replaceNode: function(oldEl, newEl) {
    oldEl.parentNode.replaceChild(newEl, oldEl);
    this.onSwitch();
  },
  sideBySide: function(oldEl, newEl, options, switchOptions) {
    var forEach = Array.prototype.forEach;
    var elsToRemove = [];
    var elsToAdd = [];
    var fragToAppend = document.createDocumentFragment();
    var animationEventNames = "animationend webkitAnimationEnd MSAnimationEnd oanimationend";
    var animatedElsNumber = 0;
    var sexyAnimationEnd = (function(e) {
      if (e.target !== e.currentTarget) {
        return;
      }
      animatedElsNumber--;
      if (animatedElsNumber <= 0 && elsToRemove) {
        elsToRemove.forEach(function(el) {
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
        });
        elsToAdd.forEach(function(el) {
          el.className = el.className.replace(
            el.getAttribute("data-pjax-classes"),
            ""
          );
          el.removeAttribute("data-pjax-classes");
        });
        elsToAdd = null;
        elsToRemove = null;
        this.onSwitch();
      }
    }).bind(this);
    switchOptions = switchOptions || {};
    forEach.call(oldEl.childNodes, function(el) {
      elsToRemove.push(el);
      if (el.classList && !el.classList.contains("js-Pjax-remove")) {
        if (el.hasAttribute("data-pjax-classes")) {
          el.className = el.className.replace(
            el.getAttribute("data-pjax-classes"),
            ""
          );
          el.removeAttribute("data-pjax-classes");
        }
        el.classList.add("js-Pjax-remove");
        if (switchOptions.callbacks && switchOptions.callbacks.removeElement) {
          switchOptions.callbacks.removeElement(el);
        }
        if (switchOptions.classNames) {
          el.className += " " + switchOptions.classNames.remove + " " + (options.backward ? switchOptions.classNames.backward : switchOptions.classNames.forward);
        }
        animatedElsNumber++;
        on$1(el, animationEventNames, sexyAnimationEnd, true);
      }
    });
    forEach.call(newEl.childNodes, function(el) {
      if (el.classList) {
        var addClasses = "";
        if (switchOptions.classNames) {
          addClasses = " js-Pjax-add " + switchOptions.classNames.add + " " + (options.backward ? switchOptions.classNames.forward : switchOptions.classNames.backward);
        }
        if (switchOptions.callbacks && switchOptions.callbacks.addElement) {
          switchOptions.callbacks.addElement(el);
        }
        el.className += addClasses;
        el.setAttribute("data-pjax-classes", addClasses);
        elsToAdd.push(el);
        fragToAppend.appendChild(el);
        animatedElsNumber++;
        on$1(el, animationEventNames, sexyAnimationEnd, true);
      }
    });
    oldEl.className = newEl.className;
    oldEl.appendChild(fragToAppend);
  }
};
var defaultSwitches = switches$1;
var parseOptions$1 = function(options) {
  options = options || {};
  options.elements = options.elements || "a[href], form[action]";
  options.selectors = options.selectors || ["title", ".js-Pjax"];
  options.switches = options.switches || {};
  options.switchesOptions = options.switchesOptions || {};
  options.history = typeof options.history === "undefined" ? true : options.history;
  options.analytics = typeof options.analytics === "function" || options.analytics === false ? options.analytics : defaultAnalytics;
  options.scrollTo = typeof options.scrollTo === "undefined" ? 0 : options.scrollTo;
  options.scrollRestoration = typeof options.scrollRestoration !== "undefined" ? options.scrollRestoration : true;
  options.cacheBust = typeof options.cacheBust === "undefined" ? true : options.cacheBust;
  options.debug = options.debug || false;
  options.timeout = options.timeout || 0;
  options.currentUrlFullReload = typeof options.currentUrlFullReload === "undefined" ? false : options.currentUrlFullReload;
  if (!options.switches.head) {
    options.switches.head = defaultSwitches.switchElementsAlt;
  }
  if (!options.switches.body) {
    options.switches.body = defaultSwitches.switchElementsAlt;
  }
  return options;
};
function defaultAnalytics() {
  if (window._gaq) {
    _gaq.push(["_trackPageview"]);
  }
  if (window.ga) {
    ga("send", "pageview", { page: location.pathname, title: document.title });
  }
}
var uniqueid = function() {
  var counter = 0;
  return function() {
    var id = "pjax" + (/* @__PURE__ */ new Date()).getTime() + "_" + counter;
    counter++;
    return id;
  };
}();
var forEachEls$1 = foreachEls;
var trigger$1 = function(els, events, opts) {
  events = typeof events === "string" ? events.split(" ") : events;
  events.forEach(function(e) {
    var event;
    event = document.createEvent("HTMLEvents");
    event.initEvent(e, true, true);
    event.eventName = e;
    if (opts) {
      Object.keys(opts).forEach(function(key) {
        event[key] = opts[key];
      });
    }
    forEachEls$1(els, function(el) {
      var domFix = false;
      if (!el.parentNode && el !== document && el !== window) {
        domFix = true;
        document.body.appendChild(el);
      }
      el.dispatchEvent(event);
      if (domFix) {
        el.parentNode.removeChild(el);
      }
    });
  });
};
var clone$1 = function(obj) {
  if (null === obj || "object" !== typeof obj) {
    return obj;
  }
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) {
      copy[attr] = obj[attr];
    }
  }
  return copy;
};
var contains$1 = function contains(doc, selectors, el) {
  for (var i = 0; i < selectors.length; i++) {
    var selectedEls = doc.querySelectorAll(selectors[i]);
    for (var j = 0; j < selectedEls.length; j++) {
      if (selectedEls[j].contains(el)) {
        return true;
      }
    }
  }
  return false;
};
var extend$1 = function(target) {
  if (target == null) {
    return null;
  }
  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    if (source != null) {
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          to[key] = source[key];
        }
      }
    }
  }
  return to;
};
var noop$1 = function() {
};
var log;
var hasRequiredLog;
function requireLog() {
  if (hasRequiredLog)
    return log;
  hasRequiredLog = 1;
  log = function() {
    if (this.options.debug && console) {
      if (typeof console.log === "function") {
        console.log.apply(console, arguments);
      } else if (console.log) {
        console.log(arguments);
      }
    }
  };
  return log;
}
var parseElement;
var hasRequiredParseElement;
function requireParseElement() {
  if (hasRequiredParseElement)
    return parseElement;
  hasRequiredParseElement = 1;
  var attrState = "data-pjax-state";
  parseElement = function(el) {
    switch (el.tagName.toLowerCase()) {
      case "a":
        if (!el.hasAttribute(attrState)) {
          this.attachLink(el);
        }
        break;
      case "form":
        if (!el.hasAttribute(attrState)) {
          this.attachForm(el);
        }
        break;
      default:
        throw "Pjax can only be applied on <a> or <form> submit";
    }
  };
  return parseElement;
}
var attachLink;
var hasRequiredAttachLink;
function requireAttachLink() {
  if (hasRequiredAttachLink)
    return attachLink;
  hasRequiredAttachLink = 1;
  var on2 = on$2;
  var clone2 = clone$1;
  var attrState = "data-pjax-state";
  var linkAction = function(el, event) {
    if (isDefaultPrevented(event)) {
      return;
    }
    var options = clone2(this.options);
    var attrValue = checkIfShouldAbort(el, event);
    if (attrValue) {
      el.setAttribute(attrState, attrValue);
      return;
    }
    event.preventDefault();
    if (this.options.currentUrlFullReload && el.href === window.location.href.split("#")[0]) {
      el.setAttribute(attrState, "reload");
      this.reload();
      return;
    }
    el.setAttribute(attrState, "load");
    options.triggerElement = el;
    this.loadUrl(el.href, options);
  };
  function checkIfShouldAbort(el, event) {
    if (event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return "modifier";
    }
    if (el.protocol !== window.location.protocol || el.host !== window.location.host) {
      return "external";
    }
    if (el.hash && el.href.replace(el.hash, "") === window.location.href.replace(location.hash, "")) {
      return "anchor";
    }
    if (el.href === window.location.href.split("#")[0] + "#") {
      return "anchor-empty";
    }
  }
  var isDefaultPrevented = function(event) {
    return event.defaultPrevented || event.returnValue === false;
  };
  attachLink = function(el) {
    var that = this;
    el.setAttribute(attrState, "");
    on2(el, "click", function(event) {
      linkAction.call(that, el, event);
    });
    on2(
      el,
      "keyup",
      (function(event) {
        if (event.keyCode === 13) {
          linkAction.call(that, el, event);
        }
      }).bind(this)
    );
  };
  return attachLink;
}
var attachForm;
var hasRequiredAttachForm;
function requireAttachForm() {
  if (hasRequiredAttachForm)
    return attachForm;
  hasRequiredAttachForm = 1;
  var on2 = on$2;
  var clone2 = clone$1;
  var attrState = "data-pjax-state";
  var formAction = function(el, event) {
    if (isDefaultPrevented(event)) {
      return;
    }
    var options = clone2(this.options);
    options.requestOptions = {
      requestUrl: el.getAttribute("action") || window.location.href,
      requestMethod: el.getAttribute("method") || "GET"
    };
    var virtLinkElement = document.createElement("a");
    virtLinkElement.setAttribute("href", options.requestOptions.requestUrl);
    var attrValue = checkIfShouldAbort(virtLinkElement, options);
    if (attrValue) {
      el.setAttribute(attrState, attrValue);
      return;
    }
    event.preventDefault();
    if (el.enctype === "multipart/form-data") {
      options.requestOptions.formData = new FormData(el);
    } else {
      options.requestOptions.requestParams = parseFormElements(el);
    }
    el.setAttribute(attrState, "submit");
    options.triggerElement = el;
    this.loadUrl(virtLinkElement.href, options);
  };
  function parseFormElements(el) {
    var requestParams = [];
    var formElements = el.elements;
    for (var i = 0; i < formElements.length; i++) {
      var element = formElements[i];
      var tagName = element.tagName.toLowerCase();
      if (!!element.name && element.attributes !== void 0 && tagName !== "button") {
        var type = element.attributes.type;
        if (!type || type.value !== "checkbox" && type.value !== "radio" || element.checked) {
          var values = [];
          if (tagName === "select") {
            var opt;
            for (var j = 0; j < element.options.length; j++) {
              opt = element.options[j];
              if (opt.selected && !opt.disabled) {
                values.push(opt.hasAttribute("value") ? opt.value : opt.text);
              }
            }
          } else {
            values.push(element.value);
          }
          for (var k = 0; k < values.length; k++) {
            requestParams.push({
              name: encodeURIComponent(element.name),
              value: encodeURIComponent(values[k])
            });
          }
        }
      }
    }
    return requestParams;
  }
  function checkIfShouldAbort(virtLinkElement, options) {
    if (virtLinkElement.protocol !== window.location.protocol || virtLinkElement.host !== window.location.host) {
      return "external";
    }
    if (virtLinkElement.hash && virtLinkElement.href.replace(virtLinkElement.hash, "") === window.location.href.replace(location.hash, "")) {
      return "anchor";
    }
    if (virtLinkElement.href === window.location.href.split("#")[0] + "#") {
      return "anchor-empty";
    }
    if (options.currentUrlFullReload && virtLinkElement.href === window.location.href.split("#")[0]) {
      return "reload";
    }
  }
  var isDefaultPrevented = function(event) {
    return event.defaultPrevented || event.returnValue === false;
  };
  attachForm = function(el) {
    var that = this;
    el.setAttribute(attrState, "");
    on2(el, "submit", function(event) {
      formAction.call(that, el, event);
    });
  };
  return attachForm;
}
var foreachSelectors;
var hasRequiredForeachSelectors;
function requireForeachSelectors() {
  if (hasRequiredForeachSelectors)
    return foreachSelectors;
  hasRequiredForeachSelectors = 1;
  var forEachEls2 = foreachEls;
  foreachSelectors = function(selectors, cb, context, DOMcontext) {
    DOMcontext = DOMcontext || document;
    selectors.forEach(function(selector) {
      forEachEls2(DOMcontext.querySelectorAll(selector), cb, context);
    });
  };
  return foreachSelectors;
}
var switchesSelectors;
var hasRequiredSwitchesSelectors;
function requireSwitchesSelectors() {
  if (hasRequiredSwitchesSelectors)
    return switchesSelectors;
  hasRequiredSwitchesSelectors = 1;
  var forEachEls2 = foreachEls;
  var defaultSwitches2 = switches$1;
  switchesSelectors = function(switches2, switchesOptions, selectors, fromEl, toEl, options) {
    var switchesQueue = [];
    selectors.forEach(function(selector) {
      var newEls = fromEl.querySelectorAll(selector);
      var oldEls = toEl.querySelectorAll(selector);
      if (this.log) {
        this.log("Pjax switch", selector, newEls, oldEls);
      }
      if (newEls.length !== oldEls.length) {
        throw "DOM doesn’t look the same on new loaded page: ’" + selector + "’ - new " + newEls.length + ", old " + oldEls.length;
      }
      forEachEls2(
        newEls,
        function(newEl, i) {
          var oldEl = oldEls[i];
          if (this.log) {
            this.log("newEl", newEl, "oldEl", oldEl);
          }
          var callback = switches2[selector] ? switches2[selector].bind(
            this,
            oldEl,
            newEl,
            options,
            switchesOptions[selector]
          ) : defaultSwitches2.outerHTML.bind(this, oldEl, newEl, options);
          switchesQueue.push(callback);
        },
        this
      );
    }, this);
    this.state.numPendingSwitches = switchesQueue.length;
    switchesQueue.forEach(function(queuedSwitch) {
      queuedSwitch();
    });
  };
  return switchesSelectors;
}
var abortRequest;
var hasRequiredAbortRequest;
function requireAbortRequest() {
  if (hasRequiredAbortRequest)
    return abortRequest;
  hasRequiredAbortRequest = 1;
  var noop2 = noop$1;
  abortRequest = function(request) {
    if (request && request.readyState < 4) {
      request.onreadystatechange = noop2;
      request.abort();
    }
  };
  return abortRequest;
}
var updateQueryString;
var hasRequiredUpdateQueryString;
function requireUpdateQueryString() {
  if (hasRequiredUpdateQueryString)
    return updateQueryString;
  hasRequiredUpdateQueryString = 1;
  updateQueryString = function(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf("?") !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, "$1" + key + "=" + value + "$2");
    } else {
      return uri + separator + key + "=" + value;
    }
  };
  return updateQueryString;
}
var sendRequest;
var hasRequiredSendRequest;
function requireSendRequest() {
  if (hasRequiredSendRequest)
    return sendRequest;
  hasRequiredSendRequest = 1;
  var updateQueryString2 = requireUpdateQueryString();
  sendRequest = function(location2, options, callback) {
    options = options || {};
    var queryString;
    var requestOptions = options.requestOptions || {};
    var requestMethod = (requestOptions.requestMethod || "GET").toUpperCase();
    var requestParams = requestOptions.requestParams || null;
    var formData = requestOptions.formData || null;
    var requestPayload = null;
    var request = new XMLHttpRequest();
    var timeout = options.timeout || 0;
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          callback(request.responseText, request, location2, options);
        } else if (request.status !== 0) {
          callback(null, request, location2, options);
        }
      }
    };
    request.onerror = function(e) {
      console.log(e);
      callback(null, request, location2, options);
    };
    request.ontimeout = function() {
      callback(null, request, location2, options);
    };
    if (requestParams && requestParams.length) {
      queryString = requestParams.map(function(param) {
        return param.name + "=" + param.value;
      }).join("&");
      switch (requestMethod) {
        case "GET":
          location2 = location2.split("?")[0];
          location2 += "?" + queryString;
          break;
        case "POST":
          requestPayload = queryString;
          break;
      }
    } else if (formData) {
      requestPayload = formData;
    }
    if (options.cacheBust) {
      location2 = updateQueryString2(location2, "t", Date.now());
    }
    request.open(requestMethod, location2, true);
    request.timeout = timeout;
    request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    request.setRequestHeader("X-PJAX", "true");
    request.setRequestHeader(
      "X-PJAX-Selectors",
      JSON.stringify(options.selectors)
    );
    if (requestPayload && requestMethod === "POST" && !formData) {
      request.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
    }
    request.send(requestPayload);
    return request;
  };
  return sendRequest;
}
var handleResponse;
var hasRequiredHandleResponse;
function requireHandleResponse() {
  if (hasRequiredHandleResponse)
    return handleResponse;
  hasRequiredHandleResponse = 1;
  var clone2 = clone$1;
  var newUid2 = uniqueid;
  var trigger2 = trigger$1;
  handleResponse = function(responseText, request, href, options) {
    options = clone2(options || this.options);
    options.request = request;
    if (responseText === false) {
      trigger2(document, "pjax:complete pjax:error", options);
      return;
    }
    // var currentState = window.history.state || {};
    // window.history.replaceState(
    //   {
    //     url: currentState.url || window.location.href,
    //     title: currentState.title || document.title,
    //     uid: currentState.uid || newUid2(),
    //     scrollPos: [
    //       document.documentElement.scrollLeft || document.body.scrollLeft,
    //       document.documentElement.scrollTop || document.body.scrollTop
    //     ]
    //   },
    //   document.title,
    //   window.location.href
    // );

    var oldHref = href;
    if (request.responseURL) {
      if (href !== request.responseURL) {
        href = request.responseURL;
      }
    } else if (request.getResponseHeader("X-PJAX-URL")) {
      href = request.getResponseHeader("X-PJAX-URL");
    } else if (request.getResponseHeader("X-XHR-Redirected-To")) {
      href = request.getResponseHeader("X-XHR-Redirected-To");
    }
    var a = document.createElement("a");
    a.href = oldHref;
    var oldHash = a.hash;
    a.href = href;
    if (oldHash && !a.hash) {
      a.hash = oldHash;
      href = a.href;
    }
    this.state.href = href;
    this.state.options = options;
    try {
      this.loadContent(responseText, options);
    } catch (e) {
      trigger2(document, "pjax:error", options);
      if (!this.options.debug) {
        if (console && console.error) {
          console.error("Pjax switch fail: ", e);
        }
        return this.latestChance(href);
      } else {
        throw e;
      }
    }
  };
  return handleResponse;
}
var isSupported;
var hasRequiredIsSupported;
function requireIsSupported() {
  if (hasRequiredIsSupported)
    return isSupported;
  hasRequiredIsSupported = 1;
  isSupported = function() {
    return window.history && window.history.pushState && window.history.replaceState &&
    !navigator.userAgent.match(
      /((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/
    );
  };
  return isSupported;
}
var executeScripts = executeScripts$1;
var forEachEls = foreachEls;
var parseOptions = parseOptions$1;
var switches = switches$1;
var newUid = uniqueid;
var on = on$2;
var trigger = trigger$1;
var clone = clone$1;
var contains2 = contains$1;
var extend = extend$1;
var noop = noop$1;
var Pjax = function(options) {
  this.state = {
    numPendingSwitches: 0,
    href: null,
    options: null
  };
  this.options = parseOptions(options);
  this.log("Pjax options", this.options);
  if (this.options.scrollRestoration && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  this.maxUid = this.lastUid = newUid();
  this.parseDOM(document);
  on(
    window,
    "popstate",
    (function(st) {
      if (st.state) {
        var opt = clone(this.options);
        opt.url = st.state.url;
        opt.title = st.state.title;
        opt.history = false;
        opt.scrollPos = st.state.scrollPos;
        if (st.state.uid < this.lastUid) {
          opt.backward = true;
        } else {
          opt.forward = true;
        }
        this.lastUid = st.state.uid;
        this.loadUrl(st.state.url, opt);
      }
    }).bind(this)
  );
};
Pjax.switches = switches;
Pjax.prototype = {
  log: requireLog(),
  getElements: function(el) {
    return el.querySelectorAll(this.options.elements);
  },
  parseDOM: function(el) {
    // var parseElement2 = requireParseElement();
    // forEachEls(this.getElements(el), parseElement2, this);
  },
  refresh: function(el) {
    this.parseDOM(el || document);
  },
  reload: function() {
    window.location.reload();
  },
  attachLink: requireAttachLink(),
  attachForm: requireAttachForm(),
  forEachSelectors: function(cb, context, DOMcontext) {
    return requireForeachSelectors().bind(this)(
      this.options.selectors,
      cb,
      context,
      DOMcontext
    );
  },
  switchSelectors: function(selectors, fromEl, toEl, options) {
    return requireSwitchesSelectors().bind(this)(
      this.options.switches,
      this.options.switchesOptions,
      selectors,
      fromEl,
      toEl,
      options
    );
  },
  latestChance: function(href) {
    window.location = href;
  },
  onSwitch: function() {
    trigger(window, "resize scroll");
    this.state.numPendingSwitches--;
    if (this.state.numPendingSwitches === 0) {
      this.afterAllSwitches();
    }
  },
  loadContent: function(html, options) {
    if (typeof html !== "string") {
      trigger(document, "pjax:complete pjax:error", options);
      return;
    }
    var tmpEl = document.implementation.createHTMLDocument("pjax");
    var htmlRegex = /<html[^>]+>/gi;
    var htmlAttribsRegex = /\s?[a-z:]+(?:=['"][^'">]+['"])*/gi;
    var matches = html.match(htmlRegex);
    if (matches && matches.length) {
      matches = matches[0].match(htmlAttribsRegex);
      if (matches.length) {
        matches.shift();
        matches.forEach(function(htmlAttrib) {
          var attr = htmlAttrib.trim().split("=");
          if (attr.length === 1) {
            tmpEl.documentElement.setAttribute(attr[0], true);
          } else {
            tmpEl.documentElement.setAttribute(attr[0], attr[1].slice(1, -1));
          }
        });
      }
    }
    tmpEl.documentElement.innerHTML = html;
    this.log(
      "load content",
      tmpEl.documentElement.attributes,
      tmpEl.documentElement.innerHTML.length
    );
    if (document.activeElement && contains2(document, this.options.selectors, document.activeElement)) {
      try {
        document.activeElement.blur();
      } catch (e) {
      }
    }
    this.switchSelectors(this.options.selectors, tmpEl, document, options);
  },
  abortRequest: requireAbortRequest(),
  doRequest: requireSendRequest(),
  handleResponse: requireHandleResponse(),
  loadUrl: function(href, options) {
    options = typeof options === "object" ? extend({}, this.options, options) : clone(this.options);
    this.log("load href", href, options);
    this.abortRequest(this.request);
    trigger(document, "pjax:send", options);
    this.request = this.doRequest(
      href,
      options,
      this.handleResponse.bind(this)
    );
  },
  afterAllSwitches: function() {
    var autofocusEl = Array.prototype.slice.call(document.querySelectorAll("[autofocus]")).pop();
    if (autofocusEl && document.activeElement !== autofocusEl) {
      autofocusEl.focus();
    }
    this.options.selectors.forEach(function(selector) {
      forEachEls(document.querySelectorAll(selector), function(el) {
        executeScripts(el);
      });
    });
    var state = this.state;
    if (state.options.history) {
      if (!window.history.state) {
        this.lastUid = this.maxUid = newUid();
        // window.history.replaceState(
        //   {
        //     url: window.location.href,
        //     title: document.title,
        //     uid: this.maxUid,
        //     scrollPos: [0, 0]
        //   },
        //   document.title
        // );
      }
      this.lastUid = this.maxUid = newUid();
      // window.history.pushState(
      //   {
      //     url: state.href,
      //     title: state.options.title,
      //     uid: this.maxUid,
      //     scrollPos: [0, 0]
      //   },
      //   state.options.title,
      //   state.href
      // );
    }
    this.forEachSelectors(function(el) {
      this.parseDOM(el);
    }, this);
    trigger(document, "pjax:complete pjax:success", state.options);
    if (typeof state.options.analytics === "function") {
      state.options.analytics();
    }
    if (state.options.history) {
      var a = document.createElement("a");
      a.href = this.state.href;
      if (a.hash) {
        var name = a.hash.slice(1);
        name = decodeURIComponent(name);
        var curtop = 0;
        var target = document.getElementById(name) || document.getElementsByName(name)[0];
        if (target) {
          if (target.offsetParent) {
            do {
              curtop += target.offsetTop;
              target = target.offsetParent;
            } while (target);
          }
        }
        window.scrollTo(0, curtop);
      } else if (state.options.scrollTo !== false) {
        if (state.options.scrollTo.length > 1) {
          window.scrollTo(state.options.scrollTo[0], state.options.scrollTo[1]);
        } else {
          window.scrollTo(0, state.options.scrollTo);
        }
      }
    } else if (state.options.scrollRestoration && state.options.scrollPos) {
      window.scrollTo(state.options.scrollPos[0], state.options.scrollPos[1]);
    }
    this.state = {
      numPendingSwitches: 0,
      href: null,
      options: null
    };
  }
};
Pjax.isSupported = requireIsSupported();
if (Pjax.isSupported()) {
  pjax.exports = Pjax;
} else {
  var stupidPjax = noop;
  for (var key in Pjax.prototype) {
    if (Pjax.prototype.hasOwnProperty(key) && typeof Pjax.prototype[key] === "function") {
      stupidPjax[key] = noop;
    }
  }
  pjax.exports = stupidPjax;
}
var pjaxExports = pjax.exports;
const Pjax$1 = /* @__PURE__ */ getDefaultExportFromCjs(pjaxExports);
let _currentPageId = "";
let _nextPageId = "";
class geral {
  /* -------------------------------------------------------------------------- */
  /*                                 CONSTRUCTOR                                */
  /* -------------------------------------------------------------------------- */
  constructor() {
    this.currentPageId = document.querySelector(".wrapper").id;
  }
  /* -------------------------------------------------------------------------- */
  /*                               IDs das páginas                              */
  /* -------------------------------------------------------------------------- */
  get currentPageId() {
    return _currentPageId;
  }
  set currentPageId(newId) {
    _currentPageId = newId.substring(3);
    document.body.dataset.pg = newId;
    this.nextPageId = "";
  }
  get nextPageId() {
    return _nextPageId;
  }
  set nextPageId(newId) {
    _nextPageId = newId.substring(3);
    document.body.dataset.pgNext = newId.length > 0 ? "pg-" + _nextPageId : "";
  }
  /* -------------------------------------------------------------------------- */
  /*                                    TOKEN                                   */
  /* -------------------------------------------------------------------------- */
  get token() {
    return document.querySelector('meta[name="csrf-token"]').content;
  }
}
const geral$1 = new geral();
function manualModalClose() {
  document.querySelectorAll("modal-group.active", "modal-item.active").forEach((element) => {
    document.dispatchEvent(new CustomEvent("modal:close"));
    document.removeEventListener("keydown", this);
    document.body.dataset.modalState = "leave";
    element.classList.remove("active");
    element.classList.add("leave");
    setTimeout(() => {
      element.classList.remove("leave");
      delete document.body.dataset.modalState;
      delete document.body.dataset.modal;
      delete document.body.dataset.modalItem;
    }, 600);
  });
}
Pjax$1.prototype.getElements = function() {
  let links = Array.from(document.querySelectorAll("a:not(.no-pjax):not([data-fancybox])"));
  links = links.filter((el) => el.href.includes(location.hostname));
  links.forEach((element) => {
    element.addEventListener("click", function() {
      manualModalClose();
      document.body.dataset.pgPrev = document.body.dataset.pg;
      if (element.dataset.pgActive)
        document.body.dataset.pgNext = element.dataset.pgActive;
    });
  });
  let dataUrl = Array.from(document.querySelectorAll("[data-url]"));
  dataUrl.forEach((el) => el.onclick = () => {
    singlePjaxInstance.loadUrl(el.dataset.url);
  });
  function serializeFormData(form) {
    const formData = new URLSearchParams(new FormData(form)).toString();
    return formData;
  }
  function clearQueryParams(url) {
    return url.split("?")[0];
  }
  function handleSelectChange(event) {
    const serializedData = serializeFormData(event.target.form);
    const baseActionUrl = clearQueryParams(event.target.form.action);
    const fullUrl = serializedData ? `${baseActionUrl}?${serializedData}` : baseActionUrl;
    document.body.dataset.pgPrev = document.body.dataset.pg;
    if (event.target.form.dataset.pgActive)
      document.body.dataset.pgNext = event.target.form.dataset.pgActive;
    singlePjaxInstance.loadUrl(fullUrl);
  }
  let forms = Array.from(document.querySelectorAll("form[data-pjax]"));
  forms.forEach((form) => {
    if (form.dataset.eventsAttached) {
      return;
    }
    let selects = form.querySelectorAll("select.submit-on-change");
    selects.forEach((select) => {
      select.addEventListener("change", handleSelectChange);
    });
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      document.body.dataset.pgPrev = document.body.dataset.pg;
      if (form.dataset.pgActive)
        document.body.dataset.pgNext = form.dataset.pgActive;
      if (form.method.toUpperCase() === "GET") {
        const serializedData = serializeFormData(form);
        const baseActionUrl = clearQueryParams(form.action);
        const fullUrl = serializedData ? `${baseActionUrl}?${serializedData}` : baseActionUrl;
        singlePjaxInstance.loadUrl(fullUrl);
      }
    });
    form.dataset.eventsAttached = "true";
  });
  return links;
};
const delay = window.innerWidth < 1025 ? 900 : 900;
const singlePjaxInstance = new Pjax$1({
  elements: "a[href]",
  cacheBust: false,
  debug: false,
  selectors: [
    "title",
    "#scripts",
    ".wrapper"
    // ,".language--list"
  ],
  maxCacheLength: 20,
  timeout: 0,
  scrollTo: 0,
  switches: {
    "title": function(oldEl, newEl, options) {
      setTimeout(() => {
        document.title = newEl.textContent;
        this.onSwitch();
      }, delay);
    },
    "#scripts": function(oldEl, newEl, options) {
      setTimeout(() => {
        oldEl.innerHTML = newEl.innerHTML;
        this.onSwitch();
      }, delay);
    },
    ".wrapper": function(oldEl, newEl, options) {
      geral$1.nextPageId = newEl.id;
      setTimeout(() => {
        document.dispatchEvent(new CustomEvent("pjax:switch"));
      }, delay - 10);
      setTimeout(() => {
        oldEl.outerHTML = newEl.outerHTML;
        geral$1.currentPageId = newEl.id;
        this.onSwitch();
      }, delay);
    }
    /* se tiver em só um lugar */
    // ".language--list": function (oldEl, newEl, options) {
    //     setTimeout(() => {
    //         oldEl.innerHTML = newEl.innerHTML;
    //         this.onSwitch();
    //     }, delay);
    // },
    /* se tiver em dois lugares diferentes */
    // ".language--list-header": function (oldEl, newEl, options) {
    //     setTimeout(() => {
    //         oldEl.innerHTML = newEl.innerHTML;
    //         this.onSwitch();
    //     }, delay);
    // },
    // ".language--list-footer": function (oldEl, newEl, options) {
    //     setTimeout(() => {
    //         oldEl.innerHTML = newEl.innerHTML;
    //         this.onSwitch();
    //     }, delay);
    // },
    /* transição de wrapper com os 2 em telas simultaneamente */
    /*
            ".wrapper": function (oldEl, newEl, options) {
                geral.nextPageId = newEl.id;
    
             
                // Adiciona a nova página abaixo da atual
                oldEl.parentNode.insertBefore(newEl, oldEl.nextSibling);
            
                // Inicia a animação
                oldEl.classList.add("page-out");
                newEl.classList.add("page-in");
    
    
                setTimeout(() => {
                    document.dispatchEvent(new CustomEvent('pjax:switch'))
                }, delay - 10);
                setTimeout(() => {
                    newEl.classList.remove("page-in");
                    oldEl.remove(); // Remove a página antiga
                    geral.currentPageId = newEl.id;
                    this.onSwitch();
                }, delay);
            },
            */
  }
});
export {
  getDefaultExportFromCjs as a,
  commonjsGlobal as c,
  geral$1 as g,
  manualModalClose as m,
  singlePjaxInstance as s
};

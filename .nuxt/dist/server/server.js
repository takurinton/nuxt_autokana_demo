"use strict";
var __assign = Object.assign;
Object.defineProperty(exports, "__esModule", {value: true});
exports[Symbol.toStringTag] = "Module";
var Vue = require("vue");
var fetch = require("node-fetch");
var Meta = require("vue-meta");
var ClientOnly = require("vue-client-only");
var NoSsr = require("vue-no-ssr");
var Router = require("vue-router");
function _interopDefaultLegacy(e2) {
  return e2 && typeof e2 === "object" && "default" in e2 ? e2 : {default: e2};
}
var Vue__default = /* @__PURE__ */ _interopDefaultLegacy(Vue);
var fetch__default = /* @__PURE__ */ _interopDefaultLegacy(fetch);
var Meta__default = /* @__PURE__ */ _interopDefaultLegacy(Meta);
var ClientOnly__default = /* @__PURE__ */ _interopDefaultLegacy(ClientOnly);
var NoSsr__default = /* @__PURE__ */ _interopDefaultLegacy(NoSsr);
var Router__default = /* @__PURE__ */ _interopDefaultLegacy(Router);
const n = /[^\0-\x7E]/;
const t = /[\x2E\u3002\uFF0E\uFF61]/g;
const o = {overflow: "Overflow Error", "not-basic": "Illegal Input", "invalid-input": "Invalid Input"};
const e = Math.floor;
const r = String.fromCharCode;
function s(n2) {
  throw new RangeError(o[n2]);
}
const c = function(n2, t2) {
  return n2 + 22 + 75 * (n2 < 26) - ((t2 != 0) << 5);
};
const u = function(n2, t2, o2) {
  let r2 = 0;
  for (n2 = o2 ? e(n2 / 700) : n2 >> 1, n2 += e(n2 / t2); n2 > 455; r2 += 36) {
    n2 = e(n2 / 35);
  }
  return e(r2 + 36 * n2 / (n2 + 38));
};
function toASCII(o2) {
  return function(n2, o3) {
    const e2 = n2.split("@");
    let r2 = "";
    e2.length > 1 && (r2 = e2[0] + "@", n2 = e2[1]);
    const s2 = function(n3, t2) {
      const o4 = [];
      let e3 = n3.length;
      for (; e3--; ) {
        o4[e3] = t2(n3[e3]);
      }
      return o4;
    }((n2 = n2.replace(t, ".")).split("."), o3).join(".");
    return r2 + s2;
  }(o2, function(t2) {
    return n.test(t2) ? "xn--" + function(n2) {
      const t3 = [];
      const o3 = (n2 = function(n3) {
        const t4 = [];
        let o4 = 0;
        const e2 = n3.length;
        for (; o4 < e2; ) {
          const r2 = n3.charCodeAt(o4++);
          if (r2 >= 55296 && r2 <= 56319 && o4 < e2) {
            const e3 = n3.charCodeAt(o4++);
            (64512 & e3) == 56320 ? t4.push(((1023 & r2) << 10) + (1023 & e3) + 65536) : (t4.push(r2), o4--);
          } else {
            t4.push(r2);
          }
        }
        return t4;
      }(n2)).length;
      let f = 128;
      let i = 0;
      let l = 72;
      for (const o4 of n2) {
        o4 < 128 && t3.push(r(o4));
      }
      const h = t3.length;
      let p = h;
      for (h && t3.push("-"); p < o3; ) {
        let o4 = 2147483647;
        for (const t4 of n2) {
          t4 >= f && t4 < o4 && (o4 = t4);
        }
        const a = p + 1;
        o4 - f > e((2147483647 - i) / a) && s("overflow"), i += (o4 - f) * a, f = o4;
        for (const o5 of n2) {
          if (o5 < f && ++i > 2147483647 && s("overflow"), o5 == f) {
            let n3 = i;
            for (let o6 = 36; ; o6 += 36) {
              const s2 = o6 <= l ? 1 : o6 >= l + 26 ? 26 : o6 - l;
              if (n3 < s2) {
                break;
              }
              const u2 = n3 - s2;
              const f2 = 36 - s2;
              t3.push(r(c(s2 + u2 % f2, 0))), n3 = e(u2 / f2);
            }
            t3.push(r(c(n3, 0))), l = u(i, a, p == h), i = 0, ++p;
          }
        }
        ++i, ++f;
      }
      return t3.join("");
    }(t2) : t2;
  });
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_CARET_RE = /%5E/g;
const ENC_BACKTICK_RE = /%60/g;
const ENC_CURLY_OPEN_RE = /%7B/g;
const ENC_PIPE_RE = /%7C/g;
const ENC_CURLY_CLOSE_RE = /%7D/g;
const ENC_SPACE_RE = /%20/g;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text) {
  return encode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text) {
  return encode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return encode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch (_err) {
    return "" + text;
  }
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function encodeHost(name = "") {
  return toASCII(name);
}
function parseQuery(paramsStr = "") {
  const obj = {};
  if (paramsStr[0] === "?") {
    paramsStr = paramsStr.substr(1);
  }
  for (const param of paramsStr.split("&")) {
    const s2 = param.match(/([^=]+)=?(.*)/) || [];
    if (s2.length < 2) {
      continue;
    }
    const key = decode(s2[1]);
    const value = decodeQueryValue(s2[2] || "");
    if (obj[key]) {
      if (Array.isArray(obj[key])) {
        obj[key].push(value);
      } else {
        obj[key] = [obj[key], value];
      }
    } else {
      obj[key] = value;
    }
  }
  return obj;
}
function encodeQueryItem(key, val) {
  if (!val) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(val)) {
    return val.map((_val) => `${encodeQueryKey(key)}=${encodeQueryValue(_val)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(val)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).map((k) => encodeQueryItem(k, query[k])).join("&");
}
class $URL {
  constructor(input = "") {
    this.query = {};
    if (typeof input !== "string") {
      throw new TypeError(`URL input should be string received ${typeof input} (${input})`);
    }
    const parsed = parseURL(input);
    this.protocol = decode(parsed.protocol);
    this.host = decode(parsed.host);
    this.auth = decode(parsed.auth);
    this.pathname = decode(parsed.pathname);
    this.query = parseQuery(parsed.search);
    this.hash = decode(parsed.hash);
  }
  get hostname() {
    return parseHost(this.host).hostname;
  }
  get port() {
    return parseHost(this.host).port || "";
  }
  get username() {
    return parseAuth(this.auth).username;
  }
  get password() {
    return parseAuth(this.auth).password || "";
  }
  get hasProtocol() {
    return this.protocol.length;
  }
  get isAbsolute() {
    return this.hasProtocol || this.pathname[0] === "/";
  }
  get search() {
    const q = stringifyQuery(this.query);
    return q.length ? "?" + q : "";
  }
  get searchParams() {
    const p = new URLSearchParams();
    for (const name in this.query) {
      const value = this.query[name];
      if (Array.isArray(value)) {
        value.forEach((v) => p.append(name, v));
      } else {
        p.append(name, value || "");
      }
    }
    return p;
  }
  get origin() {
    return (this.protocol ? this.protocol + "//" : "") + encodeHost(this.host);
  }
  get fullpath() {
    return encodePath(this.pathname) + this.search + encodeHash(this.hash);
  }
  get encodedAuth() {
    if (!this.auth) {
      return "";
    }
    const {username, password} = parseAuth(this.auth);
    return encodeURIComponent(username) + (password ? ":" + encodeURIComponent(password) : "");
  }
  get href() {
    const auth = this.encodedAuth;
    const originWithAuth = (this.protocol ? this.protocol + "//" : "") + (auth ? auth + "@" : "") + encodeHost(this.host);
    return this.hasProtocol && this.isAbsolute ? originWithAuth + this.fullpath : this.fullpath;
  }
  append(url) {
    if (url.hasProtocol) {
      throw new Error("Cannot append a URL with protocol");
    }
    Object.assign(this.query, url.query);
    if (url.pathname) {
      this.pathname = withTrailingSlash(this.pathname) + withoutLeadingSlash(url.pathname);
    }
    if (url.hash) {
      this.hash = url.hash;
    }
  }
  toJSON() {
    return this.href;
  }
  toString() {
    return this.href;
  }
}
function hasProtocol(inputStr, acceptProtocolRelative = false) {
  return /^\w+:\/\/.+/.test(inputStr) || acceptProtocolRelative && /^\/\/[^/]+/.test(inputStr);
}
function withTrailingSlash(input = "") {
  return input.endsWith("/") ? input : input + "/";
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withoutLeadingSlash(input = "") {
  return (hasLeadingSlash(input) ? input.substr(1) : input) || "/";
}
function withQuery(input, query2) {
  const parsed = parseURL(input);
  const mergedQuery = __assign(__assign({}, parseQuery(parsed.search)), query2);
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function isNonEmptyURL(url2) {
  return url2 && url2 !== "/";
}
function joinURL(base, ...input) {
  let url2 = base || "";
  for (const i of input.filter(isNonEmptyURL)) {
    const part = withoutLeadingSlash(i);
    url2 = withTrailingSlash(url2) + part;
  }
  return url2;
}
function createURL(input) {
  return new $URL(input);
}
function normalizeURL(input) {
  return createURL(input).toString();
}
function parseURL(input = "") {
  if (!hasProtocol(input, true)) {
    return parsePath(input);
  }
  const [protocol = "", auth, hostAndPath] = (input.match(/([^:/]+:)?\/\/([^/@]+@)?(.*)/) || []).splice(1);
  const [host = "", path = ""] = (hostAndPath.match(/([^/]*)(.*)?/) || []).splice(1);
  const {pathname, search, hash} = parsePath(path);
  return {
    protocol,
    auth: auth ? auth.substr(0, auth.length - 1) : "",
    host,
    pathname,
    search,
    hash
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function parseAuth(input = "") {
  const [username, password] = input.split(":");
  return {
    username: decode(username),
    password: decode(password)
  };
}
function parseHost(input = "") {
  const [hostname, port] = (input.match(/([^/]*)(:0-9+)?/) || []).splice(1);
  return {
    hostname: decode(hostname),
    port
  };
}
function stringifyParsedURL(parsed) {
  const fullpath = parsed.pathname + (parsed.search ? "?" + parsed.search : "") + parsed.hash;
  if (!parsed.protocol) {
    return fullpath;
  }
  return parsed.protocol + "//" + (parsed.auth ? parsed.auth + "@" : "") + parsed.host + fullpath;
}
const middleware = {};
function createGetCounter(counterObject, defaultKey = "") {
  return function getCounter(id = defaultKey) {
    if (counterObject[id] === void 0) {
      counterObject[id] = 0;
    }
    return counterObject[id]++;
  };
}
function globalHandleError(error) {
  if (Vue__default["default"].config.errorHandler) {
    Vue__default["default"].config.errorHandler(error);
  }
}
function interopDefault(promise) {
  return promise.then((m) => m.default || m);
}
function hasFetch(vm) {
  return vm.$options && typeof vm.$options.fetch === "function" && !vm.$options.fetch.length;
}
function purifyData(data) {
  return Object.entries(data).filter(([key, value]) => {
    const valid = !(value instanceof Function) && !(value instanceof Promise);
    if (!valid) {
      console.warn(`${key} is not able to be stringified. This will break in a production environment.`);
    }
    return valid;
  }).reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});
}
function getChildrenComponentInstancesUsingFetch(vm, instances = []) {
  const children = vm.$children || [];
  for (const child of children) {
    if (child.$fetch) {
      instances.push(child);
      continue;
    }
    if (child.$children) {
      getChildrenComponentInstancesUsingFetch(child, instances);
    }
  }
  return instances;
}
function applyAsyncData(Component, asyncData) {
  if (!asyncData && Component.options.__hasNuxtData) {
    return;
  }
  const ComponentData = Component.options._originDataFn || Component.options.data || function() {
    return {};
  };
  Component.options._originDataFn = ComponentData;
  Component.options.data = function() {
    const data = ComponentData.call(this, this);
    if (this.$ssrContext) {
      asyncData = this.$ssrContext.asyncData[Component.cid];
    }
    return __assign(__assign({}, data), asyncData);
  };
  Component.options.__hasNuxtData = true;
  if (Component._Ctor && Component._Ctor.options) {
    Component._Ctor.options.data = Component.options.data;
  }
}
function sanitizeComponent(Component) {
  if (Component.options && Component._Ctor === Component) {
    return Component;
  }
  if (!Component.options) {
    Component = Vue__default["default"].extend(Component);
    Component._Ctor = Component;
  } else {
    Component._Ctor = Component;
    Component.extendOptions = Component.options;
  }
  if (!Component.options.name && Component.options.__file) {
    Component.options.name = Component.options.__file;
  }
  return Component;
}
function getMatchedComponents(route, matches = false, prop = "components") {
  return Array.prototype.concat.apply([], route.matched.map((m, index2) => {
    return Object.keys(m[prop]).map((key) => {
      matches && matches.push(index2);
      return m[prop][key];
    });
  }));
}
function getMatchedComponentsInstances(route, matches = false) {
  return getMatchedComponents(route, matches, "instances");
}
function flatMapComponents(route, fn) {
  return Array.prototype.concat.apply([], route.matched.map((m, index2) => {
    return Object.keys(m.components).reduce((promises, key) => {
      if (m.components[key]) {
        promises.push(fn(m.components[key], m.instances[key], m, key, index2));
      } else {
        delete m.components[key];
      }
      return promises;
    }, []);
  }));
}
function resolveRouteComponents(route, fn) {
  return Promise.all(flatMapComponents(route, async (Component, instance, match, key) => {
    if (typeof Component === "function" && !Component.options) {
      Component = await Component();
    }
    match.components[key] = Component = sanitizeComponent(Component);
    return typeof fn === "function" ? fn(Component, instance, match, key) : Component;
  }));
}
async function getRouteData(route) {
  if (!route) {
    return;
  }
  await resolveRouteComponents(route);
  return __assign(__assign({}, route), {
    meta: getMatchedComponents(route).map((Component, index2) => {
      return __assign(__assign({}, Component.options.meta), (route.matched[index2] || {}).meta);
    })
  });
}
async function setContext(app, context) {
  if (!app.context) {
    app.context = {
      isStatic: process.static,
      isDev: true,
      isHMR: false,
      app,
      payload: context.payload,
      error: context.error,
      base: app.router.options.base,
      env: {}
    };
    if (context.req) {
      app.context.req = context.req;
    }
    if (context.res) {
      app.context.res = context.res;
    }
    if (context.ssrContext) {
      app.context.ssrContext = context.ssrContext;
    }
    app.context.redirect = (status, path, query) => {
      if (!status) {
        return;
      }
      app.context._redirected = true;
      let pathType = typeof path;
      if (typeof status !== "number" && (pathType === "undefined" || pathType === "object")) {
        query = path || {};
        path = status;
        pathType = typeof path;
        status = 302;
      }
      if (pathType === "object") {
        path = app.router.resolve(path).route.fullPath;
      }
      if (/(^[.]{1,2}\/)|(^\/(?!\/))/.test(path)) {
        app.context.next({
          path,
          query,
          status
        });
      } else {
        path = withQuery(path, query);
        {
          app.context.next({
            path,
            status
          });
        }
      }
    };
    {
      app.context.beforeNuxtRender = (fn) => context.beforeRenderFns.push(fn);
    }
  }
  const [currentRouteData, fromRouteData] = await Promise.all([
    getRouteData(context.route),
    getRouteData(context.from)
  ]);
  if (context.route) {
    app.context.route = currentRouteData;
  }
  if (context.from) {
    app.context.from = fromRouteData;
  }
  app.context.next = context.next;
  app.context._redirected = false;
  app.context._errored = false;
  app.context.isHMR = Boolean(context.isHMR);
  app.context.params = app.context.route.params || {};
  app.context.query = app.context.route.query || {};
}
function middlewareSeries(promises, appContext) {
  if (!promises.length || appContext._redirected || appContext._errored) {
    return Promise.resolve();
  }
  return promisify(promises[0], appContext).then(() => {
    return middlewareSeries(promises.slice(1), appContext);
  });
}
function promisify(fn, context) {
  let promise;
  if (fn.length === 2) {
    console.warn("Callback-based asyncData, fetch or middleware calls are deprecated. Please switch to promises or async/await syntax");
    promise = new Promise((resolve) => {
      fn(context, function(err, data) {
        if (err) {
          context.error(err);
        }
        data = data || {};
        resolve(data);
      });
    });
  } else {
    promise = fn(context);
  }
  if (promise && promise instanceof Promise && typeof promise.then === "function") {
    return promise;
  }
  return Promise.resolve(promise);
}
function getLocation(base, mode) {
  if (mode === "hash") {
    return (void 0).undefined.hash.replace(/^#\//, "");
  }
  base = decodeURI(base).slice(0, -1);
  let path = decodeURI((void 0).undefined.pathname);
  if (base && path.startsWith(base)) {
    path = path.slice(base.length);
  }
  const fullPath = (path || "/") + (void 0).undefined.search + (void 0).undefined.hash;
  return normalizeURL(fullPath);
}
function compile(str, options) {
  return tokensToFunction(parse(str, options), options);
}
function normalizeError(err) {
  let message;
  if (!(err.message || typeof err === "string")) {
    try {
      message = JSON.stringify(err, null, 2);
    } catch (e2) {
      message = `[${err.constructor.name}]`;
    }
  } else {
    message = err.message || err;
  }
  return __assign(__assign({}, err), {
    message,
    statusCode: err.statusCode || err.status || err.response && err.response.status || 500
  });
}
const PATH_REGEXP = new RegExp([
  "(\\\\.)",
  "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"
].join("|"), "g");
function parse(str, options) {
  const tokens = [];
  let key = 0;
  let index2 = 0;
  let path = "";
  const defaultDelimiter = options && options.delimiter || "/";
  let res;
  while ((res = PATH_REGEXP.exec(str)) != null) {
    const m = res[0];
    const escaped = res[1];
    const offset = res.index;
    path += str.slice(index2, offset);
    index2 = offset + m.length;
    if (escaped) {
      path += escaped[1];
      continue;
    }
    const next = str[index2];
    const prefix = res[2];
    const name = res[3];
    const capture = res[4];
    const group = res[5];
    const modifier = res[6];
    const asterisk = res[7];
    if (path) {
      tokens.push(path);
      path = "";
    }
    const partial = prefix != null && next != null && next !== prefix;
    const repeat = modifier === "+" || modifier === "*";
    const optional = modifier === "?" || modifier === "*";
    const delimiter = res[2] || defaultDelimiter;
    const pattern = capture || group;
    tokens.push({
      name: name || key++,
      prefix: prefix || "",
      delimiter,
      optional,
      repeat,
      partial,
      asterisk: Boolean(asterisk),
      pattern: pattern ? escapeGroup(pattern) : asterisk ? ".*" : "[^" + escapeString(delimiter) + "]+?"
    });
  }
  if (index2 < str.length) {
    path += str.substr(index2);
  }
  if (path) {
    tokens.push(path);
  }
  return tokens;
}
function encodeURIComponentPretty(str, slashAllowed) {
  const re = slashAllowed ? /[?#]/g : /[/?#]/g;
  return encodeURI(str).replace(re, (c2) => {
    return "%" + c2.charCodeAt(0).toString(16).toUpperCase();
  });
}
function encodeAsterisk(str) {
  return encodeURIComponentPretty(str, true);
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function escapeGroup(group) {
  return group.replace(/([=!:$/()])/g, "\\$1");
}
function tokensToFunction(tokens, options) {
  const matches = new Array(tokens.length);
  for (let i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === "object") {
      matches[i] = new RegExp("^(?:" + tokens[i].pattern + ")$", flags(options));
    }
  }
  return function(obj, opts) {
    let path = "";
    const data = obj || {};
    const options2 = opts || {};
    const encode2 = options2.pretty ? encodeURIComponentPretty : encodeURIComponent;
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (typeof token === "string") {
        path += token;
        continue;
      }
      const value = data[token.name || "pathMatch"];
      let segment;
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
      if (Array.isArray(value)) {
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
        for (let j = 0; j < value.length; j++) {
          segment = encode2(value[j]);
          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + "`");
          }
          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }
        continue;
      }
      segment = token.asterisk ? encodeAsterisk(value) : encode2(value);
      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }
      path += token.prefix + segment;
    }
    return path;
  };
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function addLifecycleHook(vm, hook, fn) {
  if (!vm.$options[hook]) {
    vm.$options[hook] = [];
  }
  if (!vm.$options[hook].includes(fn)) {
    vm.$options[hook].push(fn);
  }
}
async function serverPrefetch() {
  if (!this._fetchOnServer) {
    return;
  }
  try {
    await this.$options.fetch.call(this);
  } catch (err) {
    if (process.dev) {
      console.error("Error in fetch():", err);
    }
    this.$fetchState.error = normalizeError(err);
  }
  this.$fetchState.pending = false;
  this._fetchKey = this._fetchKey || this.$ssrContext.fetchCounters[""]++;
  const attrs = this.$vnode.data.attrs = this.$vnode.data.attrs || {};
  attrs["data-fetch-key"] = this._fetchKey;
  if (this.$ssrContext.nuxt.fetch[this._fetchKey] !== void 0) {
    console.warn(`Duplicate fetch key detected (${this._fetchKey}). This may lead to unexpected results.`);
  }
  this.$ssrContext.nuxt.fetch[this._fetchKey] = this.$fetchState.error ? {_error: this.$fetchState.error} : purifyData(this._data);
}
var fetchMixin = {
  created() {
    if (!hasFetch(this)) {
      return;
    }
    if (typeof this.$options.fetchOnServer === "function") {
      this._fetchOnServer = this.$options.fetchOnServer.call(this) !== false;
    } else {
      this._fetchOnServer = this.$options.fetchOnServer !== false;
    }
    const defaultKey = this.$options._scopeId || this.$options.name || "";
    const getCounter = createGetCounter(this.$ssrContext.fetchCounters, defaultKey);
    if (typeof this.$options.fetchKey === "function") {
      this._fetchKey = this.$options.fetchKey.call(this, getCounter);
    } else {
      const key = typeof this.$options.fetchKey === "string" ? this.$options.fetchKey : defaultKey;
      this._fetchKey = key ? key + ":" + getCounter(key) : String(getCounter(key));
    }
    this.$fetch = () => {
    };
    Vue__default["default"].util.defineReactive(this, "$fetchState", {
      pending: true,
      error: null,
      timestamp: Date.now()
    });
    addLifecycleHook(this, "serverPrefetch", serverPrefetch);
  }
};
function shouldScrollToTop(route) {
  const Pages = getMatchedComponents(route);
  if (Pages.length === 1) {
    const {options = {}} = Pages[0];
    return options.scrollToTop !== false;
  }
  return Pages.some(({options}) => options && options.scrollToTop);
}
function scrollBehavior(to, from, savedPosition) {
  let position = false;
  const isRouteChanged = to !== from;
  if (savedPosition) {
    position = savedPosition;
  } else if (isRouteChanged && shouldScrollToTop(to)) {
    position = {x: 0, y: 0};
  }
  const nuxt = (void 0).$nuxt;
  if (!isRouteChanged || to.path === from.path && to.hash !== from.hash) {
    nuxt.$nextTick(() => nuxt.$emit("triggerScroll"));
  }
  return new Promise((resolve) => {
    nuxt.$once("triggerScroll", () => {
      if (to.hash) {
        let hash = to.hash;
        if (typeof (void 0).CSS !== "undefined")
          ;
        try {
          if ((void 0).querySelector(hash)) {
            position = {selector: hash};
          }
        } catch (e2) {
          console.warn("Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).");
        }
      }
      resolve(position);
    });
  });
}
const _1d79d2b8 = () => interopDefault(Promise.resolve().then(function() {
  return index$1;
}));
const emptyFn = () => {
};
Vue__default["default"].use(Router__default["default"]);
const routerOptions = {
  mode: "history",
  base: "/",
  linkActiveClass: "nuxt-link-active",
  linkExactActiveClass: "nuxt-link-exact-active",
  scrollBehavior,
  routes: [{
    path: "/",
    component: _1d79d2b8,
    name: "index"
  }],
  fallback: false
};
function createRouter(ssrContext, config) {
  const base = config.app && config.app.basePath || routerOptions.base;
  const router = new Router__default["default"](__assign(__assign({}, routerOptions), {base}));
  const originalPush = router.push;
  router.push = function push(undefined$1, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, undefined$1, onComplete, onAbort);
  };
  const resolve = router.resolve.bind(router);
  router.resolve = (to, current, append) => {
    if (typeof to === "string") {
      to = normalizeURL(to);
    }
    return resolve(to, current, append);
  };
  return router;
}
var NuxtChild = {
  name: "NuxtChild",
  functional: true,
  props: {
    nuxtChildKey: {
      type: String,
      default: ""
    },
    keepAlive: Boolean,
    keepAliveProps: {
      type: Object,
      default: void 0
    }
  },
  render(_, {parent, data, props}) {
    const h = parent.$createElement;
    data.nuxtChild = true;
    const _parent = parent;
    const transitions = parent.$nuxt.nuxt.transitions;
    const defaultTransition2 = parent.$nuxt.nuxt.defaultTransition;
    let depth = 0;
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.nuxtChild) {
        depth++;
      }
      parent = parent.$parent;
    }
    data.nuxtChildDepth = depth;
    const transition = transitions[depth] || defaultTransition2;
    const transitionProps = {};
    transitionsKeys.forEach((key) => {
      if (typeof transition[key] !== "undefined") {
        transitionProps[key] = transition[key];
      }
    });
    const listeners = {};
    listenersKeys.forEach((key) => {
      if (typeof transition[key] === "function") {
        listeners[key] = transition[key].bind(_parent);
      }
    });
    if (transition.css === false) {
      const leave = listeners.leave;
      if (!leave || leave.length < 2) {
        listeners.leave = (el, done) => {
          if (leave) {
            leave.call(_parent, el);
          }
          _parent.$nextTick(done);
        };
      }
    }
    let routerView = h("routerView", data);
    if (props.keepAlive) {
      routerView = h("keep-alive", {props: props.keepAliveProps}, [routerView]);
    }
    return h("transition", {
      props: transitionProps,
      on: listeners
    }, [routerView]);
  }
};
const transitionsKeys = [
  "name",
  "mode",
  "appear",
  "css",
  "type",
  "duration",
  "enterClass",
  "leaveClass",
  "appearClass",
  "enterActiveClass",
  "enterActiveClass",
  "leaveActiveClass",
  "appearActiveClass",
  "enterToClass",
  "leaveToClass",
  "appearToClass"
];
const listenersKeys = [
  "beforeEnter",
  "enter",
  "afterEnter",
  "enterCancelled",
  "beforeLeave",
  "leave",
  "afterLeave",
  "leaveCancelled",
  "beforeAppear",
  "appear",
  "afterAppear",
  "appearCancelled"
];
var render$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {staticClass: "__nuxt-error-page"}, [_c("div", {staticClass: "error"}, [_c("svg", {attrs: {xmlns: "http://www.w3.org/2000/svg", width: "90", height: "90", fill: "#DBE1EC", viewBox: "0 0 48 48"}}, [_c("path", {attrs: {d: "M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"}})]), _vm._v(" "), _c("div", {staticClass: "title"}, [_vm._v(_vm._s(_vm.message))]), _vm._v(" "), _vm.statusCode === 404 ? _c("p", {staticClass: "description"}, [typeof _vm.$route === "undefined" ? _c("a", {staticClass: "error-link", attrs: {href: "/"}}) : _c("NuxtLink", {staticClass: "error-link", attrs: {to: "/"}}, [_vm._v("Back to the home page")])], 1) : _c("p", {staticClass: "description"}, [_vm._v("An error occurred while rendering the page. Check developer tools console for details.")]), _vm._v(" "), _vm._m(0)])]);
};
var staticRenderFns$3 = [function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {staticClass: "logo"}, [_c("a", {attrs: {href: "https://nuxtjs.org", target: "_blank", rel: "noopener"}}, [_vm._v("Nuxt")])]);
}];
render$3._withStripped = true;
var nuxtError_vue_vue_type_style_index_0_lang = "\n.__nuxt-error-page {\n  padding: 1rem;\n  background: #F7F8FB;\n  color: #47494E;\n  text-align: center;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  font-family: sans-serif;\n  font-weight: 100 !important;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n  -webkit-font-smoothing: antialiased;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n.__nuxt-error-page .error {\n  max-width: 450px;\n}\n.__nuxt-error-page .title {\n  font-size: 1.5rem;\n  margin-top: 15px;\n  color: #47494E;\n  margin-bottom: 8px;\n}\n.__nuxt-error-page .description {\n  color: #7F828B;\n  line-height: 21px;\n  margin-bottom: 10px;\n}\n.__nuxt-error-page a {\n  color: #7F828B !important;\n  text-decoration: none;\n}\n.__nuxt-error-page .logo {\n  position: fixed;\n  left: 12px;\n  bottom: 12px;\n}\n";
function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles2, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles2) {
        injectStyles2.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles2) {
    hook = shadowMode ? function() {
      injectStyles2.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
    } : injectStyles2;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
const script$3 = {
  name: "NuxtError",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    statusCode() {
      return this.error && this.error.statusCode || 500;
    },
    message() {
      return this.error.message || "Error";
    }
  },
  head() {
    return {
      title: this.message,
      meta: [
        {
          name: "viewport",
          content: "width=device-width,initial-scale=1.0,minimum-scale=1.0"
        }
      ]
    };
  }
};
const __cssModules$3 = {};
var component$3 = normalizeComponent(script$3, render$3, staticRenderFns$3, false, injectStyles$3, null, null, null);
function injectStyles$3(context) {
  for (let o2 in __cssModules$3) {
    this[o2] = __cssModules$3[o2];
  }
}
var NuxtError = component$3.exports;
var Nuxt = {
  name: "Nuxt",
  components: {
    NuxtChild,
    NuxtError
  },
  props: {
    nuxtChildKey: {
      type: String,
      default: void 0
    },
    keepAlive: Boolean,
    keepAliveProps: {
      type: Object,
      default: void 0
    },
    name: {
      type: String,
      default: "default"
    }
  },
  errorCaptured(error) {
    if (this.displayingNuxtError) {
      this.errorFromNuxtError = error;
      this.$forceUpdate();
    }
  },
  computed: {
    routerViewKey() {
      if (typeof this.nuxtChildKey !== "undefined" || this.$route.matched.length > 1) {
        return this.nuxtChildKey || compile(this.$route.matched[0].path)(this.$route.params);
      }
      const [matchedRoute] = this.$route.matched;
      if (!matchedRoute) {
        return this.$route.path;
      }
      const Component = matchedRoute.components.default;
      if (Component && Component.options) {
        const {options} = Component;
        if (options.key) {
          return typeof options.key === "function" ? options.key(this.$route) : options.key;
        }
      }
      const strict = /\/$/.test(matchedRoute.path);
      return strict ? this.$route.path : this.$route.path.replace(/\/$/, "");
    }
  },
  beforeCreate() {
    Vue__default["default"].util.defineReactive(this, "nuxt", this.$root.$options.nuxt);
  },
  render(h) {
    if (!this.nuxt.err) {
      return h("NuxtChild", {
        key: this.routerViewKey,
        props: this.$props
      });
    }
    if (this.errorFromNuxtError) {
      this.$nextTick(() => this.errorFromNuxtError = false);
      return h("div", {}, [
        h("h2", "An error occurred while showing the error page"),
        h("p", "Unfortunately an error occurred and while showing the error page another error occurred"),
        h("p", `Error details: ${this.errorFromNuxtError.toString()}`),
        h("nuxt-link", {props: {to: "/"}}, "Go back to home")
      ]);
    }
    this.displayingNuxtError = true;
    this.$nextTick(() => this.displayingNuxtError = false);
    return h(NuxtError, {
      props: {
        error: this.nuxt.err
      }
    });
  }
};
var nuxtLoading_vue_vue_type_style_index_0_lang = "\n.nuxt-progress {\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  right: 0px;\n  height: 2px;\n  width: 0%;\n  opacity: 1;\n  transition: width 0.1s, opacity 0.4s;\n  background-color: black;\n  z-index: 999999;\n}\n.nuxt-progress.nuxt-progress-notransition {\n  transition: none;\n}\n.nuxt-progress-failed {\n  background-color: red;\n}\n";
const script$2 = {
  name: "NuxtLoading",
  data() {
    return {
      percent: 0,
      show: false,
      canSucceed: true,
      reversed: false,
      skipTimerCount: 0,
      rtl: false,
      throttle: 200,
      duration: 5e3,
      continuous: false
    };
  },
  computed: {
    left() {
      if (!this.continuous && !this.rtl) {
        return false;
      }
      return this.rtl ? this.reversed ? "0px" : "auto" : !this.reversed ? "0px" : "auto";
    }
  },
  beforeDestroy() {
    this.clear();
  },
  methods: {
    clear() {
      clearInterval(this._timer);
      clearTimeout(this._throttle);
      this._timer = null;
    },
    start() {
      this.clear();
      this.percent = 0;
      this.reversed = false;
      this.skipTimerCount = 0;
      this.canSucceed = true;
      if (this.throttle) {
        this._throttle = setTimeout(() => this.startTimer(), this.throttle);
      } else {
        this.startTimer();
      }
      return this;
    },
    set(num) {
      this.show = true;
      this.canSucceed = true;
      this.percent = Math.min(100, Math.max(0, Math.floor(num)));
      return this;
    },
    get() {
      return this.percent;
    },
    increase(num) {
      this.percent = Math.min(100, Math.floor(this.percent + num));
      return this;
    },
    decrease(num) {
      this.percent = Math.max(0, Math.floor(this.percent - num));
      return this;
    },
    pause() {
      clearInterval(this._timer);
      return this;
    },
    resume() {
      this.startTimer();
      return this;
    },
    finish() {
      this.percent = this.reversed ? 0 : 100;
      this.hide();
      return this;
    },
    hide() {
      this.clear();
      setTimeout(() => {
        this.show = false;
        this.$nextTick(() => {
          this.percent = 0;
          this.reversed = false;
        });
      }, 500);
      return this;
    },
    fail(error) {
      this.canSucceed = false;
      return this;
    },
    startTimer() {
      if (!this.show) {
        this.show = true;
      }
      if (typeof this._cut === "undefined") {
        this._cut = 1e4 / Math.floor(this.duration);
      }
      this._timer = setInterval(() => {
        if (this.skipTimerCount > 0) {
          this.skipTimerCount--;
          return;
        }
        if (this.reversed) {
          this.decrease(this._cut);
        } else {
          this.increase(this._cut);
        }
        if (this.continuous) {
          if (this.percent >= 100) {
            this.skipTimerCount = 1;
            this.reversed = !this.reversed;
          } else if (this.percent <= 0) {
            this.skipTimerCount = 1;
            this.reversed = !this.reversed;
          }
        }
      }, 100);
    }
  },
  render(h) {
    let el = h(false);
    if (this.show) {
      el = h("div", {
        staticClass: "nuxt-progress",
        class: {
          "nuxt-progress-notransition": this.skipTimerCount > 0,
          "nuxt-progress-failed": !this.canSucceed
        },
        style: {
          width: this.percent + "%",
          left: this.left
        }
      });
    }
    return el;
  }
};
let render$2, staticRenderFns$2;
const __cssModules$2 = {};
var component$2 = normalizeComponent(script$2, render$2, staticRenderFns$2, false, injectStyles$2, null, null, null);
function injectStyles$2(context) {
  for (let o2 in __cssModules$2) {
    this[o2] = __cssModules$2[o2];
  }
}
var NuxtLoading = component$2.exports;
var render$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("Nuxt");
};
var staticRenderFns$1 = [];
render$1._withStripped = true;
const script$1 = {};
const __cssModules$1 = {};
var component$1 = normalizeComponent(script$1, render$1, staticRenderFns$1, false, injectStyles$1, null, null, null);
function injectStyles$1(context) {
  for (let o2 in __cssModules$1) {
    this[o2] = __cssModules$1[o2];
  }
}
var _6f6c098b = component$1.exports;
const layouts = {_default: sanitizeComponent(_6f6c098b)};
var App = {
  render(h, props) {
    const loadingEl = h("NuxtLoading", {ref: "loading"});
    const layoutEl = h(this.layout || "nuxt");
    const templateEl = h("div", {
      domProps: {
        id: "__layout"
      },
      key: this.layoutName
    }, [layoutEl]);
    const transitionEl = h("transition", {
      props: {
        name: "layout",
        mode: "out-in"
      },
      on: {
        beforeEnter(el) {
          (void 0).$nuxt.$nextTick(() => {
            (void 0).$nuxt.$emit("triggerScroll");
          });
        }
      }
    }, [templateEl]);
    return h("div", {
      domProps: {
        id: "__nuxt"
      }
    }, [
      loadingEl,
      transitionEl
    ]);
  },
  data: () => ({
    isOnline: true,
    layout: null,
    layoutName: "",
    nbFetching: 0
  }),
  beforeCreate() {
    Vue__default["default"].util.defineReactive(this, "nuxt", this.$options.nuxt);
  },
  created() {
    this.$root.$options.$nuxt = this;
    this.error = this.nuxt.error;
    this.context = this.$options.context;
  },
  async mounted() {
    this.$loading = this.$refs.loading;
  },
  watch: {
    "nuxt.err": "errorChanged"
  },
  computed: {
    isOffline() {
      return !this.isOnline;
    },
    isFetching() {
      return this.nbFetching > 0;
    }
  },
  methods: {
    refreshOnlineStatus() {
    },
    async refresh() {
      const pages = getMatchedComponentsInstances(this.$route);
      if (!pages.length) {
        return;
      }
      this.$loading.start();
      const promises = pages.map((page) => {
        const p = [];
        if (page.$options.fetch && page.$options.fetch.length) {
          p.push(promisify(page.$options.fetch, this.context));
        }
        if (page.$fetch) {
          p.push(page.$fetch());
        } else {
          for (const component2 of getChildrenComponentInstancesUsingFetch(page.$vnode.componentInstance)) {
            p.push(component2.$fetch());
          }
        }
        if (page.$options.asyncData) {
          p.push(promisify(page.$options.asyncData, this.context).then((newData) => {
            for (const key in newData) {
              Vue__default["default"].set(page.$data, key, newData[key]);
            }
          }));
        }
        return Promise.all(p);
      });
      try {
        await Promise.all(promises);
      } catch (error) {
        this.$loading.fail(error);
        globalHandleError(error);
        this.error(error);
      }
      this.$loading.finish();
    },
    errorChanged() {
      if (this.nuxt.err) {
        if (this.$loading) {
          if (this.$loading.fail) {
            this.$loading.fail(this.nuxt.err);
          }
          if (this.$loading.finish) {
            this.$loading.finish();
          }
        }
        let errorLayout = (NuxtError.options || NuxtError).layout;
        if (typeof errorLayout === "function") {
          errorLayout = errorLayout(this.context);
        }
        this.setLayout(errorLayout);
      }
    },
    setLayout(layout) {
      if (layout && typeof layout !== "string") {
        throw new Error("[nuxt] Avoid using non-string value as layout property.");
      }
      if (!layout || !layouts["_" + layout]) {
        layout = "default";
      }
      this.layoutName = layout;
      this.layout = layouts["_" + layout];
      return this.layout;
    },
    loadLayout(layout) {
      if (!layout || !layouts["_" + layout]) {
        layout = "default";
      }
      return Promise.resolve(layouts["_" + layout]);
    }
  },
  components: {
    NuxtLoading
  }
};
Vue__default["default"].component(ClientOnly__default["default"].name, ClientOnly__default["default"]);
Vue__default["default"].component(NoSsr__default["default"].name, __assign(__assign({}, NoSsr__default["default"]), {
  render(h, ctx) {
    return NoSsr__default["default"].render(h, ctx);
  }
}));
Vue__default["default"].component(NuxtChild.name, NuxtChild);
Vue__default["default"].component("NChild", NuxtChild);
Vue__default["default"].component(Nuxt.name, Nuxt);
Object.defineProperty(Vue__default["default"].prototype, "$nuxt", {
  get() {
    return this.$root.$options.$nuxt;
  },
  configurable: true
});
Vue__default["default"].use(Meta__default["default"], {keyName: "head", attribute: "data-n-head", ssrAttribute: "data-n-head-ssr", tagIDKeyName: "hid"});
const defaultTransition = {name: "page", mode: "out-in", appear: false, appearClass: "appear", appearActiveClass: "appear-active", appearToClass: "appear-to"};
async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config);
  const app = __assign({
    head: {meta: [], link: [], style: [], script: []},
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions(transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions];
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition;
          } else if (typeof transition === "string") {
            transition = Object.assign({}, defaultTransition, {name: transition});
          } else {
            transition = Object.assign({}, defaultTransition, transition);
          }
          return transition;
        });
        this.$options.nuxt.transitions = transitions;
        return transitions;
      },
      err: null,
      dateErr: null,
      error(err) {
        err = err || null;
        app.context._errored = Boolean(err);
        err = err ? normalizeError(err) : null;
        let nuxt = app.nuxt;
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt;
        }
        nuxt.dateErr = Date.now();
        nuxt.err = err;
        if (ssrContext) {
          ssrContext.nuxt.error = err;
        }
        return err;
      }
    }
  }, App);
  const next = ssrContext ? ssrContext.next : (undefined$1) => app.router.push(undefined$1);
  let route;
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route;
  } else {
    const path = getLocation(router.options.base, router.options.mode);
    route = router.resolve(path).route;
  }
  await setContext(app, {
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : void 0,
    req: ssrContext ? ssrContext.req : void 0,
    res: ssrContext ? ssrContext.res : void 0,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : void 0,
    ssrContext
  });
  function inject(key, value) {
    if (!key) {
      throw new Error("inject(key, value) has no key provided");
    }
    if (value === void 0) {
      throw new Error(`inject('${key}', value) has no value provided`);
    }
    key = "$" + key;
    app[key] = value;
    if (!app.context[key]) {
      app.context[key] = value;
    }
    const installKey = "__nuxt_" + key + "_installed__";
    if (Vue__default["default"][installKey]) {
      return;
    }
    Vue__default["default"][installKey] = true;
    Vue__default["default"].use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue__default["default"].prototype, key)) {
        Object.defineProperty(Vue__default["default"].prototype, key, {
          get() {
            return this.$root.$options[key];
          }
        });
      }
    });
  }
  inject("config", config);
  if (process.static && false) {
    app.context.enablePreview = function(previewData = {}) {
      app.previewData = Object.assign({}, previewData);
      inject("preview", previewData);
    };
  }
  if (process.static && false) {
    app.context.enablePreview = function() {
      console.warn("You cannot call enablePreview() outside a plugin.");
    };
  }
  if (ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, (err) => {
        if (!err._isRouter)
          return reject(err);
        if (err.type !== 2)
          return resolve();
        const unregister = router.afterEach(async (to, from) => {
          ssrContext.url = to.fullPath;
          app.context.route = await getRouteData(to);
          app.context.params = to.params || {};
          app.context.query = to.query || {};
          unregister();
          resolve();
        });
      });
    });
  }
  return {
    app,
    router
  };
}
var NuxtLink = {
  name: "NuxtLink",
  extends: Vue__default["default"].component("RouterLink"),
  props: {
    prefetch: {
      type: Boolean,
      default: true
    },
    noPrefetch: {
      type: Boolean,
      default: false
    }
  }
};
Vue__default["default"].config.optionMergeStrategies.serverPrefetch = Vue__default["default"].config.optionMergeStrategies.created;
if (!Vue__default["default"].__nuxt__fetch__mixin__) {
  Vue__default["default"].mixin(fetchMixin);
  Vue__default["default"].__nuxt__fetch__mixin__ = true;
}
if (!Vue__default["default"].__original_use__) {
  Vue__default["default"].__original_use__ = Vue__default["default"].use;
  Vue__default["default"].__install_times__ = 0;
  Vue__default["default"].use = function(plugin, ...args) {
    plugin.__nuxt_external_installed__ = Vue__default["default"]._installedPlugins.includes(plugin);
    return Vue__default["default"].__original_use__(plugin, ...args);
  };
}
if (Vue__default["default"].__install_times__ === 2) {
  Vue__default["default"].__install_times__ = 0;
  Vue__default["default"]._installedPlugins = Vue__default["default"]._installedPlugins.filter((plugin) => {
    return plugin.__nuxt_external_installed__ === true;
  });
}
Vue__default["default"].__install_times__++;
Vue__default["default"].component(NuxtLink.name, NuxtLink);
Vue__default["default"].component("NLink", NuxtLink);
if (!global.fetch) {
  global.fetch = fetch__default["default"];
}
const noopApp = () => new Vue__default["default"]({render: (h) => h("div", {domProps: {id: "__nuxt"}})});
const createNext = (ssrContext) => (opts) => {
  ssrContext.redirected = opts;
  if (ssrContext.target === "static" || !ssrContext.res) {
    ssrContext.nuxt.serverRendered = false;
    return;
  }
  let fullPath = withQuery(opts.path, opts.query);
  const $config = ssrContext.runtimeConfig || {};
  const routerBase = $config.app && $config.app.basePath || "/";
  if (!fullPath.startsWith("http") && (routerBase !== "/" && !fullPath.startsWith(routerBase))) {
    fullPath = joinURL(routerBase, fullPath);
  }
  if (decodeURI(fullPath) === decodeURI(ssrContext.url)) {
    ssrContext.redirected = false;
    return;
  }
  ssrContext.res.writeHead(opts.status, {
    Location: normalizeURL(fullPath)
  });
  ssrContext.res.end();
};
var server = async (ssrContext) => {
  ssrContext.redirected = false;
  ssrContext.next = createNext(ssrContext);
  ssrContext.beforeRenderFns = [];
  ssrContext.nuxt = {layout: "default", data: [], fetch: {}, error: null, serverRendered: true, routePath: ""};
  ssrContext.fetchCounters = {};
  ssrContext.nuxt.config = ssrContext.runtimeConfig.public;
  if (ssrContext.nuxt.config.app) {
    globalThis.__webpack_public_path__ = joinURL(ssrContext.nuxt.config.app.cdnURL, ssrContext.nuxt.config.app.assetsPath);
  }
  const {app, router} = await createApp(ssrContext, ssrContext.runtimeConfig.private);
  const _app = new Vue__default["default"](app);
  ssrContext.nuxt.routePath = app.context.route.path;
  ssrContext.meta = _app.$meta();
  ssrContext.asyncData = {};
  const beforeRender = async () => {
    await Promise.all(ssrContext.beforeRenderFns.map((fn) => promisify(fn, {Components, nuxtState: ssrContext.nuxt})));
  };
  const renderErrorPage = async () => {
    if (ssrContext.target === "static") {
      ssrContext.nuxt.serverRendered = false;
    }
    const layout2 = (NuxtError.options || NuxtError).layout;
    const errLayout = typeof layout2 === "function" ? layout2.call(NuxtError, app.context) : layout2;
    ssrContext.nuxt.layout = errLayout || "default";
    await _app.loadLayout(errLayout);
    _app.setLayout(errLayout);
    await beforeRender();
    return _app;
  };
  const render404Page = () => {
    app.context.error({statusCode: 404, path: ssrContext.url, message: "This page could not be found"});
    return renderErrorPage();
  };
  const Components = getMatchedComponents(router.match(ssrContext.url));
  let midd = [];
  midd = midd.map((name) => {
    if (typeof name === "function") {
      return name;
    }
    if (typeof middleware[name] !== "function") {
      app.context.error({statusCode: 500, message: "Unknown middleware " + name});
    }
    return middleware[name];
  });
  await middlewareSeries(midd, app.context);
  if (ssrContext.redirected) {
    return noopApp();
  }
  if (ssrContext.nuxt.error) {
    return renderErrorPage();
  }
  let layout = Components.length ? Components[0].options.layout : NuxtError.layout;
  if (typeof layout === "function") {
    layout = layout(app.context);
  }
  await _app.loadLayout(layout);
  if (ssrContext.nuxt.error) {
    return renderErrorPage();
  }
  layout = _app.setLayout(layout);
  ssrContext.nuxt.layout = _app.layoutName;
  midd = [];
  layout = sanitizeComponent(layout);
  if (layout.options.middleware) {
    midd = midd.concat(layout.options.middleware);
  }
  Components.forEach((Component) => {
    if (Component.options.middleware) {
      midd = midd.concat(Component.options.middleware);
    }
  });
  midd = midd.map((name) => {
    if (typeof name === "function") {
      return name;
    }
    if (typeof middleware[name] !== "function") {
      app.context.error({statusCode: 500, message: "Unknown middleware " + name});
    }
    return middleware[name];
  });
  await middlewareSeries(midd, app.context);
  if (ssrContext.redirected) {
    return noopApp();
  }
  if (ssrContext.nuxt.error) {
    return renderErrorPage();
  }
  let isValid = true;
  try {
    for (const Component of Components) {
      if (typeof Component.options.validate !== "function") {
        continue;
      }
      isValid = await Component.options.validate(app.context);
      if (!isValid) {
        break;
      }
    }
  } catch (validationError) {
    app.context.error({
      statusCode: validationError.statusCode || "500",
      message: validationError.message
    });
    return renderErrorPage();
  }
  if (!isValid) {
    return render404Page();
  }
  if (!Components.length) {
    return render404Page();
  }
  const asyncDatas = await Promise.all(Components.map((Component) => {
    const promises = [];
    if (Component.options.asyncData && typeof Component.options.asyncData === "function") {
      const promise = promisify(Component.options.asyncData, app.context);
      promise.then((asyncDataResult) => {
        ssrContext.asyncData[Component.cid] = asyncDataResult;
        applyAsyncData(Component);
        return asyncDataResult;
      });
      promises.push(promise);
    } else {
      promises.push(null);
    }
    if (Component.options.fetch && Component.options.fetch.length) {
      promises.push(Component.options.fetch(app.context));
    } else {
      promises.push(null);
    }
    return Promise.all(promises);
  }));
  ssrContext.nuxt.data = asyncDatas.map((r2) => r2[0] || {});
  if (ssrContext.redirected) {
    return noopApp();
  }
  if (ssrContext.nuxt.error) {
    return renderErrorPage();
  }
  await beforeRender();
  return _app;
};
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  _vm._self._c || _h;
  return _vm._m(0);
};
var staticRenderFns = [function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("main", [_c("br"), _vm._v(" "), _c("h1", [_vm._v("harunonsan no yatu")])]);
}];
render._withStripped = true;
var index_vue_vue_type_style_index_0_scoped_true_lang = "\nmain[data-v-2e52ee06] {\n  text-align: center;\n}\n.logo[data-v-2e52ee06] {\n  width: 200px;\n  height: 200px;\n  display: inline-block;\n}\n";
const script = {};
const __cssModules = {};
var component = normalizeComponent(script, render, staticRenderFns, false, injectStyles, "2e52ee06", null, null);
function injectStyles(context) {
  for (let o2 in __cssModules) {
    this[o2] = __cssModules[o2];
  }
}
var index = component.exports;
var index$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: index
});
exports.default = server;

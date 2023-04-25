globalThis.$ = $;

/*! (c) Andrea Giammarchi - ISC */
const { isArray } = Array;
const wm = new WeakMap;

const utils = {
  // $(node).stuff(...)
  attr(...args) {
    for (const node of this) {
      if (args.length < 2)
        return node.getAttribute(args[0]);
      node.setAttribute(...args);
    }
    return $(this);
  },

  css(...args) {
    for (const node of this) {
      if (args.length < 2)
        return getComputedStyle(node)[args[0]];
      node.style[args[0]] = args[1];
    }
    return $(this);
  },

  each(callback) {
    for (let i = 0; i < this.length; i++)
      callback.call(this[i], i);
    return $(this);
  },

  html(...args) {
    for (const node of this) {
      if (!args.length)
        return node.innerHTML;
      node.innerHTML = args.join('');
    }
    return $(this);
  },

  // $(document).ready(...)
  ready(callback) {
    for (const node of this) {
      if (/interactive|complete/.test(node.readyState))
        callback.call(node);
      else
        node.addEventListener('DOMContentLoaded', callback, { once: true });
    }
    return $(this);
  },

  // handles all event listeners
  ['@'](type, ...args) {
    for (const node of this) {
      if (args.length)
        node.addEventListener(type, ...args);
      else
        node.dispatchEvent(new Event(type));
    }
    return $(this);
  }
};

const handler = {
  getPrototypeOf: () => $.prototype,
  get: (nodes, util) => {
    if (util === 'length')
      return nodes.length;
    if (util in utils)
      return utils[util].bind(nodes);
    return utils['@'].bind(nodes, util);
  }
};

const wrap = nodes => {
  // ensure either arrays or nodes as $(node) are proxied once
  const proxy = new Proxy(isArray(nodes) ? nodes : [nodes], handler);
  wm.set(nodes, proxy);
  return proxy;
};

function $(nodes, root = document) {
  return typeof nodes === 'string' ?
    $([...root.querySelectorAll(nodes)]) :
    (nodes instanceof $ ? nodes : (wm.get(nodes) || wrap(nodes)));
}

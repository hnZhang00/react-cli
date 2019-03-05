
export const isString = str => typeof str === 'string';

export const isHTMLElement = node => typeof node === 'object' && node !== null && node.nodeType && node.nodeName;

export const isFunction = o => typeof o === 'function';

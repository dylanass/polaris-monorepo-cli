"use strict";

/**
 * @description 获取 registry url
 * @return {string} url
 * npm源：https ://registry.npmjs.org
 * 淘宝源：https://registry.npmmirror.com
 */
function getDefaultRegistry() {
  var isOriginal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return isOriginal ? 'https ://registry.npmjs.org' : 'https://registry.npmmirror.com';
}

module.exports = getDefaultRegistry;
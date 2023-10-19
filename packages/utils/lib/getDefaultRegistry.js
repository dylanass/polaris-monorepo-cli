/**
 * @description 获取 registry url
 * @return {string} url
 * npm源：https ://registry.npmjs.org
 * 淘宝源：https://registry.npmmirror.com
 */
function getDefaultRegistry (isOriginal = true) {
  return isOriginal ? 'https://registry.npmjs.org' : 'https://registry.npmmirror.com'
}

module.exports = getDefaultRegistry

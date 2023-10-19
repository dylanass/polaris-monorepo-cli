const path = require('path')
/**
 * @description 兼容 MacOS / windows
 * 分隔符 macOS --> / ; windows --> \
 */
function formatPath (p) {
  if (p && typeof p === 'string') {
    const sep = path.sep
    if (sep === '/') {
      return p
    } else {
      return p.replace(/\\/g, '/')
    }
  }
  return p
}


module.exports = formatPath

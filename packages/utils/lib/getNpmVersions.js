const getNpmInfo = require('./getNpmInfo')
/**
 * @description 获取当前包所有版本号
 * @return {string[]}
 */
async function getNpmVersions (pkgName, registry) {
  const data = await getNpmInfo(pkgName, registry)
  if (data) {
    return Object.keys(data.versions)
  }
  return []
}

module.exports = getNpmVersions

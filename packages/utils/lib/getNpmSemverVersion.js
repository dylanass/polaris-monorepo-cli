const getNpmVersions = require('./getNpmVersions')
const getSemverVersions = require('./getSemverVersions')

/**
 * @description 获取最新版本号
 * @param {*} baseVersion
 * @param {*} pkgName
 * @param {*} registry
 */
async function getNpmSemverVersion (baseVersion, pkgName, registry) {
  const versions = await getNpmVersions(pkgName, registry)
  const newVersion = getSemverVersions(baseVersion, versions)
  if (newVersion && newVersion.length > 0) {
    return newVersion[0]
  }
}

module.exports = getNpmSemverVersion

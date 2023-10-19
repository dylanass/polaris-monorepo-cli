const getNpmVersions = require('./getNpmVersions')
const getSemverVersions = require('./getSemverVersions')

/**
 * @description 判断当前包是否是最新版本，不是，则返回最新版本
 * @param {*} currentVersion
 * @param {*} pkgName
 * @param {*} registry
 */
async function getNpmSemverVersion (currentVersion, pkgName, registry) {
  const versions = await getNpmVersions(pkgName, registry)
  const newVersion = getSemverVersions(currentVersion, versions)
  if (newVersion && newVersion.length > 0) {
    return newVersion[0]
  }
}

module.exports = getNpmSemverVersion

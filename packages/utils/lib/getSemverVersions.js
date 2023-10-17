const semver = require('semver')

/**
 * @description 获取 > 当前版本号的版本，并排序，最新的放在数组的第一位
 * @param {string} baseVersion
 * @param {string[]} versions
 * @return {string[]}
 */
function getSemverVersions (baseVersion, versions) {
  return versions.filter((version) => semver.gt(version, baseVersion)).sort((a, b) => semver.gt(b, a) ? 1 : -1)
}

module.exports = getSemverVersions

"use strict";

var semver = require('semver');
/**
 * @description 获取 > 当前版本号的版本，并排序，最新的放在数组的第一位
 * @param {string} baseVersion
 * @param {string[]} versions
 * @return {string[]}
 */


function getSemverVersions(baseVersion, versions) {
  return versions.filter(function (version) {
    return semver.gt(version, baseVersion);
  }).sort(function (a, b) {
    return semver.gt(b, a) ? 1 : -1;
  });
}

module.exports = getSemverVersions;
'use strict';
// const urlJoin = require('url-join');
const path = require('path')
const axios = require('axios');
const semver = require('semver')


/**
 * @description 通过 npm API 获取 npm info
 * @param {string} pkgName 包名称
 * @param {string} registry 源地址
 */
function getNpmInfo (pkgName, registry) {
  const registryUrl = registry || getDefaultRegistry();
  /** @TODO es module */
  // const npmInfoUrl = urlJoin(registryUrl, pkgName)
  const npmInfoUrl = path.join(registryUrl, pkgName)
  return axios.get(npmInfoUrl).then((response) => {
    if (response.status === 200) {
      return response.data
    }
    return null
  }).catch(err => {
    return Promise.reject(err)
  })
}

/**
 * @description 获取 registry url
 * @return {string} url
 * npm源：https ://registry.npmjs.org
 * 淘宝源：https://registry.npmmirror.com
 */
function getDefaultRegistry (isOriginal = false) {
  return isOriginal ? 'https ://registry.npmjs.org' : 'https://registry.npmmirror.com'
}

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

/**
 * @description 获取 > 当前版本号的版本，并排序，最新的放在数组的第一位
 * @param {string} baseVersion
 * @param {string[]} versions
 * @return {string[]}
 */
function getSemverVersions (baseVersion, versions) {
  return versions.filter((version) => semver.gt(version, baseVersion)).sort((a, b) => semver.gt(b, a) ? 1 : -1)
}

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








module.exports = {
  getNpmInfo,
  getNpmVersions,
  getSemverVersions,
  getNpmSemverVersion,
};

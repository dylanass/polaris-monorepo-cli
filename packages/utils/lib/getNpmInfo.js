const urlJoin = require('url-join');
const axios = require('axios');
const getDefaultRegistry = require('./getDefaultRegistry')

/**
 * @description 通过 npm API 获取 npm info
 * @param {string} pkgName 包名称
 * @param {string} registry 源地址
 */
function getNpmInfo (pkgName, registry) {
  const registryUrl = registry || getDefaultRegistry();
  const npmInfoUrl = urlJoin(registryUrl, pkgName)
  return axios.get(npmInfoUrl).then((response) => {
    if (response.status === 200) {
      return response.data
    }
    return null
  }).catch(err => {
    return Promise.reject(err)
  })
}

module.exports = getNpmInfo

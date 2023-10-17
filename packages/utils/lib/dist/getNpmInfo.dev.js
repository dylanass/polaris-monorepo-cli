"use strict";

var urlJoin = require('url-join');

var axios = require('axios');

var getDefaultRegistry = require('./getDefaultRegistry');
/**
 * @description 通过 npm API 获取 npm info
 * @param {string} pkgName 包名称
 * @param {string} registry 源地址
 */


function getNpmInfo(pkgName, registry) {
  var registryUrl = registry || getDefaultRegistry();
  var npmInfoUrl = urlJoin(registryUrl, pkgName);
  return axios.get(npmInfoUrl).then(function (response) {
    if (response.status === 200) {
      return response.data;
    }

    return null;
  })["catch"](function (err) {
    return Promise.reject(err);
  });
}

module.exports = getNpmInfo;
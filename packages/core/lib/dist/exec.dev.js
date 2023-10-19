"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var path = require('path');

var log = require('@polaris-monorepo-cli/log');

var Package = require('@polaris-monorepo-cli/package');

var _require = require('./const'),
    PKG_CONFIG_WITH_COMMAND = _require.PKG_CONFIG_WITH_COMMAND,
    CACHE_DIR = _require.CACHE_DIR;

function exec() {
  var targetPath = process.env.CLI_TARGET_PAtH;
  var cliHomePath = process.env.CLI_HOME_PATH; //  /Users/mac/.polaris-cli

  var root = targetPath || path.resolve(cliHomePath, CACHE_DIR);
  var pkg = new Package(_objectSpread({
    root: root
  }, getPkgNameAndVersion.apply(null, arguments)));
  var pkgMainPath = pkg.getPkgMainPath();
  log.verbose('pkgMainPath -->', pkgMainPath);

  if (pkgMainPath) {// 更新包 并
    // 执行入口文件
  } else {
    // 下载包 到缓存目录 再执行入口文件
    pkg.install();
  }
}
/** get package name & version */


function getPkgNameAndVersion() {
  var command = arguments[arguments.length - 1];
  var cmdName = command.name();
  return {
    packageName: PKG_CONFIG_WITH_COMMAND[cmdName],
    packageVersion: 'latest'
  };
}

module.exports = exec;
'use strict';

var path = require('path');

var _require = require('@polaris-monorepo-cli/utils'),
    getNpmSemverVersion = _require.getNpmSemverVersion;

var log = require('@polaris-monorepo-cli/log');

var pkg = require('../package.json');

var colors = require('colors'); // /Users/mac


var userHome = require('user-home');

var currentPkgVersion = pkg.version;
var currentPkgName = pkg.name;

var constant = require('./const');

function prepare() {
  return regeneratorRuntime.async(function prepare$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          checkPkgVersion();
          checkRoot();
          checkUserHome();
          checkEnv();
          _context.next = 6;
          return regeneratorRuntime.awrap(checkGlobalUpdate());

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
} // 检查版本号


function checkPkgVersion() {
  log.notice('polaris-cli current version =>', "v".concat(currentPkgVersion));
} // 检查 root 账户启动


function checkRoot() {
  var rootCheck = require('root-check');

  rootCheck();
} // 检查用户主目录


function checkUserHome() {
  var pathExists, isExists;
  return regeneratorRuntime.async(function checkUserHome$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          pathExists = require('path-exists');
          _context2.next = 3;
          return regeneratorRuntime.awrap(pathExists(userHome));

        case 3:
          isExists = _context2.sent;

          if (isExists) {
            _context2.next = 6;
            break;
          }

          throw Error(colors.red('当前登陆用户主目录不存在！'));

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
} // 检查环境变量


function checkEnv() {
  var dotenv = require('dotenv'); // 本地环境变量绝对路径


  var localEnvPath = path.resolve(userHome, '.env'); // 将本地环境变量(/Users/mac/.env) 注入到 process.env 中

  dotenv.config({
    path: localEnvPath
  });
  createDefaultConfig();
} // 添加脚手架环境变量配置


function createDefaultConfig() {
  // CLI_HOME = .polaris-cli
  if (process.env.CLI_HOME) {
    process.env.CLI_HOME_PATH = path.join(userHome, process.env.CLI_HOME);
  } else {
    process.env.CLI_HOME_PATH = path.join(userHome, constant.DEFAULT_CLI_HOME);
  }
} // 7. 检查是否有最新版本


function checkGlobalUpdate() {
  var versions;
  return regeneratorRuntime.async(function checkGlobalUpdate$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(getNpmSemverVersion(currentPkgVersion, currentPkgName));

        case 2:
          versions = _context3.sent;

          if (versions) {
            log.warn(colors.yellow("\u8BF7\u624B\u52A8\u66F4\u65B0\u7248\u672C\n\u5F53\u524D\u7248\u672C: v".concat(currentPkgVersion, "\n\u6700\u65B0\u7248\u672C: v").concat(versions, "\n\u66F4\u65B0\u547D\u4EE4: npm install -g ").concat(currentPkgName, "\n    ")));
          }

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}

module.exports = prepare;
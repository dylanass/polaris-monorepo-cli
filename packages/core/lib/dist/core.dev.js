'use strict';

var path = require('path');

var _require = require('@polaris-monorepo-cli/utils'),
    getNpmSemverVersion = _require.getNpmSemverVersion;

var log = require('@polaris-monorepo-cli/log');

var pkg = require('../package.json');

var semver = require('semver');

var colors = require('colors');

var minimist = require('minimist');

var userHome = require('user-home'); // /Users/mac


var currentPkgVersion = pkg.version;
var currentPkgName = pkg.name;

var constant = require('./const');

var registerCommand = require('./registerCommand');

module.exports = core;

function core() {
  try {
    checkPkgVersion();
    checkNodeVersion();
    checkRoot();
    checkUserHome();
    checkInputArgs();
    log.verbose('debug', 'test debug log');
    checkEnv();
    checkGlobalUpdate();
    registerCommand();
  } catch (e) {
    log.error(e.message);
  }
} //1. 检查版本号


function checkPkgVersion() {} // log.notice('polaris-cli current version =>', `v${currentPkgVersion}`)
//2. 检查node版本号


function checkNodeVersion() {
  var currentNodeVersion = process.version;
  var lowestVersion = constant.LOWEST_NODE_VERSION;

  if (!semver.gte(currentNodeVersion, lowestVersion)) {
    throw Error(colors.red("polaris-cli\u9700\u8981\u5B89\u88C5 v".concat(lowestVersion, " \u4EE5\u4E0A\u7248\u672C\u7684Node.js")));
  }
}
/** @TODO ES Module */
//3. 检查 root 账户启动


function checkRoot() {} // const rootCheck = proxyquire('root-check', { esm: require('esm')(module) });
// const rootCheck = require('root-check');
// rootCheck()
//4. 检查用户主目录


function checkUserHome() {
  var pathExists, isExists;
  return regeneratorRuntime.async(function checkUserHome$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          pathExists = require('path-exists');
          _context.next = 3;
          return regeneratorRuntime.awrap(pathExists(userHome));

        case 3:
          isExists = _context.sent;

          if (isExists) {
            _context.next = 6;
            break;
          }

          throw Error(colors.red('当前登陆用户主目录不存在！'));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
} //5. 检查入惨 debug mode


function checkInputArgs() {
  var args = minimist(process.argv.slice(2)); // { _: [], debug: true }

  if (args.debug) {
    process.env.LOG_LEVEL = 'verbose';
  } else {
    process.env.LOG_LEVEL = 'info';
  } // log 已经在 require 时初始化，需要重新修改 log.level


  log.level = process.env.LOG_LEVEL;
} //6. 检查环境变量


function checkEnv() {
  var dotenv = require('dotenv'); // 本地环境变量绝对路径


  var dotenvPath = path.resolve(userHome, '.env'); // config => 自己定义的本地环境变量, 并注入到 process.env 中。
  // 比如在 /Users/mac/.env 中写入 CLI_HOME = .polaris-cli

  var config = dotenv.config({
    path: dotenvPath
  }); // 执行后,process.env 中就会有 CLI_HOME .polaris-cli

  createDefaultConfig(); // console.log(process.env)
} // 添加默认配置


function createDefaultConfig() {
  var cliPathConfig = {
    home: userHome
  };

  if (process.env.CLI_HOME) {
    cliPathConfig['cliHome'] = path.join(userHome, process.env.CLI_HOME);
  } else {
    cliPathConfig['cliHome'] = path.join(userHome, constant.DEFAULT_CLI_HOME);
  }

  process.env.CLI_HOME_PATH = cliPathConfig.cliHome; // /Users/mac/.polaris-cli
} // 7. 检查是否有最新版本


function checkGlobalUpdate() {
  var versions;
  return regeneratorRuntime.async(function checkGlobalUpdate$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getNpmSemverVersion(currentPkgVersion, currentPkgName));

        case 2:
          versions = _context2.sent;

          if (versions) {
            log.warn(colors.yellow("\u8BF7\u624B\u52A8\u66F4\u65B0\u7248\u672C\n\u5F53\u524D\u7248\u672C: v".concat(currentPkgVersion, "\n\u6700\u65B0\u7248\u672C: v").concat(versions, "\n\u66F4\u65B0\u547D\u4EE4: npm install -g ").concat(currentPkgName, "\n    ")));
          }

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}
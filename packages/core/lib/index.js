'use strict';
const path = require('path')
const { getNpmSemverVersion } = require('@polaris-monorepo-cli/utils')
require = require("esm")(module/*, options*/)
const log = require('@polaris-monorepo-cli/log')
const pkg = require('../package.json')
const semver = require('semver')
const colors = require('colors')
const minimist = require('minimist')

const userHome = require('user-home')  // /Users/mac
const currentPkgVersion = pkg.version
const currentPkgName = pkg.name

const constant = require('./const')

module.exports = core;

function core () {
  try {
    checkPkgVersion()
    checkNodeVersion()
    checkRoot()
    checkUserHome()
    checkInputArgs()
    log.verbose('debug', 'test debug log');
    checkEnv()
    checkGlobalUpdate()
  } catch (e) {
    log.error(e.message)
  }
}

//1. 检查版本号
function checkPkgVersion () {
  log.notice('polaris-cli current version =>', `v${currentPkgVersion}`)
}

//2. 检查node版本号
function checkNodeVersion () {
  const currentNodeVersion = process.version
  const lowestVersion = constant.LOWEST_NODE_VERSION
  if (!semver.gte(currentNodeVersion, lowestVersion)) {
    throw Error(colors.red(`polaris-cli需要安装 v${lowestVersion} 以上版本的Node.js`))
  }
}

/** @TODO ES Module */
//3. 检查 root 账户启动
function checkRoot () {
  // const rootCheck = require('root-check');
  // rootCheck()
}

/** @TODO ES Module */
//4. 检查用户主目录
function checkUserHome () {
  // const pathExists = require('path-exists')
  if (!userHome) {
    throw Error(colors.red('当前登陆用户主目录不存在！'))
  }
}

//5. 检查入惨 debug mode
function checkInputArgs () {
  const args = minimist(process.argv.slice(2)) // { _: [], debug: true }
  if (args.debug) {
    process.env.LOG_LEVEL = 'verbose'
  } else {
    process.env.LOG_LEVEL = 'info'
  }
  // log 已经在 require 时初始化，需要重新修改 log.level
  log.level = process.env.LOG_LEVEL
}

//6. 检查环境变量
function checkEnv () {
  const dotenv = require('dotenv')
  // 本地环境变量绝对路径
  const dotenvPath = path.resolve(userHome, '.env')
  // config => 自己定义的本地环境变量, 并注入到 process.env 中。
  // 比如在 /Users/mac/.env 中写入 CLI_HOME = .polaris-cli
  const config = dotenv.config({
    path: dotenvPath
  })
  // 执行后,process.env 中就会有 CLI_HOME .polaris-cli
  createDefaultConfig()
  // console.log(process.env)
}

// 添加默认配置
function createDefaultConfig () {
  const cliPathConfig = {
    home: userHome
  }
  if (process.env.CLI_HOME) {
    cliPathConfig['cliHome'] = path.join(userHome, process.env.CLI_HOME)
  } else {
    cliPathConfig['cliHome'] = path.join(userHome, constant.DEFAULT_CLI_HOME)
  }
  process.env.CLI_HOME_PATH = cliPathConfig.cliHome // /Users/mac/.polaris-cli
}


// 7. 检查是否有最新版本
async function checkGlobalUpdate () {
  const versions = await getNpmSemverVersion(currentPkgVersion, currentPkgName)
  if (versions) {
    log.warn(colors.yellow(`请手动更新版本
当前版本: v${currentPkgVersion}
最新版本: v${versions}
更新命令: npm install -g ${currentPkgName}
    `))
  }
}

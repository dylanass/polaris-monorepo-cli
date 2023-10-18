'use strict';
const path = require('path')
const { getNpmSemverVersion } = require('@polaris-monorepo-cli/utils')
const log = require('@polaris-monorepo-cli/log')
const pkg = require('../package.json')
const colors = require('colors')

// /Users/mac
const userHome = require('user-home')

const currentPkgVersion = pkg.version
const currentPkgName = pkg.name

const constant = require('./const')


async function prepare () {
  checkPkgVersion();
  checkRoot();
  checkUserHome();
  checkEnv();
  await checkGlobalUpdate();
}

// 检查版本号
function checkPkgVersion () {
  log.notice('polaris-cli current version =>', `v${currentPkgVersion}`)
}

// 检查 root 账户启动
function checkRoot () {
  const rootCheck = require('root-check');
  rootCheck()
}

// 检查用户主目录
async function checkUserHome () {
  const pathExists = require('path-exists')
  const isExists = await pathExists(userHome)
  if (!isExists) {
    throw Error(colors.red('当前登陆用户主目录不存在！'))
  }
}

// 检查环境变量
function checkEnv () {
  const dotenv = require('dotenv')
  // 本地环境变量绝对路径
  const localEnvPath = path.resolve(userHome, '.env')
  // 将本地环境变量(/Users/mac/.env) 注入到 process.env 中
  dotenv.config({
    path: localEnvPath
  })
  createDefaultConfig()
}

// 添加脚手架环境变量配置
function createDefaultConfig () {
  // CLI_HOME = .polaris-cli
  if (process.env.CLI_HOME) {
    process.env.CLI_HOME_PATH = path.join(userHome, process.env.CLI_HOME)
  } else {
    process.env.CLI_HOME_PATH = path.join(userHome, constant.DEFAULT_CLI_HOME)
  }
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




module.exports = prepare

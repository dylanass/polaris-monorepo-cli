const path = require('path')
const log = require('@polaris-monorepo-cli/log')
const Package = require('@polaris-monorepo-cli/package')

const { PKG_CONFIG_WITH_COMMAND, CACHE_DIR } = require('./const')


function exec () {
  let targetPath = process.env.CLI_TARGET_PAtH
  const cliHomePath = process.env.CLI_HOME_PATH; //  /Users/mac/.polaris-cli
  const root = targetPath || path.resolve(cliHomePath, CACHE_DIR)
  const pkg = new Package({
    root,
    ...getPkgNameAndVersion.apply(null, arguments)
  })
  const pkgMainPath = pkg.getPkgMainPath()
  log.verbose('pkgMainPath -->', pkgMainPath)
  if (pkgMainPath) {
    // 更新包 并
    // 执行入口文件
  } else {
    // 下载包 到缓存目录 再执行入口文件
    pkg.install()
  }
}

/** get package name & version */
function getPkgNameAndVersion () {
  const command = arguments[arguments.length - 1]
  const cmdName = command.name()
  return {
    packageName: PKG_CONFIG_WITH_COMMAND[cmdName],
    packageVersion: 'latest'
  }
}


module.exports = exec

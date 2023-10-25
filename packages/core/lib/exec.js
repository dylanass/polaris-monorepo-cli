const path = require('path')
const log = require('@polaris-monorepo-cli/log')
const Package = require('@polaris-monorepo-cli/package')

const { PKG_CONFIG_WITH_COMMAND, CACHE_DIR } = require('./const')


async function exec () {
  const targetPath = process.env.CLI_TARGET_PATH
  const cliHomePath = process.env.CLI_HOME_PATH; //  /Users/mac/.polaris-cli
  let pkg

  if (targetPath) {
    /** @TODO 自定义本地调试 /Users/mac/Desktop/polaris-monorepo-cli/packages/init */
    pkg = new Package({
      root: targetPath,
      ...getPkgNameAndVersion.apply(null, arguments)
    })
  } else {
    const storeDir = path.resolve(path.resolve(cliHomePath, CACHE_DIR), 'node_modules')
    pkg = new Package({
      root: path.resolve(cliHomePath, CACHE_DIR),
      storeDir,
      ...getPkgNameAndVersion.apply(null, arguments)
    })

    if (await pkg.exists()) {
      // 更新包
    } else {
      pkg.install()
    }
  }

  const rootFile = pkg.getPkgMainPath()
  log.verbose('rootFile -->', rootFile)
  if (rootFile) {
    // 在当前进程调用，无法充分利用cpu资源
    require(rootFile).apply(null, arguments)
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

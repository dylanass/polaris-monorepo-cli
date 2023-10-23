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
    // const code = `require('${rootFile}').call(null, ${JSON.stringify({})})`;
    // console.log('code,', code);
    // require('child_process').spawn('node', ['-e', code])
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

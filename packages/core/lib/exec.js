const Package = require('@polaris-monorepo-cli/package')

const { PKG_CONFIG_WITH_COMMAND } = require('./const')


function exec () {
  const targetPath = process.env.CLI_TARGET_PAtH
  const pkg = new Package({
    targetPath,
    ...getPkgInfo.apply(null, arguments)
  })
}

/** get package name & version */
function getPkgInfo () {
  const command = arguments[arguments.length - 1]
  const cmdName = command.name()
  return {
    pkgName: PKG_CONFIG_WITH_COMMAND[cmdName],
    pkgVersion: 'latest'
  }
}


module.exports = exec

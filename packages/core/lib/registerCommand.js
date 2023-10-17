/** 命令注册 */
const commander = require('commander')
const log = require('@polaris-monorepo-cli/log')

const pkg = require('../package.json')

const { program } = commander

function registerCommand () {
  program
    .name('polaris')
    .version(pkg.version)
    .usage('<command> [option]')
    .option('-d,--debug', '调试模式', false)
    .option('-h, --help', 'display help for command')

  /** debug */
  program.on('option:debug', function () {
    if (program._optionValues.debug) {
      process.env.LOG_LEVEL = 'verbose'
    } else {
      process.env.LOG_LEVEL = 'info'
    }
    log.level = process.env.LOG_LEVEL
  })

  /** unknown command */
  program.on('command:*', function (obj) {
    log.error('未知命令:', obj[0])
    const availableCommands = program.commands.map(cmd => cmd.name())
    if (availableCommands.length > 0) {
      log.info('可用命令:', availableCommands.join(','))
    }
  })

  /** output help document */
  if (program.args && program.args.length < 1) {
    program.outputHelp()
    console.log();
  }

  program.parse(process.argv)
}

module.exports = registerCommand

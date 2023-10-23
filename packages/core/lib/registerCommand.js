/** 命令注册 */
const commander = require('commander')
const log = require('@polaris-monorepo-cli/log')
const exec = require('./exec')

const pkg = require('../package.json')

const { program } = commander

function registerCommand () {
  program
    .name('polaris')
    .version(pkg.version)
    .usage('<command> [option]')
    .option('-d,--debug', '调试模式', false)
    .option('-h, --help', 'display help for command')

  program
    .command('init [projectName]')
    .option('-tg, --targetPath <targetPath>', '本地调试文件路径', '')
    .option('-f , --force', '是否强制安装')
    .action((projectName, options, command) => {
      log.verbose('polaris init projectName -->', projectName)
      log.verbose('polaris init options -->', options)
      log.verbose('polaris init command -->', command.name())
      process.env.CLI_TARGET_PATH = options.targetPath
      exec(projectName, options, command)
    })

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
  program.on('command:*', function ([unknownCmd]) {
    log.error('未知命令:', unknownCmd)
    const availableCommands = program.commands.map(cmd => cmd.name())
    if (availableCommands.length > 0) {
      log.info('可用命令:', availableCommands.join(','))
    }
    program.outputHelp()
    console.log();
  })

  program.parse(process.argv)
}

module.exports = registerCommand

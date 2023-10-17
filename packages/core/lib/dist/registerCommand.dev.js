"use strict";

/** 命令注册 */
var commander = require('commander');

var log = require('@polaris-monorepo-cli/log');

var pkg = require('../package.json');

var program = commander.program;

function registerCommand() {
  program.name('polaris').version(pkg.version).usage('<command> [option]').option('-d,--debug', '调试模式', false).option('-h, --help', 'display help for command');
  /** debug */

  program.on('option:debug', function () {
    if (program._optionValues.debug) {
      process.env.LOG_LEVEL = 'verbose';
    } else {
      process.env.LOG_LEVEL = 'info';
    }

    log.level = process.env.LOG_LEVEL;
  });
  /** unknown command */

  program.on('command:*', function (obj) {
    log.error('未知命令:', obj[0]);
    var availableCommands = program.commands.map(function (cmd) {
      return cmd.name();
    });

    if (availableCommands.length > 0) {
      log.info('可用命令:', availableCommands.join(','));
    }
  });
  /** output help document */

  if (program.args && program.args.length < 1) {
    program.outputHelp();
    console.log();
  }

  program.parse(process.argv);
}

module.exports = registerCommand;
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/** 命令注册 */
var commander = require('commander');

var log = require('@polaris-monorepo-cli/log');

var exec = require('./exec');

var pkg = require('../package.json');

var program = commander.program;

function registerCommand() {
  program.name('polaris').version(pkg.version).usage('<command> [option]').option('-d,--debug', '调试模式', false).option('-h, --help', 'display help for command');
  program.command('init [projectName]').option('-tg, --targetPath <targetPath>', '本地调试文件路径', '').option('-f , --force', '是否强制安装').action(function (projectName, options, command) {
    log.verbose('polaris init projectName -->', projectName);
    log.verbose('polaris init options -->', options);
    log.verbose('polaris init command -->', command.name());
    process.env.CLI_TARGET_PATH = options.targetPath;
    exec(projectName, options, command);
  });
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

  program.on('command:*', function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        unknownCmd = _ref2[0];

    log.error('未知命令:', unknownCmd);
    var availableCommands = program.commands.map(function (cmd) {
      return cmd.name();
    });

    if (availableCommands.length > 0) {
      log.info('可用命令:', availableCommands.join(','));
    }

    program.outputHelp();
    console.log();
  });
  program.parse(process.argv);
}

module.exports = registerCommand;
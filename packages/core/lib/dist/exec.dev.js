"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var path = require('path');

var log = require('@polaris-monorepo-cli/log');

var Package = require('@polaris-monorepo-cli/package');

var _require = require('./const'),
    PKG_CONFIG_WITH_COMMAND = _require.PKG_CONFIG_WITH_COMMAND,
    CACHE_DIR = _require.CACHE_DIR;

function exec() {
  var targetPath,
      cliHomePath,
      pkg,
      storeDir,
      rootFile,
      _args = arguments;
  return regeneratorRuntime.async(function exec$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          targetPath = process.env.CLI_TARGET_PATH;
          cliHomePath = process.env.CLI_HOME_PATH; //  /Users/mac/.polaris-cli

          if (!targetPath) {
            _context.next = 6;
            break;
          }

          /** @TODO 自定义本地调试 /Users/mac/Desktop/polaris-monorepo-cli/packages/init */
          pkg = new Package(_objectSpread({
            root: targetPath
          }, getPkgNameAndVersion.apply(null, _args)));
          _context.next = 14;
          break;

        case 6:
          storeDir = path.resolve(path.resolve(cliHomePath, CACHE_DIR), 'node_modules');
          pkg = new Package(_objectSpread({
            root: path.resolve(cliHomePath, CACHE_DIR),
            storeDir: storeDir
          }, getPkgNameAndVersion.apply(null, _args)));
          _context.next = 10;
          return regeneratorRuntime.awrap(pkg.exists());

        case 10:
          if (!_context.sent) {
            _context.next = 13;
            break;
          }

          _context.next = 14;
          break;

        case 13:
          pkg.install();

        case 14:
          rootFile = pkg.getPkgMainPath();
          log.verbose('rootFile -->', rootFile);

          if (rootFile) {// const code = `require('${rootFile}').call(null, ${JSON.stringify({})})`;
            // console.log('code,', code);
            // require('child_process').spawn('node', ['-e', code])
          }

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
}
/** get package name & version */


function getPkgNameAndVersion() {
  var command = arguments[arguments.length - 1];
  var cmdName = command.name();
  return {
    packageName: PKG_CONFIG_WITH_COMMAND[cmdName],
    packageVersion: 'latest'
  };
}

module.exports = exec;
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var path = require('path');

var pkgDir = require('pkg-dir').sync;

var npmInstall = require('npminstall');

var fse = require('fs-extra');

var pathExists = require('path-exists').sync;

var log = require('@polaris-monorepo-cli/log');

var _require = require('@polaris-monorepo-cli/utils'),
    isObject = _require.isObject,
    formatPath = _require.formatPath,
    getDefaultRegistry = _require.getDefaultRegistry,
    getNpmLatestVersion = _require.getNpmLatestVersion;

var init = require('@polaris-monorepo-cli/init');

var Package =
/*#__PURE__*/
function () {
  function Package(options) {
    _classCallCheck(this, Package);

    if (!options) {
      throw Error('Package options 不能为空');
    }

    if (!isObject(options)) {
      throw Error('Package options 必须是对象');
    }

    this.root = options.root;
    this.packageName = options.packageName;
    this.packageVersion = options.packageVersion;
    this.storeDir = path.resolve(options.root, 'node_modules');
    log.verbose('Package constructor options -->', options);
  }

  _createClass(Package, [{
    key: "prepare",
    value: function prepare() {
      return regeneratorRuntime.async(function prepare$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (this.storeDir && !pathExists(this.storeDir)) {
                log.verbose('create storeDir -->', this.storeDir);
                fse.mkdirpSync(this.storeDir);
              }

              if (this.packageVersion === 'latest') {// this.packageVersion = await getNpmLatestVersion(this.packageName);
                // log.verbose('latest package version --> ', this.packageVersion)
              }

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
    /** install npm package */

  }, {
    key: "install",
    value: function install() {
      return regeneratorRuntime.async(function install$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.prepare());

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
    /** 获取package入口文件目录 */

  }, {
    key: "getPkgMainPath",
    value: function getPkgMainPath() {
      /** 获取传入目录的根目录 */
      var dir = pkgDir(this.root);
      log.verbose('package dir -->', dir);

      if (dir) {
        var pkgFile = require(path.resolve(dir, 'package.json'));

        if (pkgFile && pkgFile.main) {
          return formatPath(path.resolve(dir, pkgFile.main));
        }

        return null;
      }

      return null;
    }
  }]);

  return Package;
}();

module.exports = Package;
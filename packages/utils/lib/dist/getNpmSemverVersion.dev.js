"use strict";

var getNpmVersions = require('./getNpmVersions');

var getSemverVersions = require('./getSemverVersions');
/**
 * @description 获取最新版本号
 * @param {*} baseVersion
 * @param {*} pkgName
 * @param {*} registry
 */


function getNpmSemverVersion(baseVersion, pkgName, registry) {
  var versions, newVersion;
  return regeneratorRuntime.async(function getNpmSemverVersion$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getNpmVersions(pkgName, registry));

        case 2:
          versions = _context.sent;
          newVersion = getSemverVersions(baseVersion, versions);

          if (!(newVersion && newVersion.length > 0)) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", newVersion[0]);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = getNpmSemverVersion;
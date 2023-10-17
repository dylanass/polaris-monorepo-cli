"use strict";

var getNpmInfo = require('./getNpmInfo');
/**
 * @description 获取当前包所有版本号
 * @return {string[]}
 */


function getNpmVersions(pkgName, registry) {
  var data;
  return regeneratorRuntime.async(function getNpmVersions$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getNpmInfo(pkgName, registry));

        case 2:
          data = _context.sent;

          if (!data) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", Object.keys(data.versions));

        case 5:
          return _context.abrupt("return", []);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = getNpmVersions;
"use strict";

var semver = require('semver');

var getNpmVersions = require('./getNpmVersions');

function getNpmLatestVersion(npmName, registry) {
  var versions;
  return regeneratorRuntime.async(function getNpmLatestVersion$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getNpmVersions(npmName, registry));

        case 2:
          versions = _context.sent;

          if (!versions) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", versions.sort(function (a, b) {
            return semver.gt(b, a);
          })[0]);

        case 5:
          return _context.abrupt("return", null);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = getNpmLatestVersion;
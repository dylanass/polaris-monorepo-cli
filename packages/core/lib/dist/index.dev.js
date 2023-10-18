'use strict';

var prepare = require('./prepare');

var registerCommand = require('./registerCommand');

function core() {
  return regeneratorRuntime.async(function core$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(prepare());

        case 2:
          registerCommand();

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = core;
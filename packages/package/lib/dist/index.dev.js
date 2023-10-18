'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('@polaris-monorepo-cli/utils'),
    isObject = _require.isObject;

var Package = function Package(options) {
  _classCallCheck(this, Package);

  if (!options) {
    throw Error('Package options 不能为空');
  }

  if (!isObject(options)) {
    throw Error('Package options 必须是对象');
  }

  console.log('options', options);
};

module.exports = Package;
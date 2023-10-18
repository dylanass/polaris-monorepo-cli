'use strict';
const { isObject } = require('@polaris-monorepo-cli/utils')


class Package {
  constructor(options) {
    if (!options) {
      throw Error('Package options 不能为空')
    }
    if (!isObject(options)) {
      throw Error('Package options 必须是对象')
    }

    console.log('options', options);

  }
}


module.exports = Package;

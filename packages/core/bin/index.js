#!/usr/bin/env node

const importLocal = require('import-local');
const log = require('@polaris-monorepo-cli/log');

if (importLocal(__filename)) {
  log.info('cli', '正在使用 polaris-cli 本地版本')
} else {
  require('../lib')()
}

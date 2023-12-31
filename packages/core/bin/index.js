#!/usr/bin/env node

const importLocal = require('import-local');
const log = require('@polaris-monorepo-cli/log');

// 优先使用本地版本
if (importLocal(__filename)) {
  log.info('cli', '正在使用 polaris-cli 本地版本')
} else {
  require('../lib')(process.argv.slice(2))
}

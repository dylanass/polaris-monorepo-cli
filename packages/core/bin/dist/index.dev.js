#!/usr/bin/env node
"use strict";

var importLocal = require('import-local');

var log = require('@polaris-monorepo-cli/log');

if (importLocal(__filename)) {
  log.info('cli', '正在使用 polaris-cli 本地版本');
} else {
  require('../lib')();
}
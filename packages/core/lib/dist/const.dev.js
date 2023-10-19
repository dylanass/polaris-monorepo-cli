"use strict";

var LOWEST_NODE_VERSION = '12.0.0';
var DEFAULT_CLI_HOME = '.polaris-cli';
var PKG_CONFIG_WITH_COMMAND = {
  init: '@polaris-monorepo-cli/init'
};
var CACHE_DIR = 'dependencies';
module.exports = {
  LOWEST_NODE_VERSION: LOWEST_NODE_VERSION,
  DEFAULT_CLI_HOME: DEFAULT_CLI_HOME,
  PKG_CONFIG_WITH_COMMAND: PKG_CONFIG_WITH_COMMAND,
  CACHE_DIR: CACHE_DIR
};
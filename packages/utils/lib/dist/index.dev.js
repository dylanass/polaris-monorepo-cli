'use strict';

var getNpmInfo = require('./getNpmInfo');

var getNpmVersions = require('./getNpmVersions');

var getSemverVersions = require('./getSemverVersions');

var getNpmSemverVersion = require('./getNpmSemverVersion');

var isObject = require('./isObject');

var formatPath = require('./formatPath');

var getDefaultRegistry = require('./getDefaultRegistry');

var getNpmLatestVersion = require('./getNpmLatestVersion');

module.exports = {
  isObject: isObject,
  getNpmInfo: getNpmInfo,
  formatPath: formatPath,
  getNpmVersions: getNpmVersions,
  getSemverVersions: getSemverVersions,
  getDefaultRegistry: getDefaultRegistry,
  getNpmSemverVersion: getNpmSemverVersion,
  getNpmLatestVersion: getNpmLatestVersion
};
'use strict';

var getNpmInfo = require('./getNpmInfo');

var getNpmVersions = require('./getNpmVersions');

var getSemverVersions = require('./getSemverVersions');

var getNpmSemverVersion = require('./getNpmSemverVersion');

var isObject = require('./isObject');

module.exports = {
  isObject: isObject,
  getNpmInfo: getNpmInfo,
  getNpmVersions: getNpmVersions,
  getSemverVersions: getSemverVersions,
  getNpmSemverVersion: getNpmSemverVersion
};
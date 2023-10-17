'use strict';

var getNpmInfo = require('./getNpmInfo');

var getNpmVersions = require('./getNpmVersions');

var getSemverVersions = require('./getSemverVersions');

var getNpmSemverVersion = require('./getNpmSemverVersion');

module.exports = {
  getNpmInfo: getNpmInfo,
  getNpmVersions: getNpmVersions,
  getSemverVersions: getSemverVersions,
  getNpmSemverVersion: getNpmSemverVersion
};
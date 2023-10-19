'use strict';
const getNpmInfo = require('./getNpmInfo');
const getNpmVersions = require('./getNpmVersions')
const getSemverVersions = require('./getSemverVersions')
const getNpmSemverVersion = require('./getNpmSemverVersion')
const isObject = require('./isObject')
const formatPath = require('./formatPath')
const getDefaultRegistry = require('./getDefaultRegistry')
const getNpmLatestVersion = require('./getNpmLatestVersion')


module.exports = {
  isObject,
  getNpmInfo,
  formatPath,
  getNpmVersions,
  getSemverVersions,
  getDefaultRegistry,
  getNpmSemverVersion,
  getNpmLatestVersion,
};

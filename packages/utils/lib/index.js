'use strict';
const getNpmInfo = require('./getNpmInfo');
const getNpmVersions = require('./getNpmVersions')
const getSemverVersions = require('./getSemverVersions')
const getNpmSemverVersion = require('./getNpmSemverVersion')
const isObject = require('./isObject')


module.exports = {
  isObject,
  getNpmInfo,
  getNpmVersions,
  getSemverVersions,
  getNpmSemverVersion,
};

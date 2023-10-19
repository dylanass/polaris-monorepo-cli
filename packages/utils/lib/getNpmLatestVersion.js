const semver = require('semver')
const getNpmVersions = require('./getNpmVersions')

async function getNpmLatestVersion (npmName, registry) {
  const versions = await getNpmVersions(npmName, registry);
  if (versions) {
    return versions.sort((a, b) => semver.gt(b, a))[0];
  }
  return null;
}

module.exports = getNpmLatestVersion


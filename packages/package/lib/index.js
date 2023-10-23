'use strict';
const path = require('path')
const pkgDir = require('pkg-dir').sync
const npmInstall = require('npminstall');
const fse = require('fs-extra')
const pathExists = require('path-exists').sync;
const log = require('@polaris-monorepo-cli/log')
const { isObject, formatPath, getDefaultRegistry, getNpmLatestVersion } = require('@polaris-monorepo-cli/utils')
const init = require('@polaris-monorepo-cli/init')


class Package {
  constructor(options) {
    if (!options) {
      throw Error('Package options 不能为空')
    }
    if (!isObject(options)) {
      throw Error('Package options 必须是对象')
    }

    this.root = options.root
    this.packageName = options.packageName
    this.packageVersion = options.packageVersion
    this.storeDir = options.storeDir
    log.verbose('Package constructor options -->', options);
  }

  get cacheFilePath () {
    // return path.resolve(this.storeDir, `_${this.cacheFilePathPrefix}@${this.packageVersion}@${this.packageName}`);
    return path.resolve(this.storeDir, this.packageName)
  }

  // 判断当前path是否存在
  async exists () {
    if (this.storeDir) {
      await this.prepare();
      return pathExists(this.cacheFilePath);
    } else {
      return pathExists(this.targetPath);
    }
  }

  async prepare () {
    if (this.storeDir && !pathExists(this.storeDir)) {
      log.verbose('create storeDir -->', this.storeDir)
      fse.mkdirpSync(this.storeDir);
    }
    if (this.packageVersion === 'latest') {
      // this.packageVersion = await getNpmLatestVersion(this.packageName);
      this.packageVersion = '1.1.6'
      log.verbose('latest init package version --> ', this.packageVersion)
    }
  }

  /** install npm package */
  async install () {
    this.storeDir = path.resolve(options.root, 'node_modules')
    await this.prepare()
    npmInstall({
      root: this.root,
      storeDir: this.storeDir,
      registry: getDefaultRegistry(),
      pkgs: [{
        name: this.packageName,
        version: this.packageVersion,
      }],
    })
  }

  /** 获取package入口文件目录 */
  getPkgMainPath () {
    /** 获取传入目录的根目录 */
    function _getPkgMainPath (targetPath) {
      const dir = pkgDir(targetPath)
      log.verbose('package dir -->', dir)
      if (dir) {
        const pkgFile = require(path.resolve(dir, 'package.json'))
        if (pkgFile && pkgFile.main) {
          return formatPath(path.resolve(dir, pkgFile.main))
        }
        return null
      }
      return null
    }
    if (this.storeDir) {
      return _getPkgMainPath(this.cacheFilePath)
    } else {
      return _getPkgMainPath(this.root)
    }
  }
}


module.exports = Package;

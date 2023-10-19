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
    this.storeDir = path.resolve(options.root, 'node_modules')
    log.verbose('Package constructor options -->', options);
  }


  async prepare () {
    if (this.storeDir && !pathExists(this.storeDir)) {
      log.verbose('create storeDir -->', this.storeDir)
      fse.mkdirpSync(this.storeDir);
    }
    if (this.packageVersion === 'latest') {
      // this.packageVersion = await getNpmLatestVersion(this.packageName);
      // log.verbose('latest package version --> ', this.packageVersion)
    }
  }

  /** install npm package */
  async install () {
    await this.prepare()
    // npmInstall({
    //   root: this.root,
    //   storeDir,
    //   registry: ,getNpmLatestVersion(),
    //   pkgs: [{
    //     name: this.packageName,
    //     version: this.packageVersion,
    //   }],
    // })
  }

  /** 获取package入口文件目录 */
  getPkgMainPath () {
    /** 获取传入目录的根目录 */
    const dir = pkgDir(this.root)
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
}


module.exports = Package;

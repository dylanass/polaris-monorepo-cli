'use strict';
const prepare = require('./prepare')
const registerCommand = require('./registerCommand')


async function core () {
  await prepare()
  registerCommand()
}


module.exports = core

'use strict';

const log = require('npmlog')

//1.自定义方法
log.addLevel('success', 2000, { fg: 'green', bold: true })

//2.level 处理
log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info'

//3.自定义前缀
log.heading = 'polaris'
log.headingStyle = { fg: "black", bg: "yellow" }

module.exports = log

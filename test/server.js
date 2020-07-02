/*
* @description: jest server
 * @Author: LZY
 * @Date: 2020-07-01 16:28:52
 * @Last Modified by: LZY
 * @Last Modified time: 2020-07-01 16:32:43
 */

const request = require('supertest')
//引入产生请求的app
const server = require('../app.js').callback()

module.exports = request(sever)
/*
 *  根据不同的环境进行配置，如测试、开发环境  //使用不同环境测试要用到cross-env中间件
 * @Author: LZY
 * @Date: 2020-07-01 14:36:07
 * @Last Modified by: LZY
 * @Last Modified time: 2020-07-01 17:21:19
 */

 
//package.json中的scripts
 const ENV = process.env.NODE_ENV
 
 module.exports = {
     //是否是开发环境
     isDev: ENV === 'dev',
     notDev: ENV !== 'dev',
     isProd: ENV == 'production',
     notProd: ENV !== 'production',
     isTest: ENV == 'test',
     notTest: ENV !== 'test'
     
 }
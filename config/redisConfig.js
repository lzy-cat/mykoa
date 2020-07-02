/* @description: redis配置
 * @Author: LZY
 * @Date: 2020-07-01 14:26:27
 * @Last Modified by: LZY
 * @Last Modified time: 2020-07-01 14:26:27
 */

const { env } = require('../utils/env.js')
const REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

if(env){
    const REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    REDIS_CONF
}
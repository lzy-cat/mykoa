const redis = require('redis')
const {REDIS_CONF} = require('../config/redisConfig.js')

//创建redis客户端
const redisClient = redis.createClient(REDIS_CONF.port,REDIS_CONF.host)
//监听事件
redisClient.on('error',err=>{
    console.log('redis error',err)
})

/**
 * 
 * @param {*} key 键
 * @param {*} val 值
 * @param {*} timeout 过期时间 单位s
 */
/* function set(key,val,timeout=60*60){
    //判断val是否为object, 不是就转为string，===指严格比较操作数，不允许进行类型转换
    if(!typeof val === 'object'){
        val = JSON.stringify(val)
    }
    redisClient.set(key,val)
    redisClient.expire(key,timeout)
}

async function get(key){
    const values = await redisClient.get(key,(val,err)=>{
        if(err){
            console.log(err)
        }
        if(val== null){
            return null
        }
        try {
            return JSON.parse(val)
        } catch (ex) {
            return val
        }
    })
    return values
} */

module.exports = {
    set,
    get
}
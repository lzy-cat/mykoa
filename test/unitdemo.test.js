/*
 * @description: 使用jest进行接口测试
 * @Author: LZY
 * @Date: 2020-07-01 16:22:07
 * @Last Modified by: LZY
 * @Last Modified time: 2020-07-01 16:40:28
 */

 const server = require('./server.js')

 //测试get请求(测试api下的'/json')
 test('返回的数据格式正确',async ()=>{
     const res = await server.get('/json')
     //添加断言toEqual是比较对象的，toBe比较值
     expect(res.body).toEqual({
        title: 'Hello Koa!'
     })
     expect(res.body.title).toBe('Hello Koa!')
 })

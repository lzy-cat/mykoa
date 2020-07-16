/*
 * @Author: LZY 
 * @Date: 2020-06-14 16:01:39 
 * @Last Modified by: LZY
 * @Last Modified time: 2020-07-11 15:37:22
 */

const router = require('koa-router')()
const md5 = require('md5')
const {isEmpty,trim} = require('../../utils/stringUtil.js')

//获取模型
const User = require('../../model/admin/user.js')


//登录
router.post('/userLogin',async (ctx)=>{
    //获取参数
    let loginUser = ctx.request.body
    //非空校验
    if(isEmpty(loginUser.userName)){
        ctx.body = '用户名不能为空'
        return
    }
    if(isEmpty(loginUser.password)){
        ctx.body = '用户密码不能为空'
        return
    }

    //数据库查询
    let u = await User.findOne({
        where:{
            userName:loginUser.userName
        }
    })
    
    if(!u){
        ctx.body = '用户不存在'
        return
    }
    if(u.password != md5(loginUser.password)){
        ctx.body = '密码错误'
        return
    }else{
        ctx.body = '登录成功'
        //存入session
        if (ctx.session.userInfo == null) {
            ctx.session.userInfo = u
        }
    }

})


 //注册
 router.post('/register', async (ctx) => {
     //获取post中的参数
     let registerUser = ctx.request.body;
     //非空判断
     if(isEmpty(registerUser.userName)){
        ctx.body = '用户名不能为空'
        return
    }
    if(isEmpty(registerUser.password)){
        ctx.body = '用户密码不能为空'
        return
    }
     //首先判断是否存在该用户，存在就不能注册
     let hasUser = await User.findOne({
         where:{
             userName: registerUser.userName
         }
     })
     if(hasUser){
        ctx.body = '用户已存在，无法注册'
        return
     }
     await User.create({
             userName: registerUser.userName,
             password: md5(registerUser.password)
         })
         .then((result) => {
             ctx.body = {
                 code: 200,
                 msg: '注册成功!',
                 data: result
             }
         })
         .catch(err => {
             ctx.body = {
                 code: 500,
                 msg: '注册失败！',
                 data: err
             }
         })
 });
 
module.exports = router.routes()
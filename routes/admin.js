const router = require('koa-router')()
const login = require('./admin/login.js')
const user = require('./admin/user.js')

router.get('/',async (ctx)=>{
    ctx.body = '管理员首页'
})


router.use('/login',login)
router.use('/user',user)

module.exports = router.routes()

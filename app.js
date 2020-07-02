const Koa = require('koa')
const Router = require('koa-router')
const render = require('koa-art-template')
const path = require('path')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body');
const redisStore = require('koa-redis')
const session = require('koa-generic-session')
const { REDIS_CONF } = require('./config/redisConfig.js')

let app = new Koa()
let router = new Router()
//获取post
app.use(bodyParser())
//上传图片中间件
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 5 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
  }
}));
//配置session
app.keys = ['keys', 'keykeys']
app.use(session({
  key: 'weibo.sid', //默认是koa.sid
  prefix: 'weibo:sess:', //redis key 的前缀，默认是koa:sess：
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 //one day in ms,
  },
   ttl: 24 * 60 * 60 * 1000,   //session过期时间，如果不写，默认与cookie过期时间一致
   //将session信息存入redis中
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

//配置art-template模板
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});

//配置静态资源
app.use(static(__dirname + '/public'))

//引入模板
const index = require('./routes/index.js')
const api = require('./routes/api.js')
const admin = require('./routes/admin.js')

router.use('/admin', admin)
router.use('/api', api)
router.use('/index', index)


//启动路由s
app.use(router.routes()).use(router.allowedMethods)
//监听端口
app.listen(4000, () => {
  console.log('服务启动中')
})

module.exports = {app}
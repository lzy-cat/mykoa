const router = require('koa-router')()
const fs = require('fs')
const path = require('path')


router.get('/',async (ctx)=>{
    ctx.body = 'api接口'
})

/* router.get('/upload',async (ctx)=>{
    await ctx.render('login')
}) */

  /**
   * 上传一张图片
   */
router.post('/uploadfile', async (ctx, next) => {
    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    //读取目录，判断是否存在该目录，没有则创建
    const fileDir = path.join(__dirname+'/../public/upload/'+new Date().toLocaleDateString())
    if(!fs.existsSync(fileDir)){
        fs.mkdir(fileDir,err=>{
            if (err) {
                throw err;
            }
        })
    }
    //获取源文件的后缀,后缀
    const fileSuffix = file.name.split('.')[1]
    const filePrefix = file.name.split('.')[0]
    //修改文件名,如果已上传过该文件，则在文件名后面加上(2)、(3)
    let i = 1
    let fileName = file.name
    while(fs.existsSync(fileDir+'/'+fileName)){
         fileName = filePrefix+'('+(i++)+')'+'.'+fileSuffix
    }
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = fileDir + `/`+fileName;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return ctx.body = "上传成功！";
  });

  /**
   * 上传多张图片
   */
  router.post('/uploadfiles', async (ctx, next) => {
    // 上传多个文件
    const files = ctx.request.files.file; // 获取上传文件
    for (let file of files) {
      // 创建可读流
      const reader = fs.createReadStream(file.path);
      // 获取上传文件扩展名
      let filePath = path.join('public/upload') + `/${file.name}`;
      // 创建可写流
      const upStream = fs.createWriteStream(filePath);
      // 可读流通过管道写入可写流
      reader.pipe(upStream);
    }
   return ctx.body = "上传成功！";
  });

  /**
   * 测试session redis，以后可用来做登录
   */
 router.get('/json',async (ctx)=>{
   const session = ctx.session
   //设置一个viewNum
   /* if(session.viewNum == null){
      session.viewNum = 0
   } 
   session.viewNum++*/
   ctx.body = {
     title: 'Hello Koa!',
     //viewNum: session.viewNum
   }
 })

module.exports = router.routes()
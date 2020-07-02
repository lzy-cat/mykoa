/* 
 *@description: 扫描所有的model模型
 * @Author: LZY 
 * @Date: 2020-06-22 14:46:55 
 */
//const fs = require('fs')

//遍历目录
/* let files = fs.readdirSync(__dirname + '/model/admin')
let js_files = files.filter((f)=>{
    return f.endsWith('.js')
},files)

module.exports = {}

for(let f of js_files){
    console.log(`import model from file ${f}`)
    let name = f.substring(0,f.length-3)
    module.exports[name] = require(__dirname + '/model/admin/' + f)
  
} */
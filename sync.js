const sequelize = require('./config/db.js')

//测试连接
sequelize
    .authenticate()
    .then(() => {
        console.log('数据库连接成功');
    })
    .catch(err => {
        console.error('数据库连接失败：', err);
    });

//同步到数据库
sequelize.sync({
    //force: true
}).then(() => {
    process.exit()
})


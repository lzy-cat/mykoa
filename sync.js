const sequelize = require('./config/db.js')
//引入所有模型
const User = require('./model/admin/user')
const Article = require('./model/admin/article')

//测试连接
sequelize
    .authenticate()
    .then(() => {
        console.log('数据库连接成功');
    })
    .catch(err => {
        console.error('数据库连接失败：', err);
    });
//关联模型
Article.belongsTo(User, {
    foreignKeys: 'userId',
    targetKey: 'id'
})
User.hasMany(Article, {
    foreignKey: 'userId',
    sourceKey: 'id'
})

//同步到数据库
sequelize.sync({
    force: false
}).then(() => {
    process.exit()
})
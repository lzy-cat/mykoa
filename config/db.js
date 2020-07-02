const Sequelize = require('sequelize')

const dbConfig = {
    database: 'mykoa',
    username: 'postgres',
    password: '123456',
    host: 'localhost',
    dialect:'postgres'
}

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,{
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        //设置时区
        timezone:'+08:00',
        //为模型添加createdAt和updateAt字段
        define:{
            timestamps:false
        },
        pool:{
            max:50,
            min:0,
            idle:30000
        }
        
    }
)

module.exports = sequelize
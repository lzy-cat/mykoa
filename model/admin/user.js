const Sequelize = require('sequelize')
const db = require('../../config/db.js')

const DataTypes = Sequelize.DataTypes

//定义模型User,我使用define定义模型，也可以使用init，(define的内部其实调用了init)
const User = db.define(
    //表名
    'user',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userName: {
            type: DataTypes.STRING(128),
        },
        password:{
            type: DataTypes.STRING(128),
            validate: {
                check(val) {
                  if (val) {
                    if (val.length < 6) {
                      throw new ParamError('密码不能小于6位')
                    }
                  } else {
                    throw new ParamError('密码不能为空')
                  }
                }
              }
        }
    },{
        timestamps: true,
        //freezeTableName: true   //设置true，sequelize不会改变表名，否则可能会按其规则有所调整
    }
) 

module.exports = User

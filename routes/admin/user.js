const router = require('koa-router')()
const md5 = require('md5')
const Sequelize = require('sequelize')
const User = require('../../model/admin/user.js')
const Article = require('../../model/admin/Article.js')

let Op = Sequelize.Op

/**
 * 用户管理首页
 */
router.get('/', async (ctx) => {
    ctx.body = '用户管理'
})
/**
 * 条件分页查询
 */
router.get('/UserList', async (ctx) => {
    //获取查询条件
    let searchParams = ctx.request.query

    await User.findAndCountAll({
        include: [
            {
                model: Article
            }
        ],
        where: {
            userName: {
                [Op.iLike]: '%' + searchParams.userName + '%'
            }
        },
        //过滤掉前几页数据
        offset: (searchParams.currentPage - 1) * searchParams.size,
        limit: searchParams.size
    }).then(result => {
        ctx.body = {
            code: 200,
            msg: '查询成功',
            data: result.rows
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: '查询失敗',
            data: err
        }
    })
})

/**
 * 添加用戶
 */
router.post('/add', async (ctx) => {
    let addUser = ctx.request.body
    await User.create({
        userName: addUser.userName,
        password: md5(addUser.password),
    }).then((result => {
        ctx.body = {
            code: 200,
            msg: '添加成功',
            data: result
        }
    })).catch(err => {
        ctx.body = {
            code: 500,
            msg: '添加失敗',
            data: err
        }
    })
})
/**
 * 修改用戶
 */
router.get('/edit/:id', async (ctx) => {
    //获取get传值
    let idParams = ctx.params
    let userNameParams = ctx.request.query

    await User.update(
        { userName: userNameParams.userName },
        { where: { id: idParams.id } }
    ).then((result => {
        ctx.body = {
            code: 200,
            msg: '修改成功',
            data: result
        }
    })).catch(err => {
        ctx.body = {
            code: 500,
            msg: '修改失敗',
            data: err
        }
    })
})
/**
 * 删除用户
 */
router.get('/del/:id', async (ctx) => {
    //获取get传值
    let idParams = ctx.params

    await User.destroy({
        where: {
            id: { [Op.eq]: idParams.id }
        },
        paranoid: true  //软删除
    }).then((affectedRows => {
        ctx.body = {
            code: 200,
            msg: '删除成功',
        }
    })).catch(err => {
        ctx.body = {
            code: 500,
            msg: '删除失敗',
            data: err
        }
    })
})

module.exports = router.routes()
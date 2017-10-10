require('babel-polyfill')

const path = require('path')
const fs = require('fs')
const Koa = require('koa')
const app = new Koa()

const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const views = require('koa-views')
const gzip = require('koa-gzip');
const axios = require('axios')
let config = require('./config/appconfig')

app.use(gzip())

//映射静态资源
app.use(static(path.join(__dirname, './static'), {maxage: 3600000 * 24}))

//统一错误处理
app.on('error', function (err) {
    console.log('Uncaught Exception: ', err);
})

//加载模版引擎
app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}))

//解析请求体数据
app.use(bodyParser())


//const router = require('./router/index');
const Router = require('koa-router');
router = new Router();
router.all('/app', async ctx => {
    await ctx.render('app')
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(config.appPort, "0.0.0.0");
console.log('app start at: ' + config.appPort);

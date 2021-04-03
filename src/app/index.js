const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const useRoutes = require('../router/index')
const errorHandler = require('./error-handle')

app.use(bodyParser());
useRoutes(app)
// app.use(userRouter.routes());
// app.use(userRouter.allowedMethods());

// app.use(authRouter.routes());
// app.use(authRouter.allowedMethods());

app.on('error',errorHandler)

module.exports = app;
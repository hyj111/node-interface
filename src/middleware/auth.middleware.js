const jwt = require('jsonwebtoken')

const errorType = require('../constants/error.types')
const service = require('../service/user.service')
const md5password = require('../utils/password-handle')
const {PUBLIC_KEY} = require('../app/config')
const verifyLogin =async (ctx, next)=>{
  // 1.获取用户名和密码
  const {name,password} = ctx.request.body;
  // 2.判断用户名密码不为空
  if(!name || !password || name==='' || password === ''){
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error',error,ctx);
  }
  // 3.判断用户是否存在
  const result = await service.getUserByName(name)
  const user = result[0]
  if(!user){
    const error = new Error(errorType.USER_DOES_NOT_EXISTS)
    return ctx.app.emit('error',error,ctx);
  }
  // 4.判断密码是否和数据库的密码是一致（加密）
  if(md5password(password) !== user.password) {
    const error = new Error(errorType.PASSWORD_IS_INCORRENT)
    return ctx.app.emit('error',error,ctx);
  }

  ctx.user = user
  await next()
}

const verifyAuth = async (ctx,next)=>{
  // 1.获取token
  const authorization = ctx.headers.authorization
  if(!authorization) {
    const error = new Error(errorType.UNAUTHORIZATION)
    return ctx.app.emit('error',error,ctx)
  }
  const token = authorization.replace('Bearer ','')

  // 2.验证token
  try {
    const result = jwt.verify(token,PUBLIC_KEY,{
      algorithms:["RS256"]
    })
    ctx.user = result
    await next()
  } catch (err) {
    const error = new Error(errorType.UNAUTHORIZATION)
    ctx.app.emit('error',error,ctx)
  }
 
 
}

module.exports = {verifyLogin,verifyAuth}
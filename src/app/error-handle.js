const errorType = require('../constants/error.types')

const errorHandler = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = "用户名或者密码不能为空"
      break;
    case errorType.USER_ALREADY_EXISTS:
      status = 409;
      message = "用户名已存在"
      break;
    case errorType.USER_DOES_NOT_EXISTS:
      status = 409;
      message = "用户名不存在"
      break;
    case errorType.PASSWORD_IS_INCORRENT:
      status = 409;
      message = "密码错误"
      break;
    case errorType.UNAUTHORIZATION:
      status = 401;
      message = "无效token"
      break;
    case errorType.DEVICE_ALREADY_EXISTS:
      status = 409;
      message = "设备已被绑定"
      break;
    case errorType.DEVICE_ISNOT_EXISTS:
        status = 409;
        message = "设备不存在"
        break;
    default:
      status = 404;
      message = "NOT FOUND"
  }
  console.log(error.message);
  ctx.status = status
  ctx.body = message
}
module.exports = errorHandler
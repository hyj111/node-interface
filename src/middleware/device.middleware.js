// 判断设备号有没有被绑定
const errorType = require('../constants/error.types')
const service = require('../service/device.service')

const verifyDevice = async (ctx, next) => {
  const {
    deviceId
  } = ctx.request.body;
  const userId = ctx.user.id
  const result = await service.getDeviceIdByUserId(userId, deviceId)
  if (result.length) {
    const error = new Error(errorType.DEVICE_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx);
  }
  await next()
}

const verifyDeviceHave = async (ctx, next) => {
  const {
    deviceId
  } = ctx.request.body;
  const userId = ctx.user.id
  const result = await service.getDeviceIdByUserId(userId, deviceId)
  if (!result.length) {
    const error = new Error(errorType.DEVICE_ISNOT_EXISTS)
    return ctx.app.emit('error', error, ctx);
  }
  await next()
}
module.exports = {
  verifyDevice,
  verifyDeviceHave
}
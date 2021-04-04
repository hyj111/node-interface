const Router = require('koa-router')
const {
  verifyAuth
} = require('../middleware/auth.middleware')
// 验证设备id有没有被重复绑定
const {
  verifyDevice,
  verifyDeviceHave
} = require('../middleware/device.middleware')
const deviceRouter = new Router({prefix:'/device'})
const {create,detail,deleteDevice} = require('../controller/device.controller')


deviceRouter.post('/',verifyAuth,verifyDevice,create)
deviceRouter.get('/search',verifyAuth,detail)
deviceRouter.post('/delete',verifyAuth,verifyDeviceHave,deleteDevice)

module.exports = deviceRouter
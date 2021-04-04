const deviceService  = require('../service/device.service')
class DeviceController {
  async create(ctx, next) {
    // 1.获取数据user_id,device_id
    const userId = ctx.user.id
    const deviceId = ctx.request.body.deviceId
    const title = ctx.request.body.title 
    //将数据插入到数据库里面
    const result = await deviceService.create(userId,deviceId,title)
    ctx.body = '植物设备绑定成功'
  }
  async detail(ctx,next){
    const userId = ctx.user.id
    // 根据userid去查找绑定的设备号
    const result = await deviceService.search(userId)
    ctx.body = result
  }
  // 删除设备
  async deleteDevice(ctx,next){
    const userId = ctx.user.id
    const deviceId=ctx.request.body.deviceId
    const result = await deviceService.deleteDevice(userId,deviceId)
    ctx.body = '设备删除成功'
  }
}

module.exports = new DeviceController();
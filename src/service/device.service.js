const connection = require('../app/database')

class DeviceService {
  async create(userId,deviceId,title) {
    const statement = `INSERT INTO device (user_id,device_id,title) VALUES (?,?,?);`
    const result = await connection.execute(statement,[userId,deviceId,title]);
    return result
  }
  async getDeviceIdByUserId(userId,deviceId){
    const statement = `SELECT * FROM device WHERE user_id = ? AND device_id = ?;`
    const result = await connection.execute(statement,[userId,deviceId]);
    return result[0]
  }
  async search(userId) {
    const statement = `SELECT users.id id,users.name name,
    JSON_ARRAYAGG(JSON_OBJECT('id',device.id,'device_id',device.device_id,'title',device.title)) device
    FROM users
    LEFT JOIN device ON users.id = device.user_id
    WHERE users.id = ?
    GROUP BY users.id;`
    let result = await connection.execute(statement,[userId]);
    return result[0]
  }
  // 解除设备绑定
  async deleteDevice(userId,deviceId){
    const statement = `DELETE FROM device WHERE user_id=? AND device_id=?;`
    const result = await connection.execute(statement,[userId,deviceId]);
    return result[0]
  }
}

module.exports = new DeviceService();
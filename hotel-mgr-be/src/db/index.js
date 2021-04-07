const mongoose = require('mongoose');
require('./Schemas/User');
require('./Schemas/InviteCode');
require('./Schemas/Hotel')

const connect = () => {
  return new Promise((resolve) => {
    //连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/hotel-mgr');


    //当数据库被打开是，做一些事情
    mongoose.connection.on('open', () => {
      console.log('连接数据库成功');
      resolve()
    })
  })
}

module.exports = {
  connect,
}


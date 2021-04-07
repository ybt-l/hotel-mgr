const mongoose = require('mongoose');
const { getMate } = require('../helpers');

const HotelSchema = new mongoose.Schema({
  //房间名
  name: String,
  //价格
  price: Number,
  //管理员
  admin: String,
  //发布时间
  publishDate: String,
  //分类
  classify: String,
  //库存
  count: Number,

  meta: getMate(),
});

mongoose.model('Hotel', HotelSchema);
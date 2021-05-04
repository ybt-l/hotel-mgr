const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const HotelClassify = mongoose.model('HotelClassify');

const router = new Router({
  prefix: '/hotel-classify',
});

router.get('/list', async (ctx) => {
  const list = await HotelClassify.find().sort({
    _id: -1,
  }).exec();

  ctx.body = {
    data: list,
    code: 1,
    msg: '获取成功',
  }
});

router.post('/add', async (ctx) => {
  const {
    title,
  } = ctx.request.body;

  const one = await HotelClassify.findOne({
    title,
  }).exec();

  if (one) {
    ctx.body = {
      code: 0,
      msg: '房间分类已经存在',
    };
    return;
  }

  const hotelClassify = new HotelClassify({
    title,
  });

  const saved = await hotelClassify.save();

  ctx.body = {
    data: saved,
    code: 1,
    msg: '创建成功',
  }
});

router.delete('/:id', async (ctx) => {
  const {
    id,
  } = ctx.params;

  const res = await HotelClassify.deleteOne({
    _id: id,
  });

  ctx.body = {
    data: res,
    code: 1,
    msg: '删除成功',
  };
});

router.post('/update/title', async (ctx) => {
  const {
    id,
    title,
  } = ctx.request.body;

  const one = await HotelClassify.findOne({
    _id: id,
  });

  if (!one) {
    ctx.body = {
      msg: '资源不存在',
      code: 0,
    };
    return;
  }

  one.title = title;

  const res = await one.save();

  ctx.body = {
    data: res,
    code: 1,
    msg: '修改成功',
  }
});

module.exports = router;
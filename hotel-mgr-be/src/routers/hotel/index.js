const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils/index');

const HOTEL_CONST = {
  IN: 'IN_COUNT',
  OUT: 'OUT_COUNT',
}

const Hotel = mongoose.model('Hotel');


const router = new Router({
  prefix: '/hotel',
});

router.post('/add', async (ctx) => {
  const {
    name,
    price,
    admin,
    publishDate,
    classify,
    count,
  } = getBody(ctx);

  const hotel = new Hotel({
    name,
    price,
    admin,
    publishDate,
    classify,
    count,
  });

  const res = await hotel.save();

  ctx.body = {
    data: res,
    code: 1,
    msg: '添加成功',
  };

});

router.get('/list', async (ctx) => {
  const {
    page = 1,
    keyword = '',
  } = ctx.query;

  let = {
    size = 5,
  } = ctx.query;

  size = Number(size);

  const query = {};

  if (keyword) {
    query.name = keyword;
  }

  const list = await Hotel
    .find(query)
    .skip((page - 1) * size)
    .limit(size)
    .exec();

  const total = await Hotel.countDocuments();

  ctx.body = {
    data: {
      total,
      list,
      size,
      page,
    },
    code: 1,
    msg: '添加列表成功',
  };
});

router.delete('/:id', async (ctx) => {
  const {
    id,
  } = ctx.params;

  const delMsg = await Hotel.deleteOne({
    _id: id,
  });

  ctx.body = {
    data: delMsg,
    code: 1,
    msg: '删除成功',
  };

});


router.post('/update/count', async (ctx) => {
  const {
    id,
    type,
  } = ctx.request.body;

  let {
    num,
  } = ctx.request.body;

  num = Number(num);
  const hotel = await Hotel.findOne({
    _id: id,
  }).exec();

  if (!hotel) {
    ctx.body = {
      code: 0,
      msg: '没有找到房间名',
    }

    return;
  }

  //找到房间名
  if (type === HOTEL_CONST.IN) {
    //入库操作
    num = Math.abs(num);
  } else {
    //出库操作
    num = -Math.abs(num);
  }

  hotel.count += num;

  if (hotel.count < 0) {
    ctx.body = {
      code: 0,
      msg: '剩下的量不足以出库',
    }
    return;
  }

  const res = await hotel.save();
  ctx.body = {
    data: res,
    code: 1,
    msg: '操作成功',
  }
});

router.post('/update', async (ctx) => {
  const {
    id,
    ...others
  } = ctx.request.body;

  const one = await Hotel.findOne({
    _id: id,
  }).exec();
  //如果没有找到房间名
  if (!one) {
    ctx.body = {
      msg: '没有找到房间名',
      code: 0,
    }
    return;
  }

  const newQuery = {};
  Object.entries(others).forEach(([key, value]) => {
    if (value) {
      newQuery[key] = value;
    }
  });

  Object.assign(one, newQuery);
  const res = await one.save();

  ctx.body = {
    data: res,
    code: 1,
    msg: '保存成功',
  }
});

module.exports = router;
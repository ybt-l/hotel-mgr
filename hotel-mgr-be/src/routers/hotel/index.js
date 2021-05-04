const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils/index');
const config = require('../../project.config');
const { loadExcel, getFirstSheet } = require('../../helpers/excel');

const HOTEL_CONST = {
  IN: 'IN_COUNT',
  OUT: 'OUT_COUNT',
}

const Hotel = mongoose.model('Hotel');
const InventoryLog = mongoose.model('InventoryLog');
const HotelClassify = mongoose.model('HotelClassify');

const findHotelOne = async (id) => {
  const one = Hotel.findOne({
    _id: id,
  }).exec();

  return one;
};

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
    .sort({
      _id: -1,
    })
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
  const hotel = await findHotelOne(id);
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
  const log = new InventoryLog({
    num: Math.abs(num),
    type,
  });

  log.save();

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

  const one = await findHotelOne(id);

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

router.get('/detail/:id', async (ctx) => {
  const {
    id,
  } = ctx.params;

  const one = await findHotelOne(id);
  //如果没有找到房间名
  if (!one) {
    ctx.body = {
      msg: '没有找到房间名',
      code: 0,
    }
    return;
  }

  ctx.body = {
    msg: '查询成功',
    data: one,
    code: 1,
  }

});

router.post('/addMany', async (ctx) => {
  const {
    key = ''
  } = ctx.request.body;

  const path = `${config.UPLOAD_DIR}/${key}`;

  const excel = loadExcel(path);
  const sheet = getFirstSheet(excel);

  const arr = [];
  for (let i = 0; i < sheet.length; i++) {
    let record = sheet[i];

    const [
      name,
      price,
      admin,
      publishDate,
      classify,
      count,
    ] = record;

    let classifyId = classify;

    const one = await HotelClassify.findOne({
      title: classify,
    });

    if (one) {
      classifyId = one._id;
    }

    arr.push({
      name,
      price,
      admin,
      publishDate,
      classify: classifyId,
      count,
    });
  }

  await Hotel.insertMany(arr);

  ctx.body = {
    code: 1,
    msg: '添加成功',
    data: {
      addCount: arr.length,
    }
  };
});

module.exports = router;
const Router = require('@koa/router');
const mongoose = require('mongoose');


const Hotel = mongoose.model('Hotel');
const Log = mongoose.model('Log');
const User = mongoose.model('User');

const router = new Router({
  prefix: '/dashboard',
});

router.get('/base-info', async (ctx) => {
  const hotelTotal = await Hotel.countDocuments();
  const userTotal = await User.countDocuments();
  const logTotal = await Log.find({ show: true }).countDocuments();

  ctx.body = {
    code: 1,
    msg: '获取成功',
    data: {
      total: {
        hotel: hotelTotal,
        user: userTotal,
        log: logTotal,
      }
    }
  }
})

module.exports = router;
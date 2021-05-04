const auth = require('./auth');
const inviteCode = require('./invite-code');
const hotel = require('./hotel');
const inventoryLog = require('./inventory-log');
const user = require('./user');
const character = require('./character');
const log = require('./log');
const forgetPassword = require('./forget-password');
const hotelClassify = require('./hotel-classify');
const profile = require('./profile');
const dashboard = require('./dashboard');
const upload = require('./upload');


module.exports = (app) => {
  app.use(auth.routes());
  app.use(inviteCode.routes());
  app.use(hotel.routes());
  app.use(inventoryLog.routes());
  app.use(user.routes());
  app.use(character.routes());
  app.use(log.routes());
  app.use(forgetPassword.routes());
  app.use(hotelClassify.routes());
  app.use(profile.routes());
  app.use(dashboard.routes());
  app.use(upload.routes());
}
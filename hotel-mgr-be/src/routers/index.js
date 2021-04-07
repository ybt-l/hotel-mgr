const auth = require('./auth');
const inviteCode = require('./invite-code');
const hotel = require('./hotel');

module.exports = (app) => {
  app.use(auth.routes());
  app.use(inviteCode.routes());
  app.use(hotel.routes());
}
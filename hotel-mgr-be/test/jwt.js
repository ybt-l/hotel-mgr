var jwt = require('jsonwebtoken');
var token = jwt.sign({
  account: 'a.cc.com',
  _id: '123',
}, 'aaaa');

console.log(token);


jwt.verify(token, 'aaaabb', (err, payload) => {
  console.log(err, payload);
});
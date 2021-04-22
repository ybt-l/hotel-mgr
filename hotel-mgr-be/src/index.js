const Koa = require('koa');
const koaBody = require('koa-body')
const { connect } = require('./db');
const registerRoutes = require('./routers');
const { middleware: koaJwtMiddleware, catchTokenError } = require('./helpers/token');
const cors = require('@koa/cors');


const app = new Koa();


connect().then(() => {
  app.use(cors());
  app.use(koaBody());

  app.use(catchTokenError);
  koaJwtMiddleware(app);

  registerRoutes(app);

  //接受http请求，并做出处理，处理完后响应
  app.listen(3000, () => {
    console.log('启动成功');
  });
})


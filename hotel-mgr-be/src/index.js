const Koa = require('koa');

const app = new Koa();

app.use(async (context) => {

  const { request: req } = context;
  const { url } = req;

  if (url === '/user') {
    context.response.body = '我爱你'
    return
  }
  context.body = '???'
})

app.listen(3000, () => {
  console.log('启动成功');
});
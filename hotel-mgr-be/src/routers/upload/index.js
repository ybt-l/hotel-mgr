const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { verify, getToken } = require('../../helpers/token');
const { saveFileToDisk, getUploadFileExt } = require('../../helpers/upload');
const config = require('../../project.config');
const path = require('path');

const User = mongoose.model('User');
const Character = mongoose.model('Character');

const router = new Router({
  prefix: '/upload',
});

router.post('/file', async (ctx) => {
  const ext = getUploadFileExt(ctx);
  const filename = `${uuidv4()}.${ext}`;

  await saveFileToDisk(ctx, path.resolve(config.UPLOAD_DIR, filename));

  ctx.body = {
    data: filename,
    msg: '',
    code: 1,
  };

});


module.exports = router;
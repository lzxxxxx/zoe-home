const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const path = require('path');
const serve = require('koa-static');
const route = require('koa-route');

const mainHtml = (ctx, next) => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream(path.resolve(__dirname,'../client/public/page1.html'));
}

const mainResource = serve(path.resolve(__dirname, '../client/public/'));

app.use(route.get('/',mainHtml));
app.use(mainResource);
app.listen(9999,'0.0.0.0');

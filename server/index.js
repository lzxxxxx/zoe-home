const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const path = require('path');
const serve = require('koa-static');
const route = require('koa-route');
const BlogModel = require('./models/blog');
// const BlogModel = mongoose.model('Blog');

const mainHtml = (ctx, next) => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream(path.resolve(__dirname,'../client/public/page1.html'));
}

const addBlog = (ctx, next)=>{//请求一次存一次
  let newBlog = {
    time: Date.now,
    title: 'title1',
    desc: 'desc1',
    content: 'content1'
  };
  yield new BlogModel(newBlog).save();
  ctx.response.type = "text/plain";
  ctx.response.body = '存储成功！请尝试请求 getBlog 查看返回结果'
}
const getBlog = (ctx, next)=>{
  ctx.response.type = 'json';
  ctx.response.body = yield BlogModel.find();
}

const mainResource = serve(path.resolve(__dirname, '../client/public/'));

app.use(route.get('/',mainHtml));
app.use(route.get('/addBlog',addBlog));
app.use(route.get('/getBlog',getBlog));

app.use(mainResource);
app.listen(9999,'0.0.0.0');

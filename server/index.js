const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const path = require('path');
const serve = require('koa-static');
const Router = require('koa-router');
const BlogModel = require('./models/blog');
// const BlogModel = mongoose.model('Blog');

const mainHtml = (ctx, next) => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream(path.resolve(__dirname,'../client/public/page1.html'));
}

const addBlog = function *(){
  let newBlog = {
    time: Date.now,
    title: 'title1',
    desc: 'desc1',
    content: 'content1'
  };

  let blog = new BlogModel(newBlog);
  this.type = "text/plain";
  this.body = '存储成功！请尝试请求 getBlog 查看返回结果'
}

const getBlog = function *(){
  let res = yield BlogModel.find();
  console.log('111111',res);
  this.type = 'json';
  this.body = '读取成功！';

}

const mainResource = serve(path.resolve(__dirname, '../client/public/'));

let router = new Router();
router.get('/',mainHtml);
router.get('/addBlog',addBlog);
router.get('/getBlog',getBlog);
app.use(router.routes());

app.use(mainResource);
app.listen(9999,'0.0.0.0');

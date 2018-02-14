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

const addBlog = function (ctx,next){
  let newBlog = {
    time: Date.now,
    title: 'title1',
    desc: 'desc1',
    content: 'content1'
  };

  let blog = new BlogModel(newBlog);
  return blog.save().then(blog=>{
    this.type = "text/plain";
    this.body = '存储成功！请尝试请求 getBlog 查看返回结果'
  });
}

const getBlog = function (ctx,next){
  BlogModel.find().then(blog=>{
    this.type = 'json';
    // ctx.response.body = yield (BlogModel.find());
    this.body = '读取成功！';
  });
}

const mainResource = serve(path.resolve(__dirname, '../client/public/'));

app.use(route.get('/',mainHtml));
app.use(route.get('/addBlog',addBlog));
app.use(route.get('/getBlog',getBlog));

app.use(mainResource);
app.listen(9999,'0.0.0.0');

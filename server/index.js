const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const path = require('path');
const serve = require('koa-static');
const route = require('koa-router');
const BlogModel = require('./models/blog');

const mainHtml = (ctx, next) => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream(path.resolve(__dirname,'../client/public/page1.html'));
}

const addBlog = function* (){
  console.log(`${this.body} get body`);
  let newBlog = {
    time: Date.now(),
    title: 'title1',
    desc: 'desc1',
    content: 'content1'
  };
  let blog = new BlogModel(newBlog);
  console.log('before yield');
  let data = yield blog.save();
  console.log('getdata',data);
  this.type = "text/plain";
  this.body = "err";
}

const getBlog = function (ctx,next){
    // BlogModel.find((err,blog)=>{
    //   console.log('in find');
    //   ctx.response.type = "text/plain";
    //   ctx.response.body = "err";
    // })
}

const mainResource = serve(path.resolve(__dirname, '../client/public/'));

app.use(route.get('/',mainHtml));
app.use(route.get('/addBlog',addBlog));
app.use(route.get('/getBlog',getBlog));

app.use(mainResource);//静态文件路由，结合 public/resource/js 文件可理解
app.listen(9999,'0.0.0.0');

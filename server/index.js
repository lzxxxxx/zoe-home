const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const path = require('path');
const serve = require('koa-static');
const route = require('koa-route');
const BlogModel = require('./models/blog');

const mainHtml = (ctx, next) => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream(path.resolve(__dirname,'../client/public/page1.html'));
}

const addBlog = async function (ctx,next){
  let newBlog = {
    time: Date.now(),
    title: 'title1',
    desc: 'desc1',
    content: 'content1'
  };
  let blog = new BlogModel(newBlog);
  blog.pre("save", function(next) {
    if(!this.trial){
      //do your job here
      ctx.response.type = "text/plain";
      ctx.response.body = "err"
      next();
    }
  });
  await blog.save();
  await BlogModel.findOne();

  ctx.response.type = "text/plain";
  ctx.response.body = "err"
}

const getBlog = function (ctx,next){
    BlogModel.find((err,blog)=>{
      console.log(err);
      console.log(blog);
      ctx.response.type = "text/plain";
      ctx.response.body = "err";
      // ctx.response.body = yield (BlogModel.find());
      // err ? ctx.response.body = 'err' : ctx.response.body = 'blog'
    })
}

const mainResource = serve(path.resolve(__dirname, '../client/public/'));

app.use(route.get('/',mainHtml));
app.use(route.get('/addBlog',addBlog));
app.use(route.get('/getBlog',getBlog));

app.use(mainResource);
app.listen(9999,'0.0.0.0');

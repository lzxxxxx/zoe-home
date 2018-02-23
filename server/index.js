const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const path = require('path');
const serve = require('koa-static');
const Router = require('koa-router');
const router = new Router();
const BlogModel = require('./models/blog');

const mainHtml = (ctx, next) => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream(path.resolve(__dirname,'../client/public/page1.html'));
}

// const addBlog = function (ctx, next){
//   let newBlog = {
//     time: Date.now(),
//     title: 'title1',
//     desc: 'desc1',
//     content: 'content1'
//   };
//   let blog = new BlogModel(newBlog);
//   console.log('dfadfasdf',blog.save());
//   return blog.save().then(function(err,data){
//     console.log(data);
//     ctx.response.type = "text/plain";
//     ctx.response.body = "err addblog";
//     next();
//   })
// }

// const getBlog = function (ctx,next){
//     return BlogModel.find((err,blog)=>{
//       console.log('in find');
//       ctx.response.type = "text/plain";
//       ctx.response.body = "err get";
//     })
// }

const addBlog = async function (ctx, next){
  ctx.body = 'addblog body';
}

const getBlog = async function (ctx, next){
  ctx.body = await BlogModel.find().exec();
  await next();
}

const mainResource = serve(path.resolve(__dirname, '../client/public/'));

router.get('/',mainHtml);
router.get('/addBlog',addBlog);
router.get('/getBlog',getBlog);
app.use(router.routes()).use(router.allowedMethods());

app.use(mainResource);//静态文件路由，结合 public/resource/js 文件可理解
app.listen(9999,'0.0.0.0');

const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const path = require('path');
const serve = require('koa-static');
const Router = require('koa-router');
const router = new Router();
const BlogModel = require('./models/blog');

const mongoose = require('mongoose');
//var uri = 'mongodb://username:password@hostname:port/databasename';
const url = 'mongodb://localhost:27017/zoehome';
mongoose.connection.once('open', function() {
  console.log('open======!!');

  mongoose.connection.on('connected', function() {
    console.log('connected======');
  });

  mongoose.connection.on('disconnected', function() {
    console.log('disconnected======');
  });

  mongoose.connection.on('reconnected', function() {
    console.log('reconnected======');
  });

  mongoose.connection.on('error', function(err) {
    console.log('err====',err);
  });

  // return resolve();
  // return server.start();
});
return mongoose.connect(url, {}, function(err) {
  if (err) {
    console.log('connect err-----',err);
    // logger.error('MongoDB connection error: ' + err);
    // return reject(err);
    process.exit(1);
  }
});

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
  let newBlog = {
    time: Date.now(),
    title: 'title1',
    desc: 'desc1',
    content: 'content1'
  };
  let blog = new BlogModel(newBlog);
  ctx.body = await blog.save();
}

const mainResource = serve(path.resolve(__dirname, '../client/public/'));

router.get('/',mainHtml);
router.get('/addBlog',addBlog);
router.get('/getBlog',getBlog);
app.use(router.routes()).use(router.allowedMethods());

app.use(mainResource);//静态文件路由，结合 public/resource/js 文件可理解
app.listen(9999,'0.0.0.0');

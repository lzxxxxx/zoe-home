const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
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
mongoose.connect(url, {}, function(err) {
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

const addBlog = async function (ctx, next){
    //获取到实例，实例化文档，存入数据库
    //后期这里要加一层校验，这个可以看看别的系统怎么做的，其实更好的方式我觉得应该是在存入数据库的钩子里加，这样不用给每个请求都写
  let newBlog = {...ctx.request.body,time: Date.now()};
  let blog = new BlogModel(newBlog);
  ctx.body = await blog.save();
}

const getBlog = async function (ctx, next){
  let res = await BlogModel.find().select('time title desc _id').lean().exec();
  //在这里转换 ISODate 和时间戳
  res.length ? (res = res.map(item=>{item.time && (item.time = item.time.getTime());return item;})) : res.time = res.time.getTime();
  ctx.body = JSON.stringify(res);
}

const getBlogcontent = async function (ctx, next){
  let id = ctx.request.body.id;
  let res = await BlogModel.findOne({_id: id}).select('title content desc time _id').lean().exec();
  ctx.body = JSON.stringify(res);
}

const mainResource = serve(path.resolve(__dirname, '../client/public/'));

router.get('/',mainHtml);
router.post('/addBlog',addBlog);
router.get('/getBlog',getBlog);
router.post('/getBlogcontent',getBlogcontent)
app.use(async function(ctx,next){
  ctx.set('Allow','OPTIONS, GET, PUT, POST, DELETE')
  await next();
})
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods());

app.use(mainResource);//静态文件路由，结合 public/resource/js 文件可理解
app.listen(9999,'0.0.0.0');

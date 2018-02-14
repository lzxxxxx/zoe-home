const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const path = require('path');
const serve = require('koa-static');
const route = require('koa-route');
// const BlogModel = require('./models/blog');
const BlogModel = mongoose.model('Blog');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Blog = new Schema({
  "time": {type:Date, default: Date.now },
  "title":{type:String, default: "暂无标题"},
  "desc": {type:String, default: "暂无描述"},
  "content": {type:String, default: "暂无内容"},
})

//Schema只是定义，最终要进行操作前必须用mongoose.model方法将Schema转换为Model才行
const model = mongoose.model('Blog',Blog)

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
  let model1 = new model(newBlog)
  yield model1.save();
  ctx.response.type = "text/plain";
  ctx.response.body = '存储成功！请尝试请求 getBlog 查看返回结果'
}
const getBlog = (ctx, next)=>{
  ctx.response.type = 'json';
  ctx.response.body = yield model.find();
}

const mainResource = serve(path.resolve(__dirname, '../client/public/'));

app.use(route.get('/',mainHtml));
app.use(route.get('/addBlog',addBlog));
app.use(route.get('/getBlog',getBlog));

app.use(mainResource);
app.listen(9999,'0.0.0.0');

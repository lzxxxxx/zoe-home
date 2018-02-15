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
  let pro = new Promise((res,rej)=>{
    setTimeout(()=>{
      res();
    },2000)

    pro.then((res)=>{
      ctx.response.type = "text/plain";
      ctx.response.body = "err";
    });
  })
  // blog.save((err,data)=>{
  //   console.log('in save');
  //   ctx.response.type = "text/plain";
  //   ctx.response.body = "err";
  // });
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

app.use(mainResource);
app.listen(9999,'0.0.0.0');

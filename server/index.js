const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const path = require('path');
const serve = require('koa-static');
const route = require('koa-route');
const BlogModel = require('./models/blog');

var mongo = require('mongoose');
var connection = mongo.connect('mongodb://127.0.0.1/test');

connection.on("error", function(errorObject){
  console.log(errorObject);
  console.log('ONERROR');
});

var Schema = mongo.Schema;
var BookSchema = new Schema({ title : {type : String, index : {unique : true}}});
var BookModel = mongo.model('abook', BookSchema);
var b = new BookModel({title : 'aaaaaa'});

const mainHtml = (ctx, next) => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream(path.resolve(__dirname,'../client/public/page1.html'));
}

const addBlog = async function (ctx,next){
  b.save( function(e,data){
    if(e){
      ctx.response.type = "text/plain";
      ctx.response.body = "err";
      console.log('error')
    }else{
      console.log('no error')
      ctx.response.type = "text/plain";
      ctx.response.body = "no err";
    }});
}

const getBlog = function (ctx,next){
    BlogModel.find((err,blog)=>{
      ctx.response.type = "text/plain";
      ctx.response.body = "err";
    })
}

const mainResource = serve(path.resolve(__dirname, '../client/public/'));

app.use(route.get('/',mainHtml));
app.use(route.get('/addBlog',addBlog));
app.use(route.get('/getBlog',getBlog));

app.use(mainResource);
app.listen(9999,'0.0.0.0');

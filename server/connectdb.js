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

let con = mongoose.connect(url, {}, function(err) {
  if (err) {
    console.log('connect err-----',err);
    // logger.error('MongoDB connection error: ' + err);
    // return reject(err);
    process.exit(1);
  }
});

// const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Blog = new Schema({
  time: {type:Date, default: Date.now },
  title:{type:String, default: "暂无标题"},
  desc: {type:String, default: "暂无描述"},
  content: {type:String, default: "暂无内容"},
})

//Schema只是定义，最终要进行操作前必须用mongoose.model方法将Schema转换为Model才行
const model = con.model('Blog',Blog)

module.exports = model;
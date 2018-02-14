const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Blog = new Schema({
  "time": {type:Date, default: Date.now },
  "title" {type:String, default: "暂无标题"},
  "desc": {type:String, default: "暂无描述"},
  "content": {type:String, default: "暂无内容"},
})

//Schema只是定义，最终要进行操作前必须用mongoose.model方法将Schema转换为Model才行
const model = mongoose.model('Blog',Blog)

module.exports = model;

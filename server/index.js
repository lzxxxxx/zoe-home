const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const path = require('path');
const serve = require('koa-static');
const route = require('koa-route');

const mainHtml = (ctx, next) => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream(path.resolve(__dirname,'../client/public/page1.html'));
}

const mainResource = serve(path.resolve(__dirname, '../client/public/'));

app.use(route.get('/',mainHtml));
app.use(mainResource);
app.listen(8889);

// 工作任务：
// 1.海外产品站的迁移，海外活动的开发
// 2.门店活动，游戏等，微信米家会员
// 3.小米人相关

// 工作总结：

// 1.海外产品站迁移及开发40+，海外活动10+。比较有代表性的是 mi-a1的首页部分和全球摄影大赛的首页、地区页、规则页。

// 2.门店开业游戏-老虎机等，活动-新年贺卡等。微信米家会员礼品卡绑定和地址选择部分等。第一次写地址选择器，三级联动。

// 3.小米人相关如：望岳，小米人2.0预热活动



// 工作感受：

// 在跟后端沟通、接口设计和数据结构，项目的构建、开发流程，以及与人沟通上有了一定的进步。慢慢向「专业」的前端方向靠拢（但是还不够专业）。组内氛围很好，无论是工作氛围还是学习氛围。
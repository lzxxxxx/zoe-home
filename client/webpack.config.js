const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

function buildHtml (){
  const entry = Config.entry;
  Object.keys(entry).forEach(ent=>{
    if (typeof Config.entry[ent] == 'object') return ;
    let item = new HtmlWebpackPlugin({
      filename: `${ent}.html`,
      template: './client/template/index.html',
      minify: false,
      chunks: [`${ent}`,'chunk'],//和 entry 部分的 key 一致
      hash: true//缓存管理
    });
    Config.plugins.push(item);
  });
}

const Config = {
  entry: {
    index: './client/index.js'
  },
  output: {
    path: path.resolve(__dirname,'dev'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    modules: [//优化解析
      path.resolve(__dirname,"../node_modules")
    ]
  },
  module: {//项目中的不同类型的模块如何处理 （import 的）
    // noParse: 
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['latest','react','stage-3'],
          }
        },
        include: path.resolve(__dirname)
      },
      {
        test: /\.(scss|css)$/,
        use: [{
          loader: 'style-loader'
        },{
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      },
      { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
        loader: 'url-loader' 
      }
    ]
  },
  devServer: {
    contentBase: './dev',
    port: 8999,
    hot: true
  },
  devtool: "inline-source-map",
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ["chunk"],
      // ( 公共chunk(commnons chunk) 的名称)
      minChunks: 2,
      // (模块必须被2个 入口chunk 共享)

      chunks: ["index"],
      // (只使用这些 入口chunk)
    })
  ],
};

buildHtml();

module.exports = Config;

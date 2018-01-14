const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

function buildHtml (){
  const entry = Config.entry;
  Object.keys(entry).forEach(ent=>{
    if (typeof Config.entry[ent] == 'object') return ;
    let item = new HtmlWebpackPlugin({
      filename: `${ent}.html`,
      template: './template/index.html',
      minify: false,
      chunks: [`${ent}`,'chunk'],//和 entry 部分的 key 一致
      hash: true//缓存管理
    });
    Config.plugins.push(item);
  });
}

const Config = {
  entry: {
    page1: './src/js/page1.js',
    page2: './src/js/page2.js',
  },
  output: {
    path: path.resolve(__dirname,'dev'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {//项目中的不同类型的模块如何处理 （import 的）
    // noParse: 
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['latest','react']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        },{
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
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

      chunks: ["page1", "page2"],
      // (只使用这些 入口chunk)
    })
  ],
};

buildHtml();

module.exports = Config;

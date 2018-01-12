const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './template/index.html',
      minify: false,
      hash: true
    }),
  ],
};

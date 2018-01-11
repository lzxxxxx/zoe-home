const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    bundle: './src/js/app.js',
  },
  output: {
    path: path.join(__dirname,'public'),
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: "inline-source-map",
  plugins: [
    new CleanWebpackPlugin(['public'],{
      root: path.join(__dirname, "./public/"),
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      title: 'index',
      template: './template/index.html',
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true
      },
      hash: true
    }),
  ]
};
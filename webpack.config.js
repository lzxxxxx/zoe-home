const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    bundle: './app.js',
  },
  output: {
    path: path.resolve(__dirname,'./dev/js'),
    filename: './js/[name].js',
    publicPath: '/js/'
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
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true
      },
      hash: true
    }),
  ],
};

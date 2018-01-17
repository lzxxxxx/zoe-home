const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');


function buildHtml (){
  const entry = Config.entry;
  Object.keys(entry).forEach(ent=>{
    if (typeof Config.entry[ent] == 'object') return ;
    let item = new HtmlWebpackPlugin({
        filename: `${ent}.html`,
        template: './template/index.html',
        chunks: [`${ent}`,'chunk'],//和 entry 部分的 key 一致
        minify: {
          removeAttributeQuotes: true,
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true,
          minifyCSS: true
        },
        hash: true
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
    path: path.resolve(__dirname,'public'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    modules: [//优化解析
      path.resolve(__dirname,"node_modules")
    ]
  },
  module: {
    // noParse: 
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['latest','react']
          }
        },
        include: path.resolve(__dirname,"src")
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
  devtool: "inline-source-map",
  plugins: [
    new CleanWebpackPlugin(['public'],{
      root: path.resolve(__dirname, "./public/"),
      verbose: true,
      dry: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ["chunk"],
      // ( 公共chunk(commnons chunk) 的名称)
      minChunks: 2,
      // (模块必须被2个 入口chunk 共享)
      chunks: ["page1", "page2"],
      // (只使用这些 入口chunk)
    })
  ]
};

buildHtml();

module.exports = Config;
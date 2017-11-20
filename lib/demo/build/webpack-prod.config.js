const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const base = require('./webpack-base.config.js');

// 设置环境
base.plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production')
}));

base.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));

// 压缩代码
base.plugins.push(new MinifyPlugin({}, {
  comments: false,
  sourceMap: true
}));

module.exports = Object.assign(base, {
  devServer:{
    hot: true,
    colors: true,
    inline: true,
    contentBase: path.join(__dirname, '../'),
    // 转发对接后台 API
    /*proxy: {
      '/api/*': {
        target: 'http://localhost:' + config.app.serverPort,,
        secure: false
      }
    }*/
  }
});
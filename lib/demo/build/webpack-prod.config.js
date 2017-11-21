const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const base = require('./webpack-base.config.js');

// set env
base.plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production')
}));

base.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));

// 压缩代码
base.plugins.push(new MinifyPlugin({}, {
  comments: false,
  sourceMap: true,
}));
const path = require('path');
const webpack = require('webpack');
const config = require('./config.js');
const base = require('./webpack-base.config.js');

// set env
base.plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('development')
}));

// base.plugins.push(new webpack.SourceMapDevToolPlugin({
//   filename: '[file].map',
//   exclude: ['vendor.js']
// }));

// build analysis
if(config.analyse){
  // tool 1
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  base.plugins.push(new BundleAnalyzerPlugin());
  // tool 2
  // const Visualizer = require('webpack-visualizer-plugin');
  // base.plugins.push(new Visualizer({
  //   filename: 'visualizer.html'
  // }));
}

const devServer = {
  hot: true,
  compress: true,
  port: config.app.devPort ? config.app.devPort : parseInt(Math.random() * 10000),
  inline: true,
  contentBase: path.join(__dirname, '../'),  
};

// 转发对接后台 API
if(config.app.serverPort){
  devServer.proxy = {
    '/api/*': {
      target: 'http://localhost:' + config.app.serverPort,
      secure: false
    }
  };
}

module.exports = Object.assign(base, {
  devServer,
});

const path = require('path');
const webpack = require('webpack');
const config = require('./config.js');
const base = require('./webpack-base.config.js');

// 设置环境
base.plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('development')
}));

// base.plugins.push(new webpack.SourceMapDevToolPlugin({
//   filename: '[file].map',
//   exclude: ['vendor.js']
// }));

// 打包分析
if(config.analyse){
  // 工具 1
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  base.plugins.push(new BundleAnalyzerPlugin());
  // 工具 2
  // const Visualizer = require('webpack-visualizer-plugin');
  // base.plugins.push(new Visualizer({
  //   filename: 'visualizer.html'
  // }));
}

module.exports = Object.assign(base, {
  devServer:{
    hot: true,
    colors: true,
    inline: true,
    contentBase: path.join(__dirname, '../'),
    // 转发对接后台 API
    /*proxy: {
      '/api/*': {
        target: 'http://localhost:' + config.app.serverPort,
        secure: false
      }
    },*/
  }
});

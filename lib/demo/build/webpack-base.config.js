const path = require('path');
const baseDir = process.cwd();
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const plugins = [
  // clean your dist folder before build
  new CleanWebpackPlugin(['dist']),
  // extract common chunks between vendor files
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'runtime'],
    minChunks: Infinity,
  }),
  // extract common chunks between different entries
  /*new webpack.optimize.CommonsChunkPlugin({
    name: "common",
    filename: "common.bundle.js",
    minChunks: 3
  }),
  new webpack.optimize.CommonsChunkPlugin({
    children: true,
    minChunks: 3,
  })*/
];

const rules = [
  {
    test: /\.vue$/,
    loader: 'vue-loader',
  },
  // { test: /iview.src.*?js$/, loader: 'babel-loader' }, // iview 按需引用必须加这句
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
  },
  { test: /\.(png|jpg|gif|svg|ttf|eot|woff)$/, loader: 'file-loader?name=[name].[hash].[ext]' },
  { test: /\.css$/, loader: 'style-loader!css-loader' },
  { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
];

module.exports = {
  entry: {
    app: ['babel-polyfill', './index.js'],
    vendor: ['vue', 'vue-router', 'vuex', 'axios', 'lodash'],
  },
  output: {
    path: path.join(baseDir, './dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunkhash:4].piece.js',
    publicPath: '/dist/',
  },
  plugins,
  module: {
    rules,
  },
};

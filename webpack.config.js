var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    index: [
      'webpack-hot-middleware/client',
      'whatwg-fetch',
      './public/index',
    ],
    // ,
    // userHome: [
    //   'webpack-hot-middleware/client',
    //   'whatwg-fetch',
    //   './public/userHome',
    // ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle_[name].js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname,
    }],
  },
};

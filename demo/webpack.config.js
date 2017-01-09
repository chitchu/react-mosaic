const path = require('path');
// const webpack = require('webpack');

const config = {
  entry: {
    app: [path.resolve(process.cwd(), `demo/index.js`)]
  },
  output: {
    path: path.resolve(process.cwd(), `demo`),
    filename: `bundle.js`,
    publicPath: '/',
    pathinfo: false
  },
  module:{
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: 'demo/',
    inline: true,
    open: true,
    noInfo: true,
    quiet: true
  },
  performance: {
    hints: false
  }
};

module.exports = config;
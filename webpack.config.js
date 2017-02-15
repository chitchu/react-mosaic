const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = env => ({
  entry: { app: path.join(__dirname, `dev/index.js`) },
  output: { path: path.join(__dirname, `dev`), filename: `[name].js` },
  module: {
    rules: [ { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' } ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'dev/index.html')
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('development') }
    })
  ],
  devtool: 'inline-source-map'
});

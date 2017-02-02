const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const package = require('./package.json');

const config = {
  entry: {
    app: [path.resolve(process.cwd(), `demo/index.js`)],
    vendor: ['react', 'react-dom', 'styled-components', 'lodash/debounce', 'threads'],
    assets: [path.join(__dirname, 'demo', 'stock-photo.jpg')]
  },
  output: {
    filename: `[name].[chunkhash:8].js`,
    path: path.resolve(process.cwd(), `gh-page`),
    pathinfo: false
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'},
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {test: /\.(jpe?g|png|gif)$/i, use: 'base64-image-loader'},
      {test: /\.svg$/i, loaders: ['file-loader', 'image-webpack-loader']}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'demo', 'index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'assets', 'manifest']
    })
  ]
};
module.exports = config;
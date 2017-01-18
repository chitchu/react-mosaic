const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: {app: [path.resolve(process.cwd(), `demo/index.js`)]},
  output: {
    path: path.resolve(process.cwd(), `demo`),
    filename: `bundle.js`,
    pathinfo: false
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'},
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {test: /\.(jpe?g|png|gif)$/i, use: 'base64-image-loader'},
      {
        test: /\.svg$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(process.cwd(), 'demo', 'index.html')
    })
  ],
  devServer: {
    contentBase: 'demo/',
    inline: true,
    open: true,
    noInfo: true,
    quiet: true
  },
  performance: {hints: false}
};

module.exports = config;

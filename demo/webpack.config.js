const path = require('path');

const config = {
  entry: `./src/Demo.js`,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: `Demo.bundle.js`
  },
  module:{
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  }
};

module.exports = config;
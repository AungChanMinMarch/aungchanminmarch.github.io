const path = require('path');

module.exports = {
  entry: './assets/script.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '_site/assets'),
  }
};
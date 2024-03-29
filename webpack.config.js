const path = require('path');

module.exports = {
  entry: {
    index: './assets/script.js',
    svgjs: './assets/svgjs.js',
    functionplot: './assets/functionplot.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '_site/assets'),
  },
};

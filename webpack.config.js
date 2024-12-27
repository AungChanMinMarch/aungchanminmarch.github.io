const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    index: './assets/js/script.js',
	testBeforeUpload: './assets/js/testBeforeUpload.js',
	preUniMath: './assets/js/preUniMath.js',
    svgjs: './assets/js/svgjs.js',
    //cytoscape: './assets/js/cytoscape.js',
    //functionplot: './assets/js/functionplot.js',
	base_styles: './assets/css/base_styles.css',
	style: './assets/css/index.css'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '_site/assets'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};

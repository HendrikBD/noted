const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {presets: ['es2015', 'react']}
          }
        ]
      },
      {
        test: /\.css?$/,
        exclude: /node_modules/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'webapp')
  },
};


const webpack = require('webpack')

module.exports = {
  context: __dirname + "/src",
  entry: './index.js',
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  mode: 'development'
};

var path = require('path');
var webpack = require('webpack');

module.exports =  {
  devtool: 'source-map',
  externals: {
    fs: {}
  },
  entry: [
    'webpack-hot-middleware/client',
    './src//client/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions : ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    preLoaders: [
     // {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/}
    ],
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        "presets": ["react", "es2015"],
        "env": {
          "development": {
            "plugins": [
              ["transform-decorators-legacy"],
              ["react-transform", {
                "transforms": [{
                  "transform": "react-transform-hmr",
                  "imports": ["react"],
                  "locals": ["module"]
                }]
              }]
            ]
          }
        }
      }
    }]
  }
};



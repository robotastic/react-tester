const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')
const webpack = require('webpack')

const analyze = !!process.env.ANALYZE_ENV
const env = process.env.NODE_ENV || 'development'


const webpackConfig = {
  name: 'client',
  target: 'web',

  entry: {
    app: path.resolve('app/app.jsx'),
  },


  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
      },
    }),
  ],

  output: {
    filename: '[name].js',
    path: path.resolve('public'),
    publicPath: '/',
  },

  resolve: {
    modules: [
      path.resolve('app'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },
  devtool: "cheap-module-eval-source-map",

  devServer: {
    compress: true,
    port: 9000
  }
}

if (analyze) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

if (env === 'production') {
  webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
      },
    })
  )
}

module.exports = webpackConfig

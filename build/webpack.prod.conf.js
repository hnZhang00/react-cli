var path = require('path');
var utils = require('./utils');
var config = require('./config');
var merge = require('webpack-merge');
var webpack = require('webpack');
var baseWebpackConfig = require('./webpack.base.conf');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfig = merge(baseWebpackConfig, {
	mode: 'production',
	devtool: false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  module: {
  	rules: [
  		{
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader', 
          {
          	loader: 'css-loader', 
          	options: { modules: true }
          }, 
          'less-loader'
        ]
	    },
	    {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { modules: true }
            },
            'postcss-loader'
          ]
        })
	    }
  	]
  },
	plugins: [
    new webpack.DefinePlugin({
      'process.env': {
				NODE_ENV: '"production"'
			}
    }),
		new CleanWebpackPlugin(['dist']),
		new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[chunkhash].css'),
      allChunks: true,
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
	]
});

module.exports = webpackConfig;


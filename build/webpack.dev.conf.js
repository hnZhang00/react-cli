var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var config = require('./config');
var utils = require('./utils');

module.exports = merge(baseWebpackConfig, {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
    clientLogLevel: 'warning',
		disableHostCheck: true,
    contentBase: './dist', 
    compress: true,
    inline: true,
    hot: true,
    host: '0.0.0.0',
    port: config.dev.port,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    
  },
  module: {
  	rules: [
			{
				test:/\.css$/,
        // exclude: /src/,
        use: [ 'style-loader', 'css-loader' ]
	    },
	    {
        test: /\.(less)$/,
        exclude: /src/,
        use: [
          'style-loader', // creates style nodes from JS strings
        	{
            loader: 'css-loader',
            options: { modules: true }
            // translates CSS into CommonJS
	        }, 
	        'less-loader' // compiles Less to CSS
        ]
      }
  	]
  },
	plugins: [
    new webpack.DefinePlugin({
      'process.env': {
				NODE_ENV: '"development"'
			}
    }),
		new webpack.HotModuleReplacementPlugin(), // 热更新插件 
		new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: "index.html",
      inject: true
    }),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: ${config.dev.port}`],
      },
      onErrors: config.dev.notifyOnErrors
      ? utils.createNotifierCallback()
      : undefined
    })
	]
});


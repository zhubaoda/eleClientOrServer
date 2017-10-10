var path = require('path')
var webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	context: __dirname,
	entry: {
		app: ["babel-polyfill", './src/main.js']
	},
	output: {
		path: path.resolve(__dirname, '../server/static'),
		filename: '[name].js'
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src')
		}
	},
	module: {
		rules: [{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: 'css-loader?-url'
				})
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				},
				include: [resolve('src'), resolve('test')]
			}
		]
	},
	devtool: '#source-map',
	plugins: [
		new ExtractTextPlugin('[name].min.css'),
		new HtmlWebpackPlugin({
			xhtml: true,
			template: "./index.html",
			filename: path.resolve(__dirname, "../server/static/index.html")
		}),
		new CopyWebpackPlugin([{
			from: 'static'
		}]),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"development"'
			}
		})

	]
}

if(process.env.NODE_ENV === 'production') {
	module.exports.devtool = 'source-map'
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		//		new webpack.optimize.UglifyJsPlugin({
		//			compress: {
		//				warnings: false
		//			}
		//		})
	])
}
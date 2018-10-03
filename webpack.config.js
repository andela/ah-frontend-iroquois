/* webpack.config.js */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const DotEnv = require('dotenv-webpack');

module.exports = {
	// Tell webpack to begin building its
	// dependency graph from this file.
	entry: [
		path.join(__dirname, 'src', 'index.js')
	],
	// And to place the output in the `build` directory
	// mode: 'development',
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js'
	},
	node: {
		fs: 'empty'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)?$/,
				/* We'll leave npm packages as is and not
                   parse them with Babel since most of them
                   are already pre-transpiled anyway. */
				exclude: /node_modules/,
				use: 'babel-loader'

			},
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				loader: require.resolve('url-loader'),
				options: {
					limit: 10000,
					name: 'static/media/[name].[hash:8].[ext]'
				}
			},
			{
				test: /\.(eot|svg|ttf|woff2?|otf)$/,
				use: 'file-loader'
			},
			{
				test: /\.(scss|css|sass)$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					{
						loader: require.resolve('css-loader'),
						options: {
							importLoaders: 1,
							modules: true, // Add this option
							localIdentName: '[name]__[local]__[hash:base64:5]' // Add this option
						}
					},
					{
						loader: require.resolve('sass-loader'),
						options: {
							includePaths: [path.styles]
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'public', 'index.html'),
			favicon: 'public/favicon.ico'
		}),
		new ServiceWorkerWebpackPlugin({
			entry: path.join(__dirname, 'src', 'registerServiceWorker.js'),
			filename: 'service-worker.js'
		}),
		new DotEnv()
	],
	devServer: {
		host: 'localhost',
		port: 3000,
		historyApiFallback: true,
		open: true,
		hot: true
	}
};

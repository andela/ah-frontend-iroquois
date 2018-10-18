/* webpack.config.js */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = {
	// Tell webpack to begin building its
	// dependency graph from this file.
	entry: [
		'regenerator-runtime/runtime',
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
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
				loader: require.resolve('url-loader'),
				options: {
					limit: 10000,
					name: 'static/media/[name].[hash:8].[ext]',
					fallback: 'responsive-loader'
				}
			},
			{
				test: /\.(eot|svg|ttf|woff2?|otf)$/,
				use: 'file-loader'
			},
			{
				test: /\.(png|jpg)$/,
				include: path.join(__dirname, 'static/images'),
				loader: 'file-loader'
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
		new DotEnv(),
		new webpack.DefinePlugin({
			'process.env': {
				GOOGLE_API_KEY: JSON.stringify(process.env.GOOGLE_API_KEY),
				FACEBOOK_API_KEY: JSON.stringify(process.env.FACEBOOK_API_KEY),
				API_URL: JSON.stringify(process.env.API_URL),
				PUBLIC_URL: JSON.stringify(process.env.PUBLIC_URL)
			}
		})
	],
	devServer: {
		host: 'localhost',
		port: 3000,
		historyApiFallback: true,
		open: true,
		hot: true
	}
};

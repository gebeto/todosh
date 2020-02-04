const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const { fileLoaderFor } = require('./config/loaders/file-loader');
const { babelLoaderFor } = require('./config/loaders/babel-loader');
const { stylesLoaderFor } = require('./config/loaders/styles-loader');


const baseConfig = () => ({
	entry: path.resolve(__dirname, "src", "index.tsx"),
	output: {
		path: path.resolve(__dirname, "dist"),
		publicPath: "dist/",
		filename: "main.js",
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
	},

	module: {
		rules: [
			babelLoaderFor(/\.(t|j)sx?$/),
			stylesLoaderFor(/\.s?css$/),
			fileLoaderFor(/\.svg$/, 'svg'),
		]
	},

	devServer: {
		// contentBase: path.resolve(__dirname, "dist"),
		// compress: true,
		port: 9000
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.ejs'),
			inject: false,
		}),
		new CopyPlugin([
			{ from: 'public/pwa', to: 'pwa' }
		]),
		new webpack.DefinePlugin({
			AUTH_ENDPOINT: JSON.stringify(process.env.AUTH_ENDPOINT ? process.env.AUTH_ENDPOINT : 'http://wundershoppinglist.herokuapp.com/auth')
		}),
	],
});


module.exports = baseConfig();

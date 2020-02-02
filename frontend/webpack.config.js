const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const CONFIG = require('@wsl/config');


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
			{
				test: /\.(t|j)sx?$/,
				exclude: [],
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								"@babel/preset-typescript",
								"@babel/preset-react",
								"@babel/preset-env",
							],
							plugins: [
								"@babel/plugin-transform-typescript",
								"@babel/plugin-proposal-class-properties",
								"@babel/plugin-syntax-dynamic-import",
							]
						}
					}
				],
			},
			{
				test: /\.s?css$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.svg$/,
				loader: 'file-loader',
				options: {
					name: 'svg/[name].[ext]',
				},
			},
		]
	},

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.ejs'),
			inject: false,
		}),
	],
});

module.exports = baseConfig();

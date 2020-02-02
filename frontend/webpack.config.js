const path = require('path');
const webpack = require('webpack');

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
	// plugins: [
	// 	new webpack.DefinePlugin({
	// 		"process.env.CLIENT_ID": JSON.stringify(CONFIG.client_id),
	// 	})
	// ],
});

module.exports = baseConfig();

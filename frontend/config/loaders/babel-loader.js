const babelLoaderFor = (regex) => ({
	// test: /\.(t|j)sx?$/,
	test: regex,
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
});

exports.babelLoaderFor = babelLoaderFor;

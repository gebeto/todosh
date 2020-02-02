const stylesLoaderFor = (regex) => ({
	// test: /\.s?css$/,
	test: regex,
	use: [
		'style-loader',
		'css-loader',
		'sass-loader'
	]
});


exports.stylesLoaderFor = stylesLoaderFor;

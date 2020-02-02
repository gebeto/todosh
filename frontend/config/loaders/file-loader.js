const fileLoaderFor = (regex, folder) => ({
	// test: /\.svg$/,
	test: regex,
	loader: 'file-loader',
	options: {
		name: `${folder}/[name].[ext]`,
		publicPath: '.',
	},
});


exports.fileLoaderFor = fileLoaderFor;

const ghpages = require('gh-pages');


const deploy = async () => {
	// App
	await ghpages.publish('packages/app/dist', {
		history: false,
		repo: 'https://github.com/todosh/todosh.github.io',
	});
	
	// Storybook
	await ghpages.publish('packages/shared/dist', {
		dest: '/docs',
		repo: 'https://github.com/todosh/todosh.github.io',
	});
}

deploy();

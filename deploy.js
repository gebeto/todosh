const ghpages = require('gh-pages');

ghpages.publish('packages/app/dist', { history: false });

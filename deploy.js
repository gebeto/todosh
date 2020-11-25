const ghpages = require('gh-pages');

ghpages.publish('packages/frontend/dist', { history: false });

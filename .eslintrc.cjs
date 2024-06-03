const defaultConfig = require('config');

module.exports = {
	// Manually load ESLint config from the package `config`
	...defaultConfig,
	root: true
};
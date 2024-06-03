const defaultConfig = require('config');

module.exports = {
	...defaultConfig,
	root:      true,
	overrides: [
		{
			files: ['**/*.stories.*'],
			rules: {
				'import/no-anonymous-default-export': 'off'
			}
		}
	]
};

import type { Translation } from '../i18n-types';

const en = {
	lang: 'Language',
	welcome: 'Welcome to {app}!',
	description:
		'Anno Amsterdam is an application to explore Amsterdam and its beautiful old buildings.',
	log: `This log was called from '{fileName}'`,
	goHome: 'Go back home',
	unexpectedError: 'Oops! Something went wrong',
	light: 'Light',
	home: 'Home',
	building: 'Building',
	buildings: 'Buildings',
	dark: 'Dark',
	list: 'List',
	map: 'Map',
	system: 'System',
	settings: 'Settings',
	theme: 'Theme',
	filters: 'Filters',
	centuries: {
		16: '16th century',
		17: '17th century',
		18: '18th century',
		19: '19th century',
		20: '20th century',
		21: '21st century'
	}
} satisfies Translation;

export default en;

import type { Translation } from '../i18n-types';

const en = {
	welcome: 'Welcome to {app}!',
	description:
		'Anno Amsterdam is an application to explore Amsterdam and its beautiful old buildings.',
	log: `This log was called from '{fileName}'`,
	goHome: 'Go back home',
	unexpectedError: 'Oops! Something went wrong'
} satisfies Translation;

export default en;

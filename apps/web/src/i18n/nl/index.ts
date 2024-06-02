import type { BaseTranslation } from '../i18n-types';

const nl = {
	lang: 'Taal',
	welcome: 'Welkom bij {app:string}!',
	description: 'Anno Amsterdam is een applicatie om Amsterdam en zijn oude gebouwen te ontdekken.',
	log: `Deze log was gestuurd vanaf '{fileName:string}'`,
	goHome: 'Ga naar de startpagina',
	unexpectedError: 'Oeps! Er is iets misgegaan',
	light: 'Licht',
	home: 'Home',
	dark: 'Donker',
	buildings: 'Gebouwen',
	system: 'Systeem',
	list: 'Lijst',
	map: 'Kaart',
	settings: 'Instellingen',
	theme: 'Thema',
	filters: 'Filters'
} satisfies BaseTranslation;

export default nl;

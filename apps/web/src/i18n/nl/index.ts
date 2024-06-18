import type { BaseTranslation } from '../i18n-types';

const nl = {
	lang: 'Taal',
	welcome: 'Welkom bij {app:string}!',
	description: 'Anno Amsterdam is een applicatie om Amsterdam en zijn oude gebouwen te ontdekken.',
	log: `Deze log was gestuurd vanaf '{fileName:string}'`,
	goHome: 'Ga naar de startpagina',
	unexpectedError: 'Oeps! Er is iets misgegaan',
	light: 'Licht',
	lens: 'Lens',
	dark: 'Donker',
	back: 'Terug',
	residential: 'Woonhuis',
	industrial: 'Industrieel',
	commercial: 'Commercieel',
	educational: 'Educatief',
	sort: 'Sorteren',
	distanceTo: 'Afstand tot',
	unknown: 'Onbekend',
	typeOfUse: 'Gebruikstype',
	recreational: 'Recreatief',
	fetchListError: 'Er is iets fout gegaan bij het ophalen van de gebouwen',
	building: 'Gebouw',
	buildings: 'Gebouwen',
	system: 'Systeem',
	moreInfo: 'Meer info',
	arrowAlt: 'Pijl die de richting aangeeft naar het gebouw',
	list: 'Lijst',
	map: 'Kaart',
	settings: 'Instellingen',
	theme: 'Thema',
	filters: 'Filters',
	searchByAddress: 'Zoek met adres',
	centuries: {
		16: '16e eeuw',
		17: '17e eeuw',
		18: '18e eeuw',
		19: '19e eeuw',
		20: '20e eeuw',
		21: '21e eeuw'
	}
} satisfies BaseTranslation;

export default nl;

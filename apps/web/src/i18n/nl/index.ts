import type { BaseTranslation } from '../i18n-types'

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
	building: 'Gebouw',
	buildings: 'Gebouwen',
	system: 'Systeem',
	list: 'Lijst',
	map: 'Kaart',
	settings: 'Instellingen',
	theme: 'Thema',
	filters: 'Filters',
	centuries: {
		16: '16e eeuw',
		17: '17e eeuw',
		18: '18e eeuw',
		19: '19e eeuw',
		20: '20e eeuw',
		21: '21e eeuw'
	}
} satisfies BaseTranslation

export default nl

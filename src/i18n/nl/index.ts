import type { BaseTranslation } from '../i18n-types'

const nl = {
	welcome: 'Welkom bij {app:string}!',
	description: 'Anno Amsterdam is een applicatie om Amsterdam en zijn oude gebouwen te ontdekken.',
	log: `Deze log was gestuurd vanaf '{fileName:string}'`,
	goHome: 'Ga naar de startpagina',
	unexpectedError: 'Oeps! Er is iets misgegaan'
} satisfies BaseTranslation

export default nl

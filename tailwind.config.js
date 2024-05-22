/** @type {import('tailwindcss').Config} */
import { screens } from 'tailwindcss/defaultTheme'

export default {
	mode: 'jit',
	variants: {
		margin: ['responsive', 'hover', 'last']
	},
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			...screens,
			xl: '1440px'
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '16px',
				xl: '40px'
			}
		},
		extend: {
			screens: {
				lg: '1200px',
				xl: '1440px'
			},
			colors: {
				'primary-dark-red': '#A60001',
				'primary-dark-blue': '#00425A',
				'primary-light-blue': '#C5D9E0'
			}
		}
	},
	plugins: []
}

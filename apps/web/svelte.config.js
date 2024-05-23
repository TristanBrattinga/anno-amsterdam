import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	vitePlugin: { inspector: true },
	kit:        {
		adapter: adapter({
			out: 'build'
		}),
		alias:   {
			'~~':        '.',
			'~':         'src',
			$components: 'src/lib/components',
			$constants:  'src/lib/constants',
			$i18n:       'src/i18n',
			$stores:     'src/lib/stores',
			$styles:     'src/lib/styles',
			$types:      'src/lib/types',
			$utils:      'src/lib/utils'
		}
	}
};

export default config;

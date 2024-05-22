<script lang="ts">
	import { browser } from '$app/environment';
	import { invalidateAll, pushState, replaceState } from '$app/navigation';
	import { page } from '$app/stores';
	import { setLocale, locale } from '$i18n/i18n-svelte';
	import type { Locales } from '$i18n/i18n-types';
	import { locales } from '$i18n/i18n-util';
	import { loadLocaleAsync } from '$i18n/i18n-util.async';
	import { replaceLocaleInUrl } from '$lib';

	const switchLocale = async (newLocale: Locales, updateHistoryState = true) => {
		if (!newLocale || $locale === newLocale) return;

		// load new dictionary from server
		await loadLocaleAsync(newLocale);

		// select locale
		setLocale(newLocale);

		if (updateHistoryState) {
			// update url to reflect locale changes
			pushState(replaceLocaleInUrl($page.url, newLocale), { locale: newLocale });
		}

		// run the `load` function again
		invalidateAll();
	};

	// update `lang` attribute
	$: browser && document.querySelector('html')!.setAttribute('lang', $locale);

	// update locale when navigating via browser back/forward buttons
	const handlePopStateEvent = async ({ state }: PopStateEvent) => switchLocale(state.locale, false);

	// update locale when page store changes
	$: if (browser) {
		const lang = $page.params.lang as Locales;
		if (lang !== $locale) {
			switchLocale(lang, false);
			replaceState(replaceLocaleInUrl($page.url, lang), { ...$page.state, locale: lang });
		}
	}

	export let lang: string;

	const langs: Record<Locales, string> = {
		en: 'English',
		nl: 'Nederlands'
	};
</script>

<svelte:window on:popstate={handlePopStateEvent} />

<p>{lang}</p>
<ul>
	{#each locales as l}
		<li>
			<a class:active={l === $locale} href={replaceLocaleInUrl($page.url, l)}>
				{langs[l]}
			</a>
		</li>
	{/each}
</ul>

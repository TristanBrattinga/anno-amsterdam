<script lang="ts">
    // SvelteKit
    import { browser } from '$app/environment'
    import { goto, invalidateAll, pushState, replaceState } from '$app/navigation'
    import { page } from '$app/stores'

    // I18n
    import { locale, setLocale } from '$i18n/i18n-svelte'
    import type { Locales } from '$i18n/i18n-types'
    import { loadLocaleAsync } from '$i18n/i18n-util.async'
    import { selectedLanguage } from '$stores/language';
    import { get } from 'svelte/store';
    import { CaretDownIcon, ENIcon, NLIcon } from "$icons";
    import { closeDropdownOnOutsideClick } from "~/lib";

    // Utils
    import { replaceLocaleInUrl } from '$lib'

    const switchLocale = async (newLocale: Locales, updateHistoryState = true) => {
        if (!newLocale || $locale === newLocale) return

        // load new dictionary from server
        await loadLocaleAsync(newLocale)

        // select locale
        setLocale(newLocale)

        if (updateHistoryState) {
            // update url to reflect locale changes
            pushState(replaceLocaleInUrl($page.url, newLocale), { locale: newLocale })
        }

        // run the `load` function again
        await invalidateAll()
    }

    // update `lang` attribute
    $: browser && document.querySelector('html')!.setAttribute('lang', $locale)

    // update locale when navigating via browser back/forward buttons
    const handlePopStateEvent = async ({ state }: PopStateEvent) => switchLocale(state.locale, false)

    // update locale when page store changes
    $: if (browser) {
        const lang = $page.params.lang as Locales
        if (lang !== $locale) {
            switchLocale(lang, false)
            replaceState(replaceLocaleInUrl($page.url, lang), { ...$page.state, locale: lang })
        }
    }

    type LanguageItem = {
        code: Locales;
        label: string;
        icon: typeof NLIcon;
    };

    const langs: LanguageItem[] = [
        { code: 'en', label: 'English', icon: ENIcon },
        { code: 'nl', label: 'Nederlands', icon: NLIcon },
    ];

    const selectLanguage = (languageCode: Locales) => {
        selectedLanguage.set(languageCode);
        dropdownOpen = false;
    };

    const currentLanguage = langs.find(lang => lang.code === get(selectedLanguage))

    let dropdownOpen = false;

    const setDropdownOpen = (open: boolean) => {
        dropdownOpen = open;
    };

    closeDropdownOnOutsideClick('.language-selector', setDropdownOpen);
</script>

<svelte:window on:popstate={handlePopStateEvent} />

<div class="language-selector">
    <button on:click={() => dropdownOpen = !dropdownOpen}>
        <svelte:component this={currentLanguage?.icon} />
        <CaretDownIcon className={`${dropdownOpen ? 'rotated' : ''}`} />
    </button>
    <ul class={`dropdown ${dropdownOpen ? 'open' : ''}`}>
        {#each langs as l}
            <li>
                <button
                    aria-label={`Select {${l.label}`}
                    class="dropdown-item"

                    on:click={() => {
                      selectLanguage(l.code)
                      goto(replaceLocaleInUrl($page.url, l.code))
                    }
                    }
                >
                    <svelte:component this={l.icon} />
                </button>
            </li>
        {/each}
    </ul>
</div>

<style lang="scss">
  .language-selector {
    position: relative;
    display: inline-block;

    > button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 56px;
      aspect-ratio: 2/1;
      border: 1px solid var(--accent-color-light);
      border-radius: 5px;
      padding: 0 .5rem;
      gap: .25rem;
    }
  }

  .dropdown {
    display: block;
    position: absolute;
    top: 110%;
    right: 0;
    background-color: white;
    z-index: 2;
    height: 0;
    border: 1px solid transparent;
    border-radius: 5px;
    overflow: hidden;
    transition: all .2s ease-in-out;
  }

  .dropdown.open {
    height: 89px;
    border: 1px solid var(--accent-color-light);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .dropdown-item {
    padding: 8px 16px;
    cursor: pointer;
    transition: all .1s ease;
  }

  .dropdown-item:hover {
    background-color: var(--accent-color-light);
  }
</style>

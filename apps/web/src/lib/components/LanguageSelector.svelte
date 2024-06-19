<script lang="ts">
    import { selectedLanguage } from '$stores/language';
    import { get } from 'svelte/store';
    import { CaretDownIcon, ENIcon, NLIcon } from "$icons";
    import { onMount } from "svelte";

    type languageItem = {
        code: string
        name: string
        icon: typeof NLIcon
    }

    let languages: languageItem[]
    $: languages = [
        {
            code: 'nl',
            name: 'Nederlands',
            icon: NLIcon
        },
        {
            code: 'en',
            name: 'English',
            icon: ENIcon
        },
    ]

    let dropdownOpen = false;

    const selectLanguage = (languageCode: string) => {
        selectedLanguage.set(languageCode);
        dropdownOpen = false;
    };

    // Get the current selected language
    $: currentLanguage = languages.find(lang => lang.code === get(selectedLanguage));

    // Close dropdown when clicking outside of it
    const closeDropdownOnOutsideClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.language-selector')) {
            dropdownOpen = false;
        }
    };

    onMount(() => {
        window.addEventListener('click', closeDropdownOnOutsideClick);

        // Clean up the event listener when component is destroyed
        return () => {
            window.removeEventListener('click', closeDropdownOnOutsideClick);
        };
    });
</script>

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
    }
  }

  .dropdown {
    display: none;
    position: absolute;
    top: 110%;
    left: 0;
    background-color: white;
    border-radius: 5px;
    border: 1px solid var(--accent-color-light);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1;
  }

  .dropdown.open {
    display: block;
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

<div class="language-selector">
  <button on:click={() => dropdownOpen = !dropdownOpen}>
    <svelte:component this={currentLanguage?.icon} />
    <CaretDownIcon />
  </button>
  <div class={`dropdown ${dropdownOpen ? 'open' : ''}`}>
    {#each languages as lang}
      <button class="dropdown-item" on:click={() => selectLanguage(lang.code)}>
        <svelte:component this={lang.icon} />
      </button>
    {/each}
  </div>
</div>

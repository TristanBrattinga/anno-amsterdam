<script lang="ts">
    import { page } from '$app/stores'
    import { tick } from 'svelte'

    let inputValue = $page.url.searchParams.get('q') || ''
    let form: HTMLFormElement | null

    interface NavBarData {
        searchPlaceholder: string
        clear: string
        search: string
        openFilters: string
    }

    export let data: NavBarData;

    $: showCloseButton = !!inputValue

</script>

<form
    bind:this={form}
    method="get"
    action={`/${$page.data.locale}/list`}
    on:reset={async () => {
				inputValue = ''
				await tick()
				form?.submit()
			}}
>
    <div class="search-bar">
        <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M28.7075 27.2925L22.4487 21.035C24.2628 18.8572 25.1673 16.0638 24.9743 13.236C24.7812 10.4081 23.5054 7.76361 21.4122 5.85251C19.319 3.9414 16.5695 2.91086 13.7359 2.97526C10.9022 3.03966 8.20243 4.19404 6.19821 6.19827C4.19398 8.20249 3.0396 10.9023 2.9752 13.7359C2.9108 16.5696 3.94134 19.319 5.85244 21.4122C7.76355 23.5054 10.4081 24.7813 13.2359 24.9743C16.0637 25.1674 18.8571 24.2628 21.035 22.4488L27.2925 28.7075C27.3854 28.8005 27.4957 28.8742 27.6171 28.9244C27.7385 28.9747 27.8686 29.0006 28 29.0006C28.1314 29.0006 28.2615 28.9747 28.3829 28.9244C28.5043 28.8742 28.6146 28.8005 28.7075 28.7075C28.8004 28.6146 28.8741 28.5043 28.9244 28.3829C28.9747 28.2615 29.0005 28.1314 29.0005 28C29.0005 27.8686 28.9747 27.7385 28.9244 27.6171C28.8741 27.4958 28.8004 27.3855 28.7075 27.2925ZM4.99998 14C4.99998 12.22 5.52782 10.48 6.51675 8.99991C7.50569 7.51987 8.91129 6.36631 10.5558 5.68513C12.2004 5.00394 14.01 4.82571 15.7558 5.17297C17.5016 5.52024 19.1053 6.37741 20.3639 7.63608C21.6226 8.89475 22.4798 10.4984 22.827 12.2442C23.1743 13.9901 22.9961 15.7997 22.3149 17.4442C21.6337 19.0887 20.4802 20.4943 19.0001 21.4833C17.5201 22.4722 15.78 23 14 23C11.6138 22.9974 9.3262 22.0483 7.63894 20.3611C5.95169 18.6738 5.00263 16.3862 4.99998 14Z"
                fill="#343330"
            />
        </svg>
        <label for="search" class="sr-only">{data.searchPlaceholder}</label>
        <input
            id="search"
            name="q"
            type="search"
            placeholder={data.searchPlaceholder}
            bind:value={inputValue}
        />
        {#if showCloseButton}
            <button type="reset" aria-label={data.clear}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 20 20"
                    fill="none"
                >
                    <path
                        d="M15.8516 4.19336L4.60156 15.4434"
                        stroke="#343330"
                        stroke-width="1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M15.8516 15.4434L4.60156 4.19336"
                        stroke="#343330"
                        stroke-width="1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
        {/if}
    </div>
    <button type="submit" class="sr-only">{data.search}</button>
</form>

<style lang="scss">
  label {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-bar {
    position: relative;
    display: flex;
    align-items: center;

    > svg {
      position: absolute;
      left: 1rem;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 1rem;
      width: 28px;
      height: 28px;
    }

    input[type="search"] {
      border: 1px solid var(--accent-color-light);
      height: 40px;
      border-radius: 5px;
      padding-left: 2.5rem;
      width: 100%;
      outline: none;
      font-size: 14px;

      &::-webkit-search-cancel-button {
        -webkit-appearance: none;
      }
    }
  }
</style>
<script lang="ts">
    import { location } from '$stores'
    import { menuStore } from '$stores/menu'
    import { onDestroy } from 'svelte'
    import { Logo, CloseIcon } from '$icons'
    import { page } from '$app/stores'
    import type { BuildingSortBy } from '$types'
    import { watchLocation, parseNumberParam } from '$utils'

    export let menuId: string
    export let filterTitle: string
    export let sortBy: string
    export let sort: BuildingSortBy = <BuildingSortBy>$page.url.searchParams.get('sort') || 'default'

    $: coords = {
        lat: parseNumberParam($page.url, 'lat', 0),
        lng: parseNumberParam($page.url, 'lng', 0)
    }

    let sidebarOpen = false
    const unsubscribe = menuStore.subscribe((value) => {
        sidebarOpen = value[menuId] || false
    })

    onDestroy(() => {
        unsubscribe()
    })

    const closeSidebar = () => {
        menuStore.closeMenu(menuId)
    }

    const onSortChange = () => {
        if (sort === 'distance') {
            watchLocation()
        }
    }
</script>

<div aria-label="Close sidebar" class="backdrop" class:show={sidebarOpen} on:click={closeSidebar}></div>
<aside class:show={sidebarOpen}>
    <div>
        <p>
            <Logo />
            <span>Amsterdam</span>
        </p>
        <button on:click={closeSidebar}>
            <CloseIcon />
        </button>
    </div>
    <h1>{filterTitle}</h1>
    <div class="divider" />
    <!--    <form method="get" on:submit={closeSidebar}>-->
    <!--        <label for="sort">{sortBy}</label>-->
    <!--        <select bind:value={sort} id="sort" name="sort" on:change={onSortChange}>-->
    <!--            <option value="default" selected>Standaard</option>-->
    <!--            <option value="distance">Afstand</option>-->
    <!--            <option value="name">A-Z</option>-->
    <!--            <option value="year">Bouwjaar</option>-->
    <!--        </select>-->
    <!--        <input type="hidden" name="lat" value={$location?.lat || coords.lat} />-->
    <!--        <input type="hidden" name="lng" value={$location?.lng || coords.lng} />-->
    <!--        <input type="hidden" name="q" value={$page.url.searchParams.get('q')} />-->
    <!--        <button-->
    <!--            type="submit"-->
    <!--            disabled={sort === 'distance' && !$location && !(coords.lat && coords.lng)}>Filteren-->
    <!--        </button-->
    <!--        >-->
    <!--    </form>-->
</aside>

<style lang="scss">
  aside {
    position: fixed;
    right: 0;
    top: 0;
    background-color: #fff;
    width: 100%;
    height: 100dvh;
    z-index: 20;
    padding: 1.25rem 1rem;
    color: black;
    transform: translateX(100%);
    transition: all 0.5s ease-in-out;

    &.show {
      transform: translateX(0);
    }

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        display: flex;
        align-items: end;
        gap: 0.25rem;
        width: fit-content;

        span {
          font-family: Oswald, sans-serif;
          color: var(--secondary-color-light);
          text-transform: uppercase;
          font-weight: 300;
          font-size: 1.375rem;
          line-height: 1.1;
        }
      }
    }

    h1 {
      font-size: 2rem;
      line-height: 1;
      margin-top: 1rem;
    }

    form {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;

      select {
        border: 1px solid var(--accent-color);
        border-radius: 999px;
        cursor: pointer;
        padding: 0 0.5rem;
      }
    }
  }

  @media (min-width: 769px) {
    .backdrop {
      position: fixed;
      width: 100%;
      height: 100vh;
      z-index: 10;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.3);
      transition: all .7s ease;
      opacity: 0;
      pointer-events: none;

      &.show {
        pointer-events: auto;
        opacity: 100;
      }
    }
    aside {
      width: 50%;
    }

    .divider {
      width: 100%;
      height: 1px;
      background-color: #e6e6e6;
      margin: 1rem 0;
    }
  }
</style>

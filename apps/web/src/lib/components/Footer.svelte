<script lang="ts">
    // Stores
    import { page } from '$app/stores'

    // Icons
    import { LensIcon, ListIcon, MapIcon } from '$icons'

    // Props
    export let lens: string
    export let map: string
    export let list: string

    type MenuItem = {
        name: string
        href: string
        icon: typeof MapIcon
    }

    let menuItems: MenuItem[]
    $: menuItems = [
        {
            name: map,
            href: '/map',
            icon: MapIcon
        },
        {
            name: lens,
            href: '/lens',
            icon: LensIcon
        },
        {
            name: list,
            href: '/list',
            icon: ListIcon
        }
    ]
</script>

<footer>
  <nav class="container">
    <ul>
      {#each menuItems as { name, href, icon } (href)}
        <li>
          <a
            class="link"
            href={`/${$page.data.locale}${href}`}
            aria-current={$page.url.pathname === `/${$page.data.locale}${href}` ? 'page' : false}
          >
            <svelte:component this={icon} />
            {name}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</footer>

<style lang="scss">
  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 80px;
    background-color: var(--bg-color);
    color: var(--text-color);
    padding: 1rem;
    border-top: 1px solid var(--accent-color-light);
  }

  nav ul {
    display: flex;
    justify-content: center;
    gap: 50px;
  }

  nav a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>

<script lang="ts">

    import type { century } from '$types';
    import { menuStore } from '$stores/menu';
    import { onDestroy } from 'svelte';

    // export let centuries: century[];

    export let menuId: string;

    let legendOpen = false;
    const unsubscribe = menuStore.subscribe(value => {
        legendOpen = value[menuId] || false;
    });

    onDestroy(() => {
        unsubscribe();
    });

    const closeLegend = () => {
        menuStore.closeMenu(menuId);
    };

</script>

<aside class:show={legendOpen}>
    <button aria-label="Close the legend" on:click={closeLegend}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M0.863563 0.156456C0.668301 -0.0388058 0.351719 -0.0388058 0.156457 0.156456C-0.0388056 0.351719 -0.0388059 0.668301 0.156456 0.863563L8.28831 8.99541L0.156576 17.1271C-0.0386864 17.3224 -0.0386863 17.639 0.156576 17.8342C0.351838 18.0295 0.66842 18.0295 0.863682 17.8342L8.99541 9.70252L17.127 17.8341C17.3223 18.0294 17.6389 18.0294 17.8341 17.8341C18.0294 17.6389 18.0294 17.3223 17.8341 17.127L9.70252 8.99541L17.8342 0.863685C18.0295 0.668423 18.0295 0.35184 17.8342 0.156578C17.639 -0.0386842 17.3224 -0.0386845 17.1271 0.156578L8.99541 8.2883L0.863563 0.156456Z"
                  fill="#000" />
        </svg>
    </button>
    <h3>Legend</h3>
    <ul>
        <li>
            <span></span>
            <p>16e eeuw</p>
        </li>
        <li>
            <span></span>
            <p>17e eeuw</p>
        </li>
        <li>
            <span></span>
            <p>18e eeuw</p>
        </li>
        <li>
            <span></span>
            <p>19e eeuw</p>
        </li>
        <li>
            <span></span>
            <p>20e eeuw</p>
        </li>
        <li>
            <span></span>
            <p>21e eeuw</p>
        </li>
    </ul>
</aside>

<style lang="scss">
  aside {
    position: absolute;
    z-index: 10;
    background-color: white;
    bottom: 1rem;
    left: 1rem;
    padding: 1rem;
    border-radius: 5px;
    transform: translateX(-150%);
    transition: all .5s ease-in-out;

    &.show {
      transform: translateX(0);
    }

    h3 {
      margin-bottom: .5rem;
    }

    ul li {
      display: flex;
      align-items: center;
      gap: .5rem;

      span {
        display: block;
        width: 10px;
        height: 10px;
        background-color: #f28cb1;
      }
    }
  }
</style>
<script lang="ts">
    import { Filter, SearchBar, Sorting, ToggleView } from '$components/index';
    import { locale } from "$i18n/i18n-svelte";

    interface data {
        searchPlaceholder: string;
        clear: string;
        search: string;
        openFilters: string;
        showList: string
        showGrid: string
    }

    export let data: data;
    export let currentRoute: string;

</script>

<ul class={`container ${currentRoute === `/${$locale}/map` ? 'absolute' : ''}`}>
    {#if currentRoute !== `/${$locale}/map`}
        <li>
            <ToggleView data={data} />
        </li>
    {/if}
    <li class="search">
        <SearchBar data={data} />
    </li>
    {#if currentRoute !== `/${$locale}/map`}
        <li class="sort-filter">
            <Sorting />
            <Filter menuId="filterSidebar" openFilters={data.openFilters} />
        </li>
    {/if}
    {#if currentRoute !== `/${$locale}/list`}
        <li>
            <Filter menuId="filterSidebar" openFilters={data.openFilters} />
        </li>
    {/if}
</ul>

<style lang="scss">
  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
    margin: 1rem auto;

    &.absolute {
      position: absolute;
      left: 0;
      right: 0;
      z-index: 1;
      margin: .25rem auto;
      gap: .5rem;
    }

    .search {
      flex-grow: 1;
    }

    .sort-filter {
      display: flex;
      gap: .5rem;
    }
  }

  @media (max-width: 768px) {
    ul {
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: end;
    }
  }
</style>

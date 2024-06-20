<script lang="ts">
    // Svelte
    import { onMount } from 'svelte'

    // Components
    import { BuildingList } from '$components'

    // Stores
    import { location } from '$stores'
    import { sorting } from '$stores/sorting';
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { browser } from "$app/environment";

    // Data
    export let data
    type SortType = 'default' | 'name' | 'year' | 'distance';

    // Handle sorting change
    const handleSortChange = (sort: SortType) => {
        const params = new URLSearchParams($page.url.searchParams);
        params.set('sort', sort);
        if (browser) {
            goto(`?${ params.toString() }`)
        }
    };

    $: sorting.subscribe((sort: SortType) => {
        handleSortChange(sort);
    });

    onMount(() => {
        if (data.error) {
            console.error(data.error)
        }
    })
</script>

<section>
    {#if data.error}
        <h1>{data.fetchListError}</h1>
    {:else}
        <BuildingList
            buildingsTitle={data.buildingsTitle}
            noResults={data.noResults}
            distanceTo={data.distanceTo}
            map={data.map}
            buildings={data.buildings}
            moreInfo={data.moreInfo}
            location={$location || null}
        />
    {/if}
</section>

<style lang="scss">
  section {
    margin: 0 0 2rem 0;
  }
</style>

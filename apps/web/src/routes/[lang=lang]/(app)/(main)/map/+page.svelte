<script lang="ts">
    // Components
    import { Map } from '$components';

    // Stores
    import { location } from '$stores';
    import { onMount } from 'svelte';
    import { watchLocation } from '$lib';
    import Legend from '$components/Legend.svelte';
    import TopBar from "$components/TopBar.svelte";

    export let data;
    export let legendMenuId: string;

    onMount(() => {
        if (!$location) {
            watchLocation();
        }
    });
</script>

<section>
    <Map buildings={data.buildings} location={$location} menuId={legendMenuId} />
    <Legend menuId={legendMenuId} />
</section>

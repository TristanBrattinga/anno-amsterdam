<script lang="ts">
    // Components
    import { Header, Footer, Sidebar, LocationPopup } from '$components';
    import TopBar from "$components/TopBar.svelte";
    import { page } from "$app/stores";
    import { onDestroy } from "svelte";
    import { locale } from "$i18n/i18n-svelte";

    export let data;
    let sidebarMenuId = 'filterSidebar'
    let currentRoute: string;

    const unsubscribe = page.subscribe(p => {
        currentRoute = p.url.pathname;
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<Header />
<main>
    {#if currentRoute !== `/${$locale}/lens`}
        <TopBar data={data} currentRoute={currentRoute} />
    {/if}
    <Sidebar menuId={sidebarMenuId} filterTitle={data.filterTitle} sortBy={data.sortBy} />
    <slot />
</main>
<Footer lens={data.lens} list={data.list} map={data.map} />

<style>
    main {
        position: absolute;
        top: 64px;
        width: 100%;
        overflow: auto;
        height: calc(100dvh - 60px - 80px);
    }
</style>

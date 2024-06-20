<script lang="ts">
    // Components
    import { Footer, Header, Sidebar } from '$components';
    import TopBar from "$components/TopBar.svelte";
    import { page } from "$app/stores";
    import { locale } from "$i18n/i18n-svelte";

    export let data;
    let sidebarMenuId = 'filterSidebar'
    let currentRoute: string;


    $: currentRoute = $page.url.pathname
</script>

<Header />
<main>
    {#if currentRoute !== `/${$locale}/lens` || currentRoute === `/${$locale}/building/`}
        <TopBar data={data} currentRoute={currentRoute} />
    {/if}
    <Sidebar menuId={sidebarMenuId} filterTitle={data.filterTitle} sortBy={data.sortBy}
             sidebar={data.sidebar} />
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

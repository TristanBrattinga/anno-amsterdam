<script lang="ts">
	// Components
	import { Header, Footer, Sidebar } from '$components';

	export let data
	let sidebarMenuId = 'mainSidebar'
</script>

<Header sidebarMenuId={sidebarMenuId} search={data.search} menuId={sidebarMenuId}
        search={data.search}
        clear={data.clear}
        searchPlaceholder={data.searchPlaceholder}
        openFilters={data.openFilters}/>
<main>
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

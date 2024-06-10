<script lang="ts">
	// Components
	import { Header, Footer, LocationPopup, NavBar, Sidebar } from '$components'

	export let data
	let sidebarMenuId = 'mainSidebar'
</script>

<Header home={data.home} settings={data.settings} />
<main>
	<NavBar menuId={sidebarMenuId} />
	<Sidebar menuId={sidebarMenuId} filterTitle={data.filterTitle} />
	<LocationPopup />
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

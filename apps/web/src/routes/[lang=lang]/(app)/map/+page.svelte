<script lang="ts">
	// Components
	import { Map, NavBar, Sidebar } from '$components';

	// Stores
	import { location } from '$stores';
	import { onMount } from 'svelte';
	import { watchLocation } from '$lib';

	export let data;

	let sidebarMenuId = 'mainSidebar';

	onMount(() => {
		if (!$location) {
			watchLocation();
		}
	});
</script>

<section>
	<NavBar menuId={sidebarMenuId} />
	<Sidebar menuId={sidebarMenuId} filterTitle={data.filters} />
	<Map buildings={data.buildings} location={location} />
</section>

<script lang="ts">
	// Components
	import { Map } from '$components';

	// Stores
	import { location } from '$stores';
	import { onMount } from 'svelte';
	import { watchLocation } from '$lib';
	import Sidebar from '$components/Sidebar.svelte';
	import NavBar from '$components/NavBar.svelte';

	export let data;

	onMount(() => {
		if (!$location) {
			watchLocation();
		}
	});
</script>

<section>
	<NavBar />
	<Sidebar />
	<Map buildings={data.buildings} />
</section>

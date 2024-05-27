<script lang="ts">
	// Components
	import { Map } from '$components';

	// Stores
	import { location } from '$stores';
	import { onMount } from 'svelte';
	import { watchLocation } from '$lib';

	export let data;

	onMount(() => {
		if (!$location) {
			watchLocation();
		}
	});
</script>

<section>
	<Map buildings={data.buildings} location={$location || null} />
</section>

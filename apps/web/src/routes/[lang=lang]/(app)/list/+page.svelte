<script>
	export let data;
</script>

<ul>
	{#each data.buildings as building}
		<li>{building.name}: {building.address}</li>
	{/each}
</ul>

<script>
	import { watchLocation, location, locationWatchId } from '$lib';

	export let data;
</script>

<h1>{data.welcome}</h1>

<section>
	<h2>Locatie</h2>
	<p>Om de app optimaal te gebruiken hebben we uw locatie nodig.</p>
	{#if $location}
		<p>Je hebt al toestemming gegeven.</p>
	{:else if $locationWatchId}
		<p>Je hebt toestemming geweigerd. Sta locatie toe vanuit je instellingen.</p>
	{:else}
		<button
			on:click={() => watchLocation($locationWatchId)}
			disabled={!!$locationWatchId}
			aria-disabled={!!locationWatchId}>Locatie toestaan</button
		>
	{/if}
</section>

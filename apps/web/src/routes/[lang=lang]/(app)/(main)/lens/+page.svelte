<script>
	import { watchLocation, location, locError, locWatchId } from '$lib';

	export let data;
</script>

<h1>{data.welcome}</h1>

<section>
	<h2>Locatie</h2>
	<p>Om de app optimaal te gebruiken hebben we uw locatie nodig.</p>
	{#if $location}
		<p>Je hebt toestemming gegeven.</p>
	{:else if $locError && $locError.code === $locError.PERMISSION_DENIED}
		<p>Je hebt toestemming geweigerd. Reset je keuze en probeer nog een keer.</p>
	{:else if $locError}
		<p>Er is iets fout gegaan bij het locatie ophalen.</p>
	{/if}
	{#if !$location}
		<button
			on:click={() => watchLocation($locWatchId)}
			disabled={!!$locWatchId && !$locError}
			aria-disabled={!!locWatchId && !$locError}>Locatie toestaan
		</button
		>
	{/if}
</section>
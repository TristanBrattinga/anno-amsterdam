<script lang="ts">
	import { Dialog } from '$components'
	import { watchLocation, location, locError, locWatchId } from '$lib'
	import { onMount } from 'svelte'

	let dialog: HTMLDialogElement | undefined

	onMount(() => {
		if (!$location) dialog?.showModal()
	})

	$: if ($location) dialog?.close()
</script>

<Dialog bind:dialog>
	<h1>Locatie</h1>
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
			aria-disabled={!!locWatchId && !$locError}>Locatie toestaan</button
		>
	{/if}
</Dialog>

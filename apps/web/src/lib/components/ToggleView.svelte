<script lang="ts">
	import { viewMode } from '$stores'
	import { GridViewIcon, ListViewIcon } from '$icons'
	import { onMount } from 'svelte'

	interface data {
		showList: string
		showGrid: string
	}

	export let data: data
	let isLoading: boolean = true

	// Subscribe to the viewMode store on mount
	onMount(() => {
		// Cleanup on component unmount
		return viewMode.subscribe((value) => {
			$viewMode = value
		})
	})

	// Function to toggle view mode
	const toggleView = (view: string) => {
		viewMode.set(view)
	}
</script>

<ul>
	<li>
		<button aria-label={data.showList} on:click={() => toggleView('list')}>
			<ListViewIcon color={$viewMode === 'grid' ? '#C5D9E0' : '#00425a'} />
		</button>
	</li>
	<li>
		<button aria-label={data.showGrid} on:click={() => toggleView('grid')}>
			<GridViewIcon color={$viewMode === 'grid' ? '#00425a' : '#C5D9E0'} />
		</button>
	</li>
</ul>

<style lang="scss">
	ul {
		display: flex;
		justify-content: center;
		width: fit-content;
		border: 1px solid var(--accent-color-light);
		border-radius: 5px;

		button {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 2rem;
			aspect-ratio: 1/1;

			> svg {
				transition: all 0.1s ease-in-out;
			}
		}
	}
</style>

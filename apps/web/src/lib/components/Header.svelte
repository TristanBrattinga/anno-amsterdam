<script lang="ts">
	// Stores
	import { page } from '$app/stores';

	// Components
	import { Logo } from '$components';

	// Icons
	import Cog from 'lucide-svelte/icons/cog';

	// Props
	export let settings: string;
</script>

<header>
	<div class="lead">
		<Logo color="var(--color-primary)" />
		<h1>Amsterdam</h1>
	</div>
	<div class="trail">
		<a href={`/${$page.data.locale}/settings`} aria-label={settings}>
			<Cog />
		</a>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background-color: var(--bg-color);
	}

	.lead {
		display: flex;
		align-items: center;
	}

	h1 {
		margin-left: 8px;
		font-size: 1.5rem;
		text-transform: uppercase;
		color: var(--secondary-color);
	}
</style>

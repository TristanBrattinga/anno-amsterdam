<script lang="ts">
	import { page } from '$app/stores';

	// Icons
	import Home from 'lucide-svelte/icons/home';
	import List from 'lucide-svelte/icons/list';
	import Map from 'lucide-svelte/icons/map';

	type MenuItem = {
		name: string;
		href: string;
		icon: typeof Home;
	};

	const menuItems: MenuItem[] = [
		{
			name: 'Home',
			href: '',
			icon: Home
		},
		{
			name: 'Map',
			href: '/map',
			icon: Map
		},
		{
			name: 'List',
			href: '/list',
			icon: List
		}
	];
</script>

<footer>
	<nav>
		{#each menuItems as { name, href, icon }}
			<a href={`/${$page.data.locale}${href}`}>
				<svelte:component this={icon} />
				{name}
			</a>
		{/each}
	</nav>
</footer>

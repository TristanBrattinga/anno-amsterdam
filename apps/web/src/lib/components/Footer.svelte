<script lang="ts">
	// Stores
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
		<ul>
			{#each menuItems as { name, href, icon }}
				<li>
					<a
						href={`/${$page.data.locale}${href}`}
						aria-current={$page.url.pathname === `/${$page.data.locale}${href}` ? 'page' : false}
					>
						<svelte:component this={icon} />
						{name}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</footer>

<style>
	footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: var(--bg-color);
		color: var(--text-color);
		padding: 1rem;
	}

	nav ul {
		display: flex;
		justify-content: center;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	nav li {
		flex: 1;
		margin: 0 1rem;
	}

	nav a {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>

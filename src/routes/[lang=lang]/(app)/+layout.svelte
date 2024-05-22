<script lang="ts">
	import { page } from '$app/stores';
	import { setLocale } from '$i18n/i18n-svelte';

	// Components
	import { Logo } from '$components';
	import { AppShell, AppBar, TabGroup, TabAnchor } from '@skeletonlabs/skeleton';

	// Icons
	import Home from 'lucide-svelte/icons/home';
	import List from 'lucide-svelte/icons/list';
	import Map from 'lucide-svelte/icons/map';
	import Cog from 'lucide-svelte/icons/cog';

	export let data;
	setLocale(data.locale);

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

<AppShell>
	<svelte:fragment slot="header">
		<AppBar slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<a href={`/${$page.data.locale}`} aria-label={data.home}>
					<Logo color="primary" />
				</a>
			</svelte:fragment>
			<h1 class="h1">Amsterdam</h1>
			<svelte:fragment slot="trail">
				<a
					href={`/${$page.data.locale}/settings`}
					aria-label={data.settings}
					class="btn-icon"
					class:text-primary-500={$page.url.pathname === `/${$page.data.locale}/settings`}
				>
					<Cog />
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Page content -->
	<div class="p-4">
		<slot />
	</div>

	<!-- Footer -->
	<nav slot="footer">
		<TabGroup
			justify="justify-center"
			flex="flex-1 lg:flex-none"
			rounded=""
			border=""
			active="border-b-2 border-surface-900-50-token text-primary-500"
			class="bg-surface-100-800-token w-full"
		>
			{#each menuItems as item}
				<TabAnchor
					href={`/${$page.data.locale}${item.href}`}
					data-page={$page.url.pathname}
					selected={$page.url.pathname === `/${$page.data.locale}${item.href}`}
				>
					<div slot="lead" class="flex justify-center">
						<svelte:component this={item.icon} />
					</div>
					<span>{item.name}</span>
				</TabAnchor>
			{/each}
		</TabGroup>
	</nav>
</AppShell>

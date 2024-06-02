<script lang="ts">
	// Stores
	import { page } from '$app/stores'

	// Components
	import { Logo } from '$icons';

	// Icons
	import Cog from 'lucide-svelte/icons/cog'

	// Props
	export let home: string
	export let settings: string
</script>

<header>
	<div class="lead">
		<a href={`/${$page.data.locale}`} aria-label={home}>
			<Logo width="48px" height="48px" color="var(--primary-color)" />
		</a>
		<h1>Amsterdam</h1>
	</div>
	<div class="trail">
		<a
			class="link"
			href={`/${$page.data.locale}/settings`}
			aria-label={settings}
			aria-current={$page.url.pathname === `/${$page.data.locale}/settings` ? 'page' : false}
		>
			<Cog />
		</a>
	</div>
</header>

<style>
    header {
        position: fixed;
        top: 0;
        width: 100%;
        height: 64px;
        display: flex;
        padding-inline: 16px;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        border-bottom: 1px solid #E6E6E6;
    }
	header {
		position: fixed;
		top: 0;
		width: 100%;
		height: 64px;
		display: flex;
		padding-inline: 16px;
		justify-content: space-between;
		align-items: center;
		background-color: var(--bg-color);
	}

	.lead {
		display: flex;
		align-items: center;
	}

	.trail a {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 48px;
		width: 48px;
	}

	h1 {
		margin-left: 8px;
		font-size: 1.5rem;
		text-transform: uppercase;
		color: var(--secondary-color);
	}
</style>

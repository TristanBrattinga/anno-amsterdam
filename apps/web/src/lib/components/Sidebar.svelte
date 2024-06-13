<script lang="ts">
	import { menuStore } from '$stores/menu'
	import { onDestroy } from 'svelte'
	import { Logo, CloseIcon } from '$icons'
	import { page } from '$app/stores'

	export let menuId: string
	export let filterTitle: string
	export let sortBy: string

	let sidebarOpen = false
	const unsubscribe = menuStore.subscribe((value) => {
		sidebarOpen = value[menuId] || false
	})

	onDestroy(() => {
		unsubscribe()
	})

	const closeSidebar = () => {
		menuStore.closeMenu(menuId)
	}
</script>

<aside class:show={sidebarOpen}>
	<div>
		<a href={`/${$page.data.locale}`} aria-label="Home">
			<Logo />
			<span>Amsterdam</span>
		</a>
		<button on:click={closeSidebar}>
			<CloseIcon />
		</button>
	</div>
	<h1>{filterTitle}</h1>
	<div class="divider" />
	<form method="get">
		<label for="sort">{sortBy}</label>
		<select id="sort" name="sort">
			<option value="default" selected>Standaard</option>
			<option value="distance">Afstand</option>
			<option value="name">A-Z</option>
			<option value="year">Bouwjaar</option>
		</select>
		<button type="submit">Filteren</button>
	</form>
</aside>

<style lang="scss">
	aside {
		position: fixed;
		left: 0;
		top: 0;
		background-color: #fff;
		width: 100%;
		height: 100dvh;
		z-index: 20;
		padding: 2rem 1rem;
		color: black;
		transform: translateX(100%);
		transition: all 0.5s ease-in-out;

		&.show {
			transform: translateX(0);
		}

		> div {
			display: flex;
			justify-content: space-between;
			align-items: center;

			a {
				display: flex;
				align-items: end;
				gap: 0.25rem;
				width: fit-content;

				span {
					font-family: Oswald, sans-serif;
					color: var(--secondary-color-light);
					text-transform: uppercase;
					font-weight: 300;
					font-size: 1.375rem;
					line-height: 1.1;
				}
			}

			button {
				appearance: none;
				background-color: transparent;
				border: none;
				cursor: pointer;
			}
		}

		h1 {
			font-size: 2rem;
			line-height: 1;
			margin-top: 1rem;
		}

		form {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 0.5rem;

			select {
				border: 1px solid var(--accent-color);
				border-radius: 999px;
				cursor: pointer;
				padding: 0 0.5rem;
			}
		}
	}

	.divider {
		width: 100%;
		height: 1px;
		background-color: #e6e6e6;
		margin: 1rem 0;
	}
</style>

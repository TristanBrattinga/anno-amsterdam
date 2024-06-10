<script lang="ts">
	// Stores
	import { page } from '$app/stores';

	// Components
	import { Logo } from '$icons';

	// Icons

	// Props
	export let home: string;
	export let settings: string;
</script>

<header>
	<nav class="container">
		<a href={`/${$page.data.locale}`} aria-label={home}>
			<Logo />
			<span>Amsterdam</span>
		</a>
	</nav>
</header>

<style lang="scss">
  header {
    position: sticky;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #C5D9E0;
    height: 64px;

    a {
      display: flex;
      align-items: end;
      gap: .25rem;
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
  }
</style>

<script>
	import { page } from '$app/stores';
</script>

<h1>{$page.error?.message ?? 'Oops! Something went wrong...'}</h1>
<a href="/">Go back home</a>

<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>{$page.error?.message || $page.data.unexpectedError}</h1>
<a href="/{$page.data.locale}">{$page.data.goHome}</a>

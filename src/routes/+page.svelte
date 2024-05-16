<script>
	export let data;
</script>

<h1>Welcome to Anno Amsterdam!</h1>
<p>This is the homepage.</p>
<code>{JSON.stringify(data?.buildings ?? '[]')}</code>
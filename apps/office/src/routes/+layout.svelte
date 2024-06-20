<script>
	import '$lib/styles/main.scss';
  import  Header from '$lib/components/Header.svelte';
</script>

<Header />
<main>
<slot />
</main>
<style>
  main{
    margin: 0 2.5vw;
    min-height: 80vh;
    }
</style>
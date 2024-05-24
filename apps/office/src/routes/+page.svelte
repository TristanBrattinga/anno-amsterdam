<script>
    import Button from '$lib/components/Button.svelte';
</script>

<h1>Content incoming</h1>
<Button size="small">Small Button</Button>
<Button size="normal" disabled={true}>Normal Disabled Button</Button>
<Button size="large" cta={true}>Large CTA Button</Button>
<Button size="large" subtle={true}>Large Subtle Button</Button>
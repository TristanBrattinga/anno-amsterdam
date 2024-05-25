<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import LinkButton from '$lib/components/LinkButton.svelte';
</script>

<h1>Content incoming</h1>
<p style="margin: 1em 0;">a href</p>
<LinkButton href="/import" size="large" cta={false} subtle={false}>+ Nieuw gebouw</LinkButton>


<p style="margin: 1em 0;">buttons</p>
<Button size="small">Small Button</Button>
<Button size="normal" disabled={true}>Normal Disabled Button</Button>
<Button size="large" cta={true}>Large CTA Button</Button>
<Button size="large" subtle={true}>Large Subtle Button</Button>

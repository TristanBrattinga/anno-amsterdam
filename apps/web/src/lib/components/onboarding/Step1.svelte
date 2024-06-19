<script lang="ts">
    import { Logo } from '$icons';
</script>

<article>
  <p>Discover Amsterdam's<br /> architectural heritage with</p>
  <Logo width="256px" height="56px" color="#fff" />
  <h1>Amsterdam</h1>
</article>

<style lang="scss">

  article {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  p {
    font-family: Oswald, sans-serif;
    color: var(--accent-color-light);
    text-align: center;
    font-size: 1.375rem;
  }

  h1 {
    font-family: Oswald, sans-serif;
    font-weight: 300;
    font-size: 2rem;
    line-height: 1;
    text-transform: uppercase;
    color: #FF6464;
  }
</style>

<script lang="ts">
</script>

<article>
    <div>
        <img src="/images/onboarding4.png" alt="">
        <ul>
            <li>Pictures</li>
            <li>Anno</li>
            <li>Stories</li>
            <li>Timeline</li>
            <li>Audio guides</li>
        </ul>
    </div>
    <p>Unlock the Building's Secrets - Explore Detailed Information</p>
</article>


<style lang="scss">
  article {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  div {
    display: flex;
    align-items: center;
    gap: 1rem;

    ul {
      border-left: 1px solid var(--accent-color-light);
      padding: 4rem 0 4rem 1rem;
    }
  }

  img {
    width: 100%;
    height: auto;
    max-width: 6rem;
  }

  p {
    font-family: Oswald, sans-serif;
    color: var(--accent-color-light);
    text-align: center;
    font-size: 1.375rem;
  }

  li {
    font-family: Oswald, sans-serif;
    color: var(--accent-color-light);
    font-size: 1.375rem;
    line-height: 1.2;
    text-transform: uppercase;

    &:nth-of-type(2) {
      color: var(--secondary-color-light);
      font-size: 1.875rem;
      line-height: 1.1;
      font-weight: 600;
    }
  }

</style>


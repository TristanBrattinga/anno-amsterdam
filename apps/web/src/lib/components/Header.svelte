<script lang="ts">
    // Components
    import { Logo } from '$icons';
    import { LanguageSelector } from "$components/index";
</script>

<header>
    <nav class="container">
        <p>
            <Logo />
            <span>Amsterdam</span>
        </p>
        <LanguageSelector />
    </nav>
</header>

<style lang="scss">
  header {
    position: sticky;
    top: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid var(--accent-color-light);
    z-index: 10;
    gap: .25rem;

    nav {
      height: 64px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
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
    }
  }

  @media (min-width: 769px) {
    header {
      flex-direction: row;
    }
  }
</style>

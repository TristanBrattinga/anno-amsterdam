<script>
  import '$lib/styles/main.scss';
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import Logo from '$lib/components/Logo.svelte';
  const activePath = derived(page, $page => $page.url.pathname);
</script>

<header>
  <ul>
    <li class="left">
      <a href="/" aria-current={$activePath === '/' ? 'page' : undefined} class={$activePath === '/' ? 'active' : ''}><Logo /><span>Amsterdam</span></a>
    </li>
    <li>
      <a href="/toevoegen" aria-current={$activePath === '/toevoegen' ? 'page' : undefined} class={$activePath === '/toevoegen' ? 'active' : ''}>Toevoegen</a>
    </li>
    <li>
      <a href="/statistieken" aria-current={$activePath === '/statistieken' ? 'page' : undefined} class={$activePath === '/statistieken' ? 'active' : ''}>Statistieken</a>
    </li>
    <li>
      <a href="/gebruikers" aria-current={$activePath === '/gebruikers' ? 'page' : undefined} class={$activePath === '/gebruikers' ? 'active' : ''}>Gebruikers</a>
    </li>
    <li>
      <a href="/logout" aria-current={$activePath === '/logout' ? 'page' : undefined} class={$activePath === '/logout' ? 'active' : ''}>Logout</a>
    </li>
  </ul>
</header>

<style lang="scss">
  header {
    width: 100vw;
    height: 8vh;
    display: flex;
    padding-inline: 1rem;
    align-items: center;
    background-color: var(--bg-color);
    
    ul {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 2rem;
      list-style: none;
      padding: 0 1.5rem;
      margin: 0;
      
      li {
        font-size: 1.1rem;
        
        &.left {
          margin-right: auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        &.left a{
          display: flex;
          align-items: center;
          width: 25vw;
        }
        &.left a:hover {
          color: var(--primary-color);
        }
        &.left a:hover span{
          color: var(--secondary-color);
        }
        
        &.left a[aria-current="page"] {
          text-decoration: none;
          color: var(--primary-color);
        }
        a {
          text-decoration: none;
          
          &[aria-current="page"]{
            text-decoration: underline;
            color: var(--secondary-color);
          }
          &[aria-current="page"]:hover {
            color: var(--secondary-color);
          
          }
          &:hover {
            color: var(--primary-color);
            font-weight: bolder;
          }
          &[aria-current="page"] span {
            color: var(--secondary-color);
            text-decoration: none;
          }
          &[aria-current="page"]:hover{
            color: var(--primary-color);
          }
          &[aria-current="page"]:hover span{
            color: var(--secondary-color);
            text-decoration: none;
            font-weight: normal;
          }
        }
      }
    }
  }
</style>

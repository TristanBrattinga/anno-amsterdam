<script lang="ts">
    import { menuStore } from '$stores/menu'
    import { page } from '$app/stores'

    export let openFilters: string
    export let menuId: string

    const filters = ['sort']

    $: nrOfFilters = filters.filter((filter) => !!$page.url.searchParams.get(filter)).length

    const toggleSidebar = () => {
        menuStore.toggleMenu(menuId)
    }
</script>

<button class="toggle-sidebar" on:click={toggleSidebar} aria-label={openFilters}>
    <svg
        width="24"
        height="24"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M28.825 6.19125C28.6711 5.83564 28.416 5.53312 28.0915 5.32132C27.7671 5.10952 27.3875 4.99778 27 5H5C4.61291 5.00076 4.23436 5.11384 3.91028 5.32551C3.58619 5.53718 3.3305 5.83835 3.17421 6.19248C3.01792 6.54661 2.96775 6.93849 3.0298 7.32057C3.09184 7.70265 3.26343 8.05852 3.52375 8.345L3.53375 8.35625L12 17.3963V27C11.9999 27.362 12.0981 27.7172 12.284 28.0278C12.4699 28.3383 12.7366 28.5926 13.0557 28.7635C13.3748 28.9344 13.7343 29.0155 14.0959 28.9982C14.4574 28.9808 14.8075 28.8657 15.1087 28.665L19.1087 25.9975C19.383 25.8149 19.6078 25.5673 19.7633 25.2768C19.9188 24.9864 20.0001 24.662 20 24.3325V17.3963L28.4675 8.35625L28.4775 8.345C28.7406 8.05983 28.9138 7.70349 28.9756 7.32046C29.0374 6.93744 28.985 6.54469 28.825 6.19125ZM18.5425 16.035C18.1951 16.4032 18.0011 16.89 18 17.3963V24.3325L14 27V17.3963C14.0012 16.8882 13.808 16.3989 13.46 16.0288L5 7H27L18.5425 16.035Z"
            fill="#343330"
        />
    </svg>
    <!--{#if nrOfFilters}-->
    <!--    <div class="indicator">-->
    <!--        <div role="status">{nrOfFilters}</div>-->
    <!--    </div>-->
    <!--{/if}-->
</button>

<style lang="scss">
  button {
    border: 1px solid var(--accent-color-light);
    background-color: #fff;
    border-radius: 5px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;

    .indicator {
      position: absolute;
      top: 0;
      right: 0;
      margin-top: -4px;
      margin-right: -4px;
      width: 20px;
      color: white;
      height: 20px;
      background-color: var(--secondary-color);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
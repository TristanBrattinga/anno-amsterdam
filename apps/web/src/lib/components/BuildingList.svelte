<script lang="ts">
    import '$styles/grid.scss'

    // Components
    import { BuildingCell } from '$components'

    // Utils
    import type { Building, Coords } from '$types'
    import { ListViewIcon, GridViewIcon } from '$icons'
    import { viewMode } from '~/lib'

    // Props
    export let moreInfo: string
    export let map: string
    export let distanceTo: string
    export let buildingsTitle: string
    export let buildings: Building[]
    export let location: Coords | null = null

    const toggleView = (view: string) => {
        viewMode.set(view)
    }
</script>

<h2 class="sr-only">{buildingsTitle}</h2>
<ul>
  <li>
    <button on:click={() => toggleView('list')}>
      <ListViewIcon color={$viewMode === 'grid' ?  '#C5D9E0': '#00425a'} />
    </button>
  </li>
  <li>
    <button on:click={() => toggleView('grid')}>
      <GridViewIcon color={$viewMode === 'grid' ? '#00425a' : '#C5D9E0'} />
    </button>
  </li>
</ul>
<ul class={$viewMode === 'grid' ? 'grid' : ''}>
  {#each buildings as building}
    <li>
      <BuildingCell {building} {location} {moreInfo} {map} {distanceTo} />
    </li>
  {/each}
</ul>

<style lang="scss">
  button {
    appearance: none;
    background: none;
    border: none;
  }

  ul:nth-of-type(1) {
    display: flex;
    justify-content: center;
    width: fit-content;
    border: 1px solid var(--accent-color-light);
    border-radius: 5px;
    margin: 1rem auto;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2rem;
      aspect-ratio: 1/1;

      > svg {
        transition: all .1s ease-in-out;
      }
    }
  }

  ul:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &.grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;

      @media (min-width: 1200px) {
        grid-template-columns: 1fr 1fr 1fr;
        gap: 2rem;
      }

    }
  }
</style>

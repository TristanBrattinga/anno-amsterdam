<script lang="ts">
    import { CaretDownIcon } from '$icons'
    import { closeDropdownOnOutsideClick, setSorting } from "~/lib";

    interface option {
        label: string
        value: string
    }

    const options: option[] = [
        { label: 'Standaard', value: 'default' },
        { label: 'A-Z', value: 'name' },
        { label: 'Bouwjaar', value: 'year' },
        { label: 'Afstand', value: 'distance' }
    ];

    let dropdownOpen = false;
    let selectedOption = options[0];

    const setDropdownOpen = (open: boolean) => {
        dropdownOpen = open;
    };

    closeDropdownOnOutsideClick('.sorting-selector', setDropdownOpen);

    const selectOption = (option: option) => {
        selectedOption = option;
        setSorting(option.value);
        dropdownOpen = false;
    };
</script>

<div class="sorting-selector">
    <button on:click={() => dropdownOpen = !dropdownOpen}>
        {selectedOption.label}
        <CaretDownIcon className={`${dropdownOpen ? 'rotated' : ''}`} />
    </button>
    <div class={`dropdown ${dropdownOpen ? 'open' : ''}`}>
        {#each options as option}
            <button class="dropdown-item" on:click={() => selectOption(option)}>
                {option.label}
            </button>
        {/each}
    </div>
</div>

<style lang="scss">
  .sorting-selector {
    position: relative;

    > button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      border: 1px solid var(--accent-color-light);
      border-radius: 5px;
      padding: 0 .5rem;
      width: 8rem;
    }
  }

  .dropdown {
    display: block;
    position: absolute;
    top: 110%;
    right: 0;
    background-color: white;
    z-index: 1;
    height: 0;
    border: 1px solid transparent;
    border-radius: 5px;
    overflow: hidden;
    transition: all .2s ease-in-out;
  }

  .dropdown.open {
    height: 150px;
    border: 1px solid var(--accent-color-light);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .dropdown-item {
    text-align: start;
    padding: 8px 16px;
    cursor: pointer;
    transition: all .1s ease;
    width: 100%;
  }

  .dropdown-item:hover {
    background-color: var(--accent-color-light);
  }
</style>
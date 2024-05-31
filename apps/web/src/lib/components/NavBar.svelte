<script lang="ts">
	import { onMount } from 'svelte';
	import type { FormEventHandler } from 'svelte/elements';

	let inputValue = '';
	let showCloseButton = false;


	const handleInputChange: FormEventHandler<HTMLInputElement> = (event) => {
		const target = event.currentTarget as HTMLInputElement;
		const inputValue = target.value;
		showCloseButton = inputValue !== '';
	};

	const clearInput = () => {
		inputValue = '';
		showCloseButton = false;
	};

	onMount(() => {
		showCloseButton = inputValue !== '';
	});
</script>

<ul>
	<li>
		<form>
			<label>
				<svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M28.7075 27.2925L22.4487 21.035C24.2628 18.8572 25.1673 16.0638 24.9743 13.236C24.7812 10.4081 23.5054 7.76361 21.4122 5.85251C19.319 3.9414 16.5695 2.91086 13.7359 2.97526C10.9022 3.03966 8.20243 4.19404 6.19821 6.19827C4.19398 8.20249 3.0396 10.9023 2.9752 13.7359C2.9108 16.5696 3.94134 19.319 5.85244 21.4122C7.76355 23.5054 10.4081 24.7813 13.2359 24.9743C16.0637 25.1674 18.8571 24.2628 21.035 22.4488L27.2925 28.7075C27.3854 28.8005 27.4957 28.8742 27.6171 28.9244C27.7385 28.9747 27.8686 29.0006 28 29.0006C28.1314 29.0006 28.2615 28.9747 28.3829 28.9244C28.5043 28.8742 28.6146 28.8005 28.7075 28.7075C28.8004 28.6146 28.8741 28.5043 28.9244 28.3829C28.9747 28.2615 29.0005 28.1314 29.0005 28C29.0005 27.8686 28.9747 27.7385 28.9244 27.6171C28.8741 27.4958 28.8004 27.3855 28.7075 27.2925ZM4.99998 14C4.99998 12.22 5.52782 10.48 6.51675 8.99991C7.50569 7.51987 8.91129 6.36631 10.5558 5.68513C12.2004 5.00394 14.01 4.82571 15.7558 5.17297C17.5016 5.52024 19.1053 6.37741 20.3639 7.63608C21.6226 8.89475 22.4798 10.4984 22.827 12.2442C23.1743 13.9901 22.9961 15.7997 22.3149 17.4442C21.6337 19.0887 20.4802 20.4943 19.0001 21.4833C17.5201 22.4722 15.78 23 14 23C11.6138 22.9974 9.3262 22.0483 7.63894 20.3611C5.95169 18.6738 5.00263 16.3862 4.99998 14Z"
						fill="#343330" />
				</svg>
				<input type="search" placeholder="Search by address" bind:value={inputValue}
					   on:input={handleInputChange}>
				{#if showCloseButton}
					<button type="button" on:click={clearInput}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="none">
							<path
								d="M15.8516 4.19336L4.60156 15.4434"
								stroke="#343330"
								stroke-width="1"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M15.8516 15.4434L4.60156 4.19336"
								stroke="#343330"
								stroke-width="1"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
				{/if}
			</label>
		</form>
	</li>
	<li>
		<button>
			<svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M28.825 6.19125C28.6711 5.83564 28.416 5.53312 28.0915 5.32132C27.7671 5.10952 27.3875 4.99778 27 5H5C4.61291 5.00076 4.23436 5.11384 3.91028 5.32551C3.58619 5.53718 3.3305 5.83835 3.17421 6.19248C3.01792 6.54661 2.96775 6.93849 3.0298 7.32057C3.09184 7.70265 3.26343 8.05852 3.52375 8.345L3.53375 8.35625L12 17.3963V27C11.9999 27.362 12.0981 27.7172 12.284 28.0278C12.4699 28.3383 12.7366 28.5926 13.0557 28.7635C13.3748 28.9344 13.7343 29.0155 14.0959 28.9982C14.4574 28.9808 14.8075 28.8657 15.1087 28.665L19.1087 25.9975C19.383 25.8149 19.6078 25.5673 19.7633 25.2768C19.9188 24.9864 20.0001 24.662 20 24.3325V17.3963L28.4675 8.35625L28.4775 8.345C28.7406 8.05983 28.9138 7.70349 28.9756 7.32046C29.0374 6.93744 28.985 6.54469 28.825 6.19125ZM18.5425 16.035C18.1951 16.4032 18.0011 16.89 18 17.3963V24.3325L14 27V17.3963C14.0012 16.8882 13.808 16.3989 13.46 16.0288L5 7H27L18.5425 16.035Z"
					fill="#343330" />
			</svg>
		</button>
	</li>
</ul>

<style lang="scss">

  ul {
    display: flex;
    padding: 4px 1rem;
    background-color: transparent;
    position: absolute;
    z-index: 10;
    width: 100%;
    justify-content: space-between;
    gap: .5rem;

    li:nth-of-type(1) {
      display: flex;
      flex-grow: 1;

      form {
        width: 100%;
      }
    }

    button {
      border: 1px solid #C5D9E0;
      background-color: #fff;
      border-radius: 999px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    label {
      position: relative;
      display: flex;
      align-items: center;

      > svg {
        position: absolute;
        left: 1rem;
      }

      button {
        border: none;
        background-color: transparent;
        position: absolute;
        right: 1rem;
        width: 28px;
        height: 28px;
      }

      input[type="search"] {
        border: 1px solid #C5D9E0;
        height: 40px;
        border-radius: 999px;
        padding-left: 2.5rem;
        width: 100%;
        outline: none;
        font-size: 14px;

        &::-webkit-search-cancel-button {
          -webkit-appearance: none;
        }
      }
    }
  }
</style>
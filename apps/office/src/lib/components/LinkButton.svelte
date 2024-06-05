<script>
  export let size = 'normal';
  export let disabled = false;
  export let cta = false;
  export let subtle = false;
  export let href = '#'; // Default href value


  //

  const sizeClasses = {
    small: 'small',
    normal: 'normal',
    large: 'large'
  };
  
  $: className = sizeClasses[size] || sizeClasses['normal'];
</script>

<a href={href}
   class="{className} {cta ? 'cta' : ''} {subtle ? 'subtle' : ''}"
   disabled={disabled}>
  <slot></slot>
</a>

<style>
  a {
    padding: 0.5rem .75rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: clamp(1rem, 1vw, 1.1rem);
    transition: background-color 0.15s, border-color 0.15s, color 0.15s;
    background-color: var(--primary-color);
    color: white;
	display: flex;
	justify-content: center;
	align-items: center;
    }
  
  a.small {
    width: 6em;
    }
  
  a.normal {
    width: 8em;
    }
  
  a.large {
    width: clamp(12em, fit-content, max-content);
	/* flex-grow: 1; */
    }
  
  a:hover:not(:disabled):not(.subtle) {
    background-color: var(--secondary-color);
    }
  
  a.cta {
    background-color: var(--secondary-color);
    color: white;
    }
  
  a.cta:hover:not(.disabled):not(.subtle) {
    background-color: var(--primary-color);
    }
  
  a.subtle {
    background-color: white;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    }
  
  a.subtle:hover:not(.disabled) {
    background-color: var(--primary-color);
    color: white;
    }
  
  a:disabled {
    background-color: var(--disabled-color);
    cursor: not-allowed;
    opacity: 0.6;
    }
</style>

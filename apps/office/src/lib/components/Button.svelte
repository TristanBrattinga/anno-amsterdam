<script>
  export let size = 'normal';
  export let disabled = false;
  export let cta = false;
  export let subtle = false;
  
  const sizeClasses = {
    small: 'small',
    normal: 'normal',
    large: 'large'
  };
  
  $: className = sizeClasses[size] || sizeClasses['normal'];
</script>

<button class="{className} {cta ? 'cta' : ''} {subtle ? 'subtle' : ''}" disabled={disabled}>
  <slot></slot>
</button>

<style>
  button {
    padding: 0.5rem .75rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: clamp(1rem, 1vw, 1.1rem);
    transition: background-color 0.3s, border-color 0.3s, color 0.3s;
    background-color: var(--primary-color);
    color: white;
    }
  
  button.small {
    width: 6em;
    }
  
  button.normal {
    width: 8em;
    }
  
  button.large {
    width: clamp(12em, fit-content, max-content);
    }
  
  button:hover:not(:disabled):not(.subtle) {
    background-color: var(--secondary-color);
    }
  
  button.cta {
    background-color: var(--secondary-color);
    color: white;
    }
  
  button.cta:hover:not(.disabled):not(.subtle) {
    background-color: var(--primary-color);
    }
  
  button.subtle {
    background-color: white;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    }
  
  button.subtle:hover:not(.disabled) {
    background-color: var(--primary-color);
    color: white;
    }
  
  button:disabled {
    background-color: var(--disabled-color);
    cursor: not-allowed;
    opacity: 0.6;
    }
</style>

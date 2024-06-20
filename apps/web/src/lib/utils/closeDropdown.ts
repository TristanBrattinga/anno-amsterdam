import { onMount } from "svelte";

export function closeDropdownOnOutsideClick(selector: string, setDropdownOpen: (open: boolean) => void) {
    const handler = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest(selector)) {
            setDropdownOpen(false);
        }
    };

    onMount(() => {
        window.addEventListener('click', handler);

        return () => {
            window.removeEventListener('click', handler);
        };
    });
}

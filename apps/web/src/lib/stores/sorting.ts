import { writable } from 'svelte/store';

export const sorting = writable('default');

export const setSorting = (sort: string) => {
    sorting.set(sort);
};

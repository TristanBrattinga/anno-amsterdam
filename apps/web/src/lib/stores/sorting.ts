import { writable } from 'svelte/store';


export const sorting = writable<'default' | 'name' | 'year' | 'distance'>('default');

export const setSorting = (sort: 'default' | 'name' | 'year' | 'distance') => {
    sorting.set(sort);
};

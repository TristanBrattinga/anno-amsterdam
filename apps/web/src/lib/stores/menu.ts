import { writable } from 'svelte/store';

interface MenuState {
	[key: string]: boolean;
}

const createMenuStore = () => {
	const { subscribe, update } = writable<MenuState>({});

	return {
		subscribe,
		openMenu: (menuId: string) => update(state => ({ ...state, [menuId]: true })),
		closeMenu: (menuId: string) => update(state => ({ ...state, [menuId]: false })),
		toggleMenu: (menuId: string) => update(state => ({ ...state, [menuId]: !state[menuId] }))
	};
};

export const menuStore = createMenuStore();

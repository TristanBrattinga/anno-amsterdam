// utils/renderComponentToElement.ts
import type { SvelteComponent } from 'svelte';
import type { Building, Coords } from '$types';

type CardPopupProps = {
	building: Building;
	location?: Coords | null;
};

export function renderComponentToElement(Component: new (options: {
	target: HTMLElement,
	props: CardPopupProps
}) => SvelteComponent<CardPopupProps>, props: CardPopupProps) {
	const element = document.createElement('div');
	new Component({
		target: element,
		props: props
	});
	return element;
}

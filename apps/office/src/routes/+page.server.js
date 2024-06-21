import { api } from '$lib/server';

export const load = async () => {
    const buildings = await api.getBuildings();
    return { buildings };
};

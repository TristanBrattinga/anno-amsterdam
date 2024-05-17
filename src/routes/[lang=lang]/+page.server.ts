import { api } from '$lib/server';

export const load = async ({ locals: { LL } }) => {
	console.info(LL.log({ fileName: '+page.server.ts' }));

	const buildings = await api.getBuildings();

	return { buildings };
};

export const load = ({ locals: { locale, LL } }) => {
	console.info(LL.log({ fileName: '+layout.server.ts' }));

	return { locale };
};

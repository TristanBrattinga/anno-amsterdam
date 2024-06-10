import { i18nObject } from '$i18n/i18n-util';

export const load = async ({ parent }) => {
	const { locale } = await parent();
	const LL = i18nObject(locale);

	return {
		lens: LL.lens(),
		settings: LL.settings(),
		list: LL.list(),
		map: LL.map()
	};
};
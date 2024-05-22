import { i18nObject } from '$i18n/i18n-util';

export const load = async ({ parent }) => {
	const { locale } = await parent();
	const LL = i18nObject(locale);

	return {
		home: LL.home(),
		settings: LL.settings()
	};
};

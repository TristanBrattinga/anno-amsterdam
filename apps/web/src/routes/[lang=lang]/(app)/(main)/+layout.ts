import { i18nObject } from '$i18n/i18n-util';

export const load = async ({ parent }) => {
    const { locale } = await parent();
    const LL = i18nObject(locale);

    return {
        lens: LL.lens(),
        search: LL.search(),
        clear: LL.clear(),
        openFilters: LL.openFilters(),
        searchPlaceholder: LL.searchPlaceholder(),
        settings: LL.settings(),
        sortBy: LL.sort(),
        filterTitle: LL.filters(),
        list: LL.list(),
        map: LL.map(),
        sidebar: LL.sidebar()
    };
};

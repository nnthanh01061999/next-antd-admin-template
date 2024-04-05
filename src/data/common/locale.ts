export const LOCALE_VI = 'vi';
export const LOCALE_EN = 'en';
export const locales = [LOCALE_VI, LOCALE_EN] as const;
export type TLocales = (typeof locales)[number];
export const defaultLocale = locales[0];
export const localesWithoutDefault = locales.filter((locale) => locale !== defaultLocale);

export const localeConfig = {
    en: {
        key: 'en',
        value: 'en',
        label: 'English',
        fullKey: 'en',
    },
    vi: {
        key: 'vi',
        value: 'vi',
        label: 'Tiếng Việt',
        fullKey: 'vi',
    },
};

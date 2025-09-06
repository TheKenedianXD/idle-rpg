import { createI18n } from 'vue-i18n';
import type { Locale } from './detectors';
import { DEFAULT_LOCALE } from './detectors';
import en from '@/locales/en.json';

type MessageSchema = typeof en;

export const i18n = createI18n<[MessageSchema], Locale, false>({
    legacy: false,
    locale: DEFAULT_LOCALE,
    fallbackLocale: 'en',
    messages: {
        en: {} as MessageSchema,
        cs: {} as MessageSchema
    },
    missing: (_locale, key) => `[${key}]`
});

const loaded = new Set<Locale>();

export async function loadLocale(loc: Locale) {
    if (!loaded.has(loc)) {
        const msgs = await import(`../locales/${loc}.json`);
        i18n.global.setLocaleMessage(loc, msgs.default);
        loaded.add(loc);
    }

    i18n.global.locale.value = loc;
    document.documentElement.lang = loc;
}

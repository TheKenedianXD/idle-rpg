export type Locale = 'cs' | 'en';
export const SUPPORTED: Locale[] = ['cs','en'];
export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALE_LABEL: Record<Locale, string> = {
    en: 'English',
    cs: 'Čeština'
};
export const LOCALE_ORDER: Locale[] = ['en','cs'];
const LS_KEY = 'locale';

export function getStoredLocale(): Locale | null {
    const v = localStorage.getItem(LS_KEY);
    return SUPPORTED.includes(v as Locale) ? (v as Locale) : null;
}

export function normalizeLocale(input?: string | null): Locale {
    if (!input) return DEFAULT_LOCALE;
    const lc = input.toLowerCase();
    if (lc.startsWith('cs')) return 'cs';
    if (lc.startsWith('en')) return 'en';
    return DEFAULT_LOCALE; // fallback en
}

export function detectBrowserLocale(): Locale {
    return normalizeLocale(navigator.language || navigator.languages?.[0] || '');
}

export function storeLocale(loc: Locale) {
    localStorage.setItem(LS_KEY, loc);
}
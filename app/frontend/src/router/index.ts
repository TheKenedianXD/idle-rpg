import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

import { loadLocale, i18n } from '@/i18n';
import { DEFAULT_LOCALE, SUPPORTED, normalizeLocale, getStoredLocale, detectBrowserLocale } from '@/i18n/detectors';

const LandingPage   = () => import('@/pages/LandingPage.vue');
const AppShell      = () => import('@/shared/AppShell.vue');
const DashboardPage = () => import('@/pages/DashboardPage.vue');
const MissionsPage  = () => import('@/pages/MissionsPage.vue');
const ArenaPage     = () => import('@/pages/ArenaPage.vue');
const CharacterPage = () => import('@/pages/CharacterPage.vue');
const CraftingPage  = () => import('@/pages/CraftingPage.vue');
const DungeonsPage  = () => import('@/pages/DungeonsPage.vue');
const GatheringPage = () => import('@/pages/GatheringPage.vue');
const GuildPage     = () => import('@/pages/GuildPage.vue');
const ProcessingPage= () => import('@/pages/ProcessingPage.vue');
const ShopPage      = () => import('@/pages/ShopPage.vue');

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/:locale(cs|en)?',
            children: [
                { path: '', name: 'landing', component: LandingPage },

                {
                    path: 'game',
                    component: AppShell,
                    children: [
                        { path: '', redirect: { name: 'dashboard' } },
                        { path: 'dashboard',  name: 'dashboard',  component: DashboardPage,  meta: { titleKey: 'dashboard' } },
                        { path: 'missions',   name: 'missions',   component: MissionsPage,   meta: { titleKey: 'missions' } },
                        { path: 'arena',      name: 'arena',      component: ArenaPage,      meta: { titleKey: 'arena' } },
                        { path: 'character',  name: 'character',  component: CharacterPage,  meta: { titleKey: 'character' } },
                        { path: 'crafting',   name: 'crafting',   component: CraftingPage,   meta: { titleKey: 'crafting' } },
                        { path: 'dungeons',   name: 'dungeons',   component: DungeonsPage,   meta: { titleKey: 'dungeons' } },
                        { path: 'gathering',  name: 'gathering',  component: GatheringPage,  meta: { titleKey: 'gathering' } },
                        { path: 'guild',      name: 'guild',      component: GuildPage,      meta: { titleKey: 'guild' } },
                        { path: 'processing', name: 'processing', component: ProcessingPage, meta: { titleKey: 'processing' } },
                        { path: 'shop',       name: 'shop',       component: ShopPage,       meta: { titleKey: 'shop' } }
                    ]
                }
            ]
        },

        { path: '/:pathMatch(.*)*', redirect: () => `/${DEFAULT_LOCALE}` }
    ]
});

router.beforeEach(async (to) => {
    const t = i18n.global.t
    const param = (to.params.locale as string | undefined) ?? undefined;
    const saved = getStoredLocale();
    const auto  = detectBrowserLocale();
    let loc = normalizeLocale(param ?? saved ?? auto);

    if (!param) return { ...to, params: { ...to.params, locale: loc }, replace: true };
    if (!SUPPORTED.includes(loc)) loc = DEFAULT_LOCALE;

    await loadLocale(loc);
    localStorage.setItem('locale', loc);

    const auth = useAuthStore();
    if (!auth.isAuthenticated && to.fullPath.includes('/game')) {
        return { name: 'landing', params: { locale: loc } };
    }

    const titleKey = (to.meta?.titleKey as string | undefined) ?? '';
    document.title = titleKey ? `${t(`page.${titleKey}`)} — ${t('app.brand')}` : t('app.brand');
});
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const LandingPage   = () => import('@/pages/LandingPage.vue');
const AppShell      = () => import('@/shared/AppShell.vue');
const DashboardPage = () => import('@/pages/DashboardPage.vue');
const MissionsPage  = () => import('@/pages/MissionsPage.vue');
const ArenaPage  = () => import('@/pages/ArenaPage.vue');
const CharacterPage  = () => import('@/pages/CharacterPage.vue');
const CraftingPage  = () => import('@/pages/CraftingPage.vue');
const DungeonsPage  = () => import('@/pages/DungeonsPage.vue');
const GatheringPage  = () => import('@/pages/GatheringPage.vue');
const GuildPage  = () => import('@/pages/GuildPage.vue');
const ProcessingPage  = () => import('@/pages/ProcessingPage.vue');
const ShopPage  = () => import('@/pages/ShopPage.vue');

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'landing', component: LandingPage },

        {
            path: '/game',
            component: AppShell,
            children: [
                { path: '', redirect: '/game/dashboard' },
                { path: 'dashboard', name: 'dashboard', component: DashboardPage, meta: { title: 'Dashboard' } },
                { path: 'missions',  name: 'missions',  component: MissionsPage,  meta: { title: 'Missions' } },
                { path: 'arena',  name: 'arena',  component: ArenaPage,  meta: { title: 'Arena' } },
                { path: 'character',  name: 'character',  component: CharacterPage,  meta: { title: 'Character' } },
                { path: 'crafting',  name: 'crafting',  component: CraftingPage,  meta: { title: 'Crafting' } },
                { path: 'dungeons',  name: 'dungeons',  component: DungeonsPage,  meta: { title: 'Dungeons' } },
                { path: 'gathering',  name: 'gathering',  component: GatheringPage,  meta: { title: 'Gathering' } },
                { path: 'guild',  name: 'guild',  component: GuildPage,  meta: { title: 'Guild' } },
                { path: 'processing',  name: 'processing',  component: ProcessingPage,  meta: { title: 'Processing' } },
                { path: 'shop',  name: 'shop',  component: ShopPage,  meta: { title: 'Shop' } },
            ],
        },

        { path: '/:pathMatch(.*)*', redirect: '/' },
    ],
});

router.beforeEach((to) => {
    const auth = useAuthStore();
    if (!auth.isAuthenticated && to.path.startsWith('/game')) return { name: 'landing' };
});

export default router;
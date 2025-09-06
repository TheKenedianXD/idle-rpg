import { useRoute } from 'vue-router';
export function useLocaleRoute() {
    const route = useRoute();
    return (to: any) => ({ ...to, params: { ...(to.params||{}), locale: route.params.locale } });
}

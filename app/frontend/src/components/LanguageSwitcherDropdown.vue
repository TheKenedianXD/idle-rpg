<template>
  <div class="relative">
    <button
        class="inline-flex items-center gap-2 rounded border border-zinc-700 px-2 py-1 text-sm hover:bg-zinc-800"
        :aria-expanded="open ? 'true' : 'false'"
        aria-haspopup="menu"
        @click="toggle"
    >
      <span>{{ currentLabel }}</span>
      <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M5.25 7.5l4.5 4.5 4.5-4.5" />
      </svg>
    </button>

    <div
        v-if="open"
        ref="menu"
        class="absolute right-0 z-50 mt-2 w-40 rounded border border-zinc-700 bg-zinc-900/95 p-1 shadow-lg backdrop-blur"
        role="menu"
    >
      <button
          v-for="loc in LOCALE_ORDER"
          :key="loc"
          class="flex w-full items-center justify-between rounded px-2 py-1.5 text-left text-sm hover:bg-zinc-800"
          :data-active="route.params.locale === loc"
          role="menuitem"
          @click="pick(loc)"
      >
        <span>{{ LOCALE_LABEL[loc] }}</span>
        <svg v-if="route.params.locale === loc" class="h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4A1 1 0 1 1 4.707 9.293L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z" clip-rule="evenodd"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { LOCALE_LABEL, LOCALE_ORDER, SUPPORTED, type Locale, storeLocale } from '@/i18n/detectors';
import { loadLocale } from '@/i18n';

const route = useRoute();
const router = useRouter();

const open = ref(false);
const menu = ref<HTMLElement | null>(null);

const currentLocale = computed<Locale>(() => {
  const p = (route.params.locale as string) || 'en';
  return (SUPPORTED.includes(p as Locale) ? p : 'en') as Locale;
});
const currentLabel = computed(() => LOCALE_LABEL[currentLocale.value]);

function toggle() { open.value = !open.value; }
async function pick(loc: Locale) {
  open.value = false;
  storeLocale(loc);
  await loadLocale(loc);
  await router.push({ name: route.name as string, params: { ...route.params, locale: loc }, query: route.query });
}

function onClickOutside(e: MouseEvent) {
  if (!open.value) return;
  const target = e.target as Node;
  if (menu.value && !menu.value.contains(target)) {
    const btn = (e.composedPath?.() || []).find(n => (n as HTMLElement)?.getAttribute?.('aria-haspopup') === 'menu');
    if (!btn) open.value = false;
  }
}

onMounted(() => document.addEventListener('click', onClickOutside));
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside));
</script>

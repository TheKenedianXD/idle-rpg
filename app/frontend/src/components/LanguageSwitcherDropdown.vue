<template>
  <div class="relative z-[9999999]">
    <button
        class="inline-flex items-center gap-2 rounded border border-zinc-700 px-2 py-1 text-sm hover:bg-zinc-800"
        :aria-expanded="open ? 'true' : 'false'"
        aria-haspopup="menu"
        @click="toggle"
    >
      <span>{{ currentLabel }}</span>
      <DropdownIcon class="inline-block w-[1.0em] h-[1.0em]" aria-hidden="true"/>
    </button>

    <div
        v-if="open"
        ref="menu"
        class="absolute right-0 z-50 mt-2 w-40 rounded border border-zinc-700
         bg-zinc-950 shadow-lg isolate mix-blend-normal"
        role="menu"
    >
      <button
          v-for="loc in LOCALE_ORDER"
          :key="loc"
          class="flex w-full items-center justify-between rounded px-2 py-1.5
           text-left text-sm bg-transparent hover:bg-zinc-800"
          :data-active="route.params.locale === loc"
          role="menuitem"
          @click="pick(loc)"
      >
        <span>{{ LOCALE_LABEL[loc] }}</span>
          <CheckmarkIcon v-if="route.params.locale === loc" class="inline-block w-[1.0em] h-[1.0em]" aria-hidden="true"/>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { LOCALE_LABEL, LOCALE_ORDER, SUPPORTED, type Locale, storeLocale } from '@/i18n/detectors';
import { loadLocale } from '@/i18n';

import CheckmarkIcon from '@/assets/icons/ui/checkmark.svg'
import DropdownIcon from '@/assets/icons/ui/dropdown.svg'

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

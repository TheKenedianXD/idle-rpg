<template>
  <div
      v-if="open"
      class="fixed inset-0 bg-black/60 z-40 grid place-items-center p-4"
      @click.self="$emit('close')"
  >
    <div class="w-full max-w-sm rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-4">
      <header class="flex justify-between items-center">
        <h3 class="text-lg font-semibold">{{$t("common.settings")}}</h3>
        <button class="text-zinc-400 hover:text-white" @click="$emit('close')">✕</button>
      </header>

      <label class="flex items-center gap-2 text-sm text-zinc-300">
        <input type="checkbox" v-model="settings.compareItems" class="accent-indigo-500">
        {{$t("ui.enableItemComparison")}}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings';
const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{ (e: 'close'): void }>();

const settings = useSettingsStore();
</script>

<template>
  <li class="flex flex-col sm:flex-row sm:justify-between sm:items-center rounded border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm">
    <span>
      <component :is="iconComp" class="inline-block w-[1.3em] h-[1.3em]" aria-hidden="true"/>
      {{ $t(entry.textKey, entry.textParams) }}
    </span>
    <span class="text-zinc-500 text-right sm:ml-4">{{ entry.time }}</span>
  </li>
</template>

<script setup lang="ts">
import type { ActivityLogEntry } from '@/types/dashboard';
import PickaxeIcon from '@/assets/icons/menu/pickaxe.svg';
import TiedScrollIcon from '@/assets/icons/menu/tied-scroll.svg';
import SwordClashIcon from '@/assets/icons/menu/sword-clash.svg';
import {computed} from "vue";

const props = defineProps<{ entry: ActivityLogEntry }>();

const iconComp = computed(()=>{
  switch (props.entry.icon) {
    case 'pickaxe': return PickaxeIcon;
    case 'scroll':  return TiedScrollIcon;
    case 'sword':   return SwordClashIcon;
    default:        return TiedScrollIcon;
  }
});
</script>

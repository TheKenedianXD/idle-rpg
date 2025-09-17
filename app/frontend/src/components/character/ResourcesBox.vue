<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCharacterStore } from '@/stores/character';
import ResourceRow from '@/components/character/ResourceRow.vue';
import TwoCoinsIcon from "@/assets/icons/resources/two-coins.svg";
import SoulIcon from "@/assets/icons/resources/soul.svg";

const store = useCharacterStore();
const { essence, gold } = storeToRefs(store);
</script>

<template>
  <div class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
    <h3 class="text-lg font-semibold mb-3">{{$t("Resources")}}</h3>
    <dl class="space-y-2">
      <ResourceRow :label="$t('Gold')" :value="gold">
        <template #icon><TwoCoinsIcon class="w-[1.2em] h-[1.2em] text-yellow-500" aria-hidden="true"/></template>
      </ResourceRow>
      <ResourceRow :label="$t('Essence')" :value="essence">
        <template #icon><SoulIcon class="w-[1.2em] h-[1.2em] text-cyan-500" aria-hidden="true"/></template>
      </ResourceRow>
    </dl>
  </div>
</template>

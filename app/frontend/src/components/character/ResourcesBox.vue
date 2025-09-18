<template>
  <div class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
    <h3 class="text-lg font-semibold mb-3">{{$t("common.resources")}}</h3>
    <dl class="space-y-2">
      <ResourceRow v-if="!hideGold" :label="$t('currencies.gold')" :value="gold">
        <template #icon>
          <TwoCoinsIcon class="w-[1.2em] h-[1.2em] text-yellow-500" aria-hidden="true"/>
        </template>
      </ResourceRow>

      <ResourceRow v-if="!hideEssence" :label="$t('currencies.essence')" :value="essence">
        <template #icon>
          <SoulIcon class="w-[1.2em] h-[1.2em] text-cyan-500" aria-hidden="true"/>
        </template>
      </ResourceRow>

      <ResourceRow v-if="!hideFame" :label="$t('common.fame')" :value="fame">
        <template #icon>
          <DeathJuiceIcon class="w-[1.2em] h-[1.2em] text-red-500" aria-hidden="true"/>
        </template>
      </ResourceRow>
    </dl>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCharacterStore } from '@/stores/character';
import ResourceRow from '@/components/character/ResourceRow.vue';
import TwoCoinsIcon from "@/assets/icons/resources/two-coins.svg";
import SoulIcon from "@/assets/icons/resources/soul.svg";
import DeathJuiceIcon from "@/assets/icons/resources/death-juice.svg";

const store = useCharacterStore();
const { essence, gold, fame } = storeToRefs(store);

defineProps<{
  hideGold?: boolean;
  hideEssence?: boolean;
  hideFame?: boolean;
}>();
</script>
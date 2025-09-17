<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCharacterStore } from '@/stores/character';
import StatRow from '@/components/character/StatRow.vue';
import { computed } from "vue";

const store = useCharacterStore();
const { stats } = storeToRefs(store);

const totals = computed(() => store.totalStats);
const bonus = computed(() => ({
  strength: totals.value.strength - stats.value.strength,
  agility: totals.value.agility - stats.value.agility,
  endurance: totals.value.endurance - stats.value.endurance,
}));

const cost = (k: keyof typeof store.stats) => store.statUpgradeCost(k);
const upgrade = (k: keyof typeof store.stats) => store.tryUpgradeStat(k);
</script>

<template>
  <div class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
    <h3 class="text-lg font-semibold mb-3">{{ $t("CharacterStats") }}</h3>
    <dl class="space-y-2">

      <StatRow
          :label="$t('Strength')"
          :total="totals.strength"
          :bonus="bonus.strength"
          :cost="cost('strength')"
          @upgrade="upgrade('strength')"
      >
        <template #tooltip-description>
          <p>{{ $t("StrengthTooltipDesc") }}</p>
        </template>
        <template #tooltip-stats>
          <li>{{ $t("AttackPower") }}: {{ store.derivedStats.attackPower }}</li>
        </template>
      </StatRow>

      <StatRow
          :label="$t('Agility')"
          :total="totals.agility"
          :bonus="bonus.agility"
          :cost="cost('agility')"
          @upgrade="upgrade('agility')"
      >
        <template #tooltip-description>
          <p>{{ $t("AgilityTooltipDesc") }}</p>
        </template>
        <template #tooltip-stats>
          <li>{{ $t("CritChance") }}: {{ store.derivedStats.critChance }}%</li>
          <li>{{ $t("AttackDelay") }}: {{ store.derivedStats.attackDelay }}s</li>
          <li>{{ $t("CritDamage") }}: {{ store.derivedStats.critDamage }}%</li>
        </template>
      </StatRow>

      <StatRow
          :label="$t('Endurance')"
          :total="totals.endurance"
          :bonus="bonus.endurance"
          :cost="cost('endurance')"
          @upgrade="upgrade('endurance')"
      >
        <template #tooltip-description>
          <p>{{ $t("EnduranceTooltipDesc") }}</p>
        </template>
        <template #tooltip-stats>
          <li>{{ $t("MaxHealth") }}: {{ store.derivedStats.maxHealth }}</li>
          <li>{{ $t("BlockChance") }}: {{ store.derivedStats.blockChance }}%</li>
        </template>
      </StatRow>

    </dl>
  </div>
</template>

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
    <h3 class="text-lg font-semibold mb-3">{{ $t("ui.characterAttributes") }}</h3>
    <dl class="space-y-2">

      <StatRow
          :label="$t('stats.weapon')"
          :total="`~${store.weaponDamage.combinedAvg.toFixed(0)}`"
          :upgradable="false"
      >
        <template #suffix>
          <div class="flex flex-col gap-0.5 text-right">
      <span v-if="store.weaponDamage.mainHand">
        {{ store.weaponDamage.mainHand.min }}–{{ store.weaponDamage.mainHand.max }}
        <span class="text-zinc-400">
          ({{ store.weaponDamage.mainHand.attackSpeed }}s)
        </span>
      </span>
            <span v-if="store.weaponDamage.offHand">
        {{ store.weaponDamage.offHand.min }}–{{ store.weaponDamage.offHand.max }}
        <span class="text-zinc-400">
          ({{ store.weaponDamage.offHand.attackSpeed }}s)
        </span>
      </span>
          </div>
        </template>

        <template #tooltip-description>
          <p>{{ $t("stats.weaponTooltipDesc") }}</p>
        </template>
      </StatRow>


      <StatRow
          :label="$t('stats.armor')"
          :total="store.totalArmor"
          :upgradable="false"
      >
        <template #suffix>
          {{ store.derivedStats.damageReduction }}%
        </template>
        <template #tooltip-description>
          <p>{{ $t("stats.armorTooltipDesc") }}</p>
        </template>
      </StatRow>

      <div class="border-t border-zinc-800 my-2"></div>

      <StatRow
          :label="$t('stats.strength')"
          :total="totals.strength"
          :bonus="bonus.strength"
          :cost="cost('strength')"
          @upgrade="upgrade('strength')"
          :upgradable="true"
      >
        <template #tooltip-description>
          <p>{{ $t("stats.strengthTooltipDesc") }}</p>
        </template>
        <template #tooltip-stats>
          <li>{{ $t("stats.attackPower") }}: {{ store.derivedStats.attackPower }}</li>
        </template>
      </StatRow>

      <StatRow
          :label="$t('stats.agility')"
          :total="totals.agility"
          :bonus="bonus.agility"
          :cost="cost('agility')"
          @upgrade="upgrade('agility')"
          :upgradable="true"
      >
        <template #tooltip-description>
          <p>{{ $t("stats.agilityTooltipDesc") }}</p>
        </template>
        <template #tooltip-stats>
          <li>{{ $t("stats.criticalChance") }}: {{ store.derivedStats.critChance }}%</li>
          <li>{{ $t("stats.attackSpeed") }}: {{ store.derivedStats.attackSpeed }}%</li>
          <li>{{ $t("stats.criticalDamage") }}: {{ store.derivedStats.critDamage }}%</li>
        </template>
      </StatRow>

      <StatRow
          :label="$t('stats.endurance')"
          :total="totals.endurance"
          :bonus="bonus.endurance"
          :cost="cost('endurance')"
          @upgrade="upgrade('endurance')"
          :upgradable="true"
      >
        <template #tooltip-description>
          <p>{{ $t("stats.enduranceTooltipDesc") }}</p>
        </template>
        <template #tooltip-stats>
          <li>{{ $t("stats.maxHealth") }}: {{ store.derivedStats.maxHealth }}</li>
          <li>{{ $t("stats.blockChance") }}: {{ store.derivedStats.blockChance }}%</li>
        </template>
      </StatRow>

    </dl>
  </div>
</template>

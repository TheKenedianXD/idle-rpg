<template>
  <section class="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
    <header class="flex flex-col items-start mb-3 gap-1 lg:flex-row lg:items-start lg:justify-between">
      <h2 class="text-xl font-semibold">{{ name }}</h2>
      <div class="flex flex-col items-start text-left lg:items-end lg:text-right">
        <span class="text-zinc-400">{{$t("common.level")}} {{ level }}</span>
        <span class="text-zinc-500 text-sm">{{$t("stats.rebirth")}} {{ rebirth }}</span>
      </div>
    </header>

    <div class="space-y-2">
      <span class="text-sm font-medium text-violet-500 flex items-center gap-1">
        <StarIcon class="inline-block w-[1.2em] h-[1.2em]" aria-hidden="true"/> {{$t("common.experience")}}
      </span>
      <ProgressBar :min="0" :max="xp.required" :value="xp.current" color-class="bg-violet-500"/>
    </div>

    <div class="mt-4 grid grid-cols-3 text-zinc-300 gap-2">
      <div class="text-center">
        <div class="text-sm text-yellow-500 flex items-center justify-center gap-1">
          <TwoCoinsIcon class="w-[1.2em] h-[1.2em]" aria-hidden="true"/> {{$t("currencies.gold")}}
        </div>
        <div>{{ gold.toLocaleString() }}</div>
      </div>
      <div class="text-center">
        <div class="text-sm text-cyan-500 flex items-center justify-center gap-1">
          <SoulIcon class="w-[1.2em] h-[1.2em]" aria-hidden="true"/> {{$t("currencies.essence")}}
        </div>
        <div>{{ essence.toLocaleString() }}</div>
      </div>
      <div class="text-center">
        <div class="text-sm text-red-500 flex items-center justify-center gap-1">
          <DeathJuiceIcon class="w-[1.2em] h-[1.2em]" aria-hidden="true"/> {{$t("common.fame")}}
        </div>
        <div>{{ fame.toLocaleString() }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCharacterStore } from '@/stores/character';

import ProgressBar from '@/components/ui/ProgressBar.vue';
import TwoCoinsIcon from '@/assets/icons/resources/two-coins.svg';
import SoulIcon from '@/assets/icons/resources/soul.svg';
import DeathJuiceIcon from '@/assets/icons/resources/death-juice.svg';
import StarIcon from '@/assets/icons/resources/star.svg';

const store = useCharacterStore();
const { name, level, rebirth, xp, gold, essence, fame } = storeToRefs(store);
</script>

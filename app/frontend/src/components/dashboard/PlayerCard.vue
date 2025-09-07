<template>
  <section class="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
    <header class="flex flex-col items-start mb-3 gap-1 lg:flex-row lg:items-start lg:justify-between">
      <h2 class="text-xl font-semibold">{{ player.nickname }}</h2>
      <div class="flex flex-col items-start text-left lg:items-end lg:text-right">
        <span class="text-zinc-400">{{$t("Level")}} {{ player.level }}</span>
        <span class="text-zinc-500 text-sm">Ascend {{ player.ascend }}</span>
      </div>
    </header>

    <div class="space-y-2">
      <span class="text-sm font-medium text-violet-500">
        <StarIcon class="inline-block w-[1.2em] h-[1.2em]" aria-hidden="true"/> {{$t("Experience")}}
      </span>
      <ProgressBar :min="0" :max="player.xp.required" :value="player.xp.current" color-class="bg-violet-500"/>
    </div>

    <div class="mt-4 flex text-zinc-300">
      <div class="flex-1 text-center">
        <div class="text-sm text-yellow-500">
          <TwoCoinsIcon class="inline-block w-[1.5em] h-[1.5em]" aria-hidden="true"/> {{$t("Gold")}}
        </div>
        <div>{{ player.gold.toLocaleString() }}</div>
      </div>
      <div class="flex-1 text-center">
        <div class="text-sm text-cyan-500">
          <SoulIcon class="inline-block w-[1.5em] h-[1.5em]" aria-hidden="true"/> {{$t("Essence")}}
        </div>
        <div>{{ player.essence.toLocaleString() }}</div>
      </div>
      <div class="flex-1 text-center">
        <div class="text-sm text-red-500">
          <DeathJuiceIcon class="inline-block w-[1.5em] h-[1.5em]" aria-hidden="true"/> {{$t("Fame")}}
        </div>
        <div>{{ player.fame.toLocaleString() }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PlayerSummary } from '@/types/dashboard';
import ProgressBar from '@/components/ui/ProgressBar.vue';
import TwoCoinsIcon from '@/assets/icons/resources/two-coins.svg';
import SoulIcon from '@/assets/icons/resources/soul.svg';
import DeathJuiceIcon from '@/assets/icons/resources/death-juice.svg';
import StarIcon from '@/assets/icons/resources/star.svg';

defineProps<{ player: PlayerSummary }>();
</script>

<template>
  <section class="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
    <h2 class="text-2xl font-semibold mb-3">{{$t("CurrentActivity")}}</h2>

    <div class="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
      <div class="flex items-center justify-between">
        <div>
          <span>
            <TiedScrollIcon class="inline-block w-[1.3em] h-[1.3em]" aria-hidden="true"/>
            {{ $t(activity.type === 'mission' ? 'Mission' : 'Activity') }}:
          </span>
          <span class="text-zinc-300"> {{ $t(activity.nameI18nKey) }}</span>
        </div>
        <div class="flex items-center gap-2 text-zinc-300">
          <span>
            <TimeIcon class="inline-block w-[1.2em] h-[1.2em]" aria-hidden="true"/>
            {{ remaining }}
          </span>
        </div>
      </div>

      <div class="mt-4">
        <div class="text-sm text-zinc-500 mb-1">{{$t("Progress")}}</div>
        <ProgressBar
            class="mt-2"
            :min="0"
            :max="activity.durationSec"
            :value="activity.remainingSec ? (activity.durationSec - activity.remainingSec) : activity.progress"
            :show-label="false" :show-min-max="false" :show-value="false"
            color-class="bg-amber-500"/>
      </div>

      <div class="mt-4">
        <div class="text-sm text-zinc-500 mb-1">{{$t("Reward")}}</div>
        <div class="flex items-center gap-3 text-zinc-300 flex-wrap">
          <template v-for="(r, i) in activity.rewards" :key="i">
            <span v-if="r.kind==='gold'"
                  class="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-1 text-sm text-yellow-500">
              <TwoCoinsIcon class="inline-block w-[1.5em] h-[1.5em]" aria-hidden="true"/> {{ r.amount }}
            </span>
            <span v-else-if="r.kind==='xp'"
                  class="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-1 text-sm text-violet-500">
              <StarIcon class="inline-block w-[1.5em] h-[1.5em]" aria-hidden="true"/> {{ r.amount }}
            </span>
            <span v-else-if="r.kind==='essence'"
                  class="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-1 text-sm text-cyan-500">
              <SoulIcon class="inline-block w-[1.5em] h-[1.5em]" aria-hidden="true"/> {{ r.amount }}
            </span>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { CurrentActivity } from '@/types/dashboard';
import ProgressBar from '@/components/ui/ProgressBar.vue';
import TwoCoinsIcon from '@/assets/icons/resources/two-coins.svg';
import SoulIcon from '@/assets/icons/resources/soul.svg';
import StarIcon from '@/assets/icons/resources/star.svg';
import TimeIcon from '@/assets/icons/resources/time.svg';
import TiedScrollIcon from '@/assets/icons/menu/tied-scroll.svg';
import {computed} from "vue";

const props = defineProps<{ activity: CurrentActivity }>();

const remaining = computed(() => {
  const sec = props.activity.remainingSec ?? 0;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
});
</script>

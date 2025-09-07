<template>
  <div class="space-y-2">
    <div class="flex items-center justify-between text-sm">
      <div class="flex items-center gap-2">
        <slot name="icon"/>
        <span>{{ $t(quest.titleKey, quest.titleParams ?? {}) }}</span>
      </div>
      <div class="inline-flex items-center gap-2">
        <template v-for="(r, i) in quest.rewards" :key="i">
          <span v-if="r.kind==='gold'" class="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-1 text-sm text-yellow-500">
            <TwoCoinsIcon class="inline-block w-[1.5em] h-[1.5em]" aria-hidden="true"/> {{ r.amount }}
          </span>
          <span v-else-if="r.kind==='xp'" class="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-1 text-sm text-violet-500">
            <StarIcon class="inline-block w-[1.5em] h-[1.5em]" aria-hidden="true"/> {{ r.amount }}
          </span>
        </template>
      </div>
    </div>

    <ProgressBar v-if="showProgress"
                 :min="0" :max="quest.goal" :value="quest.progress" />
  </div>
</template>

<script setup lang="ts">
import type { Quest } from '@/types/dashboard';
import ProgressBar from '@/components/ui/ProgressBar.vue';
import TwoCoinsIcon from '@/assets/icons/resources/two-coins.svg';
import StarIcon from '@/assets/icons/resources/star.svg';

defineProps<{ quest: Quest; showProgress?: boolean }>();
defineEmits<{ (e:'open', id:string):void }>();
</script>

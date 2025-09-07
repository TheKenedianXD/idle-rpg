<template>
  <aside class="lg:w-[380px] rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
    <header class="mb-4 flex items-center justify-between">
      <h2 class="text-2xl font-semibold">{{$t("Quests")}}</h2>

      <div class="flex items-center gap-2">
        <button class="px-2 py-1 rounded border border-zinc-800 text-sm hover:bg-zinc-800/60"
                @click="$emit('refresh')"
                :disabled="loading">
          {{$t("Refresh")}}
        </button>

        <button class="px-2 py-1 rounded border border-green-800 text-sm hover:bg-green-800/60"
                @click="$emit('claim-all')"
                :disabled="!canClaimAny || loading">
          {{$t("ClaimRewards")}}
        </button>
      </div>
    </header>

    <div v-if="showTabs" class="mb-4 flex gap-2 text-sm">
      <button
          v-for="t in tabs" :key="t.key"
          class="px-3 py-1 rounded border border-zinc-800"
          :class="t.key===activeTab ? 'bg-zinc-800/60' : 'hover:bg-zinc-800/40'"
          @click="$emit('update:activeTab', t.key)"
      >
        {{ $t(t.label) }}
      </button>
    </div>

    <Loader :loading="loading ?? false" />

    <template v-if="!loading">
      <div class="space-y-6">
        <section v-if="daily.length">
          <div class="mb-2 font-medium text-zinc-300 flex items-center justify-between">
            <span>{{$t("DailyQuests")}}</span>
            <span class="text-xs text-zinc-500">
              {{ completedCount(daily) }} / {{ daily.length }}
            </span>
          </div>
          <QuestList
              :quests="daily"
              :show-progress="true"
              icon="scroll"
              @open="$emit('open', $event)"
              @claim="$emit('claim', $event)"
              @track="$emit('track', $event)"
          />
        </section>

        <section v-if="beginners.length">
          <div class="mb-2 font-medium text-zinc-300 flex items-center justify-between">
            <span>{{$t("BeginnersQuests")}}</span>
            <span class="text-xs text-zinc-500">
              {{ completedCount(beginners) }} / {{ beginners.length }}
            </span>
          </div>
          <QuestList
              :quests="beginners"
              :show-progress="true"
              icon="auto"
          @open="$emit('open', $event)"
          @claim="$emit('claim', $event)"
          @track="$emit('track', $event)"
          />
        </section>
      </div>
    </template>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import QuestList from './QuestList.vue';
import type { Quest } from '@/types/dashboard';
import Loader from "@/components/ui/Loader.vue";

const props = defineProps<{
  quests: Quest[];
  loading?: boolean;
  showTabs?: boolean;
  activeTab?: string;
}>();

/*
const emit = defineEmits<{
  (e:'refresh'): void;
  (e:'claim-all'): void;
  (e:'open', questId: string): void;
  (e:'claim', questId: string): void;
  (e:'track', questId: string): void;
  (e:'update:activeTab', key: string): void;
}>();
*/

const daily = computed(()=> props.quests.filter(q => q.kind==='daily'));
const beginners = computed(()=> props.quests.filter(q => q.kind==='beginner'));

const canClaimAny = computed(() =>
    props.quests.some(q => q.progress >= q.goal)
);

function completedCount(list: Quest[]) {
  return list.filter(q => q.progress >= q.goal).length;
}

// volitelné záložky – kdybys chtěl filtrovat třeba Daily/Beginner/All/Completed
const tabs = [
  { key:'all',       label:'All' },
  { key:'daily',     label:'DailyQuests' },
  { key:'beginner',  label:'BeginnersQuests' },
  { key:'completed', label:'Completed' },
];
</script>

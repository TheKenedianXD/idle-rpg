<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-6 lg:flex-row">
      <div class="flex-1 flex flex-col gap-6">
        <PlayerCard :player="player" />
        <CurrentActivityCard :activity="currentActivity" />
      </div>

      <QuestPanel
          class="lg:w-[380px]"
          :quests="quests"
          :loading="loadingQuests"
          @refresh="fetchQuests"
          @claim-all="claimAll"
          @open="openQuest"
          @claim="claimQuest"
          @track="trackQuest"
      />
    </div>

    <ActivityLog :entries="logEntries" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type {
  PlayerSummary,
  CurrentActivity,
  Quest,
  ActivityLogEntry,
} from '@/types/dashboard';

import PlayerCard from '@/components/dashboard/PlayerCard.vue';
import CurrentActivityCard from '@/components/dashboard/CurrentActivityCard.vue';
import QuestPanel from '@/components/dashboard/QuestPanel.vue';
import ActivityLog from '@/components/dashboard/ActivityLog.vue';

const player = ref<PlayerSummary>({
  nickname: 'JohnnyMachete',
  level: 107,
  ascend: 1,
  gold: 2391,
  essence: 23,
  fame: 7254,
  xp: { current: 284_524, required: 360_540 },
});

const currentActivity = ref<CurrentActivity>({
  type: 'mission',
  nameI18nKey: 'ScoutTheForest',
  durationSec: 1800,
  remainingSec: 1491,
  progress: 309,
  rewards: [
    { kind: 'gold', amount: 5 },
    { kind: 'xp', amount: 15 },
  ],
});

const loadingQuests = ref(false);

const quests = ref<Quest[]>([
  {
    id: 'q1',
    kind: 'daily',
    titleKey: 'CompleteXMissions',
    titleParams: { count: 5 },
    progress: 3,
    goal: 4,
    rewards: [{ kind: 'gold', amount: 100 }],
  },
  {
    id: 'q2',
    kind: 'daily',
    titleKey: 'WinXPvPBattles',
    titleParams: { count: 1 },
    progress: 0,
    goal: 1,
    rewards: [{ kind: 'xp', amount: 75 }],
  },
  {
    id: 'q3',
    kind: 'beginner',
    titleKey: 'VisitTheShop',
    progress: 0,
    goal: 1,
    rewards: [{ kind: 'gold', amount: 5 }],
  },
  {
    id: 'q4',
    kind: 'beginner',
    titleKey: 'ToGather',
    titleParams: { count: 5, itemKey: 'OakWood' },
    progress: 3,
    goal: 5,
    rewards: [{ kind: 'gold', amount: 35 }],
  },
  {
    id: 'q5',
    kind: 'beginner',
    titleKey: 'UpgradeYourWeapon',
    progress: 0,
    goal: 1,
    rewards: [
      { kind: 'gold', amount: 5 },
      { kind: 'xp', amount: 5 },
    ],
  },
]);

const logEntries = ref<ActivityLogEntry[]>([
  {
    id: 'a1',
    time: '14:14:33',
    icon: 'pickaxe',
    textKey: 'YouGathered',
    textParams: { count: 5, item: 'IronOre' },
  },
  {
    id: 'a2',
    time: '11:37:24',
    icon: 'sword',
    textKey: 'YouWonPvPMatchAgainst',
    textParams: { opponent: 'EidamWaiter' },
  },
  {
    id: 'a3',
    time: '09:38:42',
    icon: 'scroll',
    textKey: 'YouCompletedMission',
    textParams: { mission: 'SearchTheCave' },
  },
  {
    id: 'a4',
    time: '00:57:11',
    icon: 'sword',
    textKey: 'YouLostPvPMatchAgainst',
    textParams: { opponent: 'DarthSnoob47' },
  },
]);

function fetchQuests() {
  loadingQuests.value = true;
  // TODO: await store.fetchQuests()
  setTimeout(() => (loadingQuests.value = false), 600);
}
function claimAll() {
  // TODO: store.claimAll()
  console.log('claim all');
}
function openQuest(id: string) {
  // TODO: router push / modal
  console.log('open quest', id);
}
function claimQuest(id: string) {
  // TODO: store.claim(id)
  console.log('claim quest', id);
}
function trackQuest(id: string) {
  // TODO: store.track(id)
  console.log('track quest', id);
}
</script>
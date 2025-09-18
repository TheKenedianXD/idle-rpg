<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-6 lg:flex-row">
      <div class="flex-1 flex flex-col gap-6">
        <PlayerCard />
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
  CurrentActivity,
  Quest,
  ActivityLogEntry,
} from '@/types/dashboard';

import PlayerCard from '@/components/dashboard/PlayerCard.vue';
import CurrentActivityCard from '@/components/dashboard/CurrentActivityCard.vue';
import QuestPanel from '@/components/dashboard/QuestPanel.vue';
import ActivityLog from '@/components/dashboard/ActivityLog.vue';

const currentActivity = ref<CurrentActivity>({
  type: 'mission',
  nameI18nKey: 'missions.scoutTheForest',
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
    titleKey: 'quests.completeMissions',
    titleParams: { count: 5 },
    progress: 3,
    goal: 4,
    rewards: [{ kind: 'gold', amount: 100 }],
  },
  {
    id: 'q2',
    kind: 'daily',
    titleKey: 'quests.winPvPBattles',
    titleParams: { count: 1 },
    progress: 0,
    goal: 1,
    rewards: [{ kind: 'xp', amount: 75 }],
  },
  {
    id: 'q3',
    kind: 'beginner',
    titleKey: 'quests.visitShop',
    progress: 0,
    goal: 1,
    rewards: [{ kind: 'gold', amount: 5 }],
  },
  {
    id: 'q4',
    kind: 'beginner',
    titleKey: 'quests.gatherItems',
    titleParams: { count: 5, itemKey: 'items.oakWood' },
    progress: 3,
    goal: 5,
    rewards: [{ kind: 'gold', amount: 35 }],
  },
  {
    id: 'q5',
    kind: 'beginner',
    titleKey: 'quests.upgradeWeapon',
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
    textKey: 'activity.gathered',
    textParams: { count: 5, item: 'items.ironOre' },
  },
  {
    id: 'a2',
    time: '11:37:24',
    icon: 'sword',
    textKey: 'activity.wonPvP',
    textParams: { opponent: 'EidamWaiter' },
  },
  {
    id: 'a3',
    time: '09:38:42',
    icon: 'scroll',
    textKey: 'activity.completedMission',
    textParams: { mission: 'missions.searchTheCave' },
  },
  {
    id: 'a4',
    time: '00:57:11',
    icon: 'sword',
    textKey: 'activity.lostPvP',
    textParams: { opponent: 'DarthSnoob47' },
  },
]);

function fetchQuests() {
  loadingQuests.value = true;
  setTimeout(() => (loadingQuests.value = false), 600);
}
function claimAll() {
  console.log('claim all');
}
function openQuest(id: string) {
  console.log('open quest', id);
}
function claimQuest(id: string) {
  console.log('claim quest', id);
}
function trackQuest(id: string) {
  console.log('track quest', id);
}
</script>

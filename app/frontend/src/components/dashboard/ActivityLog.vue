<template>
  <section class="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
    <h2 class="text-2xl font-semibold mb-3">{{$t("ActivityLog")}}</h2>
    <ul class="space-y-2 text-zinc-200">
      <ActivityLogItem v-for="e in entries" :key="e.id" :entry="e"/>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { ActivityLogEntry } from '@/types/dashboard';
import ActivityLogItem from './ActivityLogItem.vue';
defineProps<{ entries: ActivityLogEntry[] }>();
</script>

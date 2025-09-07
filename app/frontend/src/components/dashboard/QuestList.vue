<template>
  <div class="space-y-4">
    <QuestListItem
        v-for="q in quests"
        :key="q.id"
        :quest="q"
        :show-progress="showProgress ?? q.goal > 1"
        :icon="icon"
        @open="$emit('open', q.id)"
        @claim="$emit('claim', q.id)"
        @track="$emit('track', q.id)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Quest } from '@/types/dashboard';
import QuestListItem from './QuestListItem.vue';

defineProps<{
  quests: Quest[];
  showProgress?: boolean;
  icon?: 'scroll' | 'auto' | 'shop' | 'pickaxe' | 'character';
}>();

defineEmits<{
  (e:'open', id:string): void;
  (e:'claim', id:string): void;
  (e:'track', id:string): void;
}>();
</script>

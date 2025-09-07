<template>
  <div v-if="loading" class="space-y-3">
    <div class="h-5 rounded bg-zinc-800/60 animate-pulse"></div>
    <div class="h-5 rounded bg-zinc-800/60 animate-pulse"></div>
    <div class="h-5 rounded bg-zinc-800/60 animate-pulse"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  loading: boolean
}>();
</script>

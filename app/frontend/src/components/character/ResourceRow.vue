<template>
  <div class="flex items-center justify-between gap-3">
    <dt class="text-zinc-300 flex items-center gap-2">
      <slot name="icon" />
      {{ label }}
    </dt>
    <dd>
      <strong class="text-l text-zinc-300">{{ value }}</strong>
    </dd>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; value: number }>();
</script>

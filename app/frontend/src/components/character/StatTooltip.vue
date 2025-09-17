<template>
  <div class="relative inline-block">
    <span class="cursor-pointer text-zinc-400 hover:text-white" @click="show = !show">?</span>
    <div
        v-if="show"
        class="absolute z-50 bg-zinc-800 text-xs text-white p-2 rounded shadow-lg w-56 mt-1"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const show = ref(false);
</script>

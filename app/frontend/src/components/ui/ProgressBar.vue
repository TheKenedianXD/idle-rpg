<template>
  <div
      class="w-full"
      role="progressbar"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-valuenow="value"
  >
    <!-- bar -->
    <div :class="['relative w-full overflow-hidden', height, rounded, backgroundClass]">
      <div class="h-full transition-[width] duration-300 ease-out will-change-[width]" :class="colorClass" :style="fillStyle"/>
      <div v-if="showValue" class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span class="w-full text-center text-sm leading-none font-medium text-zinc-200 tabular-nums select-none">
          {{ formatNumber(value) }}
        </span>
      </div>
    </div>

    <div v-if="showMinMax || showLabel" class="relative mt-1 text-xs tabular-nums">
      <div class="flex justify-between text-zinc-400">
        <span v-if="showMinMax">{{ formatNumber(min) }}</span>
        <span v-if="showMinMax">{{ formatNumber(max) }}</span>
      </div>
      <div v-if="showLabel" class="absolute left-1/2 top-0 -translate-x-1/2 text-center text-zinc-400 pointer-events-none whitespace-nowrap">
        {{ Math.round(percent) }}%
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, required: true },
  max:   { type: Number, required: true },
  min:   { type: Number, default: 0 },

  height:          { type: String, default: 'h-5' },
  rounded:         { type: String, default: 'rounded' },
  colorClass:      { type: String, default: 'bg-green-500' },
  backgroundClass: { type: String, default: 'bg-zinc-800' },

  showLabel:  { type: Boolean, default: true },  // procenta pod barem
  showMinMax: { type: Boolean, default: true },  // min/max pod barem
  showValue:  { type: Boolean, default: true },  // číslo na baru
})

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('cs-CZ').format(num)
}

const percent = computed(() => {
  const range = Math.max(props.max - props.min, 1e-9)
  const clamped = Math.min(Math.max(props.value, props.min), props.max)
  return ((clamped - props.min) / range) * 100
})

const fillStyle = computed(() => ({
  width: `${percent.value}%`,
  borderTopLeftRadius: 'inherit',
  borderBottomLeftRadius: 'inherit',
}))
</script>

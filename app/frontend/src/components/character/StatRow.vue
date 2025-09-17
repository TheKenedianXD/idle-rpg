<template>
  <div class="flex items-center justify-between p-1 relative">
    <div class="flex items-center gap-2">
      <dt class="text-zinc-300 flex items-center gap-1">
        {{ label }}
        <button
            type="button"
            class="text-zinc-400 hover:text-white text-xs rounded-full border border-zinc-600 w-4 h-4 flex items-center justify-center"
            @click="toggleTooltip"
            @mouseenter="isDesktop && (show = true)"
            @mouseleave="isDesktop && (show = false)"
        >?</button>
      </dt>
      <strong>
        {{ total }}
        <span v-if="bonus && bonus > 0" class="text-emerald-400 text-xs align-middle">
          (+{{ bonus }})
        </span>
      </strong>
    </div>

    <div class="flex items-center gap-2">
      <span class="inline-flex items-center gap-1">
        <SoulIcon class="w-[1.2em] h-[1.2em] text-cyan-500"/>
        <span>{{ cost }}</span>
      </span>
      <button
          class="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-xs sm:text-sm cursor-pointer
                 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-800"
          @click="$emit('upgrade')"
          :disabled="!canAfford"
      >
        +
      </button>
    </div>

    <!-- tooltip -->
    <div
        v-if="show"
        class="absolute left-0 bottom-full mb-1 z-50 w-56 text-xs bg-zinc-800
               text-zinc-200 p-2 rounded-md border border-zinc-700 shadow-lg"
    >
      <slot name="tooltip-description"/>
      <ul class="mt-1 space-y-0.5">
        <slot name="tooltip-stats"/>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import SoulIcon from "@/assets/icons/resources/soul.svg";
import { useCharacterStore } from "@/stores/character";

const props = defineProps<{ label: string; total: number; bonus?: number; cost: number }>();
defineEmits(['upgrade']);

const store = useCharacterStore();
const canAfford = computed(() => store.essence >= props.cost);

const show = ref(false);
const isDesktop = window.matchMedia("(hover: hover)").matches;

function toggleTooltip() {
  // Na desktopu řeší hover → klik ignorujeme
  if (!isDesktop) show.value = !show.value;
}
</script>

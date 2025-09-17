<template>
  <div class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 h-full flex flex-col">
    <h3 class="text-xl font-semibold mb-3">{{$t("Inventory")}}</h3>

    <div class="overflow-auto pr-1 grow overscroll-contain nice-scroll"
         :style="{ maxHeight: `calc(100vh - 200px)` }">

      <div class="mx-auto"
           :style="{
             '--slot': slotSize,
             '--cap': captionHeight,
             '--gap': gap,
             '--maxcols': maxCols,
             width: `min(100%, calc(var(--maxcols) * var(--slot) + (var(--maxcols) - 1) * var(--gap)))`
           }">

        <div class="grid justify-center"
             :style="{
               gridTemplateColumns: 'repeat(auto-fill, minmax(var(--slot), var(--slot)))',
               gap: 'var(--gap)',
               gridAutoRows: 'calc(var(--slot) + var(--cap))'
             }">

          <template v-for="n in size" :key="n">
            <div class="flex flex-col items-center"
                 :style="{ width: 'var(--slot)', height: 'calc(var(--slot) + var(--cap))' }">
              <button v-if="items[n-1]" class="w-full" @click="$emit('openItem', items[n-1].id)">
                <ItemCard :item="items[n-1]" :size="slotSize" class="hover:border-zinc-500/40 cursor-pointer"/>
              </button>
              <div v-else class="rounded-md border border-zinc-800 bg-zinc-900/30"
                   :style="{ width: 'var(--slot)', height: 'var(--slot)' }" />
              <div v-if="items[n-1]" class="mt-1 text-[11px] leading-tight text-zinc-300 w-full text-center truncate"
                   :style="{ height: 'var(--cap)' }">
                {{ $t(items[n-1].name) }}
              </div>
              <div v-else :style="{ height: 'var(--cap)' }"></div>
            </div>
          </template>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ItemCard from '@/components/character/ItemCard.vue';
import type { Item } from '@/types/item.ts';

const props = withDefaults(
    defineProps<{ items: Item[]; size: number; slotSize?: string; captionHeight?: string; maxCols?: number; gap?: string }>(),
    {
      slotSize: '5.5rem',
      captionHeight: '1.25rem',
      maxCols: 8,
      gap: '0.75rem',
    }
);
defineEmits<{ (e:'openItem', id: string): void }>();
</script>

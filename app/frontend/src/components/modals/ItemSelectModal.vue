<template>
  <div
      v-if="open"
      class="fixed inset-0 bg-black/60 z-40 grid place-items-center p-4"
      @click.self="close()"
  >
    <div class="w-full max-w-lg rounded-xl bg-zinc-900 border border-zinc-800 p-4">
      <header class="flex items-center justify-between mb-3">
        <h3 class="text-lg font-semibold">
          {{$t("ChooseItemFor")}} <span class="text-indigo-400">{{ $t(label) }}</span>
        </h3>
        <button class="text-zinc-400 hover:text-white" @click="close()">✕</button>
      </header>

      <div class="grid grid-cols-[repeat(auto-fill,minmax(5rem,1fr))] gap-3">
        <button
            v-for="it in filtered"
            :key="it.id"
            class="flex flex-col items-center text-center"
            @click="choose(it.id)"
        >
          <ItemCard :item="it" size="4.5rem" class="hover:border-zinc-500/40 cursor-pointer"/>
          <div class="mt-1 text-xs text-zinc-300">
            {{ $t(it.name) }}
          </div>
        </button>
      </div>

      <p v-if="filtered.length === 0" class="text-zinc-400 mt-2">
        {{$t("NoCompatibleItems")}}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCharacterStore } from '@/stores/character';
import ItemCard from '@/components/character/ItemCard.vue';
import type { ArmorSlot, WeaponSlot, Item } from '@/types/item.ts';

const props = defineProps<{
  open: boolean;
  kind?: 'armor' | 'weapon';
  slot?: ArmorSlot | WeaponSlot;
}>();
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'equip', payload: { slot: ArmorSlot | WeaponSlot; id: string }): void;
}>();

const store = useCharacterStore();

const label = computed(() => props.slot ?? '');

const filtered = computed<Item[]>(() => {
  if (!props.open || !props.slot) return [];
  return store.unequippedInventory.filter((i) =>
      store.canEquipTo(props.slot!, i)
  );
});

function choose(id: string) {
  if (!props.slot) return;
  emit('equip', { slot: props.slot, id });
  emit('close');
}
function close() {
  emit('close');
}
</script>

<template>
  <button
      class="relative rounded-lg border bg-zinc-900/40 border-zinc-800 hover:border-indigo-500/60 transition grid place-items-center cursor-pointer"
      @click="onClick"
      :aria-label="label"
      :style="{ width: size, height: size }"
  >
    <template v-if="!equipped">
      <HelmIcon      v-if="slot==='helmet'"     class="w-10 h-10 md:w-11 md:h-11 opacity-5"/>
      <ShoulderIcon  v-else-if="slot==='shoulders'" class="w-10 h-10 md:w-11 md:h-11 opacity-5"/>
      <ChestIcon     v-else-if="slot==='chest'"  class="w-10 h-10 md:w-11 md:h-11 opacity-5"/>
      <GlovesIcon    v-else-if="slot==='gloves'" class="w-10 h-10 md:w-11 md:h-11 opacity-5"/>
      <LegsIcon      v-else-if="slot==='legs'"   class="w-10 h-10 md:w-11 md:h-11 opacity-5"/>
      <BootsIcon     v-else-if="slot==='boots'"  class="w-10 h-10 md:w-11 md:h-11 opacity-5"/>
      <BeltIcon      v-else-if="slot==='belt'"   class="w-10 h-10 md:w-11 md:h-11 opacity-5"/>
      <RingIcon      v-else-if="slot==='ring'"   class="w-10 h-10 md:w-11 md:h-11 opacity-5"/>
      <AmuletIcon    v-else-if="slot==='amulet'" class="w-10 h-10 md:w-11 md:h-11 opacity-5"/>
      <CloakIcon     v-else-if="slot==='cloak'"  class="w-10 h-10 md:w-11 md:h-11 opacity-5"/>
      <MainHandIcon  v-else-if="slot==='mainHand'" class="w-10 h-10 md:w-11 md:h-11 opacity-5"/>
      <OffHandIcon   v-else-if="slot==='offHand'"  class="w-10 h-10 md:w-11 md:h-11 opacity-5"/>
    </template>

    <ItemCard v-else :item="equipped" @click.stop="emit('openItem', equipped.id)" />

    <div v-if="locked" class="absolute inset-0 bg-black/50 rounded-lg grid place-items-center text-[10px] text-zinc-300">
      2H locked
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCharacterStore } from '@/stores/character';
import ItemCard from './ItemCard.vue';
import type { ArmorSlot, WeaponSlot, Item } from '@/types/item.ts';

import BeltIcon from '@/assets/icons/gear/belt.svg';
import BootsIcon from '@/assets/icons/gear/boots.svg';
import CloakIcon from '@/assets/icons/gear/cape.svg';
import ChestIcon from '@/assets/icons/gear/chest.svg';
import GlovesIcon from '@/assets/icons/gear/gloves.svg';
import HelmIcon from '@/assets/icons/gear/helmet.svg';
import LegsIcon from '@/assets/icons/gear/legs.svg';
import AmuletIcon from '@/assets/icons/gear/necklace.svg';
import RingIcon from '@/assets/icons/gear/ring.svg';
import ShoulderIcon from '@/assets/icons/gear/shoulders.svg';
import MainHandIcon from '@/assets/icons/gear/sword-axe.svg';
import OffHandIcon from '@/assets/icons/gear/sword-shield.svg';

const props = defineProps<{
  kind: 'armor' | 'weapon';
  slot: ArmorSlot | WeaponSlot;
  label: string;
  /** velikost čtverce, např. '4rem' – CharacterPanel ji dodá responsivně */
  size?: string;
}>();
const emit = defineEmits<{
  (e: 'pickForSlot', payload: { kind: 'armor'|'weapon', slot: ArmorSlot|WeaponSlot }): void;
  (e: 'openItem', id: string): void;
}>();

const store = useCharacterStore();
const equipped = computed<Item | undefined>(() => {
  const id = (store.equipment as any)[props.slot];
  return id ? store.inventory.find(i => i.id === id) : undefined;
});
const locked = computed(() => {
  if (props.kind !== 'weapon' || props.slot !== 'offHand') return false;
  const mhId = store.equipment.mainHand;
  const mh = mhId ? store.inventory.find(i => i.id === mhId) : undefined;
  return !!(mh && mh.type === 'weapon' && mh.hand === 'twoHand');
});
function onClick() {
  if (equipped.value) emit('openItem', equipped.value.id);
  else emit('pickForSlot', { kind: props.kind, slot: props.slot });
}
</script>

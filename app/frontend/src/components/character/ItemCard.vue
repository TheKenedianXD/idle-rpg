<template>
  <div
      class="relative rounded-md border bg-zinc-900/50 grid place-items-center select-none
           transition shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]"
      :class="rarityClass"
      :style="boxStyle"
  >
    <component :is="iconComp" :class="iconClass" />

    <!-- upgrade -->
    <span v-if="item.upgrade && item.upgrade > 0"
          class="absolute top-1.5 right-1.5 text-sm px-2 py-0.5 rounded-md
                 bg-black/45 border border-white/10 backdrop-blur-[1px]">
      +{{ item.upgrade }}
    </span>

    <!-- levý spodní badge: armor L/S/T nebo weapon One./Two./Off. -->
    <span v-if="leftBadgeText"
          class="absolute bottom-1.5 left-1.5 text-[10px] leading-none px-1.5 py-0.5 rounded-md
                 bg-black/45 border border-white/10 backdrop-blur-[1px]">
      {{ $t(leftBadgeText) }}
    </span>

    <!-- pravý spodní badge: materiál qty -->
    <span v-if="materialQtyText"
          class="absolute bottom-1.5 right-1.5 text-xs leading-none px-1.5 py-0.5 rounded-md
                 bg-black/45 border border-white/10 backdrop-blur-[1px]">
      {{ materialQtyText }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Item } from '@/types/item.ts';
import { iconForItem } from '@/utils/itemIcon';

const props = defineProps<{ item: Item; size?: string }>();

const rarityClass = computed(() => ({
  'border-zinc-700/60':  props.item.rarity === 'common',
  'border-green-600/50': props.item.rarity === 'uncommon',
  'border-blue-500/50':  props.item.rarity === 'rare',
  'border-purple-500/50':props.item.rarity === 'epic',
  'border-orange-500/50':props.item.rarity === 'legendary',
}));

const boxStyle = computed(() =>
    props.size ? { width: props.size, height: props.size } : { width: '100%', height: '100%' }
);
const iconClass = computed(() => 'w-10 h-10 md:w-11 md:h-11 text-zinc-200');

/** ikona */
const iconComp = computed(() => {
  if (props.item.type === 'material') {
    return iconForItem(props.item);
  }
  return iconForItem(props.item);
});

/** Armor: L/S/T (Lig./Med./Hea.) */
const armorLetter = computed<string | null>(() => {
  if (props.item.type !== 'armor') return null;
  const cls = (props.item as any).armorClass as 'light'|'medium'|'heavy'|undefined;
  if (!cls) return null;
  const map = { light: 'Lig.', medium: 'Med.', heavy: 'Hea.', undefined: '' } as const;
  return map[cls] ?? null;
});

/** Weapon: One./Two./Off. dle WeaponHand */
const weaponHandText = computed<string | null>(() => {
  if (props.item.type !== 'weapon') return null;
  const hand = (props.item as any).hand as 'oneHand'|'twoHand'|'offHandOnly'|undefined;
  if (!hand) return null;
  const map = { oneHand: 'One.', twoHand: 'Two.', offHandOnly: 'Off.' } as const;
  return map[hand] ?? null;
});

/** levý badge = armor L/S/T nebo zbraň One./Two./Off. */
const leftBadgeText = computed(() => armorLetter.value ?? weaponHandText.value);

/** materiál qty (99+) */
const materialQtyText = computed<string | null>(() => {
  if (props.item.type !== 'material') return null;
  const q = (props.item as any).qty as number | undefined;
  if (q == null) return null;
  return q >= 99 ? '99+' : String(q);
});
</script>

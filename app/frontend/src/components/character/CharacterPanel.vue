<template>
  <div class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
    <h2 v-if="showTitle" class="text-xl font-semibold mb-3">{{ title }}</h2>

    <div class="mx-auto" style="--slot: clamp(52px, 7vw, 80px); --gap: clamp(8px, 1.4vw, 16px);">
      <div class="w-full flex justify-center">
        <div class="grid w-fit gap-[var(--gap)]"
             style="grid-template-columns: var(--slot) var(--slot) var(--slot); grid-auto-rows: var(--slot);">

          <!-- LEFT -->
          <EquipSlot label="Shoulders" kind="armor" slot="shoulders" size="var(--slot)" :style="{ gridColumn:'1', gridRow:'2' }" @pickForSlot="$emit('pickForSlot',$event)" @openItem="$emit('openItem',$event)" />
          <EquipSlot label="Ring"      kind="armor" slot="ring"      size="var(--slot)" :style="{ gridColumn:'1', gridRow:'3' }" @pickForSlot="$emit('pickForSlot',$event)" @openItem="$emit('openItem',$event)" />
          <EquipSlot label="Belt"      kind="armor" slot="belt"      size="var(--slot)" :style="{ gridColumn:'1', gridRow:'4' }" @pickForSlot="$emit('pickForSlot',$event)" @openItem="$emit('openItem',$event)" />
          <EquipSlot label="Main Hand" kind="weapon" slot="mainHand" size="var(--slot)" :style="{ gridColumn:'1', gridRow:'5' }" @pickForSlot="$emit('pickForSlot',$event)" @openItem="$emit('openItem',$event)" />

          <!-- CENTER -->
          <EquipSlot label="Helmet"    kind="armor" slot="helmet"    size="var(--slot)" :style="{ gridColumn:'2', gridRow:'1' }" @pickForSlot="$emit('pickForSlot',$event)" @openItem="$emit('openItem',$event)" />
          <EquipSlot label="Amulet"    kind="armor" slot="amulet"    size="var(--slot)" :style="{ gridColumn:'2', gridRow:'2' }" @pickForSlot="$emit('pickForSlot',$event)" @openItem="$emit('openItem',$event)" />
          <EquipSlot label="Chest"     kind="armor" slot="chest"     size="var(--slot)" :style="{ gridColumn:'2', gridRow:'3' }" @pickForSlot="$emit('pickForSlot',$event)" @openItem="$emit('openItem',$event)" />
          <EquipSlot label="Legs"      kind="armor" slot="legs"      size="var(--slot)" :style="{ gridColumn:'2', gridRow:'4' }" @pickForSlot="$emit('pickForSlot',$event)" @openItem="$emit('openItem',$event)" />

          <!-- RIGHT -->
          <EquipSlot label="Cloak"     kind="armor" slot="cloak"     size="var(--slot)" :style="{ gridColumn:'3', gridRow:'2' }" @pickForSlot="$emit('pickForSlot',$event)" @openItem="$emit('openItem',$event)" />
          <EquipSlot label="Gloves"    kind="armor" slot="gloves"    size="var(--slot)" :style="{ gridColumn:'3', gridRow:'3' }" @pickForSlot="$emit('pickForSlot',$event)" @openItem="$emit('openItem',$event)" />
          <EquipSlot label="Boots"     kind="armor" slot="boots"     size="var(--slot)" :style="{ gridColumn:'3', gridRow:'4' }" @pickForSlot="$emit('pickForSlot',$event)" @openItem="$emit('openItem',$event)" />
          <EquipSlot label="Off Hand"  kind="weapon" slot="offHand"  size="var(--slot)" :style="{ gridColumn:'3', gridRow:'5' }" @pickForSlot="$emit('pickForSlot',$event)" @openItem="$emit('openItem',$event)" />

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EquipSlot from '@/components/character/EquipSlot.vue';

defineProps<{ title?: string; showTitle?: boolean }>();
defineEmits<{
  (e:'pickForSlot', payload: { kind:'armor'|'weapon'; slot:string }): void;
  (e:'openItem', id: string): void;
}>();
</script>

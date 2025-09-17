<template>
  <div class="grid gap-6 lg:grid-cols-12">
    <section class="space-y-6 lg:col-span-5">
      <CharacterPanel
          :title="$t('Character')"
          :showTitle="true"
          @pickForSlot="openPicker"
          @openItem="openInfo"
      >
        <template #body>

        </template>
      </CharacterPanel>

      <ResourcesBox />

      <div class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 flex items-center justify-between">
        <div class="text-zinc-300">{{$t("CombatPower")}}</div>
        <div class="text-2xl font-semibold">{{ store.combatPower }}</div>
      </div>

      <StatsBox />
    </section>

    <!-- PRAVÁ: větší -->
    <aside class="lg:col-span-7 lg:top-14 self-start">
      <InventoryGrid
          :items="store.unequippedInventory"
          :size="store.inventorySize"
          @openItem="openInfo"
      />
    </aside>

    <!-- Modals ... -->
    <ItemSelectModal
        :open="!!store.pickForSlot"
        :kind="store.pickForSlot?.kind"
        :slot="store.pickForSlot?.slot as any"
        @close="store.pickForSlot=null"
        @equip="({slot,id}) => { store.equip(slot as any, id); store.pickForSlot=null; }"
    />
    <ItemInfoModal
        :item-id="store.itemInfoId"
        v-if="!!store.itemInfoId"
        @close="store.itemInfoId=null"
    />
  </div>
</template>


<script setup lang="ts">
import { useCharacterStore } from '@/stores/character';
import CharacterPanel from '@/components/character/CharacterPanel.vue';
import StatsBox from '@/components/character/StatsBox.vue';
import InventoryGrid from '@/components/character/InventoryGrid.vue';
import ItemSelectModal from '@/components/modals/ItemSelectModal.vue';
import ItemInfoModal from '@/components/modals/ItemInfoModal.vue';
import ResourcesBox from "@/components/character/ResourcesBox.vue";

const store = useCharacterStore();
function openPicker(payload: any){ store.pickForSlot = payload; }
function openInfo(id: string){ store.itemInfoId = id; }
</script>

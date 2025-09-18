<template>
  <div v-if="item" class="fixed inset-0 bg-black/60 z-40 grid place-items-center p-4" @click.self="emit('close')">
    <div class="w-full max-w-md rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-3">
      <header class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold"> {{ $t(item.name) }}</h3>
          <p class="text-xs text-zinc-400 capitalize">
            <template v-if="item.type==='armor'">
              <span v-if="item.armorClass">{{ $t("armorClass." + item.armorClass) }}</span>
              {{$t("items.armor")}} ({{ $t("armorSlot." + item.slot) }})
            </template>
            <template v-else-if="item.type==='weapon'">
              {{$t('items.weapon')}}: {{ $t("weaponClass." + item.weaponClass) }}
              <span class="text-zinc-400">({{ $t("weaponHand." + item.hand) }})</span>
            </template>
            <template v-else>
              {{$t("items.material")}}: {{ $t("materialKind." + item.materialKind) }}
            </template>
          </p>
          <small>{{$t("rarity." + item.rarity)}}</small>
        </div>
        <button class="text-zinc-400 hover:text-white" @click="emit('close')">✕</button>
      </header>

      <div class="flex items-center gap-3">
        <ItemCard :item="item" size="6rem"/>
        <div class="text-sm text-zinc-300">

          <template v-if="item.type==='weapon' && itemStats">
            <p>
              <div v-if="item.maxDmg > 0">
                {{$t("ui.damage")}}: {{ itemStats.weaponStats?.min }}–{{ itemStats.weaponStats?.max }}
                <span v-if="compareEnabled && dmgDiffText"
                      :class="dmgDiff > 0 ? 'text-emerald-400' : dmgDiff < 0 ? 'text-red-400' : 'text-zinc-300'">
                  ({{ dmgDiffText }})
                </span>
              </div>
              <div v-if="item.attackSpeed">
                {{$t("stats.attackSpeed")}}: {{ itemStats.weaponStats?.attackSpeed }}s
                <span v-if="compareEnabled && attackSpeedDiff !== 0"
                      :class="attackSpeedDiff > 0 ? 'text-emerald-400' : 'text-red-400'">
                  ({{ attackSpeedDiff > 0 ? '-' : '+'}}{{ Math.abs(attackSpeedDiff) }}s)
                </span>
              </div>
              <div v-if="itemStats.armorScaled">
                {{$t("items.armor")}}: {{ itemStats.armorScaled }}
                <span v-if="compareEnabled && armorDiff !== 0"
                      :class="armorDiff > 0 ? 'text-emerald-400' : 'text-red-400'">
                  ({{ armorDiff > 0 ? '+' : ''}}{{ armorDiff }})
                </span>
              </div>
            </p>
          </template>

          <template v-else-if="item.type==='armor' && itemStats">
            <p>
              <span v-if="itemStats.armorScaled">{{$t("items.armor")}}: {{ itemStats.armorScaled }}</span>
              <span v-if="compareEnabled && armorDiff !== 0"
                    :class="armorDiff > 0 ? 'text-emerald-400' : 'text-red-400'">
                ({{ armorDiff > 0 ? '+' : ''}}{{ armorDiff }})
              </span>
            </p>
          </template>

          <template v-else-if="item.type==='material'">
            <p>{{$t("common.quantity")}}: {{ item.qty }}</p>
          </template>

          <ul v-if="itemStats?.statsScaled" class="mt-2 space-y-0.5">
            <li v-for="(val,k) in itemStats.statsScaled" :key="k"
                :class="compareEnabled ? statClass(val, diffs[k], equippedStats?.statsScaled?.[k]) : 'text-zinc-300'">
              <span>{{$t("stats." + String(k)) }}</span>:
              <strong>+{{ val }}</strong>
              <span v-if="compareEnabled && formatDiff(diffs[k])">
                ({{ formatDiff(diffs[k]) }})
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="item.type!=='material' && (item.upgrade ?? 0) < store.maxUpgrade" class="ml-auto flex items-center gap-3 text-xs text-zinc-300">
        <span>
          {{$t("common.success")}}: <strong :class="chanceColor">{{ successChance }}%</strong>
        </span>
        <span class="inline-flex items-center gap-1">
          {{$t("common.cost")}}:
          <TwoCoinsIcon class="w-[1.2em] h-[1.2em] text-yellow-500"/>
          <span>{{ upgradeCost }}</span>
        </span>
      </div>

      <div v-if="(item.upgrade ?? 0) >= store.maxUpgrade">
        {{$t("ui.maxUpgrade")}}
      </div>

      <div class="flex flex-wrap gap-2 pt-1">
        <button v-if="item.type!=='material'" class="btn btn-primary cursor-pointer" @click="toggleEquip()">
          {{ isEquipped ? $t("actions.unequip") : $t('actions.equip') }}
        </button>

        <button
            v-if="item.type!=='material' && (item.upgrade ?? 0) < store.maxUpgrade"
            class="btn btn-secondary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            @click="upgrade()"
            :disabled="store.gold < upgradeCost"
        >
          {{$t("actions.toUpgrade")}}
        </button>

        <div v-if="item.type==='material'" class="flex items-center gap-2">
          <input
              type="number"
              v-model.number="sellQty"
              min="1"
              :max="item.qty"
              class="w-20 px-2 py-1.5 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm
             focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
             [appearance:textfield]"
          />
          <button class="btn btn-danger cursor-pointer" @click="sellMaterial(sellQty)">
            <span class="inline-flex items-center gap-1">
              {{$t("actions.sell")}} (
              <TwoCoinsIcon class="w-[1.4em] h-[1.4em] text-yellow-500"/>
              <span>{{ sellQtyPrice }}</span>)
            </span>
          </button>
          <button class="btn btn-danger cursor-pointer" @click="sellMaterial(item.qty)">
            <span class="inline-flex items-center gap-1">
              {{$t("actions.sellAll")}} (
              <TwoCoinsIcon class="w-[1.4em] h-[1.4em] text-yellow-500"/>
              <span>{{ sellAllPrice }}</span>)
            </span>
          </button>
        </div>
        <div v-else class="flex justify-end">
          <button class="btn btn-danger cursor-pointer" @click="sell()">
            <span class="inline-flex items-center gap-1">
              {{$t("actions.sell")}} (
              <TwoCoinsIcon class="w-[1.2em] h-[1.2em] text-yellow-500"/>
              <span>{{ sellPrice }}</span>)
            </span>
          </button>
        </div>
      </div>

      <p v-if="message" :class="messageOk ? 'text-emerald-400' : 'text-red-400'" class="text-xs">
        {{ $t(message) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import { useCharacterStore } from '@/stores/character';
import { useSettingsStore } from '@/stores/settings';
import { calcItemStats } from "@/utils/calcItemStats";
import ItemCard from '@/components/character/ItemCard.vue';
import type {Item, MaterialItem} from '@/types/item';
import TwoCoinsIcon from "@/assets/icons/resources/two-coins.svg";

const props = defineProps<{ itemId: string | null }>();
const emit = defineEmits<{ (e: 'close'): void }>();
const store = useCharacterStore();

const item = computed<Item | undefined>(() => store.inventory.find(i => i.id === props.itemId!));
const isEquipped = computed(() => Object.values(store.equipment).includes(props.itemId ?? ''));

const settings = useSettingsStore();
const compareEnabled = computed(() => settings.compareItems);

const sellQty = ref(1);
const message = ref('');
const messageOk = ref(true);

watch(sellQty, (val) => {
  if (item.value?.type !== 'material') return;
  const mat = item.value as MaterialItem;
  if (val < 1) sellQty.value = 1;
  if (val > mat.qty) sellQty.value = mat.qty;
});

const sellQtyPrice = computed(() => item.value?.type === 'material' ? sellQty.value * 1 : 0);
const sellAllPrice = computed(() => item.value?.type === 'material' ? (item.value as MaterialItem).qty * 1 : 0);

const itemStats = computed(() => item.value ? calcItemStats(item.value, store.derivedStats) : null);

const equippedStats = computed(() => {
  if (!compareEnabled.value || !item.value) return null;
  const slot = findSlotFor(item.value);
  if (!slot) return null;
  const eqId = store.equipment[slot as keyof typeof store.equipment];
  const eq = eqId ? store.inventory.find(i => i.id === eqId) : null;
  return eq ? calcItemStats(eq, store.derivedStats) : null;
});

const diffs = computed(() => {
  const out: Record<string, number> = {};
  const eq = equippedStats.value?.statsScaled ?? {};
  const stats = itemStats.value?.statsScaled ?? {};
  for (const k in stats) {
    out[k] = (stats[k] ?? 0) - (eq[k] ?? 0);
  }
  return out;
});

const dmgDiff = computed(() => {
  if (!compareEnabled.value || !itemStats.value?.weaponStats || !equippedStats.value?.weaponStats) return 0;
  return Math.round(itemStats.value.weaponStats.avg - equippedStats.value.weaponStats.avg);
});
const dmgDiffText = computed(() => dmgDiff.value === 0 ? '' : `${dmgDiff.value > 0 ? '+' : ''}${dmgDiff.value}`);

const attackSpeedDiff = computed(() => {
  if (!compareEnabled.value || !itemStats.value?.weaponStats || !equippedStats.value?.weaponStats) return 0;
  return +(equippedStats.value.weaponStats.attackSpeed - itemStats.value.weaponStats.attackSpeed).toFixed(2);
});

const armorDiff = computed(() => {
  if (!compareEnabled.value || !itemStats.value) return 0;
  return (itemStats.value.armorScaled ?? 0) - (equippedStats.value?.armorScaled ?? 0);
});

function statClass(val: number, diff: number, equippedVal?: number) {
  if (!compareEnabled.value) return 'text-zinc-300';
  if (val === 0 && equippedVal) return 'text-red-400';
  if (equippedVal === 0 && val > 0) return 'text-emerald-400';
  if (diff > 0) return 'text-emerald-400';
  if (diff < 0) return 'text-red-400';
  return 'text-zinc-300';
}
function formatDiff(diff: number) {
  if (diff === 0) return '';
  return `${diff > 0 ? '+' : ''}${diff}`;
}

const currentUp = computed(() => item.value?.upgrade ?? 0);
const successChance = computed(() => Math.max(100 - currentUp.value * 6, 20));
const chanceColor = computed(() =>
    successChance.value >= 70 ? 'text-emerald-400' :
        successChance.value >= 40 ? 'text-amber-300' : 'text-red-400'
);
const upgradeCost = computed(() => 100 + (item.value?.upgrade ?? 0) * 50);

const sellPrice = computed(() => {
  if (!item.value) return 0;
  if (item.value.type === 'material') return 1;
  const base = 50;
  const bonus = (item.value.upgrade ?? 0) * 25;
  return base + bonus;
});

function findSlotFor(item: Item) {
  if (item.type === 'armor') return item.slot;
  if (item.type === 'weapon') {
    if (item.hand === 'offHandOnly') return 'offHand';
    return 'mainHand';
  }
  return null;
}

function toggleEquip() {
  if (!item.value) return;
  if (isEquipped.value) {
    const realSlot = store.slotOfItem(item.value.id);
    if (!realSlot) return;
    store.unequip(realSlot as any);
    messageOk.value = true;
    message.value = 'ui.unequipped';
  } else {
    const slot = findSlotFor(item.value);
    if (!slot) return;
    if (!store.canEquipTo(slot as any, item.value)) {
      messageOk.value = false;
      message.value = 'ui.cannotEquipHere';
      return;
    }
    store.equip(slot as any, item.value.id);
    messageOk.value = true;
    message.value = 'ui.equipped';
  }
}

function upgrade() {
  if (!item.value) return;
  const ok = store.tryUpgradeItem(item.value.id);
  if (ok) {
    messageOk.value = true;
    message.value = 'ui.upgraded';
  } else {
    messageOk.value = false;
    message.value = 'ui.upgradeFailed';
  }
}

function sell() {
  if (!item.value) return;
  if (store.sellItem(item.value.id)) {
    messageOk.value = true;
    emit('close');
  } else {
    messageOk.value = false;
    message.value = 'ui.cannotSellEquippedItem';
  }
}

function sellMaterial(qty: number) {
  if (!item.value || item.value.type !== 'material') return;
  const amt = Math.min(qty, item.value.qty);
  if (amt <= 0) return;
  const price = amt * 1;
  store.gold += price;
  item.value.qty -= amt;
  if (item.value.qty <= 0) {
    store.inventory = store.inventory.filter(i => i.id !== item.value!.id);
    emit('close');
  }
}
</script>

<style scoped>
.btn { @apply px-3 py-1.5 rounded-md text-sm font-medium transition border; }
.btn-primary { @apply bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-700; }
.btn-secondary { @apply bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-600; }
.btn-danger { @apply bg-red-600/80 hover:bg-red-600 text-white border-red-700; }
</style>

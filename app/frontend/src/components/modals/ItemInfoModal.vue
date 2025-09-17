<template>
  <div v-if="item" class="fixed inset-0 bg-black/60 z-40 grid place-items-center p-4" @click.self="emit('close')">
    <div class="w-full max-w-md rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-3">
      <header class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold">{{ $t(item.name) }}</h3>
          <p class="text-xs text-zinc-400 capitalize">
            <template v-if="item.type==='armor'">
              {{ item.armorClass }} {{$t("Armor")}} ({{ $t(item.slot) }})
            </template>
            <template v-else-if="item.type==='weapon'">
              {{$t('Weapon')}}: {{ $t(item.weaponClass) }} <span class="text-zinc-400">({{ $t(item.hand) }})</span>
            </template>
            <template v-else>
              {{$t("Material")}}: {{ $t(item.materialKind) }}
            </template>
          </p>
        </div>
        <button class="text-zinc-400 hover:text-white" @click="emit('close')">✕</button>
      </header>

      <div class="flex items-center gap-3">
        <ItemCard :item="item" size="6rem"/>
        <div class="text-sm text-zinc-300">

          <template v-if="item.type==='weapon'">
            <p>
              {{$t("Damage")}}: {{ item.minDmg }}–{{ item.maxDmg }}
              <span v-if="compareEnabled && dmgDiffText"
                    :class="dmgDiff > 0 ? 'text-emerald-400' : dmgDiff < 0 ? 'text-red-400' : 'text-zinc-300'">
                ({{ dmgDiffText }})
              </span>
            </p>
          </template>

          <template v-else-if="item.type==='armor'">
            <p>
              {{$t("Armor")}}: {{ item.armor }}
              <span v-if="compareEnabled && armorDiff !== 0"
                    :class="armorDiff > 0 ? 'text-emerald-400' : 'text-red-400'">
                ({{ armorDiff > 0 ? '+' : ''}}{{ armorDiff }})
              </span>
            </p>
          </template>

          <template v-else>
            <p>{{$t("Quantity")}}: {{ item.qty }}</p>
          </template>

          <ul v-if="allStats" class="mt-2 space-y-0.5">
            <li v-for="(val,k) in allStats" :key="k"
                :class="compareEnabled ? statClass(val, diffs[k], equippedStats[k]) : 'text-zinc-300'">
              <span class="capitalize">{{ $t(k) }}</span>:
              <strong>+{{ val }}</strong>
              <span v-if="compareEnabled && formatDiff(diffs[k], String(k))">
                ({{ formatDiff(diffs[k], String(k)) }})
              </span>
            </li>
          </ul>
        </div>
      </div>

      <p v-if="item.desc" class="text-sm text-zinc-300/90">{{ $t(item.desc) }}</p>

      <div v-if="item.type!=='material' && (item.upgrade ?? 0) < store.maxUpgrade" class="ml-auto flex items-center gap-3 text-xs text-zinc-300">
        <span>
          {{$t("Success")}}: <strong :class="chanceColor">{{ successChance }}%</strong>
        </span>
              <span class="inline-flex items-center gap-1">
          {{$t("Cost")}}:
          <TwoCoinsIcon class="w-[1.2em] h-[1.2em] text-yellow-500" aria-hidden="true"/>
          <span>{{ upgradeCost }}</span>
        </span>
      </div>

      <div v-if="(item.upgrade ?? 0) >= store.maxUpgrade">
        {{$t("MaxUpgrade")}}
      </div>

      <div class="flex flex-wrap gap-2 pt-1">
        <button v-if="item.type!=='material'" class="btn btn-primary cursor-pointer" @click="toggleEquip()">
          {{ isEquipped ? $t("Unequip") : $t('Equip') }}
        </button>

        <button
            v-if="item.type!=='material' && (item.upgrade ?? 0) < store.maxUpgrade"
            class="btn btn-secondary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            @click="upgrade()"
            :disabled="store.gold < upgradeCost"
        >
          {{$t("Upgrade")}}
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
              {{$t("Sell")}} (
              <TwoCoinsIcon class="w-[1.4em] h-[1.4em] text-yellow-500"/>
              <span>{{ sellQtyPrice }}</span>)
            </span>
          </button>
          <button class="btn btn-danger cursor-pointer" @click="sellMaterial(item.qty)">
            <span class="inline-flex items-center gap-1">
              {{$t("SellAll")}} (
              <TwoCoinsIcon class="w-[1.4em] h-[1.4em] text-yellow-500"/>
              <span>{{ sellAllPrice }}</span>)
            </span>
          </button>
        </div>
        <div v-else class="flex justify-end">
          <button class="btn btn-danger cursor-pointer" @click="sell()">
            <span class="inline-flex items-center gap-1">
              {{$t("Sell")}} (
              <TwoCoinsIcon class="w-[1.2em] h-[1.2em] text-yellow-500" aria-hidden="true"/>
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
import ItemCard from '@/components/character/ItemCard.vue';
import type {Item, MaterialItem, WeaponItem} from '@/types/item';
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

const sellQtyPrice = computed(() => {
  if (item.value?.type !== 'material') return 0;
  return sellQty.value * 1;
});
const sellAllPrice = computed(() => {
  if (item.value?.type !== 'material') return 0;
  return (item.value as MaterialItem).qty * 1;
});

const itemStats = computed<Record<string, number>>(() => (item.value as any)?.stats ?? {});

const equippedStats = computed<Record<string, number>>(() => {
  if (!compareEnabled.value || !item.value) return {};
  if (item.value.type === 'weapon') {
    if (item.value.hand === 'twoHand') {
      const mh = store.equipment.mainHand ? store.inventory.find(i => i.id === store.equipment.mainHand) as WeaponItem : null;
      const oh = store.equipment.offHand ? store.inventory.find(i => i.id === store.equipment.offHand) as WeaponItem : null;
      return { ...(mh?.stats ?? {}), ...(oh?.stats ?? {}) };
    }
    if (item.value.hand === 'offHandOnly') {
      const eq = store.equipment.offHand;
      const it = eq ? store.inventory.find(i => i.id === eq) : null;
      return (it as any)?.stats ?? {};
    }
    if (item.value.hand === 'oneHand') {
      const slot = findSlotFor(item.value);
      const eq = slot ? store.equipment[slot as keyof typeof store.equipment] : null;
      const it = eq ? store.inventory.find(i => i.id === eq) : null;
      return (it as any)?.stats ?? {};
    }
  }
  const slot = findSlotFor(item.value);
  if (!slot) return {};
  const eq = store.equipment[slot as keyof typeof store.equipment];
  const it = eq ? store.inventory.find(i => i.id === eq) : null;
  return (it as any)?.stats ?? {};
});

const allStats = computed(() => {
  const keys = new Set([
    ...Object.keys(itemStats.value ?? {}),
    ...Object.keys(equippedStats.value ?? {})
  ]);
  return Object.fromEntries([...keys].map(k => [k, itemStats.value[k] ?? 0]));
});

const diffs = computed(() => {
  const out: Record<string, number> = {};
  for (const k in allStats.value) {
    out[k] = (allStats.value[k] ?? 0) - (equippedStats.value?.[k] ?? 0);
  }
  return out;
});

const dmgDiff = computed(() => {
  if (!compareEnabled.value || !item.value || item.value.type !== 'weapon') return 0;
  const avg = (a:number,b:number)=> (a+b)/2;
  const newAvg = avg(item.value.minDmg, item.value.maxDmg);

  if (item.value.hand === 'twoHand') {
    const mh = store.equipment.mainHand ? store.inventory.find(i => i.id === store.equipment.mainHand) as WeaponItem : null;
    const oh = store.equipment.offHand ? store.inventory.find(i => i.id === store.equipment.offHand) as WeaponItem : null;
    const eqAvg = (mh ? avg(mh.minDmg, mh.maxDmg) : 0) + (oh ? avg(oh.minDmg, oh.maxDmg) : 0);
    return Math.round(newAvg - eqAvg);
  }

  if (item.value.hand === 'oneHand') {
    const slot = findSlotFor(item.value);
    const eqId = slot ? store.equipment[slot as keyof typeof store.equipment] : null;
    const eq = eqId ? store.inventory.find(i => i.id === eqId) as WeaponItem : null;
    const eqAvg = eq ? avg(eq.minDmg, eq.maxDmg) : 0;
    return Math.round(newAvg - eqAvg);
  }

  if (item.value.hand === 'offHandOnly') {
    const eqId = store.equipment.offHand;
    const eq = eqId ? store.inventory.find(i => i.id === eqId) as WeaponItem : null;
    const eqAvg = eq ? avg(eq.minDmg, eq.maxDmg) : 0;
    return Math.round(newAvg - eqAvg);
  }

  return 0;
});

const dmgDiffText = computed(() => {
  if (!item.value || item.value.type !== 'weapon') return '';
  const avg = (a:number,b:number)=> (a+b)/2;
  const newAvg = avg(item.value.minDmg, item.value.maxDmg);

  if (item.value.hand === 'oneHand') {
    const mh = store.equipment.mainHand ? store.inventory.find(i => i.id === store.equipment.mainHand) as WeaponItem : null;
    const oh = store.equipment.offHand ? store.inventory.find(i => i.id === store.equipment.offHand) as WeaponItem : null;
    const mhDiff = Math.round(newAvg - (mh ? avg(mh.minDmg, mh.maxDmg) : 0));
    const ohDiff = Math.round(newAvg - (oh ? avg(oh.minDmg, oh.maxDmg) : 0));
    if (mhDiff === 0 && ohDiff === 0) return '';
    return `${mhDiff >= 0 ? '+' : ''}${mhDiff} / ${ohDiff >= 0 ? '+' : ''}${ohDiff}`;
  }
  if (dmgDiff.value === 0) return '';
  return `${dmgDiff.value >= 0 ? '+' : ''}${dmgDiff.value}`;
});

const armorDiff = computed(() => {
  if (!compareEnabled.value || !item.value || item.value.type !== 'armor') return 0;
  const slot = findSlotFor(item.value);
  if (!slot) return 0;
  const eqId = store.equipment[slot as keyof typeof store.equipment];
  const eq = eqId ? store.inventory.find(i => i.id === eqId) : null;
  return (item.value.armor ?? 0) - ((eq as any)?.armor ?? 0);
});

function statClass(val: number, diff: number, equippedVal?: number) {
  if (!compareEnabled.value) return 'text-zinc-300';
  if (val === 0 && equippedVal) return 'text-red-400';
  if (equippedVal === 0 && val > 0) return 'text-emerald-400';
  if (diff > 0) return 'text-emerald-400';
  if (diff < 0) return 'text-red-400';
  return 'text-zinc-300';
}
function formatDiff(diff: number, k: string) {
  if (item.value?.type === 'weapon' && item.value.hand === 'oneHand') {
    const mh = store.equipment.mainHand ? store.inventory.find(i => i.id === store.equipment.mainHand) as WeaponItem : null;
    const oh = store.equipment.offHand ? store.inventory.find(i => i.id === store.equipment.offHand) as WeaponItem : null;
    const mhDiff = (itemStats.value[k] ?? 0) - (mh?.stats?.[k] ?? 0);
    const ohDiff = (itemStats.value[k] ?? 0) - (oh?.stats?.[k] ?? 0);

    if (mhDiff === 0 && ohDiff === 0) return '';
    return `${mhDiff >= 0 ? '+' : ''}${mhDiff} / ${ohDiff >= 0 ? '+' : ''}${ohDiff}`;
  }

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
  const slot = findSlotFor(item.value);
  if (!slot) return;
  if (isEquipped.value) {
    store.unequip(slot as any);
    messageOk.value = true;
    message.value = 'Unequipped.';
  } else {
    if (!store.canEquipTo(slot as any, item.value)) {
      messageOk.value = false;
      message.value = 'Cannot equip here.';
      return;
    }
    store.equip(slot as any, item.value.id);
    messageOk.value = true;
    message.value = 'Equipped.';
  }
}

function upgrade() {
  if (!item.value) return;
  const ok = store.tryUpgradeItem(item.value.id);
  if (ok) {
    messageOk.value = true;
    message.value = 'Upgraded';
  } else {
    messageOk.value = false;
    message.value = 'UpgradeFailed';
  }
}

function sell() {
  if (!item.value) return;
  if (store.sellItem(item.value.id)) {
    messageOk.value = true;
    message.value = `Sold for ${sellPrice.value}g.`;
    setTimeout(() => emit('close'), 350);
  } else {
    messageOk.value = false;
    message.value = 'Cannot sell equipped item.';
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
  messageOk.value = true;
  message.value = `Sold ${amt}x ${item.value.name} for ${price}g.`;
}
</script>

<style scoped>
.btn { @apply px-3 py-1.5 rounded-md text-sm font-medium transition border; }
.btn-primary { @apply bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-700; }
.btn-secondary { @apply bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-600; }
.btn-danger { @apply bg-red-600/80 hover:bg-red-600 text-white border-red-700; }
</style>

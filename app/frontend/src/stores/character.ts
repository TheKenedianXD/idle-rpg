import { defineStore } from 'pinia';
import type {
    Equipment,
    Item,
    WeaponItem,
    ArmorItem,
    ArmorSlot,
    WeaponSlot,
    StatBlock,
    DerivedStats
} from '@/types/item';

function uid() { return Math.random().toString(36).slice(2, 10); }
type PickForSlot = { kind: 'armor' | 'weapon'; slot: ArmorSlot | WeaponSlot } | null;

export const useCharacterStore = defineStore('character', {
    state: () => ({
        name: "JohnnyMachete",
        level: 107,
        rebirth: 1,

        xp: {
            current: 284524,
            required: 360541,
        },

        essence: 23,
        gold: 5000,
        fame: 1200,
        stats: { strength: 10, agility: 8, endurance: 9},

        equipment: {} as Equipment,

        inventory: [
            { id: uid(), name: 'SteelSword',  type: 'weapon', weaponClass: 'sword',  hand: 'oneHand',
                rarity: 'epic', minDmg: 12, maxDmg: 18,
                stats: { strength: 2, agility: 1 }, desc: '' },

            { id: uid(), name: 'IronDagger',  type: 'weapon', weaponClass: 'dagger', hand: 'oneHand',
                rarity: 'uncommon', minDmg: 6, maxDmg: 9,
                stats: { agility: 2 }, desc: '' },

            { id: uid(), name: 'Greatsword',   type: 'weapon', weaponClass: 'sword',  hand: 'twoHand',
                rarity: 'rare', minDmg: 20, maxDmg: 28,
                stats: { strength: 4, endurance: 1 }, desc: '' },

            { id: uid(), name: 'RoundShield', type: 'weapon', weaponClass: 'shield', hand: 'offHandOnly',
                rarity: 'rare', minDmg: 0, maxDmg: 0,
                stats: { endurance: 2 }, desc: '' },

            { id: uid(), name: 'IronChest',   type: 'armor', slot: 'chest', armor: 18, rarity: 'rare',
                armorClass: 'heavy' as const, stats: { endurance: 2 }, desc: '' },

            { id: uid(), name: 'LeatherBoots', type: 'armor', slot: 'boots', armor: 6, rarity: 'uncommon',
                armorClass: 'light' as const, upgrade: 15, stats: { agility: 2 }, desc: '' },

            { id: uid(), name: 'ClothGloves', type: 'armor', slot: 'gloves', armor: 2, rarity: 'common',
                armorClass: 'light' as const, stats: { }, desc: '' },

            { id: uid(), name: 'LeatherBelt', type: 'armor', slot: 'belt', armor: 3, rarity: 'uncommon',
                armorClass: 'medium' as const, stats: { strength: 1 }, desc: '' },

            { id: uid(), name: 'TravelerCloak', type: 'armor', slot: 'cloak', armor: 5, rarity: 'rare',
                armorClass: 'light' as const, stats: { endurance: 1 }, desc: '' },

            { id: uid(), name: 'SilverRing',  type: 'armor', slot: 'ring', armor: 1, rarity: 'rare',
                armorClass: 'light' as const, stats: { }, desc: '' },

            { id: uid(), name: 'AmuletOfVigor', type: 'armor', slot: 'amulet', armor: 2, rarity: 'epic',
                armorClass: 'light' as const, stats: { strength: 1, endurance: 1 }, desc: '' },

            { id: uid(), name: 'Wood',          type: 'material', materialKind: 'wood',         rarity: 'common', qty: 37 },
            { id: uid(), name: 'EssenceShard', type: 'material', materialKind: 'essenceShard', rarity: 'epic',   qty: 103 },
        ] as Item[],

        inventorySize: 88,
        itemInfoId: null as string | null,
        pickForSlot: null as PickForSlot,
        maxUpgrade: 15
    }),

    getters: {
        equippedItem: (s) => (id?: string) => s.inventory.find(i => i.id === id),
        isEquipped: (s) => (itemId: string) => Object.values(s.equipment).includes(itemId),
        slotOfItem: (s) => (itemId: string) => {
            const entries = Object.entries(s.equipment) as [ArmorSlot|WeaponSlot, string|undefined][];
            const hit = entries.find(([, id]) => id === itemId);
            return hit?.[0];
        },
        unequippedInventory: (s) => s.inventory.filter(i => !Object.values(s.equipment).includes(i.id)),
        derivedStats: (s): DerivedStats => {
            const base = (s as any).totalStats ? (s as any).totalStats : s.stats;

            return {
                attackPower: base.strength * 2,

                critChance: +(base.agility * 0.2).toFixed(1),
                attackDelay: +(1 / (1 + base.agility * 0.02)).toFixed(2),
                critDamage: 150 + base.agility * 0.5,

                maxHealth: base.endurance * 10,
                blockChance: +(base.endurance * 0.15).toFixed(1),
            };
        },
        totalStats: (s) => {
            const sum: Required<StatBlock> = { strength:0, agility:0, endurance:0,};

            sum.strength     += s.stats.strength;
            sum.agility      += s.stats.agility;
            sum.endurance    += s.stats.endurance;

            Object.values(s.equipment).forEach(id => {
                const it = s.inventory.find(i => i.id === id);
                const st = (it as any)?.stats as StatBlock | undefined;
                if (!st) return;
                if (st.strength)     sum.strength     += st.strength;
                if (st.agility)      sum.agility      += st.agility;
                if (st.endurance)    sum.endurance    += st.endurance;
            });
            return sum;
        },

        combatPower: (s): number => {
            const derived = (s as any).derivedStats;

            const gearScore = Object.values(s.equipment)
                .map(id => s.inventory.find(i => i.id === id))
                .reduce((sum, it) => {
                    if (!it) return sum;
                    if (it.type === 'weapon') return sum + ((it as WeaponItem).maxDmg + (it.upgrade ?? 0) * 2);
                    if (it.type === 'armor')  return sum + ((it as ArmorItem).armor  + (it.upgrade ?? 0));
                    return sum;
                }, 0);


            const derivedScore =
                derived.maxHealth / 10 +
                (1 / derived.attackDelay) * 20 +
                derived.critChance * 2 +
                derived.critDamage / 10 +
                derived.blockChance * 2;

            return Math.round(gearScore + derivedScore);
        },
    },

    actions: {
        statUpgradeCost(statKey: keyof typeof this.stats) {
            const current = this.stats[statKey];
            return 1 + Math.floor((current ** 1.3) / 2);
        },
        tryUpgradeStat(statKey: keyof typeof this.stats) {
            const cost = this.statUpgradeCost(statKey);
            if (this.essence < cost) return false;
            this.essence -= cost;
            this.stats[statKey] += 1;
            return true;
        },

        canEquipTo(slot: ArmorSlot | WeaponSlot, item: Item) {
            if (item.type === 'material') return false;
            if (slot === 'mainHand' || slot === 'offHand') {
                if (item.type !== 'weapon') return false;
                const hand = (item as WeaponItem).hand;
                if (slot === 'offHand') {
                    const mh = this.equipment.mainHand
                        ? (this.inventory.find(i => i.id === this.equipment.mainHand) as WeaponItem | undefined)
                        : undefined;
                    if (mh?.hand === 'twoHand') return false;
                    return hand === 'oneHand' || hand === 'offHandOnly';
                }
                return hand === 'oneHand' || hand === 'twoHand';
            }
            return item.type === 'armor' && item.slot === slot;
        },

        equip(slot: ArmorSlot | WeaponSlot, itemId: string) {
            const item = this.inventory.find(i => i.id === itemId);
            if (!item || !this.canEquipTo(slot, item)) return;
            const prevSlot = this.slotOfItem(itemId) as ArmorSlot | WeaponSlot | undefined;
            if (prevSlot && prevSlot !== slot) (this.equipment as any)[prevSlot] = undefined;
            if (slot === 'mainHand' && item.type === 'weapon' && (item as WeaponItem).hand === 'twoHand') {
                this.equipment.offHand = undefined;
            }
            (this.equipment as any)[slot] = itemId;
        },

        unequip(slot: ArmorSlot | WeaponSlot) { (this.equipment as any)[slot] = undefined; },

        tryUpgradeItem(itemId: string) {
            const it = this.inventory.find(i => i.id === itemId);
            if (!it) return false;
            const current = it.upgrade ?? 0;
            if (current >= this.maxUpgrade) return false;

            const cost = 100 + current * 50;
            if (this.gold < cost) return false;

            this.gold -= cost;

            const chance = Math.max(100 - current * 6, 20);
            const roll = Math.random() * 100;

            if (roll < chance) {
                it.upgrade = current + 1;
                return true;
            } else {
                return false;
            }
        },

        sellItem(itemId: string) {
            if (Object.values(this.equipment).includes(itemId)) return false;
            const it = this.inventory.find(i => i.id === itemId);
            if (!it) return false;

            const base = 50;
            const bonus = (it.upgrade ?? 0) * 25;
            this.gold += base + bonus;

            this.inventory = this.inventory.filter(i => i.id !== itemId);
            return true;
        },
    },
});

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export type ItemType = 'armor' | 'weapon' | 'material';

export type ArmorSlot =
    | 'helmet' | 'shoulders' | 'chest' | 'gloves' | 'legs' | 'boots'
    | 'belt' | 'ring' | 'amulet' | 'cloak';

export type WeaponSlot = 'mainHand' | 'offHand';

export type WeaponHand  = 'oneHand' | 'twoHand' | 'offHandOnly';
export type ArmorClass  = 'light' | 'medium' | 'heavy';
export type WeaponClass = 'sword' | 'dagger' | 'shield';

export type MaterialKind = 'wood' | 'essenceShard';

export interface StatBlock {
    strength?: number;
    agility?: number;
    endurance?: number;
    [key: string]: number | undefined;
}

export interface DerivedStats {
    maxHealth: number;
    blockChance: number;
    critChance: number;
    attackSpeed: number;
    critDamage: number;
    attackPower: number;
    damageReduction: number;
    [key: string]: number | undefined;
}

export interface BaseItem {
    id: string;
    name: string;
    type: ItemType;
    rarity: Rarity;
    upgrade?: number;
    icon?: string;
}

export interface ArmorItem extends BaseItem {
    type: 'armor';
    slot: ArmorSlot;
    armor: number;
    armorClass: ArmorClass;
    stats?: StatBlock;
}

export interface WeaponItem extends BaseItem {
    type: 'weapon';
    weaponClass: WeaponClass;
    hand: WeaponHand;
    minDmg: number;
    maxDmg: number;
    attackSpeed?: number;
    stats?: StatBlock;
    armor?: number;
}

export interface MaterialItem extends BaseItem {
    type: 'material';
    materialKind: MaterialKind;
    qty: number;
}

export type Item = ArmorItem | WeaponItem | MaterialItem;

export interface Equipment {
    helmet?: string; shoulders?: string; chest?: string; gloves?: string;
    legs?: string; boots?: string; belt?: string; ring?: string; amulet?: string; cloak?: string;
    mainHand?: string; offHand?: string;
}
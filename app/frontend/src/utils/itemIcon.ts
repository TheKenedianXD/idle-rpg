import type { Item, ArmorItem, WeaponItem } from '@/types/item.ts';

import HelmIcon      from '@/assets/icons/gear/helmet.svg';
import ShoulderIcon  from '@/assets/icons/gear/shoulders.svg';
import ChestIcon     from '@/assets/icons/gear/chest.svg';
import GlovesIcon    from '@/assets/icons/gear/gloves.svg';
import LegsIcon      from '@/assets/icons/gear/legs.svg';
import BootsIcon     from '@/assets/icons/gear/boots.svg';
import BeltIcon      from '@/assets/icons/gear/belt.svg';
import RingIcon      from '@/assets/icons/gear/ring.svg';
import AmuletIcon    from '@/assets/icons/gear/necklace.svg';
import CloakIcon     from '@/assets/icons/gear/cape.svg';

import SwordIcon     from '@/assets/icons/weapons/sword.svg';
import DaggerIcon    from '@/assets/icons/weapons/dagger.svg';
import ShieldIcon    from '@/assets/icons/weapons/shield.svg';

import SackIcon      from '@/assets/icons/materials/sack.svg';
import WoodIcon      from '@/assets/icons/materials/wood.svg';

export function iconForItem(item: Item) {
    if (item.type === 'armor') {
        const a = item as ArmorItem;
        switch (a.slot) {
            case 'helmet':    return HelmIcon;
            case 'shoulders': return ShoulderIcon;
            case 'chest':     return ChestIcon;
            case 'gloves':    return GlovesIcon;
            case 'legs':      return LegsIcon;
            case 'boots':     return BootsIcon;
            case 'belt':      return BeltIcon;
            case 'ring':      return RingIcon;
            case 'amulet':    return AmuletIcon;
            case 'cloak':     return CloakIcon;
        }
    } else if (item.type === 'weapon') {
        const w = item as WeaponItem;
        switch (w.weaponClass) {
            case 'sword':  return SwordIcon;
            case 'dagger': return DaggerIcon;
            case 'shield': return ShieldIcon;
        }
    } else if (item.type === 'material') {
        if (item.materialKind === 'wood') return WoodIcon;
    }
    return SackIcon;
}

export type MenuItem = { pathName: string; labelKey: string; icon: string };
export type MenuGroup = { titleKey?: string; items: MenuItem[] };

import AnvilIcon from '@/assets/icons/menu/anvil.svg';
import BarracksTentIcon from '@/assets/icons/menu/barracks-tent.svg';
import CharacterIcon from '@/assets/icons/menu/character.svg';
import DungeonIcon from '@/assets/icons/menu/dungeon.svg';
import FurnaceIcon from '@/assets/icons/menu/furnace.svg';
import PickaxeIcon from '@/assets/icons/menu/pickaxe.svg';
import ScrollUnfurledIcon from '@/assets/icons/menu/scroll-unfurled.svg';
import ShopIcon from '@/assets/icons/menu/shop.svg';
import SwordClashIcon from '@/assets/icons/menu/sword-clash.svg';
import TiedScrollIcon from '@/assets/icons/menu/tied-scroll.svg';

export const MENU_GROUPS: MenuGroup[] = [
    {
        items: [
            { pathName: 'dashboard', labelKey: 'nav.dashboard', icon: ScrollUnfurledIcon },
            { pathName: 'character', labelKey: 'nav.character', icon: CharacterIcon },
            { pathName: 'shop',      labelKey: 'nav.shop',      icon: ShopIcon }
        ]
    },
    {
        titleKey: 'nav.groups.combat',
        items: [
            { pathName: 'arena',     labelKey: 'nav.arena',    icon: SwordClashIcon },
            { pathName: 'missions',  labelKey: 'nav.missions', icon: TiedScrollIcon },
            { pathName: 'dungeons',  labelKey: 'nav.dungeons', icon: DungeonIcon }
        ]
    },
    {
        titleKey: 'nav.groups.economy',
        items: [
            { pathName: 'gathering',  labelKey: 'nav.gathering',  icon: PickaxeIcon },
            { pathName: 'processing', labelKey: 'nav.processing', icon: FurnaceIcon },
            { pathName: 'crafting',   labelKey: 'nav.crafting',   icon: AnvilIcon }
        ]
    },
    {
        titleKey: 'nav.groups.social',
        items: [
            { pathName: 'guild', labelKey: 'nav.guild', icon: BarracksTentIcon }
        ]
    }
];
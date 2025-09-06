export type MenuItem = { pathName: string; labelKey: string; icon: string; activeTask: boolean; };
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
            { pathName: 'dashboard', labelKey: 'nav.dashboard', icon: ScrollUnfurledIcon, activeTask: false },
            { pathName: 'character', labelKey: 'nav.character', icon: CharacterIcon, activeTask: false },
            { pathName: 'shop',      labelKey: 'nav.shop',      icon: ShopIcon, activeTask: false }
        ]
    },
    {
        titleKey: 'nav.groups.combat',
        items: [
            { pathName: 'missions',  labelKey: 'nav.missions', icon: TiedScrollIcon, activeTask: true },
            { pathName: 'dungeons',  labelKey: 'nav.dungeons', icon: DungeonIcon, activeTask: false },
            { pathName: 'arena',     labelKey: 'nav.arena',    icon: SwordClashIcon, activeTask: false },
        ]
    },
    {
        titleKey: 'nav.groups.economy',
        items: [
            { pathName: 'gathering',  labelKey: 'nav.gathering',  icon: PickaxeIcon, activeTask: false },
            { pathName: 'processing', labelKey: 'nav.processing', icon: FurnaceIcon, activeTask: false },
            { pathName: 'crafting',   labelKey: 'nav.crafting',   icon: AnvilIcon, activeTask: false }
        ]
    },
    {
        titleKey: 'nav.groups.social',
        items: [
            { pathName: 'guild', labelKey: 'nav.guild', icon: BarracksTentIcon, activeTask: false }
        ]
    }
];
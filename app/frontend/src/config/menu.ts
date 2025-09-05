export type MenuItem = { path: string; label: string; icon: string };
export type MenuGroup = { title?: string; items: MenuItem[] };

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
    { items: [
            { path: '/game/dashboard', label: 'Dashboard', icon: ScrollUnfurledIcon },
            { path: '/game/character', label: 'Character', icon: CharacterIcon },
            { path: '/game/shop', label: 'Shop', icon: ShopIcon },
        ]},
    { title: 'Combat', items: [
            { path: '/game/arena', label: 'Arena (PvP)', icon: SwordClashIcon },
            { path: '/game/missions', label: 'Missions', icon: TiedScrollIcon },
            { path: '/game/dungeons', label: 'Dungeons', icon: DungeonIcon },
        ]},
    { title: 'Economy', items: [
            { path: '/game/gathering', label: 'Gathering', icon: PickaxeIcon },
            { path: '/game/processing', label: 'Processing', icon: FurnaceIcon },
            { path: '/game/crafting', label: 'Crafting', icon: AnvilIcon },
        ]},
    { title: 'Social', items: [
            { path: '/game/guild', label: 'Guild', icon: BarracksTentIcon },
        ]},
];
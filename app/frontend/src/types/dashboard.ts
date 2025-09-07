export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface PlayerSummary {
    nickname: string;
    level: number;
    ascend: number;
    gold: number;
    essence: number;
    fame: number;
    xp: { current: number; required: number; };
}

export interface Reward {
    kind: 'gold' | 'essence' | 'xp' | 'item';
    amount?: number;
    itemId?: string;
}

export type QuestKind = 'daily' | 'beginner';

export interface Quest {
    id: string;
    kind: 'daily' | 'beginner';
    titleKey: string;
    titleParams?: Record<string, any>;
    progress: number;
    goal: number;
    rewards: { kind: 'gold'|'xp'|'essence'; amount: number }[];
}

export interface ActivityLogEntry {
    id: string;
    time: string;
    icon: 'pickaxe' | 'scroll' | 'sword';
    textKey: string;
    textParams?: Record<string, string|number>;
}

export interface CurrentActivity {
    type: 'mission' | 'dungeon' | 'crafting';
    nameI18nKey: string;
    durationSec: number;
    remainingSec: number;
    progress: number; // 0..duration
    rewards: Reward[];
}

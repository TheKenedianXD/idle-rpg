import type { WeaponItem, Item } from "@/types/item";
import type { DerivedStats } from "@/types/item.ts";

export function calcItemStats(item: Item, derived: DerivedStats) {
    const up = item.upgrade ?? 0;
    const scale = 1 + up * 0.05;

    const result: any = { ...item };

    if ("armor" in item && item.armor) {
        result.armorScaled = Math.round(item.armor * scale);
    }

    if ("stats" in item && item.stats) {
        result.statsScaled = Object.fromEntries(
            Object.entries(item.stats).map(([k, v]) => [k, Math.round((v as number) * scale)])
        );
    }

    if (item.type === "weapon") {
        result.weaponStats = calcWeaponStats(item as WeaponItem, derived, scale);
    }

    return result;
}

export function calcWeaponStats(
    w: WeaponItem | undefined,
    derived: DerivedStats,
    scale = 1
) {
    if (!w || (w.minDmg === 0 && w.maxDmg === 0)) return null;

    const dmgBonus = Math.floor(derived.attackPower * 0.5);

    const min = Math.round((w.minDmg + dmgBonus) * scale);
    const max = Math.round((w.maxDmg + dmgBonus) * scale);
    const avg = ((w.minDmg + w.maxDmg) / 2 + dmgBonus) * scale;

    const baseSpeed = w.attackSpeed ?? 2.0;
    const finalSpeed = +(baseSpeed / (derived.attackSpeed ?? 1)).toFixed(2);

    return {
        baseMin: w.minDmg,
        baseMax: w.maxDmg,
        min,
        max,
        avg,
        attackSpeed: finalSpeed,
        dps: +(avg / finalSpeed).toFixed(2),
    };
}

import { getSpecies, movesForLevel } from '../data/species';
import { getMove } from '../data/moves';
import { typeEffectiveness } from '../data/typeChart';
import type { DVs, Monster, OwnedMove, StatBlock } from '../data/types';

export function hpDv(dvs: DVs): number {
  return (dvs.atk & 1) * 8 + (dvs.def & 1) * 4 + (dvs.spd & 1) * 2 + (dvs.spc & 1);
}
export function calculateMaxHP(base: number, dv: number, statExp: number, level: number): number {
  const expFactor = Math.floor(Math.ceil(Math.sqrt(statExp)) / 4);
  return Math.floor((((base + dv) * 2 + expFactor) * level) / 100) + level + 10;
}
export function calculateStat(base: number, dv: number, statExp: number, level: number): number {
  const expFactor = Math.floor(Math.ceil(Math.sqrt(statExp)) / 4);
  return Math.floor((((base + dv) * 2 + expFactor) * level) / 100) + 5;
}
export function randByte(): number { return Math.floor(Math.random() * 256); }
export function randomDvs(): DVs {
  return { atk: randByte() & 15, def: randByte() & 15, spd: randByte() & 15, spc: randByte() & 15 };
}
export function createMonster(speciesId: number, level: number, owned: boolean, nickname?: string): Monster {
  const species = getSpecies(speciesId);
  const dvs = randomDvs();
  const statExp: StatBlock = { hp: 0, attack: 0, defense: 0, speed: 0, special: 0 };
  const maxHp = calculateMaxHP(species.baseStats.hp, hpDv(dvs), statExp.hp, level);
  const ids = movesForLevel(speciesId, level);
  const fallback = species.learnset[0]?.moveId ?? 'TACKLE';
  const moves: OwnedMove[] = (ids.length ? ids : [fallback]).map((id) => {
    const def = getMove(id);
    return { id: def.id, pp: def.pp, maxPp: def.pp };
  });
  return {
    speciesId, nickname: nickname ?? species.name, level, hp: maxHp, maxHp, status: 'NONE',
    attack: calculateStat(species.baseStats.attack, dvs.atk, statExp.attack, level),
    defense: calculateStat(species.baseStats.defense, dvs.def, statExp.defense, level),
    speed: calculateStat(species.baseStats.speed, dvs.spd, statExp.speed, level),
    special: calculateStat(species.baseStats.special, dvs.spc, statExp.special, level),
    dvs, statExp, moves, isPlayerOwned: owned,
  };
}
export function stageMultiplier(stage: number): number {
  const s = Math.max(-6, Math.min(6, stage));
  return s >= 0 ? (2 + s) / 2 : 2 / (2 - s);
}
export function isPhysical(type: string): boolean {
  return ['NORMAL', 'FIGHTING', 'POISON', 'GROUND', 'FLYING', 'BUG', 'ROCK', 'GHOST'].includes(type);
}
export function rollCritical(baseSpeed: number, highCrit: boolean): boolean {
  const threshold = highCrit ? Math.min(255, baseSpeed * 4) : Math.floor(baseSpeed / 2);
  return randByte() < threshold;
}
export function calculateDamage(opts: {
  level: number; power: number; attack: number; defense: number;
  isStab: boolean; typeModifier: number; isCrit: boolean;
}): number {
  const effectiveLevel = opts.isCrit ? opts.level * 2 : opts.level;
  const levelFactor = Math.floor((2 * effectiveLevel) / 5 + 2);
  const baseDmg = Math.floor(Math.floor((levelFactor * opts.power * (opts.attack / Math.max(1, opts.defense))) / 50) + 2);
  const stabMult = opts.isStab ? 1.5 : 1.0;
  const randomModifier = Math.floor(Math.random() * (255 - 217 + 1)) + 217;
  return Math.max(1, Math.floor(baseDmg * stabMult * opts.typeModifier * (randomModifier / 255)));
}
export function typeModFor(moveType: string, defenderTypes: readonly string[]): number {
  return typeEffectiveness(moveType as never, defenderTypes as never);
}
export function attemptCapture(ballId: string, catchRate: number, currentHp: number, maxHp: number, status: Monster['status']) {
  const M = ballId === 'GREAT_BALL' ? 200 : ballId === 'ULTRA_BALL' ? 150 : 255;
  const r1 = Math.floor(Math.random() * (M + 1));
  const statusBonus = status === 'SLP' || status === 'FRZ' ? 25 : status === 'PSN' || status === 'BRN' || status === 'PAR' ? 12 : 0;
  if (r1 - statusBonus < 0) return { caught: true, shakes: 3 };
  const ballFactor = ballId === 'GREAT_BALL' ? 8 : 12;
  let F = Math.floor((maxHp * 255 * 4) / Math.max(1, currentHp * ballFactor));
  if (F > 255) F = 255;
  if (randByte() > F) return { caught: false, shakes: 0 };
  if (randByte() < catchRate) return { caught: true, shakes: 3 };
  if (F >= 170) return { caught: false, shakes: 2 };
  if (F >= 85) return { caught: false, shakes: 1 };
  return { caught: false, shakes: 0 };
}
export function xpForFaint(baseExp: number, foeLevel: number, trainer: boolean): number {
  return Math.max(1, Math.floor((baseExp * foeLevel * (trainer ? 1.5 : 1)) / 7));
}

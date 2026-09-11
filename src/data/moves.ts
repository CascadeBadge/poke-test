import type { MoveDef } from './types';

export const MOVES: Record<string, MoveDef> = {
  TACKLE: { id: 'TACKLE', name: 'TACKLE', type: 'NORMAL', power: 35, accuracy: 95, pp: 35 },
  SCRATCH: { id: 'SCRATCH', name: 'SCRATCH', type: 'NORMAL', power: 40, accuracy: 100, pp: 35 },
  GROWL: { id: 'GROWL', name: 'GROWL', type: 'NORMAL', power: 0, accuracy: 100, pp: 40, effect: 'STAT_DOWN_DEF' },
  TAIL_WHIP: { id: 'TAIL_WHIP', name: 'TAIL WHIP', type: 'NORMAL', power: 0, accuracy: 100, pp: 30, effect: 'STAT_DOWN_DEF' },
  EMBER: { id: 'EMBER', name: 'EMBER', type: 'FIRE', power: 40, accuracy: 100, pp: 25, effect: 'BURN', effectChance: 10 },
  WATER_GUN: { id: 'WATER_GUN', name: 'WATER GUN', type: 'WATER', power: 40, accuracy: 100, pp: 25 },
  VINE_WHIP: { id: 'VINE_WHIP', name: 'VINE WHIP', type: 'GRASS', power: 35, accuracy: 100, pp: 10 },
  LEECH_SEED: { id: 'LEECH_SEED', name: 'LEECH SEED', type: 'GRASS', power: 0, accuracy: 90, pp: 10, effect: 'HEAL' },
  THUNDERSHOCK: { id: 'THUNDERSHOCK', name: 'THUNDERSHOCK', type: 'ELECTRIC', power: 40, accuracy: 100, pp: 30, effect: 'PARALYZE', effectChance: 10 },
  QUICK_ATTACK: { id: 'QUICK_ATTACK', name: 'QUICK ATTACK', type: 'NORMAL', power: 40, accuracy: 100, pp: 30 },
  GUST: { id: 'GUST', name: 'GUST', type: 'FLYING', power: 40, accuracy: 100, pp: 35 },
  PECK: { id: 'PECK', name: 'PECK', type: 'FLYING', power: 35, accuracy: 100, pp: 35 },
  BITE: { id: 'BITE', name: 'BITE', type: 'NORMAL', power: 60, accuracy: 100, pp: 25, effect: 'FLINCH', effectChance: 10 },
  POISON_STING: { id: 'POISON_STING', name: 'POISON STING', type: 'POISON', power: 15, accuracy: 100, pp: 35, effect: 'POISON', effectChance: 20 },
  RAZOR_LEAF: { id: 'RAZOR_LEAF', name: 'RAZOR LEAF', type: 'GRASS', power: 55, accuracy: 95, pp: 25, highCrit: true },
  SLASH: { id: 'SLASH', name: 'SLASH', type: 'NORMAL', power: 70, accuracy: 100, pp: 20, highCrit: true },
};

export function getMove(id: string): MoveDef {
  return MOVES[id] ?? MOVES.TACKLE;
}

import type { Species } from './types';

export const SPECIES: Record<number, Species> = {
  1: { id: 1, name: 'BULBASAUR', types: ['GRASS', 'POISON'], baseStats: { hp: 45, attack: 49, defense: 49, speed: 45, special: 65 }, catchRate: 45, baseExpYield: 64, color: '#3fa66a', accent: '#1d5c3a', learnset: [{ level: 1, moveId: 'TACKLE' }, { level: 1, moveId: 'GROWL' }, { level: 7, moveId: 'LEECH_SEED' }, { level: 13, moveId: 'VINE_WHIP' }] },
  4: { id: 4, name: 'CHARMANDER', types: ['FIRE'], baseStats: { hp: 39, attack: 52, defense: 43, speed: 65, special: 50 }, catchRate: 45, baseExpYield: 65, color: '#e07030', accent: '#7a2a10', learnset: [{ level: 1, moveId: 'SCRATCH' }, { level: 1, moveId: 'GROWL' }, { level: 9, moveId: 'EMBER' }, { level: 17, moveId: 'SLASH' }] },
  7: { id: 7, name: 'SQUIRTLE', types: ['WATER'], baseStats: { hp: 44, attack: 48, defense: 65, speed: 43, special: 50 }, catchRate: 45, baseExpYield: 66, color: '#58a0d0', accent: '#1e4a78', learnset: [{ level: 1, moveId: 'TACKLE' }, { level: 1, moveId: 'TAIL_WHIP' }, { level: 8, moveId: 'WATER_GUN' }, { level: 15, moveId: 'BITE' }] },
  16: { id: 16, name: 'PIDGEY', types: ['NORMAL', 'FLYING'], baseStats: { hp: 40, attack: 45, defense: 40, speed: 56, special: 35 }, catchRate: 255, baseExpYield: 55, color: '#c8b070', accent: '#6a4e28', learnset: [{ level: 1, moveId: 'GUST' }, { level: 12, moveId: 'QUICK_ATTACK' }] },
  19: { id: 19, name: 'RATTATA', types: ['NORMAL'], baseStats: { hp: 30, attack: 56, defense: 35, speed: 72, special: 25 }, catchRate: 255, baseExpYield: 57, color: '#9070a0', accent: '#403050', learnset: [{ level: 1, moveId: 'TACKLE' }, { level: 1, moveId: 'TAIL_WHIP' }, { level: 7, moveId: 'QUICK_ATTACK' }] },
  21: { id: 21, name: 'SPEAROW', types: ['NORMAL', 'FLYING'], baseStats: { hp: 40, attack: 60, defense: 30, speed: 70, special: 31 }, catchRate: 255, baseExpYield: 58, color: '#b84830', accent: '#5a2010', learnset: [{ level: 1, moveId: 'PECK' }, { level: 1, moveId: 'GROWL' }] },
  25: { id: 25, name: 'PIKACHU', types: ['ELECTRIC'], baseStats: { hp: 35, attack: 55, defense: 30, speed: 90, special: 50 }, catchRate: 190, baseExpYield: 82, color: '#f0d030', accent: '#a07010', learnset: [{ level: 1, moveId: 'THUNDERSHOCK' }, { level: 1, moveId: 'GROWL' }, { level: 6, moveId: 'QUICK_ATTACK' }] },
  32: { id: 32, name: 'NIDORANM', types: ['POISON'], baseStats: { hp: 46, attack: 57, defense: 40, speed: 50, special: 40 }, catchRate: 235, baseExpYield: 60, color: '#7868b0', accent: '#302858', learnset: [{ level: 1, moveId: 'TACKLE' }, { level: 8, moveId: 'POISON_STING' }] },
};

export function getSpecies(id: number): Species {
  return SPECIES[id] ?? SPECIES[19];
}

const SAFE = new Set(Object.keys({
  TACKLE:1,SCRATCH:1,GROWL:1,TAIL_WHIP:1,EMBER:1,WATER_GUN:1,VINE_WHIP:1,LEECH_SEED:1,
  THUNDERSHOCK:1,QUICK_ATTACK:1,GUST:1,PECK:1,BITE:1,POISON_STING:1,RAZOR_LEAF:1,SLASH:1,
}));

export function movesForLevel(speciesId: number, level: number): string[] {
  const species = getSpecies(speciesId);
  const learned = species.learnset.filter((e) => e.level <= level && SAFE.has(e.moveId)).map((e) => e.moveId);
  const unique = [...new Set(learned)];
  return unique.slice(-4);
}

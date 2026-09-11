import type { ElementType } from './types';

const TYPES: ElementType[] = ['NORMAL','FIRE','WATER','GRASS','ELECTRIC','ICE','FIGHTING','POISON','GROUND','FLYING','PSYCHIC','BUG','ROCK','GHOST','DRAGON'];
const IDX = Object.fromEntries(TYPES.map((t, i) => [t, i])) as Record<ElementType, number>;

const CHART: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,0.5,0,1],
  [1,0.5,0.5,2,1,2,1,1,1,1,1,2,0.5,1,0.5],
  [1,2,0.5,0.5,1,1,1,1,2,1,1,1,2,1,0.5],
  [1,0.5,2,0.5,1,1,1,0.5,2,0.5,1,0.5,2,1,0.5],
  [1,1,2,0.5,0.5,1,1,1,0,2,1,1,1,1,0.5],
  [1,1,0.5,2,1,0.5,1,1,2,2,1,1,1,1,2],
  [2,1,1,1,1,2,1,0.5,1,0.5,0.5,0.5,2,0,1],
  [1,1,1,2,1,1,1,0.5,0.5,1,1,2,0.5,0.5,1],
  [1,2,1,0.5,2,1,1,2,1,0,1,0.5,2,1,1],
  [1,1,1,2,0.5,1,2,1,1,1,1,2,0.5,1,1],
  [1,1,1,1,1,1,2,2,1,1,0.5,1,1,1,1],
  [1,0.5,1,2,1,1,0.5,2,1,0.5,2,1,1,1,1],
  [1,2,1,1,1,2,0.5,1,0.5,2,1,2,1,1,1],
  [0,1,1,1,1,1,1,1,1,1,0,1,1,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
];

export function typeEffectiveness(moveType: ElementType, defenderTypes: readonly ElementType[]): number {
  return defenderTypes.reduce((acc, def) => acc * CHART[IDX[moveType]][IDX[def]], 1);
}

export function effectivenessText(mod: number): string | null {
  if (mod === 0) return "It doesn't affect the foe...";
  if (mod >= 2) return "It's super effective!";
  if (mod > 0 && mod < 1) return "It's not very effective...";
  return null;
}

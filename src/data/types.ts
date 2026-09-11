export type Facing = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type GameMode = 'OVERWORLD' | 'BATTLE' | 'MENU' | 'DIALOGUE' | 'TITLE';
export type Status = 'NONE' | 'SLP' | 'PSN' | 'BRN' | 'FRZ' | 'PAR';
export type MenuScreen = 'START' | 'BAG' | 'PARTY' | 'STATS' | 'SAVE' | 'OPTIONS';
export type BattlePhase =
  | 'INTRO' | 'WAITING_FOR_ACTION' | 'MOVE_SELECT' | 'ITEM_BAG' | 'PARTY_SWITCH'
  | 'EXECUTE' | 'FAINT' | 'CATCH' | 'VICTORY' | 'DEFEAT' | 'RUN_ATTEMPT';
export type ElementType =
  | 'NORMAL' | 'FIRE' | 'WATER' | 'GRASS' | 'ELECTRIC' | 'ICE' | 'FIGHTING'
  | 'POISON' | 'GROUND' | 'FLYING' | 'PSYCHIC' | 'BUG' | 'ROCK' | 'GHOST' | 'DRAGON';

export interface DVs { atk: number; def: number; spd: number; spc: number; }
export interface StatBlock { hp: number; attack: number; defense: number; speed: number; special: number; }
export interface MoveDef {
  id: string; name: string; type: ElementType; power: number; accuracy: number; pp: number;
  highCrit?: boolean; effect?: 'NONE' | 'BURN' | 'PARALYZE' | 'POISON' | 'FLINCH' | 'STAT_DOWN_DEF' | 'HEAL';
  effectChance?: number;
}
export interface Species {
  id: number; name: string; types: [ElementType] | [ElementType, ElementType];
  baseStats: StatBlock; catchRate: number; baseExpYield: number; color: string; accent: string;
  learnset: Array<{ level: number; moveId: string }>;
}
export interface OwnedMove { id: string; pp: number; maxPp: number; }
export interface Monster {
  speciesId: number; nickname: string; level: number; hp: number; maxHp: number; status: Status;
  attack: number; defense: number; speed: number; special: number; dvs: DVs; statExp: StatBlock;
  moves: OwnedMove[]; isPlayerOwned: boolean;
}
export interface ItemStack { itemId: string; quantity: number; }
export interface Warp {
  x: number; y: number; targetMapId: string; targetX: number; targetY: number; targetFacing: Facing;
}
export interface NpcDef {
  id: string; x: number; y: number; facing: Facing;
  sprite: 'oak' | 'mom' | 'rival' | 'clerk' | 'kid' | 'nurse' | 'sign';
  sightRange: number; isTrainer: boolean; dialogue: string[];
  interact?: 'STARTER' | 'HEAL' | 'MART' | 'SIGN' | 'TALK';
}
export interface EncounterSlot { speciesId: number; minLevel: number; maxLevel: number; weight: number; }
export interface MapData {
  id: string; name: string; width: number; height: number; tiles: number[]; collision: number[];
  warps: Warp[]; npcs: NpcDef[];
  connections?: {
    north?: { targetMapId: string; offset: number };
    south?: { targetMapId: string; offset: number };
    east?: { targetMapId: string; offset: number };
    west?: { targetMapId: string; offset: number };
  };
  wildEncounters?: { rate: number; slots: EncounterSlot[] };
}

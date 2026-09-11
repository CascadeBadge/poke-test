import { getMap } from '../data/maps';
import { getSpecies } from '../data/species';
import { createMonster } from './battleMath';
import { useEngineStore } from './state';
import { beginBattle } from './battle';
import { playSfx } from '../audio/sfx';

export function tryWildEncounter() {
  const store = useEngineStore.getState();
  if (!store.storyFlags.HAS_STARTER) return;
  if (store.party.every((p) => p.hp <= 0)) return;
  const table = getMap(store.currentMapId).wildEncounters;
  if (!table) return;
  if (Math.floor(Math.random() * 256) >= table.rate) return;
  const total = table.slots.reduce((s, sl) => s + sl.weight, 0);
  let pick = Math.random() * total;
  let slot = table.slots[0];
  for (const s of table.slots) {
    pick -= s.weight;
    if (pick <= 0) { slot = s; break; }
  }
  const level = slot.minLevel + Math.floor(Math.random() * (slot.maxLevel - slot.minLevel + 1));
  const wild = createMonster(slot.speciesId, level, false);
  playSfx('encounter');
  beginBattle(wild, true, [`Wild ${getSpecies(wild.speciesId).name} appeared!`]);
}

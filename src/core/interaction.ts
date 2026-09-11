import { facingTile, npcAt } from './collision';
import { beginBattle } from './battle';
import { addItem, giveStarter, healParty, useEngineStore } from './state';
import { createMonster } from './battleMath';
import { playSfx } from '../audio/sfx';

export const STARTER_OPTIONS = [
  { id: 1, name: 'BULBASAUR' },
  { id: 4, name: 'CHARMANDER' },
  { id: 7, name: 'SQUIRTLE' },
];

export function interactFacing() {
  const store = useEngineStore.getState();
  if (store.gameMode !== 'OVERWORLD') return;
  const front = facingTile(store.player.gridX, store.player.gridY, store.player.facing);
  const npc = npcAt(store.currentMapId, front.x, front.y);
  if (!npc) return;
  playSfx('confirm');
  if (npc.interact === 'STARTER') {
    if (store.storyFlags.HAS_STARTER) {
      store.setDialogue(['OAK: Your POKeMON is growing fine!', 'Wild POKeMON live in tall grass. Be careful.']);
      return;
    }
    store.setDialogue([...npc.dialogue, 'OAK: I have 3 rare POKeMON here.', 'You can have one. Choose carefully!']);
    store.setFlag('STARTER_PENDING', true);
    return;
  }
  if (npc.interact === 'HEAL') {
    healParty();
    playSfx('heal');
    useEngineStore.setState({ lastHealLocation: { mapId: store.currentMapId, x: store.player.gridX, y: store.player.gridY } });
    store.setDialogue([...npc.dialogue, 'Thank you for waiting.', 'Your POKeMON are fully healed.']);
    return;
  }
  if (npc.interact === 'MART') {
    if (!store.storyFlags.MART_GIFT) {
      addItem('POKE_BALL', 5); addItem('POTION', 2);
      store.setFlag('MART_GIFT', true);
      store.setDialogue([...npc.dialogue, 'Received 5 POKe BALLs and 2 POTIONs!']);
      return;
    }
    store.setDialogue(['Clerk: Stock is limited in this build.']);
    return;
  }
  store.setDialogue(npc.dialogue);
}

export function tryCompleteStarterSelect(index: number) {
  const store = useEngineStore.getState();
  if (!store.storyFlags.STARTER_PENDING || store.storyFlags.HAS_STARTER) return false;
  const pick = STARTER_OPTIONS[((index % 3) + 3) % 3];
  giveStarter(pick.id);
  const rivalId = pick.id === 4 ? 7 : pick.id === 7 ? 1 : 4;
  const rivalName = STARTER_OPTIONS.find((s) => s.id === rivalId)!.name;
  useEngineStore.setState((s) => ({
    storyFlags: { ...s.storyFlags, STARTER_PENDING: false, PENDING_RIVAL: true, [`RIVAL_SPECIES_${rivalId}`]: true },
  }));
  store.setDialogue([
    `OAK: So! You want ${pick.name}?`,
    `${store.playerName} received ${pick.name}!`,
    `RIVAL: I'll take ${rivalName} then!`,
    'RIVAL: Let me take you on, rookie!',
  ]);
  return true;
}

export function maybeStartRivalBattle() {
  const store = useEngineStore.getState();
  if (!store.storyFlags.PENDING_RIVAL) return;
  if (store.gameMode !== 'OVERWORLD') return;
  const rivalId = store.storyFlags.RIVAL_SPECIES_4 ? 4 : store.storyFlags.RIVAL_SPECIES_7 ? 7 : 1;
  store.setFlag('PENDING_RIVAL', false);
  const rivalMon = createMonster(rivalId, 5, false);
  beginBattle(rivalMon, false, [`RIVAL ${store.rivalName} wants to fight!`, `${store.rivalName} sent out ${rivalMon.nickname}!`]);
}

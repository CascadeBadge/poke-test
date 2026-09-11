import { useEngineStore } from './state';
import { playSfx } from '../audio/sfx';

const KEY = 'ACTIVE_SAVE_SLOT';

export function serializeSave() {
  const s = useEngineStore.getState();
  return JSON.stringify({
    v: 1, playerName: s.playerName, rivalName: s.rivalName, player: s.player,
    party: s.party, bag: s.bag, money: s.money, currentMapId: s.currentMapId,
    storyFlags: s.storyFlags, lastHealLocation: s.lastHealLocation,
  });
}
export function applySave(json: string) {
  const data = JSON.parse(json);
  useEngineStore.setState({
    playerName: data.playerName ?? 'RED', rivalName: data.rivalName ?? 'BLUE',
    player: { ...useEngineStore.getState().player, ...data.player, isMoving: false, pixelOffsetX: 0, pixelOffsetY: 0 },
    party: data.party ?? [], bag: data.bag ?? [], money: data.money ?? 0,
    currentMapId: data.currentMapId ?? 'PALLET_TOWN', storyFlags: data.storyFlags ?? {},
    lastHealLocation: data.lastHealLocation ?? { mapId: 'PLAYER_HOME', x: 4, y: 7 },
    gameMode: 'OVERWORLD', battle: null, activeDialogue: null,
  });
}
export function quickSave() {
  localStorage.setItem(KEY, serializeSave());
  playSfx('save');
  useEngineStore.getState().setToast('Game saved.');
}
export function loadSave(): boolean {
  const raw = localStorage.getItem(KEY);
  if (!raw) return false;
  try { applySave(raw); useEngineStore.getState().setToast('Save loaded.'); return true; }
  catch { return false; }
}
export function hasSave() { return !!localStorage.getItem(KEY); }

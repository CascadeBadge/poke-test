import type { Facing } from '../data/types';
import { getMap } from '../data/maps';
import { checkCollision, getTileFlag, COL } from './collision';
import { useEngineStore } from './state';
import { heldDirection } from './input';
import { tryWildEncounter } from './encounters';
import { playSfx } from '../audio/sfx';

let stepProgress = 0;
let currentDirection: Facing | null = null;

export function resetMovement() {
  stepProgress = 0;
  currentDirection = null;
}

function applyConnectionOrWarp(nextX: number, nextY: number) {
  const store = useEngineStore.getState();
  const map = getMap(store.currentMapId);
  const warp = map.warps.find((w) => w.x === nextX && w.y === nextY);
  if (warp) {
    playSfx('warp');
    store.setMap(warp.targetMapId);
    store.updatePlayerPosition(warp.targetX, warp.targetY, 0, 0, false);
    store.setFacing(warp.targetFacing);
    resetMovement();
    return true;
  }
  if (nextY < 0 && map.connections?.north) {
    const dest = getMap(map.connections.north.targetMapId);
    const x = nextX + map.connections.north.offset;
    store.setMap(dest.id);
    store.updatePlayerPosition(Math.max(0, Math.min(dest.width - 1, x)), dest.height - 1, 0, 0, false);
    resetMovement();
    return true;
  }
  if (nextY >= map.height && map.connections?.south) {
    const dest = getMap(map.connections.south.targetMapId);
    const x = nextX + map.connections.south.offset;
    store.setMap(dest.id);
    store.updatePlayerPosition(Math.max(0, Math.min(dest.width - 1, x)), 0, 0, false);
    resetMovement();
    return true;
  }
  return false;
}

export function processMovementTick() {
  const store = useEngineStore.getState();
  if (store.gameMode !== 'OVERWORLD' || store.paused) return;
  const pending = heldDirection();
  const { player, currentMapId } = store;
  if (player.isMoving && currentDirection) {
    stepProgress += player.stepSpeed;
    let offX = 0, offY = 0;
    if (currentDirection === 'UP') offY = -stepProgress;
    if (currentDirection === 'DOWN') offY = stepProgress;
    if (currentDirection === 'LEFT') offX = -stepProgress;
    if (currentDirection === 'RIGHT') offX = stepProgress;
    if (stepProgress >= 16) {
      let nextX = player.gridX, nextY = player.gridY;
      if (currentDirection === 'UP') nextY -= 1;
      if (currentDirection === 'DOWN') nextY += 1;
      if (currentDirection === 'LEFT') nextX -= 1;
      if (currentDirection === 'RIGHT') nextX += 1;
      if (applyConnectionOrWarp(nextX, nextY)) return;
      stepProgress = 0;
      currentDirection = null;
      store.updatePlayerPosition(nextX, nextY, 0, 0, false);
      if (getTileFlag(store.currentMapId, nextX, nextY) & COL.TALL) tryWildEncounter();
    } else {
      store.updatePlayerPosition(player.gridX, player.gridY, offX, offY, true);
    }
    return;
  }
  if (pending) {
    if (player.facing !== pending) store.setFacing(pending);
    let targetX = player.gridX, targetY = player.gridY;
    if (pending === 'UP') targetY -= 1;
    if (pending === 'DOWN') targetY += 1;
    if (pending === 'LEFT') targetX -= 1;
    if (pending === 'RIGHT') targetX += 1;
    if (!checkCollision(currentMapId, targetX, targetY, pending)) {
      currentDirection = pending;
      stepProgress = player.stepSpeed;
      store.updatePlayerPosition(player.gridX, player.gridY, 0, 0, true);
    }
  }
}

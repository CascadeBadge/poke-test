import { getMap, COL } from '../data/maps';
import type { Facing } from '../data/types';
export { COL };

export function tileIndex(width: number, x: number, y: number): number { return y * width + x; }
export function getTileFlag(mapId: string, x: number, y: number): number {
  const map = getMap(mapId);
  if (x < 0 || y < 0 || x >= map.width || y >= map.height) return COL.SOLID;
  return map.collision[tileIndex(map.width, x, y)] ?? COL.SOLID;
}
export function getTileId(mapId: string, x: number, y: number): number {
  const map = getMap(mapId);
  if (x < 0 || y < 0 || x >= map.width || y >= map.height) return 4;
  return map.tiles[tileIndex(map.width, x, y)] ?? 4;
}
export function npcAt(mapId: string, x: number, y: number) {
  return getMap(mapId).npcs.find((n) => n.x === x && n.y === y) ?? null;
}
export function checkCollision(mapId: string, targetX: number, targetY: number, dir: Facing): boolean {
  const map = getMap(mapId);
  if (npcAt(mapId, targetX, targetY)) return true;
  if (targetX < 0 || targetY < 0 || targetX >= map.width || targetY >= map.height) {
    const conn = map.connections;
    if (targetY < 0 && conn?.north) return false;
    if (targetY >= map.height && conn?.south) return false;
    if (targetX < 0 && conn?.west) return false;
    if (targetX >= map.width && conn?.east) return false;
    return true;
  }
  const flag = getTileFlag(mapId, targetX, targetY);
  if (flag & COL.SOLID) return true;
  if (flag & COL.WATER) return true;
  if (flag & COL.LEDGE_S) return dir !== 'DOWN';
  return false;
}
export function facingTile(x: number, y: number, facing: Facing) {
  if (facing === 'UP') return { x, y: y - 1 };
  if (facing === 'DOWN') return { x, y: y + 1 };
  if (facing === 'LEFT') return { x: x - 1, y };
  return { x: x + 1, y };
}

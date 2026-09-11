export interface ItemDef {
  id: string; name: string; pocket: 'ITEMS' | 'BALLS' | 'KEY';
  battleUse: boolean; fieldUse: boolean; description: string;
}
export const ITEMS: Record<string, ItemDef> = {
  POTION: { id: 'POTION', name: 'POTION', pocket: 'ITEMS', battleUse: true, fieldUse: true, description: 'Restores 20 HP of one monster.' },
  SUPER_POTION: { id: 'SUPER_POTION', name: 'SUPER POTION', pocket: 'ITEMS', battleUse: true, fieldUse: true, description: 'Restores 50 HP of one monster.' },
  POKE_BALL: { id: 'POKE_BALL', name: 'POKe BALL', pocket: 'BALLS', battleUse: true, fieldUse: false, description: 'A device for catching wild monsters.' },
  GREAT_BALL: { id: 'GREAT_BALL', name: 'GREAT BALL', pocket: 'BALLS', battleUse: true, fieldUse: false, description: 'A better ball with a higher catch rate.' },
  ANTIDOTE: { id: 'ANTIDOTE', name: 'ANTIDOTE', pocket: 'ITEMS', battleUse: true, fieldUse: true, description: 'Cures poison from one monster.' },
};
export function getItem(id: string): ItemDef { return ITEMS[id] ?? ITEMS.POTION; }
export function healAmount(itemId: string): number {
  if (itemId === 'SUPER_POTION') return 50;
  if (itemId === 'POTION') return 20;
  return 0;
}

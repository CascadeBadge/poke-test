import type { Facing } from '../data/types';
export type ButtonName = Facing | 'A' | 'B' | 'START' | 'SELECT' | 'L' | 'R';

const held = new Set<ButtonName>();
const pressed = new Set<ButtonName>();

const KEY_MAP: Record<string, ButtonName> = {
  ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT',
  KeyW: 'UP', KeyS: 'DOWN', KeyA: 'LEFT', KeyD: 'RIGHT',
  KeyZ: 'A', KeyX: 'B', Enter: 'A', Space: 'A', Backspace: 'B', Escape: 'B',
  KeyC: 'START', KeyV: 'START', ShiftLeft: 'SELECT',
};

export function installKeyboard() {
  const down = (e: KeyboardEvent) => {
    const btn = KEY_MAP[e.code];
    if (!btn) return;
    e.preventDefault();
    if (!held.has(btn)) pressed.add(btn);
    held.add(btn);
  };
  const up = (e: KeyboardEvent) => {
    const btn = KEY_MAP[e.code];
    if (!btn) return;
    e.preventDefault();
    held.delete(btn);
  };
  window.addEventListener('keydown', down);
  window.addEventListener('keyup', up);
  return () => {
    window.removeEventListener('keydown', down);
    window.removeEventListener('keyup', up);
  };
}
export function holdButton(btn: ButtonName, down: boolean) {
  if (down) {
    if (!held.has(btn)) pressed.add(btn);
    held.add(btn);
  } else held.delete(btn);
}
export function isHeld(btn: ButtonName) { return held.has(btn); }
export function justPressed(btn: ButtonName) { return pressed.has(btn); }
export function consumePress(btn: ButtonName) {
  const yes = pressed.has(btn);
  pressed.delete(btn);
  return yes;
}
export function heldDirection(): Facing | null {
  if (held.has('UP')) return 'UP';
  if (held.has('DOWN')) return 'DOWN';
  if (held.has('LEFT')) return 'LEFT';
  if (held.has('RIGHT')) return 'RIGHT';
  return null;
}
export function endInputFrame() { pressed.clear(); }

import { playArp, playNoise, playNote } from './synth';
export type SfxName = 'confirm'|'cancel'|'cursor'|'bump'|'warp'|'encounter'|'hit'|'super'|'weak'|'faint'|'heal'|'save'|'catch'|'run'|'menu';
export function playSfx(name: SfxName) {
  switch (name) {
    case 'confirm': playNote(880, 0.06, 0.07); playNote(1320, 0.08, 0.05); break;
    case 'cancel': playNote(220, 0.08, 0.06); break;
    case 'cursor': playNote(660, 0.03, 0.04); break;
    case 'bump': playNoise(0.04, 0.03); break;
    case 'warp': playArp([392, 523, 659, 784], 0.05, 0.05); break;
    case 'encounter': playArp([220, 196, 164, 130], 0.08, 0.08); break;
    case 'hit': playNoise(0.08, 0.07); playNote(180, 0.08, 0.05); break;
    case 'super': playArp([523, 659, 784], 0.06, 0.07); break;
    case 'weak': playNote(196, 0.12, 0.05); break;
    case 'faint': playArp([392, 349, 293, 220], 0.1, 0.07); break;
    case 'heal': playArp([523, 659, 784, 1046], 0.07, 0.06); break;
    case 'save': playArp([392, 523, 659, 784, 1046], 0.08, 0.06); break;
    case 'catch': playArp([523, 659, 784, 1046, 1318], 0.09, 0.07); break;
    case 'run': playNote(440, 0.05); playNote(330, 0.08); break;
    case 'menu': playNote(520, 0.04, 0.05); break;
  }
}

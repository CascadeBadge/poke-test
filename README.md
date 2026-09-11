# poke-test

Playable Gen 1–inspired Pokémon Red engine slice. Built from the project’s engine-core, battle-UI, world-map, and mobile virtual-controller specs.

Fan / educational recreation of mechanics and layout. Not affiliated with Nintendo or The Pokémon Company. No official ROM or sprite sheet is bundled.

## Play

```bash
npm install
npm run dev
```

Mobile handheld layout: 160×144 nearest-neighbor viewport on top, recessed D-Pad / A-B pod / turbo bar below.

### Controls

| Action | Keyboard | Touch |
| --- | --- | --- |
| Move | Arrows / WASD | D-Pad (drag between directions) |
| Confirm / talk | Z / Enter / Space | A |
| Cancel | X / Esc / Backspace | B |
| Start menu | C / V | menu button |
| Turbo | — | 1x 2x 3x 5x |
| Quick save | — | dock save |
| Load save | — | dock rewind |

## What works

- Pallet Town, Route 1, Viridian City plus interiors (homes, Oak’s Lab, Center, Mart)
- Grid movement with uninterruptible 16px steps, collision, south ledges, warps, map-edge connections
- Tall-grass wild encounters using a Gen 1-style rate roll
- Oak starter sequence + rival fight
- Battle command menu, 4-move select, items, run, party switch
- Gen 1 stat formula, damage formula (STAB, type chart, 217–255 random, crits from base Speed), capture algorithm
- Start menu, bag, party / stats, Center heal, Mart gift
- Web Audio SFX, localStorage quick-save

## How to start a run

1. Press A / Start on the title
2. Walk south into Oak’s Lab (red-roof building at the bottom of Pallet)
3. Talk to Oak, pick a partner with Left/Right + A
4. Beat the rival, then head north through Route 1 grass to Viridian

## Architecture

```
src/core     headless engine (state, loop, movement, battle math)
src/data     species, moves, type chart, maps
src/render   160×144 canvas tiles and HUDs
src/audio    Web Audio synth
src/components  Viewport + virtual controller
```

State lives in Zustand. The loop is a 60 Hz fixed accumulator scaled by the turbo multiplier so collisions stay tile-accurate at 2×/3×/5×.

import { useEffect } from 'react';
import { Controller } from './components/Controller';
import { Viewport } from './components/Viewport';
import { startEngineLoop, stopEngineLoop } from './core/engine';
import { installKeyboard } from './core/input';
import { getAudioContext } from './audio/synth';
import './app.css';

export default function App() {
  useEffect(() => {
    const unbind = installKeyboard();
    startEngineLoop();
    const unlock = () => getAudioContext();
    window.addEventListener('pointerdown', unlock, { once: true });
    return () => { unbind(); stopEngineLoop(); };
  }, []);

  return (
    <div className="shell">
      <div className="bezel">
        <div className="screen-wrap"><Viewport /></div>
        <div className="brand"><span>POKE TEST</span><span className="dot" /><span>GEN 1 ENGINE</span></div>
      </div>
      <Controller />
    </div>
  );
}

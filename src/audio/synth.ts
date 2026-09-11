let ctx: AudioContext | null = null;
export function getAudioContext(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}
export function playNote(freq: number, duration: number, volume = 0.08, type: OscillatorType = 'square') {
  const audioCtx = getAudioContext();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  gain.gain.setValueAtTime(volume, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
  osc.connect(gain); gain.connect(audioCtx.destination);
  osc.start(); osc.stop(audioCtx.currentTime + duration);
}
export function playNoise(duration: number, volume = 0.05) {
  const audioCtx = getAudioContext();
  const bufferSize = Math.floor(audioCtx.sampleRate * duration);
  const buffer = audioCtx.createBuffer(1, Math.max(1, bufferSize), audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(volume, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
  noise.connect(gain); gain.connect(audioCtx.destination); noise.start();
}
export function playArp(notes: number[], step = 0.07, volume = 0.07) {
  notes.forEach((n, i) => { window.setTimeout(() => playNote(n, step * 0.9, volume), i * step * 1000); });
}

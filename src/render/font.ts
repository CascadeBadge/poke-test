import { GB } from './palette';

export function drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color = GB.black, scale = 1) {
  ctx.fillStyle = color;
  ctx.font = `${8 * scale}px monospace`;
  ctx.textBaseline = 'top';
  ctx.fillText(text.toUpperCase(), x, y);
}

export function drawWindow(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.fillStyle = GB.white;
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = GB.black;
  ctx.fillRect(x, y, w, 2);
  ctx.fillRect(x, y + h - 2, w, 2);
  ctx.fillRect(x, y, 2, h);
  ctx.fillRect(x + w - 2, y, 2, h);
  ctx.fillStyle = GB.dark;
  ctx.fillRect(x + 2, y + 2, w - 4, 1);
  ctx.fillRect(x + 2, y + h - 3, w - 4, 1);
  ctx.fillRect(x + 2, y + 2, 1, h - 4);
  ctx.fillRect(x + w - 3, y + 2, 1, h - 4);
}

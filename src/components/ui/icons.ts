/**
 * Nombres válidos del sprite SVG (ver IconSprite.astro).
 * Para agregar un ícono nuevo: sumar el <symbol id="ic-..."> en IconSprite.astro
 * y su nombre acá.
 */
export const ICON_NAMES = [
  'bowl',
  'mug',
  'tray',
  'vase',
  'candle',
  'figure',
  'tag',
  'instagram',
  'tiktok',
  'youtube',
  'menu',
  'close',
  'arrow-left',
  'arrow-right',
] as const;

export type IconName = (typeof ICON_NAMES)[number];

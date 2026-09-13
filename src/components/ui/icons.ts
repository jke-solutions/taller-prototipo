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
  'wheel',
  'sketch',
  'tag',
  'instagram',
  'tiktok',
  'youtube',
  'whatsapp',
  'web',
  'menu',
  'close',
  'copy',
  'arrow-left',
  'arrow-right',
  'book',
  'heart',
  'minus',
  'plus',
  'check',
  'cart',
  'lock',
  'truck',
  'search',
  'box',
  'clock',
  'map-pin',
  'calendar',
  'users',
] as const;

export type IconName = (typeof ICON_NAMES)[number];

/**
 * Categorías del Home ("Explora por categoría").
 * Hardcodeado para el prototipo. Reemplazable por getCollection() / fetch al
 * CMS sin tocar los componentes: mismo shape de datos.
 *
 * Lista confirmada por el cliente: Cerámica, Madera, Piezas Mixtas, Kits.
 */
import type { IconName } from '@components/ui/icons';

export type BrandColor =
  | 'teal'
  | 'gold'
  | 'olive'
  | 'coral'
  | 'violet';

export interface Category {
  slug: string;
  name: string;
  description: string;
  /** Cantidad de piezas disponibles (texto "N piezas"). */
  pieces: number;
  /** Color de marca que tiñe el ícono y el acento de la tarjeta. */
  color: BrandColor;
  icon: IconName;
  href: string;
}

export const categories: Category[] = [
  {
    slug: 'ceramica',
    name: 'Cerámica',
    description: 'Piezas modeladas y esmaltadas una por una.',
    pieces: 31,
    color: 'teal',
    icon: 'bowl',
    href: '/catalogo/ceramica',
  },
  {
    slug: 'madera',
    name: 'Madera',
    description: 'Bandejas, cuencos y objetos torneados a mano.',
    pieces: 24,
    color: 'gold',
    icon: 'tray',
    href: '/catalogo/madera',
  },
  {
    slug: 'piezas-mixtas',
    name: 'Piezas Mixtas',
    description: 'Madera y cerámica combinadas en una sola pieza.',
    pieces: 14,
    color: 'olive',
    icon: 'vase',
    href: '/catalogo/piezas-mixtas',
  },
  {
    slug: 'kits',
    name: 'Kits',
    description: 'Sets de piezas combinadas, listos para regalar.',
    pieces: 8,
    color: 'violet',
    icon: 'tag',
    href: '/catalogo/kits',
  },
];

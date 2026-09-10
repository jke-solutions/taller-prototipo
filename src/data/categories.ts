/**
 * Categorías del Home ("Explora por categoría").
 * Hardcodeado para el prototipo. Reemplazable por getCollection() / fetch al
 * CMS sin tocar los componentes: mismo shape de datos.
 *
 * Lista confirmada por el cliente: Cerámica, Madera, Piezas Mixtas, Kits.
 * Cada categoría muestra su ilustración de la mascota Felipe (ya no íconos).
 */
import type { ImageMetadata } from 'astro';

// Ilustraciones por categoría (astro:assets las optimiza en build).
import ceramicaImg from '@assets/categorias/ceramica.png';
import maderaImg from '@assets/categorias/madera.png';
import piezasMixtasImg from '@assets/categorias/piezas-mixtas.png';
import kitsImg from '@assets/categorias/kits.png';

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
  /** Color de marca que tiñe el acento de la tarjeta (contador "N piezas"). */
  color: BrandColor;
  /** Ilustración de la categoría (mascota Felipe). Optimizada en build. */
  image: ImageMetadata;
  href: string;
}

export const categories: Category[] = [
  {
    slug: 'ceramica',
    name: 'Cerámica',
    description: 'Piezas modeladas y esmaltadas una por una.',
    pieces: 31,
    color: 'teal',
    image: ceramicaImg,
    href: '/catalogo/ceramica',
  },
  {
    slug: 'madera',
    name: 'Madera',
    description: 'Bandejas, cuencos y objetos torneados a mano.',
    pieces: 24,
    color: 'gold',
    image: maderaImg,
    href: '/catalogo/madera',
  },
  {
    slug: 'piezas-mixtas',
    name: 'Piezas Mixtas',
    description: 'Madera y cerámica combinadas en una sola pieza.',
    pieces: 14,
    color: 'olive',
    image: piezasMixtasImg,
    href: '/catalogo/piezas-mixtas',
  },
  {
    slug: 'kits',
    name: 'Kits',
    description: 'Sets de piezas combinadas, listos para regalar.',
    pieces: 8,
    color: 'violet',
    image: kitsImg,
    href: '/catalogo/kits',
  },
];

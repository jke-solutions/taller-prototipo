/**
 * Productos "En promoción" del Home.
 * `totalPromoCount` simula cuántos hay en total en el CMS: si es mayor que la
 * cantidad listada acá, el Home muestra el link "Ver todas".
 */
import type { ImageMetadata } from 'astro';
import type { IconName } from '@components/ui/icons';
import type { BrandColor } from './categories';

// Fotos reales descargadas a src/assets/promos/ (optimizadas en build por
// astro:assets). Una por producto, mapeadas por slug más abajo.
import cuencoDeRoble from '@assets/promos/cuenco-de-roble.jpg';
import tazaEsmaltadaAzotea from '@assets/promos/taza-esmaltada-azotea.jpg';
import bandejaDeNogal from '@assets/promos/bandeja-de-nogal.jpg';
import setDeCandeleros from '@assets/promos/set-de-candeleros.jpg';

export interface PromoProduct {
  slug: string;
  name: string;
  /** Nombre de categoría tal cual se muestra. */
  category: string;
  categoryColor: BrandColor;
  priceBefore: string;
  priceNow: string;
  /** Porcentaje de descuento (entero positivo). */
  discountPercent: number;
  icon: IconName;
  href: string;
  /** Foto local optimizada (astro:assets). Fallback al placeholder si falta. */
  image?: ImageMetadata;
}

export const promos: PromoProduct[] = [
  {
    slug: 'cuenco-de-roble',
    name: 'Cuenco de roble',
    category: 'Madera',
    categoryColor: 'gold',
    priceBefore: 'S/ 109.00',
    priceNow: 'S/ 89.00',
    discountPercent: 18,
    icon: 'bowl',
    href: '/catalogo/madera/cuenco-de-roble',
    image: cuencoDeRoble,
  },
  {
    slug: 'taza-esmaltada-azotea',
    name: 'Taza esmaltada Azotea',
    category: 'Cerámica',
    categoryColor: 'teal',
    priceBefore: 'S/ 90.00',
    priceNow: 'S/ 72.00',
    discountPercent: 20,
    icon: 'mug',
    href: '/catalogo/ceramica/taza-esmaltada-azotea',
    image: tazaEsmaltadaAzotea,
  },
  {
    slug: 'bandeja-de-nogal',
    name: 'Bandeja de nogal',
    category: 'Madera',
    categoryColor: 'gold',
    priceBefore: 'S/ 140.00',
    priceNow: 'S/ 120.00',
    discountPercent: 14,
    icon: 'tray',
    href: '/catalogo/madera/bandeja-de-nogal',
    image: bandejaDeNogal,
  },
  {
    slug: 'set-de-candeleros',
    name: 'Set de candeleros',
    category: 'Kits',
    categoryColor: 'violet',
    priceBefore: 'S/ 130.00',
    priceNow: 'S/ 98.00',
    discountPercent: 25,
    icon: 'candle',
    href: '/catalogo/kits/set-de-candeleros',
    image: setDeCandeleros,
  },
];

/** Simula el total en el CMS. Igual al listado => no se muestra "Ver todas". */
export const totalPromoCount = promos.length;

/**
 * Productos "En promoción" del Home.
 * `totalPromoCount` simula cuántos hay en total en el CMS: si es mayor que la
 * cantidad listada acá, el Home muestra el link "Ver todas".
 */
import type { IconName } from '@components/ui/icons';
import type { BrandColor } from './categories';

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
  },
  {
    slug: 'florero-pequeno',
    name: 'Florero pequeño',
    category: 'Cerámica',
    categoryColor: 'teal',
    priceBefore: 'S/ 70.00',
    priceNow: 'S/ 56.00',
    discountPercent: 20,
    icon: 'vase',
    href: '/catalogo/ceramica/florero-pequeno',
  },
];

/** Simula el total en el CMS. Igual al listado => no se muestra "Ver todas". */
export const totalPromoCount = promos.length;

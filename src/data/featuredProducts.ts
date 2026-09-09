/**
 * Productos destacados del Home.
 * Antes era un solo producto; ahora es un slider con varios (por ahora 3).
 * Reemplazable por getCollection() / fetch al CMS sin tocar los componentes.
 */
import type { IconName } from '@components/ui/icons';
import type { BrandColor } from './categories';

export interface ProductTag {
  label: string;
  variant: 'ceramica' | 'madera' | 'edicion';
}

export interface FeaturedProduct {
  slug: string;
  name: string;
  description: string;
  /** Precio formateado tal cual se muestra (incluye moneda). */
  price: string;
  tags: ProductTag[];
  icon: IconName;
  /** Color del placeholder mientras no hay foto real. */
  color: BrandColor;
  href: string;
}

export const featuredProducts: FeaturedProduct[] = [
  {
    slug: 'jarron-texturado-azotea',
    name: 'Jarrón texturado Azotea',
    description:
      'Pieza modelada a mano en gres, con textura de rayado orgánico y esmalte reactivo. Cada unidad sale distinta del horno — no hay dos iguales.',
    price: 'S/ 150.00',
    tags: [
      { label: 'Cerámica', variant: 'ceramica' },
      { label: 'Edición limitada', variant: 'edicion' },
    ],
    icon: 'vase',
    color: 'teal',
    href: '/catalogo/ceramica/jarron-texturado-azotea',
  },
  {
    slug: 'bandeja-nogal-curva',
    name: 'Bandeja de nogal curva',
    description:
      'Tallada de una sola pieza de nogal recuperado y terminada con aceite natural. Los nudos y vetas quedan a la vista: son parte del diseño.',
    price: 'S/ 180.00',
    tags: [{ label: 'Madera', variant: 'madera' }],
    icon: 'tray',
    color: 'gold',
    href: '/catalogo/madera/bandeja-nogal-curva',
  },
  {
    slug: 'kit-desayuno-azotea',
    name: 'Kit desayuno Azotea',
    description:
      'Taza de cerámica esmaltada + plato de madera torneada, combinados a mano. Llega en caja lista para regalar.',
    price: 'S/ 210.00',
    tags: [
      { label: 'Cerámica', variant: 'ceramica' },
      { label: 'Madera', variant: 'madera' },
    ],
    icon: 'mug',
    color: 'violet',
    href: '/catalogo/kits/kit-desayuno-azotea',
  },
];

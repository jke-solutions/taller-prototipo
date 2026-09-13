/**
 * Productos con detalle completo (página de producto).
 * Hardcodeado para el prototipo; mismos slugs/hrefs que `featuredProducts.ts`
 * para que los links del Home ya apunten a una página real.
 * Reemplazable por getCollection() / fetch al CMS sin tocar los componentes.
 *
 * Los 4 productos "En promoción" del Home (promos.ts) están acá también:
 * sin esto, sus links (`href`) no tenían página de detalle real y el
 * catálogo estático (getStaticPaths) los devolvía en 404. `priceBefore` /
 * `discountPercent` (opcionales) repiten el precio tachado y el badge "-X%"
 * de la tarjeta de promoción — no es un tag: un tag es material/subcategoría
 * (Cerámica, Madera, Edición limitada), "en promoción" es otra cosa y va
 * como bandera sobre la foto (ver ProductGallery.astro), no mezclado ahí.
 */
import type { IconName } from '@components/ui/icons';
import type { BrandColor } from './categories';
import type { ProductTag } from './featuredProducts';
import cuencoDeRoble from '@assets/promos/cuenco-de-roble.jpg';
import tazaEsmaltadaAzotea from '@assets/promos/taza-esmaltada-azotea.jpg';
import bandejaDeNogalPromo from '@assets/promos/bandeja-de-nogal.jpg';
import setDeCandeleros from '@assets/promos/set-de-candeleros.jpg';

export interface ProductColorOption {
  label: string;
  value: string;
}

/**
 * Una foto de la galería. `image` es opcional: sin foto real todavía se
 * muestra el Placeholder de marca (mismo patrón que el resto del sitio) con
 * `label` como leyenda, así el prototipo no depende de fotos que no existen.
 */
export interface ProductGalleryItem {
  label: string;
  image?: { src: string; alt: string };
}

export interface Product {
  slug: string;
  categorySlug: string;
  categoryName: string;
  name: string;
  price: string;
  /** Precio anterior (tachado). Solo en productos "en promoción". */
  priceBefore?: string;
  /** Porcentaje de descuento (entero positivo). Solo en productos "en promoción". */
  discountPercent?: number;
  tags: ProductTag[];
  icon: IconName;
  color: BrandColor;
  description: string;
  /** Bullet list de detalles/cuidados del producto. */
  details: string[];
  /**
   * Variaciones de color. Es opcional y dependiente del producto: no todos
   * los productos tienen color a elegir (por eso un dropdown y no un set
   * fijo de swatches — la cantidad y el significado del color cambia según
   * la pieza).
   */
  colors?: ProductColorOption[];
  gallery: ProductGalleryItem[];
  inStock: boolean;
  sku: string;
}

export const products: Product[] = [
  {
    slug: 'jarron-texturado-azotea',
    categorySlug: 'ceramica',
    categoryName: 'Cerámica',
    name: 'Jarrón texturado Azotea',
    price: 'S/ 150.00',
    tags: [
      { label: 'Cerámica', variant: 'ceramica' },
      { label: 'Edición limitada', variant: 'edicion' },
    ],
    icon: 'vase',
    color: 'teal',
    description:
      'Pieza modelada a mano en gres, con textura de rayado orgánico y esmalte reactivo. Cada unidad sale distinta del horno — no hay dos iguales.',
    details: [
      'Cerámica de alta temperatura (gres).',
      'Apta para agua fría/caliente y refrigeradora.',
      'No apta para microondas ni horno.',
      'Los colores pueden variar ligeramente frente a la foto: son piezas hechas y esmaltadas a mano.',
    ],
    colors: [
      { label: 'Verde azulado (teal)', value: 'teal' },
      { label: 'Mostaza', value: 'mostaza' },
      { label: 'Crudo natural', value: 'crudo' },
    ],
    gallery: [
      {
        label: 'Foto del jarrón',
        image: {
          src: 'https://images.unsplash.com/photo-1677761640321-b80251be00ca?auto=format&fit=crop&w=1200&q=80',
          alt: 'Jarrón de cerámica texturado sobre fondo neutro',
        },
      },
      { label: 'Detalle de la textura' },
      { label: 'Vista desde arriba' },
      { label: 'Color mostaza' },
    ],
    inStock: true,
    sku: 'AZ-CER-001',
  },
  {
    slug: 'bandeja-nogal-curva',
    categorySlug: 'madera',
    categoryName: 'Madera',
    name: 'Bandeja de nogal curva',
    price: 'S/ 180.00',
    tags: [{ label: 'Madera', variant: 'madera' }],
    icon: 'tray',
    color: 'gold',
    description:
      'Tallada de una sola pieza de nogal recuperado y terminada con aceite natural. Los nudos y vetas quedan a la vista: son parte del diseño.',
    details: [
      'Madera de nogal recuperada, pieza única (sin ensamblar).',
      'Terminado con aceite natural para uso alimentario.',
      'Lavar a mano y secar de inmediato — no apta para lavaplatos.',
      'Re-aceitar cada pocos meses para mantener el acabado.',
    ],
    gallery: [
      {
        label: 'Foto de la bandeja',
        image: {
          src: 'https://images.unsplash.com/photo-1638493446293-ee3d0d537e4c?auto=format&fit=crop&w=1200&q=80',
          alt: 'Bandeja y utensilios de madera torneada',
        },
      },
      { label: 'Detalle de la veta' },
      { label: 'Vista lateral' },
    ],
    inStock: true,
    sku: 'AZ-MAD-002',
  },
  {
    slug: 'kit-desayuno-azotea',
    categorySlug: 'kits',
    categoryName: 'Kits',
    name: 'Kit desayuno Azotea',
    price: 'S/ 210.00',
    tags: [
      { label: 'Cerámica', variant: 'ceramica' },
      { label: 'Madera', variant: 'madera' },
    ],
    icon: 'mug',
    color: 'violet',
    description:
      'Taza de cerámica esmaltada + plato de madera torneada, combinados a mano. Llega en caja lista para regalar.',
    details: [
      'Taza: cerámica de alta temperatura, apta para agua fría/caliente.',
      'Plato: madera torneada con aceite natural, lavar a mano.',
      'Incluye caja de regalo.',
      'Los colores pueden variar ligeramente frente a la foto.',
    ],
    colors: [
      { label: 'Violeta', value: 'violeta' },
      { label: 'Terracota', value: 'terracota' },
    ],
    gallery: [
      {
        label: 'Foto del kit',
        image: {
          src: 'https://images.unsplash.com/photo-1581559178851-b99664da71ba?auto=format&fit=crop&w=1200&q=80',
          alt: 'Set de vajilla de cerámica y madera para desayuno',
        },
      },
      { label: 'Vista de la caja' },
      { label: 'Color terracota' },
    ],
    inStock: false,
    sku: 'AZ-KIT-003',
  },
  {
    slug: 'cuenco-de-roble',
    categorySlug: 'madera',
    categoryName: 'Madera',
    name: 'Cuenco de roble',
    price: 'S/ 89.00',
    priceBefore: 'S/ 109.00',
    discountPercent: 18,
    tags: [{ label: 'Madera', variant: 'madera' }],
    icon: 'bowl',
    color: 'gold',
    description:
      'Cuenco torneado en una sola pieza de roble macizo, con un acabado natural que resalta la veta. Ideal para servir ensaladas o frutas, o como pieza decorativa sola.',
    details: [
      'Roble macizo torneado, pieza única.',
      'Terminado con aceite natural para uso alimentario.',
      'Lavar a mano y secar de inmediato — no apto para lavaplatos.',
      'Re-aceitar cada pocos meses para mantener el acabado.',
    ],
    gallery: [
      {
        label: 'Foto del cuenco',
        image: { src: cuencoDeRoble.src, alt: 'Cuenco de madera de roble sobre fondo neutro' },
      },
      { label: 'Detalle de la veta' },
      { label: 'Vista desde arriba' },
    ],
    inStock: true,
    sku: 'AZ-MAD-004',
  },
  {
    slug: 'taza-esmaltada-azotea',
    categorySlug: 'ceramica',
    categoryName: 'Cerámica',
    name: 'Taza esmaltada Azotea',
    price: 'S/ 72.00',
    priceBefore: 'S/ 90.00',
    discountPercent: 20,
    tags: [{ label: 'Cerámica', variant: 'ceramica' }],
    icon: 'mug',
    color: 'teal',
    description:
      'Taza de cerámica esmaltada a mano en gres de alta temperatura, con un esmalte reactivo que varía de pieza a pieza. Cómoda para el día a día.',
    details: [
      'Cerámica de alta temperatura (gres).',
      'Apta para microondas y lavavajillas.',
      'Capacidad aproximada: 300 ml.',
      'Los colores pueden variar ligeramente frente a la foto: son piezas esmaltadas a mano.',
    ],
    gallery: [
      {
        label: 'Foto de la taza',
        image: { src: tazaEsmaltadaAzotea.src, alt: 'Taza de cerámica esmaltada sobre fondo neutro' },
      },
      { label: 'Detalle del esmalte' },
    ],
    inStock: true,
    sku: 'AZ-CER-005',
  },
  {
    slug: 'bandeja-de-nogal',
    categorySlug: 'madera',
    categoryName: 'Madera',
    name: 'Bandeja de nogal',
    price: 'S/ 120.00',
    priceBefore: 'S/ 140.00',
    discountPercent: 14,
    tags: [{ label: 'Madera', variant: 'madera' }],
    icon: 'tray',
    color: 'gold',
    description:
      'Bandeja rectangular en madera de nogal recuperada, con asas talladas para facilitar el traslado. Perfecta para servir el café o como pieza decorativa.',
    details: [
      'Madera de nogal recuperada, pieza única.',
      'Terminado con aceite natural para uso alimentario.',
      'Lavar a mano y secar de inmediato — no apta para lavaplatos.',
      'Re-aceitar cada pocos meses para mantener el acabado.',
    ],
    gallery: [
      {
        label: 'Foto de la bandeja',
        image: { src: bandejaDeNogalPromo.src, alt: 'Bandeja rectangular de madera de nogal' },
      },
      { label: 'Detalle de las asas' },
    ],
    inStock: true,
    sku: 'AZ-MAD-006',
  },
  {
    slug: 'set-de-candeleros',
    categorySlug: 'kits',
    categoryName: 'Kits',
    name: 'Set de candeleros',
    price: 'S/ 98.00',
    priceBefore: 'S/ 130.00',
    discountPercent: 25,
    tags: [{ label: 'Cerámica', variant: 'ceramica' }],
    icon: 'candle',
    color: 'violet',
    description:
      'Set de dos candeleros de cerámica esmaltada, pensados para acompañar velas cónicas. Un pequeño gesto de luz para la mesa, hechos y esmaltados a mano.',
    details: [
      'Cerámica de alta temperatura (gres), esmaltada a mano.',
      'Incluye 2 candeleros (no incluye velas).',
      'Limpiar con un paño húmedo.',
      'Los colores pueden variar ligeramente frente a la foto.',
    ],
    gallery: [
      {
        label: 'Foto del set',
        image: { src: setDeCandeleros.src, alt: 'Set de candeleros de cerámica sobre fondo neutro' },
      },
      { label: 'Detalle del esmalte' },
    ],
    inStock: true,
    sku: 'AZ-KIT-007',
  },
];

export function getProduct(categorySlug: string, slug: string): Product | undefined {
  return products.find((p) => p.categorySlug === categorySlug && p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter(
    (p) => p.slug !== product.slug && p.categorySlug === product.categorySlug
  );
  const others = products.filter(
    (p) => p.slug !== product.slug && p.categorySlug !== product.categorySlug
  );
  return [...sameCategory, ...others].slice(0, limit);
}

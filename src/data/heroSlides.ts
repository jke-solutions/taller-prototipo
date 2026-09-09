/**
 * Slides del slider tipo "revista/moda" que va al tope del Home (reemplaza al
 * Hero estático). Texto de ejemplo — reemplazable por el CMS.
 *
 * `image` es una clave; el mapeo clave -> archivo importado vive en
 * HeroSlider.astro (Astro necesita el import estático para optimizar).
 */
export interface HeroSlide {
  image: 'productos' | 'taller';
  /** Texto corto en mayúsculas del recuadro sobre el título. */
  badge: string;
  title: string;
  subtitle: string;
  cta: { label: string; href: string };
  /** alt de la foto de fondo. */
  alt: string;
}

export const heroSlides: HeroSlide[] = [
  {
    image: 'productos',
    badge: 'Nueva colección',
    title: 'Hecho a mano, pieza por pieza',
    subtitle:
      'Cerámica esmaltada y madera torneada en la azotea. Cada objeto sale distinto del horno: no hay dos iguales.',
    cta: { label: 'Ver el catálogo', href: '/catalogo' },
    alt: 'Mesa del taller cubierta de tazas y cuencos de cerámica recién esmaltados.',
  },
  {
    image: 'taller',
    badge: 'Conocé el taller',
    title: 'Dos personas, una azotea, mucho barro',
    subtitle:
      'Así nace cada pieza de Taller Azotea: entre aserrín, arcilla y el tiempo que toma hacer las cosas bien.',
    cta: { label: 'Conocer nuestra historia', href: '/nosotros' },
    alt: 'Alfarero moldeando un jarrón en el torno dentro del taller.',
  },
];

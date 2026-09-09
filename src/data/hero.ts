/**
 * Contenido del Hero del Home.
 *
 * NOTA: este Hero estático de dos columnas es provisional. Según el brief será
 * reemplazado por el "Slider tipo revista" cuando el cliente confirme la
 * ubicación y envíe las fotos. Mientras tanto ocupa el tope del Home.
 */
import type { IconName } from '@components/ui/icons';

export interface HeroCta {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}

export interface HeroContent {
  title: string;
  body: string;
  ctas: HeroCta[];
  /** Placeholder de imagen mientras no hay foto real. */
  image: { icon: IconName; label: string };
}

export const hero: HeroContent = {
  title: 'Objetos hechos a mano para acompañar lo cotidiano.',
  body: 'En Taller Azotea transformamos materiales en objetos únicos. Combinamos madera recuperada, cerámica y mucha curiosidad para crear piezas pensadas para usar, regalar y disfrutar.',
  ctas: [
    { label: 'Ver productos', href: '/catalogo', variant: 'primary' },
    { label: 'Conocer el taller', href: '/nosotros', variant: 'secondary' },
  ],
  image: { icon: 'vase', label: 'Foto del taller' },
};

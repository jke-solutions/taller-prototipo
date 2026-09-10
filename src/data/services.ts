/**
 * Sección "Servicios" del Home.
 * Dos entradas fijas por ahora (Cursos y Talleres / Trabajos Personalizados);
 * cada una linkea a su propia página. Reemplazable por getCollection() / CMS
 * sin tocar los componentes.
 */
import type { IconName } from '@components/ui/icons';

export interface ServiceItem {
  slug: string;
  /** Título tal cual se muestra. */
  title: string;
  /** Rótulo corto sobre el título. */
  kicker: string;
  /** Una línea, invita a entrar a la sección. */
  description: string;
  /** Texto del botón. */
  cta: string;
  href: string;
  /** Ícono de reserva del placeholder mientras la foto no cargó. */
  icon: IconName;
  /** Tinte del placeholder / acento del kicker (brief → paleta). */
  color: 'teal' | 'gold';
  /**
   * Foto servida desde URL externa (Unsplash por ahora, carga diferida por
   * scroll vía LazyImage). Reemplazar por fotos propias del taller cuando estén.
   */
  image?: { src: string; alt: string };
}

export const services: ServiceItem[] = [
  {
    slug: 'cursos-y-talleres',
    title: 'Cursos y Talleres',
    kicker: 'Formación',
    description: 'Sumate a una clase en la azotea y llevate tu propia pieza.',
    cta: 'Ver cursos y talleres',
    href: '/servicios/cursos-y-talleres',
    icon: 'wheel',
    color: 'teal',
    image: {
      src: 'https://images.unsplash.com/photo-1595351298020-038700609878?auto=format&fit=crop&w=1200&q=80',
      alt: 'Manos moldeando una pieza de arcilla en el torno de alfarería',
    },
  },
  {
    slug: 'trabajos-personalizados',
    title: 'Trabajos Personalizados',
    kicker: 'A medida',
    description: 'Encargá piezas a medida para tu casa, tu negocio o para regalar.',
    cta: 'Enviar una solicitud',
    href: '/servicios/trabajos-personalizados',
    icon: 'sketch',
    color: 'gold',
    image: {
      src: 'https://images.unsplash.com/photo-1577576223085-3eb295cd414f?auto=format&fit=crop&w=1200&q=80',
      alt: 'Conjunto de cuencos de cerámica hechos a mano sobre una mesa',
    },
  },
];

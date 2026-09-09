/**
 * Contenido de la sección "Conoce el taller" del Home.
 */
export interface StoryContent {
  eyebrow: string;
  title: string;
  paragraph: string;
  cta: { label: string; href: string };
  /** Imagen del taller. Por ahora se usa la mascota Felipe sobre fondo crema. */
  image: { src: string; alt: string };
}

export const story: StoryContent = {
  eyebrow: 'Conoce el taller',
  title: 'Somos dos personas y una azotea llena de aserrín y arcilla.',
  paragraph: 'Cada pieza pasa por nuestras manos antes de llegar a las tuyas.',
  cta: { label: 'Conocer nuestra historia', href: '/nosotros' },
  image: { src: '/felipe-logo.svg', alt: 'Felipe, la mascota del Taller Azotea' },
};

/**
 * Configuración global del sitio. Hardcodeado para el prototipo; el día de
 * mañana esto puede salir de un archivo de config del CMS.
 */
export interface SiteConfig {
  name: string;
  shortDescription: string;
  /** Se usa como <title> por defecto y sufijo de las páginas internas. */
  titleTemplate: string;
  defaultDescription: string;
  /** Placeholder de og:image mientras no haya arte real. */
  ogImage: string;
  social: { label: string; icon: string; href: string }[];
}

export const site: SiteConfig = {
  name: 'Taller Azotea',
  shortDescription:
    'Objetos hechos a mano para acompañar lo cotidiano. Trabajamos madera recuperada y cerámica desde Lima.',
  titleTemplate: '%s — Taller Azotea',
  defaultDescription:
    'Taller Azotea: objetos hechos a mano en madera recuperada y cerámica. Piezas únicas para usar, regalar y disfrutar.',
  ogImage: '/felipe-logo.svg',
  social: [
    // TODO: el cliente todavía debe pasar los links reales de redes.
    { label: 'Instagram', icon: 'instagram', href: '#' },
    { label: 'TikTok', icon: 'tiktok', href: '#' },
    { label: 'YouTube', icon: 'youtube', href: '#' },
  ],
};

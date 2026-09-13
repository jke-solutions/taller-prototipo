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
  /**
   * Correo donde debe llegar el Libro de Reclamaciones (y contacto general)
   * mientras el sitio no tenga backend propio. TODO: el cliente todavía debe
   * confirmar el correo real de atención al consumidor — este es genérico.
   */
  contactEmail: string;
  /** Número de WhatsApp de contacto (mostrado en la página de Contacto). */
  whatsappNumber: string;
  /** Link directo de WhatsApp (wa.me), con el número en formato internacional. */
  whatsappHref: string;
  /** Handle de Instagram mostrado en Contacto (ej. "@tallerazotea"). */
  instagramHandle: string;
  /** Dominio mostrado en Contacto (sin protocolo). */
  websiteLabel: string;
  websiteHref: string;
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
  contactEmail: 'reclamos@tallerazotea.com',
  whatsappNumber: '922 567 282',
  whatsappHref: 'https://wa.me/51922567282',
  instagramHandle: '@tallerazotea',
  websiteLabel: 'www.tallerazotea.com',
  websiteHref: 'https://www.tallerazotea.com',
  social: [
    { label: 'Instagram', icon: 'instagram', href: 'https://instagram.com/tallerazotea' },
    // TODO: el cliente todavía debe pasar los links reales de TikTok y YouTube.
    { label: 'TikTok', icon: 'tiktok', href: '#' },
    { label: 'YouTube', icon: 'youtube', href: '#' },
  ],
};

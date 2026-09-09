/**
 * Navegación principal (header) y links de ayuda (footer).
 * Rutas placeholder: todavía no existen esas páginas.
 */
export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: 'Catálogo', href: '/catalogo' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Contacto', href: '/contacto' },
];

export const helpNav: NavItem[] = [
  { label: 'Preguntas frecuentes', href: '/preguntas-frecuentes' },
  { label: 'Envíos y devoluciones', href: '/envios-y-devoluciones' },
];

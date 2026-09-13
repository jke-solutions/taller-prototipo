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
  { label: 'Seguimiento de pedido', href: '/seguimiento' },
  { label: 'Preguntas frecuentes', href: '/preguntas-frecuentes' },
  { label: 'Envíos y devoluciones', href: '/envios-y-devoluciones' },
];

/**
 * Libro de Reclamaciones Virtual — obligatorio en Perú para todo negocio
 * que atiende consumidores (INDECOPI, D.S. 101-2022-PCM). Debe estar
 * accesible desde un link/botón claramente identificable; se muestra
 * aparte del resto de "Ayuda" para que resalte. Ruta placeholder: falta
 * el formulario/proveedor real del libro de reclamaciones.
 */
export const libroDeReclamaciones: NavItem = {
  label: 'Libro de Reclamaciones',
  href: '/libro-de-reclamaciones',
};

/** Links legales de la barra inferior del footer. Rutas placeholder. */
export const legalNav: NavItem[] = [
  { label: 'Términos y condiciones', href: '/terminos-y-condiciones' },
  { label: 'Política de privacidad', href: '/politica-de-privacidad' },
  { label: 'Política de cookies', href: '/politica-de-cookies' },
];

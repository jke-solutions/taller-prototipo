/**
 * Animación de entrada a la página: a diferencia de [data-reveal]
 * (scrollReveal.ts, que solo anima con el scroll y nunca al cargar), esto
 * dispara una sola vez apenas monta el contenido — para el bloque que ya
 * está a la vista sin scrollear (ej. la galería + info del producto).
 *
 * Markup: contenedor con [data-enter], opcionalmente con descendientes
 * directos [data-enter-child] para escalonar la entrada (mismo patrón que
 * data-reveal-child). El CSS vive en src/styles/global.css.
 */
export function initPageEnter(root: ParentNode = document): void {
  const targets = [...root.querySelectorAll<HTMLElement>('[data-enter]')];
  if (targets.length === 0) return;

  targets.forEach((el) => {
    el.querySelectorAll<HTMLElement>(':scope > [data-enter-child]').forEach((child, i) => {
      child.style.setProperty('--i', String(i));
    });
  });

  // Un tick fuera del actual: deja pintar el estado inicial (opacity:0)
  // antes de agregar el atributo que dispara la transición — si no, el
  // navegador puede aplicar ambos estados en el mismo frame y saltarse la
  // animación. setTimeout (a diferencia de requestAnimationFrame) sigue
  // disparando aunque la pestaña esté en segundo plano.
  window.setTimeout(() => {
    targets.forEach((el) => el.setAttribute('data-entered', ''));
  }, 30);
}

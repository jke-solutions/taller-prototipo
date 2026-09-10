/**
 * Reveal por scroll: las secciones NO animan al cargar la página, recién se
 * muestran (fade + translateY corto) cuando entran en el viewport — y se
 * ocultan de nuevo al salir, para volver a animar cada vez que se re-entra,
 * tanto bajando como subiendo el scroll (toggle, no "una sola vez").
 *
 * Markup: contenedor con [data-reveal] (opcionalmente con descendientes
 * [data-reveal-child] para escalonar la entrada, ej. tarjetas de un grid).
 * [data-reveal-child] no necesita ser hijo directo: puede ir en la tarjeta
 * real aunque quede envuelta en un div "display:contents" (sm:contents /
 * md:contents de los carruseles responsive) — ese wrapper no puede animar
 * su propia opacidad porque no genera caja. En ese caso conviene fijar
 * `--i` a mano en el propio componente (ej. CategoryCard, PromoCard) en vez
 * de depender del auto-asignado de acá, que solo mira hijos DIRECTOS.
 * El CSS real vive en src/styles/global.css bajo la clase `.js` del <html>
 * (así, sin JS, todo el contenido queda visible de entrada).
 */
export function initScrollReveal(
  root: ParentNode = document,
  rootMargin = '-10% 0px -10% 0px'
): void {
  const targets = [...root.querySelectorAll<HTMLElement>('[data-reveal]')];
  if (targets.length === 0) return;

  // Asigna el índice de escalonado a los hijos directos marcados.
  targets.forEach((el) => {
    el.querySelectorAll<HTMLElement>(':scope > [data-reveal-child]').forEach((child, i) => {
      child.style.setProperty('--i', String(i));
    });
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.setAttribute('data-revealed', ''));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Toggle (no "una sola vez"): entra -> anima, sale -> vuelve a su
        // estado inicial, así se repite tanto bajando como subiendo el scroll.
        entry.target.toggleAttribute('data-revealed', entry.isIntersecting);
      });
    },
    { threshold: 0.15, rootMargin }
  );

  targets.forEach((el) => io.observe(el));
}

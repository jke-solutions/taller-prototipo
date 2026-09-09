/**
 * Carrusel responsive reutilizable.
 *
 * Idea: en desktop el contenedor es un grid normal; por debajo del breakpoint
 * (`data-bp`, en px) se comporta como slider horizontal con scroll-snap y
 * autoplay. El swipe táctil lo maneja el navegador (CSS), el JS solo agrega
 * autoplay pausable y sincroniza los puntos.
 *
 * Markup esperado dentro del root [data-rcarousel]:
 *   [data-track]  contenedor flex/grid
 *   [data-slide]  cada slide (en desktop suele ser display:contents)
 *   [data-dot]    (opcional) un botón por slide, visibles solo en modo slider
 *
 * Atributos del root:
 *   data-bp        breakpoint en px (ej. 768). Debajo de esto = modo slider.
 *   data-interval  ms de autoplay (default 5000). 0 = sin autoplay.
 */
export function initResponsiveCarousel(root: HTMLElement): void {
  if (root.dataset.rcInit) return; // evita doble init si se llama más de una vez
  root.dataset.rcInit = '1';

  const track = root.querySelector<HTMLElement>('[data-track]');
  const slides = [...root.querySelectorAll<HTMLElement>('[data-slide]')];
  const dots = [...root.querySelectorAll<HTMLButtonElement>('[data-dot]')];
  if (!track || slides.length < 2) return;

  const bp = Number(root.dataset.bp || '768');
  const interval = Number(root.dataset.interval ?? '5000');
  const mql = window.matchMedia(`(max-width: ${bp - 0.02}px)`);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let current = 0;
  let timer = 0;
  let inView = false;

  const isSlider = () => mql.matches;

  const setActive = (i: number) => {
    current = i;
    dots.forEach((d, di) => {
      d.toggleAttribute('data-active', di === i);
      d.style.width = di === i ? '20px' : '7px';
    });
  };

  const goTo = (i: number) => {
    const target = (i + slides.length) % slides.length;
    const left = slides[target].offsetLeft - slides[0].offsetLeft;
    track.scrollTo({ left, behavior: reduceMotion ? 'auto' : 'smooth' });
    setActive(target);
  };

  const stop = () => {
    window.clearInterval(timer);
    timer = 0;
  };
  const start = () => {
    stop();
    if (!isSlider() || interval <= 0 || reduceMotion || !inView) return;
    timer = window.setInterval(() => goTo(current + 1), interval);
  };
  const bump = () => {
    stop();
    window.setTimeout(start, 6000);
  };

  dots.forEach((d, i) =>
    d.addEventListener('click', () => {
      goTo(i);
      bump();
    })
  );
  track.addEventListener('pointerdown', bump);
  track.addEventListener('mouseenter', stop);
  track.addEventListener('mouseleave', start);

  // Punto activo según scroll (rAF para no saturar en touch).
  let raf = 0;
  track.addEventListener('scroll', () => {
    if (!isSlider()) return;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const i = Math.round(track.scrollLeft / (track.clientWidth * 0.82));
      const clamped = Math.max(0, Math.min(slides.length - 1, i));
      if (clamped !== current) setActive(clamped);
    });
  });

  // Solo corre el autoplay cuando la sección está en pantalla.
  new IntersectionObserver(
    (entries) => {
      inView = entries[0].isIntersecting;
      inView ? start() : stop();
    },
    { threshold: 0.2 }
  ).observe(root);

  // Reaccionar al cambio de tamaño (rotación / resize).
  mql.addEventListener('change', () => {
    stop();
    if (isSlider()) {
      track.scrollTo({ left: 0, behavior: 'auto' });
      setActive(0);
      start();
    }
  });

  setActive(0);
}

export function initAllResponsiveCarousels(): void {
  document
    .querySelectorAll<HTMLElement>('[data-rcarousel]')
    .forEach((el) => initResponsiveCarousel(el));
}

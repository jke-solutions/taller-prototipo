/**
 * Carga diferida de imágenes por observador de scroll.
 *
 * Pensado para cuando las fotos vengan de un CDN / URL remota: el espacio ya
 * queda reservado por el contenedor (aspect-ratio), así el layout no salta, y
 * la imagen recién se descarga cuando está por entrar en pantalla. En mobile
 * esto evita que la primera pintura espere a todas las fotos.
 *
 * Markup: <img data-lazy-src="..." [data-lazy-srcset="..."] ... >
 * dentro de un contenedor con la proporción ya fijada.
 */
export function initLazyMedia(
  target: ParentNode | Document = document,
  rootMargin = '300px'
): void {
  const imgs = [...target.querySelectorAll<HTMLImageElement>('img[data-lazy-src]')];
  if (imgs.length === 0) return;

  const load = (img: HTMLImageElement) => {
    const { lazySrc, lazySrcset } = img.dataset;
    if (lazySrcset) img.srcset = lazySrcset;
    if (lazySrc) img.src = lazySrc;
    img.removeAttribute('data-lazy-src');
    img.removeAttribute('data-lazy-srcset');
    img.addEventListener(
      'load',
      () => img.setAttribute('data-loaded', ''),
      { once: true }
    );
  };

  // Sin soporte de IO: cargar todo de una.
  if (!('IntersectionObserver' in window)) {
    imgs.forEach(load);
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        load(entry.target as HTMLImageElement);
        obs.unobserve(entry.target);
      });
    },
    { rootMargin }
  );

  imgs.forEach((img) => io.observe(img));
}

# Brief para Claude Code — Prototipo Home "Taller Azotea" en Astro

## Objetivo
Construir un **prototipo visual navegable** de la página Home de Taller Azotea en **Astro**, para que el cliente pueda revisar y aprobar el diseño antes de pasar a producción.

**Esto NO es el sitio final.** No hay backend, no hay CMS, no hay carrito funcional. Todo el contenido va **hardcodeado** directamente en los componentes, usando datos de ejemplo (los que aparecen abajo).

Más adelante el sitio real se conectará a un **CMS propio sobre Astro** (probablemente Astro Content Collections o un headless CMS externo) — así que aunque el contenido va hardcodeado ahora, conviene estructurar los componentes recibiendo **props** (no texto quemado dentro del JSX/Astro directamente), para que el día de mañana sea fácil reemplazar el arreglo de datos hardcodeado por un `getCollection()` o fetch a la API del CMS, sin tener que rehacer los componentes.

## Alcance de este prototipo
- Solo la página **Home**.
- Sin rutas de producto individuales, sin checkout, sin autenticación.
- Los botones y links pueden apuntar a `#` o a rutas placeholder (`/tienda`, `/nosotros`, etc.) sin que existan esas páginas todavía.
- Responsive: mobile + desktop (el diseño ya contempla ambos).

## Diseño de referencia
El diseño fue aprobado como archivo HTML estático adjunto: `taller-azotea-Variacion-6-Imagen-categorias-full.html`. Ábrelo en el navegador como referencia visual pixel-a-pixel — el prototipo en Astro debe verse idéntico a ese archivo.

## Stack técnico
- **Astro** como framework base, con arquitectura de islas (0 JS por defecto salvo donde se indique explícitamente).
- **Tailwind CSS** para todos los estilos (`@astrojs/tailwind`). Genera tú mismo el `tailwind.config.mjs` cargando los colores, la fuente y el `border-radius` de la sección "Design tokens" de abajo como `theme.extend` — no hace falta que venga pre-armado.
- **JavaScript vanilla**, sin librerías ni frameworks de UI (nada de React/Vue/Alpine). La única interactividad real de este Home es:
  - El scroll horizontal de "En promoción" — resolver con CSS `scroll-snap` en lo posible; si hace falta JS para los botones de flecha, un `<script>` de pocas líneas en el propio componente Astro alcanza.
  - El menú mobile (si se implementa como hamburguesa) — mismo criterio, JS vanilla mínimo.
- No agregar dependencias de UI adicionales sin que se justifique una necesidad concreta.

## No indexar en buscadores (todavía)
Este prototipo **no debe ser indexado ni aparecer en buscadores** mientras esté en fase de revisión con el cliente y no esté conectado al CMS definitivo. Implementar:
1. En el `<head>` del layout base: `<meta name="robots" content="noindex, nofollow">`.
2. Un `public/robots.txt` con:
   ```
   User-agent: *
   Disallow: /
   ```
3. Dejar ambas cosas **claramente comentadas** en el código (ej. `<!-- TODO: quitar noindex/robots.txt cuando el sitio esté aprobado por el cliente y conectado al CMS final -->`) para que no se queden puestas por error cuando el sitio pase a producción.

## Design tokens

### Colores (cargar en `tailwind.config.mjs` → `theme.extend.colors`)
```css
--primary: #ff7d07;   /* naranja marca */
--cream:   #fbf2e1;   /* fondo base */
--maroon:  #932810;   /* CTAs, precios, acentos fuertes */
--forest:  #007239;
--gold:    #f5a202;
--olive:   #9cbf3d;
--violet:  #5f54a6;
--coral:   #e2565b;
--teal:    #129892;

--ink:    color-mix(in oklch, #932810 68%, black);   /* texto principal */
--muted:  color-mix(in oklch, var(--ink) 82%, white); /* texto secundario */
--border: color-mix(in oklch, var(--ink) 16%, white); /* líneas divisorias */
```
Nota: `color-mix()` funciona en navegadores modernos. Si el proyecto necesita compatibilidad más amplia, precalcular estos 3 tonos a hex fijo:
- `--ink` ≈ `#641b0b`
- `--muted` ≈ `#804437`
- `--border` ≈ `#e6dbd8`

### Tipografías
- **Cuerpo de texto:** Nunito (Google Fonts) — pesos 400, 600, 700, 800.
- **Titulares / display:** el proyecto usa "Gummy", una fuente custom que el cliente tiene pero no está disponible como archivo aún. Mientras tanto usar **Baloo 2** (Google Fonts) como reemplazo — es redondeada y de peso similar. Dejar el `font-family` como variable (`--font-display`) para poder cambiarla en un solo lugar cuando llegue el archivo real de Gummy.

### Radios y bordes
- Botones y tarjetas: `border-radius: 6px`.
- Tags/badges: `border-radius: 4px`.
- Inputs: `border-radius: 8px`, `border: 1.5px solid var(--border)`.
- Líneas divisorias: `1px solid var(--border)`.

### Escala de espaciado (usar siempre uno de estos valores, no números sueltos)
| Valor | Uso |
|---|---|
| 4px  | micro-ajustes (íconos, gaps mínimos) |
| 8px  | separación entre elementos relacionados |
| 16px | padding interno de inputs y tags |
| 24px | gutter entre tarjetas y columnas |
| 32px | padding interno de tarjetas y paneles |
| 48px | separación entre bloques de contenido |
| 72px | margen entre secciones |

### Botones — variantes y tamaños
- **Primary**: `background: var(--maroon)`, texto blanco, sin borde.
- **Secondary**: transparente, `border: 1.5px solid var(--maroon)`, texto `var(--maroon)`.
- **Link**: transparente, sin padding, texto `var(--maroon)`, `text-decoration: underline`, `text-underline-offset: 3px`.
- **Disabled**: mismo estilo que Primary con `opacity: 0.45` y `cursor: not-allowed`.
- Tamaños: Small `padding: 8px 16px / font-size 13px`, Medium `padding: 12px 24px / font-size 15px` (el default que usa el prototipo), Large `padding: 16px 30px / font-size 17px`. Fuente siempre Nunito, `font-weight: 700`.

### Grid y layout
- Contenedor centrado (`.wrap` en el prototipo): `max-width: 1120px`, padding lateral `32px`, `margin: 0 auto`.
- Las secciones full-bleed del diseño elegido (hero, categorías, promociones) rompen ese contenedor a propósito — van a `width: 100%` sin el `max-width`, mientras que el resto del contenido (producto destacado, historia, footer) sí respeta el contenedor de 1120px. Mantener esa alternancia tal como está en el HTML de referencia, no unificar todo a un solo ancho.
- Grids de tarjetas (categorías y promociones): `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))` — se acomodan solas, no hardcodear el número de columnas.

### Breakpoints y comportamiento responsive
- **Bajo 768px**: las columnas de dos (hero texto/imagen, producto destacado imagen/info, "conoce el taller") colapsan a una sola columna apilada; el nav del header se oculta (dejar espacio para un futuro botón de menú hamburguesa, aunque el menú en sí no es parte de este prototipo).
- **Bajo 768px** también: el grid de "En promoción" pasa de 5 a 2 columnas.
- **Bajo 640px**: los bloques de categoría pasan a una sola columna (apilados verticalmente).
- Los botones y CTAs no necesitan pasar a ancho completo en mobile salvo que se vea apretado — seguir el criterio visual del HTML de referencia en cada breakpoint.

## Assets
- `felipe-logo.svg` (adjunto) — mascota/isotipo de la marca, se usa en el header, el hero y la sección "Conoce el taller".
- El resto de imágenes de producto son **placeholders**: cajas de color de fondo (tinte suave del color de categoría) con un ícono de línea simple centrado (silueta de cuenco, taza, bandeja, jarrón, etiqueta, figura). Usar `<div>` con color de fondo + un ícono SVG inline mientras no hay fotografía real — así el cliente entiende que ahí van fotos reales después.

## Estructura de la página (en orden)

1. **Header** — fondo blanco, borde inferior fino. Logo (ícono Felipe + wordmark "Taller Azotea") a la izquierda, nav (Tienda / Nosotros / Preguntas frecuentes / Contacto) al centro-derecha, botón "Carrito (0)" a la derecha.

2. **Hero → reemplazado por el Slider** (ver sección "Slider tipo revista/moda" más abajo). El Hero estático de dos columnas de la Variación 6 **ya no va** — el slider ocupa ese lugar al tope del Home.

3. **Explora por categoría** — título con acento naranja debajo. 5 bloques grandes (altura mínima ~560px en desktop) en fila, separados por líneas finas, fondo blanco. Cada uno: ícono en círculo con borde de color, nombre, descripción corta, contador de piezas, link "Ver colección".
   - Cerámica (teal) — "Piezas modeladas y esmaltadas una por una." — 31 piezas
   - Madera (dorado) — "Bandejas, cuencos y objetos torneados a mano." — 24 piezas
   - Piezas mixtas (oliva) — "Madera y cerámica combinadas en una sola pieza." — 14 piezas
   - Personajes y piezas especiales (coral) — "Figuras y objetos de colección hechos a mano." — 9 piezas
   - Productos personalizados (violeta) — "Encargos a medida con tu nombre o diseño." — 6 piezas

4. **Producto destacado** — mismo estilo de título que categorías. Caja con borde fino: imagen placeholder cuadrada a la izquierda, info a la derecha (nombre, tags, descripción, precio, botón "Añadir al carrito").
   - Jarrón texturado Azotea — tags: Cerámica, Edición limitada — S/ 150.00 — "Pieza modelada a mano en gres, con textura de rayado orgánico y esmalte reactivo. Cada unidad sale distinta del horno — no hay dos iguales."

5. **En promoción** — título + link "Ver todas" a la derecha (mostrar solo si hay más productos en promoción de los que se listan — condicional para cuando haya CMS). 5 tarjetas en fila que llenan el 100% del ancho (grid de 5 columnas, 2 en mobile), separadas por líneas finas. Cada una: imagen placeholder con badge de % de descuento, categoría (texto de color), nombre, precio actual + precio tachado, link "Añadir al carrito" **siempre visible** (no depender de `:hover`, para que funcione igual en mobile).
   - Cuenco de roble — Madera — antes S/109.00, ahora S/89.00 (-18%)
   - Taza esmaltada Azotea — Cerámica — antes S/90.00, ahora S/72.00 (-20%)
   - Bandeja de nogal — Madera — antes S/140.00, ahora S/120.00 (-14%)
   - Set de candeleros — Productos personalizados — antes S/130.00, ahora S/98.00 (-25%)
   - Florero pequeño — Personajes y piezas especiales — antes S/70.00, ahora S/56.00 (-20%)

6. **Conoce el taller** — dos columnas: imagen (con el logo/mascota Felipe) a la izquierda, texto a la derecha con título, párrafo y botón "Conocer nuestra historia".
   - "Somos dos personas y una azotea llena de aserrín y arcilla." / "Cada pieza pasa por nuestras manos antes de llegar a las tuyas."

7. **Footer** — fondo blanco, borde superior fino. 3 columnas: (1) marca + descripción corta, (2) "Ayuda" con links a Preguntas frecuentes y Envíos y devoluciones, (3) formulario de newsletter (input email + botón Enviar). Abajo: copyright + íconos circulares de Instagram, TikTok y YouTube (links reales pendientes de que el cliente los provea).

## Componentes sugeridos (Astro)
```
src/
  components/
    Header.astro
    Hero.astro
    CategoryGrid.astro     (recibe categories: array como prop)
    CategoryCard.astro
    FeaturedProduct.astro  (recibe product: objeto como prop)
    PromoGrid.astro        (recibe products: array como prop)
    PromoCard.astro
    StorySection.astro
    Footer.astro
  data/
    categories.ts   (el arreglo de 5 categorías de arriba, tipado)
    promos.ts        (el arreglo de 5 productos en promoción)
    featuredProduct.ts
  pages/
    index.astro
```
Mantener los datos en `src/data/*.ts` (no inline en los componentes) es justamente lo que va a facilitar el reemplazo por el CMS más adelante — el día que exista, solo se cambia de dónde vienen esos arreglos (import estático → fetch/getCollection), sin tocar el markup de los componentes.

## Lo que NO hay que construir todavía
- Backend, API, carrito funcional, checkout, autenticación.
- Páginas de categoría, producto individual, o "Nosotros" (pueden quedar como rutas placeholder vacías o simplemente no linkearlas a nada real).
- Integración real de CMS — solo dejar la estructura de datos lista para conectarla después.
- Cualquier framework de UI (React, Vue, Alpine, etc.) — JS vanilla es suficiente para el alcance de este prototipo.
- **No publicar el prototipo de forma indexable**: mientras no esté aprobado por el cliente y conectado al CMS final, debe llevar `noindex` y `robots.txt` bloqueando todo (ver sección de arriba).

## Menú mobile
El nav del header se oculta bajo 768px (ver breakpoints), así que hace falta un reemplazo:
- Botón de hamburguesa (ícono de 3 líneas) visible solo bajo 768px, a la derecha del logo o donde hoy está el botón "Carrito".
- Al tocarlo, abre un panel/drawer simple (puede ser un `<dialog>` nativo o un `<div>` que se muestra con una clase, con JS vanilla) con los mismos links del nav de desktop en columna.
- No hace falta animación elaborada — un fade o slide simple con CSS `transition` alcanza para el prototipo.

## Iconografía
El prototipo usa un **sprite SVG inline** (`<symbol>` + `<use>`) con los íconos: cuenco, taza, bandeja, jarrón, candelero, figura, etiqueta, Instagram, TikTok, YouTube. Recomendación para Astro:
- Crear un componente `Icon.astro` que reciba `name` como prop y renderice el `<use href="#ic-{name}">` correspondiente, con el sprite completo importado una sola vez en el `Layout.astro` (no repetido en cada página).
- Esto ya deja el patrón listo para agregar íconos nuevos según vayan sumando páginas.

## Accesibilidad mínima
- Todo botón o link que sea solo un ícono (carrito, redes sociales, flechas del slider, hamburguesa) necesita `aria-label` descriptivo — el HTML de referencia ya los tiene, mantenerlos.
- Las imágenes placeholder deben llevar `alt` describiendo qué va ahí (ej. `alt="Foto de [nombre del producto]"`), para no dejar `alt` vacío ni genérico.
- Los estados de foco (`:focus-visible`) de botones y links deben verse claramente (un contorno o cambio de color), no solo depender del `:hover` — importante también por consistencia con que el "Añadir al carrito" de las tarjetas ya se dejó sin depender de hover.

## Cuando lleguen las fotos reales
Los placeholders de producto y del taller son cajas de color con un ícono — al reemplazarlos:
- Usar el componente `<Image />` de Astro (`astro:assets`) para optimización automática (WebP, tamaños responsive), no `<img>` plano.
- Mantener las proporciones que ya tiene cada placeholder (cuadradas 1:1 en producto destacado y promociones, la del hero y "conoce el taller" son las que más varían por variación — respetar el aspect ratio del HTML de referencia en cada caso).
- Carpeta sugerida: `src/assets/productos/` y `src/assets/taller/`.

### Optimización de imágenes en Astro: dónde se procesan
El componente `<Image />` (y `getImage()`) de Astro procesan las imágenes en **build time** (o en el momento del request si se usa SSR) — corren en el servidor/proceso de Node con Sharp por debajo. El navegador nunca hace ese trabajo; solo descarga el archivo final ya optimizado (WebP/AVIF + tamaños responsive vía `srcset`).
- **Imágenes locales** (`src/assets/...`): funcionan automático, sin configurar nada.
- **Imágenes remotas** (ej. una URL de Unsplash): Astro también puede optimizarlas, pero hay que autorizar el dominio en `astro.config.mjs`:
  ```js
  image: {
    domains: ["images.unsplash.com"],
  }
  ```
  Sin eso, el build falla o la imagen no se optimiza.
- **Para probar realismo ahora** (mientras no hay fotos del cliente): mejor **descargar** 5-10 fotos de stock (Unsplash/Pexels) a `src/assets/productos-temp/` en vez de enlazar la URL directo — los links "aleatorios" de Unsplash se rompen con el tiempo, y así además se prueba el pipeline real de optimización, no un atajo que luego hay que rehacer.

## Slider tipo "revista/moda" (sección pendiente de asignar en el Home)
El cliente aprobó una referencia concreta (captura de un slider real, estilo "Men Summer Collection"). Estructura exacta a replicar, adaptada a la marca:

- **Foto a sangre completa** (full-bleed, borde a borde), blanco y negro o color según se defina — en nuestro caso, usar fotos con la calidez de la paleta de marca en vez de blanco y negro.
- **Badge pequeño centrado arriba del título**: recuadro con borde fino (sin relleno), texto corto en mayúsculas (ej. "NUEVO", "EDICIÓN LIMITADA"). En el ejemplo es borde blanco sobre foto oscura — adaptar a borde blanco semitransparente o `var(--cream)` según el contraste de cada foto.
- **Título grande, centrado, en negrita** (ej. "Colección Verano 2026") — usar la tipografía display de marca (Baloo 2 / Gummy cuando esté disponible), no una genérica.
- **Subtítulo centrado**, 1-2 líneas máximo, texto más chico y liviano debajo del título.
- **Botón "Ver colección" / "Comprar ahora"**: **fondo blanco, texto oscuro (`var(--ink)`), esquinas rectas o `border-radius: 4px` máximo** — igual que el ejemplo del cliente, NO el botón Primary (granate) del sistema de color. Este slider es la única excepción del sitio a esa regla; el resto de botones del Home sí usa el sistema Primary/Secondary normal.
- **Flechas de navegación**: círculos semitransparentes **blancos** sobre la foto oscurecida, a los costados, verticalmente centrados, ícono de flecha simple (‹ ›) en color oscuro — igual que el ejemplo, sin modificar.
- **Puntos de paginación** abajo al centro, en **blanco**: el punto activo se ve más ancho/resaltado que los inactivos (no todos del mismo tamaño) — igual que el ejemplo, sin modificar.
- Todo el texto centrado (no alineado a la izquierda como el resto del Home) — este es el único bloque del sitio con texto centrado sobre foto.

**Resumen de contraste de este slider** (para que no haya dudas al implementarlo):
- Fondo de cada slide: la foto, oscurecida con el degradado de abajo.
- Texto (badge, título, subtítulo): **blanco**, sobre ese fondo oscuro.
- Botón: **al revés que el resto** — fondo **blanco**, texto **oscuro** (`var(--ink)`). Es la única pieza clara sobre todo el slide.

- **Overlay para legibilidad**: como nuestras fotos van a ser a color (no blanco y negro como el ejemplo), agregar un degradado oscuro sutil detrás del texto (de transparente a `rgba(0,0,0,.35)` aprox.) para que el texto blanco se lea bien encima de cualquier foto. **Confirmado con el cliente: sí se usa este efecto de oscurecido.**

**Importante — alcance de esta excepción:** el botón blanco, las flechas semitransparentes y los puntos de paginación **son exclusivos de este slider**, tal como aparecen en el ejemplo del cliente, sin adaptarlos al sistema de diseño. El carrusel de "En promoción" (más abajo en el Home) sigue usando el estilo normal del sistema (flechas circulares con borde, íconos color granate sobre fondo blanco) — no tocar ese componente ni intentar que "combine" con el slider.

### Implementación técnica: JS vanilla, sin librerías (funciona en mobile)
Todo esto se resuelve sin ninguna librería de sliders (nada de Swiper, Splide, etc.):

- **El swipe/deslizar con el dedo NO necesita JavaScript.** Se resuelve con CSS puro: contenedor con `overflow-x: auto; scroll-snap-type: x mandatory;` y cada slide con `scroll-snap-align: start; width: 100%; flex-shrink: 0;`. El navegador maneja el gesto táctil nativo en mobile — más fluido y liviano que cualquier librería de JS.
- **Autoplay**: `setInterval` que cada 4-6 segundos llama `scrollTo({ left: nextSlideOffset, behavior: 'smooth' })` sobre el contenedor. Pausar el intervalo con `clearInterval` cuando el usuario interactúa (ver abajo) y reiniciarlo después de unos segundos de inactividad.
- **Pausar al interactuar**: escuchar `pointerdown` (cubre mouse Y touch en un solo evento, no hace falta duplicar con `touchstart`/`mousedown`) sobre el slider para pausar el autoplay.
- **Flechas**: dos botones que llaman `scrollBy({ left: ±anchoDelSlide, behavior: 'smooth' })` sobre el contenedor — no necesitan reimplementar el scroll, solo moverlo.
- **Puntos de paginación sincronizados con la posición actual**: usar `IntersectionObserver` observando cada slide dentro del contenedor con `threshold: 0.6` — cuando un slide entra en el umbral, marcar su punto correspondiente como activo. Esto es más confiable en mobile que calcular la posición a mano con el evento `scroll` (que en touch dispara con mucha frecuencia y sin necesidad).
- Al hacer clic en un punto: `scrollTo` directo al slide correspondiente.

Con este enfoque el slider funciona igual de bien con mouse, teclado (foco + flechas) y dedo, sin descargar ninguna librería externa — coherente con la decisión de JS vanilla del resto del proyecto.

**Pendiente:** el cliente todavía no envía la foto real para el slider. Mientras tanto, usar un placeholder de foto (color de fondo con el degradado oscuro ya aplicado, para poder probar la legibilidad del texto encima) — no bloquear el desarrollo del componente esperando la imagen final. Cuando llegue, revisar contra las indicaciones de encuadre y medidas de la sección "Qué pedirle al cliente sobre las fotos" de más abajo.

Falta confirmar con el cliente en qué parte del Home va este slider (¿reemplaza el Hero actual? ¿va como sección aparte?) — mientras tanto, dejar el componente `HeroSlider.astro` armado y probado de forma aislada, sin insertarlo todavía en `index.astro`.

**Comportamiento:** autoplay cada 4-6 segundos, pausable al pasar el mouse o tocar, deslizable con el dedo en mobile (swipe), transición suave tipo fade o slide (no corte instantáneo entre fotos).

### Qué pedirle al cliente sobre las fotos, para que el slider se vea bien en mobile
Pasarle estas indicaciones directas al cliente o al fotógrafo:

1. **Resolución mínima:** al menos 2000px de lado más largo (ideal 2400–3000px). Si manda una foto de baja resolución, se ve borrosa al escalarla en pantallas grandes o retina/4K.
2. **Foto sin recortar / composición abierta:** no mandar la foto ya recortada a un formato específico. El mismo slider se ve distinto en desktop (más ancho, tipo panorámico) que en mobile (más cuadrado o vertical) — Astro/CSS recorta distinto según el tamaño de pantalla, así que la foto original necesita "aire" alrededor del sujeto principal para que ese recorte no corte cabezas, productos o texto importante.
3. **Sujeto centrado o con foco definido:** si hay un producto o persona que SIEMPRE debe verse sin importar el recorte, que quede razonablemente centrado en el encuadre — evitar que el elemento importante esté pegado al borde de la foto.
4. **Formato de entrega:** JPEG o PNG en la mayor calidad posible, sin comprimir de más. Astro se encarga de convertir a WebP/AVIF y comprimir de forma óptima — si el cliente ya la manda comprimida y en baja calidad, esa pérdida ya no se puede recuperar.
5. **Sin texto ni logos quemados en la imagen:** el texto del slider se pone por código encima de la foto — si la foto ya trae texto o logo incrustado, se ve duplicado o desalineado.
6. **Consistencia visual entre fotos:** mismo tono de luz/color entre todas las fotos del slider (que combinen con la paleta cálida de la marca) — fotos muy distintas entre sí en iluminación hacen que el slider se sienta desordenado al pasar de una a otra.

### Medidas exactas a pedirle al cliente
| | Medida | Proporción |
|---|---|---|
| Foto original (la que manda el cliente) | mínimo 3000 × 2000 px | horizontal, sin recortar |
| Recorte generado para escritorio | 1920 × 800 px | ancha (~2.4:1) |
| Recorte generado para mobile | 1080 × 1350 px | vertical (~4:5) |

La foto original se pide grande y sin recortar a propósito: el código genera automáticamente el recorte ancho (desktop) y el recorte vertical (mobile) a partir de esa misma foto. Si el cliente ya la manda pre-recortada a 1920×800, no queda margen para sacar la versión vertical de mobile sin cortar el producto — por eso el punto 2 y 3 de arriba (composición abierta, sujeto centrado) son obligatorios, no opcionales.

## SEO básico (para dejar preparado, aunque esté en `noindex`)
Aunque el prototipo no se indexa todavía, conviene dejar ya la estructura para no tener que agregarla después:
- `<title>` y `<meta name="description">` en el `Layout.astro`, como props configurables por página.
- Placeholder de `og:image` y `og:title` (pueden apuntar a un asset genérico por ahora).
- Favicon con el logo de Felipe (generar los tamaños básicos: 32x32, 180x180 para Apple).

## Pensando en que van a agregar más páginas
- Armar un **`Layout.astro`** único que envuelva Header + `<slot />` + Footer, y que todas las páginas futuras lo usen — así el header/footer no se duplica por página.
- Dejar `src/pages/` listo para crecer (ej. `tienda/index.astro`, `nosotros.astro`, `contacto.astro`) aunque hoy solo exista `index.astro` — no es necesario crearlas ya, pero sí que el layout esté pensado para que la próxima página no requiera reestructurar nada.
- Mantener la convención de `src/data/*.ts` para cualquier contenido nuevo (no solo categorías/promos/destacado), así el patrón de "fácil de reemplazar por CMS" se mantiene consistente en todo el sitio, no solo en el Home.

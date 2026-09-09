import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // TODO: cambiar `site` a la URL definitiva cuando el cliente apruebe el prototipo.
  site: 'https://prototipo.taller-azotea.local',
  integrations: [
    tailwind({
      // Cargamos nuestro propio archivo base en src/styles/global.css
      applyBaseStyles: false,
    }),
  ],
  image: {
    // Dominios remotos que Astro puede optimizar. Vacío por ahora: todas las
    // imágenes reales entran como assets locales en src/assets/.
    // domains: ['images.unsplash.com'],
  },
});

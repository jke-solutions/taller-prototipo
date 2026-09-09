/**
 * Design tokens del brief (sección "Design tokens").
 * Todo lo visual del prototipo sale de acá: si un color / radio / espaciado
 * no está en esta tabla, no debería usarse suelto en los componentes.
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta de marca
        primary: '#ff7d07', // naranja marca
        cream: '#fbf2e1', // fondo base
        maroon: '#932810', // CTAs, precios, acentos fuertes
        forest: '#007239',
        gold: '#f5a202',
        olive: '#9cbf3d',
        violet: '#5f54a6',
        coral: '#e2565b',
        teal: '#129892',

        // Tonos derivados. El brief los define con color-mix(); acá van
        // precalculados a hex fijo para compatibilidad amplia de navegadores.
        ink: '#641b0b', // texto principal
        muted: '#804437', // texto secundario
        border: '#e6dbd8', // líneas divisorias
      },
      fontFamily: {
        // Cuerpo de texto
        body: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Titulares / display. Usamos "Baloo 2" como reemplazo de "Gummy"
        // hasta que llegue el archivo real; se cambia acá en un solo lugar.
        display: ['var(--font-display)', 'Baloo 2', 'ui-sans-serif', 'sans-serif'],
      },
      borderRadius: {
        // Botones y tarjetas
        DEFAULT: '6px',
        card: '6px',
        btn: '6px',
        // Tags / badges
        tag: '4px',
        // Inputs
        input: '8px',
      },
      borderWidth: {
        1.5: '1.5px',
      },
      spacing: {
        // Escala de espaciado del brief. Usar siempre uno de estos valores.
        1: '4px', // micro-ajustes (íconos, gaps mínimos)
        2: '8px', // separación entre elementos relacionados
        4: '16px', // padding interno de inputs y tags
        6: '24px', // gutter entre tarjetas y columnas
        8: '32px', // padding interno de tarjetas y paneles
        12: '48px', // separación entre bloques de contenido
        18: '72px', // margen entre secciones
      },
      maxWidth: {
        // Contenedor centrado (.wrap del prototipo)
        wrap: '1120px',
      },
      screens: {
        // Breakpoints del brief
        sm: '640px',
        md: '768px',
        lg: '860px',
      },
    },
  },
  plugins: [],
};

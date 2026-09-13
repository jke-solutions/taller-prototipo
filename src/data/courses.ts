/**
 * Talleres de la página "Cursos y Talleres" (/servicios/cursos-y-talleres).
 * Hardcodeado para el prototipo; mismo patrón que products.ts/services.ts —
 * reemplazable por getCollection() / CMS sin tocar los componentes.
 */
import type { IconName } from '@components/ui/icons';

export interface Course {
  slug: string;
  title: string;
  /** Tags cortos sobre el título (modalidad + edad). */
  modalityTag: string;
  ageTag: string;
  description: string;
  /** Título de la lista (ej. "Objetivos del taller" / "Qué van a hacer"). */
  listTitle: string;
  listItems: string[];
  age: string;
  duration: string;
  location: string;
  schedule: string;
  price: string;
  priceNote: string;
  icon: IconName;
  color: 'teal' | 'gold';
  /** Mensaje pre-armado para el botón de reserva por WhatsApp. */
  whatsappMessage: string;
}

export const courses: Course[] = [
  {
    slug: 'creacion-de-personajes',
    title: 'Taller de Creación de Personajes para Niños',
    modalityTag: 'Personalizado · máx. 2 niños',
    ageTag: 'Desde 5 años',
    description:
      'Cada chico diseña y arma una pieza original y propia —desde una nave espacial hasta un lindo gatito—. Sin límites para la imaginación.',
    listTitle: 'Objetivos del taller',
    listItems: [
      'Desarrollo de habilidades cognitivas y motoras',
      'Conocimiento de materiales y herramientas',
      'Fomento de la paciencia y la perseverancia',
      'Conciencia ecológica: se trabaja con materiales reciclados',
    ],
    age: 'Desde los 5 años',
    duration: '2 horas',
    location: 'Chorrillos',
    schedule: '10 am–12 m · 2–4 pm',
    price: 'S/ 180',
    priceNote: 'por sesión',
    icon: 'sketch',
    color: 'teal',
    whatsappMessage: 'Hola, quiero reservar el Taller de Creación de Personajes para Niños',
  },
  {
    slug: 'automata',
    title: 'Taller Autómata para Niños',
    modalityTag: 'Personalizado · padres e hijos',
    ageTag: '5 a 10 años',
    description:
      'Niños y padres exploran juntos la madera y el movimiento a través de engranajes, personalizando un mini personaje con partes móviles.',
    listTitle: 'Qué van a hacer',
    listItems: [
      'Introducción a la madera y a los autómatas',
      'Uso de herramientas y armado',
      'Acabados con aceites naturales y pinturas',
    ],
    age: '5 a 10 años',
    duration: '1 h 30 min',
    location: 'Chorrillos',
    schedule: '10 am–12 m · 2–4 pm',
    price: 'S/ 120',
    priceNote: 'por sesión',
    icon: 'wheel',
    color: 'gold',
    whatsappMessage: 'Hola, quiero reservar el Taller Autómata para Niños',
  },
];

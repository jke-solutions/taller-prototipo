/**
 * Checkout: datos del cliente (guardado opcional en el navegador) y el
 * último pedido creado, ambos en localStorage — el sitio no tiene
 * backend/cuentas todavía (mismo criterio que src/scripts/cart.ts). El pago
 * y la entrega se coordinan por WhatsApp; acá solo armamos el pedido y el
 * mensaje que se manda desde la página de gracias.
 */
import type { CartItem } from './cart';
import { parsePrice } from './cart';
import type { IconName } from '@components/ui/icons';

const CUSTOMER_KEY = 'taller-azotea:cliente';
const ORDER_KEY = 'taller-azotea:ultimo-pedido';

export interface ShippingMethod {
  id: string;
  label: string;
  description: string;
  price: number;
}

/** Métodos de envío disponibles. Solo entrega a domicilio: sin recojo en taller. */
export const shippingMethods: ShippingMethod[] = [
  {
    id: 'regular-lima',
    label: 'Entrega Regular (Lima Metropolitana)',
    description: 'Coordinamos día y hora por WhatsApp — 2 a 4 días hábiles',
    price: 15,
  },
  {
    id: 'express-lima',
    label: 'Envío Express (Lima)',
    description: '24 horas o menos, sujeto a horario de coordinación',
    price: 30,
  },
  {
    id: 'nacional',
    label: 'Entrega Nacional (Provincia)',
    description: 'Envío a todo el Perú vía agencia — 5 días hábiles',
    price: 40,
  },
];

export interface CustomerData {
  nombre: string;
  apellidos: string;
  correo: string;
  whatsapp: string;
  dni: string;
  direccion: string;
  distrito: string;
  referencia: string;
  region: string;
  ciudad: string;
}

export function getSavedCustomer(): CustomerData | null {
  try {
    const raw = window.localStorage.getItem(CUSTOMER_KEY);
    return raw ? (JSON.parse(raw) as CustomerData) : null;
  } catch {
    return null;
  }
}

export function saveCustomer(data: CustomerData): void {
  try {
    window.localStorage.setItem(CUSTOMER_KEY, JSON.stringify(data));
  } catch {
    // Sin persistencia disponible: el checkout sigue funcionando en esta carga.
  }
}

export function clearSavedCustomer(): void {
  try {
    window.localStorage.removeItem(CUSTOMER_KEY);
  } catch {
    // no-op
  }
}

/**
 * Estados del pedido para /seguimiento. Sin backend/admin todavía: un
 * pedido nuevo siempre arranca en "recibido" y no hay forma de avanzarlo
 * desde el sitio — el resto de la línea de tiempo queda pendiente hasta que
 * exista un panel para actualizarlo.
 */
export type OrderStatus = 'recibido' | 'coordinado' | 'preparacion' | 'enviado' | 'entregado';

export interface OrderStatusStep {
  id: OrderStatus;
  label: string;
  description: string;
  icon: IconName;
}

export const orderStatusSteps: OrderStatusStep[] = [
  {
    id: 'recibido',
    label: 'Pedido recibido',
    description: 'Registramos tu pedido correctamente.',
    icon: 'check',
  },
  {
    id: 'coordinado',
    label: 'Pago y entrega coordinados por WhatsApp',
    description: 'Confirmamos contigo los detalles del pago y la entrega.',
    icon: 'whatsapp',
  },
  {
    id: 'preparacion',
    label: 'En preparación en el taller',
    description: 'Estamos armando tu pedido con cuidado.',
    icon: 'box',
  },
  {
    id: 'enviado',
    label: 'Enviado',
    description: 'Te avisamos por WhatsApp con el detalle del envío.',
    icon: 'truck',
  },
  {
    id: 'entregado',
    label: '¡Entregado!',
    description: 'Que lo disfrutes.',
    icon: 'check',
  },
];

export function orderStatusIndex(status: OrderStatus): number {
  return orderStatusSteps.findIndex((s) => s.id === status);
}

export interface Order {
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  customer: CustomerData;
  shippingMethod: ShippingMethod;
  notes: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  status: OrderStatus;
}

function generateOrderNumber(): string {
  return `AZ-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function createOrder(input: {
  items: CartItem[];
  customer: CustomerData;
  shippingMethod: ShippingMethod;
  notes: string;
}): Order {
  const subtotal = input.items.reduce((sum, i) => sum + parsePrice(i.price) * i.qty, 0);
  const shippingCost = input.shippingMethod.price;
  return {
    orderNumber: generateOrderNumber(),
    createdAt: new Date().toISOString(),
    items: input.items,
    customer: input.customer,
    shippingMethod: input.shippingMethod,
    notes: input.notes,
    subtotal,
    shippingCost,
    total: subtotal + shippingCost,
    status: 'recibido',
  };
}

export function saveLastOrder(order: Order): void {
  try {
    window.localStorage.setItem(ORDER_KEY, JSON.stringify(order));
  } catch {
    // no-op
  }
}

export function getLastOrder(): Order | null {
  try {
    const raw = window.localStorage.getItem(ORDER_KEY);
    return raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    return null;
  }
}

/**
 * Busca un pedido por número + correo para /seguimiento. Sin backend no hay
 * dónde buscar entre pedidos de otras personas: esto solo puede confirmar
 * el último pedido hecho en ESTE navegador (por eso pide ambos datos, como
 * una verificación mínima de que es quien dice ser).
 */
export function findOrder(orderNumber: string, correo: string): Order | null {
  const order = getLastOrder();
  if (!order) return null;
  const matchesNumber = order.orderNumber.trim().toLowerCase() === orderNumber.trim().toLowerCase();
  const matchesEmail = order.customer.correo.trim().toLowerCase() === correo.trim().toLowerCase();
  return matchesNumber && matchesEmail ? order : null;
}

/** Texto para coordinar el pedido ya creado por WhatsApp desde /gracias. */
export function buildOrderWhatsappMessage(order: Order): string {
  const nombreCompleto = [order.customer.nombre, order.customer.apellidos].filter(Boolean).join(' ');
  const lines = [
    `Hola${nombreCompleto ? `, soy ${nombreCompleto}` : ''}. Quiero coordinar mi pedido ${order.orderNumber}:`,
    '',
    ...order.items.map((i) => `• ${i.name} x${i.qty} — ${i.price}`),
    '',
    `Envío: ${order.shippingMethod.label} — S/ ${order.shippingCost.toFixed(2)}`,
    `Total: S/ ${order.total.toFixed(2)}`,
    '',
    `Dirección: ${order.customer.direccion}, ${order.customer.distrito}, ${order.customer.ciudad} (${order.customer.region})`,
  ];
  if (order.notes) lines.push(`Notas: ${order.notes}`);
  return lines.join('\n');
}

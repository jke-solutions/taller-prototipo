/**
 * Carrito de compras, sin backend/checkout real todavía: guarda los ítems
 * (slug, nombre, precio, ícono/color para el thumb, cantidad) en
 * localStorage y expone helpers para leerlo, modificarlo y pintar el
 * contador "Carrito (N)" del header. Cuando exista un carrito real, esto se
 * reemplaza por el estado que venga del backend.
 */
const STORAGE_KEY = 'taller-azotea:carrito';

export interface CartItem {
  slug: string;
  name: string;
  /** Precio formateado tal cual viene del catálogo, ej. "S/ 150.00". */
  price: string;
  icon: string;
  color: string;
  qty: number;
}

function readCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Sin persistencia disponible: el carrito sigue funcionando en esta carga.
  }
  paintCount(items);
  window.dispatchEvent(new CustomEvent('cart:updated', { detail: items }));
}

/** Tinte de fondo por categoría de color (mismo criterio que Placeholder.astro). */
export const brandColorVar: Record<string, string> = {
  teal: 'var(--teal)',
  gold: 'var(--gold)',
  olive: 'var(--olive)',
  coral: 'var(--coral)',
  violet: 'var(--violet)',
};

function paintCount(items: CartItem[]): void {
  const count = items.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll<HTMLElement>('[data-cart-count]').forEach((el) => {
    el.textContent = String(count);
  });
}

/** Convierte "S/ 1,600.00" en 1600. */
export function parsePrice(price: string): number {
  const n = Number(price.replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

/** Pinta el contador guardado. Llamar una vez por página (el Header lo hace). */
export function initCartCount(): void {
  paintCount(readCart());
}

export function getCart(): CartItem[] {
  return readCart();
}

export function getCartCount(): number {
  return readCart().reduce((sum, item) => sum + item.qty, 0);
}

/** Agrega `qty` unidades del ítem (suma a la cantidad si ya estaba). */
export function addToCart(item: Omit<CartItem, 'qty'>, qty = 1): CartItem[] {
  const items = readCart();
  const safeQty = Math.max(1, Math.floor(qty) || 1);
  const existing = items.find((i) => i.slug === item.slug);
  if (existing) {
    existing.qty += safeQty;
  } else {
    items.push({ ...item, qty: safeQty });
  }
  writeCart(items);
  return items;
}

export function updateCartQty(slug: string, qty: number): CartItem[] {
  const items = readCart();
  const item = items.find((i) => i.slug === slug);
  if (item) item.qty = Math.max(1, Math.floor(qty) || 1);
  writeCart(items);
  return items;
}

export function removeFromCart(slug: string): CartItem[] {
  const items = readCart().filter((i) => i.slug !== slug);
  writeCart(items);
  return items;
}

export function clearCart(): void {
  writeCart([]);
}

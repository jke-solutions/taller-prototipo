/**
 * Filtro + orden del catálogo, todo client-side sobre las tarjetas ya
 * renderizadas en el servidor (data-product-card + data-* en
 * RelatedProductCard.astro). No hay backend/API: con el tamaño actual del
 * catálogo (prototipo) alcanza con mostrar/ocultar nodos del DOM.
 */
type SortValue = 'destacado' | 'precio-asc' | 'precio-desc' | 'nombre-asc';

export function initCatalogFilters(root: ParentNode = document): void {
  const grid = root.querySelector<HTMLElement>('[data-catalog-grid]');
  const filters = root.querySelector<HTMLElement>('[data-catalog-filters]');
  if (!grid || !filters) return;

  const cards = [...grid.querySelectorAll<HTMLElement>('[data-product-card]')];
  const originalOrder = [...cards];
  const resultCount = root.querySelector<HTMLElement>('[data-result-count]');
  const emptyState = root.querySelector<HTMLElement>('[data-catalog-empty]');
  const sortSelect = root.querySelector<HTMLSelectElement>('[data-catalog-sort]');
  const priceInput = filters.querySelector<HTMLInputElement>('[data-filter-price]');
  const priceValueLabel = filters.querySelector<HTMLElement>('[data-filter-price-value]');
  const resetBtn = filters.querySelector<HTMLButtonElement>('[data-filters-reset]');

  const checkedValues = (selector: string): string[] =>
    [...filters.querySelectorAll<HTMLInputElement>(selector)]
      .filter((input) => input.checked)
      .map((input) => input.value);

  const apply = () => {
    const categories = checkedValues('[data-filter-category]');
    const colors = checkedValues('[data-filter-color]');
    const onlyInStock = filters.querySelector<HTMLInputElement>('[data-filter-in-stock]')?.checked ?? false;
    const maxPrice = priceInput ? Number(priceInput.value) : Infinity;

    let visible = 0;
    cards.forEach((card) => {
      const category = card.dataset.category ?? '';
      const price = Number(card.dataset.price ?? '0');
      const cardColors = (card.dataset.colors ?? '').split(' ').filter(Boolean);
      const inStock = card.dataset.inStock === 'true';

      const matchesCategory = categories.length === 0 || categories.includes(category);
      const matchesColor = colors.length === 0 || colors.some((c) => cardColors.includes(c));
      const matchesPrice = price <= maxPrice;
      const matchesStock = !onlyInStock || inStock;

      const match = matchesCategory && matchesColor && matchesPrice && matchesStock;
      card.hidden = !match;
      if (match) visible += 1;
    });

    if (resultCount) {
      resultCount.textContent = `Mostrando ${visible} de ${cards.length} producto${cards.length === 1 ? '' : 's'}`;
    }
    if (emptyState) emptyState.hidden = visible > 0;
  };

  const sort = (value: SortValue) => {
    const sorted = [...originalOrder];
    if (value === 'precio-asc') {
      sorted.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
    } else if (value === 'precio-desc') {
      sorted.sort((a, b) => Number(b.dataset.price) - Number(a.dataset.price));
    } else if (value === 'nombre-asc') {
      sorted.sort((a, b) => (a.dataset.name ?? '').localeCompare(b.dataset.name ?? ''));
    }
    sorted.forEach((card) => grid.appendChild(card));
  };

  filters.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement;
    if (target === priceInput && priceValueLabel) {
      priceValueLabel.textContent = `S/ ${Number(priceInput!.value).toFixed(2)}`;
    }
    apply();
  });

  priceInput?.addEventListener('input', () => {
    if (priceValueLabel) priceValueLabel.textContent = `S/ ${Number(priceInput.value).toFixed(2)}`;
    apply();
  });

  sortSelect?.addEventListener('change', () => sort(sortSelect.value as SortValue));

  resetBtn?.addEventListener('click', () => {
    filters.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach((input) => {
      input.checked = false;
    });
    if (priceInput) {
      priceInput.value = priceInput.max;
      if (priceValueLabel) priceValueLabel.textContent = `S/ ${Number(priceInput.max).toFixed(2)}`;
    }
    apply();
  });

  apply();
}

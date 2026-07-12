import { EXPIRING_SOON_DAYS } from '../constants/inventory';

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString));
}

export function isExpiringSoon(expiryDate, withinDays = EXPIRING_SOON_DAYS, referenceDate = new Date()) {
  const expiry = new Date(expiryDate);
  const now = new Date(referenceDate);
  now.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  const diffMs = expiry.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= withinDays;
}

export function getInventorySummary(items) {
  return {
    total: items.length,
    lowStock: items.filter((item) => item.stockStatus === 'Low Stock').length,
    outOfStock: items.filter((item) => item.stockStatus === 'Out Of Stock').length,
    expiringSoon: items.filter((item) => isExpiringSoon(item.expiryDate)).length,
  };
}

export function filterMedicines(items, { search, searchBy, category, stockStatus }) {
  const query = search.trim().toLowerCase();

  return items.filter((item) => {
    const matchesSearch =
      !query || String(item[searchBy] ?? '').toLowerCase().includes(query);
    const matchesCategory = category === 'all' || item.category === category;
    const matchesStatus = stockStatus === 'all' || item.stockStatus === stockStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });
}

export function paginateItems(items, page, rowsPerPage) {
  const start = (page - 1) * rowsPerPage;
  return items.slice(start, start + rowsPerPage);
}

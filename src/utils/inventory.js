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

function startOfDay(date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function getDaysUntilExpiry(expiryDate, referenceDate = new Date()) {
  const expiry = startOfDay(expiryDate);
  const now = startOfDay(referenceDate);
  return Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function isExpired(expiryDate, referenceDate = new Date()) {
  return getDaysUntilExpiry(expiryDate, referenceDate) < 0;
}

export function isExpiringSoon(
  expiryDate,
  withinDays = EXPIRING_SOON_DAYS,
  referenceDate = new Date(),
) {
  const daysLeft = getDaysUntilExpiry(expiryDate, referenceDate);
  return daysLeft >= 0 && daysLeft <= withinDays;
}

export function matchesExpiryFilter(expiryDate, expiryFilter) {
  if (expiryFilter === 'all') return true;
  if (expiryFilter === 'expiringSoon') return isExpiringSoon(expiryDate);
  if (expiryFilter === 'expired') return isExpired(expiryDate);
  return true;
}

export function getInventorySummary(items) {
  return {
    total: items.length,
    lowStock: items.filter((item) => item.stockStatus === 'Low Stock').length,
    outOfStock: items.filter((item) => item.stockStatus === 'Out Of Stock').length,
    expiringSoon: items.filter((item) => isExpiringSoon(item.expiryDate)).length,
  };
}

export function getStockAlerts(items) {
  return {
    lowStock: items.filter((item) => item.stockStatus === 'Low Stock').length,
    outOfStock: items.filter((item) => item.stockStatus === 'Out Of Stock').length,
    expired: items.filter((item) => isExpired(item.expiryDate)).length,
    expiringSoon: items.filter((item) => isExpiringSoon(item.expiryDate)).length,
  };
}

export function formatMedicineAlertTitle(count, phrase) {
  const noun = count === 1 ? 'Medicine' : 'Medicines';
  return `${count} ${noun} ${phrase}`;
}

export function filterMedicines(
  items,
  { search = '', searchBy = 'medicineName', category = 'all', stockStatus = 'all', expiry = 'all' },
) {
  const query = search.trim().toLowerCase();

  return items.filter((item) => {
    const matchesSearch =
      !query || String(item[searchBy] ?? '').toLowerCase().includes(query);
    const matchesCategory = category === 'all' || item.category === category;
    const matchesStatus = stockStatus === 'all' || item.stockStatus === stockStatus;
    const matchesExpiry = matchesExpiryFilter(item.expiryDate, expiry);

    return matchesSearch && matchesCategory && matchesStatus && matchesExpiry;
  });
}

export function paginateItems(items, page, rowsPerPage) {
  const start = (page - 1) * rowsPerPage;
  return items.slice(start, start + rowsPerPage);
}

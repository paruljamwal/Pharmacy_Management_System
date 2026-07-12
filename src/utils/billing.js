import { TAX_RATE } from '../constants/billing';

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(value || 0);
}

export function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString));
}

export function filterBillingMedicines(items, { search = '', searchBy = 'medicineName' }) {
  const query = search.trim().toLowerCase();
  if (!query) return items;
  return items.filter((item) =>
    String(item[searchBy] ?? '').toLowerCase().includes(query),
  );
}

export function calculateBillTotals(cartItems) {
  const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );
  const tax = subtotal * TAX_RATE;
  const grandTotal = subtotal + tax;

  return {
    itemsCount,
    subtotal,
    tax,
    grandTotal,
  };
}

export function createInvoiceNumber(sequence = 1) {
  return `INV-2026-${String(1000 + sequence).padStart(4, '0')}`;
}

export function addMedicineToCart(cart, medicine, quantity) {
  const qty = Math.max(1, Number(quantity) || 1);
  const existing = cart.find((item) => item.id === medicine.id);

  if (existing) {
    const nextQty = Math.min(existing.quantity + qty, medicine.stock);
    return cart.map((item) =>
      item.id === medicine.id ? { ...item, quantity: nextQty } : item,
    );
  }

  return [
    ...cart,
    {
      id: medicine.id,
      medicineCode: medicine.medicineCode,
      medicineName: medicine.medicineName,
      unitPrice: medicine.unitPrice,
      stock: medicine.stock,
      quantity: Math.min(qty, medicine.stock),
    },
  ];
}

import { SALES_STATUS, TODAY_DATE } from '../constants/sales';

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

export function paginateItems(items, page, rowsPerPage) {
  const start = (page - 1) * rowsPerPage;
  return items.slice(start, start + rowsPerPage);
}

export function filterSalesInvoices(items, { search = '', date = 'all' }) {
  const query = search.trim().toLowerCase();

  return items.filter((item) => {
    const matchesSearch =
      !query || String(item.invoiceId).toLowerCase().includes(query);
    const matchesDate = date === 'all' || item.date === date;
    return matchesSearch && matchesDate;
  });
}

export function getSalesSummary(items, lowStockCount = 0, today = TODAY_DATE) {
  const todaysInvoices = items.filter((item) => item.date === today);
  const todaysCompleted = todaysInvoices.filter(
    (item) => item.status === SALES_STATUS.COMPLETED,
  );

  return {
    todaysSales: todaysCompleted.reduce((sum, item) => sum + item.totalAmount, 0),
    todaysOrders: todaysInvoices.length,
    medicinesSold: todaysCompleted.reduce((sum, item) => sum + item.items, 0),
    lowStock: lowStockCount,
  };
}

export function exportInvoicesToCsv(items) {
  const headers = ['Invoice ID', 'Customer', 'Items', 'Total Amount', 'Date', 'Status'];
  const rows = items.map((item) => [
    item.invoiceId,
    item.customer,
    item.items,
    item.totalAmount,
    item.date,
    item.status,
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sales-report.csv';
  link.click();
  URL.revokeObjectURL(url);
}

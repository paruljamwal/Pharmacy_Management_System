import { SALES_STATUS, TODAY_DATE } from '../constants/sales';

const customers = [
  'Aarav Sharma',
  'Priya Patel',
  'Rohan Mehta',
  'Ananya Iyer',
  'Vikram Singh',
  'Sneha Reddy',
  'Karan Malhotra',
  'Meera Joshi',
  'Arjun Nair',
  'Divya Kapoor',
];

const dates = [
  TODAY_DATE,
  TODAY_DATE,
  TODAY_DATE,
  '2026-07-11',
  '2026-07-11',
  '2026-07-10',
  '2026-07-09',
  '2026-07-08',
];

function buildInvoice(index) {
  const isCancelled = index % 9 === 0;
  const items = (index % 5) + 1;
  const totalAmount = Number(((items * 85) + (index % 7) * 24.5).toFixed(2));

  return {
    id: index + 1,
    invoiceId: `INV-2026-${String(1101 + index)}`,
    customer: customers[index % customers.length],
    items,
    totalAmount,
    date: dates[index % dates.length],
    status: isCancelled ? SALES_STATUS.CANCELLED : SALES_STATUS.COMPLETED,
  };
}

export const salesInvoices = Array.from({ length: 30 }, (_, index) =>
  buildInvoice(index),
);

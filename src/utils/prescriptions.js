import {
  PRESCRIPTION_PRIORITY,
  PRESCRIPTION_STATUS,
  TODAY_DATE,
} from '../constants/prescriptions';

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

export function filterPrescriptions(
  items,
  {
    search = '',
    searchBy = 'prescriptionId',
    status = 'all',
    priority = 'all',
    date = 'all',
  },
) {
  const query = search.trim().toLowerCase();

  return items.filter((item) => {
    const matchesSearch =
      !query || String(item[searchBy] ?? '').toLowerCase().includes(query);
    const matchesStatus = status === 'all' || item.status === status;
    const matchesPriority = priority === 'all' || item.priority === priority;
    const matchesDate = date === 'all' || item.date === date;
    return matchesSearch && matchesStatus && matchesPriority && matchesDate;
  });
}

export function getPrescriptionSummary(items, today = TODAY_DATE) {
  return {
    pending: items.filter((item) => item.status === PRESCRIPTION_STATUS.PENDING).length,
    approvedToday: items.filter(
      (item) => item.status === PRESCRIPTION_STATUS.APPROVED && item.date === today,
    ).length,
    rejectedToday: items.filter(
      (item) => item.status === PRESCRIPTION_STATUS.REJECTED && item.date === today,
    ).length,
    urgent: items.filter(
      (item) =>
        item.priority === PRESCRIPTION_PRIORITY.URGENT &&
        item.status === PRESCRIPTION_STATUS.PENDING,
    ).length,
  };
}

export const SALES_STATUS = {
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

export const STATUS_BADGE = {
  [SALES_STATUS.COMPLETED]: 'success',
  [SALES_STATUS.CANCELLED]: 'danger',
};

export const TODAY_DATE = '2026-07-12';

export const DATE_FILTER_OPTIONS = [
  { value: 'all', label: 'All Dates' },
  { value: TODAY_DATE, label: 'Today' },
  { value: '2026-07-11', label: '11 Jul 2026' },
  { value: '2026-07-10', label: '10 Jul 2026' },
  { value: '2026-07-09', label: '09 Jul 2026' },
  { value: '2026-07-08', label: '08 Jul 2026' },
];

export const ROWS_PER_PAGE_OPTIONS = [
  { value: '10', label: '10' },
  { value: '20', label: '20' },
];

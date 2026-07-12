export const PRESCRIPTION_STATUS = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
};

export const PRESCRIPTION_PRIORITY = {
  NORMAL: 'Normal',
  URGENT: 'Urgent',
};

export const TODAY_DATE = '2026-07-12';

export const STATUS_BADGE = {
  [PRESCRIPTION_STATUS.PENDING]: 'warning',
  [PRESCRIPTION_STATUS.APPROVED]: 'success',
  [PRESCRIPTION_STATUS.REJECTED]: 'danger',
};

export const PRIORITY_BADGE = {
  [PRESCRIPTION_PRIORITY.URGENT]: 'danger',
  [PRESCRIPTION_PRIORITY.NORMAL]: 'info',
};

export const SEARCH_BY_OPTIONS = [
  { value: 'prescriptionId', label: 'Prescription ID' },
  { value: 'patientName', label: 'Patient Name' },
  { value: 'doctorName', label: 'Doctor Name' },
];

export const STATUS_FILTER_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: PRESCRIPTION_STATUS.PENDING, label: PRESCRIPTION_STATUS.PENDING },
  { value: PRESCRIPTION_STATUS.APPROVED, label: PRESCRIPTION_STATUS.APPROVED },
  { value: PRESCRIPTION_STATUS.REJECTED, label: PRESCRIPTION_STATUS.REJECTED },
];

export const PRIORITY_FILTER_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: PRESCRIPTION_PRIORITY.NORMAL, label: PRESCRIPTION_PRIORITY.NORMAL },
  { value: PRESCRIPTION_PRIORITY.URGENT, label: PRESCRIPTION_PRIORITY.URGENT },
];

export const DATE_FILTER_OPTIONS = [
  { value: 'all', label: 'All Dates' },
  { value: TODAY_DATE, label: 'Today' },
  { value: '2026-07-11', label: '11 Jul 2026' },
  { value: '2026-07-10', label: '10 Jul 2026' },
  { value: '2026-07-09', label: '09 Jul 2026' },
  { value: '2026-07-08', label: '08 Jul 2026' },
  { value: '2026-07-07', label: '07 Jul 2026' },
];

export const ROWS_PER_PAGE_OPTIONS = [
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '50', label: '50' },
];

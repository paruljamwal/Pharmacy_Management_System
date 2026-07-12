export const PRESCRIPTION_STATUS = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
};

export const PRESCRIPTION_PRIORITY = {
  NORMAL: 'Normal',
  URGENT: 'Urgent',
};

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

export const ROWS_PER_PAGE_OPTIONS = [
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '50', label: '50' },
];

export const TODAY_DATE = '2026-07-12';

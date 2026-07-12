export const STOCK_STATUS = {
  IN_STOCK: 'In Stock',
  LOW_STOCK: 'Low Stock',
  OUT_OF_STOCK: 'Out Of Stock',
};

export const STOCK_STATUS_BADGE = {
  [STOCK_STATUS.IN_STOCK]: 'success',
  [STOCK_STATUS.LOW_STOCK]: 'warning',
  [STOCK_STATUS.OUT_OF_STOCK]: 'danger',
};

export const MEDICINE_CATEGORIES = [
  'Antibiotics',
  'Analgesics',
  'Antidiabetics',
  'Cardiovascular',
  'Gastrointestinal',
  'Respiratory',
  'Antihistamines',
  'Supplements',
  'Dermatology',
  'Hormones',
  'CNS',
];

export const SEARCH_BY_OPTIONS = [
  { value: 'medicineName', label: 'Medicine Name' },
  { value: 'medicineCode', label: 'Medicine Code' },
  { value: 'manufacturer', label: 'Manufacturer' },
];

export const STOCK_STATUS_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: STOCK_STATUS.IN_STOCK, label: STOCK_STATUS.IN_STOCK },
  { value: STOCK_STATUS.LOW_STOCK, label: STOCK_STATUS.LOW_STOCK },
  { value: STOCK_STATUS.OUT_OF_STOCK, label: STOCK_STATUS.OUT_OF_STOCK },
];

export const ROWS_PER_PAGE_OPTIONS = [
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '50', label: '50' },
];

export const EXPIRING_SOON_DAYS = 30;
export const LOW_STOCK_THRESHOLD = 20;

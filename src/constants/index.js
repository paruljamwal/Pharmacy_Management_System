export const APP_NAME = 'Pharmacy Management System';

export const ROUTES = {
  DASHBOARD: '/',
  INVENTORY: '/inventory',
  PRESCRIPTION_VERIFICATION: '/prescription-verification',
  BILLING: '/billing',
  SALES_REPORTS: '/sales-reports',
};

export const NAV_ITEMS = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD },
  { label: 'Inventory', path: ROUTES.INVENTORY },
  { label: 'Prescription Verification', path: ROUTES.PRESCRIPTION_VERIFICATION },
  { label: 'Billing', path: ROUTES.BILLING },
  { label: 'Sales Reports', path: ROUTES.SALES_REPORTS },
];

export { BUTTON_VARIANTS, BADGE_VARIANTS, SKELETON_VARIANTS } from './ui';

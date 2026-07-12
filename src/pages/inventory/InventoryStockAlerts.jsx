import {
  HiOutlineExclamationTriangle,
  HiOutlineXCircle,
  HiOutlineNoSymbol,
  HiOutlineClock,
} from 'react-icons/hi2';
import { AlertCard } from '../../components/common';
import { STOCK_ALERT_TYPES } from '../../constants/inventory';
import { formatMedicineAlertTitle } from '../../utils/inventory';
import './InventoryStockAlerts.css';

const ALERT_CONFIG = [
  {
    key: STOCK_ALERT_TYPES.LOW_STOCK,
    countKey: 'lowStock',
    phrase: 'Low In Stock',
    description: 'Quantity is running low and needs restocking',
    tone: 'warning',
    icon: HiOutlineExclamationTriangle,
  },
  {
    key: STOCK_ALERT_TYPES.OUT_OF_STOCK,
    countKey: 'outOfStock',
    phrase: 'Out Of Stock',
    description: 'Unavailable and cannot be dispensed',
    tone: 'danger',
    icon: HiOutlineXCircle,
  },
  {
    key: STOCK_ALERT_TYPES.EXPIRED,
    countKey: 'expired',
    phrase: 'Expired',
    description: 'Past expiry date and should be removed',
    tone: 'neutral',
    icon: HiOutlineNoSymbol,
  },
  {
    key: STOCK_ALERT_TYPES.EXPIRING_SOON,
    countKey: 'expiringSoon',
    phrase: 'Expiring Soon',
    description: 'Will expire within the next 30 days',
    tone: 'info',
    icon: HiOutlineClock,
  },
];

function InventoryStockAlerts({ alerts, activeAlert, onAlertClick }) {
  return (
    <section className="inventory-alerts" aria-label="Stock alerts">
      <div className="inventory-alerts__header">
        <h2 className="inventory-alerts__title">Stock Alerts</h2>
        <p className="inventory-alerts__subtitle">
          Click an alert to filter the medicine table automatically.
        </p>
      </div>

      <div className="inventory-alerts__grid">
        {ALERT_CONFIG.map(({ key, countKey, phrase, description, tone, icon: Icon }) => {
          const count = alerts[countKey] ?? 0;

          return (
            <AlertCard
              key={key}
              tone={tone}
              title={formatMedicineAlertTitle(count, phrase)}
              description={description}
              icon={<Icon size={20} />}
              active={activeAlert === key}
              onClick={count > 0 ? () => onAlertClick(key) : undefined}
              aria-pressed={activeAlert === key}
            />
          );
        })}
      </div>
    </section>
  );
}

export default InventoryStockAlerts;

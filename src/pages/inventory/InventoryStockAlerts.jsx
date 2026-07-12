import { STOCK_ALERT_TYPES } from '../../constants/inventory';
import './InventoryStockAlerts.css';

const ALERT_CONFIG = [
  {
    key: STOCK_ALERT_TYPES.LOW_STOCK,
    countKey: 'lowStock',
    label: 'Low stock',
    tone: 'warning',
  },
  {
    key: STOCK_ALERT_TYPES.OUT_OF_STOCK,
    countKey: 'outOfStock',
    label: 'Out of stock',
    tone: 'danger',
  },
  {
    key: STOCK_ALERT_TYPES.EXPIRED,
    countKey: 'expired',
    label: 'Expired',
    tone: 'danger',
  },
  {
    key: STOCK_ALERT_TYPES.EXPIRING_SOON,
    countKey: 'expiringSoon',
    label: 'Expiring soon',
    tone: 'warning',
  },
];

function InventoryStockAlerts({ alerts, activeAlert, onAlertClick }) {
  return (
    <section className="metric-strip" aria-label="Stock alerts">
      {ALERT_CONFIG.map(({ key, countKey, label, tone }) => {
        const count = alerts[countKey] ?? 0;
        const isActive = activeAlert === key;

        return (
          <button
            key={key}
            type="button"
            className={`metric-strip__item metric-strip__item--${tone} is-clickable ${isActive ? 'is-active' : ''}`}
            onClick={count > 0 ? () => onAlertClick(key) : undefined}
            disabled={count <= 0}
            aria-pressed={isActive}
          >
            <p className="metric-strip__value">{count}</p>
            <p className="metric-strip__label">{label}</p>
          </button>
        );
      })}
    </section>
  );
}

export default InventoryStockAlerts;

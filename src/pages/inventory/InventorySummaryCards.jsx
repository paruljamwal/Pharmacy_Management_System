import {
  HiOutlineArchiveBox,
  HiOutlineExclamationTriangle,
  HiOutlineXCircle,
  HiOutlineClock,
} from 'react-icons/hi2';
import { Card } from '../../components/common';
import './InventorySummaryCards.css';

const CARDS = [
  {
    key: 'total',
    title: 'Total Medicines',
    description: 'All medicines currently listed',
    icon: HiOutlineArchiveBox,
    tone: 'primary',
  },
  {
    key: 'lowStock',
    title: 'Low Stock',
    description: 'Items needing replenishment',
    icon: HiOutlineExclamationTriangle,
    tone: 'warning',
  },
  {
    key: 'outOfStock',
    title: 'Out Of Stock',
    description: 'Unavailable for dispensing',
    icon: HiOutlineXCircle,
    tone: 'danger',
  },
  {
    key: 'expiringSoon',
    title: 'Expiring Soon',
    description: 'Expires within 30 days',
    icon: HiOutlineClock,
    tone: 'info',
  },
];

function InventorySummaryCards({ summary }) {
  return (
    <div className="inventory-summary">
      {CARDS.map(({ key, title, description, icon: Icon, tone }) => (
        <Card key={key} className={`inventory-summary__card inventory-summary__card--${tone}`}>
          <div className="inventory-summary__content">
            <div className={`inventory-summary__icon inventory-summary__icon--${tone}`}>
              <Icon size={22} />
            </div>
            <div className="inventory-summary__meta">
              <div className="inventory-summary__top">
                <p className="inventory-summary__title">{title}</p>
                <span className={`inventory-summary__indicator inventory-summary__indicator--${tone}`} />
              </div>
              <p className="inventory-summary__value">{summary[key]}</p>
              <p className="inventory-summary__description">{description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default InventorySummaryCards;

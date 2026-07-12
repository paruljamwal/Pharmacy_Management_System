import {
  HiOutlineCurrencyRupee,
  HiOutlineShoppingBag,
  HiOutlineCube,
  HiOutlineExclamationTriangle,
} from 'react-icons/hi2';
import { Card } from '../../components/common';
import { formatCurrency } from '../../utils/sales';
import './SalesSummaryCards.css';

const CARDS = [
  {
    key: 'todaysSales',
    title: "Today's Sales",
    description: 'Completed sales amount today',
    icon: HiOutlineCurrencyRupee,
    tone: 'success',
    format: formatCurrency,
  },
  {
    key: 'todaysOrders',
    title: "Today's Orders",
    description: 'Invoices created today',
    icon: HiOutlineShoppingBag,
    tone: 'info',
  },
  {
    key: 'medicinesSold',
    title: 'Medicines Sold',
    description: 'Units sold in completed orders',
    icon: HiOutlineCube,
    tone: 'primary',
  },
  {
    key: 'lowStock',
    title: 'Low Stock Medicines',
    description: 'Items needing restock soon',
    icon: HiOutlineExclamationTriangle,
    tone: 'warning',
  },
];

function SalesSummaryCards({ summary }) {
  return (
    <div className="sales-summary">
      {CARDS.map(({ key, title, description, icon: Icon, tone, format }) => (
        <Card key={key} className={`sales-summary__card sales-summary__card--${tone}`}>
          <div className="sales-summary__content">
            <div className={`sales-summary__icon sales-summary__icon--${tone}`}>
              <Icon size={22} />
            </div>
            <div className="sales-summary__meta">
              <div className="sales-summary__top">
                <p className="sales-summary__title">{title}</p>
                <span className={`sales-summary__indicator sales-summary__indicator--${tone}`} />
              </div>
              <p className="sales-summary__value">
                {format ? format(summary[key]) : summary[key]}
              </p>
              <p className="sales-summary__description">{description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default SalesSummaryCards;

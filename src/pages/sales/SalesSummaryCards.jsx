import { formatCurrency } from '../../utils/sales';

function SalesSummaryCards({ summary }) {
  const cards = [
    { key: 'todaysSales', label: "Today's sales", format: formatCurrency },
    { key: 'todaysOrders', label: "Today's orders" },
    { key: 'medicinesSold', label: 'Medicines sold' },
    { key: 'lowStock', label: 'Low stock' },
  ];

  return (
    <section className="metric-strip" aria-label="Sales summary">
      {cards.map(({ key, label, format }) => (
        <div key={key} className="metric-strip__item">
          <p className="metric-strip__value">
            {format ? format(summary[key]) : summary[key]}
          </p>
          <p className="metric-strip__label">{label}</p>
        </div>
      ))}
    </section>
  );
}

export default SalesSummaryCards;

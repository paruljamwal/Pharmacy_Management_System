function PrescriptionSummaryCards({ summary }) {
  const cards = [
    { key: 'pending', label: 'Pending' },
    { key: 'approvedToday', label: 'Approved today' },
    { key: 'rejectedToday', label: 'Rejected today' },
    { key: 'urgent', label: 'Urgent' },
  ];

  return (
    <section className="metric-strip" aria-label="Prescription summary">
      {cards.map(({ key, label }) => (
        <div key={key} className="metric-strip__item">
          <p className="metric-strip__value">{summary[key]}</p>
          <p className="metric-strip__label">{label}</p>
        </div>
      ))}
    </section>
  );
}

export default PrescriptionSummaryCards;

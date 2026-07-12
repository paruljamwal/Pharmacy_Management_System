import { Button } from '../../components/common';
import { formatCurrency } from '../../utils/billing';
import './BillingSummary.css';

function SummaryRow({ label, value, strong = false }) {
  return (
    <div className={`billing-summary__row ${strong ? 'is-strong' : ''}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function BillingSummary({ totals, disabled, onClear, onGenerate }) {
  return (
    <aside className="billing-summary">
      <h2 className="billing-summary__title">Summary</h2>
      <div className="billing-summary__rows">
        <SummaryRow label="Items" value={totals.itemsCount} />
        <SummaryRow label="Subtotal" value={formatCurrency(totals.subtotal)} />
        <SummaryRow label="Tax (5%)" value={formatCurrency(totals.tax)} />
        <SummaryRow
          label="Total"
          value={formatCurrency(totals.grandTotal)}
          strong
        />
      </div>

      <div className="billing-summary__actions">
        <Button variant="outline" fullWidth onClick={onClear} disabled={disabled}>
          Clear
        </Button>
        <Button variant="primary" fullWidth onClick={onGenerate} disabled={disabled}>
          Generate Invoice
        </Button>
      </div>
    </aside>
  );
}

export default BillingSummary;

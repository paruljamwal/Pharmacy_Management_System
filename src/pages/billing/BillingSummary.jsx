import { Button, Card } from '../../components/common';
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
    <Card className="billing-summary" title="Billing Summary">
      <div className="billing-summary__rows">
        <SummaryRow label="Items" value={totals.itemsCount} />
        <SummaryRow label="Subtotal" value={formatCurrency(totals.subtotal)} />
        <SummaryRow label="Tax (5%)" value={formatCurrency(totals.tax)} />
        <SummaryRow
          label="Grand Total"
          value={formatCurrency(totals.grandTotal)}
          strong
        />
      </div>

      <div className="billing-summary__actions">
        <Button variant="outline" fullWidth onClick={onClear} disabled={disabled}>
          Clear Bill
        </Button>
        <Button variant="primary" fullWidth onClick={onGenerate} disabled={disabled}>
          Generate Invoice
        </Button>
      </div>
    </Card>
  );
}

export default BillingSummary;

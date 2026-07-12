import { Button, Dialog, Table } from '../../components/common';
import { formatCurrency, formatDate } from '../../utils/billing';
import './InvoiceModal.css';

function InvoiceModal({ open, invoice, onClose }) {
  if (!invoice) return null;

  const columns = [
    { key: 'medicineName', header: 'Medicine' },
    { key: 'quantity', header: 'Qty', align: 'right' },
    {
      key: 'unitPrice',
      header: 'Price',
      align: 'right',
      render: (value) => formatCurrency(value),
    },
    {
      key: 'total',
      header: 'Total',
      align: 'right',
      render: (_, row) => formatCurrency(row.unitPrice * row.quantity),
    },
  ];

  return (
    <Dialog
      open={open}
      title="Invoice"
      onClose={onClose}
      className="billing-invoice-dialog"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {}}>
            Print Invoice
          </Button>
        </>
      }
    >
      <div className="billing-invoice">
        <div className="billing-invoice__meta">
          <div>
            <span className="billing-invoice__label">Invoice Number</span>
            <strong>{invoice.invoiceNumber}</strong>
          </div>
          <div>
            <span className="billing-invoice__label">Customer Name</span>
            <strong>{invoice.customerName || 'Walk-in Customer'}</strong>
          </div>
          <div>
            <span className="billing-invoice__label">Bill Date</span>
            <strong>{formatDate(invoice.billDate)}</strong>
          </div>
        </div>

        <p className="billing-invoice__section">Purchased Medicines</p>
        <Table columns={columns} data={invoice.items} striped hoverable={false} />

        <div className="billing-invoice__total">
          <span>Grand Total</span>
          <strong>{formatCurrency(invoice.grandTotal)}</strong>
        </div>
      </div>
    </Dialog>
  );
}

export default InvoiceModal;

import { useMemo, useState } from 'react';
import { PageHeader } from '../components/layout';
import { billingMedicines } from '../data/billingMedicines';
import { BILL_DATE } from '../constants/billing';
import {
  addMedicineToCart,
  calculateBillTotals,
  createInvoiceNumber,
} from '../utils/billing';
import CustomerForm from './billing/CustomerForm';
import MedicinePicker from './billing/MedicinePicker';
import BillingSummary from './billing/BillingSummary';
import InvoiceModal from './billing/InvoiceModal';
import './billing/Billing.css';

function Billing() {
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [cart, setCart] = useState([]);
  const [invoice, setInvoice] = useState(null);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [invoiceSequence, setInvoiceSequence] = useState(1);

  const totals = useMemo(() => calculateBillTotals(cart), [cart]);
  const isEmpty = cart.length === 0;

  const handleCustomerChange = (field, value) => {
    if (field === 'customerName') setCustomerName(value);
    if (field === 'mobileNumber') setMobileNumber(value);
  };

  const handleAdd = (medicine, quantity) => {
    setCart((current) => addMedicineToCart(current, medicine, quantity));
  };

  const handleClear = () => {
    setCart([]);
  };

  const handleGenerate = () => {
    if (isEmpty) return;

    const nextInvoice = {
      invoiceNumber: createInvoiceNumber(invoiceSequence),
      customerName: customerName.trim(),
      mobileNumber: mobileNumber.trim(),
      billDate: BILL_DATE,
      items: cart,
      grandTotal: totals.grandTotal,
    };

    setInvoice(nextInvoice);
    setInvoiceOpen(true);
    setInvoiceSequence((value) => value + 1);
  };

  const handleCloseInvoice = () => {
    setInvoiceOpen(false);
    setInvoice(null);
    setCart([]);
    setCustomerName('');
    setMobileNumber('');
  };

  return (
    <div className="billing-page">
      <PageHeader
        title="Billing"
        subtitle="Create invoices quickly."
      />

      <div className="billing-page__grid">
        <section className="billing-page__left">
          <CustomerForm
            customerName={customerName}
            mobileNumber={mobileNumber}
            onChange={handleCustomerChange}
          />
          <MedicinePicker medicines={billingMedicines} onAdd={handleAdd} />
        </section>

        <aside className="billing-page__right">
          <BillingSummary
            totals={totals}
            disabled={isEmpty}
            onClear={handleClear}
            onGenerate={handleGenerate}
          />
        </aside>
      </div>

      <InvoiceModal
        open={invoiceOpen}
        invoice={invoice}
        onClose={handleCloseInvoice}
      />
    </div>
  );
}

export default Billing;

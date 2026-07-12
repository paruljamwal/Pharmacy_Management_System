import { Input } from '../../components/common';
import './CustomerForm.css';

function CustomerForm({ customerName, mobileNumber, onChange }) {
  return (
    <div className="billing-customer">
      <div className="billing-customer__grid">
        <Input
          label="Customer Name"
          name="customerName"
          placeholder="Customer name"
          value={customerName}
          onChange={(event) => onChange('customerName', event.target.value)}
        />
        <Input
          label="Mobile Number"
          name="mobileNumber"
          type="tel"
          placeholder="Mobile number"
          value={mobileNumber}
          onChange={(event) => onChange('mobileNumber', event.target.value)}
        />
      </div>
    </div>
  );
}

export default CustomerForm;

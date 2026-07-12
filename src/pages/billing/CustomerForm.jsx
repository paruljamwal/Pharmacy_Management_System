import { Card, Input } from '../../components/common';
import './CustomerForm.css';

function CustomerForm({ customerName, mobileNumber, onChange }) {
  return (
    <Card className="billing-customer" title="Customer Information">
      <div className="billing-customer__grid">
        <Input
          label="Customer Name"
          name="customerName"
          placeholder="Enter customer name"
          value={customerName}
          onChange={(event) => onChange('customerName', event.target.value)}
        />
        <Input
          label="Mobile Number"
          name="mobileNumber"
          type="tel"
          placeholder="Enter mobile number"
          value={mobileNumber}
          onChange={(event) => onChange('mobileNumber', event.target.value)}
        />
      </div>
    </Card>
  );
}

export default CustomerForm;

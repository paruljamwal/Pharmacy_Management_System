import { Badge, Table } from '../../components/common';
import { STATUS_BADGE } from '../../constants/sales';
import { formatCurrency, formatDate } from '../../utils/sales';
import './SalesTable.css';

const columns = [
  { key: 'invoiceId', header: 'Invoice ID' },
  { key: 'customer', header: 'Customer' },
  { key: 'items', header: 'Items', align: 'right' },
  {
    key: 'totalAmount',
    header: 'Total Amount',
    align: 'right',
    render: (value) => formatCurrency(value),
  },
  {
    key: 'date',
    header: 'Date',
    render: (value) => formatDate(value),
  },
  {
    key: 'status',
    header: 'Status',
    render: (value) => <Badge variant={STATUS_BADGE[value]}>{value}</Badge>,
  },
];

function SalesTable({ data }) {
  return (
    <Table
      className="sales-table"
      columns={columns}
      data={data}
      striped
      hoverable
      stickyHeader
      emptyTitle="No invoices found"
      emptyDescription="Try adjusting your search or date filter."
    />
  );
}

export default SalesTable;

import { HiOutlineEye, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import { Badge, Table } from '../../components/common';
import { STOCK_STATUS_BADGE } from '../../constants/inventory';
import { formatCurrency, formatDate } from '../../utils/inventory';
import './InventoryTable.css';

function ActionButton({ label, children }) {
  return (
    <button type="button" className="inventory-actions__btn" title={label} aria-label={label}>
      {children}
    </button>
  );
}

const columns = [
  { key: 'medicineCode', header: 'Medicine Code' },
  { key: 'medicineName', header: 'Medicine Name' },
  { key: 'category', header: 'Category' },
  { key: 'manufacturer', header: 'Manufacturer' },
  { key: 'batchNumber', header: 'Batch Number' },
  {
    key: 'expiryDate',
    header: 'Expiry Date',
    render: (value) => formatDate(value),
  },
  {
    key: 'unitPrice',
    header: 'Unit Price',
    align: 'right',
    render: (value) => formatCurrency(value),
  },
  {
    key: 'quantity',
    header: 'Quantity',
    align: 'right',
  },
  {
    key: 'stockStatus',
    header: 'Stock Status',
    render: (value) => <Badge variant={STOCK_STATUS_BADGE[value]}>{value}</Badge>,
  },
  {
    key: 'actions',
    header: 'Actions',
    align: 'center',
    render: () => (
      <div className="inventory-actions">
        <ActionButton label="View">
          <HiOutlineEye size={16} />
        </ActionButton>
        <ActionButton label="Edit">
          <HiOutlinePencilSquare size={16} />
        </ActionButton>
        <ActionButton label="Delete">
          <HiOutlineTrash size={16} />
        </ActionButton>
      </div>
    ),
  },
];

function InventoryTable({ data }) {
  return (
    <Table
      className="inventory-table"
      columns={columns}
      data={data}
      striped
      hoverable
      stickyHeader
      emptyTitle="No medicines found"
      emptyDescription="Try adjusting your search or filters to find medicines."
    />
  );
}

export default InventoryTable;

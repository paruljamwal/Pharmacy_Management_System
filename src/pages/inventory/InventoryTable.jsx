import { useMemo } from 'react';
import { HiOutlineEye, HiOutlinePencilSquare, HiOutlineTrash, HiOutlineBeaker } from 'react-icons/hi2';
import { Badge, HighlightText, Table } from '../../components/common';
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

function createColumns(searchQuery, searchBy) {
  const highlight = (key, value) =>
    searchBy === key && searchQuery.trim() ? (
      <HighlightText text={value} query={searchQuery} />
    ) : (
      value
    );

  return [
    {
      key: 'medicineName',
      header: 'Medicine',
      render: (value, row) => (
        <div className="inventory-medicine">
          <span className="inventory-medicine__name">
            {highlight('medicineName', value)}
          </span>
          <span className="inventory-medicine__meta">
            {highlight('medicineCode', row.medicineCode)}
            {searchBy === 'manufacturer' && searchQuery.trim() ? (
              <> · {highlight('manufacturer', row.manufacturer)}</>
            ) : null}
          </span>
        </div>
      ),
    },
    { key: 'category', header: 'Category' },
    {
      key: 'quantity',
      header: 'Stock',
      align: 'right',
    },
    {
      key: 'unitPrice',
      header: 'Price',
      align: 'right',
      render: (value) => formatCurrency(value),
    },
    {
      key: 'expiryDate',
      header: 'Expiry',
      render: (value) => formatDate(value),
    },
    {
      key: 'stockStatus',
      header: 'Status',
      render: (value) => <Badge variant={STOCK_STATUS_BADGE[value]}>{value}</Badge>,
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
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
}

function InventoryTable({ data, searchQuery = '', searchBy = 'medicineName' }) {
  const columns = useMemo(
    () => createColumns(searchQuery, searchBy),
    [searchQuery, searchBy],
  );

  return (
    <Table
      className="inventory-table"
      columns={columns}
      data={data}
      hoverable
      stickyHeader
      emptyTitle="No medicines found"
      emptyDescription="Nothing matches your search. Try another medicine name, code, or clear filters."
      emptyIcon={<HiOutlineBeaker size={26} />}
    />
  );
}

export default InventoryTable;

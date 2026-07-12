import { useMemo, useState } from 'react';
import { Button, Card, SearchInput, Select, Table } from '../../components/common';
import { SEARCH_BY_OPTIONS } from '../../constants/billing';
import { filterBillingMedicines, formatCurrency } from '../../utils/billing';
import useDebounce from '../../hooks/useDebounce';
import './MedicinePicker.css';

function MedicinePicker({ medicines, onAdd }) {
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('medicineName');
  const [quantities, setQuantities] = useState({});
  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(
    () => filterBillingMedicines(medicines, { search: debouncedSearch, searchBy }),
    [medicines, debouncedSearch, searchBy],
  );

  const setQty = (id, value, max) => {
    const next = Math.min(Math.max(1, Number(value) || 1), max);
    setQuantities((current) => ({ ...current, [id]: next }));
  };

  const columns = [
    {
      key: 'medicineName',
      header: 'Medicine',
      render: (value, row) => (
        <div className="billing-medicine">
          <span className="billing-medicine__name">{value}</span>
          <span className="billing-medicine__code">{row.medicineCode}</span>
        </div>
      ),
    },
    {
      key: 'unitPrice',
      header: 'Price',
      align: 'right',
      render: (value) => formatCurrency(value),
    },
    {
      key: 'stock',
      header: 'Stock',
      align: 'right',
    },
    {
      key: 'quantity',
      header: 'Quantity',
      align: 'center',
      render: (_, row) => (
        <input
          className="billing-qty"
          type="number"
          min={1}
          max={row.stock}
          value={quantities[row.id] ?? 1}
          onChange={(event) => setQty(row.id, event.target.value, row.stock)}
          aria-label={`Quantity for ${row.medicineName}`}
        />
      ),
    },
    {
      key: 'action',
      header: 'Action',
      align: 'center',
      render: (_, row) => (
        <Button
          variant="primary"
          disabled={row.stock <= 0}
          onClick={() => onAdd(row, quantities[row.id] ?? 1)}
        >
          Add
        </Button>
      ),
    },
  ];

  return (
    <Card className="billing-picker" title="Search Medicine">
      <div className="billing-picker__toolbar">
        <SearchInput
          placeholder="Search medicine..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search medicine"
        />
        <Select
          placeholder=""
          options={SEARCH_BY_OPTIONS}
          value={searchBy}
          onChange={(event) => setSearchBy(event.target.value)}
          aria-label="Search by"
        />
      </div>

      <Table
        className="billing-picker__table"
        columns={columns}
        data={filtered}
        striped
        hoverable
        stickyHeader
        emptyTitle="No medicines found"
        emptyDescription="Try a different search term."
      />
    </Card>
  );
}

export default MedicinePicker;

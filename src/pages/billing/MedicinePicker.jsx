import { useMemo, useState } from 'react';
import { HiOutlinePlus, HiOutlineBeaker } from 'react-icons/hi2';
import { Button, SearchInput, Select, Table } from '../../components/common';
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
      key: 'quantity',
      header: 'Qty',
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
      key: 'unitPrice',
      header: 'Price',
      align: 'right',
      render: (value) => formatCurrency(value),
    },
    {
      key: 'total',
      header: 'Total',
      align: 'right',
      render: (_, row) =>
        formatCurrency(row.unitPrice * (quantities[row.id] ?? 1)),
    },
    {
      key: 'action',
      header: '',
      align: 'right',
      render: (_, row) => (
        <Button
          variant="ghost"
          disabled={row.stock <= 0}
          icon={<HiOutlinePlus size={16} />}
          onClick={() => onAdd(row, quantities[row.id] ?? 1)}
        >
          Add
        </Button>
      ),
    },
  ];

  return (
    <div className="billing-picker">
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
        hoverable
        stickyHeader
        emptyTitle="No medicines found"
        emptyDescription="No medicine matches that search. Try the name or medicine code."
        emptyIcon={<HiOutlineBeaker size={26} />}
      />
    </div>
  );
}

export default MedicinePicker;

import { useEffect, useMemo, useState } from 'react';
import { PageHeader } from '../components/layout';
import { medicines } from '../data/medicines';
import {
  filterMedicines,
  getInventorySummary,
  paginateItems,
} from '../utils/inventory';
import InventorySummaryCards from './inventory/InventorySummaryCards';
import InventoryToolbar from './inventory/InventoryToolbar';
import InventoryTable from './inventory/InventoryTable';
import InventoryPagination from './inventory/InventoryPagination';
import './inventory/Inventory.css';

const INITIAL_FILTERS = {
  search: '',
  searchBy: 'medicineName',
  category: 'all',
  stockStatus: 'all',
};

function Inventory() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const summary = useMemo(() => getInventorySummary(medicines), []);

  const filteredMedicines = useMemo(
    () => filterMedicines(medicines, filters),
    [filters],
  );

  const totalPages = Math.max(1, Math.ceil(filteredMedicines.length / rowsPerPage));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedMedicines = useMemo(
    () => paginateItems(filteredMedicines, page, rowsPerPage),
    [filteredMedicines, page, rowsPerPage],
  );

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  };

  const handleReset = () => {
    setFilters(INITIAL_FILTERS);
    setPage(1);
  };

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(value);
    setPage(1);
  };

  return (
    <div className="inventory-page">
      <PageHeader
        title="Medicine Inventory"
        subtitle="Manage medicines, monitor stock levels and search products."
      />

      <InventorySummaryCards summary={summary} />

      <InventoryToolbar
        search={filters.search}
        searchBy={filters.searchBy}
        category={filters.category}
        stockStatus={filters.stockStatus}
        onSearchChange={(value) => updateFilter('search', value)}
        onSearchByChange={(value) => updateFilter('searchBy', value)}
        onCategoryChange={(value) => updateFilter('category', value)}
        onStockStatusChange={(value) => updateFilter('stockStatus', value)}
        onReset={handleReset}
      />

      <InventoryTable data={paginatedMedicines} />

      <InventoryPagination
        page={page}
        rowsPerPage={String(rowsPerPage)}
        totalItems={filteredMedicines.length}
        onPageChange={setPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
}

export default Inventory;

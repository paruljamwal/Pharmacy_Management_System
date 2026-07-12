import { useEffect, useMemo, useState } from 'react';
import { PageHeader } from '../components/layout';
import { medicines } from '../data/medicines';
import useDebounce from '../hooks/useDebounce';
import { STOCK_ALERT_FILTERS, STOCK_ALERT_TYPES } from '../constants/inventory';
import {
  filterMedicines,
  getInventorySummary,
  getStockAlerts,
  paginateItems,
} from '../utils/inventory';
import InventoryStockAlerts from './inventory/InventoryStockAlerts';
import InventorySummaryCards from './inventory/InventorySummaryCards';
import InventoryToolbar from './inventory/InventoryToolbar';
import InventoryTable from './inventory/InventoryTable';
import InventoryPagination from './inventory/InventoryPagination';
import './inventory/Inventory.css';

const INITIAL_FILTERS = {
  searchBy: 'medicineName',
  category: 'all',
  stockStatus: 'all',
  expiry: 'all',
};

function getActiveAlert(filters) {
  return (
    Object.values(STOCK_ALERT_TYPES).find((alertKey) => {
      const alertFilters = STOCK_ALERT_FILTERS[alertKey];
      return (
        filters.stockStatus === alertFilters.stockStatus &&
        filters.expiry === alertFilters.expiry &&
        filters.category === alertFilters.category
      );
    }) ?? null
  );
}

function Inventory() {
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const debouncedSearch = useDebounce(searchInput, 300);

  const summary = useMemo(() => getInventorySummary(medicines), []);
  const stockAlerts = useMemo(() => getStockAlerts(medicines), []);
  const activeAlert = useMemo(() => getActiveAlert(filters), [filters]);

  const filteredMedicines = useMemo(
    () =>
      filterMedicines(medicines, {
        ...filters,
        search: debouncedSearch,
      }),
    [filters, debouncedSearch],
  );

  const totalPages = Math.max(1, Math.ceil(filteredMedicines.length / rowsPerPage));

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filters]);

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
  };

  const handleAlertClick = (alertKey) => {
    setSearchInput('');
    setFilters(STOCK_ALERT_FILTERS[alertKey]);
  };

  const handleReset = () => {
    setSearchInput('');
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

      <InventoryStockAlerts
        alerts={stockAlerts}
        activeAlert={activeAlert}
        onAlertClick={handleAlertClick}
      />

      <InventorySummaryCards summary={summary} />

      <InventoryToolbar
        search={searchInput}
        searchBy={filters.searchBy}
        category={filters.category}
        stockStatus={filters.stockStatus}
        expiry={filters.expiry}
        onSearchChange={setSearchInput}
        onSearchByChange={(value) => updateFilter('searchBy', value)}
        onCategoryChange={(value) => updateFilter('category', value)}
        onStockStatusChange={(value) => updateFilter('stockStatus', value)}
        onExpiryChange={(value) => updateFilter('expiry', value)}
        onReset={handleReset}
      />

      <InventoryTable
        data={paginatedMedicines}
        searchQuery={debouncedSearch}
        searchBy={filters.searchBy}
      />

      <InventoryPagination
        page={page}
        rowsPerPage={String(rowsPerPage)}
        filteredCount={filteredMedicines.length}
        totalCount={medicines.length}
        onPageChange={setPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
}

export default Inventory;

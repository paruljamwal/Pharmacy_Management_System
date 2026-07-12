import { useEffect, useMemo, useState } from 'react';
import { PageHeader } from '../components/layout';
import { salesInvoices } from '../data/salesInvoices';
import { medicines } from '../data/medicines';
import useDebounce from '../hooks/useDebounce';
import {
  exportInvoicesToCsv,
  filterSalesInvoices,
  getSalesSummary,
  paginateItems,
} from '../utils/sales';
import SalesSummaryCards from './sales/SalesSummaryCards';
import SalesToolbar from './sales/SalesToolbar';
import SalesTable from './sales/SalesTable';
import SalesPagination from './sales/SalesPagination';
import './sales/Sales.css';

function SalesReports() {
  const [searchInput, setSearchInput] = useState('');
  const [date, setDate] = useState('all');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const debouncedSearch = useDebounce(searchInput, 300);

  const lowStockCount = useMemo(
    () => medicines.filter((item) => item.stockStatus === 'Low Stock').length,
    [],
  );

  const summary = useMemo(
    () => getSalesSummary(salesInvoices, lowStockCount),
    [lowStockCount],
  );

  const filteredInvoices = useMemo(
    () =>
      filterSalesInvoices(salesInvoices, {
        search: debouncedSearch,
        date,
      }),
    [debouncedSearch, date],
  );

  const totalPages = Math.max(1, Math.ceil(filteredInvoices.length / rowsPerPage));

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, date]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paginatedInvoices = useMemo(
    () => paginateItems(filteredInvoices, page, rowsPerPage),
    [filteredInvoices, page, rowsPerPage],
  );

  return (
    <div className="sales-page">
      <PageHeader
        title="Sales Report"
        subtitle="Quick overview of pharmacy sales."
      />

      <SalesSummaryCards summary={summary} />

      <SalesToolbar
        search={searchInput}
        date={date}
        onSearchChange={setSearchInput}
        onDateChange={setDate}
        onExport={() => exportInvoicesToCsv(filteredInvoices)}
      />

      <SalesTable data={paginatedInvoices} />

      <SalesPagination
        page={page}
        rowsPerPage={String(rowsPerPage)}
        filteredCount={filteredInvoices.length}
        totalCount={salesInvoices.length}
        onPageChange={setPage}
        onRowsPerPageChange={(value) => {
          setRowsPerPage(value);
          setPage(1);
        }}
      />
    </div>
  );
}

export default SalesReports;

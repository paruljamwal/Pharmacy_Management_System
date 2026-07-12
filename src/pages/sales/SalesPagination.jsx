import { Button, Select } from '../../components/common';
import { ROWS_PER_PAGE_OPTIONS } from '../../constants/sales';
import './SalesPagination.css';

function SalesPagination({
  page,
  rowsPerPage,
  filteredCount,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
}) {
  const totalPages = Math.max(1, Math.ceil(filteredCount / rowsPerPage));

  return (
    <div className="sales-pagination">
      <div className="sales-pagination__meta">
        <span>
          Showing {filteredCount} of {totalCount} invoices
        </span>
        <div className="sales-pagination__rows">
          <span>Rows</span>
          <Select
            className="sales-pagination__select"
            placeholder=""
            options={ROWS_PER_PAGE_OPTIONS}
            value={rowsPerPage}
            onChange={(event) => onRowsPerPageChange(Number(event.target.value))}
            aria-label="Rows per page"
          />
        </div>
      </div>

      <div className="sales-pagination__controls">
        <Button variant="outline" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          Previous
        </Button>
        <span className="sales-pagination__page">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default SalesPagination;

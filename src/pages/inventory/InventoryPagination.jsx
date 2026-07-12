import { Button, Select } from '../../components/common';
import { ROWS_PER_PAGE_OPTIONS } from '../../constants/inventory';
import './InventoryPagination.css';

function getPageNumbers(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) return [1, 2, 3, 4, 5];
  if (currentPage >= totalPages - 2) {
    return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
}

function InventoryPagination({
  page,
  rowsPerPage,
  totalItems,
  onPageChange,
  onRowsPerPageChange,
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  const start = totalItems === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const end = Math.min(page * rowsPerPage, totalItems);
  const pages = getPageNumbers(page, totalPages);

  return (
    <div className="inventory-pagination">
      <div className="inventory-pagination__meta">
        <span>
          Showing {start}–{end} of {totalItems} medicines
        </span>
        <div className="inventory-pagination__rows">
          <span>Rows Per Page</span>
          <Select
            className="inventory-pagination__select"
            placeholder=""
            options={ROWS_PER_PAGE_OPTIONS}
            value={rowsPerPage}
            onChange={(event) => onRowsPerPageChange(Number(event.target.value))}
            aria-label="Rows per page"
          />
        </div>
      </div>

      <div className="inventory-pagination__controls">
        <Button
          variant="outline"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>

        <div className="inventory-pagination__pages">
          {pages.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              className={`inventory-pagination__page ${
                pageNumber === page ? 'is-active' : ''
              }`}
              onClick={() => onPageChange(pageNumber)}
              aria-current={pageNumber === page ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          ))}
        </div>

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

export default InventoryPagination;

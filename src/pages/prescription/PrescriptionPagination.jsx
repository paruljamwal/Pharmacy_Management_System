import { Button, Select } from '../../components/common';
import { ROWS_PER_PAGE_OPTIONS } from '../../constants/prescriptions';
import './PrescriptionPagination.css';

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

function PrescriptionPagination({
  page,
  rowsPerPage,
  filteredCount,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
}) {
  const totalPages = Math.max(1, Math.ceil(filteredCount / rowsPerPage));
  const pages = getPageNumbers(page, totalPages);

  return (
    <div className="rx-pagination">
      <div className="rx-pagination__meta">
        <span>
          Showing {filteredCount} of {totalCount} prescriptions
        </span>
        <div className="rx-pagination__rows">
          <span>Rows Per Page</span>
          <Select
            className="rx-pagination__select"
            placeholder=""
            options={ROWS_PER_PAGE_OPTIONS}
            value={rowsPerPage}
            onChange={(event) => onRowsPerPageChange(Number(event.target.value))}
            aria-label="Rows per page"
          />
        </div>
      </div>

      <div className="rx-pagination__controls">
        <Button variant="outline" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          Previous
        </Button>

        <div className="rx-pagination__pages">
          {pages.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              className={`rx-pagination__page ${pageNumber === page ? 'is-active' : ''}`}
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

export default PrescriptionPagination;

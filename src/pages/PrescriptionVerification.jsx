import { useEffect, useMemo, useState } from 'react';
import { PageHeader } from '../components/layout';
import { prescriptions as initialPrescriptions } from '../data/prescriptions';
import useDebounce from '../hooks/useDebounce';
import { PRESCRIPTION_STATUS, TODAY_DATE } from '../constants/prescriptions';
import {
  filterPrescriptions,
  getPrescriptionSummary,
  paginateItems,
} from '../utils/prescriptions';
import PrescriptionSummaryCards from './prescription/PrescriptionSummaryCards';
import PrescriptionToolbar from './prescription/PrescriptionToolbar';
import PrescriptionTable from './prescription/PrescriptionTable';
import PrescriptionPagination from './prescription/PrescriptionPagination';
import PrescriptionDetailsDrawer from './prescription/PrescriptionDetailsDrawer';
import ApproveDialog from './prescription/ApproveDialog';
import RejectDialog from './prescription/RejectDialog';
import './prescription/Prescription.css';

const INITIAL_FILTERS = {
  searchBy: 'prescriptionId',
  status: 'all',
  priority: 'all',
  date: 'all',
};

function PrescriptionVerification() {
  const [items, setItems] = useState(initialPrescriptions);
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);

  const debouncedSearch = useDebounce(searchInput, 300);

  const summary = useMemo(() => getPrescriptionSummary(items), [items]);

  const filteredItems = useMemo(
    () =>
      filterPrescriptions(items, {
        ...filters,
        search: debouncedSearch,
      }),
    [items, filters, debouncedSearch],
  );

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / rowsPerPage));

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filters]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paginatedItems = useMemo(
    () => paginateItems(filteredItems, page, rowsPerPage),
    [filteredItems, page, rowsPerPage],
  );

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const handleReset = () => {
    setSearchInput('');
    setFilters(INITIAL_FILTERS);
    setPage(1);
  };

  const openAction = (prescription, type) => {
    setSelected(prescription);
    if (type === 'view') setDrawerOpen(true);
    if (type === 'approve') setApproveOpen(true);
    if (type === 'reject') setRejectOpen(true);
  };

  const updateStatus = (id, status, rejectionReason = '') => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              date: TODAY_DATE,
              rejectionReason,
            }
          : item,
      ),
    );
  };

  const handleApprove = () => {
    if (!selected) return;
    updateStatus(selected.id, PRESCRIPTION_STATUS.APPROVED);
    setApproveOpen(false);
    setSelected(null);
  };

  const handleReject = (reason) => {
    if (!selected) return;
    updateStatus(selected.id, PRESCRIPTION_STATUS.REJECTED, reason);
    setRejectOpen(false);
    setSelected(null);
  };

  return (
    <div className="rx-page">
      <PageHeader
        title="Prescriptions"
        subtitle="Review and verify before dispensing."
      />

      <PrescriptionSummaryCards summary={summary} />

      <PrescriptionToolbar
        search={searchInput}
        searchBy={filters.searchBy}
        status={filters.status}
        priority={filters.priority}
        date={filters.date}
        onSearchChange={setSearchInput}
        onSearchByChange={(value) => updateFilter('searchBy', value)}
        onStatusChange={(value) => updateFilter('status', value)}
        onPriorityChange={(value) => updateFilter('priority', value)}
        onDateChange={(value) => updateFilter('date', value)}
        onReset={handleReset}
      />

      <PrescriptionTable
        data={paginatedItems}
        searchQuery={debouncedSearch}
        searchBy={filters.searchBy}
        onView={(row) => openAction(row, 'view')}
        onApprove={(row) => openAction(row, 'approve')}
        onReject={(row) => openAction(row, 'reject')}
      />

      <PrescriptionPagination
        page={page}
        rowsPerPage={String(rowsPerPage)}
        filteredCount={filteredItems.length}
        totalCount={items.length}
        onPageChange={setPage}
        onRowsPerPageChange={(value) => {
          setRowsPerPage(value);
          setPage(1);
        }}
      />

      <PrescriptionDetailsDrawer
        open={drawerOpen}
        prescription={selected}
        onClose={() => {
          setDrawerOpen(false);
          setSelected(null);
        }}
      />

      <ApproveDialog
        open={approveOpen}
        prescription={selected}
        onClose={() => {
          setApproveOpen(false);
          setSelected(null);
        }}
        onConfirm={handleApprove}
      />

      <RejectDialog
        open={rejectOpen}
        prescription={selected}
        onClose={() => {
          setRejectOpen(false);
          setSelected(null);
        }}
        onConfirm={handleReject}
      />
    </div>
  );
}

export default PrescriptionVerification;

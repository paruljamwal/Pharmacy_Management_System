import { useMemo } from 'react';
import { Badge, HighlightText, Table } from '../../components/common';
import { PRESCRIPTION_STATUS, STATUS_BADGE } from '../../constants/prescriptions';
import { formatDate } from '../../utils/prescriptions';
import {
  HiOutlineEye,
  HiOutlineCheck,
  HiOutlineXMark,
  HiOutlineClipboardDocumentList,
} from 'react-icons/hi2';
import './PrescriptionTable.css';

function ActionButton({ label, onClick, disabled = false, tone = 'default', children }) {
  return (
    <button
      type="button"
      className={`rx-actions__btn rx-actions__btn--${tone}`}
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function createColumns(searchQuery, searchBy, onView, onApprove, onReject) {
  const highlight = (key, value) =>
    searchBy === key && searchQuery.trim() ? (
      <HighlightText text={value} query={searchQuery} />
    ) : (
      value
    );

  return [
    {
      key: 'prescriptionId',
      header: 'Prescription ID',
      render: (value) => highlight('prescriptionId', value),
    },
    {
      key: 'patientName',
      header: 'Patient',
      render: (value, row) => (
        <div className="rx-patient">
          <span>{highlight('patientName', value)}</span>
          {searchBy === 'doctorName' && searchQuery.trim() ? (
            <span className="rx-patient__meta">{highlight('doctorName', row.doctorName)}</span>
          ) : null}
        </div>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      render: (value) => formatDate(value),
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => <Badge variant={STATUS_BADGE[value]}>{value}</Badge>,
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (_, row) => {
        const isPending = row.status === PRESCRIPTION_STATUS.PENDING;

        return (
          <div className="rx-actions">
            <ActionButton label="View" onClick={() => onView(row)}>
              <HiOutlineEye size={16} />
            </ActionButton>
            <ActionButton
              label="Approve"
              tone="success"
              disabled={!isPending}
              onClick={() => onApprove(row)}
            >
              <HiOutlineCheck size={16} />
            </ActionButton>
            <ActionButton
              label="Reject"
              tone="danger"
              disabled={!isPending}
              onClick={() => onReject(row)}
            >
              <HiOutlineXMark size={16} />
            </ActionButton>
          </div>
        );
      },
    },
  ];
}

function PrescriptionTable({
  data,
  searchQuery = '',
  searchBy = 'prescriptionId',
  onView,
  onApprove,
  onReject,
}) {
  const columns = useMemo(
    () => createColumns(searchQuery, searchBy, onView, onApprove, onReject),
    [searchQuery, searchBy, onView, onApprove, onReject],
  );

  return (
    <Table
      className="rx-table"
      columns={columns}
      data={data}
      hoverable
      stickyHeader
      emptyTitle="No prescriptions found"
      emptyDescription="No prescriptions match your filters. Try another patient, doctor, or status."
      emptyIcon={<HiOutlineClipboardDocumentList size={26} />}
    />
  );
}

export default PrescriptionTable;

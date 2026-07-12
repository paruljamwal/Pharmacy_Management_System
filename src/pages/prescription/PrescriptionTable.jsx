import { Badge, Table } from '../../components/common';
import {
  PRIORITY_BADGE,
  PRESCRIPTION_STATUS,
  STATUS_BADGE,
} from '../../constants/prescriptions';
import { formatDate } from '../../utils/prescriptions';
import {
  HiOutlineEye,
  HiOutlineCheck,
  HiOutlineXMark,
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

function PrescriptionTable({ data, onView, onApprove, onReject }) {
  const columns = [
    { key: 'prescriptionId', header: 'Prescription ID' },
    { key: 'patientName', header: 'Patient Name' },
    { key: 'doctorName', header: 'Doctor' },
    {
      key: 'date',
      header: 'Prescription Date',
      render: (value) => formatDate(value),
    },
    {
      key: 'medicines',
      header: 'Medicines Count',
      align: 'center',
      render: (value) => value?.length ?? 0,
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (value) => <Badge variant={PRIORITY_BADGE[value]}>{value}</Badge>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => <Badge variant={STATUS_BADGE[value]}>{value}</Badge>,
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'center',
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

  return (
    <Table
      className="rx-table"
      columns={columns}
      data={data}
      striped
      hoverable
      stickyHeader
      emptyTitle="No prescriptions found"
      emptyDescription="Try adjusting your search or filters."
    />
  );
}

export default PrescriptionTable;

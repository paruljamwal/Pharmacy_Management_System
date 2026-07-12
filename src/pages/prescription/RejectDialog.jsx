import { useEffect, useState } from 'react';
import { Button, Dialog, Textarea } from '../../components/common';

function RejectDialog({ open, prescription, onClose, onConfirm }) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setReason('');
      setError('');
    }
  }, [open]);

  if (!prescription) return null;

  const handleConfirm = () => {
    if (!reason.trim()) {
      setError('Please provide a rejection reason.');
      return;
    }
    onConfirm(reason.trim());
  };

  return (
    <Dialog
      open={open}
      title="Reject Prescription"
      onClose={onClose}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Reject
          </Button>
        </>
      }
    >
      <p style={{ margin: '0 0 16px' }}>
        Reject <strong>{prescription.prescriptionId}</strong> for{' '}
        <strong>{prescription.patientName}</strong>.
      </p>
      <Textarea
        label="Reason"
        name="rejectionReason"
        placeholder="Enter the reason for rejection..."
        value={reason}
        onChange={(event) => {
          setReason(event.target.value);
          if (error) setError('');
        }}
        error={error}
        rows={4}
      />
    </Dialog>
  );
}

export default RejectDialog;

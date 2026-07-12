import { Button, Dialog } from '../../components/common';

function ApproveDialog({ open, prescription, onClose, onConfirm }) {
  if (!prescription) return null;

  return (
    <Dialog
      open={open}
      title="Approve Prescription?"
      onClose={onClose}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={onConfirm}>
            Approve
          </Button>
        </>
      }
    >
      <p style={{ margin: 0 }}>
        Confirm approval for <strong>{prescription.prescriptionId}</strong> belonging to{' '}
        <strong>{prescription.patientName}</strong>. Medicines will be ready for dispensing.
      </p>
    </Dialog>
  );
}

export default ApproveDialog;

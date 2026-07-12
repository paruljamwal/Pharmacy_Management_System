import { Badge, Drawer } from '../../components/common';
import { PRIORITY_BADGE, STATUS_BADGE } from '../../constants/prescriptions';
import { formatDate } from '../../utils/prescriptions';
import './PrescriptionDetailsDrawer.css';

function InfoRow({ label, value }) {
  return (
    <div className="rx-drawer__row">
      <span className="rx-drawer__label">{label}</span>
      <span className="rx-drawer__value">{value}</span>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="rx-drawer__section">
      <h3 className="rx-drawer__section-title">{title}</h3>
      {children}
    </section>
  );
}

function PrescriptionDetailsDrawer({ open, prescription, onClose }) {
  if (!prescription) return null;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={prescription.prescriptionId}
      width={520}
    >
      <div className="rx-drawer">
        <div className="rx-drawer__badges">
          <Badge variant={STATUS_BADGE[prescription.status]}>{prescription.status}</Badge>
          <Badge variant={PRIORITY_BADGE[prescription.priority]}>{prescription.priority}</Badge>
        </div>

        <Section title="Patient Information">
          <InfoRow label="Patient Name" value={prescription.patientName} />
          <InfoRow label="Age" value={`${prescription.patientAge} years`} />
          <InfoRow label="Gender" value={prescription.patientGender} />
          <InfoRow label="Contact Number" value={prescription.patientContact} />
        </Section>

        <Section title="Doctor Information">
          <InfoRow label="Doctor Name" value={prescription.doctorName} />
          <InfoRow label="License Number" value={prescription.doctorLicense} />
          <InfoRow label="Hospital" value={prescription.hospital} />
        </Section>

        <Section title="Prescription Details">
          <InfoRow label="Prescription Date" value={formatDate(prescription.date)} />

          <div className="rx-drawer__medicines">
            <p className="rx-drawer__medicines-title">Medicine List</p>
            {prescription.medicines.map((medicine) => (
              <article key={`${medicine.name}-${medicine.dosage}`} className="rx-drawer__medicine">
                <h4 className="rx-drawer__medicine-name">{medicine.name}</h4>
                <InfoRow label="Dosage" value={medicine.dosage} />
                <InfoRow label="Frequency" value={medicine.frequency} />
                <InfoRow label="Duration" value={medicine.duration} />
                <InfoRow label="Instructions" value={medicine.instructions} />
              </article>
            ))}
          </div>

          <div className="rx-drawer__notes">
            <p className="rx-drawer__label">Notes</p>
            <p className="rx-drawer__notes-text">{prescription.notes}</p>
          </div>
        </Section>
      </div>
    </Drawer>
  );
}

export default PrescriptionDetailsDrawer;

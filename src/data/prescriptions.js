import {
  PRESCRIPTION_PRIORITY,
  PRESCRIPTION_STATUS,
  TODAY_DATE,
} from '../constants/prescriptions';

const patients = [
  { name: 'Aarav Sharma', age: 34, gender: 'Male', contact: '9876543210' },
  { name: 'Priya Patel', age: 28, gender: 'Female', contact: '9823456710' },
  { name: 'Rohan Mehta', age: 45, gender: 'Male', contact: '9811122233' },
  { name: 'Ananya Iyer', age: 31, gender: 'Female', contact: '9900887766' },
  { name: 'Vikram Singh', age: 52, gender: 'Male', contact: '9876501234' },
  { name: 'Sneha Reddy', age: 26, gender: 'Female', contact: '9845012345' },
  { name: 'Karan Malhotra', age: 39, gender: 'Male', contact: '9812345678' },
  { name: 'Meera Joshi', age: 47, gender: 'Female', contact: '9765432109' },
  { name: 'Arjun Nair', age: 22, gender: 'Male', contact: '9898989898' },
  { name: 'Divya Kapoor', age: 36, gender: 'Female', contact: '9123456780' },
];

const doctors = [
  { name: 'Dr. Neha Gupta', license: 'MCI-21456', hospital: 'Apollo Hospitals' },
  { name: 'Dr. Rajesh Khanna', license: 'MCI-19832', hospital: 'Fortis Healthcare' },
  { name: 'Dr. Sunita Rao', license: 'MCI-24501', hospital: 'Max Super Speciality' },
  { name: 'Dr. Amit Verma', license: 'MCI-17660', hospital: 'AIIMS Delhi' },
  { name: 'Dr. Kavita Desai', license: 'MCI-22110', hospital: 'Manipal Hospital' },
];

const medicinePools = [
  [
    { name: 'Paracetamol 500mg', dosage: '1 tablet', frequency: 'Thrice daily', duration: '5 days', instructions: 'After food' },
    { name: 'Amoxicillin 250mg', dosage: '1 capsule', frequency: 'Twice daily', duration: '7 days', instructions: 'Complete full course' },
  ],
  [
    { name: 'Ibuprofen 400mg', dosage: '1 tablet', frequency: 'Twice daily', duration: '3 days', instructions: 'After meals' },
    { name: 'Pantoprazole 40mg', dosage: '1 tablet', frequency: 'Once daily', duration: '7 days', instructions: 'Before breakfast' },
    { name: 'Cetirizine 10mg', dosage: '1 tablet', frequency: 'Once daily', duration: '5 days', instructions: 'At night' },
  ],
  [
    { name: 'Metformin 500mg', dosage: '1 tablet', frequency: 'Twice daily', duration: '30 days', instructions: 'With meals' },
    { name: 'Atorvastatin 10mg', dosage: '1 tablet', frequency: 'Once daily', duration: '30 days', instructions: 'At bedtime' },
  ],
  [
    { name: 'Azithromycin 500mg', dosage: '1 tablet', frequency: 'Once daily', duration: '3 days', instructions: 'After food' },
    { name: 'ORS Sachet', dosage: '1 sachet', frequency: 'As needed', duration: '3 days', instructions: 'Mix in 200ml water' },
  ],
  [
    { name: 'Salbutamol Inhaler', dosage: '2 puffs', frequency: 'As needed', duration: '15 days', instructions: 'Shake before use' },
    { name: 'Montelukast 10mg', dosage: '1 tablet', frequency: 'Once daily', duration: '14 days', instructions: 'At night' },
  ],
];

const notes = [
  'Patient reported mild fever for 2 days.',
  'Follow up required if symptoms persist.',
  'Check blood pressure before next refill.',
  'Advise hydration and rest.',
  'Known allergy to penicillin — verify substitutes.',
  'Diabetic patient — monitor sugar levels.',
  'Urgent review requested by attending physician.',
  'Continue previous medication schedule.',
];

const statuses = [
  PRESCRIPTION_STATUS.PENDING,
  PRESCRIPTION_STATUS.PENDING,
  PRESCRIPTION_STATUS.PENDING,
  PRESCRIPTION_STATUS.APPROVED,
  PRESCRIPTION_STATUS.REJECTED,
];

const dates = [
  TODAY_DATE,
  TODAY_DATE,
  '2026-07-11',
  '2026-07-10',
  '2026-07-09',
  '2026-07-08',
  '2026-07-07',
];

function buildPrescription(index) {
  const patient = patients[index % patients.length];
  const doctor = doctors[index % doctors.length];
  const medicines = medicinePools[index % medicinePools.length];
  const status = statuses[index % statuses.length];
  const date = dates[index % dates.length];
  const priority =
    index % 7 === 0 || index % 11 === 0
      ? PRESCRIPTION_PRIORITY.URGENT
      : PRESCRIPTION_PRIORITY.NORMAL;

  return {
    id: index + 1,
    prescriptionId: `RX-2026-${String(1001 + index)}`,
    patientName: patient.name,
    patientAge: patient.age + (index % 5),
    patientGender: patient.gender,
    patientContact: patient.contact,
    doctorName: doctor.name,
    doctorLicense: doctor.license,
    hospital: doctor.hospital,
    date,
    status,
    priority,
    medicines: medicines.map((item) => ({ ...item })),
    notes: notes[index % notes.length],
    rejectionReason: status === PRESCRIPTION_STATUS.REJECTED ? 'Incomplete dosage instructions' : '',
  };
}

export const prescriptions = Array.from({ length: 50 }, (_, index) =>
  buildPrescription(index),
);

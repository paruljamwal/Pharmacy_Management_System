import {
  HiOutlineClipboardDocumentList,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineBolt,
} from 'react-icons/hi2';
import { Card } from '../../components/common';
import './PrescriptionSummaryCards.css';

const CARDS = [
  {
    key: 'pending',
    title: 'Pending Prescriptions',
    description: 'Awaiting pharmacist review',
    icon: HiOutlineClipboardDocumentList,
    tone: 'warning',
  },
  {
    key: 'approvedToday',
    title: 'Approved Today',
    description: 'Verified and ready to dispense',
    icon: HiOutlineCheckCircle,
    tone: 'success',
  },
  {
    key: 'rejectedToday',
    title: 'Rejected Today',
    description: 'Declined after review',
    icon: HiOutlineXCircle,
    tone: 'danger',
  },
  {
    key: 'urgent',
    title: 'Urgent Prescriptions',
    description: 'Needs immediate attention',
    icon: HiOutlineBolt,
    tone: 'info',
  },
];

function PrescriptionSummaryCards({ summary }) {
  return (
    <div className="rx-summary">
      {CARDS.map(({ key, title, description, icon: Icon, tone }) => (
        <Card key={key} className={`rx-summary__card rx-summary__card--${tone}`}>
          <div className="rx-summary__content">
            <div className={`rx-summary__icon rx-summary__icon--${tone}`}>
              <Icon size={22} />
            </div>
            <div className="rx-summary__meta">
              <div className="rx-summary__top">
                <p className="rx-summary__title">{title}</p>
                <span className={`rx-summary__indicator rx-summary__indicator--${tone}`} />
              </div>
              <p className="rx-summary__value">{summary[key]}</p>
              <p className="rx-summary__description">{description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default PrescriptionSummaryCards;

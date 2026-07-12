import { NavLink } from 'react-router-dom';
import {
  HiOutlineHome,
  HiOutlineCube,
  HiOutlineDocumentCheck,
  HiOutlineReceiptPercent,
  HiOutlineChartBar,
  HiOutlineXMark,
  HiOutlineBeaker,
} from 'react-icons/hi2';
import { NAV_ITEMS } from '../../constants';
import './Sidebar.css';

const ICONS = {
  Dashboard: HiOutlineHome,
  Inventory: HiOutlineCube,
  'Prescription Verification': HiOutlineDocumentCheck,
  Billing: HiOutlineReceiptPercent,
  'Sales Reports': HiOutlineChartBar,
};

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'is-visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`sidebar ${isOpen ? 'is-open' : ''}`}>
        <div className="sidebar__header">
          <div className="sidebar__brand">
            <span className="sidebar__brand-mark" aria-hidden="true">
              <HiOutlineBeaker size={16} />
            </span>
            <span className="sidebar__brand-text">Pharmacy</span>
          </div>
          <button
            type="button"
            className="sidebar__close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <HiOutlineXMark size={22} />
          </button>
        </div>
        <nav className="sidebar__nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = ICONS[item.label];
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `sidebar__link ${isActive ? 'is-active' : ''}`
                }
                onClick={onClose}
              >
                {Icon && <Icon size={20} className="sidebar__icon" />}
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;

import { useLocation } from 'react-router-dom';
import { HiOutlineBars3 } from 'react-icons/hi2';
import { NAV_ITEMS } from '../../constants';
import './Navbar.css';

function Navbar({ onMenuClick }) {
  const { pathname } = useLocation();
  const currentPage =
    NAV_ITEMS.find((item) => item.path === pathname)?.label ?? 'Dashboard';

  return (
    <header className="navbar">
      <div className="navbar__left">
        <button
          type="button"
          className="navbar__menu"
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <HiOutlineBars3 size={20} />
        </button>
        <div className="navbar__context">
          <span className="navbar__context-label">Workspace</span>
          <span className="navbar__context-divider" aria-hidden="true" />
          <h1 className="navbar__page">{currentPage}</h1>
        </div>
      </div>

      <button type="button" className="navbar__profile" aria-label="User menu">
        <span className="navbar__avatar" aria-hidden="true">
          U
        </span>
        <span className="navbar__user">
          <span className="navbar__user-name">User</span>
          <span className="navbar__user-role">Staff</span>
        </span>
      </button>
    </header>
  );
}

export default Navbar;

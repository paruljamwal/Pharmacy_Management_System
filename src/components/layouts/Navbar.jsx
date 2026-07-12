import { useLocation } from 'react-router-dom';
import { HiOutlineBars3, HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { NAV_ITEMS } from '../../constants';
import './Navbar.css';

const SEARCH_SHORTCUT =
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad/i.test(navigator.platform)
    ? '⌘K'
    : 'Ctrl K';

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

      <div className="navbar__search" title="Search coming soon">
        <HiOutlineMagnifyingGlass size={16} className="navbar__search-icon" />
        <input
          type="search"
          className="navbar__search-input"
          placeholder="Search"
          aria-label="Global search"
          disabled
        />
        <kbd className="navbar__search-kbd">{SEARCH_SHORTCUT}</kbd>
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

import { HiOutlineBars3, HiOutlineMagnifyingGlass, HiOutlineUserCircle } from 'react-icons/hi2';
import { APP_NAME } from '../../constants';
import './Navbar.css';

function Navbar({ onMenuClick }) {
  return (
    <header className="navbar">
      <div className="navbar__left">
        <button
          type="button"
          className="navbar__menu"
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <HiOutlineBars3 size={22} />
        </button>
        <div className="navbar__logo" aria-label={APP_NAME}>
          <span className="navbar__logo-mark">P</span>
          <span className="navbar__logo-text">Pharmacy</span>
        </div>
      </div>

      <div className="navbar__search">
        <HiOutlineMagnifyingGlass size={18} className="navbar__search-icon" />
        <input
          type="search"
          className="navbar__search-input"
          placeholder="Search..."
          aria-label="Global search"
          disabled
        />
      </div>

      <div className="navbar__profile">
        <HiOutlineUserCircle size={28} className="navbar__avatar" />
        <div className="navbar__user">
          <span className="navbar__user-name">User</span>
          <span className="navbar__user-role">Staff</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

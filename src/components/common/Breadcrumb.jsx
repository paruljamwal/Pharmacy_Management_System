import { useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants';
import './Breadcrumb.css';

function Breadcrumb() {
  const { pathname } = useLocation();
  const current = NAV_ITEMS.find((item) => item.path === pathname);

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <span className="breadcrumb__item">Home</span>
      <span className="breadcrumb__separator">/</span>
      <span className="breadcrumb__item breadcrumb__item--current">
        {current?.label ?? 'Page'}
      </span>
    </nav>
  );
}

export default Breadcrumb;

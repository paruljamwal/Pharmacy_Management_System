import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found">
      <h1 className="page-title">404 — Page Not Found</h1>
      <p className="not-found__text">The page you are looking for does not exist.</p>
      <Link to={ROUTES.DASHBOARD} className="not-found__link">
        Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;

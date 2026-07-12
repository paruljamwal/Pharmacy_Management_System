import { Link } from 'react-router-dom';
import dashboardBg from '../assets/dashboard-bg.jpg';
import './Dashboard.css';

function Dashboard() {
  return (
    <section
      className="dashboard-hero"
      style={{ backgroundImage: `url(${dashboardBg})` }}
    >
      <div className="dashboard-hero__veil" />
      <div className="dashboard-hero__content">
        <p className="dashboard-hero__eyebrow">Pharmacy</p>
        <h1 className="dashboard-hero__title">
          Care starts with
          <span> clarity.</span>
        </h1>
        <p className="dashboard-hero__message">
          Every shelf counted. Every prescription verified. Every invoice precise.
          Your pharmacy, running with quiet confidence.
        </p>
        <div className="dashboard-hero__actions">
          <Link to="/inventory" className="dashboard-hero__cta">
            Open Inventory
          </Link>
          <Link to="/billing" className="dashboard-hero__cta dashboard-hero__cta--ghost">
            Start Billing
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;

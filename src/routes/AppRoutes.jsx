import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from '../components/layouts/AppLayout';
import Dashboard from '../pages/Dashboard';
import Inventory from '../pages/Inventory';
import PrescriptionVerification from '../pages/PrescriptionVerification';
import Billing from '../pages/Billing';
import SalesReports from '../pages/SalesReports';
import NotFound from '../pages/NotFound';
import { ROUTES } from '../constants';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.INVENTORY} element={<Inventory />} />
          <Route
            path={ROUTES.PRESCRIPTION_VERIFICATION}
            element={<PrescriptionVerification />}
          />
          <Route path={ROUTES.BILLING} element={<Billing />} />
          <Route path={ROUTES.SALES_REPORTS} element={<SalesReports />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

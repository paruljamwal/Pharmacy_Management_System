import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import './AppLayout.css';

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-layout__main">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="app-layout__content">
          <div className="app-layout__page">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;

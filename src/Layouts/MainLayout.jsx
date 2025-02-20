import React, { useRef, useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { useAuthContext } from '../Hooks/useAuthContext';

const MainLayout = () => {
  const navRef = useRef(null);
  const [collapse, setCollapse] = useState(false);

  const { user } = useAuthContext();

  return (
    <div className="bg-tealBg">
      <ScrollRestoration />
      <Navbar navRef={navRef} collapse={collapse} setCollapse={setCollapse} />

      <div className="h-9"></div>

      <div className="h-[calc(100vh-2.25rem)] min-h-[calc(100vh-2.25rem)] flex">
        <Sidebar
          navRef={navRef}
          collapse={collapse}
          setCollapse={setCollapse}
        />

        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;

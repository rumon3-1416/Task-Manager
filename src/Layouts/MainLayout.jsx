import React, { useRef, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  const navRef = useRef(null);
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="bg-tealBg">
      <Navbar navRef={navRef} collapse={collapse} setCollapse={setCollapse} />

      <div className="h-10"></div>

      <div className="h-[calc(100vh-2.5rem)] min-h-[calc(100vh-2.5rem)] flex">
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

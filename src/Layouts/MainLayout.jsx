import React, { useRef, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import Home from '../Pages/Home/Home';

const MainLayout = () => {
  const navRef = useRef(null);
  const [collapse, setCollapse] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  return (
    <div className="bg-tealBg">
      <Navbar navRef={navRef} collapse={collapse} setCollapse={setCollapse} />

      <div className="h-10"></div>

      <div className="h-[calc(100vh-2.5rem)] min-h-[calc(100vh-2.5rem)] flex">
        <Sidebar
          navRef={navRef}
          collapse={collapse}
          currentId={currentId}
          setCollapse={setCollapse}
          setCurrentId={setCurrentId}
        />

        <Home currentId={currentId} />
      </div>
    </div>
  );
};

export default MainLayout;

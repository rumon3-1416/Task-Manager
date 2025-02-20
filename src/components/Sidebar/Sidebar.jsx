import React, { useEffect, useRef, useState } from 'react';

import { useAuthContext } from '../../Hooks/useAuthContext';
import './sidebar.css';
import SideBtn from '../Shared/SideBtn';
import AddProject from '../../Pages/Home/AddProject/AddProject';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Sidebar = ({ navRef, collapse, setCollapse }) => {
  const divRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const { darkTheme, signOutUser } = useAuthContext();
  const axiosSecure = useAxiosSecure();

  // Handle sidebar Collapse
  useEffect(() => {
    // Handle Resize Screen
    const handleResize = e => {
      e.target.innerWidth < 768 ? setCollapse(true) : setCollapse(false);
    };
    // Handle Outside Click
    const handleClick = e => {
      if (
        window.innerWidth < 768 &&
        divRef.current &&
        !divRef.current.contains(e.target) &&
        !navRef.current.contains(e.target)
      ) {
        setCollapse(true);
      }
    };

    window.innerWidth < 768 ? setCollapse(true) : setCollapse(false);

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  // Add Project
  const handleAddProject = async e => {
    e.preventDefault();

    const form = e.target;
    const project = {
      title: form.title.value,
      description: form.description.value,
    };

    const { data } = await axiosSecure.post('/project', project);
    data.acknowledged && setShowModal(false);
  };

  return (
    <div className="min-h-full max-h-full sticky top-0 left-0 z-10">
      <div className="h-full relative">
        {/* Sidebar */}
        <div
          ref={divRef}
          className={`sidebar h-full absolute md:static top-0 bottom-0 transition-all duration-300 ${
            collapse ? 'w-0 md:w-48 overflow-hidden' : 'w-48'
          } ${darkTheme ? 'bg-[#212527f0]' : 'bg-[#f6fffe]'}`}
        >
          <div className="p-3">
            <p className="font-semibold mb-2">Projects</p>

            <ul className="">
              <li>
                <SideBtn>Project 1</SideBtn>
              </li>

              <li>
                <SideBtn
                  onClick={() => setShowModal(true)}
                  className={'border-[1.5px] border-teal mt-1 text-center'}
                >
                  + Add Project
                </SideBtn>
              </li>
            </ul>

            {/* Border */}
            <div className="my-3 border border-gray-300"></div>

            {/* Sign Out */}
            <SideBtn onClick={signOutUser} className="hover:bg-coral2">
              Sign Out
            </SideBtn>
          </div>
        </div>
      </div>

      <AddProject
        showModal={showModal}
        setShowModal={setShowModal}
        handleAddProject={handleAddProject}
      />
    </div>
  );
};

export default Sidebar;

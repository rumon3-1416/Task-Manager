import React from 'react';
import { HiBars3BottomLeft } from 'react-icons/hi2';
import { useAuthContext } from '../../Hooks/useAuthContext';

const Navbar = ({ navRef, collapse, setCollapse }) => {
  const { user } = useAuthContext();

  return (
    <div className="w-full h-10 fixed top-0 inset-x-0 z-20">
      <div className={`w-full px-2 backdrop-blur-md shadow-lg bg-teal`}>
        <nav
          className={`h-10 flex justify-between items-center gap-2 relative`}
        >
          <div className="flex items-center gap-3">
            <button
              ref={navRef}
              onClick={() => setCollapse(!collapse)}
              className="text-white text-xl hover:bg-[#00000032] px-1 py-0.5 rounded-md outline-none md:hidden transition-all duration-200"
            >
              <HiBars3BottomLeft />
            </button>

            <h2 className="poppins-font text-white font-semibold">Taskly</h2>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-gray-100 text-sm font-medium text-nowrap overflow-hidden">
              {user.displayName}
            </p>
            <div className="me-2 p-0.5 rounded-full border border-white">
              <img
                className="w-7 h-7 aspect-square object-cover rounded-full"
                src={user?.photoURL}
                referrerPolicy="no-referrer"
                alt=""
              />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

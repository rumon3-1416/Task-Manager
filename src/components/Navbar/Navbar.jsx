import React from 'react';
import { HiBars3BottomLeft } from 'react-icons/hi2';
import { useAuthContext } from '../../Hooks/useAuthContext';

const Navbar = ({ navRef, collapse, setCollapse }) => {
  const { darkTheme, user } = useAuthContext();

  // useEffect(() => {
  //   document.body.style.backgroundColor = darkTheme ? '#303030' : '#f7f7f7';
  //   window.document.documentElement.classList.add(
  //     darkTheme ? 'bg-dark3' : 'bg-[#f7f7f7]'
  //   );
  //   window.document.documentElement.classList.remove(
  //     darkTheme ? 'bg-[#f7f7f7]' : 'bg-dark3'
  //   );
  // }, [darkTheme]);

  return (
    <div className="w-full h-10 fixed top-0 inset-x-0 z-20">
      <div
        className={`w-full px-2 backdrop-blur-md shadow-lg ${
          darkTheme ? 'bg-[#212527f0]' : 'bg-teal'
        }`}
      >
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

          <div className="me-2 rounded-full border border-white">
            <img
              className="w-7 h-7 aspect-square object-cover p-0.5 rounded-full"
              src={user?.photoURL}
              referrerPolicy="no-referrer"
              alt=""
            />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Hooks/useAuthContext';

import googleIcon from '../../assets/icons/google.png';

const SignIn = () => {
  const navigate = useNavigate();
  const { notify, googleSignIn } = useAuthContext();

  // Popup Log In Handler
  const handlePopup = () => {
    googleSignIn()
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        notify('error', 'Signin Failed!');
      });
  };

  useEffect(() => {
    document.title = 'Signin | Taskly';
  }, []);

  return (
    <div className="bg-[#bababa]">
      <section
        className={`min-h-[100vh] max-h-[100vh] flex justify-center items-center`}
      >
        <div className="text-[#403F3F bg-white text-center w-[95%] md:w-4/5 lg:w-3/5 max-w-xl px-6 md:px-14 pt-12 md:pt-16 pb-16 rounded-2xl shadow-lg">
          <h3 className="text-3xl sm:text-4xl font-bold">Welcome to Taskly</h3>
          <p className="text-xl font-semibold my-6">Sign to Continue</p>

          <button
            onClick={() => handlePopup()}
            className="hover:bg-tealBg sm:text-xl font-semibold px-8 sm:px-12 md:px-16 py-2 mx-auto border-[1.5px] border-teal rounded-full flex justify-center items-center gap-2 sm:gap-4 transition-all duration-200"
          >
            <img className="w-6" src={googleIcon} alt="G" />
            <span>Continue With Google</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default SignIn;

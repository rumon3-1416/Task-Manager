import { useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import auth from '../firebase/firebase.config';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { toast } from 'react-toastify';

const googleProvider = new GoogleAuthProvider();
const dark = localStorage.getItem('darkTheme');

export const ContextValue = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [darkTheme, setDarkTheme] = useState(dark || false);

  const axiosPublic = useAxiosPublic();

  // Toast notify
  const notify = (action, message) => {
    toast[action](message, {
      position: 'top-center',
      autoClose: 5000,
      pauseOnHover: false,
    });
  };

  // Google Sign
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Sign Out
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // On Auth Changed
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser || null);

      if (currentUser) {
        // Get Token
        axiosPublic
          .post('/jwt', { email: currentUser.email })
          .then(res => localStorage.setItem('access_token', res.data.token))
          .then(() => {
            // Save User
            // axiosPublic
            //   .post('/users', {
            //     email: currentUser.email,
            //     displayName: currentUser.displayName,
            //     photoURL: currentUser.photoURL,
            //   })
            //   .then(() => {
            setLoading(false);
            //   });
          });
      } else {
        // Clear Token
        localStorage.removeItem('access_token');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [axiosPublic]);

  return {
    user,
    notify,
    loading,
    darkTheme,
    setLoading,
    setDarkTheme,
    googleSignIn,
    signOutUser,
  };
};

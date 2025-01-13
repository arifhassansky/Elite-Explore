import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import axios from "axios";
import { GithubAuthProvider } from "firebase/auth";
import auth from "../fireabase/firebase.init";

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setEmail(currentUser?.email);

      //   if (currentUser?.email) {
      //     const user = { email: currentUser?.email };
      //     axios
      //       .post(`${import.meta.env.VITE_URL}/jwt`, user, {
      //         withCredentials: true,
      //       })
      //       .then((res) => {
      //         setLoading(false);
      //         console.log(res.data);
      //       });
      //   } else {
      //     axios
      //       .post(
      //         `${import.meta.env.VITE_URL}/logout`,
      //         {},
      //         { withCredentials: true }
      //       )
      //       .then(() => {
      //         setLoading(false);
      //       });
      //   }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const googleSignIn = () => {
    return signInWithPopup(auth, provider);
  };

  const githubSignIn = () => {
    return signInWithPopup(auth, githubProvider);
  };

  const authInfo = {
    createUser,
    user,
    signIn,
    logOut,
    googleSignIn,
    loading,
    setLoading,
    email,
    githubSignIn,
    setEmail,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

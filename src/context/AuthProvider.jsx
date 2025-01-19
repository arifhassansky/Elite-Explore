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
import { GithubAuthProvider } from "firebase/auth";
import auth from "../fireabase/firebase.init";
import useAxiosPublic from "../hooks/useAxiosPublic";

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Create JWT token
        axiosPublic.post("/jwt", { email: currentUser.email }).then((res) => {
          if (res?.data?.token) {
            localStorage.setItem("token", res.data.token);
            setUser(currentUser);
            setEmail(currentUser.email);
            setLoading(false);
          }
        });
      } else {
        // Handle unauthenticated state
        localStorage.removeItem("token");
        setUser(null);
        setEmail(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
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

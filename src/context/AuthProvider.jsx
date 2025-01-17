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

  const saveToDb = async (userInfo) => {
    const { data } = await axiosPublic.post("/users", userInfo);
    console.log({ data }, { userInfo });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setEmail(currentUser?.email);

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);

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
    saveToDb,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

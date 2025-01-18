/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl font-bold">
        <FiLoader className="text-5xl animate-spin text-[#3B9DF8]" />
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;

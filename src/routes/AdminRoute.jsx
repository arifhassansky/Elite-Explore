/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const { user, loading } = useAuth();
  const location = useLocation();

  if ((loading, isAdminLoading)) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl font-bold">
        <FiLoader className="text-5xl animate-spin text-[#3B9DF8]" />
      </div>
    );
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }}></Navigate>;
};

export default AdminRoute;

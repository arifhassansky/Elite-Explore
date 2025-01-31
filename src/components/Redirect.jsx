import { Navigate } from "react-router-dom";
import useLoadUser from "../hooks/useLoadUser";

const Redirect = () => {
  const [user] = useLoadUser();

  return user?.role === "admin" ? (
    <Navigate to="/dashboard/admin" />
  ) : (
    <Navigate to="/dashboard/profile" />
  );
};

export default Redirect;

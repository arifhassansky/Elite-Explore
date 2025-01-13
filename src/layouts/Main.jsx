import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { ToastContainer } from "react-toastify";

const Main = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default Main;

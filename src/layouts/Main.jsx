import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { ToastContainer } from "react-toastify";
import Footer from "../shared/Footer";

const Main = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Main;

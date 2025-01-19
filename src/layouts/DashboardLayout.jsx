import { Outlet } from "react-router-dom";

import profileBg from "../assets/profile-bg.jpg";
import Sidebar from "../dashboard/sidebar";
import Footer from "../shared/Footer";

const DashboardLayout = () => {
  return (
    <div>
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div
          style={{
            backgroundImage: `url(${profileBg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
          }}
          className="w-full"
        >
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
